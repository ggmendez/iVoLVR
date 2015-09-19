var DataType = function () {

    this.set('isDataType', true);

    this.set('xmlNodeName', 'visualValue');

    this.set('originX', 'center');
    this.set('originY', 'center');
    this.set('transparentCorners', false);
    this.set('perPixelTargetFind', false);
    this.set('lockRotation', true);
    this.set('lockScalingX', true);
    this.set('lockScalingY', true);
    this.set('hasBorders', false);
    this.set('hasControls', false);
    this.set('hasRotatingPoint', false);
    this.set('scaleX', 1.2);
    this.set('scaleY', 1.2);

    this.setXmlIDs = function (from) {
        var theVisualValue = this;
        theVisualValue.xmlID = from++;
        return from;
    };

    this.executePendingConnections = function () {
        var theDataType = this;
        executePendingConnections(theDataType.xmlID);
    };

    this.toXML = function () {
        var visualValueNode = createXMLElement("visualValue");
        addAttributeWithValue(visualValueNode, "xmlID", this.xmlID);
        appendElementWithValue(visualValueNode, "left", this.left);
        appendElementWithValue(visualValueNode, "top", this.top);
        visualValueNode.append(this.value.toXML());
        return visualValueNode;
    };

    this.applySelectedStyle = function (selectConnectors) {
        this.selected = true;
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
    };
    this.applyUnselectedStyle = function (unselectConnectors) {
        this.selected = false;
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

    };
    this.addInConnector = function (connector) {
        this.inConnectors.push(connector);
        connector.setDestination(this, true);
    };
    this.addOutConnector = function (connector) {
        this.outConnectors.push(connector);
    };

    this.animateBirth = function (markAsSelected, finalScaleX, finalScaleY, doNotRefreshCanvas) {

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

        theMark.animate('scaleY', scaleY, {
            duration: duration,
            easing: easing,
            onChange: doNotRefreshCanvas ? null : canvas.renderAll.bind(canvas),
            onComplete: doNotRefreshCanvas ? null : canvas.renderAll.bind(canvas),
        });

    };

    this._render = function (ctx) {
        this.renderMethod(ctx);
    };

    this.renderMethod = function (ctx) {

        // Since the path can have 'holes', we paint the background in white to avoid that what is behind the DataType representation becomes visible
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(0, 0, this.width / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.restore();


        ctx.save();
        this.callSuper('_render', ctx);
        ctx.restore();

        if (this.selected) {

            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = this.fill;
            ctx.lineWidth = widget_selected_stroke_width - 1;
            ctx.arc(0, 0, this.width / 2 - widget_selected_stroke_width / 2 + 1, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = widget_selected_stroke_width / 2;
            ctx.arc(0, 0, this.width / 2 + widget_selected_stroke_width / 4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.setLineDash(widget_selected_stroke_dash_array);
            ctx.strokeStyle = widget_selected_stroke_color;
            ctx.lineWidth = widget_selected_stroke_width;
            ctx.arc(0, 0, this.width / 2, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();



        }


//        if (this.selected || this.isFunctionLimit) {
        if (true) {

            if (!this.collection) {
                ctx.save();
                ctx.beginPath();
                ctx.font = '16px Helvetica';
                ctx.fillStyle = 'black';
                ctx.textAlign = "center";
                ctx.moveTo(0, 0);
                ctx.fillText(this.value.getDisplayableString(this.optionsToDisplay), 0, this.height / 2 + 20);
                ctx.closePath();
                ctx.restore();
            }

        }








    };


    this.associateEvents = function () {

        this.on({
            'doubleTap': function (options) {
                var theDataType = this;
                theDataType.expand();
            },
                        
            'scaling': function (options) {
                console.log("Scaling datatype");
            },
            
            'moving': function (options) {
                var theDataType = this;
                if (theDataType.lockMovementX && theDataType.lockMovementY) {
                    theDataType.connecting = true;
                    var theEvent = options.e;
                    if (theEvent) {
                        var canvasCoords = getCanvasCoordinates(theEvent);
                        var lastAddedConnector = getLastElementOfArray(theDataType.outConnectors);
                        lastAddedConnector.set({x2: canvasCoords.x, y2: canvasCoords.y});
                    }
                } else {
                    updateConnectorsPositions(theDataType);
                }
            },
            'modified': function (option) {

                var theDataType = this;

                if (LOG)
                    console.log("Visual Variable being modified");
            },
            'selected': function (option) {

                var theDataType = this;

                if (LOG)
                    console.log("Visual Variable selected");
            },
            'mouseup': function (options) {

                var theDataType = this;
                theDataType.connecting = false;

                if (LOG)
                    console.log("Mouse UP over a Visual Variable");

                var theEvent = options.e;

                if (theEvent) {

                    var canvasCoords = getCanvasCoordinates(theEvent);

                    if (theDataType.lockMovementX && theDataType.lockMovementY) {


                        var targetObject = findPotentialDestination(canvasCoords, ['isVisualProperty', 'isOperator', 'isFunctionInput', 'isAggregator', 'isDataType', 'isMapperInput', 'isVerticalCollection', 'isMark', 'isNumericFunctionInput']);

                        var connector = getLastElementOfArray(theDataType.outConnectors);

                        if (targetObject) {

                            if (targetObject !== this) {

                                if (targetObject.isMark) {

                                    var connector = getLastElementOfArray(this.outConnectors);

                                    var theSource = connector.source;
                                    var theDestination = connector.destination;

                                    var visualProperty = targetObject.getDefaultModifiableVisualPropertyByType(theDataType.value);

                                    if (visualProperty) {

                                        connector.setDestination(visualProperty, true);

                                        setTimeout(function () {

                                            if (theSource) {
//                                                theSource.bringToFront();
                                                bringToFront(theSource);
                                            }
                                            if (theDestination) {
//                                                theDestination.bringToFront();
                                                bringToFront(theDestination);
                                            }
                                        }, 50);

                                    } else {

                                        var connector = this.outConnectors.pop();
                                        connector.contract();

                                    }



                                } else if (targetObject.isVerticalCollection) {

                                    addVisualVariableToCollection(theDataType, targetObject, connector);


                                } else if (targetObject.isVisualProperty || targetObject.isFunctionInput || targetObject.isDataType || targetObject.isMapperInput || targetObject.isNumericFunctionInput) {

                                    connector.setDestination(targetObject, true);

                                    setTimeout(function () {
//                                        connector.source.bringToFront();
//                                        connector.destination.bringToFront();
                                        bringToFront(connector.source);
                                        bringToFront(connector.destination);
                                    }, 50);

                                } else if (targetObject.isOperator) {

                                    // This is NOT needed anymore
//                                    if (theDataType.isDurationData) {
//                                        connector.value = theDataType.value.convert("isNumericData");
//                                    }

                                    if (connector.value) {

                                        connector.setDestination(targetObject, true);

                                        setTimeout(function () {
//                                            connector.source.bringToFront();
//                                            connector.destination.bringToFront();
                                            bringToFront(connector.source);
                                            bringToFront(connector.destination);
                                        }, 50);

                                    } else {
                                        connector.contract();
                                    }



                                } else if (targetObject.isAggregator) {

                                    targetObject.addConnector(connector, canvasCoords);

                                } else { // This makes no sense, so, the added connector is just removed
                                    connector = theDataType.outConnectors.pop();
                                    if (connector) {
                                        connector.contract();
                                    }
                                }

                            } else {
                                connector = theDataType.outConnectors.pop();
                                if (connector) {
//                                    connector.contract();

                                    var options = {
                                        connector: connector
                                    };

                                    if (connector.destination) {
                                        connector.destination.trigger('inConnectionRemoved', options);
                                    }
                                    if (connector.source) {
                                        connector.source.trigger('outConnectionRemoved', options);
                                    }

                                    connector.remove();
                                }
                            }

                        } else {

                            // This number is released on the canvas
                            connector = theDataType.outConnectors.pop();
                            if (connector) {
                                connector.contract();
                            }

                        }

                        if (theDataType.collection && theDataType.collection.mapper) {

                            theDataType.lockMovementX = true;
                            theDataType.lockMovementY = false;


                        } else {

                            theDataType.lockMovementX = false;
                            theDataType.lockMovementY = false;

                        }






                    } else {


                        var canvasCoords = getCanvasCoordinates(theEvent);

                        var targetObject = findPotentialDestination(canvasCoords, ['isVerticalCollection', 'isVisualProperty']);

                        if (targetObject) {

                            if (targetObject.isVerticalCollection) {

                                var theCollection = targetObject;

                                addVisualVariableToCollection(theDataType, theCollection, null, true, null);
                                
//                                addVisualVariableToCollection(theVisualVariable, theCollection);

                                if (theCollection.isCompressed) {

                                    theDataType.opacity = 0;

                                } else {

                                    var theMapper = theCollection.mapper;

                                    if (theMapper) {

                                        var otherCollection = theMapper.getOtherCollection(theCollection);

                                        if (LOG)
                                            console.log("%ctheCollection.getTotalValues(): " + theCollection.getTotalValues(), "background: red; color: white;");
                                        if (LOG)
                                            console.log("%cotherCollection.getTotalValues(): " + otherCollection.getTotalValues(), "background: red; color: white;");



                                        var collectionGrew = theCollection.getTotalValues() >= otherCollection.getTotalValues();

                                        if (LOG)
                                            console.log("%ccollectionGrew: " + collectionGrew, "background: red; color: white;");



                                    } else {
                                        hideWithAnimation(theDataType);
                                    }
                                }



                            } else if (targetObject.isVisualProperty) {

                                // TODO: IMPORTANT: The following code is NOT checking the types of the incomming value and the one that the visual property should receive
                                // This should be checked in the future

                                if (theDataType.outConnectors.length === 0) {

                                    var theVisualProperty = targetObject;

                                    var value = theDataType.value;

                                    theDataType.inConnectors.forEach(function (inConnector) {
                                        inConnector.contract();
                                    });

                                    hideWithAnimation(theDataType, false);
                                    blink(theVisualProperty, true, 0.65);

                                    setTimeout(function () {
                                        theVisualProperty.setValue(value, true, true);
                                    }, 350);

                                }




                            }









                        }

                    }


                }





            },
            'pressed': function (option) {

                var theDataType = this;

                theDataType.lockMovementX = true;
                theDataType.lockMovementY = true;
                blink(theDataType, true, 0.45);

                if (LOG)
                    console.log(this.type);

                var newConnector = new Connector({value: theDataType.value, source: theDataType, x2: theDataType.left, y2: theDataType.top, arrowColor: theDataType.colorForStroke, filledArrow: true, strokeWidth: 1});

                if (LOG)
                    console.log(newConnector.value);

                theDataType.outConnectors.push(newConnector);
                canvas.add(newConnector);

            },
            'mousedown': function (option) {

                var theDataType = this;
//                theDataType.bringToFront();
                bringToFront(theDataType);

            },
            'inConnectionRemoved': standarInConnectionRemovedHandler,
            'outConnectionRemoved': standarOutConnectionRemovedHandler,
            'newInConnection': function (options) {

                console.log("%cnewInConnection function DATATYPE class. options:", "background: #DAA520; color: black;");
                console.log(options);

                var theDataType = this;

                var newInConnection = options.newInConnection;
                var shouldAnimate = options.shouldAnimate;
                var doNotBlink = options.doNotBlink;

                var targetAttribute = newInConnection.destination.attribute;
                var incommingValue = newInConnection.value;

                if (!incommingValue[theDataType.dataTypeProposition]) {

                    var convertedValue = incommingValue.convert(theDataType.dataTypeProposition);
                    if (convertedValue) {
                        incommingValue = convertedValue;
                    } else {
                        alertify.error("Values types not compatible", "", 2000);
                        newInConnection.contract();
                        return;
                    }
                }



                if (this.setValue(incommingValue, doNotBlink)) {

                    if (LOG)
                        console.log("5555555555555555555555555555555555555");

                    if (theDataType.inConnectors.length > 0) {
                        var connector = theDataType.inConnectors.pop();
                        connector.contract();
                    }

                    theDataType.inConnectors.push(newInConnection);

                    if (!doNotBlink) {
                        blink(theDataType, true, 0.45);
                    }

//                    theDataType.outConnectors.forEach(function (outConnector) {
//                        outConnector.setValue(incommingValue, false, shouldAnimate);
//                    });

                    // Every time a value is set here, we also have to update the values of the outgoing connections
                    theDataType.outConnectors.forEach(function (outConnector) {

                        if (LOG)
                            console.log("The value that will be communicated to the connectors' destinations:");
                        if (LOG)
                            console.log(theDataType.value);

                        outConnector.setValue(theDataType.value.clone(), false, shouldAnimate);
                    });

                    if (LOG)
                        console.log("-----------------------------------------------------------------------");

                    if (theDataType.collection) {
                        var options = {
                            visualValue: theDataType
                        };
                        theDataType.collection.trigger('valueChanged', options);
                    }




                } else {

                    alertify.error("Error when trying to set the new value!", "", 2000);
                    newInConnection.contract();
                    return;

                }









            },
            
            
            
//            'inValueUpdated': function (options) {
//
//                var theDataType = this;
//
//                var inConnection = options.inConnection;
//                var markAsSelected = options.markAsSelected;
//                var shouldAnimate = options.shouldAnimate;
//
//                var originAttribute = inConnection.source.type;
//                var targetAttribute = inConnection.destination.type;
//
//                var updatedValue = inConnection.value;
//
//                if ($.isArray(updatedValue)) {
//
//                    blink(theDataType, true, 0.45);
//
//                    inConnection.contract();
//                    return;
//
//                }
//
//                if (LOG)
//                    console.log("%c inValueUpdated DATATYPE shouldAnimate: " + shouldAnimate, "background: black; color: pink;");
//
//                var refreshCanvas = !shouldAnimate;
//
//                theDataType.setValue(inConnection.value, refreshCanvas, shouldAnimate);
//
//
//
//            }

        });
    };



    this.inValueUpdated = function (options) {



        var theDataType = this;

        var inConnection = options.inConnection;
        var markAsSelected = options.markAsSelected;
        var shouldAnimate = options.shouldAnimate;

//        console.log("%c inValueUpdated function DATATYPE class shouldAnimate: " + shouldAnimate, "background: #8B0000; color: white");

        var updatedValue = inConnection.value;

        if ($.isArray(updatedValue)) {

            blink(theDataType, true, 0.45);

            inConnection.contract();
            return;

        }

        if (LOG)
            console.log("%c inValueUpdated DATATYPE shouldAnimate: " + shouldAnimate, "background: black; color: pink;");

        var refreshCanvas = false;

        theDataType.setValue(inConnection.value, refreshCanvas, shouldAnimate);

    }


    return this;
};



function CreateDataType(options) {

    if (options.theType === "number") {
        return new NumericData(options);
    } else if (options.theType === "string") {
        return new StringData(options);
    } else if (options.theType === "dateAndTime") {
        return new DateAndTimeData(options);
    } else if (options.theType === "duration") {
        return new DurationData(options);
    } else if (options.theType === "color") {
        return new ColorData(options);
    } else if (options.theType === "shape") {
        return new ShapeData(options);
    }


}


function CreateDataTypeFromValue(value) {   

    if (value.isNumericData) {

        /*console.log("--------------- ************************* value:");
         console.log(value);*/

        var options = {unscaledValue: value.unscaledValue, inPrefix: value.inPrefix, outPrefix: value.outPrefix, units: value.units};
        return new NumericData(options);

    } else if (value.isStringData) {

        var options = {string: value.string};
        return new StringData(options);

    } else if (value.isDateAndTimeData) {

        var options = {theMoment: value.moment};
        return new DateAndTimeData(options);

    } else if (value.isDurationData) {

        var options = {theDuration: value.duration, outputUnits: value.outputUnits};
        return new DurationData(options);

    } else if (value.isColorData) {

        var options = {theColor: value.color};
        return new ColorData(options);

    } else if (value.isShapeData) {

        var options = {theShape: value.shape};

        var shape = value.shape;
        var attribute = null;
        if (shape === PATH_MARK || shape === FILLEDPATH_MARK) {
            attribute = 'path';
        } else {
            attribute = 'svgPathGroupMark';
        }
        options[attribute] = value[attribute];

        return new ShapeData(options);

    } else {

        return null;

    }
}

function createDefaultVisualValueByTypeProposition(dataTypeProposition, x, y) {

    var options = {left: x, top: y};

    if (dataTypeProposition === "isColorData") {

        options.theType = "color";

    } else if (dataTypeProposition === "isStringData") {

        options.theType = "string";
        options.string = 'A string';

    } else if (dataTypeProposition === "isNumericData") {

        options.theType = "number";
        options.unscaledValue = 100;

    } else if (dataTypeProposition === "isDurationData") {

        options.theType = "duration";

    } else if (dataTypeProposition === "isDateAndTimeData") {

        options.theType = "dateAndTime";

    } else if (dataTypeProposition === "isShapeData") {

        options.theType = "shape";

    }

    return CreateDataType(options);


}



function addVisualVariableToCollection(visualValue, collection, connector, useTheGivenVisualValue, canvasCoords) {
    
    

    var value = visualValue.value;

    if (collection.isValueAllowed(value)) {

        var newVisualValue = visualValue;

        if (!useTheGivenVisualValue) {
            newVisualValue = CreateDataTypeFromValue(value);
        }

        if (collection.isCompressed) {
            var collectionCenter = collection.getPointByOrigin('center', 'center');
            newVisualValue.top = collectionCenter.y;
            newVisualValue.left = collectionCenter.x;
        } else if (canvasCoords) {
            newVisualValue.top = canvasCoords.y;
            newVisualValue.left = canvasCoords.x;
        }
        
        console.log("newVisualValue:");
        console.log(newVisualValue);

        if (connector) {
            connector.setDestination(newVisualValue, true, true);
        }

        collection.addVisualValue(newVisualValue);


    } else {

        alertify.error("The collection does not allow this type of values", "", 2000);
        if (connector) {
            connector.contract();
        }

    }

}

function addVisualValueToCanvas(options) {

    print("addVisualValueToCanvas FUNCTION", "#a73746", "white");

    print("options:", "#a73746", "white");
    console.log(options);

    if (options.svgPathGroupMark) {

        console.log("options.svgPathGroupMark:");
        console.log(options.svgPathGroupMark);

        var SVGString = options.svgPathGroupMark;







        fabric.loadSVGFromString(SVGString, function (objects, options2) {

            /*var obj = fabric.util.groupSVGElements(objects, options2);
             
             options.svgPathGroupMark = obj;
             
             console.log(options.svgPathGroupMark);
             
             options = $.extend(true, {}, options, options2);
             
             var visualValue = CreateDataType(options);
             canvas.add(visualValue);
             
             console.log("visualValue:");
             console.log(visualValue);
             
             visualValue.animateBirth(false, null, null, false);*/

            options.thePaths = objects;
            options.shape = CIRCULAR_MARK;


            options = $.extend(true, {}, options, options2);

            var svgPathGroupMark = new SVGPathGroupMark(objects, options);

            var shapeValue = createShapeValue(SVGPATHGROUP_MARK, svgPathGroupMark);

            var visualValue = new ShapeData(options);

            visualValue.setValue(shapeValue, true);

            visualValue.value.SVGString = SVGString;

            canvas.add(visualValue);

            console.log("visualValue:");
            console.log(visualValue);

            visualValue.animateBirth(false, null, null, false);


        });


    } else {

        var visualValue = CreateDataType(options);
        canvas.add(visualValue);

        console.log("visualValue:");
        console.log(visualValue);

        visualValue.animateBirth(false, null, null, false);

    }


}

function createVisualVariableFromXMLNode(visualValueXmlNode) {

    var options = {
        xmlID: visualValueXmlNode.attr('xmlID'),
    };

    var children = visualValueXmlNode.children();
    children.each(function () {
        var child = $(this);
        var tagName = this.tagName;

        if (tagName === "value") {

            options.value = createValueFromXMLNode(child);

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

    console.log("options to create a new DATATYPE from an XML node");
    console.log(options);

    var visualValue = CreateDataTypeFromValue(options.value);
    visualValue.xmlID = options.xmlID;
    visualValue.top = options.top;
    visualValue.left = options.left;
    addToConnectableElements(visualValue);

    canvas.add(visualValue);
    visualValue.animateBirth(false, null, null, true);

    visualValue.executePendingConnections();

    return visualValue;
}