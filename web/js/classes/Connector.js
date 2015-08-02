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
        this.set('hasControls', false);
        this.set('triangles', new Array());
        this.set('arrowColor', options.arrowColor || this.source.fill);
        this.set('stroke', options.stroke || this.arrowColor);
        this.set('strokeDashArray', options.strokeDashArray || [7, 7]);
        this.set('filledArrow', options.filledArrow || false);

        this.set('hidden', options.hidden || canvas.connectorsHidden);
        if (this.hidden) {
            this.opacity = 0;
        }

        var deltaX = this.x2 - this.x1;
        var deltaY = this.y2 - this.y1;

        var connectorLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        this.nTriangles = Math.round(connectorLength / this.arrowSeparation, 0);
        var angle = fabric.util.radiansToDegrees(Math.atan(Math.abs(deltaY) / Math.abs(deltaX)) + Math.PI / 2);
        for (var i = 0; i < this.nTriangles; i++) {
            var triangle = new fabric.Path("M0 0 L" + this.arrowSize / 2 + " " + this.arrowSize + "L" + this.arrowSize + " " + 0, {
                originX: 'center',
                originY: 'center',
//                width: this.arrowSize+2*i,
//                height: this.arrowSize+2*i,
                width: this.arrowSize,
                height: this.arrowSize,
                stroke: this.arrowColor,
                fill: this.filledArrow ? this.arrowColor : '',
                angle: angle,
                opacity: this.opacity
            });
            triangle.left = this.x1 + (((i + 1) * deltaX) / (this.nTriangles + 1));
            triangle.top = this.y1 + (((i + 1) * deltaY) / (this.nTriangles + 1));
            this.triangles.push(triangle);
//            canvas.add(triangle);
        }

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
                if (LOG)
                    console.log("connector source scaling");
//                }
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

