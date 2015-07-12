var ShapeData = fabric.util.createClass(fabric.Path, {
    
    serializableProperties: ['left', 'top', 'theType', 'value'],
    deserializer: addVisualValueToCanvas,
    
    initialize: function (options) {
        options || (options = {});
        var path = paths["shape"].rw;
        this.callSuper('initialize', path, options);

        this.set('dataTypeProposition', 'isShapeData');
        this.set(this.dataTypeProposition, true);

        this.set('strokeWidth', options.strokeWidth || 2);
        this.set('originalStrokeWidth', this.strokeWidth);
        
        console.log("Creating SHAPE DATA with the following options: ");
        console.log(options);

        this.set('value', createShapeValue(options.shape || CIRCULAR_MARK, options.svgPathGroupMark || null));
//        this.set('value', this.createValue(CIRCULAR_MARK, null));

        /*this.set('fill', options.fill || rgb(150, 82, 182));
         this.set('stroke', options.stroke || darkenrgb(150, 82, 182));
         this.set('colorForStroke', options.stroke || darkenrgb(150, 82, 182));*/

        this.set('fill', options.fill || rgb(255, 139, 30));
        this.set('stroke', options.stroke || darkenrgb(255, 139, 30));
        this.set('colorForStroke', options.stroke || darkenrgb(255, 139, 30));

        this.set('inConnectors', new Array());
        this.set('outConnectors', new Array());
        this.set('readable', true);
        this.set('writable', true);
        this.associateEvents();

        this.set('originX', 'center');
        this.set('originY', 'center');


        this.set({left: options.left, top: options.top});
        this.setCoords();

    },
    setValue: function (shapeValue, refreshCanvas) {
        var theDataType = this;
        if (shapeValue.isShapeData) {
            theDataType.value = shapeValue;

            if (theDataType.collection) {
                var options = {
                    visualValue: theDataType
                };
                theDataType.collection.trigger('valueChanged', options);
            }


            if (refreshCanvas) {
                canvas.renderAll();
            }
            return true; // Succes
        } else {
            return false; // error when trying to set the value of this data type. Some other function should deal witht this value in order to provide visual feedback to the user
        }
    },
    expand: function () {

        var theDataType = this;

        var svgFileReadFunction = function (event, file) {

            var SVGString = event.target.result;
                        
            fabric.loadSVGFromString(SVGString, function (objects, options) {

//                var canvasCenter = canvas.getCenter();
                var canvasCenter = getActualCanvasCenter();

                var defaultOptions = {
                    label: file.name,
                    markAsSelected: true,
                    thePaths: objects,
                    left: canvasCenter.left,
                    top: canvasCenter.top,
                    animateAtBirth: false,
                    unlabeled: true,
                };

                options = $.extend(true, {}, defaultOptions, options);

                var svgPathGroupMark = new SVGPathGroupMark(objects, options);

                theDataType.inConnectors.forEach(function (inConnector) {
                    inConnector.contract();
                });

                var shapeValue = createShapeValue(SVGPATHGROUP_MARK, svgPathGroupMark);

                theDataType.setValue(shapeValue, true);
                                
               theDataType.value.SVGString = SVGString;                

                theDataType.outConnectors.forEach(function (outConnector) {
                    outConnector.setValue(shapeValue, false, false);
                });

                

            });

        };

        var mainDiv = $('<div/>', {class: 'icon-large'});

        if (LOG)
            console.log("%cconfigurator:", "background:red; color:white;");
        if (LOG)
            console.log(mainDiv);

        var padding = (theDataType.width / 4) * canvas.getZoom();

        mainDiv.css('padding-right', padding + 'px');
        mainDiv.css('padding-left', padding + 'px');

        document.body.appendChild(mainDiv[0]);

        var outputShapes = {
            'Circle': CIRCULAR_MARK,
            'Square': SQUARED_MARK,
            'Rectangle': RECTANGULAR_MARK,
            'Ellipse': ELLIPTIC_MARK,
            'FatFont': FATFONT_MARK,
            'SVG File': SVGPATHGROUP_MARK
        }

        var outputShapeSelector = $('<select />', {id: 'outputShapeSelector', style: 'font-size: 18px;'});

        for (var val in outputShapes) {
            var currentOption = $('<option />', {value: val, text: outputShapes[val], selected: val === theDataType.value.shape});
            currentOption.appendTo(outputShapeSelector);
        }

        var configurationPanel = $('<div/>', {id: 'theConfigurationPanel'});

        var selectedFileName = null;
        var selectedFile = null;

        var inputField = null;
        var newShapeType = null;


        outputShapeSelector.on('change', function (e) {

            newShapeType = this.value;

            $('#outputShapeSelector').val(newShapeType);

            if (newShapeType == SVGPATHGROUP_MARK) {

                configurationPanel.append('<br /><br />');

                inputField = $('<input />', {type: 'file', id: 'theSVGFileInputID'});

                inputField.change(function (evt) {

                    if (LOG)
                        console.log("input:");
                    if (LOG)
                        console.log(inputField);

                    var filename = $(this).val();
                    selectedFileName = filename;

                    selectedFile = this.files[0];
                    if (LOG)
                        console.log("selectedFile:");
                    if (LOG)
                        console.log(selectedFile);
                });

                configurationPanel.append(inputField);
                mainDiv.tooltipster('content', configurationPanel);

                $('#outputShapeSelector').val(newShapeType);

                configurationPanel.show();

            } else {

                if (inputField) {


                    inputField.remove();

                    configurationPanel.find('br').remove();


                    mainDiv.tooltipster('content', configurationPanel);

                    inputField = null;

                    $('#outputShapeSelector').val(newShapeType);
                }

            }
        });

        configurationPanel.append($('<label/>', {text: "Shape: ", style: "margin-right: 5px; font-size: 18px;"}));
        configurationPanel.append(outputShapeSelector);
        configurationPanel.append($('<span>&nbsp;&nbsp;&nbsp;</span>'));

        var okButton = $('<button/>', {text: "OK", class: "square", style: "width: 75px; margin-right: 3px; border-color: #000; border-style: solid; border-width: 2px; color: black; "});

        okButton.click(function () {

            var currentShapeType = this.shape;

            if (newShapeType) {

                if (newShapeType == SVGPATHGROUP_MARK) {

                    var reader = new FileReader();
                    reader.onload = (function (file) {
                        return function (evt) {
                            svgFileReadFunction(evt, file)
                        };
                    })(selectedFile);
                    if (selectedFile) {
                        reader.readAsText(selectedFile);
                    }

                } else {

                    if (currentShapeType != newShapeType) {

                        theDataType.inConnectors.forEach(function (inConnector) {
                            inConnector.contract();
                        });

//                        var shapeValue = theDataType.createValue(newShapeType, null);
                        var shapeValue = createShapeValue(newShapeType, null);

                        theDataType.setValue(shapeValue, true);

                        theDataType.outConnectors.forEach(function (outConnector) {
                            outConnector.setValue(shapeValue, false, false);
                        });

                    }
                }

            } else {

                // This point is reached when an SGV path group is loaded and it will be changed by another one. As there is no "change" in the select element, 
                // the newShapeType variable will be null. However, a file might have been selected by the user, so this should be checked

                if (currentShapeType == SVGPATHGROUP_MARK && selectedFile) {

                    var reader = new FileReader();
                    reader.onload = (function (file) {
                        return function (evt) {
                            svgFileReadFunction(evt, file)
                        };
                    })(selectedFile);
                    if (selectedFile) {
                        reader.readAsText(selectedFile);
                    }
                }
            }


            mainDiv.tooltipster('hide');
        });
        configurationPanel.append(okButton);

        mainDiv.tooltipster({
            content: configurationPanel,
            animation: 'grow',
            trigger: 'click',
            interactive: true,
            position: 'right',
            multiple: true
        });

        theDataType.configurator = mainDiv;


        // positioning and showing the configurator        
        var centerPoint = theDataType.getPointByOrigin('center', 'center');
        var screenCoords = getScreenCoordinates(centerPoint);
        mainDiv.css('position', 'absolute');
        mainDiv.css('top', screenCoords.y + 'px');
        mainDiv.css('left', screenCoords.x + 'px');
        mainDiv.tooltipster('reposition');
        mainDiv.tooltipster('show');



    }


});
DataType.call(ShapeData.prototype);

function createShapeValue(shape, svgPathGroupMark) {
    
    console.log("svgPathGroupMark:");
    console.log(svgPathGroupMark);
    
    return new Value({isShapeData: true, shape: shape, svgPathGroupMark: svgPathGroupMark});
}