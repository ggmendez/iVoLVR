var RectangularMark = fabric.util.createClass(fabric.Rect, {
    type: 'rectangularMark',
    isRectangularMark: true,
    
    serializableProperties: ['left', 'top', 'fill', 'colorForStroke', 'width', 'height', 'label', 'isCompressed'],
    deserializer: addRectangularMarkToCanvas,
    
    initialize: function (options) {
        options || (options = {});
        this.callSuper('initialize', options);
        this.set('strokeWidth', options.strokeWidth || 2);
        this.set('originalStrokeWidth', options.strokeWidth || 2);

        if (options.area) {
            var side = Math.sqrt(options.area);
            this.set('width', Math.abs(side));
            this.set('height', Math.abs(side));
            this.set('area', options.area);
        } else {
            this.set('width', options.width || 0);
            this.set('height', options.height || 0);
            this.set('area', Math.abs(this.width) * Math.abs(this.height));
        }

        this.createVariables();
        this.createIText();

        this.set('shape', RECTANGULAR_MARK);

        this.set('stroke', options.colorForStroke || options.stroke);
        this.set('colorForStroke', options.colorForStroke || this.stroke);

        this.createRectBackground();



        this.specificProperties.push({attribute: "width", readable: true, writable: true, types: ['number'], updatesTo: ['area'], dataTypeProposition: 'isNumericData'});
        this.specificProperties.push({attribute: "height", readable: true, writable: true, types: ['number'], updatesTo: ['area'], dataTypeProposition: 'isNumericData'});
        this.specificProperties.push({attribute: "area", readable: true, writable: true, types: ['number'], updatesTo: ['width', 'height'], dataTypeProposition: 'isNumericData'});
        this.specificProperties.push({attribute: "angle", readable: true, writable: true, types: ['number'], updatesTo: [], dataTypeProposition: 'isNumericData'});

        this.createVisualProperties();
        this.createPositionProperties();
        
        
        this.on('scaling', function (option) {
            console.log("Nahgs");
        });

    },
    computeUpdatedValueOf: function (updater, value, updatedProperty) {
        if (updater == 'width' || updater == 'height') {
            if (updatedProperty == 'area') {
                return value * value;
            }
        } else if (updater == 'area') {
            if (updatedProperty == 'width') {
                return Math.sqrt(value);
            } else if (updatedProperty == 'height') {
                return Math.sqrt(value);
            }
        }
    },
    setProperty: function (property, propertyValue, theVisualProperty, shouldAnimate) {



//        if (LOG) console.log("property:");
//        if (LOG) console.log(property);
//
//        if (LOG) console.log("value:");
//        if (LOG) console.log(value);

        var theMark = this;

        if (property == 'shape') {

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

        } else if (property == 'width' || property == 'height' || property == 'area') {


            var changedVisualProperty = theMark.getVisualPropertyByAttributeName(property);
            var propertiesToUpdate = changedVisualProperty.updatesTo;

            if (property == 'area') {


                var numericWidth = propertyValue.number;

                if (LOG) console.log("%cModifying " + changedVisualProperty.attribute + ". Value: " + propertyValue, "background:green; color:white;");



                theMark.area = numericWidth; // This value has to be updated as fabric does not know its link with the radius attribute

                // Updating all the attributes that are affected by the modifications in the area property

                propertiesToUpdate.forEach(function (attributeName) {
                    var visualProperty = theMark.getVisualPropertyByAttributeName(attributeName);
                    var updatedValue = theMark.computeUpdatedValueOf(property, numericWidth, attributeName);

                    if (LOG) console.log("%cAfecting " + attributeName + ". Value: " + updatedValue, "background:red; color:white;");

                    var easing = fabric.util.ease['easeOutBack'];
                    if ((attributeName == 'width' || attributeName == 'height') && updatedValue < 15) {
                        easing = fabric.util.ease['easeOutCirc'];
                    }

                    if (shouldAnimate) {
                        theMark.animateProperty(attributeName, updatedValue, 500, easing);
                    } else {
                        theMark.changeProperty(attributeName, updatedValue);
                    }

                    visualProperty.outConnectors.forEach(function (outConnector) {
                        outConnector.setValue(updatedValue, false, shouldAnimate);
                    });
                });

                property = 'width';
                numericWidth = Math.sqrt(numericWidth);

            } else if (property == 'width' || property == 'height') {

                var numericWidth = propertyValue.number;

                if (LOG) console.log("propertyValue:");
                if (LOG) console.log(propertyValue);

                if (LOG) console.log("numericWidth:");
                if (LOG) console.log(numericWidth);

                if (LOG) console.log("%cModifying " + property + ". Value: " + numericWidth, "background: black; color: white;");

                var easing = fabric.util.ease['easeOutBack'];
                if (numericWidth < 15) {
                    easing = fabric.util.ease['easeOutCirc'];
                }

                if (shouldAnimate) {
                    if (LOG) console.log("property WITH animation");
                    theMark.animateProperty(property, numericWidth, 500, easing);
                } else {
                    if (LOG) console.log("property  with NO animation");
                    theMark.changeProperty(property, numericWidth);
                }

                theMark.area = numericWidth * numericWidth;

                // Updating all the attributes that are affected by the modifications in the area property
                propertiesToUpdate.forEach(function (attributeName) {
                    var visualProperty = theMark.getVisualPropertyByAttributeName(attributeName);
                    var updatedValue = theMark.computeUpdatedValueOf(property, numericWidth, attributeName);

                    if (LOG) console.log("%cAfecting " + attributeName + ". Value: " + updatedValue, "background:red; color:white;");

                    var easing = fabric.util.ease['easeOutBack'];
                    if ((attributeName == 'width' || attributeName == 'height') && updatedValue < 15) {
                        easing = fabric.util.ease['easeOutCirc'];
                    }

                    if (shouldAnimate) {
                        if (LOG) console.log("WITH animation");
                        theMark.animateProperty(attributeName, updatedValue, 500, easing);
                    } else {
                        if (LOG) console.log("with NO animation");
                        theMark.changeProperty(attributeName, updatedValue);
                    }

                    visualProperty.outConnectors.forEach(function (outConnector) {
                        outConnector.setValue(updatedValue, false, shouldAnimate);
                    });
                });

            }

        } else {
            
            console.log("%cGoing to set ANGLE. shouldAnimate value: " + shouldAnimate, "background: blue; color: white;");

            var numericValue = propertyValue.number;

            if (property == 'angle') {
                if (LOG) console.log("Original value: " + numericValue);
                numericValue = numericValue % 360;
                if (LOG) console.log("Modified value: " + numericValue);
            }

            var easing = fabric.util.ease['easeOutBack'];

            if (shouldAnimate) {
                theMark.animateProperty(property, numericValue, 500, easing);
            } else {
                theMark.changeProperty(property, numericValue);
            }


        }

        theMark.setCoords();
        canvas.renderAll();

    },
    positionLabel: function () {
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
        };

        if (newShapeType == ELLIPTIC_MARK) {

            options.rx = theMark.width / 2;
            options.ry = theMark.height / 2;

        } else if (newShapeType == CIRCULAR_MARK || newShapeType == ELLIPTIC_MARK || newShapeType == RECTANGULAR_MARK) {

            options.area = theMark.area;

        } else if (newShapeType == FATFONT_MARK) {

            options.fontFamily = 'Miguta';
            options.number = Math.round(theMark.area / 100);
            options.fontSize = Math.round((theMark.width + theMark.height) / 2);
            options.stroke = '';

        } else if (newShapeType == SVGPATH_MARK || newShapeType == SVGPATHGROUP_MARK) {

            options.targetWidth = theMark.width;
            options.targetHeight = theMark.height;

        }

        return options;

    }
});
Mark.call(RectangularMark.prototype);

function addRectangularMarkToCanvas(options) {
    var rectangularMark = new RectangularMark(options);
    canvas.add(rectangularMark);
    if (options.animateAtBirth) {
        if (rectangularMark.width > 0 && rectangularMark.height > 0) {
            rectangularMark.animateBirth(options.markAsSelected);
        }
    }
    rectangularMark.associateEvents(rectangularMark);
    return rectangularMark;
}