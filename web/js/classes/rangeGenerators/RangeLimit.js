var RangeLimit = fabric.util.createClass(fabric.Circle, {
    initialize: function (options) {
        options || (options = {});

        options.radius = 32;
        options.fill = rgb(198, 198, 198);
        options.stroke = rgb(66, 66, 66);
        options.colorForStroke = rgb(66, 66, 66);

        this.callSuper('initialize', options);
        this.set('strokeWidth', options.strokeWidth || 3);
        this.set('originalStrokeWidth', this.strokeWidth);
        this.set('lockMovementX', options.lockMovementX || false);
        this.set('lockMovementY', options.lockMovementY || true);
        this.set('lockScalingX', options.lockScalingX || true);
        this.set('lockScalingY', options.lockScalingY || true);
        this.set('hasRotatingPoint', options.hasRotatingPoint || false);
        this.set('hasBorders', options.hasBorders || false);
        this.set('hasControls', options.hasControls || false);

        this.set('inConnectors', new Array());
        this.set('outConnectors', new Array());
        this.set('isRangeLimit', true);
        this.set('dataTypeProposition', null);
        this.originX = 'center';
        this.originY = 'center';
        this.set({left: options.left, top: options.top});
        this.setCoords();
        this.associateEvents();
    },
    applySelectedStyle: function (selectConnectors) {

        this.selected = true;
        this.stroke = widget_selected_stroke_color;
        this.strokeDashArray = widget_selected_stroke_dash_array;
        this.strokeWidth = widget_selected_stroke_width;

        if (selectConnectors) {
            this.inConnectors.forEach(function (inConnector) {
                inConnector.opacity = 1;
                if (!inConnector.source.isOperator) {
                    inConnector.applySelectedStyle(true, false);
                } else {
                    inConnector.source.applySelectedStyle(false);
                    inConnector.applySelectedStyle(false, false);
                }
            });
            this.outConnectors.forEach(function (outConnector) {
                outConnector.opacity = 1;
                if (!outConnector.source.isOperator) {
                    outConnector.applySelectedStyle(false, true);
                } else {
                    outConnector.destination.applySelectedStyle(false);
                    outConnector.applySelectedStyle(false, false);
                }
            });
        }
    },
    applyUnselectedStyle: function (unselectConnectors) {
        this.selected = false;
        this.stroke = this.colorForStroke;
        this.strokeDashArray = [];
        this.strokeWidth = this.originalStrokeWidth;
        if (unselectConnectors) {
            this.inConnectors.forEach(function (inConnector) {
                inConnector.opacity = canvas.connectorsHidden ? 0 : 1;
                inConnector.applyUnselectedStyle(false, false);
            });
            this.outConnectors.forEach(function (outConnector) {
                outConnector.opacity = canvas.connectorsHidden ? 0 : 1;
                outConnector.applyUnselectedStyle(false, false);
            });
        }

    },
    removeTypeIcon: function () {
        var theLimit = this;
        if (theLimit.typeIcon && theLimit.typeIcon.canvas) {
            theLimit.typeIcon.remove();
            theLimit.typeIcon = null;
        }
    },
    addTypeIcon: function (iconName, blinkingFactor, doNotBlinkLimit) {

        var theLimit = this;
        var center = theLimit.getCenterPoint();

        var stringPath = icons[iconName].path;
        var icon = new fabric.Path(stringPath, {
            originX: 'center',
            originY: 'center',
            strokeWidth: iconName === "dateAndTime" ? 2.5 : 3,
            stroke: icons[iconName].stroke,
            fill: 'white',
            selectable: false,
            evented: false,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            opacity: 1,
            permanentOpacity: 1,
            movingOpacity: 1,
            top: center.y,
            left: center.x,
            scaleX: 0.65,
            scaleY: 0.65,
        });
        theLimit.iconName = iconName;
        theLimit.dataTypeProposition = getDataTypePropositionByIconName(iconName);

        if (!blinkingFactor) {
            blinkingFactor = 0.3;
        }

        theLimit.colorForStroke = icons[iconName].stroke;
        theLimit.stroke = icons[iconName].stroke;
        theLimit.fill = icons[iconName].fill;
        theLimit.typeIcon = icon;
        canvas.add(icon);

        bringToFront(theLimit.typeIcon);

        blink(icon, false, 0.30); // the canvas will be refreshed at some point below this, so no need to refresh it here

        if (!doNotBlinkLimit) {
            blink(theLimit, true, blinkingFactor);
        }

    },
    updateConnectorsPositions: function () {
        updateConnectorsPositions(this);
    },
    setValue: function (value, shouldAnimate, refreshCanvas) {

        console.log("%c RangeLimit setValue function. shouldAnimate: " + shouldAnimate + ", refreshCanvas: " + refreshCanvas, "background: #4B0082; color: white;");

        var theLimit = this;
        theLimit.value = value;

        if (refreshCanvas) {
            canvas.renderAll();
        }

        var i;
        for (i = 0; i < theLimit.outConnectors.length; i++) {
            theLimit.outConnectors[i].setValue(theLimit.value, false, shouldAnimate);
        }

        return true;




    },
    associateEvents: function () {

        var theOutputPoint = this;

        theOutputPoint.on({
            'moving': function (options) {

                var theLimit = this;
                var event = options.e;
                var canvasCoords = getCanvasCoordinates(event);

                if (theLimit.connecting) {

                    if (event) {
                        var canvasCoords = getCanvasCoordinates(event);
                        var lastAddedConnector = getLastElementOfArray(theLimit.outConnectors);
                        if (lastAddedConnector) {
                            lastAddedConnector.set({x2: canvasCoords.x, y2: canvasCoords.y});
                            canvas.renderAll();
                        }
                    }

                } else {

                    var pointer = canvas.getPointer(event);
                    var functionInputCenter = theLimit.getCenterPoint();
                    var pointerRelativeToCenter = {x: pointer.x - functionInputCenter.x, y: pointer.y - functionInputCenter.y};

                    var theGenerator = theLimit.generator;
                    if (theGenerator) {

                        theLimit.inConnectors.forEach(function (inConnector) {
                            inConnector.contract();
                        });

                        var startingX = theGenerator.minX.getCenterPoint().x - theLimit.width * theLimit.scaleX / 2;
                        var endingX = theGenerator.maxX.getCenterPoint().x + theLimit.width * theLimit.scaleX / 2;

                        var left = canvasCoords.x - ((theLimit.width * theLimit.scaleX / 2) + pointerRelativeToCenter.x);
                        var right = canvasCoords.x + ((theLimit.width * theLimit.scaleX / 2) - pointerRelativeToCenter.x);

                        if (left < startingX) {

                            theLimit.lockMovementX = true;
                            theLimit.setPositionByOrigin(new fabric.Point(theGenerator.minX.getCenterPoint().x, theLimit.top), 'center', 'center');

                        } else if (right > endingX) {

                            theLimit.lockMovementX = true;
                            theLimit.setPositionByOrigin(new fabric.Point(theGenerator.maxX.getCenterPoint().x, theLimit.top), 'center', 'center');

                        } else {

                            theLimit.lockMovementX = false;

                        }

                        theLimit.relativeX = theLimit.getPointByOrigin('center', 'center').x - theGenerator.getPointByOrigin('center', 'center').x;

                        theLimit.rangeProportion = Math.abs(theLimit.getCenterPoint().x - theGenerator.minX.getCenterPoint().x) / Math.abs(theGenerator.maxX.getCenterPoint().x - theGenerator.minX.getCenterPoint().x);

                        theLimit.setCoords();

                        theGenerator.computeOutput(null, false);


                    }

                }

            },
            'mouseup': function (options) {

                var theOutputPoint = this;

                if (theOutputPoint.connecting) {

                    var event = options.e;
                    var canvasCoords = getCanvasCoordinates(event);
                    var coordX = canvasCoords.x;
                    var coordY = canvasCoords.y;

                    var targetObject = findPotentialDestination(canvasCoords, ['isVisualProperty', 'isOperator', 'isFunctionInput', 'isAggregator', 'isDataType', 'isMapperInput', 'isVerticalCollection', 'isMark', 'isNumericFunctionInput']);
                    var lastAddedConnector = getLastElementOfArray(theOutputPoint.outConnectors);

                    if (targetObject) {

                        if (targetObject !== this) {

                            if (targetObject.isVisualProperty || targetObject.isFunctionInput || targetObject.isDataType || targetObject.isMapperInput || targetObject.isNumericFunctionInput || targetObject.isOperator) {

                                lastAddedConnector.setDestination(targetObject, true);

                            } else {

                                if (lastAddedConnector) {
                                    lastAddedConnector.contract();
                                }

                            }

                        } else {
                            var connector = theOutputPoint.outConnectors.pop();
                            if (connector) {
                                connector.contract();
                            }
                        }

                    } else {

                        var dataType = CreateDataTypeFromValue(lastAddedConnector.value);
                        dataType.top = coordY;
                        dataType.left = coordX;

                        lastAddedConnector.setDestination(dataType, true);

                        canvas.add(dataType);
                        dataType.animateBirth(false, null, null, false);

                        setTimeout(function () {
//                            theOutputPoint.bringToFront();
//                            dataType.bringToFront();
                            bringToFront(theOutputPoint);
                            bringToFront(dataType);
                        }, 50);

                    }

                    theOutputPoint.connecting = false;

                }

                theOutputPoint.lockMovementX = false;
                theOutputPoint.lockMovementY = true;

            },
            'pressed': function (options) {

                var theOutputPoint = this;

                theOutputPoint.connecting = true;

                theOutputPoint.lockMovementX = true;
                theOutputPoint.lockMovementY = true;
                blink(theOutputPoint, true, 0.45);

                var newConnector = new Connector({value: theOutputPoint.value, source: theOutputPoint, x2: theOutputPoint.left, y2: theOutputPoint.top, arrowColor: theOutputPoint.stroke, filledArrow: true, strokeWidth: 1});

                theOutputPoint.outConnectors.push(newConnector);
                canvas.add(newConnector);

            },
            'outConnectionRemoved': standarOutConnectionRemovedHandler,
            'inConnectionRemoved': standarInConnectionRemovedHandler,
            'newInConnection': function (options) {

                var theLimit = this;
                var limitName = theLimit.limitName;
                var theRange = theLimit.range;

                var newInConnection = options.newInConnection;
                var shouldAnimate = options.shouldAnimate;
                var doNotBlink = options.doNotBlink;
                var incommingValue = newInConnection.value;




                var currentValue = theLimit.value;
                var wasEmpty = theLimit.value && typeof theLimit.value !== 'undefined' && theLimit.value !== null;



                if (theLimit.setValue(incommingValue, doNotBlink)) {

                    var changingType = true;
                    if (currentValue) {
                        changingType = currentValue.getTypeProposition() !== incommingValue.getTypeProposition();
                    }

                    if (theLimit.inConnectors.length > 0) {
                        var connector = theLimit.inConnectors.pop();
                        connector.contract();
                    }

                    theLimit.inConnectors.push(newInConnection);

                    if (wasEmpty || changingType) {
                        setTimeout(function () {
                            theLimit.removeTypeIcon();
                            var iconName = getIconNameByDataTypeProposition(incommingValue.getTypeProposition());
                            theLimit.range.updateOutputColor(iconName);
                            theLimit.addTypeIcon(iconName, 0.45, doNotBlink);
                        }, 75);
                    }

                    theLimit.range.updateOtherLimit(theLimit.limitName);






//                    theLimit.outConnectors.forEach(function (outConnector) {
//                        outConnector.setValue(incommingValue, false, shouldAnimate);
//                    });

                    // Every time a value is set here, we also have to update the values of the outgoing connections
                    theLimit.outConnectors.forEach(function (outConnector) {

                        if (LOG)
                            console.log("The value that will be communicated to the connectors' destinations:");
                        if (LOG)
                            console.log(theLimit.value);

                        outConnector.setValue(theLimit.value.clone(), false, shouldAnimate);
                    });






                } else {

                    alertify.error("Error when trying to set the new value!", "", 2000);
                    newInConnection.contract();
                    return;

                }

            },
        });

    },
//    _render: function (ctx) {
//        ctx.save();
//        ctx.beginPath();
//        ctx.fillStyle = 'white';
//        ctx.arc(0, 0, this.width / 2, 0, 2 * Math.PI);
//        ctx.fill();
//        ctx.closePath();
//        ctx.restore();
//        this.callSuper('_render', ctx);
//    },
});