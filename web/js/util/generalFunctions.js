function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(string, find, replace) {
    if (string.replace) {
        return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    } else {
        return string;
    }

}

function refresherFunction() {
    canvas.renderAll()
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    jQuery.each(xml.split('\r\n'), function (index, node) {
        var indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/)) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
}


function canBeCurrency(string) {
    var regex = /^[1-9]\d*(((,\d{3})*)?(\.\d*)?)$/;
    return regex.test(string);
}

function getBase64Image(img) {
    // Create an empty canvas element
    var aCanvas = document.createElement("canvas");
    aCanvas.width = img.width;
    aCanvas.height = img.height;

    // Copy the image contents to the aCanvas
    var ctx = aCanvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = aCanvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function print(content, background, foreground) {
    background = background || '#FFFFFF';
    foreground = foreground || '#000000';
    console.log("%c" + content, "background: " + background + "; color: " + foreground);
}

function isValidURL(aString) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(aString);
}

function hideOpenTooltips() {
    // Hiding any open tooltip
    var allTooltips = $(".tooltipstered");
    /*console.log("allTooltips:");
     console.log(allTooltips);*/

    allTooltips.each(function () {

        console.log("this:");
        console.log(this);

        var tooltip = $(this);
        console.log("tooltip:");
        console.log(tooltip);

        console.log("tooltip.tooltipster('option', autoClose):");
        console.log();

        var autoClose = tooltip.tooltipster('option', 'autoClose');
        if (autoClose) {
            tooltip.tooltipster("hide", function () {
                document.body.removeChild(this[0]);
            });
        }
    });



//                $(".tooltipstered").tooltipster("hide", function () {
//                    document.body.removeChild(this[0]);
//                    //                        if (LOG) console.log("this");
//                    //                        if (LOG) console.log(this);
//                });
}

// Zoom In
function zoomIn() {
    var canvasCenter = new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2);
    canvas.zoomToPoint(canvasCenter, canvas.getZoom() * 1.1);
    canvas.renderAll();
}

// Zoom Out
function zoomOut() {
    var canvasCenter = new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2);
    canvas.zoomToPoint(canvasCenter, canvas.getZoom() / 1.1);
    canvas.renderAll();
}

function drawTextualVixor(textExtractorType, element) {

    var button = $("#" + element.id);
    var isActive = button.data('isActive');
    if (isActive) {
        applyInactiveMenuButtonStyle(button);
        // TODO: Here, the canvas should behave normal, so the drawing a rectangle capability
        // should not be disabled
        bindCanvasDefaultEvents();
        enableObjectEvents();
    } else {
        applyActiveMenuButtonStyle(button);
    }

    if (LOG)
        console.log("isActive");
    if (LOG)
        console.log(isActive);
    disableDrawingMode();
    disableObjectEvents();
    canvas.discardActiveObject();
    var hoverCursor = canvas.hoverCursor;
    var defaultCursor = canvas.defaultCursor;
    canvas.hoverCursor = 'crosshair';
    canvas.defaultCursor = 'crosshair';
    var theVixor = null;
    // removing all canvas handlers for all events
    canvas.off();
    var downEvent = 'mouse:down';
    var moveEvent = 'mouse:move';
    var upEvent = 'mouse:up';
    canvas.selection = false;
    var mouseDragged = false;
    canvas.on(downEvent, function (options) {

        applyInactiveMenuButtonStyle(button);
        var event = options.e;
        if (event) {
            event.preventDefault();
        }
        if (LOG)
            console.log("DOWN");
        var downPoint = getCanvasCoordinates(event);
        //                    drawRectAt(downPoint, "red");


        var startX = downPoint.x;
        var startY = downPoint.y;
        var parentObject = getImportedImageContaining(downPoint);
        theVixor = new TextualVixor({
            top: startY,
            left: startX,
            scaleX: parentObject ? parentObject.getScaleX() : 1,
            scaleY: parentObject ? parentObject.getScaleY() : 1,
            //                        scaleX: parentObject ? parentObject.getScaleX() / canvas.getZoom() : 1,
            //                        scaleY: parentObject ? parentObject.getScaleY() / canvas.getZoom() : 1,
            width: 0,
            height: 0,
            fill: 'rgba(' + 255 + ',  ' + 255 + ', ' + 255 + ', ' + widget_fill_opacity + ')',
            opacity: 1,
            movingOpacity: 0.3,
            radius: 0,
            isWidget: true,
            hasControls: false,
            hasBorders: false,
            hasRotatingPoint: false,
            selectable: true,
            figureType: textExtractorType,
            cornerColor: '#ffbd00',
            transparentCorners: false,
            isTextRecognizer: true,
            trueColor: 'rgba(255, 255, 255, 0)',
            fillColor: 'rgba(' + 255 + ',  ' + 255 + ', ' + 255 + ', ' + widget_fill_opacity + ')',
            parentObject: parentObject
        });
        theVixor.permanentOpacity = theVixor.opacity;
        theVixor.set('originX', 'center');
        theVixor.set('originY', 'center');
        canvas.add(theVixor);
        canvas.setActiveObject(theVixor);
        if (LOG)
            console.log(theVixor);
        theVixor.applySelectedStyle();
        theVixor.associateEvents();
        theVixor.associateInteractionEvents();
        canvas.on(moveEvent, function (option) {

            if (LOG)
                console.log("DRAGGING");
            var event = option.e;
            if (event) {
                event.preventDefault();
            }

            var canvasCoords = getCanvasCoordinates(event);
            //                        drawRectAt(canvasCoords, "green");

            mouseDragged = true;
            canvas.hoverCursor = 'crosshair';
            canvas.defaultCursor = 'crosshair';
            var currentX = canvasCoords.x;
            var currentY = canvasCoords.y;
            var diffX = currentX - startX;
            var diffY = currentY - startY;
            var width = Math.abs(diffX);
            var height = Math.abs(diffY);
            if (textExtractorType == "blockExtractor") {
                diffX > 0 ? theVixor.set('originX', 'left') : theVixor.set('originX', 'right');
                diffY > 0 ? theVixor.set('originY', 'top') : theVixor.set('originY', 'bottom');
                if (theVixor.parentObject) {
                    //                                width = width * canvas.getZoom()
                    //                                height = height * canvas.getZoom()
                }
                theVixor.set('width', width);
                theVixor.set('height', height);
            } else if (textExtractorType == "lineExtractor") {

                var x1 = startX;
                var y1 = startY;
                var x2 = currentX;
                var y2 = currentY;
                var deltaX = x2 - x1;
                var deltaY = y2 - y1;
                var length = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
                var center = new fabric.Point(x1 + deltaX / 2, y1 + deltaY / 2);
                var angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
                if (deltaX < 0) {
                    angle = angle + 180;
                }

                theVixor.set('left', center.x);
                theVixor.set('top', center.y);
                theVixor.set('angle', angle);
                theVixor.set('width', length / (parentObject ? parentObject.getScaleX() : 1));
                theVixor.set('height', 40);
            }

            theVixor.applySelectedStyle();
            theVixor.setCoords();
            canvas.setActiveObject(theVixor);
            canvas.renderAll();
        });
    });
    canvas.on(upEvent, function (option) {

        //                    if (LOG) console.log("UP");

        var event = option.e;
        if (event) {
            event.preventDefault();
        }

        //                    var canvasCoords = getCanvasCoordinates(event);
        //                    drawRectAt(canvasCoords, "purple");

        canvas.off();
        canvas.discardActiveObject();
        //                    canvas.selection = true;
        canvas.hoverCursor = hoverCursor;
        canvas.defaultCursor = defaultCursor;
        if (!mouseDragged) {
            canvas.remove(theVixor);
        } else {

            //                        var parentObject = getImportedImageContaining(theVixor.left, theVixor.top);
            var parentObject = theVixor.parentObject;
            if (parentObject) {

                parentObject.widgets.push(theVixor);
                theVixor.parentObject = parentObject;
                if (textExtractorType == "blockExtractor") {
                    var centerPoint = theVixor.getPointByOrigin('center', 'center');
                    theVixor.originX = 'center';
                    theVixor.originY = 'center';
                    theVixor.left = centerPoint.x;
                    theVixor.top = centerPoint.y;
                }

                computeUntransformedProperties(theVixor);
                //                     theVixor.untransformedScaleX = theVixor.getScaleX() / parentObject.getScaleX();
                //                     theVixor.untransformedScaleY = theVixor.getScaleY() / parentObject.getScaleY();
                theVixor.untransformedScaleX = 1;
                theVixor.untransformedScaleY = 1;
            }

            var d = new Date();
            var df = d.getMonth() + '_' + d.getDate() + '_' + d.getYear() + '_' + (d.getHours() + 1) + '_' + d.getMinutes() + '_' + d.getSeconds() + '_' + d.getMilliseconds();
            theVixor.id = df;
            theVixor.hasControls = true;
            theVixor.hasRotatingPoint = true;
            theVixor.valueForRotatingPointOffset = 50;
            theVixor.rotatingPointOffset = theVixor.valueForRotatingPointOffset;
            theVixor.hasBorders = true;
            theVixor.borderColor = theVixor.stroke;
            theVixor.padding = -2;
            theVixor.valueForcornerSize = 20;
            theVixor.cornerSize = theVixor.valueForcornerSize;
            //                                          theVixor.setControlsVisibility({
            //                                             bl: false, // middle top disable
            //                                             br: false, // midle bottom
            //                                             tl: false, // middle left
            //                                             tr: false, // I think you get it
            //                                          });

            //                  theVixor.setControlsVisibility({
            //                     mb: false, // middle top disable
            //                     ml: false, // midle bottom
            //                     mr: false, // middle left
            //                     mt: false, // I think you get it
            //                  });

            theVixor.connectors = new Array();
            theVixor.applySelectedStyle();
            canvas.setActiveObject(theVixor);
        }

        // restoring default canvas and objects events
        setTimeout(function () {
            applyInactiveMenuButtonStyle(button);
            bindCanvasDefaultEvents();
            enableObjectEvents();
        }, 300);
    });
}















function draw(figureType) {

    disableDrawingMode();
    disableObjectEvents();
    canvas.discardActiveObject();
    var hoverCursor = canvas.hoverCursor;
    var defaultCursor = canvas.defaultCursor;
    canvas.hoverCursor = 'crosshair';
    canvas.defaultCursor = 'crosshair';
    var widget = null;
    // removing all canvas handlers for all events
    canvas.off();
    var downEvent = 'mouse:down';
    var moveEvent = 'mouse:move';
    var upEvent = 'mouse:up';
    canvas.selection = false;
    var mouseDragged = false;
    canvas.on(downEvent, function (options) {

        var event = options.e;
        if (event) {
            event.preventDefault();
        }
        if (LOG)
            console.log("DOWN");
        var downPoint = getCanvasCoordinates(event);
        //                    drawRectAt(downPoint, "red");


        var startX = downPoint.x;
        var startY = downPoint.y;
        var f = null;
        if (figureType == "TextRectangle") {
            f = TextualVixor;
        } else if (figureType == "Rectangle") {
            f = fabric.Rect;
        } else if (figureType == "Circle") {
            f = fabric.Circle;
        }

        var parentObject = getImportedImageContaining(startX, startY);
        widget = new f({
            top: startY,
            left: startX,
            scaleX: parentObject ? parentObject.getScaleX() : 1,
            scaleY: parentObject ? parentObject.getScaleY() : 1,
            width: 0,
            height: 0,
            fill: 'rgba(' + 255 + ',  ' + 255 + ', ' + 255 + ', ' + widget_fill_opacity + ')',
            opacity: 1,
            movingOpacity: 0.3,
            radius: 0,
            isWidget: true,
            hasControls: false,
            hasBorders: false,
            hasRotatingPoint: false,
            selectable: true,
            figureType: figureType,
            cornerColor: '#ffbd00',
            cornerSize: 22,
            transparentCorners: false,
            isTextRecognizer: true,
            visualPropertyFill: rgb(153, 153, 153),
            visualPropertyStroke: rgb(86, 86, 86),
            colorForStroke: rgb(86, 86, 86),
            trueColor: 'rgba(255, 255, 255, 0)',
            fillColor: 'rgba(' + 255 + ',  ' + 255 + ', ' + 255 + ', ' + widget_fill_opacity + ')',
        });
        widget.permanentOpacity = widget.opacity;
        if (figureType == "TextRectangle" || figureType == "Circle") {
            widget.set('originX', 'center');
            widget.set('originY', 'center');
        }

        canvas.add(widget);
        canvas.setActiveObject(widget);
        widgetApplySelectedStyle(widget);
        if (LOG)
            console.log(widget);
        canvas.on(moveEvent, function (option) {

            if (LOG)
                console.log("DRAGGING");
            var event = option.e;
            if (event) {
                event.preventDefault();
            }

            var canvasCoords = getCanvasCoordinates(event);
            //                        drawRectAt(canvasCoords, "green");

            mouseDragged = true;
            canvas.hoverCursor = 'crosshair';
            canvas.defaultCursor = 'crosshair';
            var currentX = canvasCoords.x;
            var currentY = canvasCoords.y;
            var diffX = currentX - startX;
            var diffY = currentY - startY;
            var width = Math.abs(diffX);
            var height = Math.abs(diffY);
            if (figureType == "Rectangle") {
                diffX > 0 ? widget.set('originX', 'left') : widget.set('originX', 'right');
                diffY > 0 ? widget.set('originY', 'top') : widget.set('originY', 'bottom');
                widget.set('width', width);
                widget.set('height', height);
            } else if (figureType == "Circle") {
                widget.set('radius', Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)));
            } else if (figureType == "TextRectangle") {

                var x1 = startX;
                var y1 = startY;
                var x2 = currentX;
                var y2 = currentY;
                var deltaX = x2 - x1;
                var deltaY = y2 - y1;
                var length = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
                var center = new fabric.Point(x1 + deltaX / 2, y1 + deltaY / 2);
                var angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
                if (deltaX < 0) {
                    angle = angle + 180;
                }

                widget.set('left', center.x);
                widget.set('top', center.y);
                widget.set('angle', angle);
                widget.set('width', length / parentObject.getScaleX());
                widget.set('height', 40);
            }

            widgetApplySelectedStyle(widget);
            widget.setCoords();
            canvas.setActiveObject(widget);
            canvas.renderAll();
        });
    });
    canvas.on(upEvent, function (option) {

        //                    if (LOG) console.log("UP");

        var event = option.e;
        if (event) {
            event.preventDefault();
        }

        var canvasCoords = getCanvasCoordinates(event);

        canvas.off();
        canvas.discardActiveObject();
        //                    canvas.selection = true;
        canvas.hoverCursor = hoverCursor;
        canvas.defaultCursor = defaultCursor;
        if (!mouseDragged) {
            canvas.remove(widget);
        } else {

            var parentObject = getImportedImageContaining(widget.left, widget.top);
            if (parentObject) {

                parentObject.widgets.push(widget);
                widget.parentObject = parentObject;
                computeUntransformedProperties(widget);
                widget.untransformedScaleX = widget.getScaleX() / parentObject.getScaleX();
                widget.untransformedScaleY = widget.getScaleY() / parentObject.getScaleY();
                widget.on({
                    'moving': function (option) {
                        widget.setCoords();
                        widget.untransformedScaleX = widget.getScaleX() / parentObject.getScaleX();
                        widget.untransformedScaleY = widget.getScaleY() / parentObject.getScaleY();
                        textRecognizerMoving(option, widget);
                    },
                    'scaling': function (option) {
                        widget.setCoords();
                        widget.untransformedScaleX = widget.getScaleX() / parentObject.getScaleX();
                        widget.untransformedScaleY = widget.getScaleY() / parentObject.getScaleY();
                        textRecognizerScaling(option, widget);
                    },
                    'rotating': function (option) {
                        widget.setCoords();
                        widget.untransformedScaleX = widget.getScaleX() / parentObject.getScaleX();
                        widget.untransformedScaleY = widget.getScaleY() / parentObject.getScaleY();
                        textRecognizerRotating(option, widget);
                    },
                    'mouseup': function (option) {


                    },
                });

            }

            var d = new Date();
            var df = d.getMonth() + '_' + d.getDate() + '_' + d.getYear() + '_' + (d.getHours() + 1) + '_' + d.getMinutes() + '_' + d.getSeconds() + '_' + d.getMilliseconds();
            widget.id = df;
            widget.hasControls = true;
            widget.setControlsVisibility({
                bl: false, // middle top disable
                br: false, // midle bottom
                tl: false, // middle left
                tr: false, // I think you get it
            });
            widget.connectors = new Array();
            widgetApplySelectedStyle(widget);
            canvas.setActiveObject(widget);
        }

        // restoring default canvas and objects events
        setTimeout(function () {
            bindCanvasDefaultEvents();
            enableObjectEvents();
        }, 300);
    });
}


function setBrushColor() {
    $(colorChooser).click();
}

function enableConnectorsVisibility() {
    $('#toggleConnectorsVisibilityActivatorLink').html('<i id="checkConnectorsVisibility" class="icon-check"></i> Show connectors');
    showConnectors();
}

function disableConnectorsVisibility() {
    $('#toggleConnectorsVisibilityActivatorLink').html('<i id="checkConnectorsVisibility" class="icon-check-empty"></i> Show connectors');
    hideConnectors();
}

function enableMarksExpansion() {
    $('#toggleMarksExpansionActivatorLink').html('<i id="checkMarksExpansion" class="icon-check"></i> Expand marks');
    expandMarks();
}

function disableMarksExpansion() {
    $('#toggleMarksExpansionActivatorLink').html('<i id="checkMarksExpansion" class="icon-check-empty"></i> Expand marks');
    compressMarks();
}

function disableDrawingMode() {
    $('#drawingModeActivatorLink').html('<i id="checkDrawingMode" class="icon-check-empty"></i> Activate');
    canvas.isDrawingMode = false;
}
function enableDrawingMode() {
    $('#drawingModeActivatorLink').html('<i id="checkDrawingMode" class="icon-check"></i> Deactivate');
    canvas.isDrawingMode = true;
}
function setLineWidth(width) {
    enableDrawingMode();
    canvas.freeDrawingBrush.width = width;
    brushWidth = width;
    $(drawingMenu).mouseout();
}

function activateObjectMode() {
    canvas.selection = true;
}



function activePanningMode() {
    canvas.selection = false;
}

function toggleDrawingMode() {
    var link = document.getElementById('drawingModeActivatorLink');
    if (link.text == " Activate") {
        enableDrawingMode();
    } else {
        disableDrawingMode();
    }
}

function toggleConnectorsVisibility() {
    var htmlString = $('#toggleConnectorsVisibilityActivatorLink').html();
    if (htmlString.indexOf("empty") > -1) {
        enableConnectorsVisibility();
    } else {
        disableConnectorsVisibility();
    }
}

function toggleMarksExpansion() {
    var htmlString = $('#toggleMarksExpansionActivatorLink').html();
    if (htmlString.indexOf("empty") > -1) {
        enableMarksExpansion();
    } else {
        disableMarksExpansion();
    }
}

function setBrushMode(mode) {
    enableDrawingMode();
    canvas.freeDrawingBrush = new fabric[mode + 'Brush'](canvas);
    canvas.freeDrawingBrush.color = brushColor;
    canvas.freeDrawingBrush.width = brushWidth;
    $(drawingMenu).mouseout();
}

function bringToFront() {
    if (canvas.getActiveObject()) {
        canvas.bringToFront(canvas.getActiveObject());
    } else if (canvas.getActiveGroup()) {
        alertify.error("Select only one object");
    } else {
        alertify.error("No objects selected");
    }
}

function bringForward() {
    if (canvas.getActiveObject()) {
        canvas.bringForward(canvas.getActiveObject());
    } else if (canvas.getActiveGroup()) {
        alertify.error("Select only one object");
    } else {
        alertify.error("No objects selected");
    }
}

function sendToBack() {
    if (canvas.getActiveObject()) {
        canvas.sendToBack(canvas.getActiveObject());
    } else if (canvas.getActiveGroup()) {
        alertify.error("Select only one object");
    } else {
        alertify.error("No objects selected");
    }
}

function sendBackwards() {
    if (canvas.getActiveObject()) {
        canvas.sendBackwards(canvas.getActiveObject());
    } else if (canvas.getActiveGroup()) {
        alertify.error("Select only one object");
    } else {
        alertify.error("No objects selected");
    }
}

function adjustCanvasDimensions() {
    var width = $('#canvasContainer').width();
//                var height = $('#footer').position().top - $('#canvasContainer').position().top;

    if (LOG)
        console.log("$(window).height(): " + $(window).height());
    if (LOG)
        console.log("$(document).height(): " + $(document).height());
    if (LOG)
        console.log("$('#theMenu').height(): " + $('#theMenu').height());
    var maxHeight = Math.max($(window).height(), $('#rightPanel').height());
    var height = maxHeight - $('#theMenu').height() - 10;

    if (canvas) {
        canvas.setWidth(width);
        canvas.setHeight(height);
    }

}

function hidePanel(id, adjustCanvasSize) {

    var h6 = $(id + "H6");
    var span = $(h6.find("span")[0]);
    span.attr('class', 'fa fa-angle-right');

    var duration = 400;
    var easing = 'easeOutSine';
    $(id).hide({
        duration: duration,
        easing: easing,
        progress: function () {
            if (adjustCanvasSize) {
                adjustCanvasDimensions();
            }
        },
        complete: function () {
            if (adjustCanvasSize) {
                adjustCanvasDimensions();
            }
        },
    });
}

function showPanel(id, adjustCanvasSize) {

    var h6 = $(id + "H6");
    var span = $(h6.find("span")[0]);
    span.attr('class', 'fa fa-angle-down');

    var duration = 400;
    var easing = 'easeOutSine';
    $(id).show({
        duration: duration,
        easing: easing,
        progress: function () {
            if (adjustCanvasSize) {
                adjustCanvasDimensions();
            }
        },
        complete: function () {
            if (adjustCanvasSize) {
                adjustCanvasDimensions();
            }
        },
    });
}

function hideRightPanel(adjustCanvasSize) {
    $('#toggleAdditionalToolsVisibility').html('<i class="fa fa-chevron-left fa-2x"></i>');
    hidePanel("#rightPanel", adjustCanvasSize);
}

function showRightPanel(adjustCanvasSize) {
    $('#toggleAdditionalToolsVisibility').html('<i class="fa fa-chevron-right fa-2x"></i>');
    showPanel("#rightPanel", adjustCanvasSize);
}

