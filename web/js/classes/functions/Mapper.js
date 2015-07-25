var Mapper = fabric.util.createClass(fabric.Rect, {
    isMapper: true,
    toXML: function () {

        var theMapper = this;
        var mapperNode = createXMLElement("mapper");

        addAttributeWithValue(mapperNode, "xmlID", theMapper.xmlID);

        var mapperLocation = theMapper.getPointByOrigin('center', 'top');
        mapperLocation.y += theMapper.compressedHeight / 2 + theMapper.strokeWidth / 2;
        appendElementWithValue(mapperNode, "left", mapperLocation.x);
        appendElementWithValue(mapperNode, "top", mapperLocation.y);
        appendElementWithValue(mapperNode, "inputPosition", theMapper.inputPosition);
        appendElementWithValue(mapperNode, "isExpanded", !theMapper.isCompressed);

        var inCollection = theMapper.inCollection;
        if (inCollection) {
            var inCollectionNode = inCollection.toXML();
            addAttributeWithValue(inCollectionNode, "which", "inCollection");
            mapperNode.append(inCollectionNode);
        }

        var outCollection = theMapper.outCollection;
        if (outCollection) {
            var outCollectionNode = outCollection.toXML();
            addAttributeWithValue(outCollectionNode, "which", "outCollection");
            mapperNode.append(outCollectionNode);
        }

        var inputPoint = theMapper.inputPoint;        
        if (inputPoint) {
            var value = inputPoint.value;            
            if (value) {
                var inputValueNode = null;
                if ($.isArray(value)) {
                    inputValueNode = createArrayNode(value);
                } else {
                    inputValueNode = value.toXML();
                }
                addAttributeWithValue(inputValueNode, "which", "input");
                addAttributeWithValue(inputValueNode, "xmlID", inputPoint.xmlID);
                mapperNode.append(inputValueNode);
            }
        }
        
        var outputPoint = theMapper.outputPoint;        
        if (outputPoint) {
            var value = outputPoint.value;            
            if (value) {
                var outputValueNode = null;
                if ($.isArray(value)) {
                    outputValueNode = createArrayNode(value);
                } else {
                    outputValueNode = value.toXML();
                }
                addAttributeWithValue(outputValueNode, "which", "output");
                addAttributeWithValue(outputValueNode, "xmlID", outputPoint.xmlID);
                mapperNode.append(outputValueNode);
            }
        }

        return mapperNode;
    },
    initialize: function (options) {
        options || (options = {});

        this.compressedHeight = 100;
        this.valueScale = 0.75;

        this.callSuper('initialize', options);

        this.set('lockScalingX', true);
        this.set('lockScalingY', true);
        this.set('lockRotation', true);

        this.set('hasRotatingPoint', false);
        this.set('hasBorders', false);
        this.set('hasControls', false);
        this.set('transparentCorners', false);
        this.set('perPixelTargetFind', true);
        this.set('width', options.width || 260);
        this.set('height', options.height || 100);
        this.set('fill', options.fill || rgb(204, 204, 204));
        this.set('stroke', options.stroke || rgb(45, 45, 45));
        this.set('strokeWidth', 3);

        this.set('inputPosition', -1);

        this.set('isCompressed', true);
        this.set('rx', 5);
        this.set('ry', this.rx);

        this.set('originX', 'center');
        this.set('originY', 'center');

        this.set('topElements', new Array());
        this.addArrow();
        this.addInOutPoints();
        this.addCollections();
        this.associateEvents();
        this.positionElements(false);

    },
    bringTopElementsToFront: function () {
        var theMapper = this;
        theMapper.bringToFront(true);
        theMapper.setCoords();
        theMapper.topElements.forEach(function (element) {
            element.bringToFront(true);
            bringConnectorsToFront(element);
            element.setCoords();
        });

        // This following two lines are executed so that, after bringing everything to the front, the collections' in and out connectors are also brought to the front
        theMapper.inCollection.positionConnectors();
        theMapper.outCollection.positionConnectors();
    },
    applySelectedStyle: function () {
        this.selected = true;
    },
    applyUnselectedStyle: function () {
        this.selected = false;
    },
    updateInputPointMovementPermit: function () {
        var theMapper = this;
        theMapper.inputPoint.lockMovementY = theMapper.inCollection.isEmpty();
    },
    updateInputOutputDataTypePropositions: function () {

        var theMapper = this;

        if (!theMapper.inCollection.isEmpty()) {
            theMapper.inputPoint.dataTypeProposition = theMapper.inCollection.dataTypeProposition;
            theMapper.inputPoint[theMapper.inputPoint.dataTypeProposition] = true;
        }

        if (!theMapper.outCollection.isEmpty()) {
            theMapper.outputPoint.dataTypeProposition = theMapper.outCollection.dataTypeProposition;
            theMapper.outputPoint[theMapper.outputPoint.dataTypeProposition] = true;
        }

    },
    updateInputOutputVisibilityStatus: function () {

        var theMapper = this;

        if (!theMapper.inCollection.isEmpty() && theMapper.inCollection.iconName) {
            theMapper.inputPoint.fill = icons[theMapper.inCollection.iconName].fill;
            theMapper.inputPoint.stroke = icons[theMapper.inCollection.iconName].stroke;
            if (!theMapper.inputPoint.opacity) {
                theMapper.inputPoint.opacity = 1;
                theMapper.inputPoint.permanentOpacity = 1;
                theMapper.inputPoint.movingOpacity = 1;
                blink(theMapper.inputPoint, false, 0.3);
                theMapper.inputPoint.selectable = true;
                theMapper.inputPoint.evented = true;
            }
        } else {
            theMapper.inputPoint.opacity = 0;
            theMapper.inputPoint.permanentOpacity = 0;
            theMapper.inputPoint.movingOpacity = 0;
            theMapper.inputPoint.selectable = false;
            theMapper.inputPoint.evented = false;
        }

        if (!theMapper.outCollection.isEmpty() && theMapper.outCollection.iconName) {
            theMapper.outputPoint.fill = icons[theMapper.outCollection.iconName].fill;
            theMapper.outputPoint.stroke = icons[theMapper.outCollection.iconName].stroke;

            if (!theMapper.outputPoint.opacity) {
                theMapper.outputPoint.opacity = 1;
                theMapper.outputPoint.permanentOpacity = 1;
                theMapper.outputPoint.movingOpacity = 1;
                blink(theMapper.outputPoint, false, 0.3);
                theMapper.outputPoint.selectable = true;
                theMapper.outputPoint.evented = true;
            }
        } else {
            theMapper.outputPoint.opacity = 0;
            theMapper.outputPoint.permanentOpacity = 0;
            theMapper.outputPoint.movingOpacity = 0;
            theMapper.outputPoint.selectable = false;
            theMapper.outputPoint.evented = false;
        }

    },
    addArrow: function () {
        var arrowPath = 'm 60.725416,36.977166 25.012177,0 0,-7.29522 14.590437,12.692281 -14.590437,12.692156 0,-7.295219 -25.012177,0 z';
        var arrow = new fabric.Path(arrowPath, {
            originX: 'center',
            originY: 'center',
            strokeWidth: 1.5,
            stroke: 'black',
            fill: 'black',
            selectable: false,
            evented: false,
            opacity: 1,
            permanentOpacity: 1,
            movingOpacity: 1,
        });
        canvas.add(arrow);
        this.arrow = arrow;
        this.topElements.push(arrow);
    },
    addCollections: function () {

        var theMapper = this;

        var inCollection = new VerticalCollection({
            isMapperInCollection: true,
            originX: 'center',
            originY: 'center',
            stroke: theMapper.inputPoint.stroke,
            fill: theMapper.inputPoint.fill,
            perPixelTargetFind: true,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            opacity: 1,
            permanentOpacity: 1,
            movingOpacity: 1,
            hasRotatingPoint: false,
            hasBorders: false,
            hasControls: false,
            mapper: theMapper,
            nonSerializable: true
        });

        theMapper.inCollection = inCollection;
        theMapper.topElements.push(inCollection);
        canvas.add(inCollection);

        var outCollection = new VerticalCollection({
            isMapperOutCollection: true,
            originX: 'center',
            originY: 'center',
            strokeWidth: 3,
            stroke: theMapper.outputPoint.stroke,
            fill: theMapper.outputPoint.fill,
            perPixelTargetFind: true,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            opacity: 1,
            permanentOpacity: 1,
            movingOpacity: 1,
            hasRotatingPoint: false,
            hasBorders: false,
            hasControls: false,
            mapper: theMapper,
            nonSerializable: true
        });

        theMapper.outCollection = outCollection;
        theMapper.topElements.push(outCollection);
        canvas.add(outCollection);
    },
    addInOutPoints: function () {

        var inputPointPath = paths['input'].rw;
        var inputPoint = new MapperInput(inputPointPath, {
            evented: false,
            selectable: false,
            angle: 0,
            opacity: 0, // The input point is not visible at the bigining. It will appear when the incollection has values.
            mapper: this,
        });
        canvas.add(inputPoint);
        this.inputPoint = inputPoint;
        this.topElements.push(inputPoint);

        var outputPointPath = paths['output'].r;
        var outputPoint = new MapperOutput(outputPointPath, {
            evented: false,
            selectable: false,
            angle: 0,
            opacity: 0, // The output point is not visible at the bigining. It will appear when the outCollection has values
            mapper: this,
        });
        canvas.add(outputPoint);
        this.set('outputPoint', outputPoint);
        this.topElements.push(outputPoint);

    },
    positionElements: function (positionCollectionsElements) {

        var theMapper = this;
        var centerPoint = theMapper.getCenterPoint();
        var topLeft = theMapper.getPointByOrigin('left', 'top');
        var gap = 15; // vertical space between the top border of the mapper and the top border of its collections       

        if (theMapper.arrow) {
            theMapper.arrow.left = centerPoint.x;
            theMapper.arrow.top = topLeft.y + theMapper.compressedHeight / 2 + 5;
            theMapper.arrow.setCoords();
        }

        if (theMapper.inCollection) {
            theMapper.inCollection.setPositionByOrigin(new fabric.Point(centerPoint.x - 60, topLeft.y + gap), 'center', 'top');
            theMapper.inCollection.setCoords();
        }

        if (theMapper.outCollection) {
            theMapper.outCollection.setPositionByOrigin(new fabric.Point(centerPoint.x + 60, topLeft.y + gap), 'center', 'top');
            theMapper.outCollection.setCoords();
        }

        var outPointX = centerPoint.x - 130;
        var outPointY = topLeft.y + theMapper.compressedHeight / 2;
        if (theMapper.inputPoint) {
            theMapper.inputPoint.left = outPointX;
            if (theMapper.inputPoint.isCompressed || !theMapper.inputPoint.relativeY) {
                theMapper.inputPoint.top = outPointY + 5;
            } else {
                theMapper.inputPoint.top = theMapper.inputPoint.relativeY + theMapper.getPointByOrigin('center', 'top').y;
            }
            theMapper.inputPoint.setCoords();
        }

        var inPointX = centerPoint.x + 130;
        var inPointY = topLeft.y + theMapper.compressedHeight / 2;
        if (theMapper.outputPoint) {
            theMapper.outputPoint.left = inPointX;
            if (theMapper.outputPoint.isCompressed || !theMapper.outputPoint.relativeY) {
                theMapper.outputPoint.top = inPointY + 5;
            } else {
                theMapper.outputPoint.top = theMapper.outputPoint.relativeY + theMapper.getPointByOrigin('center', 'top').y;
            }
            theMapper.outputPoint.setCoords();
        }

        if (positionCollectionsElements) {
            theMapper.inCollection.positionElements(theMapper.valueScale);
            theMapper.outCollection.positionElements(theMapper.valueScale);
        }

    },
    compress: function (refreshCanvas) {

        var theMapper = this;

        if (theMapper.isCompressed || (theMapper.inCollection.isEmpty() && theMapper.outCollection.isEmpty())) {
            return;
        }

        theMapper.compressInputOutputPoints(refreshCanvas);

        setTimeout(function () {

            //console.log("Starting MAPPER compression...");
            theMapper.evented = false; // Events disabled while the compression is performed

            var duration = 700;
            var easing = fabric.util.ease['easeOutCubic'];

            var newHeight = theMapper.compressedHeight;
            var newTop = theMapper.top - theMapper.height / 2 + newHeight / 2;

            theMapper.opacity = 1;

            theMapper.bringTopElementsToFront();

            theMapper.animate('top', newTop, {
                easing: easing,
                duration: duration,
            });
            theMapper.animate('height', newHeight, {
                duration: duration,
                easing: easing,
            });

            // In order to avoid double canvas redrawing, for efficiency reasons, the collections are compressed without refreshing the canvas
            theMapper.inCollection.compress(false);
            theMapper.outCollection.compress(false);

            // Refreshing the canvas only once
            fabric.util.animate({
                duration: duration,
                easing: easing,
                onChange: function () {
                    theMapper.positionElements(false);
                    if (refreshCanvas) {
                        canvas.renderAll();
                    }
                },
                onComplete: function () {
                    theMapper.isCompressed = true;
                    theMapper.inputPoint.lockMovementY = true;
                    theMapper.evented = true; // Events are allowed again once the compression is over
                    if (refreshCanvas) {
                        canvas.renderAll();
                    }
                }
            });

        }, 500);



    },
    compressInputOutputPoints: function (refreshCanvas) {
        var theMapper = this;
        var duration = 500;
        var easing = fabric.util.ease['easeOutCubic'];

        var theInCollection = theMapper.getInCollection();
        var theOutCollection = theMapper.getOutCollection();
        var theInputPoint = theMapper.getInputPoint();
        var theOutputPoint = theMapper.getOutputPoint();

        var topLeft = theMapper.getPointByOrigin('left', 'top');
        var yCoordinate = topLeft.y + theMapper.compressedHeight / 2 + 5;
        theInputPoint.animate('top', yCoordinate, {
            easing: easing,
            duration: duration,
        });
        theOutputPoint.animate('top', yCoordinate, {
            easing: easing,
            duration: duration,
        });

        fabric.util.animate({
            duration: duration,
            onChange: function () {
                theInputPoint.updateConnectorsPositions();
                theOutputPoint.updateConnectorsPositions();

                theInCollection.matchingY = theInputPoint.top - theInCollection.getPointByOrigin('center', 'top').y;
                theOutCollection.matchingY = theOutputPoint.top - theOutCollection.getPointByOrigin('center', 'top').y;

                if (refreshCanvas) {
                    canvas.renderAll();
                }
            },
            onComplete: function () {
                theInputPoint.lockMovementY = true;
                theInputPoint.isCompressed = true;
                theOutputPoint.isCompressed = true;
                theInCollection.matchingY = null;
                theOutCollection.matchingY = null;
            }
        });
    },
    expandInputOutputPoints: function (refreshCanvas) {
        var theMapper = this;
        var duration = 400;
        var easing = fabric.util.ease['easeOutCubic'];

        var inCollection = theMapper.getInCollection();
        var outCollection = theMapper.getOutCollection();
        var theMapperInput = theMapper.inputPoint;
        var theMapperOutput = theMapper.outputPoint;

        if (theMapperInput.relativeY) {
            var newTop = theMapperInput.relativeY + theMapper.getPointByOrigin('center', 'top').y;
            theMapperInput.animate('top', newTop, {
                easing: easing,
                duration: duration,
            });
        }

        if (theMapperOutput.relativeY) {
            var newTop = theMapperOutput.relativeY + theMapper.getPointByOrigin('center', 'top').y;
            theMapperOutput.animate('top', newTop, {
                easing: easing,
                duration: duration,
            });
        }

        fabric.util.animate({
            duration: duration,
            onChange: function () {
                theMapper.inputPoint.updateConnectorsPositions();
                theMapper.outputPoint.updateConnectorsPositions();

                if (inCollection && theMapperInput.relativeY) {
                    inCollection.matchingY = theMapperInput.top - inCollection.getPointByOrigin('center', 'top').y;
                }

                if (outCollection && theMapperOutput.relativeY) {
                    outCollection.matchingY = theMapperOutput.top - outCollection.getPointByOrigin('center', 'top').y;
                }

                if (refreshCanvas) {
                    canvas.renderAll();
                }
            },
            onComplete: function () {

                if (inCollection && theMapperInput.relativeY) {
                    inCollection.matchingY = theMapperInput.top - inCollection.getPointByOrigin('center', 'top').y;
                }

                if (outCollection && theMapperOutput.relativeY) {
                    outCollection.matchingY = theMapperOutput.top - outCollection.getPointByOrigin('center', 'top').y;
                }

                theMapper.updateInputPointMovementPermit();
                theMapper.inputPoint.isCompressed = false;
                theMapper.outputPoint.isCompressed = false;
            }
        });
    },
    growHeight: function (targetHeight, refreshCanvas) {

        var theMapper = this;
        var duration = 700;
        var easing = fabric.util.ease['easeOutCubic'];

        var newTop = theMapper.top + targetHeight / 2 - theMapper.height / 2;
        theMapper.animate('top', newTop, {
            easing: easing,
            duration: duration,
        });
        theMapper.animate('height', targetHeight, {
            duration: duration,
            easing: easing,
            onChange: function () {
                if (refreshCanvas) {
                    canvas.renderAll();
                }
            },
            onComplete: function () {
                if (refreshCanvas) {
                    canvas.renderAll();
                }
            },
        });

    },
    expand: function (refreshCanvas) {

        var theMapper = this;
        theMapper.setCoords();

        var totalInValues = theMapper.inCollection.getTotalValues();
        var totalOutValues = theMapper.outCollection.getTotalValues();

        if (!this.isCompressed || (!totalInValues && !totalOutValues)) {
            return;
        }

        var intendedNumberOfElements = Math.max(totalInValues, totalOutValues);

//        console.log("Starting MAPPER expansion...");

        theMapper.evented = false; // Disabling events while the expansion is performed

        var duration = 700;
        var easing = fabric.util.ease['easeOutCubic'];

        var firstValue = !theMapper.inCollection.isEmpty() ? theMapper.inCollection.getVisualValueAt(0) : theMapper.outCollection.getVisualValueAt(0);
        var valueUnscaledHeight = firstValue.height;

        theMapper.opacity = 1;

        theMapper.bringTopElementsToFront();

        /*var newHeight = theMapper.compressedHeight + intendedNumberOfElements * ((valueUnscaledHeight + 10) * theMapper.valueScale);
         var newTop = theMapper.top + newHeight / 2 - theMapper.height / 2;
         theMapper.animate('top', newTop, {
         easing: easing,
         duration: duration,
         });
         theMapper.animate('height', newHeight, {
         duration: duration,
         easing: easing,
         });*/

        /*console.log("intendedNumberOfElements:");
         console.log(intendedNumberOfElements);*/

        theMapper.inCollection.expand(false, theMapper.valueScale, intendedNumberOfElements, valueUnscaledHeight);
        theMapper.outCollection.expand(false, theMapper.valueScale, intendedNumberOfElements, valueUnscaledHeight);

        // Refreshing canvas (if indicated) and positioning components of this mapper (in and out values are not positioned, as they are being animated by the code written above)
        fabric.util.animate({
            duration: duration,
            easing: easing,
            onChange: function () {
                if (refreshCanvas) {
                    canvas.renderAll();
                }
            },
            onComplete: function () {
                theMapper.isCompressed = false;
                theMapper.evented = true; // The events on this mapper are allowed once again after the expansion is complete
                theMapper.inputPoint.lockMovementY = false;
                theMapper.positionElements(true);
                if (refreshCanvas) {
                    canvas.renderAll();
                }
                theMapper.expandInputOutputPoints(true);
            }
        });
    },
    getInCollection: function () {
        return this.inCollection;
    },
    getOutCollection: function () {
        return this.outCollection;
    },
    getInputPoint: function () {
        return this.inputPoint;
    },
    getOutputPoint: function () {
        return this.outputPoint;
    },
    getOtherCollection: function (aCollection) {
        if (aCollection === this.inCollection) {
            return this.outCollection;
        } else {
            return this.inCollection;
        }
    },
    associateEvents: function () {
        var theMapper = this;
        theMapper.on({
            'moving': function (options) {
                theMapper.positionElements(true);
                theMapper.inputPoint.updateConnectorsPositions();
                theMapper.outputPoint.updateConnectorsPositions();
                /*console.log("theMapper.inCollection.evented:");
                 console.log(theMapper.inCollection.evented);
                 console.log("theMapper.inCollection.selectable:");
                 console.log(theMapper.inCollection.selectable);*/
            },
            'doubleTap': function (options) {
                options.event.preventDefault();
                if (theMapper.isCompressed) {
                    theMapper.expand(true);
                } else {
                    theMapper.compress(true);
                }
            },
            'collectionElementMoved': function (options) {

                var theCollection = options.collection;
                var movedElement = options.movedElement;
                var shouldAnimate = false;

                var theOtherCollection = null;
                if (theCollection.isMapperInCollection) {
                    theOtherCollection = theCollection.mapper.outCollection;
                } else {
                    theOtherCollection = theCollection.mapper.inCollection;
                }

                theCollection.matchingY = movedElement.relativeY + (movedElement.scaleY * movedElement.height / 2);

                if (theOtherCollection) {

                    theOtherCollection.matchingY = movedElement.relativeY + (movedElement.scaleY * movedElement.height / 2);

                }


                if (theMapper.inputPoint.value && $.isArray(theMapper.inputPoint.value)) {
                    theMapper.evaluate(theMapper.inputPoint.value, shouldAnimate);
                } else {
                    var outputValue = theMapper.computeOutput();
                    theMapper.outputPoint.setValue(outputValue, false);
                }

            },
            'collectionElementManipulationStopped': function (options) {

                var shouldAnimate = false;

                var theCollection = options.collection;
                var movedElement = options.movedElement;

                var theOtherCollection = null;
                if (theCollection.isMapperInCollection) {
                    theOtherCollection = theCollection.mapper.outCollection;
                } else {
                    theOtherCollection = theCollection.mapper.inCollection;
                }

                if (theMapper.inputPoint.value && $.isArray(theMapper.inputPoint.value)) {
                    theMapper.evaluate(theMapper.inputPoint.value, shouldAnimate);
                } else {
                    var outputValue = theMapper.computeOutput();
                    theMapper.outputPoint.setValue(outputValue, false);
                }




            },
            'collectionValueChanged': function (options) {

                var shouldAnimate = false;

                var theMapper = this;

                var theCollection = options.collection;
                var changedVisualValue = options.visualValue;

                if (theMapper.inputPoint.value && $.isArray(theMapper.inputPoint.value)) {
                    theMapper.evaluate(theMapper.inputPoint.value, shouldAnimate);
                } else {
                    var outputValue = theMapper.computeOutput();
                    theMapper.outputPoint.setValue(outputValue, false);
                }


            },
            'collectionChanged': function (options) {

                var shouldAnimate = false;

                var theMapper = this;

                var theCollection = options.collection;

                if (theMapper.inputPoint.value && $.isArray(theMapper.inputPoint.value)) {
                    theMapper.evaluate(theMapper.inputPoint.value, shouldAnimate);
                } else {
                    var outputValue = theMapper.computeOutput();
                    theMapper.outputPoint.setValue(outputValue, false);
                }



            },
        });
    },
    moveInputPointTo: function (yCoordinate, shouldAnimate) {

        var theMapper = this;
        var duration = 500;
        var easing = fabric.util.ease['easeOutCubic'];

        var theInCollection = theMapper.getInCollection();
        var theOutCollection = theMapper.getOutCollection();
        var theInputPoint = theMapper.getInputPoint();
        var theOutputPoint = theMapper.getOutputPoint();

        var lastVisualValue = theInCollection.getVisualValueAt(theMapper.getInCollection().getTotalValues() - 1);

        if (yCoordinate > lastVisualValue.getCenterPoint().y) {
            yCoordinate = lastVisualValue.getCenterPoint().y;
        }

        theMapper.inputPosition = yCoordinate;

        if (shouldAnimate) {

            theInputPoint.animate('top', yCoordinate, {
                easing: easing,
                duration: duration,
            });
            theOutputPoint.animate('top', yCoordinate, {
                easing: easing,
                duration: duration,
            });
            fabric.util.animate({
                duration: duration,
                onChange: function () {
                    theInputPoint.relativeY = yCoordinate - theMapper.getPointByOrigin('center', 'top').y;
                    theOutputPoint.relativeY = yCoordinate - theMapper.getPointByOrigin('center', 'top').y;

                    theInCollection.matchingY = theInputPoint.top - theInCollection.getPointByOrigin('center', 'top').y;
                    theOutCollection.matchingY = theInCollection.matchingY;

                    var outputValue = theMapper.computeOutput();
                    theMapper.outputPoint.setValue(outputValue, false);

                    theMapper.inputPoint.updateConnectorsPositions();
                    theMapper.outputPoint.updateConnectorsPositions();
                    canvas.renderAll();
                },
            });

        } else {

            theInputPoint.top = yCoordinate;
            theOutputPoint.top = yCoordinate;

            theInputPoint.setCoords();
            theOutputPoint.setCoords();

            theInputPoint.relativeY = yCoordinate - theMapper.getPointByOrigin('center', 'top').y;
            theInCollection.matchingY = theInputPoint.top - theInCollection.getPointByOrigin('center', 'top').y;
            theOutCollection.matchingY = theInCollection.matchingY;

            var outputValue = theMapper.computeOutput();
            theMapper.outputPoint.setValue(outputValue, false);

            theOutputPoint.relativeY = yCoordinate - theMapper.getPointByOrigin('center', 'top').y;

            theMapper.inputPoint.updateConnectorsPositions();
            theMapper.outputPoint.updateConnectorsPositions();
            canvas.renderAll();


        }


    },
    evaluateSingleNumber: function (value) {

        var theMapper = this;

        /*console.log("********************************************************************************************************************");
         console.log("********************************************************************************************************************");
         console.log("%cEvaluating A NUMBER this single value:", "background: " + theMapper.fill);
         console.log(value);*/

        var inCollection = theMapper.getInCollection();
        var valuesArray = inCollection.getValues();


        var closestResults = getClosestElement(value, valuesArray);

        var closestValue = closestResults.closestValue;


        var closestElementPosition = closestResults.position;

        var minimumValue = theMapper.getInCollection().getValueAt(closestElementPosition);

        /*console.log("%c closestValue: " + closestValue.number, "background: " + theMapper.fill);
         console.log("%c closestElementPosition: " + closestElementPosition, "background: " + theMapper.fill);
         console.log("%c minimumValue: ", "background: " + theMapper.fill);
         console.log(minimumValue);*/


        var beforeValue = null;
        var afterValue = null;
        var secondLowestValue = null;
        var secondLowestPosition = null;

        var firstVisualValue = null;
        var secondVisualValue = null;

        // checking for bounday cases
        if (closestElementPosition === 0) { // is the closest value the FIRST element of the collection? The, there is nothing before

            console.log("%c ++++ CASE 1", "background: yellow; color: black;");

            secondLowestValue = theMapper.getInCollection().getValueAt(closestElementPosition + 1);
            secondLowestPosition = closestElementPosition + 1;
            firstVisualValue = theMapper.getInCollection().getVisualValueAt(closestElementPosition);
            secondVisualValue = theMapper.getInCollection().getVisualValueAt(secondLowestPosition);

        } else if (closestElementPosition === inCollection.getTotalValues() - 1) { // is the closest value the LAST element of the collection? Then, there is nothing after

            console.log("%c ++++ CASE 2", "background: yellow; color: black;");

            secondLowestValue = theMapper.getInCollection().getValueAt(closestElementPosition - 1);
            secondLowestPosition = closestElementPosition - 1;
            firstVisualValue = theMapper.getInCollection().getVisualValueAt(closestElementPosition);
            secondVisualValue = theMapper.getInCollection().getVisualValueAt(secondLowestPosition);

        } else {

            console.log("%c ++++ CASE 3", "background: yellow; color: black;");

            // The closest element is somewhere in the middle of the collection
            beforeValue = theMapper.getInCollection().getValueAt(closestElementPosition - 1); // the before element
            afterValue = theMapper.getInCollection().getValueAt(closestElementPosition + 1); // the after element

            secondLowestValue = null;
            secondLowestPosition = null;
            if (beforeValue.number < afterValue.number) {
                secondLowestValue = beforeValue;
                secondLowestPosition = closestElementPosition - 1;

            } else {
                secondLowestValue = afterValue;
                secondLowestPosition = closestElementPosition + 1;

            }

            firstVisualValue = theMapper.getInCollection().getVisualValueAt(closestElementPosition);
            secondVisualValue = theMapper.getInCollection().getVisualValueAt(secondLowestPosition);

        }

        console.log("%c beforeValue: ", "beforeValue: " + theMapper.fill);
        console.log(beforeValue);

        console.log("%c afterValue: ", "afterValue: " + theMapper.fill);
        console.log(afterValue);

        console.log("%c secondLowestPosition: " + secondLowestPosition, "background: " + theMapper.fill);

        console.log("%c secondLowestValue: ", "background: " + theMapper.fill);
        console.log(secondLowestValue);


        var newYCoordinate = changeRange(value.number, firstVisualValue.value.number, secondVisualValue.value.number, firstVisualValue.getCenterPoint().y, secondVisualValue.getCenterPoint().y);

        console.log("newYCoordinate:" + newYCoordinate);


//        drawRectAt(new fabric.Point(firstVisualValue.getCenterPoint().x, newYCoordinate), 'blue');


        /*var x = 0;
         var newYCoordinate = firstVisualValue.getCenterPoint().y;
         
         if (d !== 0) {
         
         x = (Math.pow(d, 2) - Math.pow(r, 2), +Math.pow(R, 2)) / (2 * d); // only when this distance exists, x is computed ( http://mathworld.wolfram.com/Circle-CircleIntersection.html )
         
         if (x > d) {
         x = d / 2;
         }
         
         var oldMinY = 0;
         var oldMaxY = d;
         var newMinY = firstVisualValue.getCenterPoint().y;
         var newMaxY = secondVisualValue.getCenterPoint().y;
         newYCoordinate = changeRange(x, oldMinY, oldMaxY, newMinY, newMaxY);
         }*/



        /*drawRectAt(firstVisualValue.getCenterPoint(), 'green');
         drawRectAt(secondVisualValue.getCenterPoint(), 'red');*/



        return newYCoordinate;

    },
    evaluateSingleValue: function (value) {
        if (value.isNumericData) {
            return this.evaluateSingleNumber(value);
        } else if (value.isColorData) {
            return this.evaluateSingleColor(value);
        }
    },
    evaluateSingleColor: function (value) {

        var theMapper = this;

        /*console.log("********************************************************************************************************************");
         console.log("********************************************************************************************************************");
         console.log("%cEvaluating this single value:", "background: " + theMapper.fill);
         console.log(value);*/

        var inCollection = theMapper.getInCollection();
        var valuesArray = inCollection.getValues();
        var distances = value.getDistancesTo(valuesArray);

//            console.log("%c valuesArray: ", "background: " + theMapper.fill);
//            var k = 0;
//            valuesArray.forEach(function (colorValue) {
//                console.log(k + ": " + colorValue.color.toRgb() + " distance: " + distances[k]);
//                k++;
//            });

        /*console.log("%c distances: " + distances, "background: " + theMapper.fill);
         console.log(distances);*/

        var minimunDistance = Math.min.apply(Math, distances);
        var closestElementPosition = distances.indexOf(minimunDistance);
        var minimumValue = theMapper.getInCollection().getValueAt(closestElementPosition);

        /*console.log("%c minimunDistance: " + minimunDistance, "background: " + theMapper.fill);
         console.log("%c closestElementPosition: " + closestElementPosition, "background: " + theMapper.fill);
         console.log("%c minimumValue: ", "background: " + theMapper.fill);
         console.log(minimumValue);*/


        var beforeValue = null;
        var beforeDistance = null;
        var afterValue = null;
        var afterDistance = null;
        var secondLowestDistance = null;
        var secondLowestValue = null;
        var secondLowestPosition = null;

        var firstVisualValue = null;
        var secondVisualValue = null;

        // checking for bounday cases
        if (closestElementPosition === 0) { // is the closest value the FIRST element of the collection? The, there is nothing before

//            console.log("%c ++++ CASE 1", "background: yellow; color: black;");

            afterValue = theMapper.getInCollection().getValueAt(closestElementPosition + 1);
            afterDistance = value.getDistanceTo(afterValue);

            secondLowestDistance = afterDistance;
            secondLowestValue = afterValue;
            secondLowestPosition = closestElementPosition + 1;

            firstVisualValue = theMapper.getInCollection().getVisualValueAt(closestElementPosition);
            secondVisualValue = theMapper.getInCollection().getVisualValueAt(secondLowestPosition);

        } else if (closestElementPosition === inCollection.getTotalValues() - 1) { // is the closest value the LAST element of the collection? Then, there is nothing after

//            console.log("%c ++++ CASE 2", "background: yellow; color: black;");

            beforeValue = theMapper.getInCollection().getValueAt(closestElementPosition - 1);
            beforeDistance = value.getDistanceTo(beforeValue);

            secondLowestDistance = beforeDistance;
            secondLowestValue = beforeValue;
            secondLowestPosition = closestElementPosition - 1;

            firstVisualValue = theMapper.getInCollection().getVisualValueAt(closestElementPosition);
            secondVisualValue = theMapper.getInCollection().getVisualValueAt(secondLowestPosition);

        } else {

//            console.log("%c ++++ CASE 3", "background: yellow; color: black;");

            // The closest element is somewhere in the middle of the collection
            beforeValue = theMapper.getInCollection().getValueAt(closestElementPosition - 1); // the before element
            afterValue = theMapper.getInCollection().getValueAt(closestElementPosition + 1); // the after element

            beforeDistance = value.getDistanceTo(beforeValue);
            afterDistance = value.getDistanceTo(afterValue);

            secondLowestDistance = null;
            secondLowestValue = null;
            secondLowestPosition = null;
            if (beforeDistance < afterDistance) {
                secondLowestDistance = beforeDistance;
                secondLowestValue = beforeValue;
                secondLowestPosition = closestElementPosition - 1;

            } else {
                secondLowestDistance = afterDistance;
                secondLowestValue = afterValue;
                secondLowestPosition = closestElementPosition + 1;

            }

            firstVisualValue = theMapper.getInCollection().getVisualValueAt(closestElementPosition);
            secondVisualValue = theMapper.getInCollection().getVisualValueAt(secondLowestPosition);

        }

        /*console.log("%c beforeValue: ", "beforeValue: " + theMapper.fill);
         console.log(beforeValue);
         
         console.log("%c afterValue: ", "afterValue: " + theMapper.fill);
         console.log(afterValue);
         
         console.log("%c beforeDistance: " + beforeDistance, "background: " + theMapper.fill);
         console.log("%c afterDistance: " + afterDistance, "background: " + theMapper.fill);
         
         console.log("%c secondLowestPosition: " + secondLowestPosition, "background: " + theMapper.fill);
         console.log("%c secondLowestDistance: " + secondLowestDistance, "background: " + theMapper.fill);
         
         console.log("%c secondLowestValue: ", "background: " + theMapper.fill);
         console.log(secondLowestValue);*/





        var R = secondLowestDistance;
        var r = minimunDistance;
        var d = minimumValue.getDistanceTo(secondLowestValue); // this is the perceptual color distance between the closest element to the given element and the second closest element that is adyacent to first closest color


//        var newDistance = d * (r / (R + r));


        var newDistance = getProportionalDistance(firstVisualValue.value.color, secondVisualValue.value.color, value.color);

//        console.log("newDistance:" + newDistance);

        // changeRange(oldValue, oldMin, oldMax, newMin, newMax)

//        var yy = null;
//        if (firstVisualValue.getCenterPoint().y < secondVisualValue.getCenterPoint().y) {
//            yy = changeRange(newDistance, d, 0, firstVisualValue.getCenterPoint().y, secondVisualValue.getCenterPoint().y);
//        } else {
//            yy = changeRange(newDistance, 0, d, firstVisualValue.getCenterPoint().y, secondVisualValue.getCenterPoint().y);
//        }


        var newYCoordinate = changeRange(newDistance, 0, d, firstVisualValue.getCenterPoint().y, secondVisualValue.getCenterPoint().y);

//        console.log("newYCoordinate:" + newYCoordinate);


//        drawRectAt(new fabric.Point(firstVisualValue.getCenterPoint().x, newYCoordinate), 'blue');


        /*var x = 0;
         var newYCoordinate = firstVisualValue.getCenterPoint().y;
         
         if (d !== 0) {
         
         x = (Math.pow(d, 2) - Math.pow(r, 2), +Math.pow(R, 2)) / (2 * d); // only when this distance exists, x is computed ( http://mathworld.wolfram.com/Circle-CircleIntersection.html )
         
         if (x > d) {
         x = d / 2;
         }
         
         var oldMinY = 0;
         var oldMaxY = d;
         var newMinY = firstVisualValue.getCenterPoint().y;
         var newMaxY = secondVisualValue.getCenterPoint().y;
         newYCoordinate = changeRange(x, oldMinY, oldMaxY, newMinY, newMaxY);
         }*/



        /*drawRectAt(firstVisualValue.getCenterPoint(), 'green');
         drawRectAt(secondVisualValue.getCenterPoint(), 'red');*/



        return newYCoordinate;

    },
    evaluate: function (value, shouldAnimate) {




        var theMapper = this;

        /*console.log("%cThe mapper is trying to evaluate the following value:", "background: " + theMapper.fill);
         console.log("%cThe evaluation will happen with this value for shouldAnimate:" + shouldAnimate, "background: " + theMapper.fill);
         console.log(value);*/

        if ($.isArray(value)) {

            // Each of the elements of the received array has to be evaluated. The output of this process should be an array of values

            var outputValues = new Array();

            value.forEach(function (currentValue) {

                var currentEvaluationResult = theMapper.evaluateSingleValue(currentValue);

                /*console.log("evaluationResult:");
                 console.log(evaluationResult);*/

                var output = theMapper.computeOutput(currentEvaluationResult);
                outputValues.push(output);
            });

            theMapper.outputPoint.setValue(outputValues, shouldAnimate);

            /*console.log("RESULTS OF THE EVALUATION PROCESS:", "background: red; color: white;");
             console.log(outputValues);*/

        } else {

            // A single value is received. The value resulting from this evaluation process will be another single value
            var evaluationResult = theMapper.evaluateSingleValue(value);

            var outputValue = theMapper.computeOutput(evaluationResult);

            theMapper.outputPoint.setValue(outputValue, shouldAnimate);

            if (!theMapper.isCompressed) {
                theMapper.moveInputPointTo(evaluationResult, shouldAnimate);
            }

        }

    },
    computeOutput: function (inputYCoordinate) {

        /*console.log("Starting to compute the output of the mapper...");*/

        var theMapper = this;

        if (!inputYCoordinate) {
            inputYCoordinate = theMapper.inputPoint.top;
        }

        // Finding the corresponding value on the outCollection

        /*console.log("inputYCoordinate:");
         console.log(inputYCoordinate);*/

        if (theMapper.outCollection && !theMapper.outCollection.isEmpty()) {

            var containingRange = theMapper.outCollection.getVisualRangeContainingYCoordinate(inputYCoordinate);

            if (containingRange) {

                var fromVisualValue = containingRange.from;
                var toVisualValue = containingRange.to;

                var fromValue = fromVisualValue.value;
                var toValue = toVisualValue.value;

                if (fromValue.isNumericData && toValue.isNumericData) {

                    var oldMinY = fromVisualValue.getCenterPoint().y;
                    var oldMaxY = toVisualValue.getCenterPoint().y;
                    var newMinY = fromVisualValue.value.number;
                    var newMaxY = toVisualValue.value.number;
                    var outputValue = changeRange(inputYCoordinate, oldMinY, oldMaxY, newMinY, newMaxY);

                    return createNumericValue(outputValue);

                } else {

                    // An interpolated value will be generated for each 5 vertical pixels


                    var samplingDistance = 5; // TODO: Seems like, when interpolating numbers, it is better to have a samplingDistance of 2. A conditional statement would work better here.


                    var steps = Math.round((toVisualValue.top - fromVisualValue.top) / samplingDistance);
//                console.log("%c steps: " + steps, "background: " + theMapper.fill);

                    var interpolatedValues = fromValue.interpolateTo(toValue, steps);



                    /*console.log("interpolatedValues:");
                     console.log(interpolatedValues);*/

                    if (interpolatedValues) {

                        var outputPos = Math.round((inputYCoordinate - fromVisualValue.top) / samplingDistance);

                        /*console.log("outputPos:");
                         console.log(outputPos);*/

                        if (outputPos < 0) {
                            outputPos = 0;
                        } else if (outputPos >= interpolatedValues.length) {
                            outputPos = interpolatedValues.length - 1;
                        }


                        var outputValue = interpolatedValues[outputPos];


//        console.log("Generated colors: ");
//        interpolation.forEach(function (colorValue) {
//            // console.log( colorValue.color.toHex());
//            console.log("%c                 ", "background: #" + colorValue.color.toHex() + "; color: black;");
//        });

//                console.log("Color to output");

                        /*if (outputValue && outputValue.isColorData) {
                         console.log("%c                 ", "background: #" + outputValue.color.toHex() + "; color: black;");
                         }*/



//        drawRectAt(fromVisualValue.getCenterPoint(), 'green');
//        drawRectAt(toVisualValue.getCenterPoint(), 'red');



                        return outputValue;


                    }

                }







            } else {

                console.log("The evaluated value is NOT within the given range. A default value is returned.");

                return createDefaultValueByTypeProposition(theMapper.outCollection.dataTypeProposition);

            }




        }

    }
});

function addMapper(x, y) {
    var aMapper = new Mapper({
        left: x,
        top: y
    });
    canvas.add(aMapper);
    setTimeout(aMapper.bringTopElementsToFront(), 50);

    blink(aMapper.arrow, false, 0.3);
    blink(aMapper.inCollection, false, 0.3);
    blink(aMapper.outCollection, false, 0.3);
    blink(aMapper, true, 0.2);

}