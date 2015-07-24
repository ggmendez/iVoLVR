SVGPathMark = fabric.util.createClass(fabric.Path, {
//   type: 'SVGPathMark',
    isSVGPathMark: true,
    initialize: function (path, options) {

        options || (options = {});
        
        options.fill = options.fill || ((options.values && options.values.fill) ? options.values.fill.color.toRgb() : '');
        options.label = options.label || ((options.values && options.values.label) ? options.values.label.string : '');
        options.angle = -(options.angle || ((options.values && options.values.angle) ? options.values.angle.number : -0));
        
        if (!options.values) {
            options.values = {};
        }
        options.values.shape = createShapeValue(FILLEDPATH_MARK, this);

        this.callSuper('initialize', path, options);

        this.set('strokeWidth', options.strokeWidth || 2);
        this.set('originalStrokeWidth', options.strokeWidth || 2);
        this.set('perPixelTargetFind', false);

        this.set('colorForStroke', options.colorForStroke || this.stroke);

        this.createVariables();

        this.createIText();

        this.set('shape', {shape: FILLEDPATH_MARK, path: this});

        this.createRectBackground();
        
        if (options.targetWidth) {
            var theWidth = options.targetWidth / this.width;
            this.set('finalScaleX', theWidth);
            this.set("the_width", options.targetWidth);
        } else {
            this.set("the_width", this.width);
        }

        if (options.targetHeight) {
            var theHeight = options.targetHeight / this.height;
            this.set('finalScaleY', theHeight);
            this.set("the_height", options.targetHeight);
        } else {
            this.set("the_height", this.height);
        }

        var widthValue = null;
        var heightValue = null;        
        var angleValue = null;

        if (options.values) {
            widthValue = options.values.width || createNumericValue(this.the_width || this.width, null, null, 'pixels');
            heightValue = options.values.height || createNumericValue(this.the_height || this.height, null, null, 'pixels');
            angleValue = options.values.angle || createNumericValue(-this.angle, null, null, 'degrees');
        } else {
            widthValue = createNumericValue(this.the_width || this.width, null, null, 'pixels');
            heightValue = createNumericValue(this.the_height || this.height, null, null, 'pixels');
            angleValue = createNumericValue(-this.angle, null, null, 'degrees');
        }
        
        this.specificProperties.push({attribute: "width", readable: true, writable: true, types: ['number'], updatesTo: ['area'], dataTypeProposition: 'isNumericData', value: widthValue});
        this.specificProperties.push({attribute: "height", readable: true, writable: true, types: ['number'], updatesTo: ['area'], dataTypeProposition: 'isNumericData', value: heightValue});
        this.specificProperties.push({attribute: "angle", readable: true, writable: true, types: ['number'], updatesTo: [], dataTypeProposition: 'isNumericData', value: angleValue});

        this.createVisualProperties();
        this.createPositionProperties(options.values);

        this.setCoords();

        this.associateLabelEvents();
        
        this.setCoreVisualPropertiesValues(options.values);


        


        this.changeColors = function (fill, stroke) {
            this.fill = fill;
            this.stroke = stroke;
            this.colorForStroke = stroke;

            this.backgroundRect.stroke = stroke;
            this.visualProperties.forEach(function (visualProperty) {
                visualProperty.stroke = stroke;
                visualProperty.fill = fill;
                visualProperty.outConnectors.forEach(function (outConnector) {
                    outConnector.changeColor(stroke);
                });

            });
            var visualProperty = this.xVisualProperty;
            if (visualProperty) {
                visualProperty.colorForStroke = stroke;
                if (!visualProperty.selected) {
                    visualProperty.stroke = stroke;
                }
                visualProperty.fill = fill;
                visualProperty.outConnectors.forEach(function (outConnector) {
                    outConnector.changeColor(stroke);
                });
            }

            visualProperty = this.yVisualProperty;
            if (visualProperty) {
                visualProperty.colorForStroke = stroke;
                if (!visualProperty.selected) {
                    visualProperty.stroke = stroke;
                }
                visualProperty.fill = fill;
                visualProperty.outConnectors.forEach(function (outConnector) {
                    outConnector.changeColor(stroke);
                });
            }
        };
    },
    computeUpdatedValueOf: function (updater, value, updatedProperty) {
        if (updater == 'rx') {
            if (updatedProperty == 'area') {
                return value * this.ry * Math.PI;
            }
        } else if (updater == 'ry') {
            if (updatedProperty == 'area') {
                return value * this.rx * Math.PI;
            }
        } else if (updater == 'area') {
            if (updatedProperty == 'rx' || updatedProperty == 'ry') {
                return Math.sqrt(value / Math.PI);
            }
        }
    },
    
    setProperty: function (property, propertyValue, theVisualProperty, shouldAnimate) {
        var theMark = this;
        if (property == 'shape') {
            if (propertyValue == theMark.shape) {
                return;
            }

            var waitingTime = 250;
            if (theMark.isCompressed) {
                waitingTime = 0;
            }

            setTimeout(function () {
                changeMarkShape(theMark, propertyValue);
            }, waitingTime);
        } else if (property == 'label') {

            this.setLabelProperty(propertyValue);

        } else if (property == 'fill') {

            this.setColorProperty(propertyValue);
            
        } else if (property == 'fill') {
            
            this.setWidthProperty(propertyValue);

        } else {
            
            var theNumber = propertyValue.number;

            if (property == 'angle') {
                if (LOG) console.log("Original value: " + theNumber);
                theNumber = theNumber % 360;
                if (LOG) console.log("Modified value: " + theNumber);
            }

            var easing = fabric.util.ease['easeOutBack'];

            if (shouldAnimate) {
                theMark.animateProperty(property, theNumber, 500, easing);
            } else {
                theMark.changeProperty(property, theNumber);
            }


        }

        theMark.setCoords();
        canvas.renderAll();

    },
    associateLabelEvents: function () {
        this.on({
            'moving': function (options) {
                this.positionLabel();
            },
            'rotating': function (options) {
                this.positionLabel();
            },
            'scaling': function (options) {
                this.positionLabel();
            },
        });
    },
    positionLabel: function () {

        var theMark = this;

        if (theMark.iText) {

            var groupLeft = 0;
            var groupTop = 0;
            var groupScaleX = 1;
            var groupScaleY = 1;

            theMark.setCoords();

            if (theMark.group) {
                groupLeft = theMark.group.left;
                groupTop = theMark.group.top;
                groupScaleX = theMark.group.getScaleX();
                groupScaleY = theMark.group.getScaleY();
            }

            var objectCenter = theMark.getCenterPoint();
            var boundingRect = theMark.getBoundingRect();

            // TODO: Eventually, this compensantion should not be necessary
            compensateBoundingRect(boundingRect);

            var boundingRectCenterBottom = new fabric.Point(theMark.left, objectCenter.y + (boundingRect.height / 2));

            boundingRectCenterBottom.y += theMark.labelGap;
            theMark.iText.text = theMark.label;
            theMark.iText.left = groupLeft + theMark.left * groupScaleX;
            theMark.iText.top = groupTop + boundingRectCenterBottom.y;
            theMark.iText.setCoords();
        }
    },
    _render: function (ctx) {
        this.renderLocationLines(ctx);
        this.callSuper('_render', ctx);
        if (this.iText) {
            this.positionLabel();
        }
    },
    generateOptionsForShape: function (newShapeType) {

        var theMark = this;

        var options = {
            left: theMark.left,
            top: theMark.top,
            fill: theMark.fill,
            stroke: theMark.colorForStroke || theMark.stroke,
            colorForStroke: theMark.colorForStroke || theMark.stroke,
            label: theMark.label,
            angle: theMark.angle,
            markAsSelected: true,
            animateAtBirth: false
        };

        if (newShapeType === SQUARED_MARK) {
            
            options.area = (theMark.the_height || theMark.height) * (theMark.the_width || theMark.width);
            
        } else if (newShapeType === RECTANGULAR_MARK) {

            // "the_" used for SVG paths and files, where the width and height properties do not take into account the scaling
            options.width = theMark.the_width || theMark.width;
            options.height = theMark.the_height || theMark.height;

        } else if (newShapeType === ELLIPTIC_MARK) {

            options.rx = (theMark.the_width || theMark.width) / 2;
            options.ry = (theMark.the_height || theMark.height) / 2;

        } else if (newShapeType === CIRCULAR_MARK) {

            options.radius = ((theMark.the_width || theMark.width) + (theMark.the_height || theMark.height)) / 4;

        } else if (newShapeType === FATFONT_MARK) {

            options.fontFamily = 'Miguta';
            options.number = Math.round(((theMark.the_width || theMark.width) * (theMark.the_height || theMark.height)) / 100);
            options.fontSize = Math.round(((theMark.the_width || theMark.width) + (theMark.the_height || theMark.height)) / 2);
            options.stroke = '';
            options.markAsSelected = false;

        } else if (newShapeType === FILLEDPATH_MARK || newShapeType === SVGPATHGROUP_MARK) {

            options.targetWidth = theMark.the_width;
            options.targetHeight = theMark.the_height;

        }

        return options;

    }

});


//SVGPathMark.fromObject = function(object, callback) {
//   fabric.util.enlivenObjects(object.paths, function(enlivenedObjects) {
//      delete object.paths;
//      callback(new SVGPathMark(enlivenedObjects, object));
//   });
//};

// Set callback function when invoke during JSON parsing
SVGPathMark.fromObject = function (object, callback) {
    callback(new SVGPathMark(object));
};

SVGPathMark.async = true;



Mark.call(SVGPathMark.prototype);

function addSVGPathMarkToCanvas(path, options) {
    
    path = path || ((options.values && options.values.shape) ? options.values.shape.path : '');
    
    var svgPathMark = new SVGPathMark(path, options);

    if (LOG) console.log("svgPathMark:");
    if (LOG) console.log(svgPathMark);

    canvas.add(svgPathMark);

    if (options.animateAtBirth) {
//        svgPathMark.animateBirth(options.markAsSelected);
        svgPathMark.animateBirth(options.markAsSelected, null, null, options.doNotRefreshCanvas);
    }

    svgPathMark.associateEvents(svgPathMark);

    return svgPathMark;
}