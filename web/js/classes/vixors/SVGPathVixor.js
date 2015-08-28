SVGPathVixor = fabric.util.createClass(fabric.Path, {
    isSVGPathVixor: true,
    remove: function () {

        var theExtractor = this;
        var iText = theExtractor.iText;
        var visualProperties = theExtractor.visualProperties;
        var backgroundRect = theExtractor.backgroundRect;

        var waitingTime = 0;

        // Only the last visual property should be able to check whether or not to refresh the canvas
        var totalVisualProperties = visualProperties.length;
        for (var i = 0; i < totalVisualProperties; i++) {
            var visualProperty = visualProperties[i];
            visualProperty.disconnect((i === totalVisualProperties - 1) && theExtractor.isCompressed, true);
        }

        theExtractor.fill = theExtractor.trueColor;
        theExtractor.stroke = 'black';
        theExtractor.strokeDashArray = [5, 5];
        theExtractor.strokeWidth = 4;
        canvas.renderAll();

        setTimeout(function () {

            if (!theExtractor.isCompressed) {
                waitingTime = 550;
                theExtractor.compress(true);
            }

            setTimeout(function () {

                var secondWaiting = 350;
                hideWithAnimation(theExtractor, true);

                setTimeout(function () {

                    if (backgroundRect && backgroundRect.canvas) {
                        backgroundRect.remove();
                    }

                    if (theExtractor && theExtractor.canvas) {
                        theExtractor.callSuper('remove');
                    }

                }, secondWaiting);


            }, waitingTime);


        }, 350);




    },
    toXML: function () {
        var theExtractor = this;
        var extractorNode = createXMLElement("extractor");

        addAttributeWithValue(extractorNode, "xmlID", theExtractor.xmlID);
        addAttributeWithValue(extractorNode, "type", theExtractor.getExtractorType());
        appendElementWithValue(extractorNode, "left", theExtractor.left);
        appendElementWithValue(extractorNode, "top", theExtractor.top);
        appendElementWithValue(extractorNode, "isFilled", theExtractor.isFilled);

        appendElementWithValue(extractorNode, "untransformedAngle", theExtractor.untransformedAngle);
        appendElementWithValue(extractorNode, "untransformedX", theExtractor.untransformedX);
        appendElementWithValue(extractorNode, "untransformedY", theExtractor.untransformedY);
        appendElementWithValue(extractorNode, "untransformedScaleX", theExtractor.untransformedScaleX);
        appendElementWithValue(extractorNode, "untransformedScaleY", theExtractor.untransformedScaleY);

        appendElementWithValue(extractorNode, "scaleX", theExtractor.getScaleX());
        appendElementWithValue(extractorNode, "scaleY", theExtractor.getScaleY());

        appendElementWithValue(extractorNode, "trueColor", theExtractor.trueColor);
        appendElementWithValue(extractorNode, "trueColorDarker", theExtractor.trueColorDarker);
        appendElementWithValue(extractorNode, "fillColor", theExtractor.fillColor);

        appendElementWithValue(extractorNode, "stroke", new fabric.Color(theExtractor.visualProperties[0].stroke).toRgba());
        appendElementWithValue(extractorNode, "visualPropertyFill", new fabric.Color(theExtractor.visualProperties[0].fill).toRgba());
        appendElementWithValue(extractorNode, "isExpanded", !theExtractor.isCompressed);
        if (theExtractor.parentObject && theExtractor.parentObject.isImportedImage) {
            appendElementWithValue(extractorNode, "imageXmlID", theExtractor.parentObject.xmlID);
        }
        theExtractor.visualProperties.forEach(function (visualProperty) {
            var propertyNode = visualProperty.toXML();
            extractorNode.append(propertyNode);
        });
        return extractorNode;
    },
    getExtractorType: function () {
        return COLOR_REGION_EXTRACTOR;
    },
    setCoreVisualPropertiesValues: function (values, isFilled) {

        var shapeValue = null;
        var fillValue = null;

        var pathType = null;
        if (isFilled) {
            pathType = FILLEDPATH_MARK;
        } else {
            pathType = PATH_MARK;
        }

        if (values) {
//            shapeValue = values.shape || createShapeValue(FILLEDPATH_MARK, this.path);
            shapeValue = values.shape || createShapeValue(pathType, this.path);
            fillValue = values.trueColor || createColorValue(new fabric.Color(this.trueColor));
        } else {
//            shapeValue = createShapeValue(FILLEDPATH_MARK, this.path);
            shapeValue = createShapeValue(pathType, this.path);
            fillValue = createColorValue(new fabric.Color(this.trueColor));
        }
        
        
        
        
        
        var XYValues = extractXYValues(this, true);

//        if (LOG) {
        console.log("XYValues:");
        console.log(XYValues);
//        }

        var coordinates = createFunctionCoordinatesFromValues(XYValues.xValues, XYValues.yValues);

        this.set("xCollection", coordinates.XCoordinates);
        var xCollectionVisualProperty = this.getVisualPropertyByAttributeName('xCollection');
        xCollectionVisualProperty.value = coordinates.XCoordinates;

        this.set("yCollection", coordinates.YCoordinates);
        var yCollectionVisualProperty = this.getVisualPropertyByAttributeName('yCollection');
        yCollectionVisualProperty.value = coordinates.YCoordinates;

//        this.scaledX = this.scaleCoordiates(this.xCollection, 'x', this.width);
//        this.scaledY = this.scaleCoordiates(this.yCollection, 'y', this.height);
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        

        if (LOG) {
            console.log("shapeValue:");
            console.log(shapeValue);
        }

        this.getVisualPropertyByAttributeName('shape').value = shapeValue;
        this.getVisualPropertyByAttributeName('fill').value = fillValue;
    },
    initialize: function (path, options) {

//        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$ options");
//        console.log(options);

        options || (options = {});

        this.callSuper('initialize', path, options);

        this.set('strokeWidth', options.strokeWidth || 2);
        this.set('originalStrokeWidth', options.strokeWidth || 2);
        this.set('perPixelTargetFind', true);

        if (!options.values) {
            options.values = {};
        }

        var pathType = null;
        if (options.isFilled) {
            pathType = FILLEDPATH_MARK;
        } else {
            pathType = PATH_MARK;
        }

        options.values.shape = createShapeValue(pathType, path);

        this.set('lockScalingX', true);
        this.set('lockScalingY', true);
        this.set('lockMovementX', true);
        this.set('lockMovementY', true);
        this.set('lockRotation', true);

        this.set('hasControls', false);
        this.set('hasBorders', false);
        this.set('hasRotatingPoint', false);

        this.set('nonSerializable', true);

        this.set('colorForStroke', options.colorForStroke || this.stroke);


        this.createRectBackground();

        this.set('connectors', new Array());

        this.set('widgets', new Array());
        this.set('visualProperties', new Array());

        this.set('specificProperties', new Array());

        this.set('visualPropertyFill', options.visualPropertyFill || options.trueColor);
        this.set('visualPropertyStroke', options.trueColorDarker);

        var widthValue = null;
        var heightValue = null;
        var areaValue = null;

        if (options.values) {
            widthValue = options.values.width || createNumericValue(this.width, null, null, 'pixels');
            heightValue = options.values.height || createNumericValue(this.height, null, null, 'pixels');
            areaValue = options.values.area || createNumericValue(this.area, null, null, 'pixels');
        } else {
            widthValue = createNumericValue(this.width, null, null, 'pixels');
            heightValue = createNumericValue(this.height, null, null, 'pixels');
            areaValue = createNumericValue(this.area, null, null, 'pixels');
        }

        this.specificProperties.push({attribute: "shape", readable: true, writable: false, types: ['string', 'object'], updatesTo: [], dataTypeProposition: 'isShapeData'});
        this.specificProperties.push({attribute: "fill", readable: true, writable: false, types: ['string'], updatesTo: [], dataTypeProposition: 'isColorData'});
        
        
        this.specificProperties.push({attribute: "xCollection", readable: true, writable: true, types: ['number'], updatesTo: ['area'], dataTypeProposition: 'isNumericData'});
        this.specificProperties.push({attribute: "yCollection", readable: true, writable: true, types: ['number'], updatesTo: ['area'], dataTypeProposition: 'isNumericData'});
        
        

        this.specificProperties.push({attribute: "width", readable: true, writable: false, types: ['number'], updatesTo: ['area'], dataTypeProposition: 'isNumericData', value: widthValue});
        this.specificProperties.push({attribute: "height", readable: true, writable: false, types: ['number'], updatesTo: ['area'], dataTypeProposition: 'isNumericData', value: heightValue});
        this.specificProperties.push({attribute: "area", readable: true, writable: false, types: ['number'], updatesTo: ['width', 'height'], dataTypeProposition: 'isNumericData', value: areaValue});

        this.createVisualProperties();

        this.setCoreVisualPropertiesValues(options.values, options.isFilled);

        this.applyXmlIDs(options.xmlIDs);

        this.setCoords();

        this.set('permanentOpacity', 1);
        this.set('movingOpacity', 1);

        if (!this.isFilled) {
            this.applySelectedStyle = function () {
            };
            this.applyUnselectedStyle = function () {
            };
        }



        this.hasBorders = true;

        this.onMouseUp = function (options) {

            var theVixor = this;

            if (LOG)
                console.log("widgetMouseup");

            if (theVixor.permanentOpacity) {
                theVixor.opacity = theVixor.permanentOpacity;
            } else {
                theVixor.opacity = 1;
            }

            if (theVixor.moving) {

                var theEvent = options['e'];

                if (theEvent) {

                    if (LOG)
                        console.log(theEvent);

                    var canvasCoords = getCanvasCoordinates(theEvent);
                    var coordX = canvasCoords.x;
                    var coordY = canvasCoords.y;

                    if (LOG)
                        console.log("%c" + canvasCoords, "background: gray");

                    var targetObject = getObjectContaining(canvasCoords);

                    if (LOG)
                        console.log("targetObject: ");
                    if (LOG)
                        console.log(targetObject);


                    if (targetObject) {

                        if (targetObject.isImage) {

                            // removing the last connector added when the widget was down clicked 
                            var connector = theVixor.connectors.pop();
                            connector.contract();

                        } else {

                            if (targetObject.isOperator) {
                                var operator = targetObject;
                                canvas.bringToFront(operator);
                                var connector = getLastElementOfArray(theVixor.connectors);
                                connector.setDestination(operator, true);
                            } else if (targetObject.isAggregator) {

                                var connector = getLastElementOfArray(theVixor.connectors);
                                targetObject.addConnector(connector, canvasCoords);


                            }

                        }

                    } else {



                        // The mouse up event is done over a blank section of the canvas
                        var lastAddedConnector = getLastElementOfArray(theVixor.connectors);

                        var mostFrecuentString = "Label";
                        if (theVixor.recognizedStrings && theVixor.recognizedStrings.length > 0) {
                            mostFrecuentString = getMode(theVixor.recognizedStrings);
                        }

                        fabric.util.removeFromArray(theVixor.connectors, lastAddedConnector);
                        lastAddedConnector.remove();

                        var sourceFillVisualProperty = theVixor.getVisualPropertyByAttributeName('fill');
                        var fillConnector = new Connector({value: lastAddedConnector.arrowColor, source: sourceFillVisualProperty, x1: sourceFillVisualProperty.left, y1: sourceFillVisualProperty.top, x2: coordX, y2: coordY, arrowColor: lastAddedConnector.arrowColor, filledArrow: true, strokeWidth: 3});
                        sourceFillVisualProperty.outConnectors.push(fillConnector);
                        canvas.add(fillConnector);

                        var sourceAreaVisualProperty = theVixor.getVisualPropertyByAttributeName('area');
                        var areaConnector = new Connector({value: lastAddedConnector.value, source: sourceAreaVisualProperty, x1: sourceAreaVisualProperty.left, y1: sourceAreaVisualProperty.top, x2: coordX, y2: coordY, arrowColor: lastAddedConnector.arrowColor, filledArrow: true, strokeWidth: 3});
                        sourceAreaVisualProperty.outConnectors.push(areaConnector);
                        canvas.add(areaConnector);

                        var markOptions = {
                            left: coordX,
                            top: coordY,
//                            fill: lastAddedConnector.arrowColor,
                            fill: theVixor.visualPropertyFill || theVixor.trueColor,
                            stroke: theVixor.trueColorDarker,
                            area: theVixor.getVisualPropertyByAttributeName('area').value.number,
                            label: '',
                            animateAtBirth: true,
                            markAsSelected: false,
                        };

                        var circularMark = addMarkToCanvas(CIRCULAR_MARK, markOptions);

                        var targetFillVisualProperty = circularMark.getVisualPropertyByAttributeName('fill');
                        fillConnector.destination = targetFillVisualProperty;
                        targetFillVisualProperty.inConnectors.push(fillConnector);

                        var targetAreaVisualProperty = circularMark.getVisualPropertyByAttributeName('area');
                        areaConnector.destination = targetAreaVisualProperty;
                        targetAreaVisualProperty.inConnectors.push(areaConnector);

                    }

                }

            } else {
                // removing the last connector added when the widget was down clicked 
                var connector = theVixor.connectors.pop();
                connector.contract();
            }



            theVixor.moving = false;
//            canvas.renderAll();
        };
        this.onMouseDown = function (options) {

            var theVixor = this;


            console.log("Color region extractor mouse down");

            var theEvent = options;
            theEvent = options['e'];

            if (theEvent) {



                var canvasCoords = getCanvasCoordinates(theEvent);
                var coordX = canvasCoords.x;
                var coordY = canvasCoords.y;

                if (LOG)
                    console.log("theVixor.area: " + theVixor.area);

                console.log("theVixor:");
                console.log(theVixor);

                var newConnector = new Connector({source: theVixor, x2: coordX, y2: coordY, arrowColor: theVixor.colorForStroke, filledArrow: true, value: theVixor.area});
//                var newConnector = new Connector({source: theVixor, x2: coordX, y2: coordY, arrowColor: theVixor.trueColor, filledArrow: true, value: theVixor.area});
                newConnector.widget = theVixor;
                theVixor.connectors.push(newConnector);

                canvas.add(newConnector);
                canvas.renderAll();

                if (LOG)
                    console.log("Created connector: ");
                if (LOG)
                    console.log(newConnector);

            }

        };
        this.onMouseMoving = function (options) {

            var theVixor = this;

            if (LOG)
                console.log("widgetMoving");
            theVixor.moving = true;

            var theEvent = options;

            theEvent = options['e'];

            if (theEvent) {

                var canvasCoords = getCanvasCoordinates(theEvent);
                var coordX = canvasCoords.x;
                var coordY = canvasCoords.y;

                var lastAddedConnector = getLastElementOfArray(theVixor.connectors);
                lastAddedConnector.set({x2: coordX, y2: coordY});
                canvas.renderAll();

            } else {



            }



        };

        this.animateBirth = function (markAsSelected) {

            /*if (LOG) {
             console.log("this.initialOptions:");
             console.log(this.initialOptions);
             console.log("this.finalOptions:");
             console.log(this.finalOptions);
             }*/

            var theVixor = this;
            var scaleX = this.scaleX;
            var scaleY = this.scaleY;
            this.set('scaleX', 0);
            this.set('scaleY', 0);

            if (markAsSelected) {
                this.applySelectedStyle(false);
            }

            var easing = fabric.util.ease.easeOutBack;
            var duration = 500;

            var finalOptions = theVixor.finalOptions;

            theVixor.animate('top', finalOptions.top, {
                onChange: canvas.renderAll.bind(canvas),
                duration: duration,
                easing: easing
            });
            theVixor.animate('left', finalOptions.left, {
                onChange: canvas.renderAll.bind(canvas),
                duration: duration,
                easing: easing
            });
            theVixor.animate('scaleX', finalOptions.scaleX, {
                onChange: canvas.renderAll.bind(canvas),
                duration: duration,
                easing: easing
            });
            theVixor.animate('scaleY', finalOptions.scaleY, {
                onChange: canvas.renderAll.bind(canvas),
                duration: duration,
                easing: easing,
                onComplete: function () {
                    theVixor.associateInteractionEvents();
                    if (markAsSelected) {
                        theVixor.applySelectedStyle();
//                        canvas.setActiveObject(theVixor);
                    }
                }
            });



        };
    },
    _render: function (ctx) {
        this.callSuper('_render', ctx);
        if (this.iText) {
            this.positionLabel();
        }
    },
    drawBorders: function (ctx) {

        if (!this.hasBorders || this.group || this.isFilled) {
            return this;
        }

        var padding = this.padding,
                padding2 = padding * 2,
                vpt = this.getViewportTransform();

        ctx.save();

        ctx.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;

        ctx.strokeStyle = widget_selected_stroke_color;
        ctx.lineWidth = widget_selected_stroke_width;
        ctx.setLineDash(widget_selected_stroke_dash_array);

        var scaleX = 1 / this._constrainScale(this.scaleX),
                scaleY = 1 / this._constrainScale(this.scaleY);



        var w = this.getWidth(),
                h = this.getHeight(),
                strokeWidth = this.strokeWidth,
                capped = this.strokeLineCap === 'round' || this.strokeLineCap === 'square',
                vLine = this.type === 'line' && this.width === 0,
                hLine = this.type === 'line' && this.height === 0,
                sLine = vLine || hLine,
                strokeW = (capped && hLine) || !sLine,
                strokeH = (capped && vLine) || !sLine;

        if (vLine) {
            w = strokeWidth / scaleX;
        }
        else if (hLine) {
            h = strokeWidth / scaleY;
        }
        if (strokeW) {
            w += strokeWidth / scaleX;
        }
        if (strokeH) {
            h += strokeWidth / scaleY;
        }
        var wh = fabric.util.transformPoint(new fabric.Point(w, h), vpt, true),
                width = wh.x,
                height = wh.y;
        if (this.group) {
            width = width * this.group.scaleX;
            height = height * this.group.scaleY;
        }

        ctx.strokeRect(
                ~~(-(width / 2) - padding) - 0.5, // offset needed to make lines look sharper
                ~~(-(height / 2) - padding) - 0.5,
                ~~(width + padding2) + 1, // double offset needed to make lines look sharper
                ~~(height + padding2) + 1
                );

        if (this.hasRotatingPoint && this.isControlVisible('mtr') && !this.get('lockRotation') && this.hasControls) {

            var rotateHeight = (-height - (padding * 2)) / 2;

            ctx.beginPath();
            ctx.moveTo(0, rotateHeight);
            ctx.lineTo(0, rotateHeight - this.rotatingPointOffset);
            ctx.closePath();
            ctx.stroke();
        }

        ctx.restore();
        return this;

    },
    associateInteractionEvents: function () {

        var theVixor = this;
        theVixor.on({
            'mouseup': function (options) {
                theVixor.onMouseUp(options);
            },
            'mousedown': function (options) {
                theVixor.onMouseDown(options);
            },
            'moving': function (options) {
                theVixor.onMouseMoving(options);
            },
        });
    },
    computeUpdatedValueOf: function (updater, value, updatedProperty) {
        if (updater === 'rx') {
            if (updatedProperty === 'area') {
                return value * this.ry * Math.PI;
            }
        } else if (updater === 'ry') {
            if (updatedProperty === 'area') {
                return value * this.rx * Math.PI;
            }
        } else if (updater === 'area') {
            if (updatedProperty === 'rx' || updatedProperty === 'ry') {
                return Math.sqrt(value / Math.PI);
            }
        }
    },
    setProperty: function (property, value, theVisualProperty) {
        var theVixor = this;

        if (property == 'fill') {
            theVixor.changeColors(value, theVisualProperty.parentObject.colorForStroke);
        } else if (property == 'rx' || property == 'ry' || property == 'area') {


            var changedVisualProperty = theVixor.getVisualPropertyByAttributeName(property);
            var propertiesToUpdate = changedVisualProperty.updatesTo;

            if (property == 'area') {



                if (LOG)
                    console.log("%cModifying " + changedVisualProperty.attribute + ". Value: " + value, "background:green; color:white;");



                theVixor.area = value; // This value has to be updated as fabric does not know its link with the radius attribute

                // Updating all the attributes that are affected by the modifications in the area property

                propertiesToUpdate.forEach(function (attributeName) {
                    var visualProperty = theVixor.getVisualPropertyByAttributeName(attributeName);
                    var updatedValue = theVixor.computeUpdatedValueOf(property, value, attributeName);

                    if (LOG)
                        console.log("%cAfecting " + attributeName + ". Value: " + updatedValue, "background:red; color:white;");


                    var easing = fabric.util.ease['easeOutBack'];
                    if ((attributeName == 'rx' || attributeName == 'ry') && updatedValue < 15) {
                        easing = fabric.util.ease['easeOutCirc'];
                    }
                    theVixor.animateProperty(attributeName, updatedValue, 500, easing);


                    visualProperty.outConnectors.forEach(function (outConnector) {
                        outConnector.setValue(updatedValue, false, false);
                    });
                });

                property = 'rx';
                value = Math.sqrt(value / Math.PI);

            } else if (property == 'rx' || property == 'ry') {

                if (LOG)
                    console.log("Modifying " + property + ". Value: " + value);

                var easing = fabric.util.ease['easeOutBack'];
                if (value < 15) {
                    easing = fabric.util.ease['easeOutCirc'];
                }
                theVixor.animateProperty(property, value, 500, easing);


                theVixor.area = Math.PI * value * value;

                // Updating all the attributes that are affected by the modifications in the area property
                propertiesToUpdate.forEach(function (attributeName) {
                    var visualProperty = theVixor.getVisualPropertyByAttributeName(attributeName);
                    var updatedValue = theVixor.computeUpdatedValueOf(property, value, attributeName);

                    if (LOG)
                        console.log("%cAfecting " + attributeName + ". Value: " + updatedValue, "background:red; color:white;");

                    var easing = fabric.util.ease['easeOutBack'];
                    if ((attributeName == 'rx' || attributeName == 'ry') && updatedValue < 15) {
                        easing = fabric.util.ease['easeOutCirc'];
                    }
                    theVixor.animateProperty(attributeName, updatedValue, 500, easing);

                    visualProperty.outConnectors.forEach(function (outConnector) {
                        outConnector.setValue(updatedValue, false, false);
                    });
                });


            }






//            var easing = fabric.util.ease['easeOutBack'];
//            if (property == 'radius' && value < 15) {
//                easing = fabric.util.ease['easeOutCirc'];
//            }
//
//            theVixor.animateProperty(property, value, 500, easing);


        } else {

            if (property == 'angle') {
                if (LOG)
                    console.log("Original value: " + value);
                value = value % 360;
                if (LOG)
                    console.log("Modified value: " + value);
            }

            var easing = fabric.util.ease['easeOutBack'];
            theVixor.animateProperty(property, value, 500, easing);

        }

        canvas.renderAll();
        theVixor.setCoords();

    },
});