function togglePanningMode() {
    if (canvas.activePanningMode) {
        deActivatePanningMode();
    } else {
        activatePanningMode();
    }
}

function togglePanelVisibility(id) {
    if ($(id).is(":visible")) {
        if (id === "#rightPanel") {
            hideRightPanel(true);
        } else {
            hidePanel(id, true);
        }
    } else {
        if (id === "#rightPanel") {
            showRightPanel(true);
        } else {
            showPanel(id, true);
        }
    }
}

function showInfo() {
    var infoPanel = $('<div/>', {id: 'infoPanel'});
    infoPanel.append($('<label/>', {text: "Hello world!", style: "margin-right: 5px; font-size: 18px;"}));
    infoPanel.show();
    $("#infoElement").tooltipster({
        content: infoPanel,
        animation: 'grow',
        trigger: 'click',
        interactive: true,
        position: 'bottom',
        multiple: true
    });
    $("#infoElement").tooltipster('show');
}


function showCameraSignal() {

    var infoPanel = $('<div/>', {id: 'infoPanel'});
    infoPanel.append($('<label/>', {text: "Camera signal:", style: "margin-right: 5px; font-size: 18px;"}));
    var cameraSignal = $('<div />', {id: 'cameraSignal', style: 'margin-top: 8px; width:320px; height:240px; background-color: #fff; border-color: #000; border-style: solid; border-width: 1px;'});

    var preTakeButtons = $('<div />', {id: 'preTakeButtons', style: 'width: 100%;'});
    var captureButton = $('<button/>', {class: "square", style: "margin-top: 5px; width: 50%; margin-left: 25%; float: left; border-color: #000; border-style: solid; border-width: 2px; color: black; "});
    var captureLi = $('<li/>', {class: "fa fa-flash"});
    captureButton.append(captureLi);
    captureButton.append($('<span>Take Snapshot<span/>'));
    preTakeButtons.append(captureButton);

    var postTakeButtons = $('<div />', {id: 'postTakeButtons', style: 'width: 100%; display: none;'});

    var takeAgainButton = $('<button/>', {class: "square", style: "margin-top: 5px; width: 45.5%; margin-left: 3%; float: left; border-color: #000; border-style: solid; border-width: 2px; color: black; "});
    var takeAgainLi = $('<li/>', {class: "fa fa-arrow-left"});


    var importToCanvasButton = $('<button/>', {class: "square", style: "margin-top: 5px; width: 45.5%; margin-right: 3%; float: right; border-color: #000; border-style: solid; border-width: 2px; color: black; "});
    var importToCanvasLi = $('<li/>', {class: "fa fa-arrow-right"});

    takeAgainButton.append(takeAgainLi);
    takeAgainButton.append($('<span>Take again<span/>'));
    postTakeButtons.append(takeAgainButton);

    importToCanvasButton.append($('<span>Use this<span/>'));
    importToCanvasButton.append(importToCanvasLi);
    postTakeButtons.append(importToCanvasButton);

    takeAgainButton.click(function () {

        // freeze camera so user can preview current frame
        Webcam.unfreeze();

        // swap button sets
        document.getElementById('preTakeButtons').style.display = '';
        document.getElementById('postTakeButtons').style.display = 'none';

    });

    captureButton.click(function () {

        // freeze camera so user can preview current frame
        Webcam.freeze();

        // swap button sets
        document.getElementById('preTakeButtons').style.display = 'none';
        document.getElementById('postTakeButtons').style.display = '';

    });

    importToCanvasButton.click(function () {
        Webcam.snap(function (imageData) {
            Webcam.reset();
            importImageToCanvas({imageData: imageData});
            $("#openCameraButton").tooltipster('hide');
            document.getElementById('preTakeButtons').style.display = '';
            document.getElementById('postTakeButtons').style.display = 'none';
        });
    });

    infoPanel.append(cameraSignal);
    infoPanel.append(preTakeButtons);
    infoPanel.append(postTakeButtons);


    infoPanel.show();
    $("#openCameraButton").tooltipster({
        content: infoPanel,
        animation: 'grow',
        trigger: 'click',
        interactive: true,
        position: 'bottom',
        multiple: true
    });
    $("#openCameraButton").tooltipster('show');

    Webcam.set({
        // device capture size
        dest_width: 640,
        dest_height: 480,
        // format and quality
        image_format: 'png',
    });

    Webcam.attach('#cameraSignal');

}

function loadWebPage(displayerElementID, url) {

    if (LOG)
        console.log("loadWebPage FUNCTION");

    var displayerElement = $('#' + displayerElementID);

    if (!url) {
        url = $('#urlInputField').val();
    } else {
        $('#urlInputField').val(url);
    }

    var d = new Date();
    var outFileName = d.getMonth() + '_' + d.getDate() + '_' + d.getYear() + '_' + (d.getHours() + 1) + '_' + d.getMinutes() + '_' + d.getSeconds() + '_' + d.getMilliseconds();


    console.log("url: " + url);
    console.log("outFileName: " + outFileName);

    var request = new XMLHttpRequest(); // create a new request object to send to server    
    request.open("POST", "GenerateWebDocument", true); // set the method and destination
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    request.onreadystatechange = function () {

        if (request.readyState == 4) { // has the data arrived?
            if (request.status == 200) { // is everything OK?

                var textResponse = request.responseText; // getting the result

                if (textResponse.trim().length > 0) {



                    var theiFrame = document.getElementById(displayerElementID);
                    theiFrame.contentWindow.document.close();
                    theiFrame.contentWindow.document.write(textResponse);



//                    var response = JSON.parse(textResponse);
//                    if (response) {
//                        if (LOG) console.log(response);
//                        displayerElement.attr('src', response);
//                    }


                }
            }
        }
    };

    request.send("url=" + url + "&outFileName=" + outFileName); // sending the data to the server


}














function showWebPage() {

    console.log("showWebPage");

    var block = $('<div/>', {id: 'block', class: 'block'}); // TODO: This is the handle that allows the user to resize the div and, in consequence, the iFrame

    var webPagePanel = $('<div/>', {id: 'webPagePanel'});

//    var handle = $('<div class="resize">Drag</div>', {style: 'cursor:move;'}); // TODO: This is the handle that allows the user to resize the div and, in consequence, the iFrame

//    var defaultURL = 'http://www.bbc.co.uk/news';
//    var defaultURL = 'pepe.html';
//    var defaultURL = '5_28_115_1_5_40_188.html';
//    var defaultURL = 'http://www.google.com';
//    var defaultURL = 'http://www.wikipedia.com';
//    var defaultURL = 'http://www.st-andrews.ac.uk';
//    var defaultURL = 'https://en.wikipedia.org/wiki/List_of_countries_by_oil_production';
    var defaultURL = 'http://www.w3schools.com/html/html_tables.asp';

    var inputsContainer = $('<div />', {id: 'inputsContainer', style: 'width: 100%; overflow: hidden;'});

    var urlLabel = $('<label/>', {text: "URL:", style: "float: left; margin-top: 18px; font-size: 18px;"});
    var aSpan = $('<span/>', {style: 'display: block; overflow: hidden; padding: 0 5px'});

    var urlInputField = $('<input/>', {id: 'urlInputField', type: 'text', value: defaultURL, style: 'margin-top: 8px; font-size: 18px; width: 100%; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box'});

    var closeButton = $('<button/>', {style: "margin-top: 2px; float:right; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; border-color: #000; border-style: solid; border-width: 2px; color: black;"});
    var closeLi = $('<li/>', {class: "fa fa-close fa-2x", style: "margin-left: -22px; margin-top: -12px; height: 0px; width: 20px;"});
    closeButton.append(closeLi);

    aSpan.append(urlInputField);

    inputsContainer.append(closeButton);
    inputsContainer.append(urlLabel);
    inputsContainer.append(aSpan);

    var inputKeyUp = function (e) {
        if (e.keyCode === 13) {
            loadWebPage("webPageDisplayer");
        }
    };

    urlInputField.keyup(inputKeyUp);

    var viewportHeight = $(window).height();
    var elementTop = $("#openWebPageButton").position().top + $("#openWebPageButton").height();
    var idealHeight = viewportHeight - elementTop - 150;

    var webPageDisplayer = $('<iframe />', {id: 'webPageDisplayer', style: 'resize:both; overflow:auto; margin-top: 8px; min-width:600px; min-height: 500px; max-height:' + idealHeight + 'px; background-color: #fff; border-color: #000; border-style: solid; border-width: 1px;'});




    closeButton.click(function () {
        $("#openWebPageButton").tooltipster('hide', function () {
            $("#openWebPageButton").on('click', showWebPage);
        });
    });

    webPagePanel.append(inputsContainer);
    webPagePanel.append(webPageDisplayer);

//    webPagePanel.append(handle); // TODO: This is the handle that allows the user to resize the div and, in consequence, the iFrame

    block.append(webPagePanel);

//    webPagePanel.mousedown(function (e) {
//        alert("1 Handler for .mousedown() called.");
//    });
//    webPageDisplayer.mousedown(function (e) {
//        alert("2 Handler for .mousedown() called.");
//    });
//    block.mousedown(function (e) {
//        alert("3 Handler for .mousedown() called.");
//    });



    $("#openWebPageButton").tooltipster({
//        content: webPagePanel,
        content: block,
        animation: 'grow',
        trigger: 'click',
        interactive: true,
        position: 'bottom',
        multiple: true,
        autoClose: false,
        updateAnimation: true,
        contentCloning: false
    });
    $("#openWebPageButton").tooltipster('show');
    $("#openWebPageButton").off('click');

    loadWebPage("webPageDisplayer");



    console.log("iFrame: ");
    console.log(webPageDisplayer);

    var ifrm = document.getElementById('webPageDisplayer');
    console.log("ifrm: ");
    console.log(ifrm);

    // reference to document in iframe
    var doc = ifrm.contentDocument ? ifrm.contentDocument : ifrm.contentWindow.document;
    console.log("doc: ");
    console.log(doc);

    $(ifrm).mousemove(function (cursor) {
        console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
        console.log(cursor.pageX + ":" + cursor.pageY);
    });

    block.mousemove(function (cursor) {
        console.log("DDDDDDDDDDD");
        console.log(cursor.pageX + ":" + cursor.pageY);
    });


    $(doc).mousemove(function (event) {
        console.log("BBBBBBBB");
        var pageCoords = "( " + event.pageX + ", " + event.pageY + " )";
        var clientCoords = "( " + event.clientX + ", " + event.clientY + " )";
        console.log("( event.pageX, event.pageY ) : " + pageCoords);
        console.log("( event.clientX, event.clientY ) : " + clientCoords);
    });

    var documentElement = $(doc.documentElement);
    var body = $(doc.body);

    console.log("documentElement:");
    console.log(documentElement);

    console.log("body: ");
    console.log(body);

    $(documentElement).mousemove(function (event) {
        var msg = "Handler for .mousemove() called at ";
        msg += event.pageX + ", " + event.pageY;
        console.log(msg);
    });



    var onIFrameResizeFunction = function (e) {

        console.log("The iFrame is being resized");

        var iFrameWidth = $("#webPageDisplayer").width();
        var iFrameHeight = $("#webPageDisplayer").height();

        if (iFrameHeight > idealHeight) {
            console.log("%c" + "ALERT!!!!! Forcing height if the iFrame, as it is being extended beyond its maximun, ideal height", "background: red; color: white;");
            $("#webPageDisplayer").height(idealHeight);
        }

        console.log("iFrameWidth: " + iFrameWidth);
        console.log("iFrameHeight: " + iFrameHeight);

        $("#openWebPageButton").tooltipster('reposition');
        $("#openWebPageButton").tooltipster('show');
    };

    $("#webPagePanel").resize(onIFrameResizeFunction);





    var pancho = function (event) {
        var msg = "Handler for .mousemove() called at ";
        msg += event.pageX + ", " + event.pageY;
        console.log(msg);
    };
//    webPageDisplayer.mousemove(pancho);


    console.log("$('#webPageDisplayer'):");
    console.log($('#webPageDisplayer'));

    console.log("$('#webPageDisplayer').contents():");
    console.log($('#webPageDisplayer').contents());

    console.log("$('#webPageDisplayer').contents().find('body'):");
    console.log($('#webPageDisplayer').contents().find('body'));


    $('#webPageDisplayer').contents().find('body').bind('mousemove', pancho);






//    $('#block').dragResize({grid: 20}); / This call is conflicting with the edition of the url input text

}





function saveCanvas() {
    var d = new Date();
    var df = d.getMonth() + '_' + d.getDate() + '_' + d.getYear() + '_' + (d.getHours() + 1) + '_' + d.getMinutes() + '_' + d.getSeconds() + '_' + d.getMilliseconds();
    var blob = new Blob([canvas.toSVG()], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "iVoLVRCanvas_" + df + ".svg");
}

function saveProject() {
    var d = new Date();
    var df = d.getMonth() + '_' + d.getDate() + '_' + d.getYear() + '_' + (d.getHours() + 1) + '_' + d.getMinutes() + '_' + d.getSeconds() + '_' + d.getMilliseconds();
    var blob = new Blob([generateProjectXML()], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "iVoLVRProject_" + df + ".xml");
}

function loadiVoLVRProject() {
    var dataprojectFileInput = document.getElementById('dataprojectFileInput');
    dataprojectFileInput.click();
}

function deleteAllObjects() {

    if (canvas.getObjects().length) {
        alertify.confirm("Are you sure you want to remove all the objects?", function (e) {
            if (e) {
                canvas.clear().renderAll();
//                alertify.log("All objects removed", "", 3000);
            }
        });
    }
}

function deleteObject() {
    if (canvas.getActiveGroup()) {
        // confirm dialog
        alertify.confirm("Are you sure you want to remove all the selected objects?", function (e) {
            if (e) {
                canvas.getActiveGroup().forEachObject(function (o) {
                    canvas.remove(o);
                });
                canvas.discardActiveGroup().renderAll();
                alertify.log("Objects removed", "", 3000);
            }
        });
    } else if (canvas.getActiveObject()) {
        // confirm dialog
        alertify.confirm("Are you sure you want to remove the selected object?", function (e) {
            if (e) {
                var obj = canvas.getActiveObject();
                // If we are removing a widget, we should also remove the connectors associated to it
                if (obj.isWidget) {
                    removeWidget(obj);
                } else if (obj.isOutput) {
                    removeOutput(obj, null);
                } else if (obj.isConnector) {
                    removeConnector(obj);
                } else {
                    //                                canvas.remove(obj);                                
                    obj.remove();
                }

                canvas.renderAll();
                alertify.log("Object removed", "", 3000);
            }
        });
    } else {
        alertify.error("No objects selected");
    }
}

function duplicateObject() {

    if (canvas.getActiveGroup()) {
        alertify.error("Select only one object");
    } else {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {

            if (!activeObject.isMark && !activeObject.isImportedImage) {
                alertify.error("The selected object can not be cloned.");
                return;
            }

            var copy = null;
            if (activeObject.type === "importedImage") {
                var imageData = activeObject.getSrc();
                importImageToCanvas({imageData: imageData});
                return;
            } else if (activeObject.clone) {
                copy = activeObject.clone();
            } else {
                copy = fabric.util.object.clone(activeObject);
            }

            canvas.add(copy);
            var canvasActualCenter = getActualCanvasCenter();
            copy.setPositionByOrigin(canvasActualCenter, 'center', 'center');
            copy.setCoords();
            canvas.setActiveObject(copy);
            canvas.renderAll();
        } else {
            alertify.error("No objects selected");
        }
    }
}


// Reset Zoom
function resetZoom() {
    var canvasCenter = new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2);
    canvas.zoomToPoint(canvasCenter, 1);
    canvas.renderAll();
}

function displaywheel(e) {

    //                if (LOG) console.log(e);
    //                var delta = e.originalEvent.wheelDelta / 120;
    //                if (LOG) console.log(delta);

    var globscale = 1;
    //                var SCALE_FACTOR = 1.035;
    var SCALE_FACTOR = 1.025;
    var evt = window.event || e
    var delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta;
    var dd = 1;
    if (delta > 0) {
        dd = SCALE_FACTOR;
    } else {
        dd = 1 / SCALE_FACTOR;
    }
    globscale = globscale * dd;
    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    var xform = svg.createSVGMatrix();
    var pt = svg.createSVGPoint();
    pt.x = evt.offsetX || (evt.pageX - canvas.offsetLeft);
    pt.y = evt.offsetY || (evt.pageY - canvas.offsetTop);
    var zoomingPoint = pt.matrixTransform(xform.inverse());
    canvas.zoomToPoint(new fabric.Point(zoomingPoint.x, zoomingPoint.y), canvas.getZoom() * dd);
    //            var point = getCanvasCoordinates(e);
    //            drawRectAt(point, generateRandomColor());
    //            canvas.zoomToPoint(point, canvas.getZoom() * dd);
}



function readSVGFileAsData() {
    var dataSVGFileInput = document.getElementById('dataSVGFileInput');
    dataSVGFileInput.click();
}



function loadDatafile() {
    var dataimageFileInput = document.getElementById('dataimageFileInput');
    dataimageFileInput.click();
}



function loadSVGFile() {
    var svgimageFileInput = document.getElementById('svgimageFileInput');
    svgimageFileInput.click();
}

function onLoad() {
    var imageFileInput = document.getElementById('imageFileInput');
    imageFileInput.click();
}

function handleDatafiles(files) {
    var file = files[0];
    var reader = new FileReader();
    reader.onload = (function (file) {
        return function (evt) {
            onDataFileReadComplete(evt, file)
        };
    })(file);
    if (file) {
        reader.readAsText(file);
    }
}

function onDataFileReadComplete(event, file) {

    var fileContent = event.target.result;
    var isJSONFile = /(\.json)$/i;
    var isCSVFile = /(\.csv)$/i;
    var isXMLFile = /(\.xml)$/i;

    if (isJSONFile.exec(file.name)) {

        var aDataWidget = new DataWidget({
            fileName: file.name,
            JSONString: fileContent,
        });



        canvas.add(aDataWidget);

        var canvasActualCenter = getActualCanvasCenter();
        aDataWidget.left = canvasActualCenter.x;
        aDataWidget.top = canvasActualCenter.y;

        aDataWidget.setCoords();
        aDataWidget.parseJSONString();

    } else if (isCSVFile.exec(file.name)) {

        var aDataWidget = new DataWidget({
            fileName: file.name,
            CSVString: fileContent,
        });
        canvas.add(aDataWidget);

        var canvasActualCenter = getActualCanvasCenter();
        aDataWidget.left = canvasActualCenter.x;
        aDataWidget.top = canvasActualCenter.y;

        aDataWidget.setCoords();
        aDataWidget.parseCSVString();

    } else if (isXMLFile.exec(file.name)) {

        loadProjectXML(fileContent);

    } else {
        alertify.error("File type not supported!", "", 2000);
        return;
    }



}

function handleSVGFiles(files, asSingleMark) {
    var file = files[0];
    var reader = new FileReader();
    reader.onload = (function (file) {
        return function (evt) {
            onSVGFileReadComplete(evt, file, asSingleMark)
        };
    })(file);
    if (file) {
        reader.readAsText(file);
    }
}

function addMarkFromSVGString(file, SVGString) {

    fabric.loadSVGFromString(SVGString, function (objects, options) {

        if (LOG)
            console.log("Original options:");
        if (LOG)
            console.log(options);

        var canvasActualCenter = getActualCanvasCenter();
        var defaultOptions = {
            label: (typeof file !== 'undefined') ? file.name : '',
            markAsSelected: true,
            thePaths: objects,
            left: canvasActualCenter.x,
            top: canvasActualCenter.y,
            animateAtBirth: true,
            SVGString: SVGString
        };
        options = $.extend(true, {}, defaultOptions, options);

        if (LOG)
            console.log("Merged options:");
        if (LOG)
            console.log(options);

        addMarkToCanvas(SVGPATHGROUP_MARK, options);
    });

}

function onSVGFileReadComplete(event, file, asSingleMark) {

    // if (LOG) console.log("File name");
    // if (LOG) console.log(file.name);
    // if (LOG) console.log(event);        

    var SVGString = event.target.result;

    if (asSingleMark) {

        addMarkFromSVGString(file, SVGString);

    } else {

//        console.log("SVGString:");
//        console.log(SVGString);

        fabric.loadSVGFromString(SVGString, function (objects) {

            objects.forEach(function (object) {

                console.log("object:");
                console.log(object);

                object.stroke = 'transparent';
                object.strokeWidth = 0;
//                object.hasBorders = false;
//                object.hasControls = false;
                object.hasRotatingPoint = false;
                object.lockScalingX = true;
                object.lockScalingY = true;
                object.lockRotation = true;

                if (object._parseDimensions) {

                    updatePathCoords(object);

                    object.setCoords();

                }


            });

            canvas.add.apply(canvas, objects);

            canvas.setActiveObject(objects[1]);

            canvas.renderAll();
        });



    }



}

function handleImageFiles(files) {

    // if (LOG) console.log(files);

    var file = files[0];
    var reader = new FileReader();
    reader.onload = onImageFileReadComplete;
    if (file) {
        //reader.readAsText(file);
        reader.readAsDataURL(file);
    }
}

function onImageFileReadComplete(event) {
    var imageData = event.target.result;
    importImageToCanvas({imageData: imageData});
}

function downloadImageToServer(url, outFileName) {

    var request = new XMLHttpRequest(); // create a new request object to send to server    
    request.open("POST", "DownloadImageFromURL", true); // set the method and destination
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

    request.send("url=" + url + "&outFileName=" + outFileName); // sending the data to the server

}


