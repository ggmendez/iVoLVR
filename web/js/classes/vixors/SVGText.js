var SVGText = fabric.util.createClass(fabric.Text, {
    isSVGText: true,
    initialize: function (text, options) {

        options || (options = {});

        options.lockScalingX = true;
        options.lockScalingY = true;
        options.lockMovementX = true;
        options.lockMovementY = true;
        options.lockRotation = true;
        options.perPixelTargetFind = false;
        options.hasControls = false;
        options.hasRotatingPoint = false;
        options.hasBorders = true;

        this.callSuper('initialize', text, options);

        this.positionElements = function () {
            updateConnectorsPositions(this);
        };
        this.onMouseUp = function (options) {

            var theExtractor = this;

            if (theExtractor.permanentOpacity) {
                theExtractor.opacity = theExtractor.permanentOpacity;
            } else {
                theExtractor.opacity = 1;
            }

            if (theExtractor.moving) {

                var theEvent = options['e'];

                if (theEvent) {

                    if (LOG)
                        console.log(theEvent);

                    var canvasCoords = getCanvasCoordinates(theEvent);
                    var coordX = canvasCoords.x;
                    var coordY = canvasCoords.y;

                    // The mouse up event is done over a blank section of the canvas
                    var lastAddedConnector = getLastElementOfArray(theExtractor.outConnectors);

                    if (LOG)
                        console.log("%c" + canvasCoords, "background: gray");

                    var targetObject = findPotentialDestination(canvasCoords, ['isVisualProperty', 'isOperator', 'isFunctionInput', 'isAggregator', 'isMark', 'isPlayer', 'isDataType', 'isVerticalCollection', 'isMapperInput', 'isMapperOutput', 'isFunctionValuesCollection']);

                    if (LOG)
                        console.log("targetObject: ");
                    if (LOG)
                        console.log(targetObject);


                    if (targetObject) {

                        if (targetObject.isOperator || targetObject.isVisualProperty || targetObject.isFunctionInput || targetObject.isDataType || targetObject.isFunctionValuesCollection || targetObject.isMapperInput || targetObject.isMapperOutput) {

                            var connector = getLastElementOfArray(this.outConnectors);

                            connector.setDestination(targetObject, true);

                            if (!targetObject.isVerticalCollection) {

                                setTimeout(function () {
                                    bringToFront(connector.source);
                                    bringToFront(connector.destination);
                                }, 50);

                            }
                            
                        } else if (targetObject.isVerticalCollection) {

                            var theValue = theExtractor.value;
                            var connector = getLastElementOfArray(this.outConnectors);

                            // First, we have to check if this is a collection
                            if ($.isArray(theValue)) {

                                connector.setDestination(targetObject, true);

                            } else {

                                addVisualVariableToCollection(theExtractor, targetObject, connector);
                            }

                        } else if (targetObject.isMark) {

                            blink(targetObject, true);

                            if (targetObject !== this.parentObject) {

                                var connector = getLastElementOfArray(this.outConnectors);

                                var theSource = connector.source;
                                var theDestination = connector.destination;
                                
                                var value = theExtractor.value;
                                var attribute = "label";
                                
                                if (value.isColorData) {
                                    attribute = "fill";
                                }

                                var visualProperty = targetObject.getVisualPropertyByAttributeName(attribute);

                                if (visualProperty) {

                                    connector.setDestination(visualProperty, true);

                                    setTimeout(function () {

                                        if (theSource) {
                                            bringToFront(theSource);
                                        }
                                        if (theDestination) {
                                            bringToFront(theDestination);
                                        }
                                    }, 50);

                                } else {

                                    var connector = this.outConnectors.pop();
                                    connector.contract();

                                }

                            } else {

                                var connector = this.outConnectors.pop();
                                connector.remove();

                            }

                        } else { // This makes no sense, so, the added connector is just removed
                            var connector = this.outConnectors.pop();
                            connector.remove();
                        }


                    } else {


                        ////////////////////////////////////////////
                        // Click on a blank section of the canvas //
                        ////////////////////////////////////////////
                        newConnectionReleasedOnCanvas(lastAddedConnector, coordX, coordY);


                    }

                }

            } else {
                // removing the last connector added when the widget was down clicked 
                var connector = theExtractor.outConnectors.pop();
                connector.contract();
            }



            theExtractor.moving = false;
//            canvas.renderAll();
        };
        this.onMouseDown = function (options) {

            console.log("#hsdgosuiyfgaoasudig");

            var theExtractor = this;

            var theEvent = options;
            theEvent = options['e'];

            if (theEvent) {

                var canvasCoords = getCanvasCoordinates(theEvent);
                var coordX = canvasCoords.x;
                var coordY = canvasCoords.y;

                if (LOG)
                    console.log("theExtractor.area: " + theExtractor.area);

                console.log("theExtractor:");
                console.log(theExtractor);

                var newConnector = new Connector({source: theExtractor, x2: coordX, y2: coordY, arrowColor: theExtractor.colorForStroke, filledArrow: true, value: theExtractor.value});
                newConnector.widget = theExtractor;
                theExtractor.outConnectors.push(newConnector);

                canvas.add(newConnector);
                canvas.renderAll();

                if (LOG)
                    console.log("Created connector: ");
                if (LOG)
                    console.log(newConnector);

            }

        };
        this.onMouseMoving = function (options) {

            var theExtractor = this;

            if (LOG)
                console.log("widgetMoving");
            theExtractor.moving = true;

            var theEvent = options;

            theEvent = options['e'];

            if (theEvent) {

                var canvasCoords = getCanvasCoordinates(theEvent);
                var coordX = canvasCoords.x;
                var coordY = canvasCoords.y;

                var lastAddedConnector = getLastElementOfArray(theExtractor.outConnectors);
                lastAddedConnector.set({x2: coordX, y2: coordY});
                canvas.renderAll();

            } else {



            }



        };

        this.drawBorders = function (ctx) {

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

        };

        this.value = createBestValueFromText(text);

        this.outConnectors = new Array();
        this.associateInteractionEvents();


    },
    associateInteractionEvents: function () {
        var theExtractor = this;
        theExtractor.on({
            'mouseup': function (options) {
                theExtractor.onMouseUp(options);
            },
            'mousedown': function (options) {
                theExtractor.onMouseDown(options);
            },
            'moving': function (options) {
                theExtractor.onMouseMoving(options);
            }, });
    },
});

//Vixor.call(SVGText.prototype);