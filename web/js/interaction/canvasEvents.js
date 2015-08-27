//function canvasSelectionCleared(option) {
//    if (LOG) console.log("canvasSelectionCleared");
//    var activeObject = option.target;
//    if (activeObject.type == "widget") {
//        widget = activeObject;
//        widget.stroke = 'red';
//        widget.strokeWidth = 10;
//        widget.strokeDashArray = [5, 5];
//    }
//}

//function canvasObjectModified(option) {
//
//    if (LOG) console.log("canvasObjectModified");
//
//    if (option.target._objects) {
//        option.target._objects.forEach(function(object) {
//            if (object.isOutput) {
//                outputModified(option, object, option.target);
//            } else if (object.isWidget) {
//                widgetModified(option, object, option.target);
//            }
//        });
//    }
//
//
//}



function canvasObjectSelected(option) {

//    if (LOG)
    console.log("canvasObjectSelected");

    var event = option.e;
    if (event) {
        event.preventDefault();
    }

    canvasDeselectAllObjects();

    var selectedObject = option.target;


    if (selectedObject.xmlID) {

        console.log("%c" + "Object with ID " + selectedObject.xmlID + " selected", "background: rgb(0,148,158); color: white;");
    }




    if (selectedObject) {

//        if (selectedObject.isWidget) {
//            widgetApplySelectedStyle(selectedObject);
//
//        } else 

        if (selectedObject.applySelectedStyle) {

            selectedObject.applySelectedStyle(true);
        }
    }

}

function canvasBeforeSelectionCleared(option) {

    console.log("canvas BEFORE Selection Cleared");

    console.log("option:");
    console.log(option);

    var group = option.target;
    if (!group) {
        return;
    }

    var type = group.type;

    if (type === 'group') {

        if (group.compress) {
            group.compress();
        }

        var selectedObjects = group._objects;
        if (selectedObjects) {
            var totalSelectedObjects = selectedObjects.length;
            console.log("Total objects in the selection to clear: " + totalSelectedObjects);

            if (totalSelectedObjects > 0) {
                selectedObjects.forEach(function (object) {
                    object.lockMovementX = object.previousLockMovementX;
                    object.lockMovementY = object.previousLockMovementY;
                });

            }
        }
    }

}


function canvasSelectionCleared(option) {
    console.log("canvasSelectionCleared");

    console.log("option:");
    console.log(option);

    var event = option.e;
    if (event) {
        event.preventDefault();
    }
    canvasDeselectAllObjects();
}

groupDrawBorders = function (ctx) {

    if (!this.hasBorders) {
        return this;
    }

    ctx.save();

    ctx.setLineDash([7, 7]);

    ctx.fillStyle = 'rgba(229,238,244,0.3)';

    ctx.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
    ctx.strokeStyle = this.borderColor;
    ctx.lineWidth = 3;

    var wh = this._calculateCurrentDimensions(true),
            width = wh.x,
            height = wh.y;
    if (this.group) {
        width = width * this.group.scaleX;
        height = height * this.group.scaleY;
    }

    ctx.fillRect(
            ~~(-(width / 2)) - 0.5, // offset needed to make lines look sharper
            ~~(-(height / 2)) - 0.5,
            ~~(width) + 1, // double offset needed to make lines look sharper
            ~~(height) + 1
            );

    ctx.strokeRect(
            ~~(-(width / 2)) - 0.5, // offset needed to make lines look sharper
            ~~(-(height / 2)) - 0.5,
            ~~(width) + 1, // double offset needed to make lines look sharper
            ~~(height) + 1
            );

    if (this.hasRotatingPoint && this.isControlVisible('mtr') && !this.get('lockRotation') && this.hasControls) {

        var rotateHeight = -height / 2;

        ctx.beginPath();
        ctx.moveTo(0, rotateHeight);
        ctx.lineTo(0, rotateHeight - this.rotatingPointOffset);
        ctx.closePath();
        ctx.stroke();
    }

    ctx.restore();
    return this;
};