function importImageToCanvas(options) {

    var img = new Image();

    img.onload = function () {

        var imgInstance = new fabric.Image(this, {
            originX: 'center',
            originY: 'center',
            angle: options.angle || 0,
            scaleX: options.scaleX || 1,
            scaleY: options.scaleY || 1,
            xmlID: options.xmlID || null,
            
//            lockScalingX: true,
//            lockScalingY: true,
            lockRotation: true,
            hasControls: false,
            hasRotatingPoint: false,
        });

        imgInstance.img = img;

        imgInstance.centeredRotation = true;

        imgInstance.type = "importedImage";
        imgInstance.isImage = true;
        imgInstance.isImportedImage = true;

        imgInstance.downTouchs = 0;
        imgInstance.widgets = new Array();

        imgInstance.set({
            borderColor: '#CC3333',
            //borderColor: canvas.backgroundColor,

            cornerColor: '#FFCC00',
            transparentCorners: false,
            cornerSize: 25,
            padding: 0,
            movingOpacity: 0.65,
            permanentOpacity: 1,
            opacity: 1,
        });

        imgInstance.selectable = true;

        canvas.add(imgInstance);

        var canvasActualCenter = getActualCanvasCenter();
        options.left = options.left || canvasActualCenter.x;
        options.top = options.top || canvasActualCenter.y;

        imgInstance.left = options.left;
        imgInstance.top = options.top;

        imgInstance.setCoords();

        var d = new Date();
        var df = d.getMonth() + '_' + d.getDate() + '_' + d.getYear() + '_' + (d.getHours() + 1) + '_' + d.getMinutes() + '_' + d.getSeconds() + '_' + d.getMilliseconds();

        imgInstance.id = options.id || df;

        if (isValidURL(img.src)) { // this means that the src attribute of the given image does not store the data itself, but a URL 

            var url = img.src;

            // In this case, we have to download the corresponding image and store it in the server to make it available for the processing tasks that will be performed on it
            downloadImageToServer(url, imgInstance.id);

        } else {

            var request = new XMLHttpRequest();
            request.open("POST", "UploadFile", true);
            var boundary = Math.random().toString().substr(2);
            request.setRequestHeader("content-type", "multipart/form-data; charset=utf-8; boundary=" + boundary);
            var multipart = "--" + boundary + "\r\n" +
                    "Content-Disposition: form-data; name=" + imgInstance.id + "\r\n" +
                    "Content-type: image/png\r\n\r\n" +
                    //                            imgInstance.toDataURL({multiplier: 1}) + "\r\n" +
                    img.src + "\r\n" +
                    "--" + boundary + "--\r\n";

//            if (LOG)
//                console.log(imgInstance.toDataURL({multiplier: 1}));

            request.onreadystatechange = function () {
                if (request.readyState === 4) { // has the data arrived?
                    if (request.status === 200) { // is everything OK?
                        var textResponse = request.responseText; // getting the result
                        imgInstance.set({stroke: '#CC3333'});
                    }
                }
            };

            request.send(multipart);

        }

        imgInstance.on('mouseup', function (option) {
            objectMouseup(option, imgInstance);
        });

        imgInstance.on('modified', function (option) {
            objectModified(option, imgInstance);
        });
        imgInstance.on('moving', function (option) {
            objectMoving(option, imgInstance);
        });
        imgInstance.on('rotating', function (option) {
            objectRotating(option, imgInstance);
        });
        imgInstance.on('scaling', function (option) {
            objectScaling(option, imgInstance);
        });
        imgInstance.on('selected', function (option) {
            objectSelected(option, imgInstance);
        });

        imgInstance.setXmlIDs = function (from) {
            imgInstance.xmlID = from++;
            imgInstance.widgets.forEach(function (widget) {
                if (widget.isSVGPathVixor) {
                    from = widget.setXmlIDs(from);
                }
            });
            return from;
        };

        imgInstance.toXML = function () {
            var imageNode = createXMLElement("importedImage");
            addAttributeWithValue(imageNode, "xmlID", imgInstance.xmlID);
            addAttributeWithValue(imageNode, "id", imgInstance.id);

            appendElementWithValue(imageNode, "left", imgInstance.left);
            appendElementWithValue(imageNode, "top", imgInstance.top);
            appendElementWithValue(imageNode, "scaleX", imgInstance.scaleX);
            appendElementWithValue(imageNode, "scaleY", imgInstance.scaleY);
            appendElementWithValue(imageNode, "angle", imgInstance.angle);
            appendElementWithValue(imageNode, "imageData", imgInstance.img.src);

            if (imgInstance.widgets && imgInstance.widgets.length > 0) {
                var extractorsNode = createXMLElement("extractorsOptions");
                addAttributeWithValue(extractorsNode, "type", "array");
                imgInstance.widgets.forEach(function (widget) {
                    if (widget.isSVGPathVixor || widget.isTextualVixor || widget.isSamplerVixor) {
                        var extractorNode = widget.toXML();
                        extractorsNode.append(extractorNode);
                    }
                });
                imageNode.append(extractorsNode);
            }
            return imageNode;
        };

        imgInstance.executePendingConnections = function () {
            imgInstance.widgets.forEach(function (widget) {
                if (widget.isSVGPathVixor) {
                    widget.executePendingConnections();
                }
            });
        };

        var extractors = options.extractorsOptions;
        if (extractors) {
            extractors.forEach(function (extractorOptions) {

                console.log("%c extractorOptions", "background: rgb(90,61,96); color: white;");
                console.log(extractorOptions);

                var extractorType = extractorOptions.extractorType;
                var theVixor = null;

                extractorOptions.parentObject = imgInstance;

                if (extractorType === COLOR_REGION_EXTRACTOR) {

                    extractorOptions.fill = extractorOptions.fillColor;
                    extractorOptions.finalOptions = {left: extractorOptions.left, top: extractorOptions.top, scaleX: imgInstance.getScaleX(), scaleY: imgInstance.getScaleY()};
                    extractorOptions.thePath = extractorOptions.values.shape.path;
                    extractorOptions.angle = imgInstance.getAngle();

                    theVixor = addVixorToCanvas(extractorOptions.extractorType, extractorOptions);


                } else if (extractorType === SAMPLER_VIXOR) {

                    theVixor = buildAndAddSamplerColor(extractorOptions);

                }

                imgInstance.widgets.push(theVixor);

            });
        }

        if (typeof options.xmlID !== 'undefined') {
            imgInstance.executePendingConnections();
        }

        disableDrawingMode();


        canvas.setActiveObject(imgInstance);



        var topLeft = imgInstance.getPointByOrigin('left', 'top');
        if (LOG)
            console.log("Image topLeft at before zoom:");
        if (LOG)
            console.log(topLeft);



    };
    img.src = options.imageData;

}

function isMarkShape(string) {
    return string === CIRCULAR_MARK ||
            string === RECTANGULAR_MARK ||
            string === ELLIPTIC_MARK ||
            string === FATFONT_MARK ||
            string === FILLEDPATH_MARK ||
            string === SVGPATHGROUP_MARK;
}

function isHexColor(string) {
    return /^#[0-9A-F]{6}$/i.test(string);
}

function isRGBColor(string) {
    return /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*[\d\.]+)?\s*\)$/.test(string);
}

function pointInPolygon(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect)
            inside = !inside;
    }

    return inside;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function getImportedImageContaining(point) {
//    var theObject = null;
//    canvas.forEachObject(function (object) {
//        var point = new fabric.Point(x, y);
//        if (object.type == "importedImage" && object.containsPoint(point)) {
//            theObject = object;
//        }
//    });
//    return theObject;


    var theObject = null;

//    drawRectAt(point, "aqua");
//    if (LOG) console.log(point);
//    if (LOG) console.log("FUNCTION getObjectContaining");

    canvas.forEachObject(function (object) {

        if (object.type == "importedImage") {

            var topLeft = object.getPointByOrigin('left', 'top');
            var bottomRigth = object.getPointByOrigin('right', 'bottom');
            var bottomLeft = object.getPointByOrigin('left', 'bottom');
            var topRigth = object.getPointByOrigin('right', 'top');

            var polygon = [[topLeft.x, topLeft.y], [topRigth.x, topRigth.y], [bottomRigth.x, bottomRigth.y], [bottomLeft.x, bottomLeft.y]];

            if (pointInPolygon([point.x, point.y], polygon)) {
                theObject = object;
            }

        }

    });

    return theObject;

}

