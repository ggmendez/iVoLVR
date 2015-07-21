// The Output mixing defines all the common properties and behaviours that outputs share
var Mark = function () {

    this.set('isMark', true);
    this.set('xmlNodeName', 'mark');

    this.set('hoverCursor', 'move');

    this.set('originX', 'center');
    this.set('originY', 'center');
    this.set('transparentCorners', false);

    this.set('perPixelTargetFind', true);
    this.set('isCompressed', true);

    this.set('showLabel', true);

    this.set('indent', 20);
    this.set('propertiesRadius', 25);

    this.set('propertiesSeparation', 65);
    this.set('propertiesGap', 35);
    this.set('labelGap', 15);

    this.set('coreProperties', new Array());
    this.coreProperties.push({attribute: "shape", readable: true, writable: true, types: ['string', 'object'], updatesTo: [], dataTypeProposition: 'isShapeData'});
    this.coreProperties.push({attribute: "fill", readable: true, writable: true, types: ['string'], updatesTo: [], dataTypeProposition: 'isColorData'});
    this.coreProperties.push({attribute: "label", readable: true, writable: true, types: ['string', 'number'], updatesTo: [], dataTypeProposition: 'isStringData'});

    this.set('hasBorders', false);
    this.set('hasControls', false);
    this.set('hasRotatingPoint', false);
    this.set('lockScalingX', true);
    this.set('lockScalingY', true);
    this.set('lockRotation', true);

    this.setCoreVisualPropertiesValues = function (values) {

        var shapeValue = null;
        var fillValue = null;
        var labelValue = null;

        if (values) {
            shapeValue = values.shape || ((this.shape.svgPathGroupMark || this.shape.path) ? createShapeValue(this.shape.shape, this.shape.svgPathGroupMark || this.shape.path) : createShapeValue(this.shape));
            fillValue = values.fill || createColorValue(new fabric.Color(this.fill));
            labelValue = values.label || createStringValue(this.label);
        } else {
            shapeValue = this.shape.svgPathGroupMark || this.shape.path ? createShapeValue(this.shape.shape, this.shape.svgPathGroupMark || this.shape.path) : createShapeValue(this.shape);
            fillValue = createColorValue(new fabric.Color(this.fill));
            labelValue = createStringValue(this.label);
        }

        if (LOG) {
            console.log("shapeValue:");
            console.log(shapeValue);
        }


        this.getVisualPropertyByAttributeName('shape').value = shapeValue;
        this.getVisualPropertyByAttributeName('fill').value = fillValue;
        this.getVisualPropertyByAttributeName('label').value = labelValue;
    };

    this.toXML = function () {
        var markNode = createXMLElement("mark");
        addAttributeWithValue(markNode, "shape", this.shape.shape || this.shape);
        appendElementWithValue(markNode, "left", this.left);
        appendElementWithValue(markNode, "top", this.top);
        appendElementWithValue(markNode, "stroke", new fabric.Color(this.visualProperties[0].stroke).toRgba());
        appendElementWithValue(markNode, "visualPropertyFill", new fabric.Color(this.visualProperties[0].fill).toRgba());
        appendElementWithValue(markNode, "isExpanded", !this.isCompressed);
        this.visualProperties.forEach(function (visualProperty) {
            var propertyNode = visualProperty.toXML();
            markNode.append(propertyNode);
        });
        return markNode;
    };


    this.createVariables = function () {
        this.set('inConnectors', new Array());
        this.set('widgets', new Array());
        this.set('visualProperties', new Array());
        this.set('specificProperties', new Array());
    }

    this.createIText = function () {
        var theMark = this;
        var label = theMark.label || '';
        var iText = new fabric.IText(label, {
            originX: 'center',
            originY: 'center',
            fontSize: 20,
            textAlign: 'center',
            fontFamily: 'calibri',
            hasControls: false,
            hasBorders: false,
            hasRotatingPoint: false,
//                lockRotation: true,
//                lockScalingX: true,
//                lockScalingY: true,
//                lockMovementX: true,
//                lockMovementY: true,
            selectable: false,
            evented: true,
            editable: true
        });
        theMark.set('label', label);
        theMark.set('iText', iText);
        canvas.add(iText);

        if (theMark.positionLabel) {
            theMark.positionLabel();
        }

        setTimeout(function () {
            iText.bringToFront(true);
        }, 100);

    };


    this.createRectBackground = function () {
        var theMark = this;
        var backgroundRect = new fabric.Rect({
            originX: 'center',
            originY: 'center',
            top: theMark.top,
            left: theMark.left,
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
                theMark.trigger('doubleTap', options);
            },
//            'moving': function (options) {
//                if (!theMark.isCompressed) {
//
//                    var localPointer = backgroundRect.getLocalPointer(options.e);
//                    if (LOG) console.log(localPointer);
//
//                    theMark.left = backgroundRect.left;
//                    theMark.top = backgroundRect.top + theMark.indent + theMark.height / 2 - localPointer.y / 2;
//                    theMark.positionElements();
//                }
//            }
        });
        this.set('backgroundRect', backgroundRect);
        canvas.add(backgroundRect);
    };

    // The left and top are used for the SVGPathGroupMark, as, when loaded, its position is always set to the point 0,0
    this.createVisualProperties = function () {
        for (var i = 0; i < this.coreProperties.length; i++) {
            var visualProperty = CreateVisualProperty(this.coreProperties[i], this, this.left, this.top);
            this.visualProperties.push(visualProperty);
            visualProperty.setCoords();
            visualProperty.evented = false;
        }
        for (var i = 0; i < this.specificProperties.length; i++) {
            var visualProperty = CreateVisualProperty(this.specificProperties[i], this, this.left, this.top);
            this.visualProperties.push(visualProperty);
            visualProperty.setCoords();
            visualProperty.evented = false;
        }
    };

    this.createPositionProperties = function () {

        var xProperty = {attribute: "x", readable: true, writable: true, types: ['number'], updatesTo: [], dataTypeProposition: 'isNumericData'};
        this.xVisualProperty = CreateVisualProperty(xProperty, this, this.left, this.top);
        this.xVisualProperty.mark = this;
        this.xVisualProperty.setCoords();
        this.xVisualProperty.evented = false;

        var yProperty = {attribute: "y", readable: true, writable: true, types: ['number'], updatesTo: [], dataTypeProposition: 'isNumericData'};
        this.yVisualProperty = CreateVisualProperty(yProperty, this, this.left, this.top);
        this.yVisualProperty.mark = this;
        this.yVisualProperty.setCoords();
        this.yVisualProperty.evented = false;

    };

    // The finalScaleX and finalScaleY parameters are sent to avoid that the mark, after the animation, dissapear in the case where it is born with a scale of 0
    this.animateBirth = function (markAsSelected, finalScaleX, finalScaleY, doNotRefreshCanvas) {

        if (doNotRefreshCanvas) {
            if (LOG) {
                console.log("%cThe canvas will not be refreshed in this BIRTH animation...", "background: green; color: black;");
            }

        }

        var theMark = this;
        var scaleX = finalScaleX || this.scaleX;
        var scaleY = finalScaleY || this.scaleY;
        this.set('scaleX', 0);
        this.set('scaleY', 0);

        if (markAsSelected) {
            this.applySelectedStyle(false);
        }

        var easing = fabric.util.ease['easeOutElastic'];
        var duration = 1200;

        theMark.animate('scaleX', scaleX, {
            duration: duration,
            easing: easing
        });

        var scaleYAnimationOptions = {};
        scaleYAnimationOptions['duration'] = duration;
        scaleYAnimationOptions['easing'] = easing;

        if (!doNotRefreshCanvas) {
            scaleYAnimationOptions['onChange'] = refresherFunction;
            scaleYAnimationOptions['onComplete'] = refresherFunction;
        }

        if (LOG) {
            console.log("scaleYAnimationOptions:");
            console.log(scaleYAnimationOptions);
        }

        theMark.animate('scaleY', scaleY, scaleYAnimationOptions);

//        theMark.animate('scaleY', scaleY, {
//            duration: duration,
//            easing: easing,
//            onChange: doNotRefreshCanvas ? null : canvas.renderAll.bind(canvas),
//            onComplete: doNotRefreshCanvas ? null : canvas.renderAll.bind(canvas),
//        });

    };
    this.applySelectedStyle = function (selectConnectors) {

        var theMark = this;
        if (LOG)
            console.log("At the mark");
        theMark.stroke = widget_selected_stroke_color;
        theMark.strokeWidth = widget_selected_stroke_width;
        theMark.strokeDashArray = widget_selected_stroke_dash_array;

        if (selectConnectors) {
            theMark.visualProperties.forEach(function (visualMark) {
                if (visualMark.inConnectors.length || visualMark.outConnectors.length) {
                    visualMark.applySelectedStyle(true);
                }
            });
        }

    };
    this.applyUnselectedStyle = function (unSelectConnectors) {

        var theMark = this;
        theMark.stroke = this.colorForStroke;
        theMark.strokeWidth = this.originalStrokeWidth;
        theMark.strokeDashArray = [];

        if (unSelectConnectors) {
            theMark.visualProperties.forEach(function (visualMark) {
                if (visualMark.inConnectors.length || visualMark.outConnectors.length) {
                    visualMark.applyUnselectedStyle(true);
                }
            });
        }
    };
    this.blink = function () {
        var theMark = this;
        var increment = 0.3;
        var duration = 100;
        var easing = fabric.util.ease['easeInCubic'];
        theMark.animate('scaleX', '+=' + increment, {
            duration: duration,
            easing: easing,
            onComplete: function () {
                theMark.animate('scaleX', '-=' + increment, {
                    duration: 1100,
                    easing: fabric.util.ease['easeOutElastic']
                });
            }
        });
        theMark.animate('scaleY', '+=' + increment, {
            duration: duration,
            onChange: canvas.renderAll.bind(canvas),
            easing: easing,
            onComplete: function () {
                theMark.animate('scaleY', '-=' + increment, {
                    duration: 1100,
                    onChange: canvas.renderAll.bind(canvas),
                    easing: fabric.util.ease['easeOutElastic']
                });
            }
        });
    };
    this.changeProperty = function (property, value) {
        if (LOG)
            console.log("%cchangeProperty " + property + " with NO animation", "background:blue; color:yellow;");
        var theMark = this;

        if (property === 'angle') {
            value = -value;
        }

        if (theMark.isPathMark && (property === 'width' || property === 'height')) {

            var previousLeft = theMark.left;
            var previousTop = theMark.top;
            if (property === 'width') {
                theMark.generateScaledCoordinates('x', value);
            } else {
                theMark.generateScaledCoordinates('y', value);
            }
            updatePathCoords(theMark);
            theMark.scaleX = 1;
            theMark.scaleY = 1;
            theMark.left = previousLeft;
            theMark.top = previousTop;
            theMark.setCoords();

            theMark.set("the_" + property, value);

        } else if (theMark.isSVGPathMark || theMark.isSVGPathGroupMark && (property === 'width' || property === 'height')) {
            theMark.set("the_" + property, value);
            if (property === 'width') {
                property = "scaleX";
                value = value / theMark.width;
            } else if (property === 'height') {
                property = "scaleY";
                value = value / theMark.height;
            }
        }

        theMark.set(property, value);


        theMark.positionElements();



    };
    this.animateProperty = function (property, value, duration, easing, doNotRefreshCanvas) {

        var theMark = this;

        if (property === 'angle') {
            value = -value;
        }

        if (LOG)
            console.log("Previous property: " + property);
        if (LOG)
            console.log("Previous value: " + value);

        if (theMark.isPathMark && (property === 'width' || property === 'height')) {

            var startValue = theMark[property];
            var endValue = value;

            // Refreshing the canvas only once
            fabric.util.animate({
                duration: duration,
                easing: easing,
                startValue: startValue,
                endValue: endValue,
                onChange: function (currentValue) {

                    var previousLeft = theMark.left;
                    var previousTop = theMark.top;
                    if (property === 'width') {
                        theMark.generateScaledCoordinates('x', currentValue);
                    } else {
                        theMark.generateScaledCoordinates('y', currentValue);
                    }
                    updatePathCoords(theMark);
                    theMark.scaleX = 1;
                    theMark.scaleY = 1;
                    theMark.left = previousLeft;
                    theMark.top = previousTop;
                    theMark.setCoords();

                },
                onComplete: function () {

                    var previousLeft = theMark.left;
                    var previousTop = theMark.top;
                    if (property === 'width') {
                        theMark.generateScaledCoordinates('x', endValue);
                    } else {
                        theMark.generateScaledCoordinates('y', endValue);
                    }
                    updatePathCoords(theMark);
                    theMark.scaleX = 1;
                    theMark.scaleY = 1;
                    theMark.left = previousLeft;
                    theMark.top = previousTop;
                    theMark.setCoords();

                }
            });

            theMark.set("the_" + property, value);

        } else {

            if (theMark.isSVGPathMark || theMark.isSVGPathGroupMark && (property === 'width' || property === 'height')) {

                theMark.set("the_" + property, value);

                if (property === 'width') {
                    property = "scaleX";
                    value = value / theMark.width;
                } else if (property === 'height') {
                    property = "scaleY";
                    value = value / theMark.height;
                }


            }

            theMark.animate(property, value, {
                duration: duration,
                easing: easing,
                onChange: function () {
                    theMark.positionElements();
                    if (!doNotRefreshCanvas) {
                        canvas.renderAll();
                    }
                },
                onComplete: function () {
                    theMark.positionElements();
                    if (!doNotRefreshCanvas) {
                        canvas.renderAll();
                    }
                }
            });


        }



    };
    this.remove = function () {
        if (LOG)
            console.log("%cRemoving MARK", "background: MediumSpringGreen");
        if (this.iText) {
            this.iText.remove();
        }
        this.callSuper('remove');
    };

    this.getDefaultModifiableVisualPropertyByType = function (value) {

        if (LOG)
            console.log("getDefaultModifiableVisualPropertyByType: FUNCTION");

        if (LOG)
            console.log("value");
        if (LOG)
            console.log(value);

        var theMark = this;
        if (value.isColorData) {
            return theMark.getVisualPropertyByAttributeName('fill');
        } else if (value.isDateAndTimeData || value.isDurationData) {
            return null;
        } else if (value.isNumericData) {
            if (theMark.isRectangularMark || theMark.isSVGPathMark || theMark.isSVGPathGroupMark) {
                return theMark.getVisualPropertyByAttributeName('height');
            } else if (theMark.isCircularMark) {
                return theMark.getVisualPropertyByAttributeName('radius');
            } else if (theMark.isSquaredMark) {
                return theMark.getVisualPropertyByAttributeName('side');
            } else if (theMark.isEllipticalMark) {
                return theMark.getVisualPropertyByAttributeName('ry');
            } else if (theMark.isFatFontMark) {
                return theMark.getVisualPropertyByAttributeName('number');
            }
        } else if (value.isShapeData) {
            return theMark.getVisualPropertyByAttributeName('shape');
        } else if (value.isStringData) {
            return theMark.getVisualPropertyByAttributeName('label');
        } else {
            return null;
        }
    };

    this.setLabelProperty = function (stringValue) {
        var theMark = this;
        if (!stringValue.isStringData) {
            return;
        }
        var theString = stringValue.string;
        theMark.label = '' + theString;

        theMark.iText.text = theMark.label;
        theMark.positionElements();
    };

    this.setColorProperty = function (colorValue) {
        var theMark = this;
        if (!colorValue.isColorData) {
            return;
        }
        var fillColor = "#" + colorValue.color.toHex();
        var rgbColor = hexToRGB(fillColor);
        var strokeColor = darkenrgb(rgbColor.r, rgbColor.g, rgbColor.b);
        theMark.changeColors(fillColor, strokeColor);
    };

    this.changeColors = function (fill, stroke) {

        this.fill = fill;
        this.stroke = stroke;
        this.colorForStroke = stroke;

        this.backgroundRect.stroke = stroke;
        this.visualProperties.forEach(function (visualProperty) {
            visualProperty.colorForStroke = stroke;
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

    this.animateVisualProperty = function (i, prop, endValue, duration, easing, refreshCanvas, removeAfterCompletion, activateEventsAfterAnimation, statusForVisualPropertiesEventsAfterAnimation) {
        var theMark = this;
        var visualProperty = theMark.visualProperties[i];
        fabric.util.animate({
            startValue: visualProperty[prop],
            endValue: endValue,
            duration: duration,
            easing: easing,
            onChange: function (value) {
                visualProperty[prop] = value;
                if (prop === 'left') {
                    visualProperty.inConnectors.forEach(function (inConnector) {
                        inConnector.set({'x2': visualProperty.left, 'y2': visualProperty.top});
                    });
                    visualProperty.outConnectors.forEach(function (outConnector) {
                        outConnector.set({'x1': visualProperty.left, 'y1': visualProperty.top});
                    });
                }
                // only render once
                if (refreshCanvas) {
                    canvas.renderAll();
                }
                visualProperty.setCoords();
            },
            onComplete: function () {
                visualProperty.setCoords();
                theMark.positionConnectors();
                if (removeAfterCompletion) {
                    visualProperty.remove();
                    canvas.renderAll();
                }

                if (activateEventsAfterAnimation) {
                    theMark.evented = true;
                    gestureSetEnabled(manager, 'pan1Finger', true);
                }

                theMark.setEnabledVisualPropertiesEvents(statusForVisualPropertiesEventsAfterAnimation);

            }
        });
    };

    this.setEnabledVisualPropertiesEvents = function (status) {
        this.visualProperties.forEach(function (visualProperty) {
            visualProperty.evented = status;
        });
    };


    this.expand = function (refreshCanvas) {

        if (!this.isCompressed)
            return;

//        if (LOG) console.log("%cExpanding", "background:red; color:white");
//        if (LOG) console.log("refreshCanvas: " + refreshCanvas + " - " + this.type);

        var theMark = this;
        theMark.setCoords();

        // Disabling any event for this mark. This will be enabled once the animations of this method are done.
        theMark.evented = false;
        gestureSetEnabled(manager, 'pan1Finger', false);

        var theBackground = this.backgroundRect;
        var duration = 500;
        var easing = fabric.util.ease['easeOutCubic'];

        var boundingRect = theMark.getBoundingRect();
        var objectCenter = theMark.getCenterPoint();

        if (theMark.isCircularMark && (theMark.scaleX == theMark.scaleY)) {
            var markRealRadius = theMark.radius * theMark.scaleX;
            if (boundingRect.width / canvas.getZoom() < theMark.propertiesRadius) {
                markRealRadius = theMark.propertiesRadius + 5;
            }
            var wh = 2 * markRealRadius;
            boundingRect = {top: objectCenter.y - markRealRadius, left: objectCenter.x - markRealRadius, width: wh, height: wh};

        } else if (theMark.isEllipticMark && (theMark.rx == theMark.ry) && (theMark.scaleX == theMark.scaleY)) {

            var markRealRadius = theMark.rx * theMark.scaleX;
            if (markRealRadius < theMark.propertiesRadius) {
                markRealRadius = theMark.propertiesRadius + 5;
            }
            var wh = 2 * markRealRadius * canvas.getZoom();
            boundingRect = {top: objectCenter.y - markRealRadius, left: objectCenter.x - markRealRadius, width: wh, height: (2 * this.ry * this.scaleY) * canvas.getZoom()};
        }

        // The dimensions of the bounding rectangle are absolute, thus, the zoom level has to be taken into account
        if (boundingRect.width / canvas.getZoom() < theMark.propertiesRadius) {
            boundingRect.width = 2 * theMark.propertiesRadius;
        }

        // TODO: Eventually, this compensantion should not be necessary
        if (theMark.isFatFontMark || theMark.isSVGPathGroupMark || theMark.isSVGPathMark || theMark.isPathMark || theMark.isRectangularMark || theMark.isEllipticMark || theMark.isSquaredMark) {
            compensateBoundingRect(boundingRect);
        }

        var newHeight = theMark.visualProperties.length * (2 * theMark.propertiesRadius + 15) + boundingRect.height + 2 * theMark.indent;
        if (this.iText && this.iText.text != '') {
            newHeight += (2 * theMark.labelGap);
        }

        var newWidth = boundingRect.width + 2 * theMark.indent;
        var newTop = theMark.top + (newHeight / 2 - boundingRect.height / 2 - theMark.indent);

        theBackground.width = newWidth;
        theBackground.height = 0;
        theBackground.left = theMark.left;
        theBackground.top = theMark.top;
        theBackground.stroke = theMark.visualPropertyStroke || theMark.colorForStroke;

        theBackground.strokeWidth = 1;

        theBackground.bringToFront();
        theMark.bringToFront();

        var theParentObject = theMark.parentObject;
        if (theParentObject && theParentObject.isLocator && !theParentObject.isCompressed && theParentObject.selectedMark === theMark) {
            theMark.xVisualProperty.bringToFront();
            theMark.yVisualProperty.bringToFront();
        }
        if (theMark.iText) {
            theMark.iText.bringToFront();
        }

        var boundingRectCenterBottom = new fabric.Point(theMark.left, objectCenter.y + boundingRect.height / 2);
//        var boundingRectCenterBottom = new fabric.Point(theMark.left, boundingRect.top + boundingRect.height);
//        drawRectAt(boundingRectCenterBottom, "green");
        boundingRectCenterBottom.y += theMark.propertiesGap;
        if (this.iText && this.iText.text != '') {
            boundingRectCenterBottom.y += (2 * theMark.labelGap);
        }

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
                theBackground.setGradient('fill', {
                    type: 'linear',
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: theBackground.getHeight(),
                    colorStops: {
                        0: 'rgb(255,255,255, 1)',
                        0.5: 'rgba(242,242,242,0.75)',
                        1: 'rgb(255,255,255, 1)'
                    }
                });
            },
            onComplete: function () {
                theMark.isCompressed = false;
//                drawRectAt(new fabric.Point(theBackground.left, theBackground.top), "black");
            }
        });

        var positions = new Array();
        var i = 0;
        theMark.visualProperties.forEach(function (visualProperty) {

            var x = theMark.left;
            var y = boundingRectCenterBottom.y + i * theMark.propertiesSeparation;

//            drawRectAt(new fabric.Point(x,y), generateRandomColor());

            canvas.add(visualProperty);
            visualProperty.bringForward(true);

            visualProperty.outConnectors.forEach(function (connector) {
                connector.bringToFront();
            });

            visualProperty.inConnectors.forEach(function (connector) {
                connector.bringToFront();
            });

            visualProperty.left = theMark.left;
            visualProperty.top = theMark.top;
            visualProperty.scaleX = 0;
            visualProperty.scaleY = 0;
            visualProperty.opacity = 0;

            positions.push({x: x, y: y});

            i++;
        });

//        var easing = fabric.util.ease['easeInCubic'];
        var easing = fabric.util.ease['easeOutQuad'];

        for (var i = 0; i < theMark.visualProperties.length; i++) {

            var isTheLastElement = i == theMark.visualProperties.length - 1;

            theMark.animateVisualProperty(i, 'opacity', 1, duration, easing, false, false, false, false);
            theMark.animateVisualProperty(i, 'scaleX', 1, duration, easing, false, false, false, false);
            theMark.animateVisualProperty(i, 'scaleY', 1, duration, easing, false, false, false, false);
            theMark.animateVisualProperty(i, 'left', positions[i].x, duration, easing, false, false, false, false);
            theMark.animateVisualProperty(i, 'top', positions[i].y, duration, easing, refreshCanvas && isTheLastElement, false, isTheLastElement, isTheLastElement);

        }

    };



    this.compress = function (refreshCanvas) {

        if (this.isCompressed)
            return;

//        if (LOG) console.log("%cCompressing", "background:green; color:white");
//        if (LOG) console.log("refreshCanvas: " + refreshCanvas + " - " + this.type);

        var theMark = this;

        // Disabling any event for this mark. This will be enabled once the animations of this method are done.
        theMark.evented = false;
        gestureSetEnabled(manager, 'pan1Finger', false); // Disabling the panning functionality while the mark is compressing 
        theMark.setEnabledVisualPropertiesEvents(false); // The events for the Visual Properties of this mark are also disabled when the compression begin

        var theBackground = this.backgroundRect;
        var duration = 500;
        var easing = fabric.util.ease['easeOutQuad'];

        theBackground.animate('top', theMark.top, {
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
                theMark.isCompressed = true;
                theBackground.setCoords();
                canvas.renderAll();
            }
        });

        for (var i = 0; i < theMark.visualProperties.length; i++) {

            var isTheLastElement = i == theMark.visualProperties.length - 1;

            theMark.animateVisualProperty(i, 'opacity', 0, duration, easing, false, true, false, false);
            theMark.animateVisualProperty(i, 'scaleX', 0, duration, easing, false, true, false, false);
            theMark.animateVisualProperty(i, 'scaleY', 0, duration, easing, false, true, false, false);
            theMark.animateVisualProperty(i, 'left', theMark.left, duration, easing, false, true, false, false);
            theMark.animateVisualProperty(i, 'top', theMark.top, duration, easing, refreshCanvas && isTheLastElement, true, isTheLastElement, false);
        }

        theMark.bringToFront();
        var theParentObject = theMark.parentObject;
        if (theParentObject && theParentObject.isLocator && !theParentObject.isCompressed && theParentObject.selectedMark === theMark) {
            theMark.xVisualProperty.bringToFront();
            theMark.yVisualProperty.bringToFront();
        }

    };

    this.positionMarkConnectors = function () {
        var theMark = this;
        theMark.inConnectors.forEach(function (inConnector) {
            inConnector.set({'x2': theMark.left, 'y2': theMark.top});
        });
    };

    this.positionConnectors = function () {



        var theMark = this;

        theMark.inConnectors.forEach(function (inConnector) {
            inConnector.set({'x2': theMark.left, 'y2': theMark.top});
        });

        theMark.visualProperties.forEach(function (visualProperty) {
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

    this.hideLabel = function () {
        this.iText.opacity = 0;
        this.iText.permanentOpacity = 0;
        this.iText.evented = false;
        this.labelVisible = false;
    };

    this.showLabel = function () {
        this.iText.opacity = 1;
        this.iText.permanentOpacity = 1;
        this.iText.evented = true;
        this.labelVisible = true;
    };

    this.positionElements = function () {

        var theMark = this;

//        if (LOG) console.log("positionElements FUNCTION");

        theMark.setCoords();

        theMark.positionMarkConnectors();

        var objectCenter = theMark.getCenterPoint();
        var boundingRect = theMark.getBoundingRect();

//        drawRectAt(objectCenter, "blue");
//        drawRectAt(new fabric.Point(boundingRect.left, boundingRect.top), "green");
//        drawRectAt(new fabric.Point(boundingRect.left + boundingRect.width, boundingRect.top + boundingRect.height), "green");

        if (theMark.isCircularMark && (theMark.scaleX == theMark.scaleY)) {
            var markRealRadius = theMark.radius * theMark.scaleX;

            if (markRealRadius / canvas.getZoom() < theMark.propertiesRadius) {
                markRealRadius = theMark.propertiesRadius;
            }
            var wh = 2 * markRealRadius;
            boundingRect = {top: objectCenter.y - markRealRadius, left: objectCenter.x - markRealRadius, width: wh, height: wh};

        } else if (theMark.isEllipticMark && (theMark.rx == theMark.ry) && (theMark.scaleX == theMark.scaleY)) {

            var markRealRadius = theMark.rx * theMark.scaleX;
            if (markRealRadius < theMark.propertiesRadius) {
                markRealRadius = theMark.propertiesRadius + 5;
            }
            var wh = 2 * markRealRadius * canvas.getZoom();
            boundingRect = {top: objectCenter.y - markRealRadius, left: objectCenter.x - markRealRadius, width: wh, height: (2 * this.ry * this.scaleY) * canvas.getZoom()};
        }

        // The dimensions of the bounding rectangle are absolute, thus, the zoom level has to be taken into account
        if (boundingRect.width / canvas.getZoom() < theMark.propertiesRadius) {
            boundingRect.width = 2 * theMark.propertiesRadius;
        }

        // TODO: Eventually, this compensantion should not be necessary
        if (theMark.isFatFontMark || theMark.isSVGPathGroupMark || theMark.isSVGPathMark || theMark.isPathMark || theMark.isRectangularMark || theMark.isEllipticMark || theMark.isSquaredMark) {
            compensateBoundingRect(boundingRect);
        }

        var newHeight = theMark.visualProperties.length * (2 * theMark.propertiesRadius + 15) + boundingRect.height + 2 * theMark.indent;
        if (this.iText && this.iText.text != '') {
            newHeight += (2 * theMark.labelGap);
        }

        var newWidth = boundingRect.width + 2 * theMark.indent;

        theMark.backgroundRect.left = theMark.left;

        theMark.backgroundRect.width = newWidth;
        theMark.backgroundRect.height = newHeight;

        if (theMark.isCompressed) {
            theMark.backgroundRect.top = theMark.top;
            theMark.backgroundRect.width = 0;
            theMark.backgroundRect.height = 0;
        } else {
            var newTop = theMark.top + (newHeight / 2 - boundingRect.height / 2 - theMark.indent);
            theMark.backgroundRect.top = newTop;
        }

        theMark.backgroundRect.setCoords();

        var boundingRectCenterBottom = new fabric.Point(theMark.left, objectCenter.y + boundingRect.height / 2);
//        drawRectAt(boundingRectCenterBottom, "red");

        boundingRectCenterBottom.y += theMark.propertiesGap;

        if (this.iText && this.iText.text != '') {
            boundingRectCenterBottom.y += (2 * theMark.labelGap);
        }

        var i = 0;
        this.visualProperties.forEach(function (visualProperty) {

            var x = theMark.left;
            var y = theMark.top;

            // A different y position for each visual property is only needed when the Mark is expanded
            if (!theMark.isCompressed) {
                y = boundingRectCenterBottom.y + i * theMark.propertiesSeparation;
            }

            visualProperty.left = x;
            visualProperty.top = y;
            visualProperty.setCoords();

            visualProperty.inConnectors.forEach(function (inConnector) {
                if (theMark.isCompressed) {
                    inConnector.set({'x2': theMark.left, 'y2': theMark.top});
                } else {
                    inConnector.set({'x2': visualProperty.left, 'y2': visualProperty.top});
                }
            });

            visualProperty.outConnectors.forEach(function (outConnector) {
                if (theMark.isCompressed) {
                    outConnector.set({'x1': theMark.left, 'y1': theMark.top});
                } else {
                    outConnector.set({'x1': visualProperty.left, 'y1': visualProperty.top});
                }
            });



            i++;

        });

//      theMark.setCoords();

    };

    this.getVisualPropertyByAttributeName = function (attributeName) {
        var theMark = this;
        for (var i = 0; i < theMark.visualProperties.length; i++) {
            if (theMark.visualProperties[i].attribute === attributeName) {
                return theMark.visualProperties[i];
            }
        }
        return null;
    };




    this.clone = function (options) {

        var theMark = this;

        var theCopy = fabric.util.object.clone(theMark);

        // The paths (for SVGGroups ) should also be clonned. Otherwise, the modification of the color in the clone (or the original mark) would also change the color of the original mark (or the clone)
        if (theMark.paths) {
            theCopy.paths = new Array();
            theMark.paths.forEach(function (path) {
                theCopy.paths.push(fabric.util.object.clone(path));
            });
        }

//        if (LOG) console.log("%ctheMark.paths", "background:pink; color:blue;");
//        if (LOG) console.log(theMark.paths);

//        if (theMark.paths === theCopy.paths) {
//            alert("The paths are the same");
//        }

//        if (LOG) console.log("%ctheCopy", "background:pink; color:blue;");
//        if (LOG) console.log(theCopy);
//        
//        if (LOG) console.log("%ctheMark", "background:pink; color:blue;");
//        if (LOG) console.log(theMark);

        theCopy.isCompressed = true;

        if (options) {
            for (var key in options) {
                if (key === "targetWidth") {

                    var theWidth = options.targetWidth / this.width;
                    theCopy.set('finalScaleX', theWidth);
                    theCopy.set("the_width", options.targetWidth);

                } else if (key === "targetHeight") {

                    var theHeight = options.targetHeight / this.height;
                    theCopy.set('finalScaleY', theHeight);
                    theCopy.set("the_height", options.targetHeight);

                } else {
                    theCopy.set(key, options[key]);
                }
            }

        }

        theCopy.createIText();
        theCopy.createRectBackground();

        theCopy.widgets = new Array();
        theCopy.visualProperties = new Array();

        theCopy.parentObject = null;

        theCopy.createVisualProperties();

        theCopy.createPositionProperties();

        // Before associating the events of the copy, we have to delete all the others that might have been added from the clone. Otherwise, the events of the cloned object would affect all the
        // related to the original one when these were affected by the events
        theCopy.off(); // IMPORTANT so that, for isntance, the moving of the clone does not affect the elements that had to be affected by the original object

        theCopy.associateEvents();

        if (options && options.fill && options.colorForStroke) {
            theCopy.changeColors(options.fill, options.colorForStroke);
        }

        theCopy.inConnectors = new Array();
        theCopy.set('inConnectors', new Array());

        // The values hold by the visual properties of the original mark should be copied to the copy
        theMark.visualProperties.forEach(function (visualProperty) {
            var attribute = visualProperty.attribute;
            var value = visualProperty.value;
            if (value.clone) {
                var clonedValue = value.clone();
                theCopy.getVisualPropertyByAttributeName(attribute).value = clonedValue;
            }
        });

        if (options) {
            if (options.targetWidth) {
                theCopy.getVisualPropertyByAttributeName("width").value = createNumericValue(options.targetWidth, null, null, 'pixels');
            }
            if (options.targetHeight) {
                theCopy.getVisualPropertyByAttributeName("height").value = createNumericValue(options.targetHeight, null, null, 'pixels');
            }
        }

        if (theMark.isPathMark) {
            theCopy.getVisualPropertyByAttributeName("xCollection").value = theMark.getVisualPropertyByAttributeName("xCollection").value;
            theCopy.getVisualPropertyByAttributeName("yCollection").value = theMark.getVisualPropertyByAttributeName("yCollection").value;
        }


        if (LOG)
            console.log(" **************************** theCopy: **************************** ");
        if (LOG)
            console.log(theCopy);

        return theCopy;

    };

    this.configurePositionVisualProperties = function () {

        var theMark = this;
        var theLocator = theMark.parentObject;

        theMark.setCoords();

        var xVisualProperty = theMark.xVisualProperty;
        xVisualProperty.parentObject = theLocator;
        xVisualProperty.untransformedX = theMark.untransformedX - theLocator.radius + theMark.width / 2;
        xVisualProperty.untransformedY = 0;
        xVisualProperty.untransformedScaleX = 1;
        xVisualProperty.untransformedScaleY = 1;
        xVisualProperty.untransformedAngle = 0;
        xVisualProperty.scaleX = 1;
        xVisualProperty.scaleY = 1;
        xVisualProperty.opacity = 1;

        var yVisualProperty = theMark.yVisualProperty;
        yVisualProperty.parentObject = theLocator;
        yVisualProperty.untransformedX = 0;
        yVisualProperty.untransformedY = theMark.untransformedY - theLocator.radius + theMark.height / 2;
        yVisualProperty.untransformedScaleX = 1;
        yVisualProperty.untransformedScaleY = 1;
        yVisualProperty.untransformedAngle = 0;
        yVisualProperty.scaleX = 1;
        yVisualProperty.scaleY = 1;
        yVisualProperty.opacity = 1;

    };

    this.activateCopyingMode = function () {
        // enter copying mode
        blink(this, true);
        this.copyingMode = true;
        this.lockMovementX = true;
        this.lockMovementY = true;

    };

    this.deactivateCopyingMode = function () {
        this.copyingMode = false;
        this.lockMovementX = false;
        this.lockMovementY = false;
        if (this.currentCopy) {
            this.currentCopy.evented = true;
            this.currentCopy = null;
        }
    };

    this.associateEvents = function () {
        var theMark = this;
        theMark.on({
            // This event is triggered when the mark is associated by a locator element
            'mouseover': function (options) {
                if (LOG) {
                    console.log("Mouse over a mark!");
                }
            },
            'mouseout': function (options) {
                if (LOG) {
                    console.log("Mouse out of a mark!");
                }
                this.deactivateCopyingMode(); // TODO: Should this be here? 
            },
            // This event is triggered when the mark is associated by a locator element
            'newInConnection': function (options) {
                var newInConnection = options.newInConnection;
                var shouldAnimate = options.shouldAnimate;
                this.inConnectors.push(newInConnection);
            },
            'inConnectionRemoved': function (options) {

                if (LOG)
                    console.log("%cIN CONNECTOR", "background:pink; color:black;");

                if (LOG)
                    console.log("Before: ");
                if (LOG)
                    console.log(theMark.inConnectors);

                var removedConnection = options.connector;
                fabric.util.removeFromArray(theMark.inConnectors, removedConnection);

                theMark.parentObject = null;

                if (LOG)
                    console.log("After: ");
                if (LOG)
                    console.log(theMark.inConnectors);

            },
            'pressed': function (options) {
                if (LOG)
                    console.log("This mark has been pressed");
                theMark.positionElements();


                this.activateCopyingMode();


            },
            'moving': function (options) {

                if (this.copyingMode) {

                    console.log("%c" + "MARK MOVING in COPYING mode. Someone is trying to duplicate this mark.", "background: #2d287a; color: white;");

                    if (options.e.touches.length === 2) {



                        var touch1 = options.e.touches['0'];

                        if (touch1) {

                            console.log("touch1:");
                            console.log(touch1);

                            var p1 = getCanvasCoordinatesFromTouch(touch1);

//                        drawRectAt(p1, "red");

                        }

                        var touch2 = options.e.touches['1'];

                        if (touch2) {

                            console.log("touch2:");
                            console.log(touch2);


                            var p2 = getCanvasCoordinatesFromTouch(touch2);


//                        drawRectAt(p2, "green");

                            if (!this.currentCopy) {
                                this.currentCopy = this.clone();
                                this.currentCopy.applyUnselectedStyle(false);
                                this.currentCopy.opacity = 0.6;
                                this.currentCopy.evented = false;
                                canvas.add(this.currentCopy);
                                console.log("%c" + "Clone added to canvas!", "background: #6dce8d; color: black;");
                            }

                            if (this.currentCopy) {
                                this.currentCopy.setPositionByOrigin(p2, 'center', 'center');
                                this.currentCopy.positionElements();
                            }





                        }


                    } else {



                    }






                } else {

                    this.positionElements();

                    if (this.parentObject && this.parentObject.isLocator) {

                        if (LOG)
                            console.log("This mark has a parent object");

                        computeUntransformedProperties(this);
                        this.parentObject.trigger('markMoving', this);
                    }

                }

            },
            'rotating': function (options) {
                if (LOG)
                    console.log("rotating event");
                theMark.positionElements();

                var visualProperty = theMark.getVisualPropertyByAttributeName('angle');
                if (visualProperty) {
                    visualProperty.inConnectors.forEach(function (inConnector) {
                        inConnector.contract();
                    });
                    visualProperty.outConnectors.forEach(function (outConnector) {
                        outConnector.setValue(theMark.angle % 360, false, false);
                    });
                }

                if (theMark.parentObject && theMark.parentObject.isLocator) {
                    computeUntransformedProperties(theMark);
                    theMark.parentObject.trigger('markMoving', theMark);
                }

            },
            'scaling': function (options) {
                if (LOG)
                    console.log("scaling event");
                theMark.positionElements();

                if (theMark.parentObject && theMark.parentObject.isLocator) {
                    computeUntransformedProperties(theMark);
                    theMark.parentObject.trigger('markMoving', theMark);
                }

            },
            'mouseup': function (options) {

                if (this.copyingMode) {

                    if (LOG) {
                        console.log("%c" + "MOUSE UP over a mark!", "background: #914b30; color: white;");
                    }


                    if (this.currentCopy) {
                        this.currentCopy.opacity = 1;
                        this.currentCopy.evented = true;
                        this.currentCopy.positionElements();
                        this.currentCopy.deactivateCopyingMode();
                        canvas.renderAll();
                    }

                }

            },
            'mousedown': function (options) {

                if (LOG) {
                    console.log("%c" + "MOUSE DOWN over a mark!", "background: #572a82; color: white;");
                    console.log("%c" + "this.copyingMode: " + this.copyingMode, "background: #572a82; color: white;");
                }




                if (this.copyingMode) {

                    this.currentCopy = this.clone();
                    this.currentCopy.applyUnselectedStyle(false);
                    this.currentCopy.opacity = 0.6;
                    this.currentCopy.evented = false;
                    canvas.add(this.currentCopy);

                    if (LOG) {
                        console.log("%c" + "Clone added to canvas!", "background: #6dce8d; color: black;");
                    }







                } else {

                    if (!theMark.isCompressed) {
                        theMark.backgroundRect.bringToFront();
                        theMark.visualProperties.forEach(function (visualProperty) {
                            if (visualProperty.canvas) {
                                visualProperty.bringToFront();


                                visualProperty.inConnectors.forEach(function (inConnection) {
                                    inConnection.bringToFront();
                                });
                                visualProperty.outConnectors.forEach(function (outConnection) {
                                    outConnection.bringToFront();
                                });

                            }
                        });
                        if (theMark.iText) {
                            theMark.iText.bringToFront();
                        }
                    }
                    theMark.bringToFront();

                }

            },
            'selected': function (options) {
                if (theMark.parentObject && theMark.parentObject.isLocator) {
                    theMark.parentObject.trigger('markSelected', theMark);
                }
            },
            'doubleTap': function (options) {

                if (LOG)
                    console.log("options.event:");
                if (LOG)
                    console.log(options.event);

                options.event.preventDefault();

                if (LOG)
                    console.log("%cDouble tap on this mark!", "color:blue;");
                if (LOG)
                    console.log("%cthis.visualPropertyFill:" + this.visualPropertyFill, "background:" + this.visualPropertyFill + ", color:white;");

                if (LOG)
                    console.log(this);

                if (this.isCompressed) {
                    this.expand(true);
                } else {
                    this.compress(true);
                }
            }
        });
    };




    this.renderLocationLines = function (ctx) {

        var theMark = this;
        var theParentObject = theMark.parentObject;

        if (theParentObject && theParentObject.isLocator && !theParentObject.isCompressed && theParentObject.selectedMark === theMark) {

            var relativeX = theParentObject.getPointByOrigin('center', 'center').x - theMark.getPointByOrigin('center', 'center').x;
            var relativeY = theParentObject.getPointByOrigin('center', 'center').y - theMark.getPointByOrigin('center', 'center').y;

            ctx.save();

            ctx.setLineDash([8, 8]);
            ctx.beginPath();

            var markCenter = this.getCenterPoint();
            if (this.isSVGPathGroupMark) {
                ctx.moveTo(markCenter.x, markCenter.y);
                ctx.lineTo(markCenter.x, markCenter.y + relativeY);
            } else {
                ctx.moveTo(0, 0);
                ctx.lineTo(0, relativeY);
            }



            if (this.isSVGPathGroupMark) {
                ctx.moveTo(markCenter.x, markCenter.y);
                ctx.lineTo(markCenter.x + relativeX, markCenter.y);
            } else {
                ctx.moveTo(0, 0);
                ctx.lineTo(relativeX, 0);
            }

            ctx.stroke();


            ctx.fillStyle = 'black';
            ctx.font = "16px sans-serif";


            if (relativeX < 0) {
                ctx.textAlign = "right";
                if (this.isSVGPathGroupMark) {
                    ctx.fillText(relativeY.toFixed(2), markCenter.x + relativeX - 30, markCenter.y + 6);
                } else {
                    ctx.fillText(relativeY.toFixed(2), relativeX - 30, 6);
                }
            } else {
                ctx.textAlign = "left";
                if (this.isSVGPathGroupMark) {
                    ctx.fillText(relativeY.toFixed(2), markCenter.x + relativeX + 30, markCenter.y + 6);
                } else {
                    ctx.fillText(relativeY.toFixed(2), relativeX + 30, 6);
                }
            }

            ctx.textAlign = "center";
            if (relativeY < 0) {
                if (this.isSVGPathGroupMark) {
                    ctx.fillText(-relativeX.toFixed(2), markCenter.x, markCenter.y + relativeY - 30);
                } else {
                    ctx.fillText(-relativeX.toFixed(2), 0, relativeY - 30);
                }
            } else {
                if (this.isSVGPathGroupMark) {
                    ctx.fillText(-relativeX.toFixed(2), markCenter.x, markCenter.y + relativeY + 40);
                } else {
                    ctx.fillText(-relativeX.toFixed(2), 0, relativeY + 40);
                }
            }

            ctx.closePath();
            ctx.restore();
        }

    };

    return this;
};

/* Function to add outputs to Canvas*/
function addMarkToCanvas(markType, options) {
    if (LOG) {
        console.log("%cThe birth of this mark will be animated...", "background: red; color: white;");
    }
    if (markType === CIRCULAR_MARK) {
        return addCircularMarkToCanvas(options);
    } else if (markType === SQUARED_MARK) {
        return addSquaredMarkToCanvas(options);
    } else if (markType === RECTANGULAR_MARK) {
        return addRectangularMarkToCanvas(options);
    } else if (markType === ELLIPTIC_MARK) {
        return addEllipticMarkToCanvas(options);
    } else if (markType === FATFONT_MARK) {
        return addFatFontMarkToCanvas(options);
    } else if (markType === PATH_MARK) {
        return addPathMarkToCanvas(options.thePath, options);
    } else if (markType === FILLEDPATH_MARK) {
        return addSVGPathMarkToCanvas(options.thePath, options);
    } else if (markType === SVGPATHGROUP_MARK) {
        return addSVGPathGroupMarkToCanvas(options.thePaths, options);
    }
}

function copyVisualPropertiesConnectors(fromMark, toMark) {

    fromMark.visualProperties.forEach(function (sourceVisualProperty) {

        var targetVisualProperty = toMark.getVisualPropertyByAttributeName(sourceVisualProperty.attribute);
        if (targetVisualProperty) {

            if (LOG)
                console.log("FOUND: " + sourceVisualProperty.attribute);

            // If here, botht the fromMark and the toMark have a common visual property
            // At this point, the inConnectors and outConnectors from the sourceVisualProperty should be copied to the targetVisualProperty

            sourceVisualProperty.inConnectors.forEach(function (inConnector) {
                if (LOG)
                    console.log("\tIN connector: " + inConnector);
//            inConnector.setDestination(targetVisualProperty, false);
                inConnector.destination = targetVisualProperty; // It's more efficient to do this, than to call the setDestination method from the Connector class (as it will set some events for the visual property)
                targetVisualProperty.inConnectors.push(inConnector);
            });

            sourceVisualProperty.outConnectors.forEach(function (outConnector) {
                if (LOG)
                    console.log("\tOUT connector: " + outConnector);
//            outConnector.setSource(targetVisualProperty);
                outConnector.source = targetVisualProperty; // It's more efficient to do this, than to call the setSource method (as it will set some events for the visual property)
                targetVisualProperty.outConnectors.push(outConnector);
            });


        } else {



            sourceVisualProperty.inConnectors.forEach(function (inConnector) {
                inConnector.contract();
            });

            sourceVisualProperty.outConnectors.forEach(function (outConnector) {
                outConnector.contract();
            });
        }

    });

}

function changeMarkShape(theMark, shapeValue) {

    if (LOG)
        console.log("What the 'changeMarkShape' function gets as second parameter:");
    if (LOG)
        console.log(shapeValue);

    if (!shapeValue.isShapeData) {
        return;
    }

    var path = null;
    var svgPathGroupMark = null;
    var newShape = null;

    if (shapeValue.path) {
        path = shapeValue.path;
    } else if (shapeValue.svgPathGroupMark) {
        svgPathGroupMark = shapeValue.svgPathGroupMark;
    }

    if (LOG)
        console.log("shapeValue:");
    if (LOG)
        console.log(shapeValue);

    newShape = shapeValue.shape;

    if (LOG)
        console.log("newShape");
    if (LOG)
        console.log(newShape);


//    if (LOG) console.log("The received path:");
//    if (LOG) console.log(path);

    var originalMarkExpanded = !theMark.isCompressed;

    // The mark that has to change of shape is compressed so that their attributes are not visible 
    theMark.compress(true);

    setTimeout(function () {

        var duration = 500;
        var easing = fabric.util.ease['easeOutQuad'];

        theMark.animate('scaleX', 0, {
            easing: easing,
            duration: duration,
        });
        theMark.animate('scaleY', 0, {
            easing: easing,
            duration: duration,
            onChange: function () {
                theMark.positionElements();
                canvas.renderAll();
            },
            onComplete: function () {

                var options = theMark.generateOptionsForShape(newShape);

                // All the replacing marks should be born with no size
                options.scaleX = 0;
                options.scaleY = 0;
                options.animateAtBirth = false;
                options.markAsSelected = true;

                if (path) {
                    options.thePath = path;
                }

                if (LOG)
                    console.log("****** Options to create the new mark: ******");
                if (LOG)
                    console.log(options);

                theMark.remove();

                // Creating a svg path group in the same way the other marks are created is complicated, because the SVGPATHGROUP_MARK has synchronization issues (because of the amount of information it stores)
                // Because of this, when the destination should be a SVGPATHGROUP_MARK, the approach used is cloning, instead of creating the mark from scratch
                // It is assumed that the shape that will be cloned is sent to this function in the object that is received as a parameter                
                var newMark = null;

                if (LOG)
                    console.log("svgPathGroupMark:");
                if (LOG)
                    console.log(svgPathGroupMark);

                if (svgPathGroupMark) {

                    // Cloning the mark that will provides the shape
                    newMark = svgPathGroupMark.clone(options);
                    canvas.add(newMark);

                } else {
                    newMark = addMarkToCanvas(newShape, options);
                }

                if (LOG)
                    console.log("++++++ The created mark ++++++");
                if (LOG)
                    console.log(newMark);

                copyVisualPropertiesConnectors(theMark, newMark);

                easing = fabric.util.ease['easeInQuad'];

                newMark.animate('scaleX', newMark.finalScaleX || 1, {
                    easing: easing,
                    duration: duration,
                });
                newMark.animate('scaleY', newMark.finalScaleY || 1, {
                    easing: easing,
                    duration: duration,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function () {
                        if (originalMarkExpanded) {
                            newMark.expand(true);
                        }
                    }
                });
                canvas.renderAll();
            }
        });

    }, 500);

}




function createMarkFromXMLNode(valueXmlNode) {

    var options = {
        markType: valueXmlNode.attr('shape'),
        values: {}
    };

    var children = valueXmlNode.children();
    children.each(function () {
        var child = $(this);
        var tagName = this.tagName;



        if (tagName === "property") {

            var valueXmlNode = $(child.find('value')[0]);
            var propertyValue = createValueFromXMLNode(valueXmlNode);

            var attribute = child.attr('attribute');

            if (LOG) {
                console.log(attribute + ":");
                console.log(propertyValue);
            }

            options.values[attribute] = propertyValue;


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

    return createMark(options);
}

function createMark(options) {

    var markType = options.markType;
    var isExpanded = options.isExpanded;

    options.doNotRefreshCanvas = (options.markType !== SVGPATHGROUP_MARK); // SVGPATHGROUP_MARKs should always refresh the canvas, as they do not necessarily are loaded together with all other marks
    options.markAsSelected = false;
    options.animateAtBirth = !isExpanded;

    if (LOG) {
        console.log("options:");
        console.log(options);
    }

    var mark = addMarkToCanvas(markType, options);

    if (typeof mark !== 'undefined' && mark !== null) { // due to the asynchronous nature of SVGPATHGROUP_MARK, this should be checked. The expansion of such marks is donde withint their adding method
        if (isExpanded) {
            mark.expand(options.markType !== SVGPATHGROUP_MARK);
        }
    }



}