function canvasSelectionCreated(option) {

    console.log("canvasSelectionCreated");
    var event = option.e;
    if (event) {
        event.preventDefault();
    }

    var createdGroup = option.target;

    createdGroup.set('alignmentButtons', new Array());

//    drawRectAt(new fabric.Point(createdGroup.left, createdGroup.top), "red");    

    createdGroup.lockScalingX = true;
    createdGroup.lockScalingY = true;
    createdGroup.lockRotation = true;
    createdGroup.hasControls = false;
    createdGroup.hasBorders = true;

    createdGroup.padding = 10;
    createdGroup.borderColor = '#ffce0a';

    createdGroup.isCompressed = true;


    createdGroup.drawBorders = groupDrawBorders;

    createdGroup.on('moving', function (option) {

        createdGroup.positionAlignmentButtons();

        console.log("Moving selection");
        var selectedObjects = createdGroup._objects;
        selectedObjects.forEach(function (object) {
            if (object.positionElements) {
                object.positionElements();
            }
            updateConnectorsPositions(object);
        });
    });

    function alignObjectsTo(objects, alignmentProperty) {

        console.log("alignmentProperty: " + alignmentProperty);

        var maxCoordinate = null;
        var alignableObjects = new Array();

        var originX = null, originY = null, coordinate = null, otherCoordinate = null;
        if (alignmentProperty === 'top' || alignmentProperty === 'bottom') {
            originX = 'center';
            originY = alignmentProperty;
            coordinate = 'y';
        } else if (alignmentProperty === 'left' || alignmentProperty === 'right') {
            originX = alignmentProperty;
            originY = 'center';
            coordinate = 'x';
        }

        objects.forEach(function (object) {
            if (object.isAlignable) {
                var centerPoint = object.getPointByOrigin(originX, originY);
                var currentCoordinate = centerPoint[coordinate];
                if (maxCoordinate === null) {
                    maxCoordinate = currentCoordinate;
                } else {
                    if (alignmentProperty === 'bottom' || alignmentProperty === 'right') {
                        if (currentCoordinate > maxCoordinate) {
                            maxCoordinate = currentCoordinate;
                        }
                    } else {
                        if (currentCoordinate < maxCoordinate) {
                            maxCoordinate = currentCoordinate;
                        }
                    }
                }
                alignableObjects.push(object);
            }
        });

        var duration = 500;
        var easing = fabric.util.ease['easeOutBounce'];

        alignableObjects.forEach(function (object) {
            object.animatePositionProperty(alignmentProperty, maxCoordinate, duration, easing, false);
        });

        fabric.util.animate({
            duration: duration,
            startValue: 1,
            easing: easing,
            endValue: duration,
            onChange: refresherFunction,
            onComplete: refresherFunction
        });


    }


    createdGroup.addAlignmentButtons = function () {

        var cloneGroup = fabric.util.object.clone(createdGroup);

        this.alignmentButtons = new Object();

        var leftArrow = 'm -1879.8776,2895.2123 -10.8181,0 0,50.1239 10.8181,0 z m 19.3112,10.2276 -17.0832,14.8572 17.0832,14.8569 0,-8.5417 28.76,0 0,-12.6307 -28.76,0 z';
        var leftButton = new fabric.Path(leftArrow, {
            originX: 'center',
            originY: 'center',
            strokeWidth: 2,
            stroke: 'rgb(40,40,40)',
            fill: 'rgb(153, 153, 153)',
            selectable: false,
            evented: true,
            opacity: 1,
            permanentOpacity: 1,
            movingOpacity: 1,
            angle: 0,
            direction: 'left'
        });
        this.alignmentButtons['left'] = leftButton;

        var rightButton = fabric.util.object.clone(leftButton);
        rightButton.angle = 180;
        rightButton.direction = 'right';
        this.alignmentButtons['right'] = rightButton;

        var topButton = fabric.util.object.clone(leftButton);
        topButton.angle = 90;
        topButton.direction = 'top';
        this.alignmentButtons['top'] = topButton;

        var bottomButton = fabric.util.object.clone(leftButton);
        bottomButton.angle = 270;
        bottomButton.direction = 'bottom';
        this.alignmentButtons['bottom'] = bottomButton;

        var groupedObjects = createdGroup._objects;
        var alignmentButtons = this.alignmentButtons;
        for (var name in alignmentButtons) {
            var button = alignmentButtons[name];
            button.on({
                'mousedown': function (options) {
                    var theButton = this;
                    setTimeout(function () {

                        var leftTop = new fabric.Point(createdGroup.left, createdGroup.top);

                        var alignmentProperty = theButton.direction;
                        alignObjectsTo(groupedObjects, alignmentProperty);


                        setTimeout(function () {

//                            createdGroup._objects.forEach(function (object){
//                                createdGroup.removeWithUpdate(object);
//                            });

                            groupedObjects.forEach(function (object) {

                                createdGroup.removeWithUpdate(object);

                                object.setCoords();

                                object.lockMovementX = false;
                                object.lockMovementY = false;

                                createdGroup.addWithUpdate(object);

                                canvas.remove(object);
                            });

                            createdGroup.left = leftTop.x;
                            createdGroup.top = leftTop.y;
//                            
                            createdGroup.lockMovementX = false;
                            createdGroup.lockMovementY = false;
                            
//                            createdGroup.expand();
//                                    
                            createdGroup.setCoords();
                            canvas.setActiveObject(createdGroup);
                            canvas.add(createdGroup);
                            canvas.renderAll();


                        }, 550);


                    }, 100);
                },
            });
        }

    };

    function regroupObjects(objects, leftTop) {

        var group = new fabric.Group();

        objects.forEach(function (object) {
            group.addWithUpdate(object);
            canvas.remove(object);
        });

        var group = new fabric.Group(objects, {
            left: leftTop.x,
            top: leftTop.y,
        });





        return group;



//        group.setPositionByOrigin(groupCenter, 'center', 'center');
//        group.setCoords();
//        
//        objects.forEach(function (object) {
//            group.addWithUpdate(object);
//        });

        canvas.add(group);
        canvas.renderAll();
    }

    createdGroup.positionAlignmentButtons = function () {

        createdGroup.setCoords();

        var leftTop = createdGroup.getPointByOrigin('left', 'top');
        leftTop.x -= createdGroup.padding;
        leftTop.y -= createdGroup.padding;

        var rightBottom = createdGroup.getPointByOrigin('right', 'bottom');
        rightBottom.x += createdGroup.padding;
        rightBottom.y += createdGroup.padding;

//        drawRectAt(rightBottom, "red");

        for (var name in createdGroup.alignmentButtons) {

            var button = createdGroup.alignmentButtons[name];

            var x, y, originX, originY;

            if (name === 'top') {

//                x = leftTop.x - 10;
//                y = leftTop.y;
//                originX = 'left';
//                originY = 'top';

                x = rightBottom.x + 10;
                y = leftTop.y;
                originX = 'left';
                originY = 'bottom';

            } else if (name === 'left') {

//                x = leftTop.x;
//                y = leftTop.y - 10;
//                originX = 'left';
//                originY = 'bottom';

                x = leftTop.x;
                y = rightBottom.y + 10;
                originX = 'left';
                originY = 'top';

            } else if (name === 'bottom') {
                x = rightBottom.x + 10;
                y = rightBottom.y;
                originX = 'left';
                originY = 'top';
            } else if (name === 'right') {
                x = rightBottom.x;
                y = rightBottom.y + 10;
                originX = 'left'; // because this is rotated
                originY = 'bottom';
            }

            var position = new fabric.Point(x, y);
//            drawRectAt(position, "blue");

            button.flipX = false;
            button.flipY = false;
            button.setPositionByOrigin(position, originX, originY);

        }

    };

    function animateScale(group, object, from, to, removeAfterAnimation) {

        object.scaleX = from;
        object.scaleY = from;

        var duration = 300;
        var easing = fabric.util.ease['easeOutBack'];
        object.animate('scaleX', to, {
            duration: duration,
            easing: easing,
        });
        object.animate('scaleY', to, {
            duration: duration,
            onChange: function () {
                group.positionAlignmentButtons();
                canvas.renderAll();
            },
            onComplete: function () {
                if (removeAfterAnimation) {
                    object.remove();
                }
                group.positionAlignmentButtons();
                canvas.renderAll();
            },
            easing: easing,
        });
    }

    createdGroup.expand = function () {
        if (!createdGroup.isCompressed) {
            return;
        }
        createdGroup.positionAlignmentButtons();
        for (var name in createdGroup.alignmentButtons) {
            var button = createdGroup.alignmentButtons[name];
            canvas.add(button);
            animateScale(createdGroup, button, 0, 1, false);
        }
        createdGroup.isCompressed = false;
    };

    createdGroup.compress = function () {
        if (createdGroup.isCompressed) {
            return;
        }
        createdGroup.positionAlignmentButtons();
        for (var name in createdGroup.alignmentButtons) {
            var button = createdGroup.alignmentButtons[name];
            animateScale(createdGroup, button, 1, 0, true);
        }
        createdGroup.isCompressed = true;
        canvas.renderAll();
    };

    createdGroup.addAlignmentButtons();

    createdGroup.on('doubleTap', function (option) {
        if (createdGroup.isCompressed) {
            createdGroup.expand(true);
        } else {
            createdGroup.compress(true);
        }
    });

    var selectedObjects = createdGroup._objects;
    if (selectedObjects) {
        var totalSelectedObjects = selectedObjects.length;

        if (LOG) {
            console.log("Selection created with " + totalSelectedObjects + " objects");
        }

        if (totalSelectedObjects > 0) {
            selectedObjects.forEach(function (object) {
                if (object.addToGroup) {
                    object.addToGroup(createdGroup);
                }
            });
        }

        selectedObjects = createdGroup._objects;
        totalSelectedObjects = selectedObjects.length;
        if (LOG) {
            console.log("FINAL number of objects in the : " + totalSelectedObjects);
        }
        if (totalSelectedObjects > 0) {
            selectedObjects.forEach(function (object) {
                object.previousLockMovementX = object.lockMovementX;
                object.previousLockMovementY = object.lockMovementY;
                object.lockMovementX = false;
                object.lockMovementY = false;
            });
        }

    }
}