function rgb(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function darkenrgb(r, g, b) {
    return 'rgb(' + (r * 0.75).toFixed(0) + ',' + (g * 0.75).toFixed(0) + ',' + (b * 0.75).toFixed(0) + ')';
}


var findSelfIntersects = function (coordinates) {

    var geometryFactory = new jsts.geom.GeometryFactory();
    var shell = geometryFactory.createLinearRing(coordinates);
    var jstsPolygon = geometryFactory.createPolygon(shell);

    // if the geometry is aleady a simple linear ring, do not
    // try to find self intersection points.
    var validator = new jsts.operation.IsSimpleOp(jstsPolygon);
    if (validator.isSimpleLinearGeometry(jstsPolygon)) {
        return;
    }

    var res = [];
    var graph = new jsts.geomgraph.GeometryGraph(0, jstsPolygon);


    var pepe = graph.computeSelfNodes(new jsts.algorithm.LineIntersector());
    if (LOG)
        console.log("%c" + pepe, "background: #000000; color: #00ff00");
    if (LOG)
        console.log(pepe);

    var cat = new jsts.operation.valid.ConsistentAreaTester(graph);
    var r = cat.isNodeConsistentArea();



    if (!r) {
        var pt = cat.getInvalidPoint();
        res.push([pt.x, pt.y]);
    }
    return res;
};


function PointIsOnLine(start, end, point) {
    var startX = start.x;
    var startY = start.y;
    var endX = end.x;
    var endY = end.y;
    var px = point.x;
    var py = point.y;
    var f = function (somex) {
        return (endY - startY) / (endX - startX) * (somex - startX) + startY;
    };
    return Math.abs(f(px) - py) < 1e-6 // tolerance, rounding errors
            && px >= startX && px <= endX;      // are they also on this segment?
}




function hammerEventOverCanvas(ev) {
    for (i = 0; i < ev.pointers.length; i++) {
        var x = ev.pointers[i].pageX - $('#theCanvas').offset().left;
        var y = ev.pointers[i].pageY - $('#theCanvas').offset().top;
        var targetObject = getObjectContaining(x, y);
        if (targetObject) {
//            if (LOG) console.log(targetObject);
            return false;
        }
    }
    return true;
}

//function containsPoint(point, topLeft, bottomRigth) {
//    return (point.x > topLeft.x && point.x < bottomRigth.x) && (point.y > topLeft.y && point.y < bottomRigth.y);
//}






// allowedTypes is an array of strings that will indicate allowed parameters to test
function findPotentialDestination(point, allowedTypes) {
    var canvasObjects = canvas.getObjects();
    for (var i = 0; i < canvasObjects.length; i++) {
        var object = canvas.item(i);
        for (var j = 0; j < allowedTypes.length; j++) {
            var type = allowedTypes[j];
            if (object[type]) {

                //  The current object is, indeed, of one of the required types
                var topLeft = object.getPointByOrigin('left', 'top');
                var bottomRigth = object.getPointByOrigin('right', 'bottom');
                var bottomLeft = object.getPointByOrigin('left', 'bottom');
                var topRigth = object.getPointByOrigin('right', 'top');

                var polygon = [[topLeft.x, topLeft.y], [topRigth.x, topRigth.y], [bottomRigth.x, bottomRigth.y], [bottomLeft.x, bottomLeft.y]];

                if (pointInPolygon([point.x, point.y], polygon)) {
                    return object;
                }


            }
        }
    }
}




function findVisualVariablePotentialDestination(point) {

    var theObject = null;

//    drawRectAt(point, "aqua");
//    if (LOG) console.log(point);
//    if (LOG) console.log("FUNCTION getObjectContaining");

    canvas.forEachObject(function (object) {

        if (object.isVisualProperty || object.isOperator) {

            var topLeft = object.getPointByOrigin('left', 'top');
            var bottomRigth = object.getPointByOrigin('right', 'bottom');
            var bottomLeft = object.getPointByOrigin('left', 'bottom');
            var topRigth = object.getPointByOrigin('right', 'top');

            var polygon = [[topLeft.x, topLeft.y], [topRigth.x, topRigth.y], [bottomRigth.x, bottomRigth.y], [bottomLeft.x, bottomLeft.y]];

            if (pointInPolygon([point.x, point.y], polygon)) {
                theObject = object;
            }

        }

    });

    return theObject;
}







function findVisualPropertyPotentialDestination(point) {

    var theObject = null;

//    drawRectAt(point, "aqua");
//    if (LOG) console.log(point);
//    if (LOG) console.log("FUNCTION getObjectContaining");

    canvas.forEachObject(function (object) {

        if (object.isAggregator || object.isVisualProperty || object.isOperator || object.isMark || object.isFunctionInput || object.isPlayer) {

            var topLeft = object.getPointByOrigin('left', 'top');
            var bottomRigth = object.getPointByOrigin('right', 'bottom');
            var bottomLeft = object.getPointByOrigin('left', 'bottom');
            var topRigth = object.getPointByOrigin('right', 'top');

            var polygon = [[topLeft.x, topLeft.y], [topRigth.x, topRigth.y], [bottomRigth.x, bottomRigth.y], [bottomLeft.x, bottomLeft.y]];

//            drawRectAt(topLeft, "green");
//            drawRectAt(bottomRigth, "red");
//            drawRectAt(bottomLeft, "yellow");
//            drawRectAt(topRigth, "blue");

            if (pointInPolygon([point.x, point.y], polygon)) {
                theObject = object;
            }

        }

    });

    return theObject;
}


function getObjectContaining(point) {

    var theObject = null;

//    drawRectAt(point, "aqua");
//    if (LOG) console.log(point);
//    if (LOG) console.log("FUNCTION getObjectContaining");

    canvas.forEachObject(function (object) {

        if (object.isImage || object.isOutput || object.isOperator || object.isClickable || object.isAggregator || object.isPlayer || object.isVisualProperty || object.isVisualVariable || object.isFunctionInput) {

            var topLeft = object.getPointByOrigin('left', 'top');
            var bottomRigth = object.getPointByOrigin('right', 'bottom');
            var bottomLeft = object.getPointByOrigin('left', 'bottom');
            var topRigth = object.getPointByOrigin('right', 'top');

            var polygon = [[topLeft.x, topLeft.y], [topRigth.x, topRigth.y], [bottomRigth.x, bottomRigth.y], [bottomLeft.x, bottomLeft.y]];

//            drawRectAt(topLeft, "green");
//            drawRectAt(bottomRigth, "red");
//            drawRectAt(bottomLeft, "yellow");
//            drawRectAt(topRigth, "blue");

            if (pointInPolygon([point.x, point.y], polygon)) {
                theObject = object;
            }

        }

    });

    return theObject;
}

//function getObjectContaining(x, y) {
//    var theObject = null;
//    var point = new fabric.Point(x, y);
//    canvas.forEachObject(function(object) {
//        if ((object.isImage || object.isOutput || object.isOperator) && object.containsPoint(point)) {
//            theObject = object;
//        }
//    });
//    return theObject;
//}


function buildRotatedRect(from, to) {

    var x1 = from.x;
    var y1 = from.y;
    var x2 = to.x;
    var y2 = to.y;
    var deltaX = x2 - x1;
    var deltaY = y2 - y1;

    var length = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    var center = new fabric.Point(x1 + deltaX / 2, y1 + deltaY / 2);
    var angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

    var rect = new fabric.Rect({
        originX: 'center',
        originY: 'center',
        left: center.x,
        top: center.y,
        angle: angle,
        width: length,
        height: 30,
        fill: generateRandomColor(),
        stroke: '#CC3333',
        borderColor: '#CC3333',
        cornerColor: '#FFCC00',
        transparentCorners: false,
        cornerSize: 10,
        radius: 0
    });

    return rect;

}


function repositionAllWidgets(targetObject) {

    // Relocating all the widgets associated to this object
    targetObject.widgets.forEach(function (widget) {

        var newWidgetLocation = computeWidgetPosition(widget);

//        widget.scaleX = targetObject.scaleX;
//        widget.scaleY = targetObject.scaleY;
//        var newXScale = widget.untransformedScaleX * targetObject.scaleX;
//        var newYScale = widget.untransformedScaleY * targetObject.scaleY;


        var newXScale = widget.untransformedScaleX * targetObject.getScaleX();




        var newYScale = widget.untransformedScaleY * targetObject.getScaleY();



//        if (LOG) console.log("newXScale: " + newXScale);
//        if (LOG) console.log("newYScale: " + newYScale);

        widget.scaleX = newXScale;
        widget.scaleY = newYScale;

        widget.angle = targetObject.getAngle() + widget.untransformedAngle;

        widget.set({
            left: newWidgetLocation.x,
            top: newWidgetLocation.y
        });

        if (targetObject.selectable && targetObject.evented) {

//         if (LOG) console.log("widget:");
//         if (LOG) console.log(widget);

            if (widget.movingOpacity !== 'undefined') {
                widget.opacity = widget.movingOpacity;
            } else {
                widget.opacity = 0.6;
            }

        }


        widget.setCoords();

        if (widget.positionElements) {
            widget.positionElements();
        } else if (widget.connectors) {
            widget.connectors.forEach(function (connector) {
                connector.set({x1: widget.left, y1: widget.top});
            });
        }

        // This happens, for instance, for the SamplerVixor, which has its own widgets
        if (widget.widgets) {
            repositionAllWidgets(widget);
        }

    });

}

function repositionWidget(parent, child) {

    // Relocating all the widgets associated to this object


    var newWidgetLocation = computeWidgetPosition(child, parent);

//        widget.scaleX = targetObject.scaleX;
//        widget.scaleY = targetObject.scaleY;
//        var newXScale = widget.untransformedScaleX * targetObject.scaleX;
//        var newYScale = widget.untransformedScaleY * targetObject.scaleY;

    var newXScale = child.untransformedScaleX * parent.getScaleX();
    var newYScale = child.untransformedScaleY * parent.getScaleY();

//        if (LOG) console.log("newXScale: " + newXScale);
//        if (LOG) console.log("newYScale: " + newYScale);

    child.scaleX = newXScale;
    child.scaleY = newYScale;

    child.angle = parent.getAngle() + child.untransformedAngle;

    child.set({
        left: newWidgetLocation.x,
        top: newWidgetLocation.y
    });
    child.setCoords();

    if (child.connectors) {
        child.connectors.forEach(function (connector) {
            connector.set({x1: child.left, y1: child.top});
        });
    }


}

function computeUntransformedProperties(child, parent) {

//    console.log("widget:");
//    console.log(child);

//    if (LOG)
//        console.log("%ccomputeUntransformedProperties", "background: #ff1ed3; color: black;");

    parent = parent || child.parentObject;
    var angleInDegrees = 360 - parent.getAngle();
    var angleInRadians = fabric.util.degreesToRadians(angleInDegrees);
    var parentTopLeft = parent.getPointByOrigin('left', 'top');

    /*console.log("parentObject:");
     console.log(parentObject);
     
     console.log("angleInDegrees:");
     console.log(angleInDegrees);
     
     console.log("angleInRadians:");
     console.log(angleInRadians);
     
     console.log("parentTopLeft:");
     console.log(parentTopLeft);*/

//    drawRectAt(parentTopLeft, 'black');

//    canvas.add(new fabric.Rect({
//        left: topLeft.x,
//        top: topLeft.y,
//        fill: '',
//        stroke: 'blue',
//        perPixelTargetFind: true,
//        width: parentObject.getWidth(),
//        height: parentObject.getHeight()
//    }));

//    var widgetCenter = widget.getPointByOrigin('center', 'center');
    var widgetCenter = child.getCenterPoint();

//    console.log("widgetCenter:");
//    console.log(widgetCenter);


    var widgetTopLeft = child.getPointByOrigin('left', 'top');

//    drawRectAt(widgetTopLeft, 'pink');
//    if (LOG) console.log("widgetTopLeft:");
//    if (LOG) console.log(widgetTopLeft);


//    if (LOG) console.log(widgetTopLeft);



//    drawRectAt(widgetTopLeft, 'blue');
//    drawRectAt(widgetCenter, 'red');

    var rotatedWidgetCenter = fabric.util.rotatePoint(new fabric.Point(widgetCenter.x, widgetCenter.y), parentTopLeft, angleInRadians);



//    var rotatedWidgetTopLeft = fabric.util.rotatePoint(widgetTopLeft, topLeft, fabric.util.degreesToRadians(-parentObject.getAngle()));


    var rotatedWidgetTopLeft = fabric.util.rotatePoint(new fabric.Point(widgetTopLeft.x, widgetTopLeft.y), parentTopLeft, fabric.util.degreesToRadians(360 - parent.getAngle()));

//    drawRectAt(rotatedWidgetCenter, 'green');
//    drawRectAt(rotatedWidgetTopLeft, 'purple');




//    drawRectAt(topLeft, 'black');
//
//    if (LOG) console.log("PARENT topLeft:");
//    if (LOG) console.log(topLeft);


    if (child.type === "path" || child.isTextualVixor || child.isEllipticMark || child.isSamplerVixor) {

//        if (LOG) console.log("%c REPOSITIONING A PATH: ", "background: blue; color: white;");
//        if (LOG) console.log("%cAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "background: blue; color: white;");

        child.untransformedX = (rotatedWidgetCenter.x - parentTopLeft.x - child.getWidth() / 2 - parent.strokeWidth / 2) / parent.getScaleX();
        child.untransformedY = (rotatedWidgetCenter.y - parentTopLeft.y - child.getHeight() / 2 - parent.strokeWidth / 2) / parent.getScaleY();

    } else if (child.figureType === "Rectangle") {

//        if (LOG) console.log("%c HERE: ", "background: blue; color: white;");
//        if (LOG) console.log("%cBBBBBBBBBBBBBBBBBBBBBBBBBBB", "background: blue; color: white;");

        child.untransformedX = (rotatedWidgetCenter.x - parentTopLeft.x - child.getWidth()) / parent.getScaleX();
        child.untransformedY = (rotatedWidgetCenter.y - parentTopLeft.y - child.getHeight()) / parent.getScaleY();


    } else if (child.isMark && child.parentObject.isLocator) {

//        if (LOG)
//            console.log("%cEEEEEEEEEEEEEEEEEEEEEEEE", "background: pink; color: blue;");

//        if (LOG) {
//            console.log("rotatedWidgetCenter.x");
//            console.log(rotatedWidgetCenter.x);
//
//            console.log("parentTopLeft.x:");
//            console.log(parentTopLeft.x);
//
//            console.log("widget.getWidth():");
//            console.log(widget.getWidth());
//
//            console.log("parentObject.getScaleX():");
//            console.log(parentObject.getScaleX());
//        }


        child.untransformedX = (rotatedWidgetCenter.x - parentTopLeft.x - child.getWidth() / 2 - 1.5) / parent.getScaleX();
        child.untransformedY = (rotatedWidgetCenter.y - parentTopLeft.y - child.getHeight() / 2 - 1.5) / parent.getScaleY();

    } else if (child.figureType === "functionSlider") {

//        if (LOG) console.log("%cCCCCCCCCCCCCCCCCCCCCC", "background: red; color: white;");
//       if (LOG) console.log("%c AQUIIIIIIIIIIII", "background: red; color: white;");

        child.untransformedX = (rotatedWidgetCenter.x - parentTopLeft.x - child.getWidth() / 2 - 1.5) / parent.getScaleX();
        child.untransformedY = (rotatedWidgetCenter.y - parentTopLeft.y - child.getHeight() / 2 - 1.5) / parent.getScaleY();





    } else {



//        if (LOG) console.log("%cDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", "background: red; color: white;");
//        if (LOG) console.log("%c AQUIIIIIIIIIIII", "background: red; color: white;");

//        drawRectAt(rotatedWidgetCenter, "red");
//        drawRectAt(topLeft, "blue");



//        if (LOG) console.log("%c widget.getWidth(): " + widget.getWidth(), "background: red; color: white;");


//        drawRectAt(rotatedWidgetTopLeft, 'yellow');

        var untransformedX = (rotatedWidgetTopLeft.x - parentTopLeft.x - parent.strokeWidth / 2 + child.strokeWidth / 2) / parent.getScaleX();
        var untransformedY = (rotatedWidgetTopLeft.y - parentTopLeft.y - parent.strokeWidth / 2 + child.strokeWidth / 2) / parent.getScaleY();
//        if (LOG) console.log("%c untransformedX: " + untransformedX, "background: brown; color: white;");
//        if (LOG) console.log("%c untransformedY: " + untransformedY, "background: brown; color: white;");




        child.untransformedX = untransformedX;
        child.untransformedY = untransformedY;

//        drawRectAt(new fabric.Point(untransformedX, untransformedY), "blue");


//        widget.untransformedX = (rotatedWidgetCenter.x - topLeft.x - widget.getWidth() / 2 - parentObject.strokeWidth/2 ) / parentObject.getScaleX();
//        widget.untransformedY = (rotatedWidgetCenter.y - topLeft.y - widget.getHeight() / 2 - parentObject.strokeWidth/2 ) / parentObject.getScaleY();
//
//
//        if (LOG) console.log("%c widget.strokeWidth: " + widget.strokeWidth, "background: black; color: white;");
//        if (LOG) console.log("%c parentObject.strokeWidth: " + parentObject.strokeWidth, "background: black; color: white;");
//
//        if (LOG) console.log("%c widget.untransformedX: " + widget.untransformedX, "background: red; color: white;");
//        if (LOG) console.log("%c widget.untransformedY: " + widget.untransformedY, "background: red; color: white;");

    }

    child.untransformedAngle = child.getAngle() - parent.getAngle();

//    if (LOG) console.log("widget.untransformedAngle:");
//    if (LOG) console.log(widget.untransformedAngle);




    var rotatedRect = new fabric.Rect({
        left: child.untransformedX + (child.getWidth() / parent.getScaleX()) / 2,
        top: child.untransformedY + (child.getHeight() / parent.getScaleY()) / 2,
        originX: 'center',
        originY: 'center',
        fill: generateRandomColor(),
        width: child.getWidth() / parent.getScaleX(),
        height: child.getHeight() / parent.getScaleY(),
        angle: child.getAngle() - parent.getAngle()
    });


//    var clonedRotatedRect = fabric.util.object.clone(rotatedRect);
//    clonedRotatedRect.setLeft (clonedRotatedRect.getLeft() + 10);
//    clonedRotatedRect.setTop (clonedRotatedRect.getTop() + 10);
//    canvas.add(clonedRotatedRect);

    var rotatedRectTopLeft = rotatedRect.getPointByOrigin('left', 'top');

    child.roi = {x: rotatedRectTopLeft.x, y: rotatedRectTopLeft.y, width: child.getWidth() / parent.getScaleX(), height: child.getHeight() / parent.getScaleY(), angle: rotatedRect.angle};








//    widget.roi = {x: widgetTopLeft.x, y: widgetTopLeft.y, width: widget.width, height: widget.height, angle: rotatedRect.angle};


}

function computeWidgetPosition(widget, parent) {

    var x = widget.untransformedX;
    var y = widget.untransformedY;

    var p = new fabric.Point(x, y);
//    drawRectAt(p, "purple");


    parent = parent || widget.parentObject;

//    if (LOG) console.log("targetObject:");
//    if (LOG) console.log(targetObject);


    var scaleX = parent.getScaleX();
    var scaleY = parent.getScaleY();

    var angleInDegrees = 360 - parent.getAngle();
    var angleInRadians = fabric.util.degreesToRadians(angleInDegrees);

    var finalX, finalY;

    if (widget.type == "triangle") {
//        if (LOG) console.log("000000000000");
        finalX = (x * scaleX) + ((parent.getLeft() - parent.getWidth() / 2 - widget.getWidth() / 2 - widget.strokeWidth));
        finalY = (y * scaleY) + ((parent.getTop() - parent.getHeight() / 2 + widget.getHeight() / 2));

        drawRectAt(widget.getPointByOrigin('left', 'top'), "blue");

    } else if (widget.isBlobCounter) {
//        if (LOG) console.log("1111111111");
        finalX = (x * scaleX) + ((parent.getLeft() - parent.getWidth() / 2));
        finalY = (y * scaleY) + ((parent.getTop() - parent.getHeight() / 2));

        drawRectAt(widget.getPointByOrigin('left', 'top'), "blue");

    } else if (widget.isColorSelector) {
//        if (LOG) console.log("2222222222");
        finalX = (x * scaleX) + ((parent.getLeft() - parent.getWidth() / 2) + widget.width * scaleX / 2);
        finalY = (y * scaleY) + ((parent.getTop() - parent.getHeight() / 2) + widget.height * scaleY / 2);

    } else if (widget.isVisualProperty && widget.parentObject.isLocator) {
//        if (LOG) console.log("33333333333");
        finalX = (x * scaleX) + parent.getLeft();
        finalY = (y * scaleY) + parent.getTop();

//        drawRectAt(new fabric.Point(parent.getLeft(), parent.getTop()), "blue");

    } else /* if (widget.isTextRecognizer) */ {
//        if (LOG) console.log("44444444444");
        // This should happen when, for instance, the widget is a text recognizer
        finalX = (x * scaleX) + ((parent.getLeft() - parent.getWidth() / 2) + widget.getWidth() / 2);
        finalY = (y * scaleY) + ((parent.getTop() - parent.getHeight() / 2) + widget.getHeight() / 2);



    }

    var rotationCenter = new fabric.Point(parent.getLeft() - parent.getWidth() / 2, parent.getTop() - parent.getHeight() / 2);
    var newRotationCenter = fabric.util.rotatePoint(new fabric.Point(rotationCenter.x, rotationCenter.y), parent.getCenterPoint(), -angleInRadians);

    var diffX = rotationCenter.x - newRotationCenter.x;
    var diffY = rotationCenter.y - newRotationCenter.y;

    var widgetCenter = new fabric.Point(finalX, finalY);
//    widgetCenter = fabric.util.rotatePoint(widgetCenter, rotationCenter, -angleInRadians);
    widgetCenter = fabric.util.rotatePoint(new fabric.Point(widgetCenter.x, widgetCenter.y), rotationCenter, -angleInRadians);
    widgetCenter.x = widgetCenter.x - diffX;
    widgetCenter.y = widgetCenter.y - diffY;

    finalX = widgetCenter.x;
    finalY = widgetCenter.y;



    var point = new fabric.Point(finalX, finalY);

    return point;

}


function getElementsOccurrenceCounts(array) {
    var elements = [], counts = [], prev;
    array.sort();
    for (var i = 0; i < array.length; i++) {
        if (array[i] !== prev) {
            elements.push(array[i]);
            counts.push(1);
        } else {
            counts[counts.length - 1]++;
        }
        prev = array[i];
    }
    return [elements, counts];
}

function recordAllObjectsCoordinatesForPanning() {
    canvas.getObjects().forEach(function (object) {
        object.leftForPanning = object.left;
        object.topForPanning = object.top;
    });
}

function translateAllObjects(deltaX, deltaY) {
    canvas.getObjects().forEach(function (object) {
        object.left = object.leftForPanning + deltaX;
        object.top = object.topForPanning + deltaY;
        object.setCoords();
        if (object.isOutput) {
            outputUpdateComponents(object, null);
        }
    });
    canvas.renderAll();
}

function canvasDeselectAllObjects() {
    canvas.getObjects().forEach(function (object) {

        if (object && object.applyUnselectedStyle) {
            object.applyUnselectedStyle(true);
        }

//      if (object.isOutput || object.isOperator || object.isFunction) {
//         object.applyUnselectedStyle(true);
//
//      }

        else if (object && object.isWidget) {
            widgetApplyUnselectedStyle(object);
        }
    });
}

function getPotentialDateString(recognizedStrings) {

}

function getMode(array) {
    if (array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for (var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if (modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if (modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

function getLastElementOfArray(array) {
    return array[array.length - 1];
}

fabric.Canvas.prototype.getAbsoluteCoords = function (object) {
    return {
        left: object.left + this._offset.left,
        top: object.top + this._offset.top
    };
}

function generateRandomColor() {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16);
}

function drawRectAt(point, color, noRefresh) {
    if (!color) {
        color = 'red';
    }
//    if (LOG) console.log("FUNCTION drawRectAt");
    var rect = new fabric.Rect({
        originX: 'center',
        originY: 'center',
        left: point.x,
        top: point.y,
        fill: color,
        width: 8,
        height: 8
    });
    canvas.add(rect);
    if (!noRefresh) {
        canvas.bringToFront(rect);
        canvas.renderAll();
    }
    return rect;
}

function makeLine(coords) {
    var line = new fabric.Line(coords, {
        originX: 'center',
        originY: 'center',
        fill: 'red',
        stroke: 'red',
        strokeWidth: 1,
        selectable: false
    });
    canvas.add(line);
    canvas.renderAll();
    return line;
}



function getConnectorsCrossedByLine(line) {
    var results = new Array();
    canvas.forEachObject(function (object) {
        if (object.isConnector) {
            var intersection = getIntersection(line, object);
            if (intersection) {
                results.push({connector: object, splitPoint: intersection});
            }
        }
    });
    return results;
}

function getIntersection(line1, line2) {

    var lineIntersector = new jsts.algorithm.RobustLineIntersector();
    var p1 = new jsts.geom.Coordinate(line1.x1, line1.y1);
    var p2 = new jsts.geom.Coordinate(line1.x2, line1.y2);
    var q1 = new jsts.geom.Coordinate(line2.x1, line2.y1);
    var q2 = new jsts.geom.Coordinate(line2.x2, line2.y2);

    lineIntersector.computeIntersection(p1, p2, q1, q2);

    if (lineIntersector.hasIntersection()) {
        return lineIntersector.getIntersection(0);
    }
    return null;
}

function getScreenCoordinates(canvasPoint) {
    var xCanvas, yCanvas, xPage, yPage;
    var xCanvas = canvasPoint.x;
    var yCanvas = canvasPoint.y;
    var viewportLeft = canvas.viewportTransform[4];
    var viewportTop = canvas.viewportTransform[5];
    xPage = xCanvas * canvas.getZoom() + viewportLeft + $('#theCanvas').offset().left;
    yPage = yCanvas * canvas.getZoom() + viewportTop + $('#theCanvas').offset().top;
    return new fabric.Point(xPage, yPage);
}

// This function computes the canvas coordinates of an fabric mouse or touch event taking into consideration the zoom leven of the canvas and any translation that has been done
function getCanvasCoordinates(fabricEvent) {

    var xCanvas, yCanvas, xPage, yPage;
    var viewportLeft = canvas.viewportTransform[4];
    var viewportTop = canvas.viewportTransform[5];

    if (fabricEvent.changedTouches && fabricEvent.changedTouches.length > 0) {
        // If here, this is a touch event
        xPage = fabricEvent.changedTouches[0].pageX;
        yPage = fabricEvent.changedTouches[0].pageY;
    } else {
        // If here, this was a mouse event
        xPage = fabricEvent.pageX;
        yPage = fabricEvent.pageY;
    }

    xCanvas = (xPage - viewportLeft - $('#theCanvas').offset().left) / canvas.getZoom();
    yCanvas = (yPage - viewportTop - $('#theCanvas').offset().top) / canvas.getZoom();

    return new fabric.Point(xCanvas, yCanvas);

}

function getCanvasCoordinatesFromTouch(touch) {

    var xCanvas, yCanvas, xPage, yPage;
    var viewportLeft = canvas.viewportTransform[4];
    var viewportTop = canvas.viewportTransform[5];

    xPage = touch.pageX;
    yPage = touch.pageY;

    xCanvas = (xPage - viewportLeft - $('#theCanvas').offset().left) / canvas.getZoom();
    yCanvas = (yPage - viewportTop - $('#theCanvas').offset().top) / canvas.getZoom();

    return new fabric.Point(xCanvas, yCanvas);

}

function gestureSetEnabled(hammerManager, gestureName, status) {
    hammerManager.get(gestureName).set({enable: status});
}

function hideConnectors() {
    canvas.connectorsHidden = true;
    if (LOG)
        console.log("hidding connectors");
    canvas.forEachObject(function (object) {
        if (object.isConnector) {
            object.hide();
        }
    });
    canvas.renderAll();
}

function showConnectors() {
    canvas.connectorsHidden = false;
    if (LOG)
        console.log("showing connectors");
    canvas.forEachObject(function (object) {
        if (object.isConnector) {
            object.show();
        }
    });
    canvas.renderAll();
}

function expandMarks() {
    var markWithMoreVisualProperties = null;
    var maxVisualProperties = -1;
    var allTheMarks = new Array();
    canvas.forEachObject(function (object) {
        if (object.isMark) {
            allTheMarks.push(object);
            if (object.visualProperties.length > maxVisualProperties) {
                markWithMoreVisualProperties = object;
                maxVisualProperties = object.visualProperties.length;
            }
        }
    });

//    if (LOG) console.log(allTheMarks);

    fabric.util.removeFromArray(allTheMarks, markWithMoreVisualProperties);

//    if (LOG) console.log(allTheMarks);

    allTheMarks.push(markWithMoreVisualProperties);

//    if (LOG) console.log(allTheMarks);

    var i = 0;
    for (i = 0; i < allTheMarks.length; i++) {
        allTheMarks[i].expand(i == allTheMarks.length - 1);
    }
}

function compressMarks() {
    var markWithMoreVisualProperties = null;
    var maxVisualProperties = -1;
    var allTheMarks = new Array();
    canvas.forEachObject(function (object) {
        if (object.isMark) {
            allTheMarks.push(object);
            if (object.visualProperties.length > maxVisualProperties) {
                markWithMoreVisualProperties = object;
                maxVisualProperties = object.visualProperties.length;
            }
        }
    });

//    if (LOG) console.log(allTheMarks);

    fabric.util.removeFromArray(allTheMarks, markWithMoreVisualProperties);

//    if (LOG) console.log(allTheMarks);

    allTheMarks.push(markWithMoreVisualProperties);

//    if (LOG) console.log(allTheMarks);

    var i = 0;
    for (i = 0; i < allTheMarks.length; i++) {
        allTheMarks[i].compress(i == allTheMarks.length - 1);
    }
}





function translateShape(shape, x, y) {
    var rv = [];
    for (p in shape)
        rv.push([shape[p][0] + x, shape[p][1] + y]);
    return rv;
}

function rotateShape(shape, ang) {
    var rv = [];
    for (p in shape)
        rv.push(rotatePoint(ang, shape[p][0], shape[p][1]));
    return rv;
}

function rotatePoint(ang, x, y) {
    return [
        (x * Math.cos(ang)) - (y * Math.sin(ang)),
        (x * Math.sin(ang)) + (y * Math.cos(ang))
    ];
}


function drawLineArrow(ctx, x1, y1, x2, y2) {

    var arrow = [
        [3, 0],
        [-10, -6],
        [-10, 6]
    ];

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    var ang = Math.atan2(y2 - y1, x2 - x1);
    drawFilledPolygon(translateShape(rotateShape(arrow, ang), x2, y2), ctx);
}

function drawFilledPolygon(shape, ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(shape[0][0], shape[0][1]);
    for (p in shape)
        if (p > 0)
            ctx.lineTo(shape[p][0], shape[p][1]);
    ctx.lineTo(shape[0][0], shape[0][1]);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}



function activateFunctionDrawingMode() {
    canvas.isDrawingMode = true;
    canvas.isFunctionDrawingMode = true;
    $("#drawFunction").css("background-color", "#AAA");
    $("#drawFunction").css("border-color", "#000");

    canvas.freeDrawingBrush.color = rgb(229, 171, 20);
    canvas.freeDrawingBrush.width = 2;

}

function deActivateFunctionDrawingMode() {
    canvas.isDrawingMode = false;
    canvas.isFunctionDrawingMode = false;
    $("#drawFunction").css("background-color", "#D6D6D6");
    $("#drawFunction").css("border-color", "#AAA");
}


// Functions to draw paths as marks

function activatePathMarkDrawingMode() {
    canvas.isDrawingMode = true;
    canvas.isPathMarkDrawingMode = true;
    $("#drawPathMark").css("background-color", "#AAA");
    $("#drawPathMark").css("border-color", "#000");

    canvas.freeDrawingBrush.color = rgb(229, 171, 20);
    canvas.freeDrawingBrush.width = 2;

}

function deActivatePathMarkDrawingMode() {
    canvas.isDrawingMode = false;
    canvas.isPathMarkDrawingMode = false;
    $("#drawPathMark").css("background-color", "#D6D6D6");
    $("#drawPathMark").css("border-color", "#AAA");
}


// Functions to draw paths as marks

function activateFilledMarkDrawingMode() {
    canvas.isDrawingMode = true;
    canvas.isFilledMarkDrawingMode = true;
    $("#drawFilledMark").css("background-color", "#AAA");
    $("#drawFilledMark").css("border-color", "#000");

    canvas.freeDrawingBrush.color = rgb(229, 171, 20);
    canvas.freeDrawingBrush.width = 2;

}

function deActivateFilledMarkDrawingMode() {
    canvas.isDrawingMode = false;
    canvas.isFilledMarkDrawingMode = false;
    $("#drawFilledMark").css("background-color", "#D6D6D6");
    $("#drawFilledMark").css("border-color", "#AAA");
}

function activatePanningMode() {
    canvas.currentPan1FingerendOperation = PANNING_OPERATION;
    canvas.activePanningMode = true;
    canvas.defaultCursor = "pointer";
    $("#panningModeActivatorLink").css("background-color", "#fefefe");
    $("#panningModeActivatorLink").css("border-color", "#000");

    $("#panningModeDeActivatorLink").css("background-color", "");
    $("#panningModeDeActivatorLink").css("border-color", "");

}

function deActivatePanningMode() {
    canvas.currentPan1FingerendOperation = DISCONNECTION_OPERATION;
    canvas.activePanningMode = false;
    canvas.defaultCursor = "default";
    $("#panningModeActivatorLink").css("background-color", "");
    $("#panningModeActivatorLink").css("border-color", "");

    $("#panningModeDeActivatorLink").css("background-color", "#fefefe");
    $("#panningModeDeActivatorLink").css("border-color", "#000");
}

function activateTransmogrificationMode() {

    deActivateSamplingMode();
    deActivateLineSamplingMode();

    canvas.isDrawingMode = true;
    canvas.isTransmogrificationMode = true;
    $("#transmogrifyButton").css("background", "#D6D6D6 none repeat scroll 0% 0% / auto padding-box border-box");
}

function deActivateTransmogrificationMode() {
    canvas.isDrawingMode = false;
    canvas.isTransmogrificationMode = false;
    $("#transmogrifyButton").css("background-color", "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box");
    $("#transmogrifyButton").css("border", "0px none rgb(0, 0, 0)");
}

function activateSamplingMode() {

    deActivateTransmogrificationMode();
    deActivateLineSamplingMode();

    canvas.isDrawingMode = true;
    canvas.isSamplingMode = true;
    $("#samplerButton").css("background", "#D6D6D6 none repeat scroll 0% 0% / auto padding-box border-box");
    canvas.freeDrawingBrush.color = rgb(219, 75, 0);
    canvas.freeDrawingBrush.width = 2;
}

function deActivateSamplingMode() {
    canvas.isDrawingMode = false;
    canvas.isSamplingMode = false;
    $("#samplerButton").css("background-color", "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box");
    $("#samplerButton").css("border", "0px none rgb(0, 0, 0)");
}

function activateLineSamplingMode() {

    canvas.currentPan1FingerendOperation = canvas.activePanningMode ? PANNING_OPERATION : DISCONNECTION_OPERATION;

    canvas.forEachObject(function (object) {
        object.previousSelectableState = object.selectable;
        object.previousEventedState = object.evented;
        object.selectable = false;
        object.evented = false;
    });

    deActivateTransmogrificationMode();
    deActivateSamplingMode();

    canvas.activePanningMode = false;
    canvas.defaultCursor = "default";

    $("#samplerLineButton").css("background", "#D6D6D6 none repeat scroll 0% 0% / auto padding-box border-box");
    canvas.isSamplingLineMode = true;

    canvas.defaultCursor = 'crosshair';

}

function deActivateLineSamplingMode() {

    canvas.forEachObject(function (object) {
        if (object.previousSelectableState && object.previousEventedState) {
            object.selectable = object.previousSelectableState;
            object.evented = object.previousEventedState;
        }
    });

    canvas.isSamplingLineMode = false;
    $("#samplerLineButton").css("background-color", "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box");
    $("#samplerLineButton").css("border", "0px none rgb(0, 0, 0)");

    canvas.defaultCursor = 'default';

    if (canvas.currentPan1FingerendOperation === PANNING_OPERATION) {
        activatePanningMode();
    } else {
        deActivatePanningMode();
    }
}


function activateScribbleMode() {

    canvas.currentPan1FingerendOperation = canvas.activePanningMode ? PANNING_OPERATION : DISCONNECTION_OPERATION;

    canvas.forEachObject(function (object) {
        object.previousSelectableState = object.selectable;
        object.previousEventedState = object.evented;
        object.selectable = false;
        object.evented = false;
    });

    deActivateTransmogrificationMode();
    deActivateSamplingMode();

    canvas.activePanningMode = false;
    canvas.defaultCursor = "default";

    canvas.isDrawingMode = true;


    canvas.isSamplingLineMode = false;

    canvas.isScribbleMode = true;

    canvas.defaultCursor = 'crosshair';

    $("#scribbleModeActivatorLink").css("background-color", "");
    $("#scribbleModeActivatorLink").css("border-color", "");

    $("#scribbleModeDeactivatorLink").css("background-color", "#fefefe");
    $("#scribbleModeDeactivatorLink").css("border-color", "#000");

}

function deactivateScribbleMode() {

    canvas.forEachObject(function (object) {
        if (object.previousSelectableState && object.previousEventedState) {
            object.selectable = object.previousSelectableState;
            object.evented = object.previousEventedState;
        }
    });

    canvas.isScribbleMode = false;
    canvas.isDrawingMode = false;

    $("#scribbleModeDeactivatorLink").css("background-color", "");
    $("#scribbleModeDeactivatorLink").css("border-color", "");

    $("#scribbleModeActivatorLink").css("background-color", "#fefefe");
    $("#scribbleModeActivatorLink").css("border-color", "#000");

    canvas.defaultCursor = 'default';

    if (canvas.currentPan1FingerendOperation === PANNING_OPERATION) {
        activatePanningMode();
    } else {
        deActivatePanningMode();
    }
}




function activateFreeSelectionMode() {
    canvas.isDrawingMode = true;
    canvas.isFreeSelectionMode = true;
    $("#freeSelectionButton").css("background", "#D6D6D6 none repeat scroll 0% 0% / auto padding-box border-box");
}
function deActivateFreeSelectionMode() {
    canvas.isDrawingMode = false;
    canvas.isFreeSelectionMode = false;
    $("#freeSelectionButton").css("background-color", "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box");
    $("#freeSelectionButton").css("border", "0px none rgb(0, 0, 0)");
}

function activateRectSelectionMode() {
    canvas.selection = true;
    canvas.isRectSelectionMode = true;
    $("#rectSelectionButton").css("background", "#D6D6D6 none repeat scroll 0% 0% / auto padding-box border-box");
}

function deActivateRectSelectionMode() {
    canvas.selection = false;
    canvas.isRectSelectionMode = false;
    $("#rectSelectionButton").css("background-color", "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box");
    $("#rectSelectionButton").css("border", "0px none rgb(0, 0, 0)");
}


function applyActiveMenuButtonStyle(button) {
    if (LOG)
        console.log("11");
    button.css("background-color", "#fefefe");
    button.css("border-color", "#000");
    button.data('isActive', true);
}

function applyInactiveMenuButtonStyle(button) {
    if (LOG)
        console.log("22");
    button.css("background-color", "");
    button.css("border-color", "");
    button.data('isActive', false);

}

function animateObjectProperty(object, prop, endValue, duration, easing, refreshCanvas, removeAfterCompletion, computeGeometryProperties) {
    fabric.util.animate({
        startValue: object[prop],
        endValue: endValue,
        duration: duration,
        easing: easing,
        onChange: function (value) {
            object[prop] = value;
            if (prop === 'left') {
                if (object.inConnectors) {
                    object.inConnectors.forEach(function (inConnector) {
                        inConnector.set({'x2': object.left, 'y2': object.top});
                    });
                }
                if (object.outConnectors) {
                    object.outConnectors.forEach(function (outConnector) {
                        outConnector.set({'x1': object.left, 'y1': object.top});
                    });
                }
            }
            // only render once
            if (refreshCanvas) {
                canvas.renderAll();
            }
        },
        onComplete: function () {
            object.setCoords();

            if (object.inConnectors) {
                object.inConnectors.forEach(function (inConnector) {
                    inConnector.set({'x2': object.left, 'y2': object.top});
                });
            }
            if (object.outConnectors) {
                object.outConnectors.forEach(function (outConnector) {
                    outConnector.set({'x1': object.left, 'y1': object.top});
                });
            }
            if (removeAfterCompletion) {
                object.remove();
                canvas.renderAll();
            }
            if (computeGeometryProperties) {
                computeUntransformedProperties(object);
            }
        }
    });
}



function compensateBoundingRect(boundingRect) {
    var zoom = canvas.getZoom();
    var viewportMatrix = canvas.viewportTransform;
    boundingRect.top = (boundingRect.top - viewportMatrix[5]) / zoom;
    boundingRect.left = (boundingRect.left - viewportMatrix[4]) / zoom;
    boundingRect.width /= zoom;
    boundingRect.height /= zoom;
}



function hexToR(h) {
    return parseInt((cutHex(h)).substring(0, 2), 16)
}

function hexToG(h) {
    return parseInt((cutHex(h)).substring(2, 4), 16)
}

function hexToB(h) {
    return parseInt((cutHex(h)).substring(4, 6), 16)
}

function cutHex(h) {
    return (h.charAt(0) == "#") ? h.substring(1, 7) : h
}

function hexToRGB(h) {
    var h = cutHex(h);
    var r = parseInt((cutHex(h)).substring(0, 2), 16);
    var g = parseInt((cutHex(h)).substring(2, 4), 16);
    var b = parseInt((cutHex(h)).substring(4, 6), 16);
    return {r: r, g: g, b: b};
}

// allowedTypes is an array of strings that will indicate allowed parameters to test
function findContainerElement(object, allowedTypes) {
    var canvasObjects = canvas.getObjects();
    for (var i = 0; i < canvasObjects.length; i++) {
        var container = canvas.item(i);
        for (var j = 0; j < allowedTypes.length; j++) {
            var type = allowedTypes[j];
            if (container[type]) {
                if (isFullyContainedBy(object, container)) {
                    return container;
                }
            }
        }
    }
}

function findIntersectorElement(object, allowedTypes) {
    var canvasObjects = canvas.getObjects();
    for (var i = 0; i < canvasObjects.length; i++) {
        var container = canvas.item(i);
        for (var j = 0; j < allowedTypes.length; j++) {
            var type = allowedTypes[j];
            if (container[type]) {
                if (isPartiallyContainedBy(object, container)) {
                    return container;
                }
            }
        }
    }
}

function isFullyContainedBy(object, container) {

    var objectClone = fabric.util.object.clone(object);
    var containerClone = fabric.util.object.clone(container);

    var topLeft = containerClone.getPointByOrigin('left', 'top');
    var bottomRigth = containerClone.getPointByOrigin('right', 'bottom');
    var bottomLeft = containerClone.getPointByOrigin('left', 'bottom');
    var topRigth = containerClone.getPointByOrigin('right', 'top');

//    drawRectAt(topLeft, "red");
//    drawRectAt(bottomRigth, "red");
//    drawRectAt(bottomLeft, "red");
//    drawRectAt(topRigth, "red");

    var containerPolygon = [[topLeft.x, topLeft.y], [topRigth.x, topRigth.y], [bottomRigth.x, bottomRigth.y], [bottomLeft.x, bottomLeft.y]];

    var objectTopLeft = objectClone.getPointByOrigin('left', 'top');
    var objectBottomRigth = objectClone.getPointByOrigin('right', 'bottom');
    var objectBottomLeft = objectClone.getPointByOrigin('left', 'bottom');
    var objectTopRigth = objectClone.getPointByOrigin('right', 'top');

//    drawRectAt(objectTopLeft, "green");
//    drawRectAt(objectBottomRigth, "green");
//    drawRectAt(objectBottomLeft, "green");
//    drawRectAt(objectTopRigth, "green");

    return (
            pointInPolygon([objectTopLeft.x, objectTopLeft.y], containerPolygon) &&
            pointInPolygon([objectBottomRigth.x, objectBottomRigth.y], containerPolygon) &&
            pointInPolygon([objectBottomLeft.x, objectBottomLeft.y], containerPolygon) &&
            pointInPolygon([objectTopRigth.x, objectTopRigth.y], containerPolygon)
            );
}

function isPartiallyContainedBy(object, container) {

    var objectClone = fabric.util.object.clone(object);
    var containerClone = fabric.util.object.clone(container);

    var topLeft = containerClone.getPointByOrigin('left', 'top');
    var bottomRigth = containerClone.getPointByOrigin('right', 'bottom');
    var bottomLeft = containerClone.getPointByOrigin('left', 'bottom');
    var topRigth = containerClone.getPointByOrigin('right', 'top');

//    drawRectAt(topLeft, "red");
//    drawRectAt(bottomRigth, "red");
//    drawRectAt(bottomLeft, "red");
//    drawRectAt(topRigth, "red");

    var containerPolygon = [[topLeft.x, topLeft.y], [topRigth.x, topRigth.y], [bottomRigth.x, bottomRigth.y], [bottomLeft.x, bottomLeft.y]];

    var objectTopLeft = objectClone.getPointByOrigin('left', 'top');
    var objectBottomRigth = objectClone.getPointByOrigin('right', 'bottom');
    var objectBottomLeft = objectClone.getPointByOrigin('left', 'bottom');
    var objectTopRigth = objectClone.getPointByOrigin('right', 'top');

//    drawRectAt(objectTopLeft, "green");
//    drawRectAt(objectBottomRigth, "green");
//    drawRectAt(objectBottomLeft, "green");
//    drawRectAt(objectTopRigth, "green");

    return (
            pointInPolygon([objectTopLeft.x, objectTopLeft.y], containerPolygon) ||
            pointInPolygon([objectBottomRigth.x, objectBottomRigth.y], containerPolygon) ||
            pointInPolygon([objectBottomLeft.x, objectBottomLeft.y], containerPolygon) ||
            pointInPolygon([objectTopRigth.x, objectTopRigth.y], containerPolygon)
            );
}




function bezier(pts) {
    return function (t) {
        for (var a = pts; a.length > 1; a = b)  // do..while loop in disguise
            for (var i = 0, b = [], j; i < a.length - 1; i++)  // cycle over control points
                for (b[i] = [], j = 0; j < a[i].length; j++)  // cycle over dimensions
                    b[i][j] = a[i][j] * (1 - t) + a[i + 1][j] * t;  // interpolation
        return a[0];
    }
}


function polylineToSVGPathString(polyline) {
    var SVGPathString = "M ";
    polyline.forEach(function (point) {
        SVGPathString += point.x + " " + point.y + " L ";
    });
    SVGPathString = SVGPathString.substring(0, SVGPathString.length - 3);
    return SVGPathString;
}

function pathToPolyline2(svgPathPoints) {

    if (LOG)
        console.log("svgPathPoints:");
    if (LOG)
        console.log(svgPathPoints);

    var polyline = new Array();
    var x, y, i;
    var n = svgPathPoints.length;
    for (i = 0; i < n; i++) {
        x = svgPathPoints[i][1];
        y = svgPathPoints[i][2];
        polyline.push({x: x, y: y});
    }

    // The points in the curve should always been indicated from left to rigth
    if (polyline[0].x > polyline[polyline.length - 1].x) {
        polyline = polyline.reverse();
    }

    return polyline;

}

function pathToPolyline(svgPathPoints, doNotCheckForReversion) {

//    if (LOG) {
//        console.log("svgPathPoints:");
//        console.log(svgPathPoints);
//    }

    var polyline = new Array();
    var x, y, i;
    var n = svgPathPoints.length;
    for (i = 1; i < n - 2; i++) {
        x = svgPathPoints[i][3];
        y = svgPathPoints[i][4];
        polyline.push({x: x, y: y});
    }
    x = svgPathPoints[n - 1][1];
    y = svgPathPoints[n - 1][2];
    polyline.push({x: x, y: y});

    if (!doNotCheckForReversion) {// The points in the curve should always been indicated from left to rigth
        if (polyline[0].x > polyline[polyline.length - 1].x) {
            polyline = polyline.reverse();
        }
    }



    return polyline;

}


// The polyline variable should be in the form of an array with objects {x: x, y: y}
function generateOffsetPolygon(polyline, distance) {
    var lineString = "";

    var totalPoints = polyline.length;
    for (var i = 0; i < totalPoints - 1; i++) {
        var x = polyline[i].x;
        var y = polyline[i].y;
        lineString += x + " " + y + ",";
    }
    x = polyline[totalPoints - 1].x;
    y = polyline[totalPoints - 1].y;
    lineString += " " + x + " " + y;

//    if (LOG) console.log("%csimplifiedLineString:", "color: #000000; background: #F5F5DC");
//    if (LOG) console.log("%c" + lineString, "color: #000000; background: #F5F5DC");

    var reader = new jsts.io.WKTReader();
    var line = reader.read('LINESTRING (' + lineString + ')');

    var precisionModel = new jsts.geom.PrecisionModel(jsts.geom.PrecisionModel.FLOATING);
    var quadrantSegments = jsts.operation.buffer.BufferParameters.DEFAULT_QUADRANT_SEGMENTS;
    var endCapStyle = jsts.operation.buffer.BufferParameters.CAP_ROUND;
    var joinStyle = jsts.operation.buffer.BufferParameters.CAP_ROUND;
    var mitreLimit = 0;
    var bufParams = new jsts.operation.buffer.BufferParameters(quadrantSegments, endCapStyle, joinStyle, mitreLimit);
    var offsetCurveBuilder = new jsts.operation.buffer.OffsetCurveBuilder(precisionModel, bufParams);

    var offsetPoints = offsetCurveBuilder.getLineCurve(line.getCoordinates(), distance);

//   Creating a ONE-SIDED offset polygon
//   var bufferParameters = new jsts.operation.buffer.BufferParameters();
//   bufferParameters.setSingleSided(true);
//   var offsetBuffer = new jsts.operation.buffer.BufferOp.bufferOp2(line, -distance, bufferParameters);
//   var s = JSTSPolygonToSVGPath(removeSelfIntersections(offsetBuffer));
//   var path = new fabric.Path(s);
//   path.fill = '';
//   path.stroke = 'blue';
//   path.strokeWith = 1;
//   path.set({left: 500, top: 300});
//   canvas.add(path);

    return offsetPoints;

}


// The points variable is an array containing objects of the type {x: x, y: y}
function buildJSTSPolygonString(points) {
    var polygonString = "";
    points.forEach(function (point) {
        polygonString += point.x + " " + point.y + ",";
    });
    polygonString = polygonString.substring(0, polygonString.length - 2);
    return polygonString;
}

function buildJSTSPolygon(points) {
    var polygonString = buildJSTSPolygonString(points);
    var reader = new jsts.io.WKTReader();
    var polygon = reader.read('POLYGON (' + polygonString + ')');
    return polygon;
}

function removeSelfIntersections(polygon) {
    return jsts.operation.buffer.BufferOp.bufferOp(polygon, 0);
}

function JSTSPolygonToSVGPath(JSTSPolygon) {

    var points = JSTSPolygon.getCoordinates();
    if (!points.length)
        return;

    var SVGPathString = "M";

    var copiedPoints = new Array();
    points.forEach(function (point) {
        copiedPoints.push({x: point.x, y: point.y, letter: "L"});
    });

    var totalPoints = copiedPoints.length;

    for (var i = totalPoints - 1; i >= 0; i--) {
        var point = copiedPoints[i];

        var remainingPoints = copiedPoints.slice(0, i);

        var result = $.grep(remainingPoints, function (p, i) {
            return p.x === point.x && p.y === point.y;
        });

        if (result.length != 0) {
            point.letter = "M";
        }

    }

    copiedPoints.forEach(function (point) {
        SVGPathString += " " + point.x + " " + point.y + " " + point.letter;
    });

    SVGPathString = SVGPathString.substring(0, SVGPathString.length - 2);

    return SVGPathString;
}

function getSVGPathString(pathObject) {
    var points = pathObject.path;
    var SVGPathString = "";
    points.forEach(function (point) {
        point.forEach(function (element) {
            SVGPathString += element + " ";
        });
    });
    return SVGPathString;
}

function computePolylineTrajectory(polyline) {
    var line = {p1: polyline[0], p2: polyline[polyline.length - 1]};
    return computeLength(line);
}

function computePolylineLength(polyline) {
    var totalLength = 0;
    var totalPoints = polyline.length;
    for (var i = 0; i < totalPoints - 1; i++) {
        var p1 = polyline[i];
        var p2 = polyline[i + 1];
        var line = {p1: p1, p2: p2};
        var length = computeLength(line);
        totalLength += length;
    }
    return totalLength;
}

function samplePolyline(polyline, samplingDistance) {

    var samplingPoints = new Array();
    var totalLength = 0;
    var totalPoints = polyline.length;

    var copiedPolyline = new Array();
    polyline.forEach(function (point) {
        copiedPolyline.push({x: point.x, y: point.y});
    });

    var leftDistance = samplingDistance;

    samplingPoints.push(copiedPolyline[0]);

    for (var i = 0; i < totalPoints - 1; i++) {
        var p1 = copiedPolyline[i];
        var p2 = copiedPolyline[i + 1];
        var line = {p1: p1, p2: p2};
        var length = computeLength(line);
        if (length < leftDistance) {
            leftDistance -= length;
        } else if (length == leftDistance) {
            samplingPoints.push(p2);
        } else {
            var pointAt = getPointAlongLine(line, leftDistance);
            samplingPoints.push(pointAt);
            copiedPolyline[i] = pointAt;
            i--;
            leftDistance = samplingDistance;
        }
        totalLength += length;
    }

    return samplingPoints;
}

function computeLength(line) {
    return (Math.sqrt(Math.pow(line.p2.x - line.p1.x, 2) + Math.pow(line.p2.y - line.p1.y, 2)));
}

// line: {p1:{x1, y1}, p2:{x2, y2}} distance: the value that will be measured from p1 along the line
function getPointAlongLine(line, distance) {
    var length = computeLength(line);
    var vector = {x: line.p2.x - line.p1.x, y: line.p2.y - line.p1.y};
    var unitVector = {x: vector.x / length, y: vector.y / length};
    var productVector = {x: unitVector.x * distance, y: unitVector.y * distance};
    var addVector = {x: productVector.x + line.p1.x, y: productVector.y + line.p1.y};
    return addVector;
}

function removeNaNs(points) {
    var cleanedPolygon = new Array();
    points.forEach(function (coordinate) {
        var x = coordinate.x;
        var y = coordinate.y;
        if (!(isNaN(x) || isNaN(y))) {
            cleanedPolygon.push(coordinate);
        }
    });
    return cleanedPolygon;
}

function createSampleVixorFromPath(drawnPath, fromStraightLine) {

    var simplifiedPolyline = drawnPath;

    if (!fromStraightLine) {

        var points = drawnPath.path;

        if (LOG)
            console.log("points:");
        if (LOG)
            console.log(points);

        // converting the user-traced path to a polyline representation
        var polyline = pathToPolyline(points, true);
        if (LOG)
            console.log("%cpolyline:", "color: #000000; background: #7FFF00;");
        if (LOG)
            console.log(polyline);

        // simplifying the user-trced polyline
        var tolerance = 1;
        var highQuality = true;
        simplifiedPolyline = simplify(polyline, tolerance, highQuality);
        if (LOG)
            console.log("%csimplifiedPolyline:", "color: #000000; background: #ADD8E6;");
        if (LOG)
            console.log(simplifiedPolyline);

    }


    // The variable translatedPoints contains the information of the approximation polyline relative to its first point (which, relative to itself, is located at the poit (0,0) )
    // this points are used to resample the approximation polyline traced by the user and they are needed because, after manipulation (translation, rotation and scaling), the original points traced by the user
    // are not part of the path anymore
    var translatedPoints = new Array();
    simplifiedPolyline.forEach(function (point) {
        translatedPoints.push({x: point.x - simplifiedPolyline[0].x, y: point.y - simplifiedPolyline[0].y});
    });
    if (LOG)
        console.log("%ctranslatedPoints:", "color: #000000; background: #ADD8E6;");
    if (LOG)
        console.log(translatedPoints);

    // computing the sampling positions over the simplified path
    var samplingDistance = 30;
    var samplingPoints = samplePolyline(simplifiedPolyline, samplingDistance);
    var totalLength = computePolylineLength(simplifiedPolyline);
    var trajectory = computePolylineTrajectory(simplifiedPolyline);
    if (LOG)
        console.log("samplingPoints:");
    if (LOG)
        console.log(samplingPoints);
    /*samplingPoints.forEach(function (point) {
     drawRectAt(point, 'red');
     });*/


    // generating the offset polygon of the SIMPLIFIED polyline
    var offsetDistance = 30;
    var offsetPolygonPoints = generateOffsetPolygon(simplifiedPolyline, offsetDistance);
    if (LOG)
        console.log("%coffsetPolygon:", "color: #000000; background: #E6E6FA;");
    if (LOG)
        console.log("%c" + offsetPolygonPoints, "color: #000000; background: #E6E6FA;");
    if (LOG)
        console.log(offsetPolygonPoints.length + " points in the offset polygon.");

    // Removing the NaN values from the generated offset polygon 
//    offsetPolygonPoints = removeNaNs(offsetPolygonPoints);
//    if (LOG) console.log("%coffsetPolygon:", "color: #000000; background: #bdf1bb;");
//    if (LOG) console.log("%c" + offsetPolygonPoints, "color: #000000; background: #bdf1bb;");
//    if (LOG) console.log(offsetPolygonPoints.length + " points after removing NaNs.");


    var offsetJSTSPolygon = buildJSTSPolygon(offsetPolygonPoints);
    if (LOG)
        console.log("%coffsetJSTSPolygon:", "color: #000000; background: #FAFAD2;");
    if (LOG)
        console.log("%c" + offsetJSTSPolygon, "color: #000000; background: #FAFAD2;");

    // removing self intersections that can be found in the offset polygon
    var cleanedPolygon = removeSelfIntersections(offsetJSTSPolygon);
    if (LOG)
        console.log("%ccleanedPolygon", "background: #FF0000; color: #FFFFFF");
    if (LOG)
        console.log("%c" + cleanedPolygon, "background: #FF0000; color: #FFFFFF");
    var cleanedCoordinates = cleanedPolygon.getCoordinates();
    if (LOG)
        console.log(cleanedCoordinates);

    if ((!cleanedCoordinates || !cleanedCoordinates.length) && drawnPath.remove) {
        drawnPath.remove();
        canvas.renderAll();
        return;
    }

    var svgPathString = JSTSPolygonToSVGPath(cleanedPolygon);
    if (LOG)
        console.log("svgPathString:");
    if (LOG)
        console.log(svgPathString);

//    if (!svgPathString) {
//        svgPathString = JSTSPolygonToSVGPath(offsetJSTSPolygon);
//    }

    if (LOG)
        console.log("svgPathString:");
    if (LOG)
        console.log(svgPathString);

    if (LOG)
        console.log("drawnPath:");
    if (LOG)
        console.log(drawnPath);

    if (!svgPathString || svgPathString === '') {
        if (drawnPath.remove) {
            drawnPath.remove();
            canvas.renderAll();
        }
        return;
    }

    var userDefinedPath = null;

    if (fromStraightLine) {

        var x1 = drawnPath[0].x;
        var y1 = drawnPath[0].y;
        var x2 = drawnPath[1].x;
        var y2 = drawnPath[1].y;
        userDefinedPath = 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2;

    } else {

        userDefinedPath = getSVGPathString(drawnPath);

    }


    /*var offsetPath = new fabric.Path(svgPathString, {fill: rgb(198, 198, 198), stroke: '#000000', colorForStroke: '#000000', opacity: 0.75, strokeWidth: 1, originalStrokeWidth: 1});
     var userPath = new fabric.Path(userDefinedPath, {fill: '', stroke: 'black', strokeWidth: 3});
     
     var objects = [offsetPath, userPath];
     
     var firstPoint = new fabric.Point(samplingPoints[0].x, samplingPoints[0].y);
     var parentObject = getImportedImageContaining(firstPoint);
     
     var samplerOptions = {
     originX: 'center',
     originY: 'center',
     hasBorders: false,
     hasControls: false,
     hasRotatingPoint: false,
     lockScalingX: true,
     lockScalingY: true,
     lockRotation: true,
     perPixelTargetFind: true,
     samplingFrequency: 5,
     samplingPoints: samplingPoints,
     length: parentObject ? totalLength / parentObject.scaleX : totalLength,
     trajectory: parentObject ? trajectory / parentObject.scaleX : trajectory,
     simplifiedPolyline: simplifiedPolyline,
     translatedPoints: translatedPoints,
     samplingDistance: samplingDistance,
     totalSamplingPoints: samplingPoints.length,
     fill: rgb(153, 153, 153),
     parentObject: parentObject,
     untransformedX: 0,
     untransformedY: 0,
     untransformedScaleX: 1,
     untransformedScaleY: 1,
     untransformedAngle: parentObject ? 360 - parentObject.getAngle() : 0,
     offsetPolygonPath: svgPathString,
     userTracedPath: userDefinedPath,
     };
     
     var samplerVixor = addSamplerVixorToCanvas(objects, samplerOptions);
     
     samplerVixor.samplingMarks.forEach(function (sampligMark) {
     blink(sampligMark, false);
     });
     blink(samplerVixor, true, 0.1);
     
     if (parentObject) {
     parentObject.widgets.push(samplerVixor);
     computeUntransformedProperties(samplerVixor);
     
     samplerVixor.untransformedScaleX = 1 / parentObject.getScaleX();
     samplerVixor.untransformedScaleY = 1 / parentObject.getScaleY();
     
     samplerVixor.sampleColors(true);
     }*/

    var firstPoint = new fabric.Point(samplingPoints[0].x, samplingPoints[0].y);
    var parentObject = getImportedImageContaining(firstPoint);

    var options = {
        offsetPolygonPath: svgPathString,
        userTracedPath: userDefinedPath,
        samplingPoints: samplingPoints,
        totalLength: totalLength,
        simplifiedPolyline: simplifiedPolyline,
        translatedPoints: translatedPoints,
        samplingDistance: samplingDistance,
        trajectory: trajectory,
        parentObject: parentObject
    };
    var samplerVixor = buildAndAddSamplerColor(options);

    if (parentObject) {
        parentObject.widgets.push(samplerVixor);
    }

    deActivateSamplingMode();
    deActivateLineSamplingMode();



    /*if (LOG) console.log("samplerVixor.length");
     if (LOG) console.log("%c" + samplerVixor.length, "color: white; background: red;");
     if (LOG) console.log("samplerVixor.parentObject.scaleX");
     if (LOG) console.log("%c" + samplerVixor.parentObject.scaleX, "color: white; background: red;");
     if (LOG) console.log("samplerVixor.parentObject.scaleY");
     if (LOG) console.log("%c" + samplerVixor.parentObject.scaleY, "color: white; background: red;");*/

}


function buildAndAddSamplerColor(options) {

    console.log("%c Going to build and add a sample color with the following options:", "background: rgb(97,121,77); color: white;");
    console.log(options);

    var offsetPath = new fabric.Path(options.offsetPolygonPath, {fill: rgb(198, 198, 198), stroke: '#000000', colorForStroke: '#000000', opacity: 0.75, strokeWidth: 1, originalStrokeWidth: 1});
    var userPath = new fabric.Path(options.userTracedPath, {fill: '', stroke: 'black', strokeWidth: 3});

    var objects = [offsetPath, userPath];

    var parentObject = options.parentObject || null;

    var samplerOptions = {
        originX: 'center',
        originY: 'center',
        hasBorders: false,
        hasControls: false,
        hasRotatingPoint: false,
        lockScalingX: true,
        lockScalingY: true,
        lockRotation: true,
        perPixelTargetFind: true,
        samplingFrequency: options.samplingFrequency || 5,
        angle: options.angle || 0,
        scaleX: options.scaleX || 1,
        scaleY: options.scaleY || 1,
        samplingPoints: options.samplingPoints,
        length: options.values ? options.values.length.number : (parentObject ? options.totalLength / parentObject.scaleX : options.totalLength),
        trajectory: options.values ? options.values.trajectory.number : (parentObject ? options.trajectory / parentObject.scaleX : options.trajectory),
        simplifiedPolyline: options.simplifiedPolyline,
        translatedPoints: options.translatedPoints,
        samplingDistance: options.values ? options.values.samplingDistance.number : options.samplingDistance,
        totalSamplingPoints: options.samplingPoints.length,
        fill: rgb(153, 153, 153),
        parentObject: parentObject,
        untransformedX: options.untransformedX || 0,
        untransformedY: options.untransformedY || 0,
        untransformedScaleX: options.untransformedScaleX || 1,
        untransformedScaleY: options.untransformedScaleY || 1,
        untransformedAngle: options.untransformedAngle || (parentObject ? 360 - parentObject.getAngle() : 0),
        offsetPolygonPath: options.offsetPolygonPath,
        userTracedPath: options.userTracedPath,
        nonSerializable: parentObject !== null,
        xmlIDs: options.xmlIDs,
        values: options.values
    };


    if (options.left) {
        samplerOptions.left = options.left;
    }
    if (options.top) {
        samplerOptions.top = options.top;
    }

    var samplerVixor = addSamplerVixorToCanvas(objects, samplerOptions);

    samplerVixor.samplingMarks.forEach(function (sampligMark) {
        blink(sampligMark, false);
    });
    blink(samplerVixor, true, 0.1);

    var colorValues = options.values ? options.values.colorValues : null;

    if (parentObject && !colorValues) {
        computeUntransformedProperties(samplerVixor);

        samplerVixor.untransformedScaleX = 1 / parentObject.getScaleX();
        samplerVixor.untransformedScaleY = 1 / parentObject.getScaleY();

        samplerVixor.sampleColors(true);
    } else if (colorValues) {
        var i = 0;
        var strokes = options.samplingMarksStrokes;
        colorValues.forEach(function (colorValue) {
            samplerVixor.samplingMarks[i].fill = colorValue.color.toRgba();
            samplerVixor.samplingMarks[i].stroke = strokes[i];
            i++;
        });
    }

    var samplingMarksPositions = options.samplingMarksPositions;
    if (samplingMarksPositions) {
        var j = 0;
        samplingMarksPositions.forEach(function (point) {
            console.log("point:");
            console.log(point);
//            samplerVixor.samplingMarks[j].setPositionByOrigin(new fabric.Point(point.x, point.y), 'center', 'center');
            samplerVixor.samplingMarks[j].left = point.x;
            samplerVixor.samplingMarks[j].top = point.y;
            computeUntransformedProperties(samplerVixor.samplingMarks[j]);
            j++;
        });
    }

    if (options.xmlIDs) {
        samplerVixor.executePendingConnections();
    }

    if (options.shouldExpand) {
        samplerVixor.expand(true);
    }



    return samplerVixor;

}

function processScribbleFromPath(drawnPath) {

    var simplifiedPolyline = drawnPath;

    var points = drawnPath.path;

    // converting the user-traced path to a polyline representation
    var polyline = pathToPolyline(points, true);

    // simplifying the user-trced polyline
    var tolerance = 1;
    var highQuality = true;
    simplifiedPolyline = simplify(polyline, tolerance, highQuality);


    // The variable translatedPoints contains the information of the approximation polyline relative to its first point (which, relative to itself, is located at the poit (0,0) )
    // this points are used to resample the approximation polyline traced by the user and they are needed because, after manipulation (translation, rotation and scaling), the original points traced by the user
    // are not part of the path anymore
    var translatedPoints = new Array();
    simplifiedPolyline.forEach(function (point) {
        translatedPoints.push({x: point.x - simplifiedPolyline[0].x, y: point.y - simplifiedPolyline[0].y});
    });

    // computing the sampling positions over the simplified path
    var samplingDistance = 30;
    var samplingPoints = samplePolyline(simplifiedPolyline, samplingDistance);
    var totalLength = computePolylineLength(simplifiedPolyline);
    var trajectory = computePolylineTrajectory(simplifiedPolyline);

    // generating the offset polygon of the SIMPLIFIED polyline
    var offsetDistance = 30;
    var offsetPolygonPoints = generateOffsetPolygon(simplifiedPolyline, offsetDistance);

    var offsetJSTSPolygon = buildJSTSPolygon(offsetPolygonPoints);

    // removing self intersections that can be found in the offset polygon
    var cleanedPolygon = removeSelfIntersections(offsetJSTSPolygon);

    var cleanedCoordinates = cleanedPolygon.getCoordinates();

    if ((!cleanedCoordinates || !cleanedCoordinates.length) && drawnPath.remove) {
        drawnPath.remove();
        canvas.renderAll();
        return;
    }

    var svgPathString = JSTSPolygonToSVGPath(cleanedPolygon);

    if (!svgPathString || svgPathString === '') {
        if (drawnPath.remove) {
            drawnPath.remove();
            canvas.renderAll();
        }
        return;
    }

    var userDefinedPath = null;


    userDefinedPath = getSVGPathString(drawnPath);


    var offsetPath = new fabric.Path(svgPathString, {fill: rgb(198, 198, 198), stroke: '#000000', colorForStroke: '#000000', opacity: 0.75, strokeWidth: 1, originalStrokeWidth: 1});
    var userPath = new fabric.Path(userDefinedPath, {fill: '', stroke: 'black', strokeWidth: 3});

    var objects = [offsetPath, userPath];

    var firstPoint = new fabric.Point(samplingPoints[0].x, samplingPoints[0].y);
    var parentObject = getImportedImageContaining(firstPoint);

    if (!parentObject) {
        return;
    }

    var untransformedPoints = new Array();

    samplingPoints.forEach(function (point) {

        var rect = new fabric.Rect({
            left: point.x,
            top: point.y,
            strokeWidth: 0,
            width: 10,
            height: 10
        });

        console.log("BEFORE");
        console.log("rect.left: " + rect.left);
        console.log("rect.top: " + rect.top);

        computeUntransformedProperties(rect, parentObject);
        repositionWidget(parentObject, rect);

        console.log("AFTER");
        console.log("rect.left: " + rect.left);
        console.log("rect.top: " + rect.top);

        console.log("%c rect.untransformedX: " + rect.untransformedX, "background: rgb(20,79,132); color: white;");
        console.log("%c rect.untransformedY: " + rect.untransformedY, "background: rgb(20,79,132); color: white;");

        untransformedPoints.push({x: rect.untransformedX, y: rect.untransformedY});


    });






    var request = new XMLHttpRequest();
    request.open("POST", "processScribble", true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    request.onreadystatechange = function () {

        if (request.readyState === 4) {
            if (request.status === 200) {

                var textResponse = request.responseText;

                console.log("%c" + "textResponse:", "background: rgb(47,136,127); color: white;");
                console.log(textResponse);

                if (textResponse.trim().length > 0) {

                    var response = JSON.parse(textResponse);

                    console.log("%c" + "response", "background: rgb(47,136,127); color: white;");
                    console.log(response);

                    if (response) {

                        var pathString = response['path'];
                        if (pathString) {

                            var color = response['meanColor'];
                            var b = parseFloat(color['val'][0]).toFixed(0);
                            var g = parseFloat(color['val'][1]).toFixed(0);
                            var r = parseFloat(color['val'][2]).toFixed(0);

                            var massCenter = response['massCenter'];
                            var x = massCenter['x'];
                            var y = massCenter['y'];

//                            console.log("%c" + "massCenter", "background: red; color: white;");
//                            console.log(massCenter);                                                        

                            var path = new fabric.Path(pathString);

                            path.isColorSelector = true;
                            path.untransformedX = x;
                            path.untransformedY = y;
                            path.untransformedAngle = 0;
                            path.untransformedScaleX = 1;
                            path.untransformedScaleY = 1;

                            var widgetPosition = computeWidgetPosition(path, parentObject);
                            var finalX = widgetPosition.x;
                            var finalY = widgetPosition.y;

                            var area = parseInt(response['contourArea']);

                            var fillColor = 'rgba(' + (r * 1.5).toFixed(0) + ',  ' + (g * 1.5).toFixed(0) + ', ' + (b * 1.5).toFixed(0) + ', ' + 0.75 + ')';

                            var vixorOptions = {
                                finalOptions: {left: finalX, top: finalY, scaleX: parentObject.getScaleX(), scaleY: parentObject.getScaleY()},
                                left: finalX,
                                top: finalY,
                                fillColor: fillColor,
                                fill: fillColor,
                                stroke: darkenrgb(r, g, b),
                                markAsSelected: true,
                                thePath: pathString,
                                opacity: 1,
                                permanentOpacity: 1,
                                movingOpacity: 0.3,
                                isWidget: true,
                                parentObject: parentObject,
                                angle: parentObject.getAngle(),
                                untransformedAngle: 0,
                                untransformedX: x,
                                untransformedY: y,
                                untransformedScaleX: 1,
                                untransformedScaleY: 1,
                                area: area,
                                trueColor: rgb(r, g, b),
                                trueColorDarker: darkenrgb(r, g, b),
                                animateAtBirth: true,
                            };

                            var theVixor = addVixorToCanvas(COLOR_REGION_EXTRACTOR, vixorOptions);
                            parentObject.widgets.push(theVixor);
















                        }



                    }
                }

            }
        }

    };

    var imageForTextRecognition = parentObject.id;


    console.log("%c" + "samplingPoints:", "background: rgb(47,136,127); color: white;");
    console.log(samplingPoints);

    console.log("%c" + "untransformedPoints:", "background: rgb(47,136,127); color: white;");
    console.log(untransformedPoints);

    request.send("samplingPoints=" + JSON.stringify(untransformedPoints) + "&imageForTextRecognition=" + imageForTextRecognition);  // sending the data to the server

    deactivateScribbleMode();

}


// polyline is an array of {x: x, y: y} elements
function getPathLineIntersection(polyline, line) {
    var totalPoints = polyline.length;
    for (var i = 0; i < totalPoints - 1; i++) {
        var p1 = polyline[i];
        var p2 = polyline[i + 1];
        var currentLine = {x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y};
        var intersection = getIntersection(currentLine, line);
        if (intersection) {
            /*drawRectAt(intersection, "blue");*/
            return intersection;
        }
    }
    return null;
}

function getActualCanvasCenter() {
    var canvasCenter = canvas.getCenter();
    var panningX = canvas.viewportTransform[4];
    var panningY = canvas.viewportTransform[5];
    var actualCanvasCenter = {x: canvasCenter.left - panningX, y: canvasCenter.top - panningY};
    return actualCanvasCenter;
}

function printDateAndTime(aMoment, background, foreground) {
    background = background || 'blue';
    foreground = foreground || 'white';
    if (LOG)
        console.log("%c**** DATE: " + aMoment.format("dddd, MMMM Do YYYY") + " ****", 'background: ' + background + '; color: ' + foreground + ';');
    if (LOG)
        console.log("\t%cDAY: " + aMoment.date(), 'background: ' + background + '; color: ' + foreground + ';');
    if (LOG)
        console.log("\t%cMONTH: " + (aMoment.month() + 1), 'background: ' + background + '; color: ' + foreground + ';');
    if (LOG)
        console.log("\t%cYEAR: " + aMoment.year(), 'background: ' + background + '; color: ' + foreground + ';');
    if (LOG)
        console.log("%c**** TIME: " + aMoment.format("HH:mm:ss") + " ****", 'background: ' + background + '; color: ' + foreground + ';');
    if (LOG)
        console.log("\t%cHOURS: " + aMoment.hour(), 'background: ' + background + '; color: ' + foreground + ';');
    if (LOG)
        console.log("\t%cMINUTES: " + aMoment.minute(), 'background: ' + background + '; color: ' + foreground + ';');
    if (LOG)
        console.log("\t%cSECONDS: " + aMoment.second(), 'background: ' + background + '; color: ' + foreground + ';');
    if (LOG)
        console.log("***************");
}

function printTime(momentTime, background, foreground) {
    background = background || 'blue';
    foreground = foreground || 'white';
    if (LOG)
        console.log("%c**** TIME: " + momentTime.format("HH:mm:ss") + " ****", 'background: ' + background + '; color: ' + foreground + ';');
    if (LOG)
        console.log("\t%cHOURS: " + momentTime.hour(), 'background: ' + background + '; color: ' + foreground + ';');
    if (LOG)
        console.log("\t%cMINUTES: " + momentTime.minute(), 'background: ' + background + '; color: ' + foreground + ';');
    if (LOG)
        console.log("\t%cSECONDS: " + momentTime.second(), 'background: ' + background + '; color: ' + foreground + ';');
    if (LOG)
        console.log("***************");
}

function printDate(momentDate, background, foreground) {
    background = background || 'blue';
    foreground = foreground || 'white';
    if (LOG)
        console.log("%c**** DATE: " + momentDate.format("dddd, MMMM Do YYYY") + " ****", 'background: ' + background + '; color: ' + foreground + ';');
//    if (LOG) console.log("\t%cDAY: " + momentDate.day(), 'background: '+ background + '; color: '+ foreground + ';');
    if (LOG)
        console.log("\t%cDAY: " + momentDate.date(), 'background: ' + background + '; color: ' + foreground + ';');
    if (LOG)
        console.log("\t%cMONTH: " + (momentDate.month() + 1), 'background: ' + background + '; color: ' + foreground + ';');
    if (LOG)
        console.log("\t%cYEAR: " + momentDate.year(), 'background: ' + background + '; color: ' + foreground + ';');
    if (LOG)
        console.log("***************");
}

function computeTimeDifference(time1, time2) {
    var difference = time2.clone();
    return difference.subtract(time1.hour(), 'hours').subtract(time1.minute(), 'minutes').subtract(time1.second(), 'seconds');
}

function computeDateDifference(date1, date2, outputUnits) {
    var units = 'milliseconds';
    var difference = date2.diff(date1);
    var duration = moment.duration(difference, units);
    return createDurationValue(duration, outputUnits);
}

var dateAndTimeFormats = null;
function getDateAndTimeFormats() {
    if (!dateAndTimeFormats) {
        var timeFormats = getTimeFormats();
        var dateFormats = getDateFormats();
        dateAndTimeFormats = timeFormats.concat(dateFormats);
    }
    return dateAndTimeFormats;
}

var timeFormats = null;
function getTimeFormats() {
    if (!timeFormats) {
        timeFormats = new Array();
        timeFormats.push('HHmm');
        timeFormats.push('HH:mm');
        timeFormats.push('HH:mm:ss');
    }
    return timeFormats;
}

var dateFormats = null;
function getDateFormats() {
    if (!dateFormats) {
        dateFormats = new Array();

        dateFormats.push('DD MMMM');
        dateFormats.push('dddd DD MMMM');

        dateFormats.push('DD MMMM YYYY');
        dateFormats.push('dddd DD MMMM YYYY');
        dateFormats.push('dddd D MMMM YYYY');

        dateFormats.push('MM-DD-YYYY');
        dateFormats.push('MM/DD/YYYY');
        dateFormats.push('MMMM DD, YYYY');
        dateFormats.push('MMMM DD YYYY');
        dateFormats.push('MMMM Do, YYYY');
        dateFormats.push('MMMM Do YYYY');
        dateFormats.push('dddd, MMMM Do YYYY');
        dateFormats.push('dddd MMMM Do YYYY');
        dateFormats.push('dddd, MMMM DD YYYY');
        dateFormats.push('dddd MMMM DD YYYY');

        dateFormats.push('MM-D-YYYY');
        dateFormats.push('MM/D/YYYY');
        dateFormats.push('MMMM D, YYYY');
        dateFormats.push('MMMM D YYYY');
        dateFormats.push('dddd, MMMM Do YYYY');
        dateFormats.push('dddd MMMM Do YYYY');
        dateFormats.push('dddd, MMMM D YYYY');
        dateFormats.push('dddd MMMM D YYYY');

        dateFormats.push('dddd, MMMM Do');
        dateFormats.push('dddd MMMM Do');
        dateFormats.push('dddd, MMMM D');
        dateFormats.push('dddd MMMM D');
        dateFormats.push('dddd, MMM Do');
        dateFormats.push('dddd MMM Do');
        dateFormats.push('dddd, MMM D');
        dateFormats.push('dddd MMM D');

        dateFormats.push('MMM-D-YYYY');
        dateFormats.push('MMM/D/YYYY');
        dateFormats.push('MMM D, YYYY');
        dateFormats.push('MMM D YYYY');
        dateFormats.push('dddd, MMM Do YYYY');
        dateFormats.push('dddd MMM Do YYYY');
        dateFormats.push('dddd, MMM D YYYY');
        dateFormats.push('dddd MMM D YYYY');


        dateFormats.push('MMMM DD, YYYY');
        dateFormats.push('MMMM Do, YYYY');
        dateFormats.push('dddd, MMMM Do, YYYY');
        dateFormats.push('dddd MMMM Do, YYYY');
        dateFormats.push('dddd, MMMM DD, YYYY');
        dateFormats.push('dddd MMMM DD YYYY');
        dateFormats.push('MMMM D, YYYY');
        dateFormats.push('dddd, MMMM Do, YYYY');
        dateFormats.push('dddd MMMM Do, YYYY');
        dateFormats.push('dddd, MMMM D, YYYY');
        dateFormats.push('dddd MMMM D, YYYY');
        dateFormats.push('MMM D, YYYY');
        dateFormats.push('dddd, MMM Do, YYYY');
        dateFormats.push('dddd MMM Do, YYYY');
        dateFormats.push('dddd, MMM D, YYYY');
        dateFormats.push('dddd MMM D, YYYY');


        dateFormats.push('dddd MMMMDo YYYY');
        dateFormats.push('dddd, MMMMDo YYYY');
        dateFormats.push('dddd MMMMDo, YYYY');
        dateFormats.push('dddd, MMMMDo, YYYY');

        dateFormats.push('dddd MMMMD YYYY');
        dateFormats.push('dddd, MMMMD YYYY');
        dateFormats.push('dddd MMMMD, YYYY');
        dateFormats.push('dddd, MMMMD, YYYY');

        dateFormats.push('dddd MMMMDD YYYY');
        dateFormats.push('dddd, MMMMDD YYYY');
        dateFormats.push('dddd MMMMDD, YYYY');
        dateFormats.push('dddd, MMMMDD, YYYY');


        dateFormats.push('MM-DD');
        dateFormats.push('MM/DD');
        dateFormats.push('MMMM DD');
        dateFormats.push('MMMM Do');
        dateFormats.push('MMMM Do');
        dateFormats.push('dddd, MMMM Do');
        dateFormats.push('dddd MMMM Do');
        dateFormats.push('dddd, MMMM DD');
        dateFormats.push('dddd MMMM DD');

        dateFormats.push('MM-D');
        dateFormats.push('MM/D');
        dateFormats.push('MMMM D');
        dateFormats.push('MMMM D');
        dateFormats.push('dddd, MMMM Do');
        dateFormats.push('dddd MMMM Do');
        dateFormats.push('dddd, MMMM D');
        dateFormats.push('dddd MMMM D');

        dateFormats.push('MMM-D');
        dateFormats.push('MMM/D');
        dateFormats.push('MMM D,');
        dateFormats.push('MMM D');

        dateFormats.push('dddd, MMM Do');
        dateFormats.push('dddd MMM Do');
        dateFormats.push('dddd, MMM D');
        dateFormats.push('dddd MMM D');


        dateFormats.push('MMMM DD');
        dateFormats.push('MMMM Do');
        dateFormats.push('dddd, MMMM Do,');
        dateFormats.push('dddd MMMM Do,');
        dateFormats.push('dddd, MMMM DD,');
        dateFormats.push('dddd MMMM DD');
        dateFormats.push('MMMM D,');
        dateFormats.push('dddd, MMMM Do,');
        dateFormats.push('dddd MMMM Do,');
        dateFormats.push('dddd, MMMM D,');
        dateFormats.push('dddd MMMM D,');
        dateFormats.push('MMM D,');
        dateFormats.push('dddd, MMM Do,');
        dateFormats.push('dddd MMM Do,');
        dateFormats.push('dddd, MMM D,');
        dateFormats.push('dddd MMM D,');

        dateFormats.push('dddd MMMMDo');
        dateFormats.push('dddd, MMMMDo');
        dateFormats.push('dddd MMMMDo,');
        dateFormats.push('dddd, MMMMDo,');

        dateFormats.push('dddd MMMMD');
        dateFormats.push('dddd, MMMMD');
        dateFormats.push('dddd MMMMD,');
        dateFormats.push('dddd, MMMMD,');

        dateFormats.push('dddd MMMMDD');
        dateFormats.push('dddd, MMMMDD');
        dateFormats.push('dddd MMMMDD,');
        dateFormats.push('dddd, MMMMDD,');




    }
    return dateFormats;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function hideWithAnimation(object, refreshCanvas) {
    var duration = 100;
    var easing = fabric.util.ease['easeInCubic'];
    object.animate('opacity', 0, {
        duration: duration,
        easing: easing,
    });
    object.animate('scaleX', 0, {
        duration: duration,
        easing: easing,
    });
    object.animate('scaleY', 0, {
        duration: duration,
        onChange: function () {
            if (refreshCanvas) {
                canvas.renderAll();
            }
        },
        easing: easing,
        onComplete: function () {
            object.remove();
        }
    });
}

function blink(object, refreshCanvas, increment) {
    if (!increment) {
        increment = 0.45;
    }
    var duration = 100;
    var easing = fabric.util.ease['easeInCubic'];
    object.animate('scaleX', '+=' + increment, {
        duration: duration,
        easing: easing,
        onComplete: function () {
            object.animate('scaleX', '-=' + increment, {
                duration: 1100,
                easing: fabric.util.ease['easeOutElastic']
            });
        }
    });
    object.animate('scaleY', '+=' + increment, {
        duration: duration,
        onChange: function () {
            if (refreshCanvas) {
                canvas.renderAll();
            }
        },
        easing: easing,
        onComplete: function () {
            object.animate('scaleY', '-=' + increment, {
                duration: 1100,
                onChange: function () {
                    if (refreshCanvas) {
                        canvas.renderAll();
                    }
                },
                easing: fabric.util.ease['easeOutElastic']
            });
        }
    });
}


function getHomogeneousType(array) {
    for (var i = 1; i < array.length; i++) {
        if (array[0].getTypeProposition() !== array[i].getTypeProposition()) {
            return null;
        }
    }
    return getIconNameByDataTypeProposition(array[0].getTypeProposition());
}

function getAllTypes(array) {
    var types = new Array();
    for (var i = 0; i < array.length; i++) {

        var currentType = getIconNameByDataTypeProposition(array[i].getTypeProposition());

        var idx = types.indexOf(currentType);

        if (idx === -1) {

            types.push(currentType);

        }

    }

    return types;
}

function getDataTypePropositionByIconName(iconName) {
    if (iconName === "color") {
        return "isColorData";
    } else if (iconName === "dateAndTime") {
        return "isDateAndTimeData";
    } else if (iconName === "duration") {
        return "isDurationData";
    } else if (iconName === "number") {
        return "isNumericData";
    } else if (iconName === "shape") {
        return "isShapeData";
    } else if (iconName === "string") {
        return "isStringData";
    } else {
        return null;
    }
}

function getIconNameByDataTypeProposition(dataTypeProposition) {
    if (dataTypeProposition === "isColorData") {
        return "color";
    } else if (dataTypeProposition === "isDateAndTimeData") {
        return "dateAndTime";
    } else if (dataTypeProposition === "isDurationData") {
        return "duration";
    } else if (dataTypeProposition === "isNumericData") {
        return "number";
    } else if (dataTypeProposition === "isShapeData") {
        return "shape";
    } else if (dataTypeProposition === "isStringData") {
        return "string";
    } else {
        return null;
    }
}

function getR(fabricColor) {
    return fabricColor._source[0];
}
function getG(fabricColor) {
    return fabricColor._source[1];
}
function getB(fabricColor) {
    return fabricColor._source[2];
}

function computeDeltaE2000(fabricColor1, fabricColor2) {

    var rgbColor1 = new ColorRGB(getR(fabricColor1) / 255, getG(fabricColor1) / 255, getB(fabricColor1) / 255);
    var linearRGB1 = rgbColor1.toLinearRGB();
    var xyz1 = linearRGB1.toXYZ();
    var Lab1 = xyz1.toLab();
    var rgbColor2 = new ColorRGB(getR(fabricColor2) / 255, getG(fabricColor2) / 255, getB(fabricColor2) / 255);
    var linearRGB2 = rgbColor2.toLinearRGB();
    var xyz2 = linearRGB2.toXYZ();
    var Lab2 = xyz2.toLab();

//    return deltaE1994(Lab1, Lab2, 'graphic arts');
    return computeEuclideanDistance(fabricColor1, fabricColor2); // TODO: This function is not definitive (or is it?)

}

function updateConnectorsPositions(object) {

    object.setCoords();
    var connectionPoint = null;
    if (object.getCompressedMassPoint) {
        connectionPoint = object.getCompressedMassPoint();
    } else {
        connectionPoint = object.getCenterPoint();
    }
    if (object.inConnectors) {
        object.inConnectors.forEach(function (inConnector) {
            inConnector.set({'x2': connectionPoint.x, 'y2': connectionPoint.y});
            inConnector.setCoords();
        });
    }
    if (object.outConnectors) {
        object.outConnectors.forEach(function (outConnector) {
            outConnector.set({'x1': connectionPoint.x, 'y1': connectionPoint.y});
            outConnector.setCoords();
        });
    }
}

function bringConnectorsToFront(object) {
    if (object.inConnectors) {
        object.inConnectors.forEach(function (inConnector) {
            inConnector.bringToFront();
        });
    }
    if (object.outConnectors) {
        object.outConnectors.forEach(function (outConnector) {
            outConnector.bringToFront();
        });
    }
}

function getArrayMin(array) {
    return Math.min.apply(Math, array);
}

function getArrayMax(array) {
    return Math.max.apply(Math, array);
}

function changeRangeToArray(oldValues, oldMin, oldMax, newMin, newMax) {
    var newValues = new Array();
    oldValues.forEach(function (oldValue) {
        newValues.push(changeRange(oldValue, oldMin, oldMax, newMin, newMax));
    });
    return newValues;
}

function changeRange(oldValue, oldMin, oldMax, newMin, newMax) {
    var oldRange = (oldMax - oldMin);
    var newRange = (newMax - newMin);
    var newValue = (((oldValue - oldMin) * newRange) / oldRange) + newMin;
    if (isNaN(newValue)) { // true when the oldRange is zero (i.e., when the oldMax and oldMin are equal)
        newValue = oldValue;
    }

    /*console.log("oldValue: " + oldValue);
     console.log("oldMin: " + oldMin);
     console.log("oldMax: " + oldMax);
     console.log("newMin: " + newMin);
     console.log("newMax: " + newMax);
     console.log("newValue: " + newValue);*/

    return newValue;
}

function compareByTop(object1, object2) {
    if (object1.top < object2.top) {
        return -1;
    } else if (object1.top > object2.top) {
        return 1;
    } else {
        return 0;
    }
}

function getCoordinateComparator(coordinate) {
    if (coordinate === 'x') {
        return compareByX;
    } else {
        return compareByY;
    }
}

function compareByX(coordinate1, coordinate2) {
    if (coordinate1.x < coordinate2.x) {
        return -1;
    } else if (coordinate1.x > coordinate2.x) {
        return 1;
    } else {
        return 0;
    }
}

function compareByY(coordinate1, coordinate2) {
    if (coordinate1.y < coordinate2.y) {
        return -1;
    } else if (coordinate1.y > coordinate2.y) {
        return 1;
    } else {
        return 0;
    }
}


function interpolateColors(hexColor1, hexColor2, steps) {
    var generatedColors = jsgradient.generateGradient(hexColor1, hexColor2, steps);
    if (!generatedColors || !generatedColors.length) {
        return null;
    }
    var results = new Array();
    generatedColors.forEach(function (generatedColor) {
        var colorValue = createColorValue(new fabric.Color(generatedColor));
        results.push(colorValue);
    });
    return results;
}

function interpolateNumbers(number1, number2, steps) {
    var results = new Array();
    if (number1 === number2) {
        var numericValue = createNumericValue(number1, '', '', '');
        results.push(numericValue);
    } else {
        var increment = (number2 - number1) / steps;
        if (increment > 0) {
            for (var n = number1; n <= number2; n += increment) {
                var numericValue = createNumericValue(n, '', '', '');
                results.push(numericValue);
            }
        } else {
            for (var n = number1; n >= number2; n += increment) {
                var numericValue = createNumericValue(n, '', '', '');
                results.push(numericValue);
            }
        }
    }
    return results;
}


function updatePathCoords(path) {
    var calcDim = path._parseDimensions();
    path.minX = calcDim.left;
    path.minY = calcDim.top;
    path.width = calcDim.width;
    path.height = calcDim.height;
    calcDim.left += path.originX === 'center' ? path.width / 2 : path.originX === 'right' ? path.width : 0;
    calcDim.top += path.originY === 'center' ? path.height / 2 : path.originY === 'bottom' ? path.height : 0;
    path.top = calcDim.top;
    path.left = calcDim.left;
    path.pathOffset = {
        x: path.minX + path.width / 2,
        y: path.minY + path.height / 2
    };
}

function extractXYValues(fabricPath, useAlternativeExtraction) {

    var points = fabricPath.path;
    var polyline = useAlternativeExtraction ? pathToPolyline2(points) : pathToPolyline(points);
    // simplifying the user-trced polyline
    var tolerance = 0.5;
    var highQuality = true;
    var simplifiedPolyline = simplify(polyline, tolerance, highQuality);

    var x = new Array();
    var y = new Array();
    simplifiedPolyline.forEach(function (point) {
        x.push(point.x);
        y.push(point.y);
    });

    var xValues = new Array();
    var yValues = new Array();

    var minX = getArrayMin(x);
    x.forEach(function (xValue) {
        xValues.push(xValue - minX);
    });

    var maxY = getArrayMax(y);
    y.forEach(function (yValue) {
        yValues.push(maxY - yValue);
    });

    return {xValues: xValues, yValues: yValues};

}

function associateEnterEvent(inputElement, button) {
    inputElement.keydown(function (e) {
        if (e.keyCode === 13) {
            button.click();
        }
    });
}

// When the given string is not a date and time stamp, this function returns null
function parseStringAsMomentDate(string) {

    var dateAndTime = moment(string, getDateAndTimeFormats(), true);
    if (dateAndTime.isValid()) {
        return dateAndTime;
    } else {
        return null;
    }

}

function animateProperty(object, property, startValue, endValue, easing, duration, refreshCanvas, onCompleteFunction) {
    fabric.util.animate({
        duration: duration,
        easing: easing,
        startValue: startValue,
        endValue: endValue,
        onChange: function (currentValue) {
            object[property] = currentValue;

            updateConnectorsPositions(object);

            if (refreshCanvas) {
                canvas.renderAll();
            }
        },
        onComplete: onCompleteFunction
    });
}


function standarInConnectionRemovedHandler(options) {
    if (LOG)
        console.log("%c standarInConnectionRemovedHandler", "background:pink; color:black;");
    var removedConnection = options.connector;
    var destination = removedConnection.destination;

    if (LOG)
        console.log("BEFORE: " + destination.inConnectors);
    if (LOG)
        console.log(destination.inConnectors);

    fabric.util.removeFromArray(destination.inConnectors, removedConnection);

    if (LOG)
        console.log("AFTER: " + destination.inConnectors);
    if (LOG)
        console.log(destination.inConnectors);
}

function standarOutConnectionRemovedHandler(options) {
    if (LOG)
        console.log("%c standarOutConnectionRemovedHandler", "background:gray; color:black;");
    var removedConnection = options.connector;
    var source = removedConnection.source;

    if (LOG)
        console.log("BEFORE: " + source.outConnectors);
    if (LOG)
        console.log(source.outConnectors);

    fabric.util.removeFromArray(source.outConnectors, removedConnection);

    if (LOG)
        console.log("AFTER: " + source.outConnectors);
    if (LOG)
        console.log(source.outConnectors);
}

function getClosestElement(numericValue, arrayOfValues) {
    var i = 0, closest, closestDiff, currentDiff;
    if (arrayOfValues.length) {
        closest = arrayOfValues[0];
        for (i; i < arrayOfValues.length; i++) {
            closestDiff = Math.abs(numericValue.number - closest.number);
            currentDiff = Math.abs(numericValue.number - arrayOfValues[i].number);
            if (currentDiff < closestDiff) {
                closest = arrayOfValues[i];
            }
            closestDiff = null;
            currentDiff = null;
        }
        //returns first element that is closest to number
        return {closestValue: closest, position: i - 2};
    }
    //no length
    return null;
}


function getProportionalDistance(color1, color2, color3) {



    var r1 = getR(color1);
    var g1 = getG(color1);
    var b1 = getB(color1);

    var r2 = getR(color2);
    var g2 = getG(color2);
    var b2 = getB(color2);

    var r3 = getR(color3);
    var g3 = getG(color3);
    var b3 = getB(color3);

    var deltaR1 = r2 - r1;
    var deltaG1 = g2 - g1;
    var deltaB1 = b2 - b1;

    var deltaR2 = r3 - r1;
    var deltaG2 = g3 - g1;
    var deltaB2 = b3 - b1;


    var magnitude = getMagnitude(deltaR1, deltaG1, deltaB1);

    var r4 = (deltaR1 / magnitude);
    var g4 = (deltaG1 / magnitude);
    var b4 = (deltaB1 / magnitude);

    return Math.abs(r4 * deltaR2 + g4 * deltaG2 + b4 * deltaB2);
}

function getProportionalHSLDistance(color1, color2, color3) {

    color1.toHsl();


    var r1 = getR(color1);
    var g1 = getG(color1);
    var b1 = getB(color1);

    var r2 = getR(color2);
    var g2 = getG(color2);
    var b2 = getB(color2);

    var r3 = getR(color3);
    var g3 = getG(color3);
    var b3 = getB(color3);

    var deltaR1 = r2 - r1;
    var deltaG1 = g2 - g1;
    var deltaB1 = b2 - b1;

    var deltaR2 = r3 - r1;
    var deltaG2 = g3 - g1;
    var deltaB2 = b3 - b1;


    var magnitude = getMagnitude(deltaR1, deltaG1, deltaB1);

    var r4 = (deltaR1 / magnitude);
    var g4 = (deltaG1 / magnitude);
    var b4 = (deltaB1 / magnitude);

    return Math.abs(r4 * deltaR2 + g4 * deltaG2 + b4 * deltaB2);
}

function getMagnitude(a, b, c) {
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2));
}


function enterFunctionButtonClicked() {
    // prompt dialog
    alertify.prompt("Enter a function definition", function (e, str) {
        // str is the input text
        if (e) {
            // user clicked "ok"            
            var canvasActualCenter = getActualCanvasCenter();
            var coordinates = getFunctionCoordinates(str);
            addNumericFunction(canvasActualCenter.x, canvasActualCenter.y, coordinates.XCoordinates, coordinates.YCoordinates);
        } else {
            // user clicked "cancel"
        }
    }, "f(x) = (cos(x) + cos(x/2)) * 5");

}

function drawFunctionButtonClicked() {
    if (canvas.isFunctionDrawingMode) {
        deActivateFunctionDrawingMode();
    } else {
        activateFunctionDrawingMode();
    }
}


function drawFilledMarkButtonClicked() {
    if (canvas.isFilledMarkDrawingMode) {
        deActivateFilledMarkDrawingMode();
    } else {
        activateFilledMarkDrawingMode();
    }
}



function drawPathMarkButtonClicked() {
    if (canvas.isPathMarkDrawingMode) {
        deActivatePathMarkDrawingMode();
    } else {
        activatePathMarkDrawingMode();
    }
}

function freeSelectionButtonClicked() {
    if (canvas.isFreeSelectionMode) {
        deActivateFreeSelectionMode();
    } else {
        activateFreeSelectionMode();
    }
}

function transmogrifyButtonClicked() {
    if (canvas.isTransmogrificationMode) {
        deActivateTransmogrificationMode();
    } else {
        activateTransmogrificationMode();
    }
}

function samplerButtonClicked() {
    if (canvas.isSamplingMode) {
        deActivateSamplingMode();
    } else {
        activateSamplingMode();
    }
}

function samplerLineButtonClicked() {
    if (canvas.isSamplingLineMode) {
        deActivateLineSamplingMode();
    } else {
        activateLineSamplingMode();
    }
}

function rectSelectionButtonClicked() {
    if (canvas.isRectSelectionMode) {
        deActivateRectSelectionMode();
    } else {
        activateRectSelectionMode();
    }
}


// this function can be used to handle with a default behaviour the events of releasing a new connection on a blank section of the canvas
// in order to provide further manipulation or behaviour of the newly created object, it is returned by the function
// If something weird happends, the function returns null
function newConnectionReleasedOnCanvas(connection, coordX, coordY) {

    console.log("%cNEW connection released on canvas", "background: rgb(56,27,65); color: white;");

    var theValue = connection.value;
    var destination = null;

    // First, we have to check if this is a collection
    if ($.isArray(theValue)) {

        var options = {
            top: coordY,
            left: coordX,
            values: theValue,
        }

        destination = addVerticalCollection(options);

    } else {
        destination = CreateDataTypeFromValue(theValue);
        destination.top = coordY;
        destination.left = coordX;
        canvas.add(destination);
    }

    connection.setDestination(destination, true);

    if (destination.animateBirth) {
        destination.animateBirth(false, null, null, false);
    }



}

function getAdditionFunctionForType(type) {

    if (type === "number") {
        return addNumericValues;
    } else if (type === "color") {
        return mixColors;
    } else if (type === "string") {
        return concatStrings;
    } else if (type === "dateAndTime") {

    } else if (type === "duration") {

    } else if (type === "shape") {

    } else {
        return null;
    }

}

function createXMLElement(elementName) {

    var xml = '<' + elementName + '></' + elementName + '>';
    var xmlDoc = $.parseXML(xml);
    var $xml = $(xmlDoc);
    var node = $xml.find(elementName);

//    console.log(node);

    return node;
}

function createArrayFromXMLNode(arrayNode) {
    var array = new Array();
    var elements = arrayNode.children('value');
    elements.each(function () {
        var valueNode = $(this);
        var value = createValueFromXMLNode(valueNode);
        array.push(value);
    });
    return array;
}

function createArrayNode(values, name) {
    var arrayNode = createXMLElement(name || "value");
    addAttributeWithValue(arrayNode, "type", "array");
    values.forEach(function (value) {
        var valueNode = value.toXML();
        arrayNode.append(valueNode);
    });
    return arrayNode;
}

function addAttributeWithValue(node, attributeName, value) {
    if (value === null || typeof value === 'undefined' || (typeof value === 'string' && isBlank(value))) {
        return;
    }
    node.attr(attributeName, value);
}

function appendCDATAWithValue(root, elementName, value) {

    if (value === null || typeof value === 'undefined' || (typeof value === 'string' && isBlank(value))) {
        return;
    }

    value = replaceAll(value, CDATA_END, CDATA_END_REPLACE);

    root.append('<' + elementName + ' type="cdata">' + '<![CDATA[' + value + ']]>' + '</' + elementName + '>');
}

function appendElementWithValue(root, elementName, value) {
    if (value === null || typeof value === 'undefined' || (typeof value === 'string' && isBlank(value))) {
        return;
    }
    root.append('<' + elementName + ' type= "' + typeof value + '">' + value + '</' + elementName + '>');
}

/*function appendElementWithValue(root, elementName, value) {
 
 if (typeof value === 'undefined' || (typeof value === 'string' && isBlank(value))) {
 return;
 }
 
 if ($.isArray(value)) {
 
 
 console.log("The given value is an array here!!!! " + elementName + ": ");
 console.log(value);
 
 //        var arrayElement = createXMLElement(elementName);
 
 
 var xml = '<' + elementName + ' type="array"></' + elementName + '>';
 var xmlDoc = $.parseXML(xml);
 var $xml = $(xmlDoc);
 var arrayElement = $xml.find(elementName);
 
 
 
 value.forEach(function (element) {
 
 var serializableValue = null;
 var serializableValueName = null;
 
 serializableValueName = 'element';
 
 if (element.isNumericData) {
 serializableValue = element.number;
 }
 
 arrayElement.append('<' + serializableValueName + ' type= "' + typeof serializableValue + '">' + serializableValue + '</' + serializableValueName + '>');
 
 
 console.log("element:");
 console.log(element);
 
 
 
 });
 
 root.append(arrayElement);
 
 
 
 // here, the array value should be processed to be sabed in the XML file
 //root.append('<' + elementName + ' type= "array">' + value + '</' + elementName + '>');
 
 
 } else {
 
 var valueType = typeof value;
 
 print(elementName + " : " + value + " : " + valueType, "#6537a7", "white");
 
 if (valueType === "object") {
 
 if (value.isColorData) {
 
 elementName = "theColor";
 value = value.color.toRgba();
 
 } else if (value.isDateAndTimeData) {
 
 elementName = "theMoment";
 value = value.moment.format();
 
 } else if (value.isDurationData) {
 
 console.log("value.outputUnits:");
 console.log(value.outputUnits);
 
 if (value.outputUnits) {
 root.append('<outputUnits type="string">' + value.outputUnits + '</outputUnits>');
 }
 
 elementName = "duration";
 value = value.duration.asMilliseconds();
 
 
 
 } else if (value.isShapeData) {
 
 console.log("value.svgPathGroupMark:");
 console.log(value.svgPathGroupMark);
 
 if (value.svgPathGroupMark) {
 
 var SVGString = value.SVGString;
 
 console.log("SVGString:");
 console.log(SVGString);
 
 
 root.append('<svgPathGroupMark type="svgString">' + '<![CDATA[' + SVGString + ']]>' + '</svgPathGroupMark>');
 
 
 }
 
 console.log("value.shape:");
 console.log(value.shape);
 
 elementName = "shape";
 value = value.shape;
 
 }
 
 }
 
 root.append('<' + elementName + ' type= "' + typeof value + '">' + value + '</' + elementName + '>');
 
 
 
 
 
 
 }
 }*/


function createValueOfType(homogeneityGuess) {

    var desiredType = homogeneityGuess.type;

    if (desiredType === "number") {

        var unscaledValue = homogeneityGuess.valueForOptions;
        var inPrefix = '';
        var outPrefix = '';
        var theUnits = '';

        return createNumericValue(unscaledValue, inPrefix, outPrefix, theUnits);

    } else if (desiredType === "dateAndTime") {

        return createDateAndTimeValue(homogeneityGuess.valueForOptions);

    } else if (desiredType === "string") {

        return createStringValue(homogeneityGuess.valueForOptions);

    }

}

function createVisualValueOfType(homogeneityGuess, x, y) {

    var desiredType = homogeneityGuess.type;

    var options = {
        left: x,
        top: y
    };

    if (desiredType === "number") {

        options.theType = "number";
        options.unscaledValue = homogeneityGuess.valueForOptions;

        console.log(options.unscaledValue);

    } else if (desiredType === "dateAndTime") {

        options.theType = "dateAndTime";
        options.theMoment = homogeneityGuess.valueForOptions;

    } else if (desiredType === "string") {

        options.theType = "string";
        options.string = homogeneityGuess.valueForOptions;

    }

    return CreateDataType(options);

}

function guessMostSpecificType(theText) {

    var theType = "string";
    var valueForOptions = null;
    var originalString = theText;

    if (theText.includes('%') || theText.includes('$') || theText.includes('€') || theText.includes('£') || theText.includes('₤')) {
        theText = theText.replace(/%/g, '').trim();
        theText = theText.replace(/$/g, '').trim();
        theText = theText.replace(/€/g, '').trim();
        theText = theText.replace(/£/g, '').trim();
        theText = theText.replace(/₤/g, '').trim();
        // there is a chanche that this string is a number

        if ($.isNumeric(theText)) {
            theType = "number";
            valueForOptions = Number(theText);
        } else if (canBeCurrency(theText)) {

            var find = ',';
            var re = new RegExp(find, 'g');
            theText = theText.replace(re, '');
            theType = "number";
            valueForOptions = Number(theText);

        } else {
            theType = "string";
            valueForOptions = theText;
        }

    } else {

        if ($.isNumeric(theText)) {
            theType = "number";
            valueForOptions = Number(theText);
        } else if (canBeCurrency(theText)) {

            var find = ',';
            var re = new RegExp(find, 'g');
            theText = theText.replace(re, '');
            theType = "number";
            valueForOptions = Number(theText);

        } else {

            var dateAndTime = moment(theText, getDateAndTimeFormats(), true);
            if (dateAndTime.isValid()) {
                theType = "dateAndTime";
                valueForOptions = dateAndTime;
            } else {

//            if () { // Could this be a duration?
//                
//            } else {
                theType = "string";
                valueForOptions = theText;

//            }


            }

        }

    }

    var homogeneityGuess = {type: theType, valueForOptions: valueForOptions, originalString: originalString};

    console.log(homogeneityGuess);

    return homogeneityGuess;

}

// verifies if all the elements of the given array can be represented with the same single data type (e.g. are all of them numbers?, are all of them dates stamps?)
function checkHomogeneity(strings) {

    var homogeneityCheckingResults = new Array();
    var isHomogeneous = true;

    var firstType = guessMostSpecificType(strings[0]).type;
    for (var i = 0; i < strings.length; i++) {
        var homogeneityGuess = guessMostSpecificType(strings[i]);
        homogeneityCheckingResults.push(homogeneityGuess);

        if (homogeneityGuess.type !== firstType) {
            isHomogeneous = false;
        }
    }

    return {homogeneityGuesses: homogeneityCheckingResults, isHomogeneous: isHomogeneous};
}

function createVisualValuesFromArray(strings) {

    var createdValues = new Array();

    var homogeneityCheckingResults = checkHomogeneity(strings);

    var homogeneityGuesses = homogeneityCheckingResults.homogeneityGuesses;
    var collectionIsHomogeneous = homogeneityCheckingResults.isHomogeneous;

    console.log("collectionIsHomogeneous: " + collectionIsHomogeneous);

    homogeneityGuesses.forEach(function (homogeneityGuess) {
        if (!collectionIsHomogeneous) {
            homogeneityGuess.type = "string";
            homogeneityGuess.valueForOptions = homogeneityGuess.originalString;
        }
        var visualValue = createVisualValueOfType(homogeneityGuess);
        createdValues.push(visualValue);

    });

    return createdValues;

}

function createValuesFromArray(strings) {

    var createdValues = new Array();

    var homogeneityCheckingResults = checkHomogeneity(strings);

    var homogeneityGuesses = homogeneityCheckingResults.homogeneityGuesses;
    var collectionIsHomogeneous = homogeneityCheckingResults.isHomogeneous;

    console.log("collectionIsHomogeneous: " + collectionIsHomogeneous);

    homogeneityGuesses.forEach(function (homogeneityGuess) {
        if (!collectionIsHomogeneous) {
            homogeneityGuess.type = "string";
            homogeneityGuess.valueForOptions = homogeneityGuess.originalString;
        }
        var value = createValueOfType(homogeneityGuess);
        createdValues.push(value);

    });

    return createdValues;

}

function removeUselessTags(parsedHTML) {

    var filteredNodes = [];

    $.each(parsedHTML, function (i, el) {
        if (el) {
            var nodeName = el.nodeName;
            if (nodeName) {
                if (el.nodeName !== "META") {
                    filteredNodes.push(el);
                } else {
                    console.log("META tag found!");
                }
            }
        }
    });

    console.log("filteredNodes: ");
    console.log(filteredNodes);

    return filteredNodes;

}

function createVisualElementFromHTML(parsedHTML, x, y, addToCanvas) {

    print("addVisualElementFromHTML FUNCTION. x: " + x + " y: " + y);
    console.log("Received parsedHTML:");
    console.log(parsedHTML);

    parsedHTML = removeUselessTags(parsedHTML);

    var totalElements = parsedHTML.length;
    console.log("totalElements:" + totalElements);

    if (totalElements === 1) {

        var htmlElement = parsedHTML[0];
        var jQueryElement = $(htmlElement);
        var elementType = htmlElement.nodeName.toUpperCase();

        console.log("elementType: " + elementType);

        console.log("htmlElement:");
        console.log(htmlElement);

        console.log("jQueryElement: ");
        console.log(jQueryElement);

        if (elementType === "TABLE") {

            console.log(jQueryElement);
            console.log(jQueryElement[0]);
            console.log(jQueryElement['0']);




            var allRows = htmlElement.getElementsByTagName("tr");
            var totalRows = allRows.length;

            if (totalRows > 0) {
                if (totalRows > 1) { // This should be a DATA WIDGET

                    var firstRow = allRows[0];
                    var tableHeader = firstRow.getElementsByTagName("th");
                    var totalVariables = tableHeader.length;
                    var start = 0;
                    var colNames = new Array();

                    var csvString = "";

                    if (totalVariables > 0) {

                        for (var i = 0; i < totalVariables; i++) {
                            var element = $(tableHeader[i]);
                            var variableName = element.text().trim();
                            colNames.push(variableName);
                            csvString += variableName + ",";
                        }

                        start = 1;

                        console.log("The selected table DOES CONTAIN a headers row.");

                    } else {

                        console.log("The selected table DOES *NOT* CONTAIN a headers row");

                        totalVariables = firstRow.getElementsByTagName("td").length;

                        console.log("totalColumns: " + totalVariables);

                        for (var i = 0; i < totalVariables; i++) {
                            var variableName = "VAR_" + (i + 1);
                            csvString += variableName + ",";
                        }

                    }

                    csvString = csvString.substring(0, csvString.length - 1) + "\n";

                    console.log("The variables are:");
                    console.log(colNames);

                    console.log("The CSV string is:");
                    console.log(csvString);

                    for (var i = start; i < totalRows; i++) {

                        var currentRow = allRows[i];
                        var currentCols = currentRow.getElementsByTagName("td");

                        for (var j = 0; j < totalVariables; j++) {

                            var element = $(currentCols[j]);
                            var data = element.text().trim();

                            csvString += data + ",";

                        }

                        csvString = csvString.substring(0, csvString.length - 1) + "\n";


                    }

                    csvString = csvString.substring(0, csvString.length - 1);

                    console.log("Final CSV string: ");
                    console.log(csvString);


                    if (!canvas.totalTables) {
                        canvas.totalTables = 1;
                    }

                    var aDataWidget = new DataWidget({
                        fileName: "TABLE_" + (canvas.totalTables++),
                        CSVString: csvString,
                    });
                    canvas.add(aDataWidget);


                    aDataWidget.left = x;
                    aDataWidget.top = y;

                    aDataWidget.setCoords();
                    aDataWidget.parseCSVString();





                } else { // This should be a COLLECTION

                    var theOnlyRow = allRows[0];
                    var colsHeader = theOnlyRow.getElementsByTagName("th");
                    var colsData = theOnlyRow.getElementsByTagName("td");

                    var theCols = colsHeader.length ? colsHeader : colsData;
                    var totalCols = theCols.length;

                    var texts = new Array();

                    for (var i = 0; i < totalCols; i++) {
                        var element = $(theCols[i]);
                        texts.push(element.text().trim());
                    }

                    var values = createValuesFromArray(texts);

                    var options = {
                        top: y,
                        left: x,
                        values: values
                    };

                    addVerticalCollection(options);

                }
            }





//                    } else if (elementType === "TH" || elementType === "TR") {
//                        
//                        alert("TH or TR !!!");

        } else if (elementType === "IMG") {

            console.log(htmlElement.src);

            var options = {
                imageData: htmlElement.src,
                left: x,
                top: y
            };

            importImageToCanvas(options);

//                    } else if (elementType === "A" || elementType === "SPAN" || elementType === "H2") {
        } else {


            var theText = jQueryElement.text().trim();

            if (theText) {

                var options = {
                    left: x,
                    top: y
                };

                if (theText.endsWith('%')) {
                    theText = theText.substring(0, theText.length - 1);
                }

                if ($.isNumeric(theText)) {

                    // is it a NUMBER

                    options.theType = "number";
                    options.unscaledValue = Number(theText);

                } else {

                    if (canBeCurrency(theText)) {

                        // are you sure? It may be a string representing MONEY

                        var find = ',';
                        var re = new RegExp(find, 'g');
                        theText = theText.replace(re, '');

                        print(theText, "blue", "white");

                        options.theType = "number";
                        options.unscaledValue = Number(theText);


                    } else {

                        // Is it a DATE?
                        var dateAndTime = moment(theText, getDateAndTimeFormats(), true);

                        if (dateAndTime.isValid()) {

                            console.log(theText + " was a VALID DATE!!!)");

                            options.theType = "dateAndTime";
                            options.theMoment = dateAndTime;

                        } else {

                            // ok, it's just TEXT

                            options.theType = "string";
                            options.string = theText;

                        }

                    }







                }

                console.log("options:");
                console.log(options);


                var theVisualVariable = CreateDataType(options);

                if (addToCanvas) {
                    canvas.add(theVisualVariable);
                    theVisualVariable.animateBirth(false, null, null, false);
                }

                return theVisualVariable;

            }






        }

    } else {

        $.each(parsedHTML, function (i, currentElement) {

            var htmlElementType = currentElement.nodeName.toUpperCase();

            console.log("htmlElementType: " + htmlElementType);

        });

    }



}


function canvasDropFunction(ev, ui) {

    var canvasCoords = getCanvasCoordinates(ev);
    var x = canvasCoords.x;
    var y = canvasCoords.y;
    var dropedElement = ui.draggable;
    var id = $(dropedElement).attr("id");
    var targetObject = null;
    var theCollection = findPotentialDestination(canvasCoords, ['isVerticalCollection']);
    if (theCollection) {
        if (id === "isColorData" || id === "isStringData" || id === "isNumericData" || id === "isDurationData" || id === "isDateAndTimeData" || id === "isShapeData") {
            var theVisualVariable = createDefaultVisualValueByTypeProposition(id);
            addVisualVariableToCollection(theVisualVariable, theCollection);
            return;
        }
    }

    if (id) {

        targetObject = getImportedImageContaining(x, y);

        if (id === "addition-operator" || id === "subtraction-operator" || id === "multiplication-operator" || id === "division-operator") {

            var type = replaceAll(id, "-operator", "");

            var options = {
                type: type,
                left: x,
                top: y,
                markAsSelected: true,
                animateAtBirth: true
            };

            addOperator(options);

        } else if (id === "emptyFunction") {

            var options = {
                left: x,
                top: y
            };

            addNumericFunction(options);

        } else if (id === "xFunction") {

            var coordinates = getLinealFunctionCoordinates();
            var options = {
                left: x,
                top: y,
                coordinatesX: coordinates.XCoordinates,
                coordinatesY: coordinates.YCoordinates
            };
            addNumericFunction(options);

        } else if (id === "x2Function") {

            var coordinates = getQuadraticFunctionCoordinates();
            var options = {
                left: x,
                top: y,
                coordinatesX: coordinates.XCoordinates,
                coordinatesY: coordinates.YCoordinates
            };
            addNumericFunction(options);

        } else if (id === "x3Function") {

            var coordinates = getCubicFunctionCoordinates();
            var options = {
                left: x,
                top: y,
                coordinatesX: coordinates.XCoordinates,
                coordinatesY: coordinates.YCoordinates
            };
            addNumericFunction(options);

        } else if (id === "sinXFunction") {

            var coordinates = getSinFunctionCoordinates();
            var options = {
                left: x,
                top: y,
                coordinatesX: coordinates.XCoordinates,
                coordinatesY: coordinates.YCoordinates
            };
            addNumericFunction(options);

        } else if (id === "cosXFunction") {

            var coordinates = getCosFunctionCoordinates();
            var options = {
                left: x,
                top: y,
                coordinatesX: coordinates.XCoordinates,
                coordinatesY: coordinates.YCoordinates
            };
            addNumericFunction(options);

        } else if (id === "logXFunction") {

            var coordinates = getLogFunctionCoordinates();
            var options = {
                left: x,
                top: y,
                coordinatesX: coordinates.XCoordinates,
                coordinatesY: coordinates.YCoordinates
            };
            addNumericFunction(options);

        } else if (id === "sqrtXFunction") {

            var coordinates = getSqrtFunctionCoordinates();
            var options = {
                left: x,
                top: y,
                coordinatesX: coordinates.XCoordinates,
                coordinatesY: coordinates.YCoordinates
            };
            addNumericFunction(options);

        } else if (id === "locatorWidget") {

            var options = {
                top: y,
                left: x,
                markAsSelected: true,
                animateAtBirth: true,
                shouldExpand: false,
            };

            addLocator(options);


        } else if (id === "mapperWidget") {

            var options = {
                top: y,
                left: x,
                animateAtBirth: true
            };

            addMapper(options);

        } else if (id === "collectionGetterWidget") {

            addCollectionGetter(x, y);

        } else if (id === "collectionAttributeSelectorWidget") {

            addCollectionAttributeSelector(x, y);

        } else if (id === "verticalCollection") {

            addEmptyVerticalCollection(x, y);

        } else if (id === "collectionGenerator") {

            addNumericCollectionGenerator(x, y);

        } else if (id === "numberGenerator") {

            addNumberGenerator({left: x, top: y});

        } else if (id === "squarePrototype") {

            var options = {
                left: x,
                top: y,
                fill: rgb(225, 153, 75),
                stroke: darkenrgb(225, 153, 75),
                side: 60,
                label: '',
                markAsSelected: false,
                animateAtBirth: true
            };
            var rectPrototype = addMarkToCanvas(SQUARED_MARK, options);

        } else if (id === "pathMarkPrototype") {

            var options = {
                left: x,
                top: y,
                fill: rgb(0, 153, 255),
                stroke: darkenrgb(0, 153, 255),
                label: '',
                angle: 35,
                markAsSelected: false,
                animateAtBirth: true,
                thePath: 'M 0 0 L 50 0 L 75 50 L 100 -50 L 125 0 L 175 0',
            };
            var pathMarkPrototype = addMarkToCanvas(PATH_MARK, options);

        } else if (id === "rectPrototype") {

            var options = {
                left: x,
                top: y,
                fill: rgb(225, 79, 75),
                stroke: darkenrgb(225, 79, 75),
                width: 90,
                height: 50,
                label: '',
                markAsSelected: false,
                animateAtBirth: true
            };
            var rectPrototype = addMarkToCanvas(RECTANGULAR_MARK, options);
        } else if (id == "circlePrototype") {
            var options = {
                left: x,
                top: y,
                fill: rgb(115, 157, 108),
                stroke: darkenrgb(115, 157, 108),
                radius: 30,
                label: '',
                markAsSelected: false,
                animateAtBirth: true
            };
            var circleMark = addMarkToCanvas(CIRCULAR_MARK, options);

        } else if (id == "fatFontPrototype") {

            var options3 = {
                left: x,
                top: y,
                fill: rgb(180, 115, 168),
                colorForStroke: darkenrgb(180, 115, 168),
                fontFamily: 'Miguta',
                number: 58,
                fontSize: 60,
                label: '',
                markAsSelected: false,
                animateAtBirth: true
            };
            addMarkToCanvas(FATFONT_MARK, options3);

        } else if (id == "ellipsePrototype") {

            var options5 = {
                left: x,
                top: y,
                fill: rgb(222, 201, 58),
                stroke: darkenrgb(222, 201, 58),
                rx: 45,
                ry: 25,
                label: '',
                markAsSelected: false,
                animateAtBirth: true
            };
            addMarkToCanvas(ELLIPTIC_MARK, options5);

        } else if (id === "isColorData" || id === "isStringData" || id === "isNumericData" || id === "isDurationData" || id === "isDateAndTimeData" || id === "isShapeData") {

            var visualValue = createDefaultVisualValueByTypeProposition(id, x, y);
            canvas.add(visualValue);
            visualValue.animateBirth(false, null, null, false);

        } else if (id === "collectionValue") {

            var anAggregator = new Aggregator({
                left: x,
                top: y
            });
            canvas.add(anAggregator);
        }

        disableDrawingMode();
    }

}


function printXML(object) {
    var xml = object.toXML();
    var serializer = new XMLSerializer();
    var xmlString = serializer.serializeToString(xml[0]);
    // var bautifiedString = vkbeautify.xml(xmlString);
    var bautifiedString = formatXml(xmlString);
    console.log(bautifiedString);
}

function createImportedImageOptionsFromXMLNode(imageXmlNode) {

    var options = {
        id: imageXmlNode.attr('id'),
        xmlID: Number(imageXmlNode.attr('xmlID')),
    };

    var children = imageXmlNode.children();
    children.each(function () {
        var child = $(this);
        var tagName = this.tagName;

        var value = child.text();
        var type = child.attr('type');

        console.log("%ctagName: " + tagName, "background: rgb(143,98,153); color: white;");

        if (type === "array") {

            var extractorsOptions = new Array();
            var xmlIDs = new Array();

            var elements = child.children('extractor');
            elements.each(function () {
                var valueNode = $(this);

                var extractor = createExtractorOptionsFromXMLNode(valueNode);
                extractorsOptions.push(extractor);

                var xmlID = Number(valueNode.attr('xmlID'));
                xmlIDs.push(xmlID);
            });

            options['extractorsOptions'] = extractorsOptions;
            options['xmlIDs'] = xmlIDs;

        } else {

            if (type === "number") {
                value = Number(value);
            } else if (type === "boolean") {
                value = value === "true";
            }

            options[tagName] = value;

        }

    });

    console.log("%coptions to create the saved IMPORTED IMAGE", "background: rgb(90,61,96); color: white;");
    console.log(options);

    return options;

}

function importImageFromXMLNode(imageXmlNode) {

    var options = createImportedImageOptionsFromXMLNode(imageXmlNode);

    var importedImage = importImageToCanvas(options);

    console.log("importedImage:");
    console.log(importedImage);

}