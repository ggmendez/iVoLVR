var Connector = fabric.util.createClass(fabric.Line, {
    type: 'connector',
    toXML: function () {

        var theConnector = this;

        var source = theConnector.source;
        var destination = theConnector.destination;

        var sourceID = source ? source.xmlID : -1;
        var destinationID = destination ? destination.xmlID : -1;

        var connectorNode = createXMLElement("connector");
        addAttributeWithValue(connectorNode, "from", sourceID);
        addAttributeWithValue(connectorNode, "to", destinationID);
        addAttributeWithValue(connectorNode, "arrowColor", theConnector.arrowColor);
        addAttributeWithValue(connectorNode, "strokeWidth", 1);
        addAttributeWithValue(connectorNode, "filledArrow", theConnector.filledArrow);
        addAttributeWithValue(connectorNode, "opacity", theConnector.opacity);

        return connectorNode;
    },
    initialize: function (options) {

//        console.log("%c" + "Creating a connection via the initialize method of the CONNECTOR class...", "background: red; color: white;");

        options || (options = {});

        this.set('source', options.source || null);

//        if (LOG) console.log("options.value: " + options.value);

//        this.set('value', options.value || this.source.value || 0);
        this.set('value', options.value || this.source.value);



//        if (LOG) console.log("%cCreating CONNECTOR with value " + this.value + " of type " + typeof this.value, "background: yellow");


        this.set('destination', options.destination || null);
        var points = [this.source.left, this.source.top, this.destination != null ? this.destination.left : options.x2, this.destination != null ? this.destination.top : options.y2];
        this.callSuper('initialize', points, options);
        this.set('arrowSeparation', options.arrowSeparation || 80);
        this.set('arrowSize', options.arrowSize || 11);
        this.set('isConnector', true);
        this.set('strokeWidth', options.strokeWidth || 1);
        this.set('lockRotation', true);
        this.set('perPixelTargetFind', false);
        this.set('transparentCorners', false);
        this.set('hasRotatingPoint', false);

        this.set('selectable', false);

        this.set('evented', false);

        this.set('hasBorders', false);
        this.set('hasControls', false);
        this.set('hasRotatingPoint', false);


        this.set('arrowColor', options.arrowColor || this.source.fill);
        this.set('stroke', options.stroke || this.arrowColor);
        this.set('strokeDashArray', options.strokeDashArray || [7, 7]);
        this.set('filledArrow', options.filledArrow || false);

        this.set('hidden', options.hidden || canvas.connectorsHidden);
        if (this.hidden) {
            this.opacity = 0;
        }

        this.triangle = [
            [3, 0],
            [-10, -6],
            [-10, 6]
        ];

        var connector = this;

        if (this.source) {
            this.source.on('moving', function (options) {
                var massCenter = this.getPointByOrigin('center', 'center');
                if (this.getCompressedMassPoint) {
                    massCenter = this.getCompressedMassPoint();
                }
                connector.set({'x1': massCenter.x, 'y1': massCenter.y});
                connector.setCoords();
            });
            this.source.on('scaling', function (options) {
                var massCenter = this.getPointByOrigin('center', 'center');
                if (this.getCompressedMassPoint) {
                    massCenter = this.getCompressedMassPoint();
                }
                connector.set({'x1': massCenter.x, 'y1': massCenter.y});
                connector.setCoords();
                if (LOG) {
                    console.log("connector source scaling");
                }
            });
            this.source.on('modified', function (options) {
                var massCenter = this.getPointByOrigin('center', 'center');
                if (this.getCompressedMassPoint) {
                    massCenter = this.getCompressedMassPoint();
                }
                connector.set({'x1': massCenter.x, 'y1': massCenter.y});
                connector.setCoords();
                if (LOG)
                    console.log("connector source modified");
            });
        }

        if (this.destination) {
            this.destination.on('moving', function (options) {
                var massCenter = this.getPointByOrigin('center', 'center');
                if (this.getCompressedMassPoint) {
                    massCenter = this.getCompressedMassPoint();
                }
                connector.set({'x2': massCenter.x, 'y2': massCenter.y});
                connector.setCoords();
                if (LOG)
                    console.log("connector destination moving");
            });
            this.destination.on('scaling', function (options) {
                var massCenter = this.getPointByOrigin('center', 'center');
                if (this.getCompressedMassPoint) {
                    massCenter = this.getCompressedMassPoint();
                }
                connector.set({'x2': massCenter.x, 'y2': massCenter.y});
                connector.setCoords();
                if (LOG)
                    console.log("connector destination scaling");
            });
            this.destination.on('modified', function (options) {
                var massCenter = this.getPointByOrigin('center', 'center');
                if (this.getCompressedMassPoint) {
                    massCenter = this.getCompressedMassPoint();
                }
                connector.set({'x2': massCenter.x, 'y2': massCenter.y});
                connector.setCoords();
                if (LOG)
                    console.log("connector destination modified");
            });
        }

    },
    split: function (splitPoint, line, refreshCanvas) {

        var connector = this;

        connector.strokeWidth = 3;
        var deltaX = line.x2 - line.x1;
        var deltaY = line.y2 - line.y1;
        var angle = fabric.util.radiansToDegrees(Math.atan(deltaY / deltaX)) + 90;
        var l = new fabric.Line([splitPoint.x, splitPoint.y, splitPoint.x, splitPoint.y], {
            originX: 'center',
            originY: 'center',
            stroke: connector.stroke,
            strokeWidth: 3,
            selectable: false,
            perPixelTargetFind: true,
            angle: angle
        });
        canvas.add(l);
        if (refreshCanvas) {
            canvas.renderAll();
        }


        l.animate('y1', '+=15', {
            duration: 200,
            onChange: function () {
                if (refreshCanvas) {
                    canvas.renderAll();
                }
            },
        });
        l.animate('y2', '-=15', {
            duration: 200,
            onChange: function () {
                if (refreshCanvas) {
                    canvas.renderAll();
                }
            },
            onComplete: function () {

                l.animate('angle', '+=540', {
                    duration: 500,
                    onChange: function () {
                        if (refreshCanvas) {
                            canvas.renderAll();
                        }
                    },
                    onComplete: function () {
                        l.remove();

                        var easing = fabric.util.ease['easeInQuad'];
                        connector.animate('opacity', 0, {
                            duration: 450,
                            easing: easing,
                            onChange: function () {
                                if (refreshCanvas) {
                                    canvas.renderAll();
                                }
                            },
                            onComplete: function () {
                                var options = {
                                    connector: connector
                                };
                                connector.destination.trigger('inConnectionRemoved', options);
                                connector.source.trigger('outConnectionRemoved', options);
                                connector.remove();
                            }
                        });

                    }
                });

            }
        });

    },
    contract: function (toDestination, doNotRemoveOnComplete, doNotRefreshCanvas, easing) {

        var theConnector = this;
        var endX = theConnector.source.left;
        var endY = theConnector.source.top;
        var xProp = 'x2';
        var yProp = 'y2';

        var duration = easing ? 650 : 2000;
        easing = easing || fabric.util.ease['easeOutElastic'];

        if (toDestination) {
            endX = theConnector.destination.left;
            endY = theConnector.destination.top;
            xProp = 'x1';
            yProp = 'y1';
        }

        theConnector.animate(xProp, endX, {
            duration: duration,
            easing: easing,
        });
        theConnector.animate(yProp, endY, {
            duration: duration,
            easing: easing,
            onChange: function () {
                if (!doNotRefreshCanvas) {
                    canvas.renderAll();
                }
            },
            onComplete: function () {
                if (!doNotRemoveOnComplete) {
                    var options = {
                        connector: theConnector
                    };
                    if (theConnector.destination) {
                        theConnector.destination.trigger('inConnectionRemoved', options);
                    }
                    if (theConnector.source) {
                        theConnector.source.trigger('outConnectionRemoved', options);
                    }
                    theConnector.remove();
                    if (LOG)
                        console.log("%cConnector fully contracted and removed", "background: black; color: grey;");
                }
            }
        });

    },
    setValue: function (value, markDestinationAsSelected, shouldAnimate) {

        if (LOG) {
            console.log("%c setValue function CONNECTOR class. shouldAnimate: " + shouldAnimate, "background: green; color: white;");

            console.log("%c value:", "background: blue; color: white;");
            console.log(value);
        }

        this.value = value;
        if (this.destination) {

            var options = {
                inConnection: this,
                markAsSelected: markDestinationAsSelected,
                shouldAnimate: shouldAnimate
            };

            this.destination.inValueUpdated(options); // instead of using an event, we call a function
        }
    },
    applySelectedStyle: function (selectSource, selectDestination) {
        this.strokeWidth = this.selectedStrokeWidth || 3;
        if (selectSource) {
            if (this.source && this.source.applySelectedStyle) {
                this.source.applySelectedStyle(false);
            }
        }
        if (selectDestination) {
            if (this.destination && this.destination.applySelectedStyle) {
                this.destination.applySelectedStyle(false);
            }
        }
    },
    applyUnselectedStyle: function (unselectSource, unselectDestination) {
        this.strokeWidth = this.originalStrokeWidth || 1;
        if (unselectSource) {
            if (this.source && this.source.applyUnselectedStyle) {
                this.source.applyUnselectedStyle(false);
            }
        }
        if (unselectDestination) {
            if (this.destination && this.destination.applyUnselectedStyle) {
                this.destination.applyUnselectedStyle(false);
            }

        }
    },
    setDestination: function (destination, shouldAnimate, doNotBlink) {

        popSound.play();

        var theConnection = this;

        if (LOG)
            console.log("%c setDestination CONNECTOR class. shouldAnimate: " + shouldAnimate, "background:blue; color: white");

        if (LOG)
            console.log("destination:");
        if (LOG)
            console.log(destination);

        var massCenter = destination.getPointByOrigin('center', 'center');
        if (destination.getCompressedMassPoint) {
            massCenter = destination.getCompressedMassPoint();
        }

        if (LOG)
            console.log("massCenter:");
        if (LOG)
            console.log(massCenter);

        if (destination) {

            var duration = 250;

            theConnection.animate('x2', massCenter.x, {
                duration: duration,
            });
            theConnection.animate('y2', massCenter.y, {
                duration: duration,
            });

            // Refreshing the screen
            fabric.util.animate({
                duration: duration,
                onChange: function () {
                    canvas.renderAll();
                },
                onComplete: function () {
                    canvas.renderAll();
                }
            });

            theConnection.destination = destination;




            if (LOG)
                console.log("The destination of this connector is: " + destination.type);

            var options = {
                newInConnection: theConnection,
                shouldAnimate: shouldAnimate,
                doNotBlink: doNotBlink,
            };
            theConnection.destination.trigger('newInConnection', options);

        } else {
            alertify.error("No destination provided for this connector", "", 2000);
        }
    },
    setSource: function (source) {
        if (source) {
            var connector = this;
            this.source = source;
        }
    },
    remove: function () {
        if (LOG)
            console.log("removing connector");
        this.callSuper('remove');
        if (!canvas.renderOnAddRemove) {
            canvas.renderAll();
        }
    },
    toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            operator: this.get('operator'),
            isConnector: this.get('isConnector'),
            source: this.get('source'),
            destination: this.get('destination'),
            arrowSeparation: this.get('arrowSeparation'),
            arrowSize: this.get('arrowSize'),
            arrowColor: this.get('arrowColor'),
        });
    },
    _render: function (ctx) {

        this.callSuper('_render', ctx);

        ctx.save();

        ctx.fillStyle = ctx.strokeStyle;

        var x1 = -this.width / 2;
        var y1 = this.height / 2;
        var x2 = this.width / 2;
        var y2 = -this.height / 2;

        if (this.y1 < this.y2) {
            y1 = -this.height / 2;
            y2 = this.height / 2;
        }

        if (this.x1 > this.x2) {
            x1 = this.width / 2;
            x2 = -this.width / 2;
        }

        var deltaX = x2 - x1;
        var deltaY = y2 - y1;
        var angle = Math.atan(deltaY / deltaX);
        if (this.x1 > this.x2) {
            angle += fabric.util.degreesToRadians(180);
        }

        var p1 = {x: x1, y: y1};
        var p2 = {x: x2, y: y2};
        var line = {p1: p1, p2: p2};
        var length = computeLength(line);

        var step = 50;
        var cummulatedDistance = step;

        while (true) {

            if (cummulatedDistance >= length) {
                break;
            }

            var point = getPointAlongLine(line, cummulatedDistance);
            var x = point.x;
            var y = point.y;
            moveTo(x, y);

            drawFilledPolygon(translateShape(rotateShape(this.triangle, angle), x, y), ctx);

            cummulatedDistance += step;

        }

        ctx.restore();

    },
    hide: function () {
        this.opacity = 0;
        this.canvas.connectorsHidden = true;
        this.hidden = true;
    },
    show: function () {
        this.opacity = 1;
        this.canvas.connectorsHidden = false;
        this.hidden = false;
    },
    toggleVisibility: function () {
        if (this.hidden) {
            this.show();
        } else {
            this.hide();
        }
    },
    changeColor: function (color) {
        this.fill = color;
        this.arrowColor = color;
        this.stroke = color;
    },
});