function canvasPathCreated(options) {


    if (LOG)
        console.log("options:");
    if (LOG)
        console.log(options);


    if (canvas.isPathMarkDrawingMode) {

        var drawnPath = options.path;
        var points = drawnPath.path;
        var center = drawnPath.getCenterPoint();

        var options = {
            left: center.x,
            top: center.y,
            fill: rgb(0, 153, 255),
            stroke: darkenrgb(0, 153, 255),
            label: '',
            markAsSelected: false,
            thePath: points
        };
        addMarkToCanvas(PATH_MARK, options);

        drawnPath.remove();

        applyInactiveMenuButtonStyle($("#drawPathMark"))
        deactivatePathMarkDrawing(true);


    } else if (canvas.isFilledMarkDrawingMode) {

        var drawnPath = options.path;
        var points = drawnPath.path;
        var center = drawnPath.getCenterPoint();

        var options = {
            left: center.x,
            top: center.y,
            fill: rgb(71, 90, 158),
            stroke: darkenrgb(71, 90, 158),
            label: '',
            markAsSelected: false,
            thePath: points
        };
        addMarkToCanvas(FILLEDPATH_MARK, options);

        drawnPath.remove();

        applyInactiveMenuButtonStyle($("#drawFilledMark"))
        deactivateFilledPathMarkDrawing(true);


    } else if (canvas.isFunctionDrawingMode) {

        var drawnPath = options.path;
        var center = drawnPath.getCenterPoint();

        drawnPath.remove();

        var XYValues = extractXYValues(drawnPath);

        var coordinates = createFunctionCoordinatesFromValues(XYValues.xValues, XYValues.yValues);

        var options = {
            top: center.y,
            left: center.x,
            coordinatesX: coordinates.XCoordinates,
            coordinatesY: coordinates.YCoordinates,
            pathWidth: drawnPath.getWidth(),
            pathHeight: drawnPath.getHeight()
        };

        addNumericFunction(options);

        applyInactiveMenuButtonStyle($("#drawFunction"))
        deactivateFunctionDrawing(true);


    } else if (canvas.isFreeSelectionMode) {

        var drawnPath = options.path;
        var points = drawnPath.path;
        var stringPath = "";
        points.forEach(function (point) {
            point.forEach(function (element) {
                stringPath += element + " ";
            });
        });
        stringPath += "Z";

        if (LOG)
            console.log("stringPath:");
        if (LOG)
            console.log(stringPath);

        drawnPath.remove();

        var centerPoint = drawnPath.getCenterPoint();

        var selection = new FreeSelection(stringPath, {
            left: centerPoint.x,
            top: centerPoint.y,
            animateOnCreation: true
        });
        canvas.add(selection);

        canvas.sendToBack(selection);

        selection.set('originX', 'center');
        selection.set('originY', 'center');

        canvas.renderAll();

//        deActivateFreeSelectionMode();

        applyInactiveMenuButtonStyle($("#freeSelectionButton"))
        deactivateFreeSelection(true);



    } else if (canvas.isSamplingMode) {

        var drawnPath = options.path;

        createSampleVixorFromPath(drawnPath, false);

//        drawnPath.remove();

    } else if (canvas.isScribbleMode) {

        var drawnPath = options.path;

        processScribbleFromPath(drawnPath);

        drawnPath.remove();

    } else if (canvas.isTransmogrificationMode) {

        /*******************************/
        /*** TRANSMOGRIFICATION ***/
        /*******************************/

        var points = options.path.perPixelTargetFind = true;

        var points = options.path.path;

        var n = points.length;

        if (LOG)
            console.log("points:");
        if (LOG)
            console.log(points);

        var curvePoints = new Array();
        var x, y, i;
        for (i = 1; i < n - 2; i++) {
            x = points[i][3];
            y = points[i][4];
            curvePoints.push({x: x, y: y});
        }
        x = points[n - 1][1];
        y = points[n - 1][2];
        curvePoints.push({x: x, y: y});


        var totalPoints = curvePoints.length;

        // The points in the curve should always been indicated from left to rigth
        if (curvePoints[0].x > curvePoints[totalPoints - 1].x) {
            curvePoints = curvePoints.reverse();
        }

        var lineString = "";
        var curveString = "M ";

        for (i = 0; i < totalPoints - 1; i++) {
            x = curvePoints[i].x;
            y = curvePoints[i].y;
            lineString += x + " " + y + ",";
            curveString += " " + x + " " + y + " L";
        }
        x = curvePoints[totalPoints - 1].x;
        y = curvePoints[totalPoints - 1].y;
        lineString += x + " " + y;
        curveString += x + " " + y;



        if (LOG)
            console.log("curvePoints:");
        if (LOG)
            console.log(curvePoints);



        var tolerance = 5;
        var highQuality = true;

        var simplifiedCurvePoints = simplify(curvePoints, tolerance, highQuality);

        if (LOG)
            console.log("simplifiedCurvePoints:");
        if (LOG)
            console.log(simplifiedCurvePoints);

        if (LOG)
            console.log(simplifiedCurvePoints.length + " points in the simplified curve.");

        var polyPath = "M ";


        var simplifiedCurveString = "M ";
        var simplifiedLineString = "";

        var spinePoints = new Array();

        var nSimplifiedPoints = simplifiedCurvePoints.length;

        for (var i = 0; i < nSimplifiedPoints - 1; i++) {
            x = simplifiedCurvePoints[i].x;
            y = simplifiedCurvePoints[i].y;
            simplifiedCurveString += " " + x + " " + y + " L";
            polyPath += " " + x + " " + y + " L";
            simplifiedLineString += x + " " + y + ",";
            spinePoints.push({x: x, y: y});
        }
        x = simplifiedCurvePoints[nSimplifiedPoints - 1].x;
        y = simplifiedCurvePoints[nSimplifiedPoints - 1].y;
        simplifiedCurveString += " " + x + " " + y;
        polyPath += " " + x + " " + y;
        simplifiedLineString += x + " " + y;
        spinePoints.push({x: x, y: y});










//    var curve = new fabric.Path(curveString);
//    curve.set({left: options.path.left, top: options.path.top, originX: 'center', originY: 'center', stroke: 'green', strokeWidth: 3, fill: ''});
//    canvas.add(curve);


        if (LOG)
            console.log("lineString:");
        if (LOG)
            console.log(lineString);

        if (LOG)
            console.log("%csimplifiedLineString:", "color: #000000; background: #F5F5DC");
        if (LOG)
            console.log("%c" + simplifiedLineString, "color: #000000; background: #F5F5DC");

        var reader = new jsts.io.WKTReader();

        var line = reader.read('LINESTRING (' + simplifiedLineString + ')');

        var precisionModel = new jsts.geom.PrecisionModel(jsts.geom.PrecisionModel.FLOATING);

        var quadrantSegments = jsts.operation.buffer.BufferParameters.DEFAULT_QUADRANT_SEGMENTS;
        var endCapStyle = jsts.operation.buffer.BufferParameters.CAP_FLAT;
        var joinStyle = jsts.operation.buffer.BufferParameters.CAP_FLAT;
        var mitreLimit = 0;

        var bufParams = new jsts.operation.buffer.BufferParameters(quadrantSegments, endCapStyle, joinStyle, mitreLimit);
        var offsetCurveBuilder = new jsts.operation.buffer.OffsetCurveBuilder(precisionModel, bufParams);

        var samplingDistance = 25;
        var offsetPoints = offsetCurveBuilder.getLineCurve(line.getCoordinates(), samplingDistance);

        if (LOG)
            console.log("offsetPoints");
        if (LOG)
            console.log(offsetPoints);

        if (LOG)
            console.log(offsetPoints.length + " points in the offset curve.");








        var originalOffsetPolygon = "M ";


        var offsetPolygonString = "";
        for (i = 0; i < offsetPoints.length - 1; i++) {
            x = offsetPoints[i].x;
            y = offsetPoints[i].y;
            offsetPolygonString += x + " " + y + ",";
            originalOffsetPolygon += " " + x + " " + y + " L";
        }
        x = offsetPoints[offsetPoints.length - 1].x;
        y = offsetPoints[offsetPoints.length - 1].y;
        offsetPolygonString += x + " " + y;
        originalOffsetPolygon += " " + x + " " + y;


        var reader = new jsts.io.WKTReader();
        var polygon = reader.read('POLYGON (' + offsetPolygonString + ')');

        if (LOG)
            console.log("polygon:");
        if (LOG)
            console.log(polygon);

        var buffer = line.buffer(20);
        buffer.normalize();
        if (LOG)
            console.log("buffer");
        if (LOG)
            console.log(buffer.getCoordinates());


        var offsetPath = new fabric.Path(originalOffsetPolygon);
        offsetPath.set({left: options.path.left, top: options.path.top, originX: 'center', originY: 'center', stroke: 'red', strokeWidth: 1, fill: '', perPixelTargetFind: true});
        canvas.add(offsetPath);






        /****************************************************************/
        /* REMOVING SELF-INTERSECTIONS FROM THE ORIGINAL OFFSET POLYGON */
        /****************************************************************/


        // The cleaned polygon does NOT contain self-intersections after the following call:
        var cleanedPolygon = jsts.operation.buffer.BufferOp.bufferOp(polygon, 0);

        if (LOG)
            console.log("%c" + cleanedPolygon, "background: #FF0000; color: #FFFFFF");
        if (LOG)
            console.log(cleanedPolygon.getCoordinates());


        // The offsetPoints which we will work from now are going to be the ones that compose the cleaned polygon
        offsetPoints = cleanedPolygon.getCoordinates();


//        offsetPoints = polygon.getCoordinates();


        /*************************/
        /* ENTIRE OFFSET POLYGON */
        /*************************/

        if (!offsetPoints.length)
            return;

        var coordinates = new Array();

        var offsetPathString = "M ";
        for (i = 0; i < offsetPoints.length - 1; i++) {
            x = offsetPoints[i].x;
            y = offsetPoints[i].y;
            offsetPathString += " " + x + " " + y + " L";
            coordinates.push(new jsts.geom.Coordinate(x, y));
        }
        x = offsetPoints[offsetPoints.length - 1].x;
        y = offsetPoints[offsetPoints.length - 1].y;
        offsetPathString += " " + x + " " + y;
        coordinates.push(new jsts.geom.Coordinate(x, y));

        var intersects = findSelfIntersects(coordinates);

        if (LOG)
            console.log("%c" + intersects, "background: #FFC00A; color: #ff0000");
        if (LOG)
            console.log(intersects);




        var offsetPath = new fabric.Path(offsetPathString);
        offsetPath.set({left: options.path.left, top: options.path.top, originX: 'center', originY: 'center', stroke: 'blue', strokeWidth: 1, fill: '', perPixelTargetFind: true});
        canvas.add(offsetPath);



        var startPoint = spinePoints[0];
        var endPoint = spinePoints[spinePoints.length - 1];

        var startSegment, endSegment;

        for (i = 0; i < offsetPoints.length; i++) {
            var p1 = offsetPoints[i], p2;
            if (i == offsetPoints.length - 1) {
                p2 = offsetPoints[0];
            } else {
                p2 = offsetPoints[i + 1];
            }
            if (PointIsOnLine(p1, p2, startPoint)) {
//            if (LOG) console.log("%c########## Start point found in segment " + p1 + "[" + i + "] - " + p2 + "[" + (i + 1) + "]", "background: #000000; color: #ff00ff");
                startSegment = {p1: i, p2: i + 1};
            }
            if (PointIsOnLine(p1, p2, endPoint)) {
//            if (LOG) console.log("%c########## End point found in segment " + p1 + "[" + i + "] - " + p2 + "[" + (i + 1) + "]", "background: #000000; color: #ff00ff");
                endSegment = {p1: i, p2: i + 1};
            }
            if (PointIsOnLine(p2, p1, startPoint)) {
//            if (LOG) console.log("%c********** Start point found in segment " + p2 + "[" + (i + 1) + "] - " + p1 + "[" + i + "]", "background: #000000; color: #ff00ff");
                startSegment = {p1: i, p2: i + 1};
            }
            if (PointIsOnLine(p2, p1, endPoint)) {
//            if (LOG) console.log("%c********** End point found in segment " + p2 + "[" + (i + 1) + "] - " + p1 + "[" + i + "]", "background: #000000; color: #ff00ff");
                endSegment = {p1: i, p2: i + 1};
            }
        }




        if (LOG)
            console.log("%cStart segment formed by points " + startSegment.p1 + " and " + startSegment.p2, "background: #000000; color: #ff00ff");
        if (LOG)
            console.log("%cEnd segment formed by points " + endSegment.p1 + " and " + endSegment.p2, "background: #000000; color: #ff00ff");


        var boundaryLimits = [startSegment.p1, startSegment.p2, endSegment.p1, endSegment.p2, 0, offsetPoints.length - 1];
        boundaryLimits = boundaryLimits.sort(function (a, b) {
            return a - b
        });


        if (LOG)
            console.log(boundaryLimits);





        /**************/
        /* BOUNDARY 1 */
        /**************/

        var offsetPathString1 = "M ";

        var boundary1 = new Array();

        polyPath += " M ";

        var nPointsPerLine = Math.floor(offsetPoints.length / 2 - 1);

//    for (i = offsetPoints.length - 3; i > nPointsPerLine; i--) {
        for (i = boundaryLimits[3]; i > boundaryLimits[2]; i--) {
            x = offsetPoints[i].x;
            y = offsetPoints[i].y;
            offsetPathString1 += " " + x + " " + y + " L";
            polyPath += " " + x + " " + y + " L";
            boundary1.push({x: x, y: y});
        }
        x = offsetPoints[boundaryLimits[2]].x;
        y = offsetPoints[boundaryLimits[2]].y;
        offsetPathString1 += " " + x + " " + y;
        polyPath += " " + x + " " + y;
        boundary1.push({x: x, y: y});



        /**************/
        /* BOUNDARY 2 */
        /**************/

        var offsetPathString2 = "M ";

        var boundary2 = new Array();

        polyPath += " M ";

        var nPointsPerLine = Math.floor(offsetPoints.length / 2 - 1);

        for (i = boundaryLimits[4]; i < boundaryLimits[5]; i++) {
            x = offsetPoints[i].x;
            y = offsetPoints[i].y;
            offsetPathString2 += " " + x + " " + y + " L";
            polyPath += " " + x + " " + y;
            boundary2.push({x: x, y: y});
        }
        for (i = boundaryLimits[0]; i < boundaryLimits[1]; i++) {
            x = offsetPoints[i].x;
            y = offsetPoints[i].y;
            offsetPathString2 += " " + x + " " + y + " L";
            polyPath += " " + x + " " + y;
            boundary2.push({x: x, y: y});
        }
        x = offsetPoints[boundaryLimits[1]].x;
        y = offsetPoints[boundaryLimits[1]].y;
        offsetPathString2 += " " + x + " " + y;
        polyPath += " " + x + " " + y;
        boundary2.push({x: x, y: y});



//    x = offsetPoints[offsetPoints.length - 2].x;
//    y = offsetPoints[offsetPoints.length - 2].y;
//    offsetPathString2 += " " + x + " " + y + " L";
//    polyPath += " " + x + " " + y + " L";
//    boundary2.push({x: x, y: y});
//    for (i = 0; i <= nPointsPerLine - 1; i++) {
//        x = offsetPoints[i].x;
//        y = offsetPoints[i].y;
//        offsetPathString2 += " " + x + " " + y + " L";
//        polyPath += " " + x + " " + y;
//        boundary2.push({x: x, y: y});
//    }



        if (LOG)
            console.log("offsetPathString1:");
        if (LOG)
            console.log(offsetPathString1);

        if (LOG)
            console.log("offsetPathString2:");
        if (LOG)
            console.log(offsetPathString2);

        if (LOG)
            console.log("spinePoints:");
        if (LOG)
            console.log(spinePoints);
        if (LOG)
            console.log("boundary1:");
        if (LOG)
            console.log(boundary1);
        if (LOG)
            console.log("boundary2:");
        if (LOG)
            console.log(boundary2);





        var simplifiedCurve = new fabric.Path(simplifiedCurveString);
        simplifiedCurve.set({left: options.path.left, top: options.path.top, originX: 'center', originY: 'center', stroke: 'purple', opacity: 0.5, strokeWidth: 3, fill: '', perPixelTargetFind: true});
        canvas.add(simplifiedCurve);
//    if (LOG) console.log("simplifiedCurve.path.length:");
//    if (LOG) console.log(simplifiedCurve.path.length);
//    if (LOG) console.log(simplifiedCurve.path);

//    var offsetPath1 = new fabric.Path(offsetPathString1);
//    offsetPath1.set({left: options.path.left, top: options.path.top, originX: 'center', originY: 'center', stroke: 'red', strokeWidth: 3, fill: '', perPixelTargetFind: true});
//    canvas.add(offsetPath1);
//    if (LOG) console.log("offsetPath1.path.length:");
//    if (LOG) console.log(offsetPath1.path.length);
//    if (LOG) console.log(offsetPath1.path);

//    var offsetPath2 = new fabric.Path(offsetPathString2);
//    offsetPath2.set({left: options.path.left, top: options.path.top, originX: 'center', originY: 'center', stroke: 'blue', strokeWidth: 3, fill: '', perPixelTargetFind: true});
//    canvas.add(offsetPath2);
//    if (LOG) console.log("offsetPath2.path.length:");
//    if (LOG) console.log(offsetPath2.path.length);
//    if (LOG) console.log(offsetPath2.path);




//    options.path.stroke = 'red';
//    options.path.opacity = 0.5;    
//    canvas.bringToFront(options.path);

//    canvas.remove(options.path);






        var polyPathSVG = new fabric.Path(polyPath);
        polyPathSVG.set({left: options.path.left, top: options.path.top, originX: 'center', originY: 'center', stroke: '#ffbd00', strokeWidth: 3, fill: '', perPixelTargetFind: true});
        canvas.add(polyPathSVG);





        if (LOG)
            console.log("polyPathSVG:");
        if (LOG)
            console.log(polyPathSVG);

        if (LOG)
            console.log("polyPathSVG.toSVG():");
        if (LOG)
            console.log(polyPathSVG.toSVG());



        var n = spinePoints.length;

        var xValues = new Array();
        var yValues = new Array();

        for (i = 0; i < spinePoints.length; i++) {
            xValues.push(spinePoints[i].x);
            yValues.push(spinePoints[i].y);
        }
        for (i = 0; i < boundary1.length; i++) {
            xValues.push(boundary1[i].x);
            yValues.push(boundary1[i].y);
        }
        for (i = 0; i < boundary2.length; i++) {
            xValues.push(boundary2[i].x);
            yValues.push(boundary2[i].y);
        }

//    for (i = 0; i < n; i++) {
//        xValues.push(spinePoints[i].x);
//        xValues.push(boundary1[i].x);
//        xValues.push(boundary2[i].x);
//
//        yValues.push(spinePoints[i].y);
//        yValues.push(boundary1[i].y);
//        yValues.push(boundary2[i].y);
//    }

        var minX = Math.min.apply(Math, xValues);
        var minY = Math.min.apply(Math, yValues);



        if (LOG)
            console.log("minX: " + minX);
        if (LOG)
            console.log("minY: " + minY);


        var tl = polyPathSVG.getPointByOrigin('left', 'top');

        var spineAbsolutePoints = new Array();
        var b1AbsolutePoints = new Array();
        var b2AbsolutePoints = new Array();

        for (i = 0; i < spinePoints.length; i++) {
            var spineX = tl.x + spinePoints[i].x - minX;
            var spineY = tl.y + spinePoints[i].y - minY;
            spineAbsolutePoints.push({x: spineX, y: spineY});
            drawRectAt(new fabric.Point(spineX, spineY), "green");
        }

        for (i = 0; i < boundary1.length; i++) {
            var b1X = tl.x + boundary1[i].x - minX;
            var b1Y = tl.y + boundary1[i].y - minY;
            b1AbsolutePoints.push({x: b1X, y: b1Y});
            drawRectAt(new fabric.Point(b1X, b1Y), "blue");
        }

        for (i = 0; i < boundary2.length; i++) {
            var b2X = tl.x + boundary2[i].x - minX;
            var b2Y = tl.y + boundary2[i].y - minY;
            b2AbsolutePoints.push({x: b2X, y: b2Y});
            drawRectAt(new fabric.Point(b2X, b2Y), "red");
        }


//    for (i = 0; i < n; i++) {
//
//        var spineX = tl.x + spinePoints[i].x - minX;
//        var spineY = tl.y + spinePoints[i].y - minY;
//        spineAbsolutePoints.push({x: spineX, y: spineY});
//        drawRectAt(new fabric.Point(spineX, spineY), "green");
//
//        var b1X = tl.x + boundary1[i].x - minX;
//        var b1Y = tl.y + boundary1[i].y - minY;
//        b1AbsolutePoints.push({x: b1X, y: b1Y});
//        drawRectAt(new fabric.Point(b1X, b1Y), "blue");
//
//        var b2X = tl.x + boundary2[i].x - minX;
//        var b2Y = tl.y + boundary2[i].y - minY;
//        b2AbsolutePoints.push({x: b2X, y: b2Y});
//        drawRectAt(new fabric.Point(b2X, b2Y), "red");
//
//    }

//    drawRectAt(tl, "red");



        var middlePoint = polyPathSVG.getCenterPoint();

        var imgObject = getImportedImageContaining(middlePoint.x, middlePoint.y);

        if (imgObject) {


            var bl = imgObject.getPointByOrigin('left', 'bottom');
//        drawRectAt(bl, "purple");





            var w = imgObject.getWidth();
            var h = imgObject.getHeight();

            var spineTexturePoints = new Array();
            var b1TexturePoints = new Array();
            var b2TexturePoints = new Array();

            for (i = 0; i < spineAbsolutePoints.length; i++) {
                var spineX = Math.abs(bl.x - spineAbsolutePoints[i].x) / w;
                var spineY = Math.abs(bl.y - spineAbsolutePoints[i].y) / h;
                spineTexturePoints.push({u: spineX, v: spineY});
            }
            for (i = 0; i < b1AbsolutePoints.length; i++) {
                var b1X = Math.abs(bl.x - b1AbsolutePoints[i].x) / w;
                var b1Y = Math.abs(bl.y - b1AbsolutePoints[i].y) / h;
                b1TexturePoints.push({u: b1X, v: b1Y});
            }

            for (i = 0; i < b2AbsolutePoints.length; i++) {
                var b2X = Math.abs(bl.x - b2AbsolutePoints[i].x) / w;
                var b2Y = Math.abs(bl.y - b2AbsolutePoints[i].y) / h;
                b2TexturePoints.push({u: b2X, v: b2Y});
            }



//        for (i = 0; i < n; i++) {
//
//            var spineX = Math.abs(bl.x - spineAbsolutePoints[i].x) / w;
//            var spineY = Math.abs(bl.y - spineAbsolutePoints[i].y) / h;
//            spineTexturePoints.push({u: spineX, v: spineY});
//
//            var b1X = Math.abs(bl.x - b1AbsolutePoints[i].x) / w;
//            var b1Y = Math.abs(bl.y - b1AbsolutePoints[i].y) / h;
//            b1TexturePoints.push({u: b1X, v: b1Y});
//
//            var b2X = Math.abs(bl.x - b2AbsolutePoints[i].x) / w;
//            var b2Y = Math.abs(bl.y - b2AbsolutePoints[i].y) / h;
//            b2TexturePoints.push({u: b2X, v: b2Y});
//
//        }

            if (LOG)
                console.log("spineRelativePoints:");
            if (LOG)
                console.log(spineTexturePoints);

            if (LOG)
                console.log("b1RelativePoints:");
            if (LOG)
                console.log(b1TexturePoints);

            if (LOG)
                console.log("b2RelativePoints:");
            if (LOG)
                console.log(b2TexturePoints);


            // standard global variables
            var container, scene, camera, renderer, controls;


            $(document.body).append('<div id="ThreeJS"></div>');
            // SCENE
            scene = new THREE.Scene();
            // CAMERA
            var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
            var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
            camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
            scene.add(camera);
            camera.position.set(0, 20, 510);
            camera.lookAt(scene.position);
            // RENDERER
            if (Detector.webgl) {
                renderer = new THREE.WebGLRenderer({antialias: true});
                renderer.setClearColor(0xffffff, 1);
            }
            else
                renderer = new THREE.CanvasRenderer();
            renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
            container = document.getElementById('ThreeJS');
            container.appendChild(renderer.domElement);
            // EVENTS
            THREEx.WindowResize(renderer, camera);
            THREEx.FullScreen.bindKey({charCode: 'm'.charCodeAt(0)});

            // CONTROLS
            controls = new THREE.OrbitControls(camera, renderer.domElement);

            // LIGHT
            var light = new THREE.PointLight(0xffffff);
            light.position.set(0, 150, 100);
            scene.add(light);

//        // FLOOR
//        var floorTexture = new THREE.ImageUtils.loadTexture('./img/checkerboard.jpg');
//        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
//        floorTexture.repeat.set(10, 10);
//        var floorMaterial = new THREE.MeshBasicMaterial({map: floorTexture, side: THREE.DoubleSide});
//        var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
//        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
//        floor.position.y = -30;
//        floor.rotation.x = Math.PI / 2;
//        scene.add(floor);

            var light2 = new THREE.AmbientLight(0x444444);
            scene.add(light2);

            var sourceGeometry = new THREE.Geometry();

            var texturePoints = new Array();
            var n = spinePoints.length;

            for (i = 0; i < n; i++) {
                sourceGeometry.vertices.push(new THREE.Vector3(boundary1[i].x, bl.y - boundary1[i].y, 0));
                sourceGeometry.vertices.push(new THREE.Vector3(spinePoints[i].x, bl.y - spinePoints[i].y, 0));
                sourceGeometry.vertices.push(new THREE.Vector3(boundary2[i].x, bl.y - boundary2[i].y, 0));

                texturePoints.push(new THREE.Vector2(b1TexturePoints[i].u, b1TexturePoints[i].v));
                texturePoints.push(new THREE.Vector2(spineTexturePoints[i].u, spineTexturePoints[i].v));
                texturePoints.push(new THREE.Vector2(b2TexturePoints[i].u, b2TexturePoints[i].v));
            }




            /************************/
            /* DESTINATION GEOMETRY */
            /************************/

            var spineDistances = new Array();
            for (i = 0; i < n - 1; i++) {
                spineDistances.push(Math.sqrt(Math.pow(spinePoints[i + 1].y - spinePoints[i].y, 2) + Math.pow(spinePoints[i + 1].x - spinePoints[i].x, 2)));
            }
            if (LOG)
                console.log("spineDistances:");
            if (LOG)
                console.log(spineDistances);

            var newSpinePoints = new Array();
            newSpinePoints.push({x: 0, y: 0});
            for (i = 1; i < n; i++) {
                newSpinePoints.push({x: newSpinePoints[i - 1].x + spineDistances[i - 1], y: 0});
            }

            var deltaY = Math.sqrt(Math.pow(spinePoints[0].y - boundary1[0].y, 2) + Math.pow(spinePoints[0].x - boundary1[0].x, 2));
            var newBoundary1Points = new Array();
            var newBoundary2Points = new Array();
            for (i = 0; i < n; i++) {
                newBoundary1Points.push({x: newSpinePoints[i].x, y: newSpinePoints[i].y - deltaY});
                newBoundary2Points.push({x: newSpinePoints[i].x, y: newSpinePoints[i].y + deltaY});
            }


            if (LOG)
                console.log("newSpinePoints:");
            if (LOG)
                console.log(newSpinePoints);

            if (LOG)
                console.log("newBoundary1Points:");
            if (LOG)
                console.log(newBoundary1Points);

            if (LOG)
                console.log("newBoundary2Points:");
            if (LOG)
                console.log(newBoundary2Points);



            var destinationGeometry = new THREE.Geometry();

            for (i = 0; i < n; i++) {
                destinationGeometry.vertices.push(new THREE.Vector3(newBoundary1Points[i].x, bl.y - newBoundary1Points[i].y, 0));
                destinationGeometry.vertices.push(new THREE.Vector3(newSpinePoints[i].x, bl.y - newSpinePoints[i].y, 0));
                destinationGeometry.vertices.push(new THREE.Vector3(newBoundary2Points[i].x, bl.y - newBoundary2Points[i].y, 0));
            }

            destinationGeometry.faceVertexUvs[0] = [];
            var j = 0;
            for (i = 0; i < ((n - 1) * 3); i++) {
                if ((i + 1) % 3 != 0) {
                    destinationGeometry.faces.push(new THREE.Face3(i, i + 1, i + 4));
                    destinationGeometry.faces.push(new THREE.Face3(i + 4, i + 3, i));

                    destinationGeometry.faceVertexUvs[0][j++] = [texturePoints[i], texturePoints[i + 1], texturePoints[i + 4]];
                    destinationGeometry.faceVertexUvs[0][j++] = [texturePoints[i + 4], texturePoints[i + 3], texturePoints[i]];
                }
            }


//        THREE.GeometryUtils.center(destinationGeometry);
            destinationGeometry.center()

            var destinationShape = THREE.SceneUtils.createMultiMaterialObject(destinationGeometry, [
                new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(imgObject.toDataURL()), side: THREE.DoubleSide}),
//            new THREE.MeshBasicMaterial({map: imgObject.texture, side: THREE.DoubleSide}),
                new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true, wireframeLinewidth: 3, side: THREE.DoubleSide})
            ]);





            /************************/










            sourceGeometry.faceVertexUvs[0] = [];
            var j = 0;
            for (i = 0; i < ((n - 1) * 3); i++) {
                if ((i + 1) % 3 != 0) {
                    sourceGeometry.faces.push(new THREE.Face3(i, i + 1, i + 4));
                    sourceGeometry.faces.push(new THREE.Face3(i + 4, i + 3, i));

                    sourceGeometry.faceVertexUvs[0][j++] = [texturePoints[i], texturePoints[i + 1], texturePoints[i + 4]];
                    sourceGeometry.faceVertexUvs[0][j++] = [texturePoints[i + 4], texturePoints[i + 3], texturePoints[i]];
                }
            }