// Set callback function when invoke during JSON parsing
SVGPathVixor.fromObject = function (object, callback) {
    callback(new SVGPathVixor(object));
};

SVGPathVixor.async = true;



Vixor.call(SVGPathVixor.prototype);

function addSVGPathVixorToCanvas(path, options) {

    if (LOG) {
        console.log("%c addSVGPathVixorToCanvas OPTIONS: ", "background: rgb(143,98,153); color: white;");
        console.log(options);
    }

    var colorRegionExtractor = new SVGPathVixor(path, options);

    if (LOG) {
        console.log("colorRegionExtractor:");
        console.log(colorRegionExtractor);
    }

    canvas.add(colorRegionExtractor);

    if (options.animateAtBirth) {
        colorRegionExtractor.animateBirth(options.markAsSelected);
    } else {
        // If the birth of the object is not animated, its scaling properties should be set directly
        if (typeof options.scaleX !== 'undefined') {
            colorRegionExtractor.scaleX = options.scaleX;
        }
        if (typeof options.scaleY !== 'undefined') {
            colorRegionExtractor.scaleY = options.scaleY;
        }
        colorRegionExtractor.associateInteractionEvents();
    }

    if (options.shouldExpand) {
        colorRegionExtractor.expand(true);
    }

    colorRegionExtractor.associateEvents(colorRegionExtractor);

    if (options.xmlID) {
        colorRegionExtractor.executePendingConnections();
    }

    return colorRegionExtractor;
}


function createColorRegionOptionsExtractorFromXMLNode(extractorXmlNode) {

    var options = {
        extractorType: extractorXmlNode.attr('type'),
        xmlID: extractorXmlNode.attr('xmlID'),
        imageXmlID: Number(extractorXmlNode.attr('imageXmlID')),
        xmlIDs: {},
        values: {}
    };

    var children = extractorXmlNode.children();
    children.each(function () {
        var child = $(this);
        var tagName = this.tagName;

        if (tagName === "property") {

            var valueXmlNode = $(child.find('value')[0]);
            var propertyValue = createValueFromXMLNode(valueXmlNode);

            var xmlID = child.attr('xmlID');
            var attribute = child.attr('attribute');

            if (LOG) {
                console.log(attribute + ":");
                console.log(propertyValue);
            }

            options.values[attribute] = propertyValue;
            options.xmlIDs[attribute] = xmlID;

        } else {

            var value = child.text();
            var type = child.attr('type');

            if (type === "number") {
                value = Number(value);
            } else if (type === "boolean") {
                value = value === "true";
            }

            options[tagName] = value;

        }

    });

    options.animateAtBirth = !options.isExpanded;
    options.shouldExpand = options.isExpanded;

    return options;

}