function createConnectorFromXMLNode(connectorNode) {

    var fromID = connectorNode.attr('from');
    var toID = connectorNode.attr('to');

    console.log("%c" + "Attempting new connection between " + fromID + " and " + toID, "font-weight: bold; font-size: 15px; background: black; color: rgb(240,205,90);");

    var source = connectableElements[fromID];
    var destination = connectableElements[toID];

    if (!source || typeof source === 'undefined') {
        console.log("%c" + "Source NOT found!", "font-weight: bold; font-size: 15px; background: black; color: rgb(215,240,90);");
    }
    if (!destination || typeof destination === 'undefined') {
        console.log("%c" + "Destination NOT found!", "font-weight: bold; font-size: 15px; background: black; color: rgb(215,240,90);");
    }

    if (typeof source !== 'undefined' && typeof destination !== 'undefined' && source !== null && destination !== null) {

        var arrowColor = connectorNode.attr('arrowColor');
        var strokeWidth = Number(connectorNode.attr('strokeWidth'));
        var filledArrow = connectorNode.attr('filledArrow') === 'true';
        var opacity = Number(connectorNode.attr('opacity'));

        var x1 = source.left;
        var y1 = source.top;
        var x2 = destination.left;
        var y2 = destination.top;

        var connector = new Connector({
            source: source,
            x1: x1,
            y1: y1,
            destination: destination,
            x2: x2,
            y2: y2,
            arrowColor: arrowColor,
            filledArrow: filledArrow,
            strokeWidth: strokeWidth,
            opacity: opacity
        });

        source.outConnectors.push(connector);
        destination.inConnectors.push(connector);

        canvas.add(connector);

        if (source.isOperator || source.isLocator) {
            bringToFront(source);
        }

        if (destination.isOperator || destination.isMark) {
            bringToFront(destination);
        }
        console.log("%c" + "Connection created from " + fromID + " to " + toID, "background: rgb(255,192,36); color: white;");
        return true;
    }
    return false;
}