//        if (LOG) console.log("drawnGeometry.faceVertexUvs[0]:");
//        if (LOG) console.log(drawnGeometry.faceVertexUvs[0]);

//    if (LOG) console.log(customGeometry);




//        var obj = imgObject.toObject();
//        if (LOG) console.log(imgObject);
//        if (LOG) console.log(obj);


            sourceGeometry.center();

            var sourceShape = THREE.SceneUtils.createMultiMaterialObject(sourceGeometry, [
                new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(imgObject.toDataURL()), side: THREE.DoubleSide}),
//            new THREE.MeshBasicMaterial({map: imgObject.texture, side: THREE.DoubleSide}),
                new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true, wireframeLinewidth: 3, side: THREE.DoubleSide})

            ]);
            scene.add(sourceShape);

            if (LOG)
                console.log("sourceShape:");
            if (LOG)
                console.log(sourceShape);

            if (LOG)
                console.log("sourceGeometry:");
            if (LOG)
                console.log(sourceGeometry);







            sourceGeometry.computeBoundingBox();
            sourceGeometry.computeBoundingSphere();


            if (LOG)
                console.log("sourceGeometry.boundingBox:");
            if (LOG)
                console.log(sourceGeometry.boundingBox);

//        destinationShape.position.y = sourceGeometry.boundingSphere.center.y - sourceGeometry.boundingSphere.radius - 30;
            destinationShape.position.y = sourceGeometry.boundingBox.min.y - 50;

            scene.add(destinationShape);



            animate();



        }


        deActivateTransmogrificationMode();



    }


    function animate() {
        requestAnimationFrame(animate);
        render();
        update();
    }

    function update() {
        controls.update();
    }

    function render() {
        renderer.render(scene, camera);
    }





    canvas.renderAll();









}

