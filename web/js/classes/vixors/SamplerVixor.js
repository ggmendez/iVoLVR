var SamplerVixor = fabric.util.createClass(fabric.Group, {
//   type: 'samplerVixor',
    isSamplerVixor: true,
    initialize: function (paths, options) {
        options || (options = {});
        this.callSuper('initialize', paths, options);

        this.set('strokeWidth', options.strokeWidth || 2);
        this.set('originalStrokeWidth', options.strokeWidth || 2);
        this.set('perPixelTargetFind', true);

        this.set('visualPropertyFill', options.visualPropertyFill || rgb(153, 153, 153));
        this.set('visualPropertyStroke', options.visualPropertyStroke || rgb(86, 86, 86));
        this.set('colorForStroke', options.visualPropertyStroke || rgb(86, 86, 86));

        this.createRectBackground();

        this.set('widgets', new Array());
        this.set('visualProperties', new Array());
        this.set('specificProperties', new Array());


        this.specificProperties.push({attribute: "totalSamplingPoints", readable: true, writable: true, types: ['number'], updatesTo: ['samplingDistance'], dataTypeProposition: 'isNumericData'});
        this.specificProperties.push({attribute: "samplingDistance", readable: true, writable: true, types: ['number'], updatesTo: ['totalSamplingPoints'], dataTypeProposition: 'isNumericData'});

        /*this.specificProperties.push({attribute: "samplingDistance", readable: true, writable: true, types: ['number'], updatesTo: ['totalSamplingPoints', 'samplingDistanceX']});
         this.specificProperties.push({attribute: "samplingDistanceX", readable: true, writable: true, types: ['number'], updatesTo: ['totalSamplingPoints', 'samplingDistance']});*/

        this.specificProperties.push({attribute: "colorValues", readable: true, writable: false, types: ['object'], updatesTo: []});

        /*this.specificProperties.push({attribute: "x", readable: true, writable: false, types: ['object'], updatesTo: []});
         this.specificProperties.push({attribute: "y", readable: true, writable: false, types: ['object'], updatesTo: []});*/

        this.specificProperties.push({attribute: "length", readable: true, writable: false, types: ['number'], updatesTo: [], dataTypeProposition: 'isNumericData'});
        this.specificProperties.push({attribute: "trajectory", readable: true, writable: false, types: ['number'], updatesTo: [], dataTypeProposition: 'isNumericData'});

        this.createVisualProperties();


        // Assigning the values to the created visual properties



        var totalSamplingPointsVisualProperty = this.getVisualPropertyByAttributeName('totalSamplingPoints');
        totalSamplingPointsVisualProperty.value = createNumericValue(options.totalSamplingPoints, null, null, 'points');







        this.applyUnselectedStyle = function () {

            var offsetPath = this.item(0);
            offsetPath.stroke = offsetPath.colorForStroke;
            offsetPath.strokeWidth = offsetPath.originalStrokeWidth;
            offsetPath.strokeDashArray = [];
        };

        this.applySelectedStyle = function () {

            if (LOG) console.log("SAMPLER selected");

            var offsetPath = this.item(0);
            offsetPath.stroke = widget_selected_stroke_color;
            offsetPath.strokeWidth = widget_selected_stroke_width;
            offsetPath.strokeDashArray = widget_selected_stroke_dash_array;
        };

        // Overriding the behaviour of the expand method so that the marks of this vixor are not covered by the background rectangle        
        this.expand = function (refreshCanvas) {
            var theVixor = this;
            // Calling the nomal expand method from the prototype definition
            SamplerVixor.prototype.expand.call(this, refreshCanvas);
            theVixor.bringSamplingMarksToFront();
        };

        this.getCompressedMassPoint = function () {

            var theVixor = this;
            var objectCenter = theVixor.getCenterPoint();

            var currentPolyline = new Array();
            theVixor.samplingMarks.forEach(function (mark) {
                currentPolyline.push({x: mark.left, y: mark.top});
            });
            var topCenter = theVixor.getPointByOrigin('center', 'top');
            var bottomCenter = theVixor.getPointByOrigin('center', 'bottom');
            var traversalLine = {x1: topCenter.x, y1: topCenter.y, x2: bottomCenter.x, y2: bottomCenter.y};

            /*canvas.add(new fabric.Line([topCenter.x, topCenter.y, bottomCenter.x, bottomCenter.y], {
             stroke: 'red',
             selectable: false
             }));*/

            var intersectingPoint = getPathLineIntersection(currentPolyline, traversalLine);
            if (intersectingPoint) {
                return intersectingPoint;
            } else {
                return objectCenter;
            }


        };

        this.associateInteractionEvents = function () {
            var theVixor = this;
            theVixor.on({
                'mousedown': function (options) {
                    theVixor.onMouseDown(options);
                },
                'mouseup': function (options) {
                    theVixor.onMouseUp(options);
                },
                'moving': function (options) {
                    theVixor.onMoving(options);
                },
                'scaling': function (options) {
                    theVixor.onScaling(options);
                },
                'rotating': function (options) {
                    theVixor.onRotating(options);
                },
            });
        };

    },
    onManipulating: function (options) {
        var theVixor = this;

        theVixor.hasControls = false;

        theVixor.setCoords();

        var hasParent = theVixor.parentObject;
        objectMoving(options, this);

        if (hasParent) {
            computeUntransformedProperties(theVixor);
        }
    },
    onMoving: function (options) {
//        if (LOG) console.log("MOVING sampler vixor");
        this.onManipulating(options);
    },
    onScaling: function (options) {
//        if (LOG) console.log("SCALING sampler vixor");
        this.onManipulating(options);
    },
    onRotating: function (options) {
//        if (LOG) console.log("ROTATING sampler vixor");
        this.onManipulating(options);
    },
    bringSamplingMarksToFront: function () {
        var theVixor = this;
        theVixor.samplingMarks.forEach(function (widget) {
            widget.bringToFront();
        });
    },
    onMouseDown: function (options) {
        var theVixor = this;
//        theVixor.bringSamplingMarksToFront(); // I just disabled this for efficiency
    },
    onMouseUp: function (options) {

        var theVixor = this;

        var newParentObject;

        var fullyContainerElement = findContainerElement(this, ['isImportedImage']);
        if (fullyContainerElement) {
            newParentObject = fullyContainerElement;
            if (LOG) console.log("%cReleased over this element:", "background: green; color:white;");
        } else {
            var intersectorElement = findIntersectorElement(this, ['isImportedImage']);
            if (intersectorElement) {
                newParentObject = intersectorElement;
                if (LOG) console.log("%cNot fully contained by an imported image:", "background: yellow; color:black;");
            } else {
                if (LOG) console.log("%cReleased over the canvas", "background: red; color:white;");
                intersectorElement = null;

                // This vixor should be removed from the list of widgets of its previous parent

            }
        }

        var parentChanged = newParentObject !== theVixor.parentObject;

        if (parentChanged) {

            // This is, indeed, a new parent, and it exists
            if (LOG) console.log("%cThe vixor has a NEW parent", "background: pink; color:blue;");

            // The old parent has to forget this vixor as part of its widgets
            if (theVixor.parentObject) {
                fabric.util.removeFromArray(theVixor.parentObject.widgets, theVixor);
            }

            theVixor.parentObject = newParentObject;

            if (newParentObject) {
                newParentObject.widgets.push(theVixor);
                computeUntransformedProperties(theVixor);
                theVixor.untransformedScaleX = 1 / newParentObject.scaleX;
                theVixor.untransformedScaleY = 1 / newParentObject.scaleY;
            } else {
//                 The vixor has been dropped on the canvas, so it becomes parentless
                theVixor.parentObject = null;

                var hexColor = rgb(145, 145, 145);
                var darkColor = darkenrgb(145, 145, 145);

                theVixor.samplingMarks.forEach(function (mark) {
                    mark.fill = hexColor;
                    mark.stroke = darkColor;
                    mark.colorForStroke = darkColor;
                });

                canvas.renderAll();

            }

        } else {
            // The parent has not changed
            if (LOG) console.log("%cSAME parent", "background: blue; color:white;");
            if (newParentObject) {
                computeUntransformedProperties(theVixor);
            } else {
                // The vixor has been dropped on the canvas, and it was there before this
                // Nothing to do here                
            }
        }

        theVixor.sampleColors();

    },
    areTheSameColors: function (colors1, colors2) {
        
        console.log("areTheSameColors FUNCTION");        
        
        if (!colors1 || !colors2 || colors1.length !== colors2.length) {
            return false;
        }

        for (var i = 0; i < colors1.length; i++) {
            if (colors1[i] != colors2[i]) {
                
                if (LOG) console.log("colors1[i]:");
                if (LOG) console.log(colors1[i]);
                
                if (LOG) console.log("colors2[i]:");
                if (LOG) console.log(colors2[i]);
                
                return false;
            }
        }
        
        return true;
    },
    setColorValues: function (colorValues) {
        
        var theVixor = this;
        
        if (theVixor.areTheSameColors(colorValues, theVixor.colorValues)) {
            console.log("%c areTheSameColors returned true", "background: white; color: red;");
            return;
        }

        if (LOG) console.log("%csetting color values of sample vixor (areTheSameColors returned false) ", "background: white; color: blue;");

        
        theVixor.set('colorValues', colorValues);

        var colorValuesVisualProperty = theVixor.getVisualPropertyByAttributeName('colorValues');

        var fabricColors = new Array();

        colorValues.forEach(function (color) {
            fabricColors.push(createColorValue(new fabric.Color(color)));
        });
        
        

        if (LOG) console.log("fabricColors:");
        if (LOG) console.log(fabricColors);

        colorValuesVisualProperty.value = fabricColors; // setting the value of the colorValues visual properties


        // updating the value of all the out going connectors
        colorValuesVisualProperty.outConnectors.forEach(function (outConnector) {
            if (LOG) console.log("setting value of out going connector");
            outConnector.setValue(fabricColors, false, true);
        });

    },
    sampleColors: function (firstTime) {

        var theVixor = this;
        var colorValues = new Array();

        if (LOG) console.log("%cAttempting to sample colors in the image associated to this SAMPLER vixor", "background:#184f52; color:white;");

        if (theVixor.parentObject) {

            var imageObject = theVixor.parentObject;

            var imageForTextRecognition = imageObject.id;


            var request = new XMLHttpRequest(); // create a new request object to send to server    
            request.open("POST", "SampleColorsFromImageObject", true); // set the method and destination
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            request.onreadystatechange = function () {

                if (request.readyState === 4) { // has the data arrived?
                    if (request.status === 200) { // is everything OK?

                        var textResponse = request.responseText; // getting the result



                        if (textResponse.trim().length > 0) {
                            var response = JSON.parse(textResponse);

                            if (response) {

                                if (LOG) console.log("response:");
                                if (LOG) console.log(response);

                                var m = 0;


                                response.forEach(function (array) {

                                    /*if (LOG) console.log("array");
                                     if (LOG) console.log(array);*/

//                                    var b = parseFloat(array[0][1]).toFixed(0);
//                                    var g = parseFloat(array[0][1]).toFixed(0);
//                                    var r = parseFloat(array[0][0]).toFixed(0);

                                    var r = array[0];
                                    var g = array[1];
                                    var b = array[2];


                                    /*if (LOG) console.log("r");
                                     if (LOG) console.log(r);
                                     if (LOG) console.log("g");
                                     if (LOG) console.log(g);
                                     if (LOG) console.log("b");
                                     if (LOG) console.log(b);*/

                                    var fillColor = rgb(r, g, b);
                                    var strokeColor = darkenrgb(r, g, b);

                                    theVixor.samplingMarks[m].fill = fillColor;
                                    theVixor.samplingMarks[m].stroke = strokeColor;
                                    theVixor.samplingMarks[m].colorForStroke = strokeColor;
                                    m++;

                                    colorValues.push(fillColor);

                                });





                            } else {

                                theVixor.samplingMarks.forEach(function (samplingMark) {
                                    colorValues.push(samplingMark.fill);
                                });



                            }

                            theVixor.setColorValues(colorValues);
                            canvas.renderAll();


                        }
                    }
                }
            };

//            if (LOG) console.log("theVixor.samplingPoints:");
//            if (LOG) console.log(theVixor.samplingPoints);

            var actualSamplingPoints = new Array();

            if (LOG) console.log("theVixor.parentObject.left:");
            if (LOG) console.log(theVixor.parentObject.left);

//            var parentTopLeft = theVixor.parentObject.getPointByOrigin('left', 'top');
//            drawRectAt(parentTopLeft, 'red');

            theVixor.samplingMarks.forEach(function (samplingMark) {

                var theCopy = fabric.util.object.clone(samplingMark);

//                if (LOG) console.log(theCopy);

                theCopy.parentObject = theVixor.parentObject;
                computeUntransformedProperties(theCopy); // This computes the position of the mark relative to the image, which is the parent object of the vixor

                if (firstTime) {
                    if (LOG) console.log("First time the color sampling is done by this vixor!!!");
                } else {
                    // For some reason, this increment IS necessary
//                    theCopy.untransformedX += theCopy.radius + 0.5;
//                    theCopy.untransformedY += theCopy.radius + 0.5;
                }

                actualSamplingPoints.push({x: theCopy.untransformedX, y: theCopy.untransformedY});



            });

            if (LOG) console.log(actualSamplingPoints);

            request.send("samplingPoints=" + JSON.stringify(actualSamplingPoints) + "&imageForTextRecognition=" + imageForTextRecognition);  // sending the data to the server

        } else {

            theVixor.samplingMarks.forEach(function (samplingMark) {
                colorValues.push(samplingMark.fill);
            });

        }

    },
    computeUpdatedValueOf: function (updater, value, updatedProperty) {
        var theVixor = this;
        if (updater == 'samplingDistance') {
            if (updatedProperty == 'totalSamplingPoints') {
                return theVixor.length / value;
            }
        } else if (updater == 'totalSamplingPoints') {
            if (updatedProperty == 'samplingDistance') {
                return theVixor.length / value;
            }
        }
    },
    setProperty: function (property, propertyValue, sourceVisualProperty, shouldAnimate) {

        if (LOG) console.log("Llamando a set property");

        var theVixor = this;

        var value = propertyValue.number;

        if (LOG) console.log("%c" + "value:", "background: red; color: white;");
        if (LOG) console.log(value);

        if (property === 'samplingDistance' || property === 'totalSamplingPoints') {

            var firstMark = theVixor.samplingMarks[0];
            var firstMarkPosition = firstMark.getCenterPoint();
            var finalScaleX = firstMark.scaleX;
            var finalScaleY = firstMark.scaleY;

            theVixor.removeSamplingMarks();

            if (property === 'samplingDistance') {

                theVixor.samplingDistance = value;

            } else if (property === 'totalSamplingPoints') {
                
                

                theVixor.totalSamplingPoints = Number(value.toFixed(0)); // of this is not cast to Number, the result is a concatenation (if value is 10, the concatenation would return 101)
                
                console.log("%c" + "theVixor.totalSamplingPoints: ", "background: green; color: black;");
                console.log(theVixor.totalSamplingPoints);
                
                theVixor.samplingDistance = Number((theVixor.length / (theVixor.totalSamplingPoints - 1)).toFixed(2)) ;
                
                console.log("%c" + "theVixor.samplingDistance: ", "background: green; color: black;");
                console.log(theVixor.samplingDistance);

            }

            var absolutePolyline = new Array();
            theVixor.translatedPoints.forEach(function (point) {
                var scaledPoint = new fabric.Point(firstMarkPosition.x + theVixor.scaleX * point.x, firstMarkPosition.y + theVixor.scaleY * point.y);
                var rotatedPoint = fabric.util.rotatePoint(scaledPoint, firstMarkPosition, fabric.util.degreesToRadians(theVixor.angle));
                absolutePolyline.push(rotatedPoint);
            });

            if (LOG) console.log("absolutePolyline:");
            if (LOG) console.log(absolutePolyline);

            var tolerance = 1;
            var highQuality = true;
            var simplifiedPolyline = simplify(absolutePolyline, tolerance, highQuality);
            theVixor.samplingPoints = samplePolyline(simplifiedPolyline, theVixor.samplingDistance);

            theVixor.totalSamplingPoints = theVixor.samplingPoints.length;

            theVixor.addSamplingPoints(finalScaleX, finalScaleY);

            var changedVisualProperty = theVixor.getVisualPropertyByAttributeName(property);
            var propertiesToUpdate = changedVisualProperty.updatesTo;
            propertiesToUpdate.forEach(function (attributeName) {
                var affectedVisualProperty = theVixor.getVisualPropertyByAttributeName(attributeName);
                affectedVisualProperty.inConnectors.forEach(function (inConnector) {
                    inConnector.contract();
                });
                affectedVisualProperty.outConnectors.forEach(function (outConnector) {
                    outConnector.setValue(theVixor.get(attributeName), false, shouldAnimate);
                });
            });

            theVixor.sampleColors(false);

        }

        else if (property === 'samplingDistanceX') {

            var firstMark = theVixor.samplingMarks[0];
//            var firstMarkPosition = new fabric.Point(firstMark.left, firstMark.top);
            var firstMarkPosition = firstMark.getCenterPoint();
            var finalScaleX = firstMark.scaleX;
            var finalScaleY = firstMark.scaleY;

            theVixor.removeSamplingMarks();

            if (property === 'samplingDistanceX') {
                // TODO: IMPORTANT: What to do with the sampling distance and the scaling factors? At the moment, the scaling is taken into account to define the sampling points
                var scalingFactor = theVixor.parentObject ? theVixor.parentObject.scaleX : 1;
                theVixor.samplingDistanceX = value * scalingFactor;
            } else if (property === 'totalSamplingPoints') {
                theVixor.totalSamplingPoints = value.toFixed(0) + 1;
                theVixor.samplingDistance = theVixor.length / theVixor.totalSamplingPoints;
            }

            var absolutePolyline = new Array();
            theVixor.translatedPoints.forEach(function (point) {
                var scaledPoint = new fabric.Point(firstMarkPosition.x + theVixor.scaleX * point.x, firstMarkPosition.y + theVixor.scaleY * point.y);
                var rotatedPoint = fabric.util.rotatePoint(scaledPoint, firstMarkPosition, fabric.util.degreesToRadians(theVixor.angle));
                absolutePolyline.push(rotatedPoint);
            });

            if (LOG) console.log("absolutePolyline:");
            if (LOG) console.log(absolutePolyline);

            var leftDistance = 0;

            if (theVixor.parentObject) {

                var topLeft = theVixor.parentObject.getPointByOrigin('left', 'top');
                /*drawRectAt(topLeft, 'yellow');*/

                var firstAbsoluteMarkPosition = new fabric.Point(absolutePolyline[0].x, absolutePolyline[0].y);
                /*drawRectAt(firstAbsoluteMarkPosition, 'green');
                 if (LOG) console.log("firstAbsoluteMarkPosition:");
                 if (LOG) console.log(firstAbsoluteMarkPosition);*/

                var rotatedFirstPosition = fabric.util.rotatePoint(firstAbsoluteMarkPosition, topLeft, -fabric.util.degreesToRadians(theVixor.parentObject.angle));

                /*drawRectAt(rotatedFirstPosition, 'red');
                 if (LOG) console.log("rotatedFirstPosition:");
                 if (LOG) console.log(rotatedFirstPosition);*/

                // distance between the left edge of the image and its first sampling mark
                leftDistance = rotatedFirstPosition.x - topLeft.x;
                /*if (LOG) console.log("leftDistance");
                 if (LOG) console.log(leftDistance);*/

            }

            var objectOfInterest = theVixor.parentObject ? theVixor.parentObject : theVixor;

            var topLine = {p1: objectOfInterest.getPointByOrigin('left', 'top'), p2: objectOfInterest.getPointByOrigin('right', 'top')};
            var bottomLine = {p1: objectOfInterest.getPointByOrigin('left', 'bottom'), p2: objectOfInterest.getPointByOrigin('right', 'bottom')};

            var traversalLength = computeLength(topLine);
            var totalPotentialSamplingPoints = (traversalLength - leftDistance) / theVixor.samplingDistanceX;
            var totalAbsolutePoints = absolutePolyline.length;

            var begin = 0;

            theVixor.samplingPoints = new Array();
            // The first point of the path should always be included in the sampling points position
            theVixor.samplingPoints.push({x: firstMarkPosition.x, y: firstMarkPosition.y});




            for (var i = 1; i < totalPotentialSamplingPoints; i++) {

                var currentDistance = leftDistance + i * theVixor.samplingDistanceX;

                var p1 = getPointAlongLine(topLine, currentDistance);
                var p2 = getPointAlongLine(bottomLine, currentDistance);
                var samplingLine = {x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y};

                /*canvas.add(new fabric.Line([samplingLine.x1, samplingLine.y1, samplingLine.x2, samplingLine.y2], {
                 stroke: 'red',
                 selectable: false
                 }));
                 if (LOG) console.log("samplingLine:");
                 if (LOG) console.log(samplingLine);*/

                for (var j = begin; j < totalAbsolutePoints - 1; j++) {

                    var p3 = absolutePolyline[j];
                    var p4 = absolutePolyline[j + 1];
                    var currentLine = {x1: p3.x, y1: p3.y, x2: p4.x, y2: p4.y};

                    /*if (LOG) console.log("currentLine:");
                     if (LOG) console.log(currentLine);*/

                    var intersection = getIntersection(currentLine, samplingLine);

                    if (intersection) {
                        theVixor.samplingPoints.push({x: intersection.x, y: intersection.y});
                        begin = j;
                        break;
                    }

                }

                if (j >= totalAbsolutePoints) {
                    break;
                }

            }


//            if (LOG) console.log("%cThe compute sampling points when sampling over the X axis are:", "background: red; color: yellow;");
//            if (LOG) console.log(theVixor.samplingPoints);


            /*var tolerance = 1;
             var highQuality = true;
             var simplifiedPolyline = simplify(absolutePolyline, tolerance, highQuality);
             theVixor.samplingPoints = samplePolyline(simplifiedPolyline, theVixor.samplingDistance);*/

            theVixor.totalSamplingPoints = theVixor.samplingPoints.length;

            theVixor.addSamplingPoints(finalScaleX, finalScaleY);

            var changedVisualProperty = theVixor.getVisualPropertyByAttributeName(property);
            var propertiesToUpdate = changedVisualProperty.updatesTo;
            propertiesToUpdate.forEach(function (attributeName) {
                var affectedVisualProperty = theVixor.getVisualPropertyByAttributeName(attributeName);
                affectedVisualProperty.inConnectors.forEach(function (inConnector) {
                    inConnector.contract();
                });
                affectedVisualProperty.outConnectors.forEach(function (outConnector) {
                    outConnector.setValue(theVixor.get(attributeName), false, shouldAnimate);
                });
            });

            theVixor.sampleColors(false);

        }

        canvas.renderAll();
        theVixor.setCoords();

    },
    updateValuesOfPositionProperties: function () {

        var theVixor = this;

        var untransformedXValues = new Array();
        var untransformedYValues = new Array();

        var firstMarkCopy = theVixor.samplingMarks[0];
        if (theVixor.parentObject) {
            // We need to compute the untransformed properties of the sampling marks RESPECT TO THE IMAGE; i.e. the parent object of the vixor to which they belong        
            firstMarkCopy = fabric.util.object.clone(theVixor.samplingMarks[0]);
            firstMarkCopy.parentObject = theVixor.parentObject;
            computeUntransformedProperties(firstMarkCopy);
        }

        theVixor.samplingMarks.forEach(function (mark) {

            var theCopy = mark;
            if (theVixor.parentObject) {
                theCopy = fabric.util.object.clone(mark);
                theCopy.parentObject = theVixor.parentObject;
                computeUntransformedProperties(theCopy); // This computes the position of the mark relative to the image, which is the parent object of the vixor
            }

            untransformedXValues.push(theCopy.untransformedX - firstMarkCopy.untransformedX);
            untransformedYValues.push(firstMarkCopy.untransformedY - theCopy.untransformedY);
        });

        theVixor.set('x', untransformedXValues);
        theVixor.set('y', untransformedYValues);

        /*if (LOG) console.log("X values");
         if (LOG) console.log(untransformedXValues);
         if (LOG) console.log("Y values");
         if (LOG) console.log(untransformedYValues);*/

    },
    removeSamplingMarks: function () {
        var theVixor = this;
        theVixor.samplingMarks.forEach(function (mark) {
            mark.remove();
        });
    },
    addSamplingPoints: function (finalScaleX, finalScaleY) {

        var theVixor = this;
        var samplingMarks = new Array();

        finalScaleX = finalScaleX ? finalScaleX : 1;
        finalScaleY = finalScaleY ? finalScaleY : 1;

        var i = 0;
        var totalPoints = theVixor.samplingPoints.length;
        for (var i = 0; i < totalPoints; i++) {

            var point = theVixor.samplingPoints[i];

            var hexColor = rgb(145, 145, 145);
            var darkColor = darkenrgb(145, 145, 145);

            var markOptions = {
                originX: 'center',
                originY: 'center',
                left: point.x,
                top: point.y,
                fill: hexColor,
                stroke: darkColor,
                strokeWidth: 2,
                radius: 8 * finalScaleX,
                markAsSelected: false,
                doNotRefreshCanvas: i !== 0, // Only the first mark added will refresh the canvas when being born
                parentObject: theVixor,
                untransformedX: 0,
                untransformedY: 0,
                untransformedScaleX: 1 / finalScaleX,
                untransformedScaleY: 1 / finalScaleY,
                untransformedAngle: 0,
                evented: false,
                selectable: false,
            };

//            var circularMark = addMarkToCanvas(CIRCULAR_MARK, markOptions);
            var circularMark = new fabric.Circle(markOptions);
            circularMark.setPositionByOrigin(new fabric.Point(point.x + 1, point.y + 1), 'center', 'center');

            canvas.add(circularMark);

//            if (LOG) console.log(circularMark);

            theVixor.widgets.push(circularMark);
            samplingMarks.push(circularMark);

            computeUntransformedProperties(circularMark);

            circularMark.untransformedX += circularMark.strokeWidth / 2;
            circularMark.untransformedY += circularMark.strokeWidth / 2;



//            var parentTopLeft = theVixor.parentObject.getPointByOrigin('left', 'top');
//            drawRectAt(parentTopLeft, 'red');
//            var topLeft = circularMark.getPointByOrigin('center', 'center');
//            drawRectAt(topLeft, 'blue');
//            var diffX = topLeft.x - parentTopLeft.x;
//            if (LOG) console.log("diffX:");
//            if (LOG) console.log(diffX);
//            if (LOG) console.log("circularMark.untransformedX:");
//            if (LOG) console.log(circularMark.untransformedX);

//            circularMark.untransformedX -= circularMark.radius;
//            circularMark.untransformedY -= circularMark.radius;



        }

        theVixor.set('samplingMarks', samplingMarks);

        theVixor.updateValuesOfPositionProperties();

//        if (LOG) console.log("theVixor.samplingPoints:");
//        if (LOG) console.log(theVixor.samplingPoints);



    },
});

SamplerVixor.fromObject = function (object, callback) {
    callback(new SamplerVixor(object));
};

SamplerVixor.async = true;

Vixor.call(SamplerVixor.prototype);



function addSamplerVixorToCanvas(objects, options) {

    var samplerVixor = new SamplerVixor(objects, options);
    canvas.add(samplerVixor);
    samplerVixor.associateEvents();
    samplerVixor.associateInteractionEvents();
    samplerVixor.addSamplingPoints();

    var colorValues = new Array();
    samplerVixor.samplingMarks.forEach(function (samplingMark) {
        colorValues.push(samplingMark.fill);
    });
    samplerVixor.setColorValues(colorValues);

    return samplerVixor;


}