//        this.positionTriangles();
    },
    split: function (splitPoint, line) {

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
        canvas.renderAll();

        l.animate('y1', '+=15', {
            duration: 200,
            onChange: canvas.renderAll.bind(canvas),
        });
        l.animate('y2', '-=15', {
            duration: 200,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: function () {

                l.animate('angle', '+=540', {
                    duration: 500,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function () {
                        l.remove();

                        var easing = fabric.util.ease['easeInQuad'];
                        connector.animate('opacity', 0, {
                            duration: 450,
                            easing: easing,
                            onChange: canvas.renderAll.bind(canvas),
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
    contract: function (toDestination, doNotRemoveOnComplete, doNotRefreshCanvas) {

        var theConnector = this;
        var endX = theConnector.source.left;
        var endY = theConnector.source.top;
        var xProp = 'x2';
        var yProp = 'y2';

        var easing = fabric.util.ease['easeInCirc'];
        var duration = 500;

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
                theConnector.positionTriangles();
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

//            this.destination.trigger('inValueUpdated', options);
            this.destination.inValueUpdated(options); // instead of using an event, we call a function
        }
    },
    applySelectedStyle: function (selectSource, selectDestination) {
        this.strokeWidth = 3;
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
        this.strokeWidth = 1;
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
                onChange: function () {
                    theConnection.positionTriangles();
                }
            });
            theConnection.animate('y2', massCenter.y, {
                duration: duration,
                onChange: function () {
                    theConnection.positionTriangles();
                }
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
//    setDestination: function (destination, shouldAnimate, doNotBlink) {
//
//        var theConnection = this;
//
//        if (LOG) console.log("%c setDestination " + shouldAnimate, "background:blue; color: white");
//
//        if (LOG) console.log("destination:");
//        if (LOG) console.log(destination);
//
//        var massCenter = destination.getPointByOrigin('center', 'center');
//        if (destination.getCompressedMassPoint) {
//            massCenter = destination.getCompressedMassPoint();
//        }
//
//        if (LOG) console.log("massCenter:");
//        if (LOG) console.log(massCenter);
//
//        if (destination) {
//
//            var duration = 250;
//
//            theConnection.animate('x2', massCenter.x, {
//                duration: duration,
//                onChange: function () {
//                    theConnection.positionTriangles();
//                }
//            });
//            theConnection.animate('y2', massCenter.y, {
//                duration: duration,
//                onChange: function () {
//                    theConnection.positionTriangles();
//                }
//            });
//
//            // Refreshing the screen
//            fabric.util.animate({
//                duration: duration,
//                onChange: function () {
//                    canvas.renderAll();
//                },
//                onComplete: function () {
//                    canvas.renderAll();
//                }
//            });
//
//            theConnection.destination = destination;
//            theConnection.destination.on('moving', function (options) {
//                if (LOG) console.log("The destination of this connector is being moved");
//                massCenter = destination.getPointByOrigin('center', 'center');
//                if (destination.getCompressedMassPoint) {
//                    massCenter = destination.getCompressedMassPoint();
//                }
//                theConnection.set({'x2': massCenter.x, 'y2': massCenter.y});
//                theConnection.setCoords();
//                theConnection.positionTriangles();
////                canvas.renderAll();
//            });
//            theConnection.destination.on('scaling', function (options) {
//                massCenter = destination.getPointByOrigin('center', 'center');
//                if (destination.getCompressedMassPoint) {
//                    massCenter = destination.getCompressedMassPoint();
//                }
//                theConnection.set({'x2': massCenter.x, 'y2': massCenter.y});
//                theConnection.setCoords();
//                theConnection.positionTriangles();
////                canvas.renderAll();
////                    if (LOG) console.log("connector destination scaling");
//            });
//            theConnection.destination.on('modified', function (options) {
//                massCenter = destination.getPointByOrigin('center', 'center');
//                if (destination.getCompressedMassPoint) {
//                    massCenter = destination.getCompressedMassPoint();
//                }
//                theConnection.set({'x2': massCenter.x, 'y2': massCenter.y});
//                theConnection.setCoords();
//                theConnection.positionTriangles();
////                canvas.renderAll();
////                    if (LOG) console.log("connector destination scaling");
//            });
//
//            if (LOG) console.log("The destination of this connector is: " + destination.type);
//
//            var options = {
//                newInConnection: theConnection,
//                shouldAnimate: shouldAnimate,
//                doNotBlink: doNotBlink,
//            };
//            theConnection.destination.trigger('newInConnection', options);
//
//        } else {
//            alertify.error("No destination provided for this connector", "", 2000);
//        }
//    },


    setSource: function (source) {
        if (source) {
            var connector = this;
            this.source = source;
        }
    },
//    setSource: function (source) {
//        if (source) {
//            var connector = this;
//            this.source = source;
//            this.source.on('moving', function (options) {
//
//                var massCenter = source.getPointByOrigin('center', 'center');
//                if (source.getCompressedMassPoint) {
//                    massCenter = source.getCompressedMassPoint();
//                }
//
//                connector.set({'x1': massCenter.x, 'y1': massCenter.y});
////                connector.set({'x1': this.left, 'y1': this.top});
//
//                connector.setCoords();
//                connector.positionTriangles();
//                canvas.renderAll();
//            });
//            this.source.on('scaling', function (options) {
//
//                var massCenter = source.getPointByOrigin('center', 'center');
//                if (source.getCompressedMassPoint) {
//                    massCenter = source.getCompressedMassPoint();
//                }
//
//                connector.set({'x1': massCenter.x, 'y1': massCenter.y});
//
////                connector.set({'x1': this.left, 'y1': this.top});
//                connector.setCoords();
//                connector.positionTriangles();
//                canvas.renderAll();
//            });
//            this.source.on('modified', function (options) {
//
//                var massCenter = source.getPointByOrigin('center', 'center');
//                if (source.getCompressedMassPoint) {
//                    massCenter = source.getCompressedMassPoint();
//                }
//
//                connector.set({'x1': massCenter.x, 'y1': massCenter.y});
//
////                connector.set({'x1': this.left, 'y1': this.top});
//                connector.setCoords();
//                connector.positionTriangles();
//                canvas.renderAll();
//            });
//        }
//    },
    remove: function () {
        if (LOG)
            console.log("removing connector");
        this.triangles.forEach(function (triangle) {
            canvas.remove(triangle);
        });
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
            nTriangles: this.get('nTriangles')
        });
    },
    _render: function (ctx) {
        ctx.save();
        this.positionTriangles();
        this.callSuper('_render', ctx);
        ctx.translate(-this.left - this.width / 2, -this.top - this.height / 2);
        for (var i = 0; i < this.nTriangles; i++) {
            var triangle = this.triangles[i];
            triangle.opacity = this.opacity;
            triangle.render(ctx);
        }
        ctx.restore();
    },
    hide: function () {
        this.opacity = 0;
        this.canvas.connectorsHidden = true;
        this.hidden = true;
        for (var i = 0; i < this.nTriangles; i++) {
            var triangle = this.triangles[i];
            triangle.opacity = 0;
        }
    },
    show: function () {
        this.opacity = 1;
        this.canvas.connectorsHidden = false;
        this.hidden = false;
        for (var i = 0; i < this.nTriangles; i++) {
            var triangle = this.triangles[i];
            triangle.opacity = 1;
        }
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
        this.triangles.forEach(function (triangle) {
            triangle.fill = color;
            triangle.stroke = color;
        });
    },
    positionTriangles: function () {

//        if (LOG) console.log("%cRe-positioning triangles", "background: yellow");

        var deltaX = this.x2 - this.x1;
        var deltaY = this.y2 - this.y1;

        var connectorLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        var nTriangles = Math.round(connectorLength / this.arrowSeparation, 0);
        this.nTriangles = nTriangles;

//        if (LOG) console.log("You need to draw " + nTriangles + " triangles");


        var diff = nTriangles - this.triangles.length;


//        if (LOG) console.log("diff:");
//        if (LOG) console.log(diff);

        if (diff > 0) {

//            if (LOG) console.log("Voy a agregar " + diff + " triángulos");

            for (var i = nTriangles; i < nTriangles + diff; i++) {

//                if (LOG) console.log("Agregando triángulo " + i);

//                var triangle = new fabric.Triangle({
                var triangle = new fabric.Path("M0 0 L" + this.arrowSize / 2 + " " + this.arrowSize + "L" + this.arrowSize + " " + 0, {
                    originX: 'center',
                    originY: 'center',
//                width: this.arrowSize+2*i,
//                height: this.arrowSize+2*i,
                    width: this.arrowSize,
                    height: this.arrowSize,
                    fill: this.filledArrow ? this.arrowColor : '',
                    stroke: this.arrowColor,
                    angle: angle,
                    opacity: this.opacity
                });

                triangle.left = this.x1 + (((i + 1) * deltaX) / (nTriangles + 1));
                triangle.top = this.y1 + (((i + 1) * deltaY) / (nTriangles + 1));

                this.triangles.push(triangle);
            }
        }



        var angle = fabric.util.radiansToDegrees(Math.atan(deltaY / deltaX));

        if (angle > 0) {
            if (this.x1 > this.x2 && this.y1 > this.y2) {
                angle += 90;
            } else {
                angle -= 90;
            }
        } else if (angle < 0) {
            if (this.x1 == this.x2) {
                if (this.y1 < this.y2) {
                    angle -= 270;
                } else {
                    angle += 270;

                }
            } else if (this.x1 < this.x2 && this.y1 > this.y2) {
                angle += 270;
            } else {
                angle -= 270;
            }
        } else {

            if (this.y1 == this.y2) {
                if (this.x1 < this.x2) {
                    angle -= 90;
                } else {
                    angle += 90;
                }
            } else {
                if (this.y1 < this.y2) {
                    angle -= 180;
                } else {
                    angle += 180;

                }
            }
        }

        for (var i = 0; i < this.triangles.length; i++) {
            if (i < nTriangles) {
                this.triangles[i].left = this.x1 + (((i + 1) * deltaX) / (nTriangles + 1));
                this.triangles[i].top = this.y1 + (((i + 1) * deltaY) / (nTriangles + 1));
                this.triangles[i].angle = angle;
            } else {
//                this.triangles[i].opacity = 0;
            }
        }
//        if (this.source) {
//            canvas.bringToFront(this.source);
//        }
//        if (this.destination) {
//            canvas.bringToFront(this.destination);
//        }
    }
});



function createConnectorFromXMLNode(connectorNode) {

    var fromID = Number(connectorNode.attr('from'));
    var toID = Number(connectorNode.attr('to'));

    var source = getFabricElementByXmlID(fromID);
    var destination = getFabricElementByXmlID(toID);
    
    console.log("%c" + "source:", "background: black; color: rgb(240,205,90);");
    console.log(source);
    
    console.log("%c" + "destination:", "background: black; color: rgb(240,205,90);");
    console.log(destination);

    if (source !== null && destination !== null) {

        var arrowColor = connectorNode.attr('arrowColor');
        var strokeWidth = Number(connectorNode.attr('strokeWidth'));
        var filledArrow = connectorNode.attr('filledArrow') === 'true';
        var opacity = Number(connectorNode.attr('opacity'));

        var connector = new Connector({
            source: source,
            x1: source.left,
            y1: source.top,
            destination: destination,
            x2: destination.left,
            y2: destination.top,
            arrowColor: arrowColor,
            filledArrow: filledArrow,
            strokeWidth: strokeWidth,
            opacity: opacity
        });
        
        console.log("%c source.left: " + source.left, "background: rgb(255,192,36); color: white;");
        console.log("%c source.top: " + source.top, "background: rgb(255,192,36); color: white;");
        console.log("%c destination.left: " + destination.left, "background: rgb(255,192,36); color: white;");
        console.log("%c destination.top: " + destination.top, "background: rgb(255,192,36); color: white;");

        source.outConnectors.push(connector);
        destination.inConnectors.push(connector);

        canvas.add(connector);

        if (source.isOperator || source.isLocator) {
            source.bringToFront();
        }

        if (destination.isOperator || destination.isMark) {
            destination.bringToFront();
        }
        
        return true;

    } else {

        // This means that either the source or the destination of this connector is not available in the canvas yet 
        // We store the connector in the pendingConnections array, so that, objects that might be late, ask for their connections
        // to be made when they become available. This call will be only executed for objects that might be delayed (SVGGroupMarks, for instance)
        
        // We need to check if this connection has not been previously added to this array.
        if ($.inArray(connectorNode, pendingConnections) === -1) { // If the connection is NOT in the array
            pendingConnections.push(connectorNode);
        }
                        
        return false;

    }

}