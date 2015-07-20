SVGPathGroupMark = fabric.util.createClass(fabric.PathGroup, {
    isSVGPathGroupMark: true,
    initialize: function (elements, options) {
        options || (options = {});

        options.fill = options.fill || options.visualPropertyFill;
        options.label = options.label || ((options.values && options.values.label) ? options.values.label.string : '');
        options.angle = -(options.angle || ((options.values && options.values.angle) ? options.values.angle.number : 0));
        
        var hastBeenPainted = false;
        
        if (!options.values) {
            options.values = {};
        }
        options.values.shape = createShapeValue(SVGPATHGROUP_MARK, this);

        if (options.fill) {

            if (options.fill === DEFAULT_VISUAL_PROPERTY_FILL) {
                options.fill = '';
                options.visualPropertyFill = DEFAULT_VISUAL_PROPERTY_FILL;
                options.visualPropertyStroke = DEFAULT_VISUAL_PROPERTY_STROKE;
                options.values.fill = createColorValue(DEFAULT_VISUAL_PROPERTY_FILL);
                
                options.stroke = '';
                options.colorForStroke = '';
                options.strokeWidth = 2;
                options.originalStrokeWidth = options.strokeWidth;
                options.visualPropertyFill = DEFAULT_VISUAL_PROPERTY_FILL;
                options.visualPropertyStroke = DEFAULT_VISUAL_PROPERTY_STROKE;
                
            } else {
                
                hastBeenPainted = true;
                options.visualPropertyFill = options.fill;
                options.colorForStroke = options.stroke;
                options.strokeWidth = options.strokeWidth || 2;
                options.originalStrokeWidth = options.strokeWidth;
                options.visualPropertyStroke = options.stroke;
                
            }

        } else {

            options.fill = '';
            options.visualPropertyFill = DEFAULT_VISUAL_PROPERTY_FILL;
            options.visualPropertyStroke = DEFAULT_VISUAL_PROPERTY_STROKE;
            options.values.fill = createColorValue(DEFAULT_VISUAL_PROPERTY_FILL);
            
            options.stroke = '';
                options.colorForStroke = '';
                options.strokeWidth = 2;
                options.originalStrokeWidth = options.strokeWidth;
                options.visualPropertyFill = DEFAULT_VISUAL_PROPERTY_FILL;
                options.visualPropertyStroke = DEFAULT_VISUAL_PROPERTY_STROKE;

        }

//        if (options.stroke) {
//
//            if (options.stroke === DEFAULT_VISUAL_PROPERTY_STROKE) {
//
//                options.stroke = '';
//                options.colorForStroke = '';
//                options.strokeWidth = 0;
//                options.originalStrokeWidth = 0;
//                options.visualPropertyFill = DEFAULT_VISUAL_PROPERTY_FILL;
//                options.visualPropertyStroke = DEFAULT_VISUAL_PROPERTY_STROKE;
//
//            } else {
//
//
//
//
//            }
//
//        } else {
//
//            options.stroke = '';
//            options.colorForStroke = '';
//            options.strokeWidth = 0;
//            options.originalStrokeWidth = 0;
//            options.visualPropertyFill = DEFAULT_VISUAL_PROPERTY_FILL;
//            options.visualPropertyStroke = DEFAULT_VISUAL_PROPERTY_STROKE;
//
//        }



//        this.set('visualPropertyFill', options.visualPropertyFill || rgb(153, 153, 153));
//        this.set('visualPropertyStroke', options.visualPropertyStroke || rgb(86, 86, 86));
//        this.set('colorForStroke', options.visualPropertyStroke || rgb(86, 86, 86));
//        


        

        this.callSuper('initialize', elements, options);

        this.set('isSVGPathGroupMark', true);

//        this.set('strokeWidth', options.strokeWidth || 2);
//        this.set('originalStrokeWidth', options.strokeWidth || 2);
        this.set('perPixelTargetFind', false);

//        this.set('visualPropertyFill', options.visualPropertyFill || DEFAULT_VISUAL_PROPERTY_FILL);       






//        this.set('visualPropertyStroke', options.stroke || (options.visualPropertyStroke || DEFAULT_VISUAL_PROPERTY_STROKE));
//        this.set('colorForStroke', this.visualPropertyStroke);

        this.createVariables();

        if (!options.unlabeled) {
            this.createIText();
            this.associateLabelEvents();
        }

        this.set('shape', {shape: SVGPATHGROUP_MARK, svgPathGroupMark: this});

        this.createRectBackground();
        
        console.log("options.targetWidth:");
        console.log(options.targetWidth);

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
        
        console.log("widthValue:");
        console.log(widthValue);

        this.specificProperties.push({attribute: "width", readable: true, writable: true, types: ['number'], updatesTo: ['area'], dataTypeProposition: 'isNumericData', value: widthValue});
        this.specificProperties.push({attribute: "height", readable: true, writable: true, types: ['number'], updatesTo: ['area'], dataTypeProposition: 'isNumericData', value: heightValue});
        this.specificProperties.push({attribute: "angle", readable: true, writable: true, types: ['number'], updatesTo: [], dataTypeProposition: 'isNumericData', value: angleValue});

        this.createVisualProperties(options.left, options.top);
        this.createPositionProperties();

        this.setCoords();


        this.toXML = function () {
            // Calling the nomal expand method from the prototype definition
            var markNode = SVGPathGroupMark.prototype.toXML.call(this);
            appendElementWithValue(markNode, "finalScaleX", this.finalScaleX);
            appendElementWithValue(markNode, "finalScaleY", this.finalScaleY);
            return markNode;
        };


        this.changeColors = function (fill, stroke) {


            this.fill = fill;
            this.stroke = stroke;

            this.set('visualPropertyFill', fill);
            this.set('visualPropertyStroke', stroke);
            this.set('colorForStroke', stroke);

            this.paths.forEach(function (path) {
                path.fill = fill;
                path.stroke = fill;
            });

            this.colorForStroke = stroke;
            this.backgroundRect.stroke = stroke;
            this.visualProperties.forEach(function (visualProperty) {
                visualProperty.stroke = stroke;
                visualProperty.colorForStroke = stroke;
                visualProperty.fill = fill;
                visualProperty.outConnectors.forEach(function (outConnector) {
                    outConnector.changeColor(stroke);
                });

            });
        };

        this.setCoreVisualPropertiesValues(options.values);

        if (hastBeenPainted) {
            this.changeColors(options.visualPropertyFill, this.visualPropertyStroke);
        }


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

        } else {

            var theNumber = propertyValue.number;

            if (property == 'angle') {
                if (LOG)
                    console.log("Original value: " + theNumber);
                theNumber = theNumber % 360;
                if (LOG)
                    console.log("Modified value: " + propertyValue);
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

//        if (LOG) console.log("positionLabel function");

        if (this.iText) {

            var groupLeft = 0;
            var groupTop = 0;
            var groupScaleX = 1;
            var groupScaleY = 1;

            this.setCoords();

            if (this.group) {
                groupLeft = this.group.left;
                groupTop = this.group.top;
                groupScaleX = this.group.getScaleX();
                groupScaleY = this.group.getScaleY();
            }

            var objectCenter = this.getCenterPoint();
            var boundingRect = this.getBoundingRect();

            // TODO: Eventually, this compensantion should not be necessary
            compensateBoundingRect(boundingRect);

            var boundingRectCenterBottom = new fabric.Point(this.left, objectCenter.y + (boundingRect.height / 2));
            boundingRectCenterBottom.y += this.labelGap;
            this.iText.text = this.label;
            this.iText.left = groupLeft + this.left * groupScaleX;
            this.iText.top = groupTop + boundingRectCenterBottom.y;
            this.iText.setCoords();

        }
    },
    // TODO: IMPORTANT: The method here us with NO underscore, as this is the definition of the rendering method for this class in fabric
    render: function (ctx) {
        this.renderLocationLines(ctx);
        this.callSuper('render', ctx);
        if (this.iText) {
            this.positionLabel();
        }
    },
    generateOptionsForShape: function (newShapeType) {

        var theMark = this;

        var options = {
            left: theMark.left,
            top: theMark.top,
            fill: theMark.visualPropertyFill,
            stroke: theMark.visualPropertyStroke,
            colorForStroke: theMark.visualPropertyStroke,
            label: theMark.label,
            angle: theMark.angle,
            markAsSelected: true,
            animateAtBirth: false
        };

        if (newShapeType === CIRCULAR_MARK) {

            // "the_" used for SVG paths and files, where the width and height properties do not take into account the scaling
            options.radius = ((theMark.the_width || theMark.width) + (theMark.the_height || theMark.height)) / 4;

        } else if (newShapeType === RECTANGULAR_MARK) {

            options.width = theMark.the_width || theMark.width;
            options.height = theMark.the_height || theMark.height;

        } else if (newShapeType === SQUARED_MARK) {

            options.area = (theMark.the_width || theMark.width) * (theMark.the_height || theMark.height);

        } else if (newShapeType === ELLIPTIC_MARK) {

            options.rx = (theMark.the_width || theMark.width) / 2;
            options.ry = (theMark.the_height || theMark.height) / 2;

            if (LOG)
                console.log("%coptions.rx: " + options.rx, "background: black; color:pink;");
            if (LOG)
                console.log("%coptions.ry: " + options.ry, "background: black; color:pink;");

        } else if (newShapeType === FATFONT_MARK) {

            options.fontFamily = 'Miguta';
            options.number = Math.round(((theMark.the_width || theMark.width) * (theMark.the_width || theMark.width)) / 100);
            options.fontSize = Math.round(((theMark.the_height || theMark.height) + (theMark.the_height || theMark.height)) / 2);
            options.stroke = '';
            options.markAsSelected = false;

        } else if (newShapeType === FILLEDPATH_MARK) {



        } else if (newShapeType === SVGPATHGROUP_MARK) {
            options.targetWidth = theMark.the_width;
            options.targetHeight = theMark.the_height;
        }

        return options;

    }
});


//SVGPathGroupMark.fromObject = function(object, callback) {
//   fabric.util.enlivenObjects(object.paths, function(enlivenedObjects) {
//      delete object.paths;
//      callback(new SVGPathGroupMark(enlivenedObjects, object));
//   });
//};

// Set callback function when invoke during JSON parsing
SVGPathGroupMark.fromObject = function (object, callback) {
    callback(new SVGPathGroupMark(object));
};

SVGPathGroupMark.async = true;



Mark.call(SVGPathGroupMark.prototype);

function addSVGPathGroupMarkToCanvas(paths, options) {

    console.log("options:");
    console.log(options);

    if (typeof paths === 'undefined' && options.values && options.values.shape && options.values.shape.svgPathGroupMark) {
        var SVGString = options.values.shape.svgPathGroupMark;

        fabric.loadSVGFromString(SVGString, function (objects, defaultOptions) {

            options.SVGString = SVGString;
            options.thePaths = objects;
            paths = objects;
            
            options.targetWidth = options.values.width.number;
            options.targetHeight = options.values.height.number;

            options = $.extend(true, {}, defaultOptions, options);

            var svgPathGroupMark = new SVGPathGroupMark(paths, options);

            if (LOG)
                console.log("svgPathGroupMark:");
            if (LOG)
                console.log(svgPathGroupMark);

            canvas.add(svgPathGroupMark);
            svgPathGroupMark.setCoords();

            canvas.setActiveObject(svgPathGroupMark);

            if (options.animateAtBirth) {
                svgPathGroupMark.animateBirth(options.markAsSelected, options.finalScaleX, options.finalScaleY, options.doNotRefreshCanvas);
            }

            svgPathGroupMark.associateEvents(svgPathGroupMark);

            if (options.isExpanded) {
                svgPathGroupMark.expand(false);
            }

            return svgPathGroupMark;

        });



    } else {

        var svgPathGroupMark = new SVGPathGroupMark(paths, options);

        if (LOG)
            console.log("svgPathGroupMark:");
        if (LOG)
            console.log(svgPathGroupMark);

        canvas.add(svgPathGroupMark);
        svgPathGroupMark.setCoords();

        canvas.setActiveObject(svgPathGroupMark);

        if (options.animateAtBirth) {
//        svgPathGroupMark.animateBirth(options.markAsSelected);
            svgPathGroupMark.animateBirth(options.markAsSelected, null, null, options.doNotRefreshCanvas);
        }


        svgPathGroupMark.associateEvents(svgPathGroupMark);

        return svgPathGroupMark;

    }




}