function hiMenu(menuID) {
    $("#" + menuID).removeClass('hover');
    $("#" + menuID + "UL").css("display", "none");
}

function showMenu(menu) {
    var theMenu = $(menu);
    var menuID = theMenu.attr('id');
    $("#" + menuID).addClass('hover');
    $("#" + menuID + "UL").css("display", "block");
}

function closePotentiallyOpenMenus() {
    hiMenu("fileMenu");
    hiMenu("configMenu");
}

function canvasMouseDown(option) {

    if (LOG)
        console.log("canvasMouseDown");
    var event = option.e;
    event.preventDefault();

    closePotentiallyOpenMenus();

//   if (LOG) console.log(event);

    if (canvas.isSamplingLineMode) {

        var pointer = canvas.getPointer(event);
        var points = [pointer.x, pointer.y, pointer.x, pointer.y];
        canvas.samplingLine = new fabric.Line(points, {
            strokeWidth: 3,
            fill: '',
            stroke: rgb(219, 75, 0),
            originX: 'center',
            originY: 'center',
            perPixelTargetFind: true,
        });
        canvas.add(canvas.samplingLine);

    } else {

        if (event.targetTouches) {

            var fingersDown = event.targetTouches.length;

            if (fingersDown == 2) {

            } else if (fingersDown == 3) {

            } else if (fingersDown == 4) {

                toggleWidgetsOutputsConnectorsVisibility();


            } else if (fingersDown == 5) {

            }
        }


    }




}

