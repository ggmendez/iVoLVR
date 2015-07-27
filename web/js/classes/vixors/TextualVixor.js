var TextualVixor = fabric.util.createClass(fabric.Rect, {
    type: 'textExtractorVixor',
    isTextualVixor: true,
    
    getExtractorType: function () {
        return TEXT_RECOGNIZER;
    },
    
    initialize: function (options) {
        options || (options = {});
        this.callSuper('initialize', options);
        this.set('strokeWidth', options.strokeWidth || 2);
        this.set('originalStrokeWidth', options.strokeWidth || 2);
        this.set('perPixelTargetFind', false);

        if (options.area) {
            var side = Math.sqrt(options.area);
            this.set('width', Math.abs(side));
            this.set('height', Math.abs(side));
            this.set('area', options.area);
        } else {
            this.set('width', options.width || 0);
            this.set('height', options.height || 0);
            this.set('area', Math.abs(this.width) * Math.abs(this.height));
        }

        this.set('shape', 'Rectangle');

        this.set('text', '');
        this.set('number', '');
        this.set('time', '');
        this.set('date', '');

        this.set('visualPropertyFill', options.visualPropertyFill || rgb(153, 153, 153));
        this.set('visualPropertyStroke', options.visualPropertyStroke || rgb(86, 86, 86));
        this.set('colorForStroke', options.visualPropertyStroke || rgb(86, 86, 86));

        this.setControlsVisibility({
            bl: false, // middle top disable
            br: false, // midle bottom
            tl: false, // middle left
            tr: false, // I think you get it
        });

        this.createRectBackground();

        this.set('widgets', new Array());
        this.set('visualProperties', new Array());

        this.set('specificProperties', new Array());


        this.specificProperties.push({attribute: "text", readable: true, writable: false, types: ['number'], updatesTo: ['area'], dataTypeProposition: 'isStringData'});
        this.specificProperties.push({attribute: "number", readable: true, writable: false, types: ['number'], updatesTo: ['area'], dataTypeProposition: 'isNumericData'});
        this.specificProperties.push({attribute: "dateAndTime", readable: true, writable: false, types: ['number'], updatesTo: ['area'], dataTypeProposition: 'isDateAndTimeData'});



//        this.specificProperties.push({attribute: "time", readable: true, writable: false, types: ['number'], updatesTo: [], dataTypeProposition: 'isNumericData'});
//        this.specificProperties.push({attribute: "date", readable: true, writable: false, types: ['number'], updatesTo: [], dataTypeProposition: 'isNumericData'});

        this.createVisualProperties();

        this.applyUnselectedStyle = function () {
            this.stroke = this.colorForStroke;
            this.strokeWidth = this.originalStrokeWidth;
            this.strokeDashArray = widget_selected_stroke_dash_array;
        };

        this.widgetApplySelectedStyle = function () {
            this.stroke = widget_selected_stroke_color;
//            this.strokeWidth = widget_selected_stroke_width;
            this.strokeDashArray = widget_selected_stroke_dash_array;
        }

        this.associateInteractionEvents = function () {
            var theVixor = this;
            theVixor.on({
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
        
        this.initializeVisualPropertiesValues();

    },
    initializeVisualPropertiesValues: function () {

        var theVixor = this;

        var textVisualProperty = theVixor.getVisualPropertyByAttributeName('text');
        textVisualProperty.value = createStringValue('');

        var numberVisualProperty = theVixor.getVisualPropertyByAttributeName('number');
        numberVisualProperty.value = createNumericValue(0);

        var dateAndTimeVisualProperty = theVixor.getVisualPropertyByAttributeName('dateAndTime');

        var xxxx = createDateAndTimeValue(moment());
        if (LOG) console.log("xxxx:");
        if (LOG) console.log(xxxx);

        dateAndTimeVisualProperty.value = createDateAndTimeValue(moment());
    },
    onManipulating: function (options) {
        var theVixor = this;

        theVixor.hasControls = false;

        theVixor.setCoords();

        var hasParent = theVixor.parentObject;
        var scaleX = hasParent ? theVixor.parentObject.getScaleX() : 1;
        var scaleY = hasParent ? theVixor.parentObject.getScaleY() : 1;

        // to garantee that the scale is always 1 (so that, the stroke with is not affected)
        var newWidth = theVixor.width * (theVixor.getScaleX() / scaleX);
        var newHeight = theVixor.height * (theVixor.getScaleY() / scaleY);

        theVixor.width = newWidth;
        theVixor.height = newHeight;
        theVixor.scaleX = scaleX;
        theVixor.scaleY = scaleY;

//        
//        theVixor.untransformedScaleX = theVixor.getScaleX() / scaleX;
//        theVixor.untransformedScaleY = theVixor.getScaleY() / scaleY;
//        
////        
////        
//        theVixor.set('originalStrokeWidth', 2 / ((theVixor.scaleX + theVixor.scaleY) / 2));
//        theVixor.set('strokeWidth', 2 / ((theVixor.scaleX + theVixor.scaleY) / 2));
//        
//        if (LOG) console.log("theVixor.strokeWidth:");
//        if (LOG) console.log(theVixor.strokeWidth);

        if (hasParent) {
            computeUntransformedProperties(theVixor);
        }
    },
    onMoving: function (options) {
        if (LOG) console.log("MOVING text recognizer");
        this.onManipulating(options);
    },
    onScaling: function (options) {
        if (LOG) console.log("SCALING text recognizer");
        this.onManipulating(options);
    },
    onRotating: function (options) {
        if (LOG) console.log("ROTATING text recognizer");
        this.onManipulating(options);
    },
    onMouseUp: function (options) {

        if (LOG) console.log("Mouse UP over a text recogniser vixor...");

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
                // The vixor has been dropped on the canvas, so it becomes parentless
//                theVixor.parentObject = null;
            }

        } else {
            // The parent has not changed
            if (LOG) console.log("%cSAME parent", "background: blue; color:white;");
            if (newParentObject) {
                // The vixor has been moved within the limits of its parent object
                // Nothing to do here, apart from computing the nntransformed properties of the object within its parent
                computeUntransformedProperties(theVixor);
                theVixor.untransformedScaleX = 1;
                theVixor.untransformedScaleY = 1;
            } else {
                // The vixor has been dropped on the canvas, and it was there before this
                // Nothing to do here                
            }
        }

        theVixor.performTextRecognition();

        if (!theVixor.hasControls) {
            theVixor.hasControls = true;
            canvas.renderAll();
        }



    },
    performTextRecognition: function () {

        var theVixor = this;

        if (LOG) console.log("%cPerforming Text Recognition", "background:#184f52; color:white;");

        if (theVixor.parentObject) {

            var roi = theVixor.roi;
            var x = roi.x;
            var y = roi.y;
            var width = roi.width;
            var height = roi.height;
            var angle = roi.angle;

            var imageObject = theVixor.parentObject;

            var imageForTextRecognition = imageObject.id;

            var request = new XMLHttpRequest(); // create a new request object to send to server    
            request.open("POST", "ExtractTextFromImageObject", true); // set the method and destination
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            request.onreadystatechange = function () {

                if (request.readyState == 4) { // has the data arrived?
                    if (request.status == 200) { // is everything OK?

                        var textResponse = request.responseText; // getting the result

                        if (textResponse.trim().length > 0) {
                            var response = JSON.parse(textResponse);

                            if (response) {

                                if (LOG) console.log(response);
                                theVixor.recognizedStrings = response;


                                if (response && response.length > 0) {

                                    theVixor.text = getMode(response);
                                    
                                    
                                    
                                    var stringValue = createStringValue(theVixor.text);
                                    var textVisualProperty = theVixor.getVisualPropertyByAttributeName("text");
                                    textVisualProperty.setValue(stringValue);

                                    var cleanedText = theVixor.text.replace(',', '');
                                    cleanedText = cleanedText.replace(' ', '');

//                                    var number = Number(cleanedText);
                                    var number = parseFloat(cleanedText);
//                                    var number = parseInt(cleanedText);
                                    var numberVisualProperty = theVixor.getVisualPropertyByAttributeName("number");
                                    if (isNaN(number)) {
                                        number = 0;
                                        numberVisualProperty.evented = false;
                                        numberVisualProperty.outConnectors.forEach(function (outConnector) {
                                            outConnector.contract();
                                        });
                                    } else {
                                        numberVisualProperty.evented = true;
                                    }
                                    theVixor.number = number;
                                    
                                    numberVisualProperty.setValue(createNumericValue(number));
                                                                        






                                    var totalStrings = theVixor.recognizedStrings.length;

                                    var dateAndTime = null;
                                    var dateAndTimeVisualProperty = theVixor.getVisualPropertyByAttributeName("dateAndTime");

                                    // trying to find time from ANY of the recognized strings
                                    for (var i = 0; i < totalStrings; i++) {
                                        
                                        var string = theVixor.recognizedStrings[i];

                                        if (LOG) console.log("Trying to find DATE or TIME in: " + string);

                                        dateAndTime = moment(string, getDateAndTimeFormats(), true);
                                        if (dateAndTime.isValid()) {
                                            if (LOG) console.log(string + " was a valid time! ;)");
                                            break; // once a valid time has been found, the search should stop
                                        }
                                    }

                                    if (dateAndTime && dateAndTime.isValid()) {
                                        dateAndTime.isTime = true;
                                        dateAndTimeVisualProperty.evented = true;
                                        printDateAndTime(dateAndTime, '#483D8B', 'white');
                                    } /*else {
                                        dateAndTimeVisualProperty.evented = false;
                                        dateAndTimeVisualProperty.outConnectors.forEach(function (outConnector) {
                                            outConnector.contract();
                                        });
                                    }*/

                                    /*theVixor.time = dateAndTime;
                                    dateAndTimeVisualProperty.value = dateAndTime;*/
                                    
                                    var dateAndTimeValue = createDateAndTimeValue(dateAndTime);
                                    dateAndTimeVisualProperty.setValue(dateAndTimeValue);
                                    
                                    


                                    theVixor.visualProperties.forEach(function (visualProperty) {
                                        var value = visualProperty.value;
                                        visualProperty.outConnectors.forEach(function (outConnector) {
                                            outConnector.setValue(value, false, false);
                                        });
                                    });

                                    canvas.renderAll();

                                }

                            }
                        }
                    }
                }
            };

            request.send("x=" + x + "&y=" + y + "&width=" + width + "&height=" + height + "&angle=" + angle + "&imageForTextRecognition=" + imageForTextRecognition);  // sending the data to the server

        } else {

            

            /*theVixor.visualProperties.forEach(function (visualProperty) {
             var value = visualProperty.value;
             visualProperty.outConnectors.forEach(function (outConnector) {
             outConnector.setValue(value, false, false);
             });
             });*/

            canvas.renderAll();


        }
    },
    computeUpdatedValueOf: function (updater, value, updatedProperty) {
        if (updater == 'width' || updater == 'height') {
            if (updatedProperty == 'area') {
                return value * value;
            }
        } else if (updater == 'area') {
            if (updatedProperty == 'width') {
                return Math.sqrt(value);
            } else if (updatedProperty == 'height') {
                return Math.sqrt(value);
            }
        }
    },
    setProperty: function (property, value, theVisualProperty) {

//        if (LOG) console.log("property:");
//        if (LOG) console.log(property);
//
//        if (LOG) console.log("value:");
//        if (LOG) console.log(value);

        var theVixor = this;

        if (property == 'label') {
            theVixor.label = '' + value;
        } else if (property == 'fill') {

            var fillColor = value;
            var strokeColor = theVisualProperty.parentObject.colorForStroke;

            if (isHexColor(value)) {
                var rgbColor = hexToRGB(value);
                var r = rgbColor.r;
                var g = rgbColor.g;
                var b = rgbColor.b;
                strokeColor = darkenrgb(r, g, b);
            }

            theVixor.changeColors(fillColor, strokeColor);

        } else if (property == 'width' || property == 'height' || property == 'area') {


            var changedVisualProperty = theVixor.getVisualPropertyByAttributeName(property);
            var propertiesToUpdate = changedVisualProperty.updatesTo;

            if (property == 'area') {



                if (LOG) console.log("%cModifying " + changedVisualProperty.attribute + ". Value: " + value, "background:green; color:white;");



                theVixor.area = value; // This value has to be updated as fabric does not know its link with the radius attribute

                // Updating all the attributes that are affected by the modifications in the area property

                propertiesToUpdate.forEach(function (attributeName) {
                    var visualProperty = theVixor.getVisualPropertyByAttributeName(attributeName);
                    var updatedValue = theVixor.computeUpdatedValueOf(property, value, attributeName);

                    if (LOG) console.log("%cAfecting " + attributeName + ". Value: " + updatedValue, "background:red; color:white;");


                    var easing = fabric.util.ease['easeOutBack'];
                    if ((attributeName == 'width' || attributeName == 'height') && updatedValue < 15) {
                        easing = fabric.util.ease['easeOutCirc'];
                    }
                    theVixor.animateProperty(attributeName, updatedValue, 500, easing);


                    visualProperty.outConnectors.forEach(function (outConnector) {
                        outConnector.setValue(updatedValue, false, false);
                    });
                });

                property = 'width';
                value = Math.sqrt(value);

            } else if (property == 'width' || property == 'height') {

                if (LOG) console.log("Modifying " + property + ". Value: " + value);

                var easing = fabric.util.ease['easeOutBack'];
                if (value < 15) {
                    easing = fabric.util.ease['easeOutCirc'];
                }
                theVixor.animateProperty(property, value, 500, easing);


                theVixor.area = value * value;

                // Updating all the attributes that are affected by the modifications in the area property
                propertiesToUpdate.forEach(function (attributeName) {
                    var visualProperty = theVixor.getVisualPropertyByAttributeName(attributeName);
                    var updatedValue = theVixor.computeUpdatedValueOf(property, value, attributeName);

                    if (LOG) console.log("%cAfecting " + attributeName + ". Value: " + updatedValue, "background:red; color:white;");

                    var easing = fabric.util.ease['easeOutBack'];
                    if ((attributeName == 'width' || attributeName == 'height') && updatedValue < 15) {
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
                if (LOG) console.log("Original value: " + value);
                value = value % 360;
                if (LOG) console.log("Modified value: " + value);
            }

            var easing = fabric.util.ease['easeOutBack'];
            theVixor.animateProperty(property, value, 500, easing);

        }

        canvas.renderAll();
        theVixor.setCoords();

    },
    _render: function (ctx) {
        ctx.save();


//      this.rotatingPointOffset = this.valueForRotatingPointOffset * canvas.getZoom()/2;
//      this.cornerSize = this.valueForcornerSize * canvas.getZoom()/2;

        this.rotatingPointOffset = this.valueForRotatingPointOffset;
        this.cornerSize = this.valueForcornerSize;

        this.callSuper('_render', ctx);

        ctx.restore();
    }
});
Vixor.call(TextualVixor.prototype);

function addTextualVixorToCanvas(options) {
    var textExtractorVixor = new TextualVixor(options);
    canvas.add(textExtractorVixor);
    if (textExtractorVixor.width > 0 && textExtractorVixor.height > 0) {
        textExtractorVixor.animateBirth(options.markAsSelected);
    }
    textExtractorVixor.associateEvents();
}