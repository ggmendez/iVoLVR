var playerStrokeWidth = 3;
var playerStrokeColor = darkenrgb(219, 219, 219);
var playerFillColor = rgb(219, 219, 219);

var Player = fabric.util.createClass(fabric.Object, {
    type: 'player',
    initialize: function (options) {
        options || (options = {});
        this.callSuper('initialize', options);

        var buttonsWidth = 45;
        var buttonsHeight = 45;

        this.set('increment', 0);
        this.set('enabledButtonFillColor', rgb(122, 122, 122));
        this.set('disabledButtonFillColor', rgb(163, 163, 163));
        this.set('buttonStrokeColor', darkenrgb(71, 71, 71));

        this.set('compressedWidth', 170);
        this.set('compressedHeight', 155);
        this.set('expandedWidth', 400);
        this.set('expandedHeight', 220);
        this.set('buttomHorizontalSeparation', 15);
        this.set('buttonVerticalSeparation', 15);

        this.set('isCompressed', true);

        this.set('width', this.compressedWidth);
        this.set('height', this.compressedHeight);

        this.set('originX', 'center');
        this.set('originY', 'center');

        this.set('perPixelTargetFind', true);

        this.set('hasBorders', false);
        this.set('transparentCorners', false);
        this.set('isPlayer', true);
        this.set('hasControls', false);
        this.set('hasRotatingPoint', true);

        this.set('fill', options.fill || playerFillColor);
        this.set('stroke', options.stroke || playerStrokeColor);
        this.set('strokeWidth', options.strokeWidth || 3);

        this.set('currentIndex', 0);

        this.set('inConnector', null);
        this.set('outConnectors', new Array());

        this.set('rx', 10);
        this.set('ry', 10);

        this.set('widgets', new Array());

        var buttonStrokeWidth = 2;

        var doubleTriangleStringPath = 'M 0 ' + buttonsHeight / 2 + ' L ' + buttonsWidth + ' ' + buttonsHeight + ' L ' + buttonsWidth + ' ' + (buttonsHeight - 10) + ' L ' + (buttonsWidth + 10) + ' ' + buttonsHeight + ' L ' + (buttonsWidth + 10) + ' ' + 0 + ' L ' + buttonsWidth + ' ' + 10 + ' L ' + buttonsWidth + ' ' + 0 + ' Z';
        var triangleLineStringPath = 'M 0 0 L 0 ' + buttonsHeight + ' L ' + (buttonsWidth - 10) + ' ' + buttonsHeight / 2 + ' Z M ' + (buttonsWidth - 8) + ' ' + 0 + ' L ' + (buttonsWidth) + ' ' + 0 + ' L ' + (buttonsWidth) + ' ' + buttonsHeight + ' L ' + (buttonsWidth - 8) + ' ' + buttonsHeight + ' L ' + (buttonsWidth - 8) + ' ' + 0 + ' Z ';

        var topLeft = this.getPointByOrigin('left', 'top');
        var bottomRight = this.getPointByOrigin('right', 'bottom');

        var playPath = 'M -1728.6563,2902.9506 C -1747.409,2902.9506 -1762.6119,2918.1536 -1762.6119,2936.9062 -1762.6119,2955.6589 -1747.409,2970.8618 -1728.6563,2970.8618 -1709.9037,2970.8618 -1694.7006,2955.6589 -1694.7006,2936.9062 -1694.7006,2918.1536 -1709.9037,2902.9506 -1728.6563,2902.9506 z M -1743.9677,2914.9201 -1704.0116,2936.9062 -1743.9677,2958.8924 z';

        var playButton = new fabric.Path(playPath, {
            fill: this.enabledButtonFillColor,
            strokeWidth: buttonStrokeWidth,
            originX: 'center',
            originY: 'center',
            stroke: this.buttonStrokeColor,
            perPixelTargetFind: false,
            selectable: false,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            untransformedScaleX: 1,
            untransformedScaleY: 1,
            untransformedAngle: 0,
            parentObject: this,
            strokeLineJoin: 'round',
            permanentOpacity: 1,
            movingOpacity: 1,
        });
        playButton.set({left: options.left, top: topLeft.y + playButton.height / 2 + this.buttonVerticalSeparation});
        playButton.setCoords();
        canvas.add(playButton);
        this.playButton = playButton;


        var pausePath = 'M -1842.739,2962.94 C -1861.4986,2962.94 -1876.6942,2978.1356 -1876.6942,2996.8952 -1876.6942,3015.6548 -1861.4986,3030.8505 -1842.739,3030.8505 -1823.9794,3030.8505 -1808.7837,3015.6548 -1808.7837,2996.8952 -1808.7837,2978.1356 -1823.9794,2962.94 -1842.739,2962.94 z M -1859.9901,2976.3251 -1847.1521,2976.3251 -1847.1521,3018.4572 -1859.9901,3018.4572 z M -1838.3624,2976.3251 -1825.5243,2976.3251 -1825.5243,3018.4572 -1838.3624,3018.4572 z';
        var pauseButton = new fabric.Path(pausePath, {
            fill: this.enabledButtonFillColor,
            strokeWidth: buttonStrokeWidth,
            originX: 'center',
            originY: 'center',
            stroke: this.buttonStrokeColor,
            perPixelTargetFind: false,
            selectable: false,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            untransformedScaleX: 1,
            untransformedScaleY: 1,
            untransformedAngle: 0,
            parentObject: this,
            strokeLineJoin: 'round',
            permanentOpacity: 0,
            movingOpacity: 0,
            opacity: 0,
            evented: false
        });
        pauseButton.set({left: options.left, top: topLeft.y + pauseButton.height / 2 + this.buttonVerticalSeparation});
        pauseButton.setCoords();
        canvas.add(pauseButton);
        this.pauseButton = pauseButton;



        playButton.on('mouseup', function (options) {
            var thePlayer = playButton.parentObject;
            if (thePlayer.inConnector && thePlayer.inConnector.value && thePlayer.inConnector.value.length > 1) {
                thePlayer.play();
            }
        });

        pauseButton.on('mouseup', function (options) {
            var thePlayer = pauseButton.parentObject;
            thePlayer.pause();
        });

        var forward = new fabric.Path(doubleTriangleStringPath, {
            originX: 'center',
            originY: 'center',
            fill: this.enabledButtonFillColor,
            stroke: this.buttonStrokeColor,
            strokeWidth: buttonStrokeWidth,
            perPixelTargetFind: false,
            selectable: false,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            untransformedScaleX: 1,
            untransformedScaleY: 1,
            parentObject: this,
            strokeLineJoin: 'round',
            angle: 180,
            permanentOpacity: 1,
            movingOpacity: 1,
        });
        forward.set({left: playButton.left + forward.getWidth() / 2 + this.buttomHorizontalSeparation / 2, top: playButton.top + playButton.getHeight() / 2 + forward.getHeight() / 2 + this.buttonVerticalSeparation});
        forward.setCoords();
        canvas.add(forward);
        this.forward = forward;

        forward.on('mouseup', function (option) {
            var thePlayer = forward.parentObject;
            if (thePlayer.playing || !thePlayer.inConnector || !thePlayer.inConnector.value || !thePlayer.inConnector.value.length || thePlayer.inConnector.value.length < 2) {
                return;
            }
            thePlayer.generateNextPosition();
            thePlayer.positionSlider(thePlayer.currentIndex);
            thePlayer.propagateCurrentValue();
        });

        var back = new fabric.Path(doubleTriangleStringPath, {
            originX: 'center',
            originY: 'center',
            fill: this.enabledButtonFillColor,
            stroke: this.buttonStrokeColor,
            strokeWidth: buttonStrokeWidth,
            perPixelTargetFind: false,
            selectable: false,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            untransformedScaleX: 1,
            untransformedScaleY: 1,
            parentObject: this,
            strokeLineJoin: 'round',
            permanentOpacity: 1,
            movingOpacity: 1,
        });
        back.set({left: playButton.left - back.getWidth() / 2 - this.buttomHorizontalSeparation / 2, top: playButton.top + playButton.getHeight() / 2 + back.getHeight() / 2 + this.buttonVerticalSeparation});
        back.setCoords();
        canvas.add(back);
        this.back = back;

        back.on('mouseup', function (option) {
            var thePlayer = back.parentObject;
            if (thePlayer.playing || !thePlayer.inConnector || !thePlayer.inConnector.value || !thePlayer.inConnector.value.length || thePlayer.inConnector.value.length < 2) {
                return;
            }
            thePlayer.generatePreviousPosition();
            thePlayer.positionSlider(thePlayer.currentIndex);
            thePlayer.propagateCurrentValue();
        });

        var begin = new fabric.Path(triangleLineStringPath, {
            originX: 'center',
            originY: 'center',
            fill: this.enabledButtonFillColor,
            stroke: this.buttonStrokeColor,
            strokeWidth: buttonStrokeWidth,
            perPixelTargetFind: false,
            selectable: false,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            untransformedScaleX: 1,
            untransformedScaleY: 1,
            parentObject: this,
            strokeLineJoin: 'round',
            angle: 180,
            opacity: 0,
            movingOpacity: 0,
            permanentOpacity: 0,
            hideOnCompression: true
        });
        begin.set({left: back.left - back.getWidth() / 2 - begin.getWidth() / 2 - this.buttomHorizontalSeparation, top: playButton.top + playButton.getHeight() / 2 + begin.getHeight() / 2 + this.buttonVerticalSeparation});
        begin.setCoords();
        canvas.add(begin);
        this.begin = begin;

        begin.on('mouseup', function (option) {
            var thePlayer = begin.parentObject;
            if (thePlayer.playing || !thePlayer.inConnector || !thePlayer.inConnector.value || !thePlayer.inConnector.value.length || thePlayer.inConnector.value.length < 2) {
                return;
            }
            thePlayer.currentIndex = 0;
            thePlayer.positionSlider(thePlayer.currentIndex);
            thePlayer.propagateCurrentValue();
        });

        var end = new fabric.Path(triangleLineStringPath, {
            originX: 'center',
            originY: 'center',
            fill: this.enabledButtonFillColor,
            stroke: this.buttonStrokeColor,
            strokeWidth: buttonStrokeWidth,
            perPixelTargetFind: false,
            selectable: false,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            untransformedScaleX: 1,
            untransformedScaleY: 1,
            parentObject: this,
            strokeLineJoin: 'round',
            opacity: 0,
            movingOpacity: 0,
            permanentOpacity: 0,
            hideOnCompression: true
        });
        end.set({left: forward.left + back.getWidth() / 2 + end.getWidth() / 2 + this.buttomHorizontalSeparation, top: playButton.top + playButton.getHeight() / 2 + end.getHeight() / 2 + this.buttonVerticalSeparation});
        end.setCoords();
        canvas.add(end);
        this.end = end;

        end.on('mouseup', function (option) {
            var thePlayer = end.parentObject;
            if (thePlayer.playing || !thePlayer.inConnector || !thePlayer.inConnector.value || !thePlayer.inConnector.value.length || thePlayer.inConnector.value.length < 2) {
                return;
            }
            thePlayer.currentIndex = thePlayer.inConnector.value.length - 1;
            thePlayer.positionSlider(thePlayer.currentIndex);
            thePlayer.propagateCurrentValue();
        });

        this.sliderRadius = 17;
        var slider = new fabric.Circle({
            originX: 'center',
            originY: 'center',
            fill: this.enabledButtonFillColor,
            stroke: this.buttonStrokeColor,
            strokeWidth: buttonStrokeWidth,
            perPixelTargetFind: true,
            selectable: true,
            hasControls: false,
            hasBorders: false,
            hasRotatingPoint: false,
            lockRotation: true,
            lockMovementX: false,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            untransformedScaleX: 1,
            untransformedScaleY: 1,
            parentObject: this,
            strokeLineJoin: 'round',
            opacity: 0,
            movingOpacity: 0,
            permanentOpacity: 0,
            radius: this.sliderRadius,
            hideOnCompression: true
        });

        var y = this.top + this.expandedHeight / 2 + (this.expandedHeight - this.compressedHeight) / 2 - this.sliderRadius - this.buttonVerticalSeparation;

        slider.set({left: this.left, top: y});
        slider.setCoords();
        canvas.add(slider);
        this.slider = slider;

        slider.on('mouseup', function (option) {
            var thePlayer = slider.parentObject;
            slider.lockMovementX = false;
            if (slider.closestIndex != thePlayer.currentIndex) {
                thePlayer.currentIndex = slider.closestIndex;
                thePlayer.propagateCurrentValue();
            }
            thePlayer.positionSlider(thePlayer.currentIndex);
        });

        slider.on('moving', function () {

            var thePlayer = slider.parentObject;

            var topLeft = thePlayer.getPointByOrigin('left', 'top');
            var bottomRight = thePlayer.getPointByOrigin('right', 'bottom');
//            drawRectAt(topLeft, "blue");
//            drawRectAt(bottomRight, "pink");


            var beginPoint = new fabric.Point(topLeft.x + (thePlayer.sliderRadius + 5) * thePlayer.getScaleX(), topLeft.y + ((thePlayer.height - thePlayer.sliderRadius - thePlayer.buttonVerticalSeparation) * thePlayer.scaleY));
            var rotatedBegin = fabric.util.rotatePoint(beginPoint, topLeft, fabric.util.degreesToRadians(slider.parentObject.angle));
//            drawRectAt(rotatedBegin, "green");

            var endPoint = new fabric.Point(topLeft.x + (thePlayer.width - (thePlayer.sliderRadius + 5)) * thePlayer.getScaleX(), topLeft.y + ((thePlayer.height - thePlayer.sliderRadius - thePlayer.buttonVerticalSeparation) * thePlayer.scaleY));





            if (thePlayer.inConnector && thePlayer.inConnector.value) {

                var totalElements = thePlayer.inConnector.value.length;

                var minDistance = 10000;
                var sliderCenter = thePlayer.slider.getCenterPoint();

                for (var i = 0; i < totalElements; i++) {

                    var p = new fabric.Point(rotatedBegin.x + i * thePlayer.increment * thePlayer.getScaleX(), rotatedBegin.y);
                    var rotatedP = fabric.util.rotatePoint(p, rotatedBegin, fabric.util.degreesToRadians(slider.parentObject.angle));

                    var deltaX = sliderCenter.x - rotatedP.x;
                    var deltaY = sliderCenter.y - rotatedP.y;
                    var newDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                    if (LOG) console.log("newDistance: " + newDistance);

                    if (newDistance < minDistance) {
                        minDistance = newDistance;
                        slider.closestIndex = i;


                        if (LOG) console.log("slider.closestIndex: " + slider.closestIndex);

                    }

//                    drawRectAt(rotatedP, generateRandomColor());







                }


            }







            var rotatedEnd = fabric.util.rotatePoint(endPoint, topLeft, fabric.util.degreesToRadians(slider.parentObject.angle));
//            drawRectAt(rotatedEnd, "red");

            computeUntransformedProperties(slider);
            slider.untransformedY = slider.permanentUntransformedY;
            repositionWidget(slider.parentObject, slider);

            var sliderCenter = slider.getPointByOrigin('center', 'center');
//            drawRectAt(sliderCenter, "pink");

            if (sliderCenter.x <= rotatedBegin.x) {
                slider.lockMovementX = true;
                slider.left = rotatedBegin.x;
                slider.top = rotatedBegin.y;
            } else {
                slider.lockMovementX = false;
            }

            if (sliderCenter.x >= rotatedEnd.x) {
                slider.lockMovementX = true;
                slider.left = rotatedEnd.x - 1 * thePlayer.getScaleX();
                slider.top = rotatedEnd.y;
            } else {
                slider.lockMovementX = false;
            }
        });


        this.widgets.push(forward);
        this.widgets.push(back);
        this.widgets.push(playButton);
        this.widgets.push(pauseButton);
        this.widgets.push(begin);
        this.widgets.push(end);
        this.widgets.push(slider);

        setTimeout(function () {
            begin.parentObject.bringToFront(true);
            begin.bringToFront(true);
            end.bringToFront(true);
            slider.bringToFront(true);
            forward.bringForward(true);
            back.bringForward(true);
            pauseButton.bringForward(true);
            playButton.bringForward(true);
        }, 50);

        this.widgets.forEach(function (widget) {
            computeUntransformedProperties(widget);
        });
        slider.permanentUntransformedY = slider.untransformedY;

        this.on('rotating', function (option) {
            objectMoving(option, this);
            this.inConnector.set({'x2': connector.destination.left, 'y2': connector.destination.top});
        });
        this.on('scaling', function (option) {
            objectMoving(option, this);
            this.inConnector.set({'x2': connector.destination.left, 'y2': connector.destination.top});

        });

        this.on('doubleTap', function (option) {
            if (this.isCompressed) {
                this.expand();
            } else {
                this.compress();
            }
        });

        this.on('pressed', function (option) {
            var thePlayer = this;

            thePlayer.lockMovementX = true;
            thePlayer.lockMovementY = true;

            // visual feedback for the user to know when the connector can be dragged
            thePlayer.blink();

            var value = '';
            if (thePlayer.inConnector && thePlayer.inConnector.value && thePlayer.inConnector.value.length) {
                value = thePlayer.inConnector.value[0];
            }

            var newConnector = new Connector({source: thePlayer, x2: thePlayer.left, y2: thePlayer.top, arrowColor: playerStrokeColor, filledArrow: true, value: value});
            thePlayer.outConnectors.push(newConnector);
            canvas.add(newConnector);
        });

        this.on('moving', function (option) {
            var thePlayer = this;
            thePlayer.moving = true;

            if (thePlayer.lockMovementX && thePlayer.lockMovementY) {

                if (LOG) console.log("Output being created from a PLAYER");

                var theEvent = option.e;

                if (theEvent) {
                    var canvasCoords = getCanvasCoordinates(theEvent);
                    var lastAddedConnector = getLastElementOfArray(thePlayer.outConnectors);
                    lastAddedConnector.set({x2: canvasCoords.x, y2: canvasCoords.y});
                    canvas.renderAll();
                }

            } else {
                objectMoving(option, this);
                // instead of triggering the 'moving' event of each widget of this player, we
                // reposition the connectors directly, as this is more efficient
                if (thePlayer.inConnector) {
                    thePlayer.inConnector.set({'x2': thePlayer.inConnector.destination.left, 'y2': thePlayer.inConnector.destination.top});
                }
            }

        });


        this.on('mouseup', function (option) {

            var thePlayer = this;

            if (LOG) console.log("%cMouse UP over a PLAYER", "background: lightgray; color: blue;");

            if (this.moving || this.scaling) {

                if (!this.lockMovementX && !this.lockMovementY)
                    return;

                var theEvent = option.e;
                var canvasCoords = getCanvasCoordinates(theEvent);
                var coordX = canvasCoords.x;
                var coordY = canvasCoords.y;

                var targetObject = getObjectContaining(canvasCoords);

                if (LOG) console.log("targetObject:");
                if (LOG) console.log(targetObject);

                if (targetObject && targetObject !== this) {

                    if (targetObject.isVisualProperty) {
                        var lastAddedConnector = getLastElementOfArray(this.outConnectors);
                        lastAddedConnector.setDestination(targetObject, false);
                    }

//                        if (targetObject.isOutput) {
//
//                            var connector = getLastElementOfArray(this.outConnectors);
//                            connector.setDestination(targetObject, true);
//
//                            // This output should be updated properly with this new entry
//                        } else if (targetObject.isOperator && targetObject != this) {
//
//                            var connector = getLastElementOfArray(this.outConnectors);
//                            connector.setDestination(targetObject, true);
//
//                        } else if (targetObject.isImage) { // This makes no sense, so, the added connector is just removed
//                            var connector = this.outConnectors.pop();
//                            connector.remove();                        
//                        } else if (targetObject.isAggregator) { // This makes no sense, so, the added connector is just removed
//                            
//                            var connector = getLastElementOfArray(this.outConnectors);
//                            targetObject.addConnector(connector, canvasCoords);
//                            
//                            
//                        }

                } else {

                    if (this.lockMovementX && this.lockMovementY) {

                        // The mouse up event is done over a blank section of the canvas
                        var lastAddedConnector = getLastElementOfArray(this.outConnectors);

                        var options = {
                            left: coordX,
                            top: coordY,
                            fill: this.fill,
                            stroke: this.colorForStroke,
                            area: lastAddedConnector.value,
                            label: '' + lastAddedConnector.value
                        };

                        addOutputToCanvas(lastAddedConnector, CIRCULAR_OUTPUT, options);





                        setTimeout(function () {
                            lastAddedConnector.sendToBack();
                        }, 50);





                    }
                }

                // In case this operator belongs to a selection
                if (this.parentObject) {
                    computeUntransformedProperties(this);
                }


            } else {

                if (this.lockMovementX && this.lockMovementY) {
                    var connector = this.outConnectors.pop();
                    connector.remove();
                }

            }

            this.lockMovementX = false;
            this.lockMovementY = false;
            this.moving = false;
            this.scaling = false;




        });


        this.on('newInConnection', function (options) {

            var thePlayer = this;
            var newInConnection = options.newInConnection;
            var shouldAnimate = options.shouldAnimate;
            thePlayer.inConnector = newInConnection;

            thePlayer.inConnector.sendBackwards(true);
            thePlayer.inConnector.sendBackwards(true);
            thePlayer.inConnector.sendBackwards(true);

            this.blink();

            thePlayer.currentIndex = 0;

            if (thePlayer.inConnector && thePlayer.inConnector.value && thePlayer.inConnector.value.length) {
                thePlayer.positionSlider(thePlayer.currentIndex);
                thePlayer.propagateCurrentValue();
            }



        });

        this.on('inConnectionRemoved', function (options) {
            var thePlayer = this;
            var removedConnection = options.connector;
            thePlayer.pause();
            thePlayer.inConnector = null;
            thePlayer.currentIndex = 0;
            thePlayer.outConnectors.forEach(function (connector) {
                connector.setValue(0, false, true);
            });
        });

        this.on('inValueUpdated', function (options) {

            var thePlayer = this;
            var newInConnection = options.newInConnection;
            var shouldAnimate = options.shouldAnimate;

            if (LOG) console.log("shouldAnimate " + shouldAnimate);

            var value = 0;
            if (thePlayer.inConnector && thePlayer.inConnector.value && thePlayer.inConnector.value.length) {
                value = thePlayer.inConnector.value[thePlayer.currentIndex];
            }
            thePlayer.outConnectors.forEach(function (connector) {
                connector.setValue(value, false, shouldAnimate);
            });

        });

    },
    propagateCurrentValue: function () {

        var thePlayer = this;
        var array = thePlayer.inConnector.value;

        var theValue = array[thePlayer.currentIndex];

        thePlayer.inConnector.source.trigger('valueSelected', {index: thePlayer.currentIndex});

        thePlayer.outConnectors.forEach(function (connector) {
            connector.setValue(theValue, false, true);
        });

    },
    positionSlider: function (index) {
        var thePlayer = this;
        var begin = 5;
        if (thePlayer.inConnector && thePlayer.inConnector.value) {
            thePlayer.slider.untransformedX = (begin + index * thePlayer.increment);
            thePlayer.slider.untransformedY = thePlayer.slider.permanentUntransformedY;
            repositionWidget(thePlayer, thePlayer.slider);
            thePlayer.slider.closestIndex = index;
            canvas.renderAll();
        }
    },
    enableInteractiveButtons: function () {
        var thePlayer = this;
        thePlayer.back.evented = true;
        thePlayer.back.fill = thePlayer.enabledButtonFillColor;

        thePlayer.forward.evented = true;
        thePlayer.forward.fill = thePlayer.enabledButtonFillColor;

        thePlayer.begin.evented = true;
        thePlayer.begin.fill = thePlayer.enabledButtonFillColor;

        thePlayer.end.evented = true;
        thePlayer.end.fill = thePlayer.enabledButtonFillColor;

        thePlayer.slider.evented = true;
        thePlayer.slider.fill = thePlayer.enabledButtonFillColor;

        canvas.renderAll();

    },
    disableInteractiveButtons: function () {
        var thePlayer = this;

        thePlayer.back.evented = false;
        thePlayer.back.fill = thePlayer.disabledButtonFillColor;

        thePlayer.forward.evented = false;
        thePlayer.forward.fill = thePlayer.disabledButtonFillColor;

        thePlayer.begin.evented = false;
        thePlayer.begin.fill = thePlayer.disabledButtonFillColor;

        thePlayer.end.evented = false;
        thePlayer.end.fill = thePlayer.disabledButtonFillColor;

        thePlayer.slider.evented = false;
        thePlayer.slider.fill = thePlayer.disabledButtonFillColor;
    },
    generateNextPosition: function () {
        var thePlayer = this;
        var array = thePlayer.inConnector.value;
        var nElements = array.length;
        if (thePlayer.currentIndex >= nElements - 1) {
            thePlayer.currentIndex = 0;
        } else {
            thePlayer.currentIndex++;
        }
    },
    generatePreviousPosition: function () {
        var thePlayer = this;
        var array = thePlayer.inConnector.value;
        var nElements = array.length;
        if (thePlayer.currentIndex <= 0) {
            thePlayer.currentIndex = nElements - 1;
        } else {
            thePlayer.currentIndex--;
        }
    },
    play: function () {

        var thePlayer = this;
        thePlayer.playing = true;

        thePlayer.disableInteractiveButtons(); // The user should not be able to manipulate the slider while playing

        thePlayer.playButton.opacity = 0;
        thePlayer.playButton.permanentOpacity = 0;
        thePlayer.playButton.movingOpacity = 0;

        thePlayer.pauseButton.opacity = 1;
        thePlayer.pauseButton.permanentOpacity = 1;
        thePlayer.pauseButton.movingOpacity = 1;

        thePlayer.playButton.evented = false;
        thePlayer.pauseButton.evented = true;
        canvas.renderAll();

        var interval = thePlayer.interval || 1000;
        thePlayer.timer = setInterval(function () {

            if (thePlayer.inConnector && thePlayer.inConnector.value) {
                thePlayer.generateNextPosition();
                thePlayer.positionSlider(thePlayer.currentIndex);
                thePlayer.propagateCurrentValue();
            }

        }, interval);
    },
    pause: function () {
        var thePlayer = this;

        thePlayer.playing = false;

        thePlayer.enableInteractiveButtons(); // The user should not be able to manipulate the slider while playing

        thePlayer.playButton.opacity = 1;
        thePlayer.playButton.permanentOpacity = 1;
        thePlayer.playButton.movingOpacity = 1;

        thePlayer.pauseButton.opacity = 0;
        thePlayer.pauseButton.permanentOpacity = 0;
        thePlayer.pauseButton.movingOpacity = 0;

        thePlayer.playButton.evented = true;
        thePlayer.pauseButton.evented = false;
        canvas.renderAll();
        if (thePlayer.timer) {
            clearInterval(thePlayer.timer);
        }
    },
    applySelectedStyle: function () {
        this.selected = true;
    },
    applyUnselectedStyle: function () {
        this.selected = false;
    },
    blink: function () {
        var increment = 0.1;
        var duration = 100;
        var easing = fabric.util.ease['easeInCubic'];

        this.animate('scaleX', '+=' + increment, {
            duration: duration,
            onChange: canvas.renderAll.bind(canvas),
            easing: easing,
            operator: this,
            onComplete: function () {
                if (LOG) console.log(this);
                if (LOG) console.log(self);
                this.operator.animate('scaleX', '-=' + increment, {
                    duration: 1100,
                    onChange: canvas.renderAll.bind(canvas),
                    easing: fabric.util.ease['easeOutElastic']
                });
            }
        });
        this.animate('scaleY', '+=' + increment, {
            duration: duration,
            onChange: canvas.renderAll.bind(canvas),
            easing: easing,
            operator: this,
            onComplete: function () {
                this.operator.animate('scaleY', '-=' + increment, {
                    duration: 1100,
                    onChange: canvas.renderAll.bind(canvas),
                    easing: fabric.util.ease['easeOutElastic']
                });
            }
        });
    },
    expand: function () {

        if (!this.isCompressed)
            return;

        var thePlayer = this;
        var duration = 500;
        var easing = fabric.util.ease.easeInBack;

        thePlayer.evented = false;
        thePlayer.selectable = false;

        thePlayer.animate('width', thePlayer.expandedWidth, {
            easing: easing,
            duration: duration,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: function () {
                thePlayer.isCompressed = false;
                thePlayer.widgets.forEach(function (widget) {
                    computeUntransformedProperties(widget);
                });
                thePlayer.evented = true;
                thePlayer.selectable = true;
                canvas.renderAll.bind(canvas);
                canvas.renderAll(canvas);
            }
        });

        thePlayer.animate('height', thePlayer.expandedHeight, {
            easing: easing,
            duration: duration,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: function () {
                thePlayer.widgets.forEach(function (widget) {
                    computeUntransformedProperties(widget);
                });
                canvas.renderAll.bind(canvas);
                canvas.renderAll(canvas);
            }
        });

        var newTop = thePlayer.getTop() + (Math.cos(fabric.util.degreesToRadians(thePlayer.getAngle())) * thePlayer.getScaleY() * (thePlayer.expandedHeight - thePlayer.compressedHeight) / 2);
        thePlayer.animate('top', newTop, {
            easing: easing,
            duration: duration,
            onChange: function () {
                canvas.renderAll.bind(canvas);
                canvas.renderAll(canvas);
            },
            onComplete: function () {
                thePlayer.widgets.forEach(function (widget) {
                    computeUntransformedProperties(widget);
                });
                canvas.renderAll.bind(canvas);
                canvas.renderAll(canvas);
            }
        });

        var newLeft = thePlayer.getLeft() + (Math.sin(fabric.util.degreesToRadians(360 - thePlayer.getAngle())) * thePlayer.getScaleX() * (thePlayer.expandedHeight - thePlayer.compressedHeight) / 2);
        thePlayer.animate('left', newLeft, {
            easing: easing,
            duration: duration,
            onChange: function () {
                thePlayer.setCoords();
                thePlayer.widgets.forEach(function (widget) {
                    computeUntransformedProperties(widget);
                });
                thePlayer.outConnectors.forEach(function (connector) {
                    connector.set({'x1': connector.source.left, 'y1': connector.source.top});
                });

                if (thePlayer.inConnector) {
                    thePlayer.inConnector.set({'x2': thePlayer.left, 'y2': thePlayer.top});
                }

//                thePlayer.positionSlider(thePlayer.currentIndex);


                canvas.renderAll(canvas);
            },
            onComplete: function () {
                thePlayer.setCoords();
                thePlayer.widgets.forEach(function (widget) {
                    computeUntransformedProperties(widget);
                });
                thePlayer.outConnectors.forEach(function (connector) {
                    connector.set({'x1': connector.source.left, 'y1': connector.source.top});
                });
                if (thePlayer.inConnector) {
                    thePlayer.inConnector.set({'x2': thePlayer.left, 'y2': thePlayer.top});
                }


                thePlayer.positionSlider(thePlayer.currentIndex);


                canvas.renderAll(canvas);
            }
        });

        setTimeout(function () {

            easing = fabric.util.ease.easeInCirc;
            duration = duration / 2;

            thePlayer.widgets.forEach(function (widget) {
                if (widget.hideOnCompression) {
                    widget.animate('opacity', 1, {
                        duration: duration,
                        easing: easing,
                        onChange: function () {
                            canvas.renderAll.bind(canvas);
                            canvas.renderAll(canvas);
                        },
                        onComplete: function () {
                            widget.movingOpacity = 1;
                            widget.permanentOpacity = 1;
                            canvas.renderAll.bind(canvas);
                            canvas.renderAll(canvas);
                        },
                    });
                }
            });

        }, duration / 1.5);

    },
    compress: function () {

        if (this.isCompressed)
            return;

        var thePlayer = this;
        var duration = 500;
        var easing = fabric.util.ease.easeInBack;

        thePlayer.evented = false;
        thePlayer.selectable = false;


        setTimeout(function () {

            thePlayer.widgets.forEach(function (widget) {
                if (widget.hideOnCompression) {
                    widget.animate('opacity', 0, {
                        duration: duration / 2,
                        easing: fabric.util.ease.easeInCirc,
                        onChange: function () {
                            canvas.renderAll.bind(canvas);
                            canvas.renderAll(canvas);
                        },
                        onComplete: function () {
                            widget.movingOpacity = 0;
                            widget.permanentOpacity = 0;
                            canvas.renderAll.bind(canvas);
                            canvas.renderAll(canvas);
                        },
                    });
                }
            });
        }, duration / 2);



        thePlayer.animate('width', thePlayer.compressedWidth, {
            easing: easing,
            duration: duration,
        });

        thePlayer.animate('height', thePlayer.compressedHeight, {
            easing: easing,
            duration: duration,
        });

        var newTop = thePlayer.getTop() - (Math.cos(fabric.util.degreesToRadians(thePlayer.getAngle())) * thePlayer.getScaleY() * (thePlayer.expandedHeight - thePlayer.compressedHeight) / 2);
        thePlayer.animate('top', newTop, {
            easing: easing,
            duration: duration,
        });

        var newLeft = thePlayer.getLeft() - (Math.sin(fabric.util.degreesToRadians(360 - thePlayer.getAngle())) * thePlayer.getScaleX() * (thePlayer.expandedHeight - thePlayer.compressedHeight) / 2);
        thePlayer.animate('left', newLeft, {
            easing: easing,
            duration: duration,
            onChange: function () {
                thePlayer.setCoords();
                thePlayer.widgets.forEach(function (widget) {
                    computeUntransformedProperties(widget);
                });
                thePlayer.outConnectors.forEach(function (connector) {
                    connector.set({'x1': connector.source.left, 'y1': connector.source.top});
                });
                if (thePlayer.inConnector) {
                    thePlayer.inConnector.set({'x2': thePlayer.left, 'y2': thePlayer.top});
                }


                canvas.renderAll.bind(canvas);
                canvas.renderAll(canvas);
            },
            onComplete: function () {
                thePlayer.setCoords();
                thePlayer.widgets.forEach(function (widget) {
                    computeUntransformedProperties(widget);
                });
                thePlayer.outConnectors.forEach(function (connector) {
                    connector.set({'x1': connector.source.left, 'y1': connector.source.top});
                });

                if (thePlayer.inConnector) {
                    thePlayer.inConnector.set({'x2': thePlayer.left, 'y2': thePlayer.top});
                }

                thePlayer.evented = true;
                thePlayer.selectable = true;
                thePlayer.isCompressed = true;

                canvas.renderAll.bind(canvas);
                canvas.renderAll(canvas);
            }
        });

    },
    toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            label: this.get('label')
        });
    },
    _render: function (ctx, noTransform) {

        var thePlayer = this;

        var rx = this.rx ? Math.min(this.rx, this.width / 2) : 0,
                ry = this.ry ? Math.min(this.ry, this.height / 2) : 0,
                w = this.width,
                h = this.height,
                x = -w / 2,
                y = -h / 2,
                isInPathGroup = this.group && this.group.type === 'path-group',
                isRounded = rx !== 0 || ry !== 0,
                k = 1 - 0.5522847498 /* "magic number" for bezier approximations of arcs (http://itc.ktu.lt/itc354/Riskus354.pdf) */;

        ctx.beginPath();
        ctx.globalAlpha = isInPathGroup ? (ctx.globalAlpha * this.opacity) : this.opacity;

        if (this.transformMatrix && isInPathGroup) {
            ctx.translate(
                    this.width / 2 + this.x,
                    this.height / 2 + this.y);
        }
        if (!this.transformMatrix && isInPathGroup) {
            ctx.translate(
                    -this.group.width / 2 + this.width / 2 + this.x,
                    -this.group.height / 2 + this.height / 2 + this.y);
        }

        ctx.moveTo(x + rx, y);

        ctx.lineTo(x + w - rx, y);
        isRounded && ctx.bezierCurveTo(x + w - k * rx, y, x + w, y + k * ry, x + w, y + ry);

        ctx.lineTo(x + w, y + h - ry);
        isRounded && ctx.bezierCurveTo(x + w, y + h - k * ry, x + w - k * rx, y + h, x + w - rx, y + h);

        ctx.lineTo(x + rx, y + h);
        isRounded && ctx.bezierCurveTo(x + k * rx, y + h, x, y + h - k * ry, x, y + h - ry);

        ctx.lineTo(x, y + ry);
        isRounded && ctx.bezierCurveTo(x, y + k * ry, x + k * rx, y, x + rx, y);

        ctx.closePath();

        this._renderFill(ctx);



        if (this.selected) {
            this.stroke = widget_selected_stroke_color;
            this.strokeWidth = widget_selected_stroke_width;
            this.strokeDashArray = widget_selected_stroke_dash_array;
        } else {
            this.stroke = playerStrokeColor;
            this.strokeWidth = playerStrokeWidth;
            this.strokeDashArray = [];
        }

        this._renderStroke(ctx);

        if (!thePlayer.isCompressed) {
            var y = this.height / 2 - this.sliderRadius - this.buttonVerticalSeparation;
            ctx.save();
            ctx.strokeStyle = thePlayer.buttonStrokeColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-this.width / 2 + this.sliderRadius + 5, y);
            ctx.lineTo(this.width / 2 - (this.sliderRadius + 5), y);
            ctx.stroke();
            ctx.closePath();

            ctx.strokeStyle = rgb(112, 112, 112);
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.rect(-this.width / 2 + this.sliderRadius, y - this.sliderRadius - 5, this.width - 2 * this.sliderRadius, 2 * this.sliderRadius + 10);
            ctx.stroke();
            ctx.closePath();

            var begin = -this.width / 2 + this.sliderRadius + 5;
            var end = this.width / 2 - (this.sliderRadius + 5);

            if (thePlayer.inConnector && thePlayer.inConnector.value) {

                var totalElements = thePlayer.inConnector.value.length;
                thePlayer.increment = (end - begin) / (totalElements - 1);

                ctx.strokeStyle = thePlayer.buttonStrokeColor;
                ctx.lineWidth = 2;

                ctx.beginPath();


                for (var i = 0; i < totalElements; i++) {
                    var x = begin + i * thePlayer.increment;
                    ctx.moveTo(x, y + 1);
                    ctx.lineTo(x, y - 6);
                    ctx.stroke();
                }
                ctx.closePath();

            }

            ctx.restore();


        }

    }
});