function canvasMouseMove(option) {
//    if (LOG) console.log("canvasMouseMove");
    var event = option.e;
    event.preventDefault();

    canvas.lastZoomingPoint = null;

    if (canvas.isSamplingLineMode) {

        var pointer = canvas.getPointer(event);
        if (canvas.samplingLine) {
            canvas.samplingLine.set({x2: pointer.x, y2: pointer.y});
            canvas.renderAll();
        }

    }

}

function canvasMouseUp(option) {

    if (LOG)
        console.log("canvasMouseUp");

    if (option) {
        var event = option.e;
        if (event) {
            event.preventDefault();
        }

        if (canvas.isSamplingLineMode) {

            applyInactiveMenuButtonStyle($("#samplerLineButton"));
            deactivateLineColorSampling();

            var theSamplingLine = canvas.samplingLine;
            theSamplingLine.setCoords();

            var x1 = theSamplingLine.x1;
            var y1 = theSamplingLine.y1;
            var x2 = theSamplingLine.x2;
            var y2 = theSamplingLine.y2;

            console.log("theSamplingLine.top: " + theSamplingLine.top);
            console.log("theSamplingLine.left: " + theSamplingLine.left);

            var centerPoint = theSamplingLine.getCenterPoint();
            console.log("centerPoint.x: " + centerPoint.x);
            console.log("centerPoint.y: " + centerPoint.y);

            var simplifiedPolyline = new Array();
            var startPoint = {x: x1, y: y1};
            var endPoint = {x: x2, y: y2};

//            drawRectAt(startPoint, 'green');
//            drawRectAt(endPoint, 'red');
//            drawRectAt(centerPoint, 'black');

            simplifiedPolyline.push(startPoint);
            simplifiedPolyline.push(endPoint);

//            createSampleVixorFromPath(simplifiedPolyline, true, centerPoint);
            createSampleVixorFromPath(theSamplingLine, true);

            canvas.samplingLine.remove();

            canvas.samplingLine = null;

            canvas.renderAll();

        } else {

            var targetObject = option.target;

            if (!targetObject)
                return;

            if (targetObject.permanentOpacity != 'undefined') {
                targetObject.opacity = targetObject.permanentOpacity;
            } else {
                targetObject.opacity = 1;
            }



            if (targetObject.widgets) {
                targetObject.widgets.forEach(function (widget) {
                    if (widget.permanentOpacity != 'undefined') {
                        widget.opacity = widget.permanentOpacity;
                    } else {
                        widget.opacity = 1;
                    }
                });
            }

        }








        canvas.renderAll();

    }








//    if (LOG) console.log(event);
//
//    if (LOG) console.log("%cevent.touches.length: " + event.touches.length, "background: aqua");
//    if (LOG) console.log("%cevent.changedTouches.length: " + event.changedTouches.length, "background: aqua");    
//    
//    if (event.touches && event.touches.length == 0) {
////    if (event.touches && event.touches.length == 2 && event.changedTouches && event.changedTouches.length == 1) {
//        // We enable the pinch gesture again, once any finger has been removed from the screen
//        if (LOG) console.log("%cEnabling pinch", "background: aqua");
//        gestureSetEnabled(manager, 'pinch', true);
//    }









}

