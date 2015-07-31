// The Output mixing defines all the common properties and behaviours that outputs share
var Vixor = function () {

    this.set('isVixor', true);
    this.set('hoverCursor', 'move');

    this.set('originX', 'center');
    this.set('originY', 'center');
    this.set('transparentCorners', false);

    this.set('perPixelTargetFind', true);
    this.set('isCompressed', true);

    this.set('showLabel', true);

//   this.set('indent', 2);
//   this.set('propertiesRadius', 20);
//   this.set('propertiesSeparation', 60);
//   this.set('propertiesGap', 5);
//   this.set('labelGap', 5);

    this.set('indent', 20);
    this.set('propertiesRadius', 25);
    this.set('propertiesSeparation', 60);
    this.set('propertiesGap', 35);
    this.set('labelGap', 15);

    this.set('coreProperties', new Array());



//    this.toXML = function () {
//        var theExtractor = this;
//        var extractorNode = createXMLElement("extractor");
//
//        addAttributeWithValue(extractorNode, "xmlID", theExtractor.xmlID);
//        addAttributeWithValue(extractorNode, "type", theExtractor.getExtractorType());
//        appendElementWithValue(extractorNode, "left", theExtractor.left);
//        appendElementWithValue(extractorNode, "top", theExtractor.top);
//                
//        appendElementWithValue(extractorNode, "untransformedAngle", theExtractor.untransformedAngle);
//        appendElementWithValue(extractorNode, "untransformedX", theExtractor.untransformedX);
//        appendElementWithValue(extractorNode, "untransformedY", theExtractor.untransformedY);
//        appendElementWithValue(extractorNode, "untransformedScaleX", theExtractor.untransformedScaleX);
//        appendElementWithValue(extractorNode, "untransformedScaleY", theExtractor.untransformedScaleY);
//        
//        appendElementWithValue(extractorNode, "scaleX", theExtractor.getScaleX());
//        appendElementWithValue(extractorNode, "scaleY", theExtractor.getScaleY());
//
//        appendElementWithValue(extractorNode, "trueColor", theExtractor.trueColor);
//        appendElementWithValue(extractorNode, "trueColorDarker", theExtractor.trueColorDarker);
//        appendElementWithValue(extractorNode, "fillColor", theExtractor.fillColor);
//
//        appendElementWithValue(extractorNode, "stroke", new fabric.Color(theExtractor.visualProperties[0].stroke).toRgba());
//        appendElementWithValue(extractorNode, "visualPropertyFill", new fabric.Color(theExtractor.visualProperties[0].fill).toRgba());
//        appendElementWithValue(extractorNode, "isExpanded", !theExtractor.isCompressed);
//        if (theExtractor.parentObject && theExtractor.parentObject.isImportedImage) {
//            appendElementWithValue(extractorNode, "imageXmlID", theExtractor.parentObject.xmlID);
//        }
//        theExtractor.visualProperties.forEach(function (visualProperty) {
//            var propertyNode = visualProperty.toXML();
//            extractorNode.append(propertyNode);
//        });
//        return extractorNode;
//    };

    this.applyXmlIDs = function (xmlIDs) {
        var theExtractor = this;
        if (xmlIDs) {
            for (var attribute in xmlIDs) {
                
                var xmlID = xmlIDs[attribute];
                
                console.log("attribute: " + attribute + " xmlID: " + xmlID);
                 
                var visualProperty = theExtractor.getVisualPropertyByAttributeName(attribute);
                if (visualProperty !== null) {
                    visualProperty.xmlID = xmlID;
                } else {
                    console.log("No visual property found with attribute " + attribute);
                }
            }
        }
    };

    this.setXmlIDs = function (from) {

        var theExtractor = this;

        theExtractor.xmlID = from++;
        theExtractor.visualProperties.forEach(function (visualProperty) {
            visualProperty.xmlID = from++;
        });

        return from;
    };

    this.executePendingConnections = function () {

        var theExtractor = this;

        // The same is made for the visual properties of the mark, as they can also be connected
        theExtractor.visualProperties.forEach(function (visualProperty) {
            console.log("%c" + "For one VISUAL PROPERTY", "background: rgb(81,195,183); color: white;");
            executePendingConnections(visualProperty.xmlID);
        });

    };



    this.createRectBackground = function () {
        var theVixor = this;
        var backgroundRect = new fabric.Rect({
            originX: 'center',
            originY: 'center',
            top: theVixor.top,
            left: theVixor.left,
            width: 0,
            height: 0,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            lockRotation: true,
            hasControls: false,
            hasRotationPoint: false,
            hasBorders: false,
            selectable: true,
            evented: true,
            rx: 10,
            ry: 10
        });
        backgroundRect.on({
            'doubleTap': function (options) {
                theVixor.trigger('doubleTap', options);
            },
//            'moving': function (options) {
//                if (!theVixor.isCompressed) {
//
//                    var localPointer = backgroundRect.getLocalPointer(options.e);
//                    if (LOG) console.log(localPointer);
//
//                    theVixor.left = backgroundRect.left;
//                    theVixor.top = backgroundRect.top + theVixor.indent + theVixor.height / 2 - localPointer.y / 2;
//                    theVixor.positionElements();
//                }
//            }
        });
        this.set('backgroundRect', backgroundRect);
        canvas.add(backgroundRect);
    };
    this.createVisualProperties = function () {
        for (var i = 0; i < this.coreProperties.length; i++) {
            var visualProperty = CreateVisualProperty(this.coreProperties[i], this, this.left, this.top);
            this.visualProperties.push(visualProperty);
            visualProperty.setCoords();
        }
        for (var i = 0; i < this.specificProperties.length; i++) {
            var visualProperty = CreateVisualProperty(this.specificProperties[i], this, this.left, this.top);
            this.visualProperties.push(visualProperty);
            visualProperty.setCoords();
        }
    };
    this.animateBirth = function (vixorAsSelected) {

        var theVixor = this;
        var scaleX = this.scaleX;
        var scaleY = this.scaleY;
        this.set('scaleX', 0);
        this.set('scaleY', 0);

        if (vixorAsSelected) {
            this.applySelectedStyle(false);
        }

        var easing = fabric.util.ease['easeOutElastic'];
        var duration = 1200;

        theVixor.animate('scaleX', scaleX, {
            duration: duration,
            easing: easing
        });

        theVixor.animate('scaleY', scaleY, {
            duration: duration,
            easing: easing,
            onChange: function () {
                if (theVixor.placeLabel) {
                    theVixor.placeLabel();
                }
                canvas.renderAll();
            },
            onComplete: canvas.renderAll.bind(canvas)
        });

    };
    this.applySelectedStyle = function () {
        if (LOG)
            console.log("At the vixor");
        this.stroke = widget_selected_stroke_color;
        this.strokeWidth = widget_selected_stroke_width;
        this.strokeDashArray = widget_selected_stroke_dash_array;
    };
    this.applyUnselectedStyle = function () {
        this.stroke = this.colorForStroke;
        this.strokeWidth = this.originalStrokeWidth;
        this.strokeDashArray = [];
    };



    this.blink = function () {
        var theVixor = this;
        var increment = 0.3;
        var duration = 100;
        var easing = fabric.util.ease['easeInCubic'];
        theVixor.animate('scaleX', '+=' + increment, {
            duration: duration,
            easing: easing,
            onComplete: function () {
                theVixor.animate('scaleX', '-=' + increment, {
                    duration: 1100,
                    easing: fabric.util.ease['easeOutElastic']
                });
            }
        });
        theVixor.animate('scaleY', '+=' + increment, {
            duration: duration,
            onChange: canvas.renderAll.bind(canvas),
            easing: easing,
            onComplete: function () {
                theVixor.animate('scaleY', '-=' + increment, {
                    duration: 1100,
                    onChange: canvas.renderAll.bind(canvas),
                    easing: fabric.util.ease['easeOutElastic']
                });
            }
        });
    };
    this.animateProperty = function (property, value, duration, easing) {
        var theVixor = this;
        theVixor.animate(property, value, {
            duration: duration,
            easing: easing,
            onChange: function () {
                if (theVixor.isEllipticVixor) {
                    theVixor.width = theVixor.rx * 2;
                    theVixor.height = theVixor.ry * 2;
                }
                if (theVixor.isFatFontVixor) { // For some reason, there is the need to refresh the canvas for some of the properties of the IText (e.g. the fontSize attribute)
                    canvas.renderAll();
                }
                theVixor.positionElements();
            },
            onComplete: function () {
                theVixor.positionElements();
                canvas.renderAll();
            }
        });
    };
    this.remove = function () {
        this.callSuper('remove');
    };
    this.changeColors = function (fill, stroke) {
        this.fill = fill;
        this.stroke = stroke;
        this.colorForStroke = stroke;
        this.backgroundRect.stroke = stroke;
        this.visualProperties.forEach(function (visualProperty) {
            if (!visualProperty.selected) {
                visualProperty.stroke = stroke;
            }
            visualProperty.fill = fill;
            visualProperty.outConnectors.forEach(function (outConnector) {
                outConnector.changeColor(stroke);
            });
        });
    };

    this.animateVisualProperty = function (i, prop, endValue, duration, easing, refreshCanvas, removeAfterCompletion, activateEventsAfterAnimation, statusForVisualPropertiesEventsAfterAnimation) {
        var theVixor = this;
        var visualProperty = theVixor.visualProperties[i];
        fabric.util.animate({
            startValue: visualProperty[prop],
            endValue: endValue,
            duration: duration,
            easing: easing,
            onChange: function (value) {
                visualProperty[prop] = value;


                updateConnectorsPositions(visualProperty);

                // only render once
                if (refreshCanvas) {
                    canvas.renderAll();
                }
            },
            onComplete: function () {
                visualProperty.setCoords();

                updateConnectorsPositions(visualProperty);

                if (removeAfterCompletion) {
                    visualProperty.remove();
                    canvas.renderAll();
                }
                if (activateEventsAfterAnimation) {
                    theVixor.evented = true;
                }

                theVixor.setEnabledVisualPropertiesEvents(statusForVisualPropertiesEventsAfterAnimation);
            }
        });
    };

    this.setEnabledVisualPropertiesEvents = function (status) {
        this.visualProperties.forEach(function (visualProperty) {
            visualProperty.evented = status;
        });
    };

    this.applyBackgroundGradient = function (boundingRect) {

//      if (LOG) console.log("boundingRect:");
//      if (LOG) console.log(boundingRect);

        var theVixor = this;
        var theBackground = theVixor.backgroundRect;
        var boundingRectCenterBottom = new fabric.Point(theVixor.left, boundingRect.top + boundingRect.height);

//        drawRectAt(boundingRectCenterBottom, "red");

        boundingRectCenterBottom.y += theVixor.propertiesGap;
        var topCenter = theBackground.getPointByOrigin('center', 'top');
//        drawRectAt(topCenter, "green");

//        var vixorHeight = (boundingRectCenterBottom.y + theVixor.propertiesSeparation) - topCenter.y;
        var vixorHeight = boundingRect.height;
        var stop = (vixorHeight + theVixor.propertiesSeparation) / theBackground.getHeight();
        if (!isFinite(stop) || stop < 0 || stop > 1) {
//            stop = 0.01;
            stop = 1;
        }

        var topOpacity = 0.75;
        if (theVixor.isTextualVixor) {
            topOpacity = 0;
        }

        var JSONString = '{"0": "rgba(255,255,255, ' + topOpacity + ')", "' + stop.toFixed(2) + '": "rgba(242,242,242,0.975)"}';
        var colorStops = jQuery.parseJSON(JSONString);

//      if (LOG) console.log("colorStops BEFORE:");
//      if (LOG) console.log(colorStops);

        colorStops["1"] = "rgba(255,255,255, 1)";

//      if (LOG) console.log("colorStops AFTER:");
//      if (LOG) console.log(colorStops);

        theBackground.setGradient('fill', {
            type: 'linear',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: theBackground.getHeight(),
            colorStops: colorStops
        });

    };

    this.expand = function (refreshCanvas) {

        if (!this.isCompressed)
            return;

//        if (LOG) console.log("%cExpanding", "background:red; color:white");
//        if (LOG) console.log("refreshCanvas: " + refreshCanvas + " - " + this.type);

        var theVixor = this;

        // Disabling any event for this vixor. This will be enabled once the animations of this method are done.
        theVixor.evented = false;

        theVixor.fill = theVixor.trueColor;

        theVixor.setCoords();

        var theBackground = this.backgroundRect;
        var duration = 500;
        var easing = fabric.util.ease['easeOutCubic'];

        var boundingRect = theVixor.getBoundingRect();
        var objectCenter = theVixor.getCenterPoint();


        // TODO: At the moment, the boundingRect of a FatFont should be compensated for the zoom,
        // so we check for this until this bug is solved
        if (theVixor.isSamplerVixor || theVixor.isRectangularVixor || theVixor.isSVGPathVixor || theVixor.isTextualVixor) {
            compensateBoundingRect(boundingRect);
        }



        var newHeight = theVixor.visualProperties.length * (2 * theVixor.propertiesRadius + 15) + boundingRect.height + 2 * theVixor.indent - 20;

        if (LOG)
            console.log("newHeight:");
        if (LOG)
            console.log(newHeight);

        var newWidth = boundingRect.width + 2 * theVixor.indent;

        var newTop = objectCenter.y + (newHeight / 2 - boundingRect.height / 2 - theVixor.indent);

        if (LOG)
            console.log("newWidth:");
        if (LOG)
            console.log(newWidth);

        theBackground.width = newWidth;
        theBackground.height = 0;
        theBackground.left = objectCenter.x;
        theBackground.top = objectCenter.y;
        theBackground.stroke = theVixor.visualPropertyStroke || theVixor.colorForStroke;

        theBackground.strokeWidth = 1;



        theBackground.bringToFront();
        theVixor.bringToFront();

        var boundingRectCenterBottom = new fabric.Point(theVixor.left, boundingRect.top + boundingRect.height);
//        drawRectAt(boundingRectCenterBottom, "green");
        boundingRectCenterBottom.y += theVixor.propertiesGap;

        theBackground.opacity = 1;

        // In the animation of the background, the canvas is not redrawn, as this is done while the visual properties are being moved
        theBackground.animate('top', newTop, {
            easing: easing,
            duration: duration,
        });

        theBackground.animate('height', newHeight, {
            duration: duration,
            easing: easing,
            onChange: function () {

                theVixor.applyBackgroundGradient(boundingRect);

            },
            onComplete: function () {

                theVixor.isCompressed = false;
//                drawRectAt(new fabric.Point(theBackground.left, theBackground.top), "black");
            }
        });

        var positions = new Array();
        var i = 0;
        theVixor.visualProperties.forEach(function (visualProperty) {

            var x = objectCenter.x;
//         var x = theVixor.left;
            var y = boundingRectCenterBottom.y + i * theVixor.propertiesSeparation;

//            drawRectAt(new fabric.Point(x,y), generateRandomColor());

            canvas.add(visualProperty);
            visualProperty.bringForward(true);

            visualProperty.outConnectors.forEach(function (connector) {
                connector.bringToFront();
            });

            visualProperty.inConnectors.forEach(function (connector) {
                connector.bringToFront();
            });

//         visualProperty.left = theVixor.left;
//         visualProperty.top = theVixor.top;
            visualProperty.left = objectCenter.x;
            visualProperty.top = objectCenter.y;
            visualProperty.scaleX = 0;
            visualProperty.scaleY = 0;
            visualProperty.opacity = 0;

            positions.push({x: x, y: y});

            i++;
        });

//        var easing = fabric.util.ease['easeInCubic'];
        var easing = fabric.util.ease['easeOutQuad'];

        for (var i = 0; i < theVixor.visualProperties.length; i++) {

            var isTheLastElement = i == theVixor.visualProperties.length - 1;

            theVixor.animateVisualProperty(i, 'opacity', 1, duration, easing, false, false, false);
            theVixor.animateVisualProperty(i, 'scaleX', 1, duration, easing, false, false, false);
            theVixor.animateVisualProperty(i, 'scaleY', 1, duration, easing, false, false, false);
            theVixor.animateVisualProperty(i, 'left', positions[i].x, duration, easing, false, false, false);
            theVixor.animateVisualProperty(i, 'top', positions[i].y, duration, easing, false, false, false);
//            theVixor.animateVisualProperty(i, 'top', positions[i].y, duration, easing, refreshCanvas && isTheLastElement, false, isTheLastElement, isTheLastElement);
            theVixor.animateVisualProperty(i, 'top', positions[i].y, duration, easing, false, false, isTheLastElement, isTheLastElement);

        }




        // Refreshing the canvas only once
        fabric.util.animate({
            duration: duration,
            easing: easing,
            onChange: function () {

                theBackground.setCoords();

                /*if (LOG) console.log("theBackground.width");
                 if (LOG) console.log(theBackground.width);*/

                theBackground.width = newWidth;

                if (refreshCanvas) {
                    canvas.renderAll();
                }
            },
            onComplete: function () {

                if (refreshCanvas) {
                    canvas.renderAll();
                }
            }
        });



    };

    this.getCompressedMassPoint = function () {
        var theVixor = this;
        return theVixor.getCenterPoint();
    };



    this.compress = function (refreshCanvas) {

        if (this.isCompressed)
            return;

//        if (LOG) console.log("%cCompressing", "background:green; color:white");
//        if (LOG) console.log("refreshCanvas: " + refreshCanvas + " - " + this.type);

        var theVixor = this;

        // Disabling any event for this mark. This will be enabled once the animations of this method are done.
        theVixor.evented = false;

//      var objectCenter = theVixor.getCenterPoint();



        var objectCenter = theVixor.getCompressedMassPoint();

        var theBackground = this.backgroundRect;
        var duration = 500;
        var easing = fabric.util.ease['easeOutQuad'];

        theBackground.animate('top', objectCenter.y, {
//        theBackground.animate('top', theVixor.top, {
            easing: easing,
            duration: duration,
        });
        theBackground.animate('opacity', 0, {
            duration: duration,
        });

        theBackground.animate('height', 0, {
            duration: duration,
            easing: easing,
            onComplete: function () {
                theBackground.width = 0;
                theVixor.isCompressed = true;
                theBackground.setCoords();
                canvas.renderAll();
            }
        });

        var waitingTime = duration - 50;
        if (theVixor.isTextualVixor) {
            waitingTime = 0;
        }
        setTimeout(function () {
            theVixor.fill = theVixor.fillColor;
        }, waitingTime);

        for (var i = 0; i < theVixor.visualProperties.length; i++) {
            var isTheLastElement = i == theVixor.visualProperties.length - 1;
            theVixor.animateVisualProperty(i, 'opacity', 0, duration, easing, false, true, false);
            theVixor.animateVisualProperty(i, 'scaleX', 0, duration, easing, false, true, false);
            theVixor.animateVisualProperty(i, 'scaleY', 0, duration, easing, false, true, false);
            theVixor.animateVisualProperty(i, 'left', objectCenter.x, duration, easing, false, true, false);
            theVixor.animateVisualProperty(i, 'top', objectCenter.y, duration, easing, refreshCanvas && isTheLastElement, true, isTheLastElement, false);
        }

    };

    this.positionConnectors = function () {
        this.visualProperties.forEach(function (visualProperty) {
            visualProperty.inConnectors.forEach(function (inConnector) {
                inConnector.set({'x2': visualProperty.left, 'y2': visualProperty.top});
            });
            visualProperty.outConnectors.forEach(function (outConnector) {
                outConnector.set({'x1': visualProperty.left, 'y1': visualProperty.top});
            });
        });
    };

    this.toggleState = function (refreshCanvas) {
        if (this.isCompressed) {
            this.expand(refreshCanvas);
        } else {
            this.compress(refreshCanvas);
        }
    };

    this.positionElements = function () {

//      if (LOG) console.log("positionElements FUNCTION");

        var theVixor = this;
        theVixor.setCoords();

        var objectCenter = theVixor.getCenterPoint();

        if (theVixor.isCompressed) {
            objectCenter = theVixor.getCompressedMassPoint();
        }



        var boundingRect = theVixor.getBoundingRect();

//        drawRectAt(objectCenter, "blue");
//        drawRectAt(new fabric.Point(boundingRect.left, boundingRect.top), "green");
//        drawRectAt(new fabric.Point(boundingRect.left + boundingRect.width, boundingRect.top + boundingRect.height), "green");

        if (theVixor.isCircularVixor && (theVixor.scaleX == theVixor.scaleY)) {
            var vixorRealRadius = theVixor.radius * theVixor.scaleX;

            if (vixorRealRadius < theVixor.propertiesRadius) {
                vixorRealRadius = theVixor.propertiesRadius;
            }
            var wh = 2 * vixorRealRadius;
            boundingRect = {top: objectCenter.y - vixorRealRadius, left: objectCenter.x - vixorRealRadius, width: wh, height: wh};

        } else if (theVixor.isEllipticVixor && (theVixor.rx == theVixor.ry) && (theVixor.scaleX == theVixor.scaleY)) {

            var vixorRealRadius = theVixor.rx * theVixor.scaleX;
            if (vixorRealRadius < theVixor.propertiesRadius) {
                vixorRealRadius = theVixor.propertiesRadius + 5;
            }
            var wh = 2 * vixorRealRadius;
            boundingRect = {top: objectCenter.y - vixorRealRadius, left: objectCenter.x - vixorRealRadius, width: wh, height: wh};
        }

        if (boundingRect.width < theVixor.propertiesRadius) {
            boundingRect.width = 2 * theVixor.propertiesRadius;
        }

        // TODO: Eventually, this compensantion should not be necessary
        if (theVixor.isSamplerVixor || theVixor.isFatFontVixor || theVixor.isSVGPathGroupVixor || theVixor.isRectangularVixor || theVixor.isEllipticVixor || theVixor.isSVGPathVixor || theVixor.isTextualVixor) {
            compensateBoundingRect(boundingRect);
        }

//      var newHeight = theVixor.visualProperties.length * (2 * theVixor.propertiesRadius + 15) + boundingRect.height;

        var newHeight = theVixor.visualProperties.length * (2 * theVixor.propertiesRadius + 15) + boundingRect.height + 2 * theVixor.indent - 20;

        var newWidth = boundingRect.width + 2 * theVixor.indent;

//      theVixor.backgroundRect.left = theVixor.left;
        theVixor.backgroundRect.left = objectCenter.x;

        theVixor.backgroundRect.width = newWidth;
        theVixor.backgroundRect.height = newHeight;

        if (theVixor.isCompressed) {
//         theVixor.backgroundRect.top = theVixor.top;
            theVixor.backgroundRect.top = objectCenter.y;
            theVixor.backgroundRect.width = 0;
            theVixor.backgroundRect.height = 0;
        } else {
            var newTop = objectCenter.y + (newHeight / 2 - boundingRect.height / 2 - theVixor.indent);
//         var newTop = theVixor.top + (newHeight / 2 - boundingRect.height / 2 - theVixor.indent);
            theVixor.backgroundRect.top = newTop;
        }

        theVixor.backgroundRect.setCoords();

        var boundingRectCenterBottom = new fabric.Point(theVixor.left, objectCenter.y + boundingRect.height / 2);
//        drawRectAt(boundingRectCenterBottom, "red");

        boundingRectCenterBottom.y += theVixor.propertiesGap;



        theVixor.applyBackgroundGradient(boundingRect);



        var i = 0;
        this.visualProperties.forEach(function (visualProperty) {

            var x = objectCenter.x;
            var y = objectCenter.y;
//         var x = theVixor.left;
//         var y = theVixor.top;

            // A different y position for each visual property is only needed when the Vixor is expanded
            if (!theVixor.isCompressed) {
                y = boundingRectCenterBottom.y + i * theVixor.propertiesSeparation;
            }

            visualProperty.left = x;
            visualProperty.top = y;
            visualProperty.setCoords();

            visualProperty.inConnectors.forEach(function (inConnector) {
                if (theVixor.isCompressed) {
//               inConnector.set({'x2': theVixor.left, 'y2': theVixor.top});
                    inConnector.set({'x2': objectCenter.x, 'y2': objectCenter.y});
                } else {
                    inConnector.set({'x2': visualProperty.left, 'y2': visualProperty.top});
                }
            });

            visualProperty.outConnectors.forEach(function (outConnector) {
                if (theVixor.isCompressed) {
                    outConnector.set({'x1': objectCenter.x, 'y1': objectCenter.y});
                } else {
                    outConnector.set({'x1': visualProperty.left, 'y1': visualProperty.top});
                }
            });



            i++;

        });

//      theVixor.setCoords();

    };

    this.getVisualPropertyByAttributeName = function (attributeName) {
        var theVixor = this;
        for (var i = 0; i < theVixor.visualProperties.length; i++) {
            if (theVixor.visualProperties[i].attribute == attributeName) {
                return theVixor.visualProperties[i];
            }
        }
        return null;
    };

    this.associateEvents = function () {
        var theVixor = this;
        this.on({
            'moving': function (options) {
                theVixor.positionElements();
            },
            'rotating': function (options) {
                theVixor.positionElements();

                var visualProperty = theVixor.getVisualPropertyByAttributeName('angle');
                if (visualProperty) {
                    visualProperty.outConnectors.forEach(function (outConnector) {
                        outConnector.setValue(theVixor.angle % 360, false, false);
                    });
                }

            },
            'scaling': function (options) {
                theVixor.positionElements();
            },
            'doubleTap': function (options) {
//            if (LOG) console.log("%cDouble tap on this vixor!", "color:blue;");
                if (this.isCompressed) {
                    this.expand(true);
                } else {
                    this.compress(true);
                }
            }
        });
    };








    return this;
};