function canvasPressEvent(hammerEvent) {
    if (LOG)
        console.log("canvasPressEvent");
    hammerEvent.preventDefault();
    var activeObject = canvas.getActiveObject();
    if (activeObject) {

        hammerEvent.targetObject = activeObject;

        if (activeObject.isOperator) {
            if (LOG)
                console.log("%cDelegating the pressing event to the press OPERATOR", "background: #00ff00");
        } else if (activeObject.isFunctionOutput) {
            if (LOG)
                console.log("%cDelegating the pressing event to the press FUNCTION OUTPUT", "background: #00ff00");
        } else if (activeObject.isVisualProperty) {
            if (LOG)
                console.log("%cDelegating the pressing event to the press VISUAL PROPERTY", "background: #00ff00");
        }

        activeObject.trigger('pressed', hammerEvent);

    }
}


function canvasDoubleTap(hammerEvent) {

    if (LOG)
        console.log("canvasDoubleTap");

    hammerEvent.preventDefault();

    var activeObject = canvas.getActiveObject();
    var activeGroup = canvas.getActiveGroup();

    if (activeObject) {

        if (activeObject.isImage) {

            if (LOG)
                console.log("%cDelegating the double tap event to the tapped object", "background: #00ff00");

            objectDoubleTap(hammerEvent, activeObject);


        } else {
            var options = {event: hammerEvent};
            activeObject.trigger('doubleTap', options);
        }

    } else if (activeGroup) {

        var options = {event: hammerEvent};
        activeGroup.trigger('doubleTap', options);

    } else {

//        toggleWidgetsOutputsConnectorsVisibility();
//            toggleMarksState();

        if (LOG)
            console.log("Double clic on the canvas");

    }

}

function canvasMouseOver(option) {


    if (LOG)
        console.log("canvasMouseOver");

    var targetObject = option.target;

    if (targetObject.isImage || targetObject.isOutput || targetObject.isConnector) {
//        if (LOG) console.log(option.target);
    }

}








function bindCanvasDefaultEvents() {

    canvas.on({
        'mouse:up': function (option) {
            canvasMouseUp(option);
        },
        'object:selected': function (option) {
            canvasObjectSelected(option);
        },
        'mouse:down': function (option) {
            canvasMouseDown(option);
        },
        'mouse:move': function (option) {
            canvasMouseMove(option);
        },
        'selection:cleared': function (option) {
            canvasSelectionCleared(option);
        },
        'before:selection:cleared': function (option) {
            canvasBeforeSelectionCleared(option);
        },
        'selection:created': function (option) {
            canvasSelectionCreated(option);
        },
        'path:created': function (option) {
            canvasPathCreated(option);
        },
        'object:scaled': function (option) {
            console.log("ñsdiyugfeiuaagfñilu");
        },
//        'mouse:over': function (option) {
//            canvasMouseOver(option);
//        }
    });
}