/* Function to add outputs to Canvas*/
function addVixorToCanvas(vixorType, options) {
    if (vixorType === RECTANGULAR_VIXOR) {
        return addRectangularVixorToCanvas(options);
    } else if (vixorType === COLOR_REGION_EXTRACTOR) {
        
        return addSVGPathVixorToCanvas(options.thePath, options);
        
    } else if (vixorType === SAMPLER_VIXOR) {
        
        return addSamplerVixorToCanvas(options.thePath, options);
    }
}


function createExtractorOptionsFromXMLNode(extractorXmlNode) {

    var extractorType = extractorXmlNode.attr('type');
    
    

    if (extractorType === RECTANGULAR_VIXOR) {
        
//        createExtractorFromXMLNode(extractorXmlNode);

    } else if (extractorType === TEXT_RECOGNIZER) {
        
        return createTextRecogniserOptionsFromXMLNode(extractorXmlNode);

    } else if (extractorType === COLOR_REGION_EXTRACTOR) {
        
        return createColorRegionOptionsExtractorFromXMLNode(extractorXmlNode);

    } else if (extractorType === SAMPLER_VIXOR) {
        
        return createColorSamplerOptionsFromXMLNode(extractorXmlNode);

    }

}

function createExtractorFromXMLNode(extractorXmlNode) {

    var extractorType = extractorXmlNode.attr('type');

    if (extractorType === RECTANGULAR_VIXOR) {
        
//        createExtractorFromXMLNode(extractorXmlNode);

    } else if (extractorType === TEXT_RECOGNIZER) {
        
//        createExtractorFromXMLNode(extractorXmlNode);

    } else if (extractorType === COLOR_REGION_EXTRACTOR) {
        
        return createColorRegionExtractorFromXMLNode(extractorXmlNode);

    } else if (extractorType === SAMPLER_VIXOR) {
        
        return createColorSamplerFromXMLNode(extractorXmlNode);

    }

}