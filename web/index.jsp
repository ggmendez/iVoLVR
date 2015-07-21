<%@page import="classes.OpenCVLoader"%>
<!DOCTYPE html>
<html style="overflow-x: no-display;">
    <head>
        <title>iVoLVR: Interactive Visual Language for Visual Reasoning</title>
        <meta charset="UTF8">

        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        <link rel="stylesheet" type="text/css" href="./css/main.css" />
        <link rel="stylesheet" type="text/css" href="./css/kickstart.css" media="all" />
        <link rel="stylesheet" type="text/css" href="./style.css" media="all" />

        <link rel="stylesheet" type="text/css" href="./css/operators.css" />
        <link rel="stylesheet" type="text/css" href="./css/functions.css" />        
        <link rel="stylesheet" type="text/css" href="./css/collections.css" />        
        <link rel="stylesheet" type="text/css" href="./css/values.css" />        
        <link rel="stylesheet" type="text/css" href="./css/marks.css" />    
        <link rel="stylesheet" type="text/css" href="./css/generators.css" />    

        <link rel="stylesheet" type="text/css" href="./css/fonts/fontawesome/css/font-awesome.css" media="all" />
        <link rel="stylesheet" type="text/css" href="./css/fonts/font-awesome-4.2.0/css/font-awesome.css" media="all" />

        <script type="text/javascript" src="./js/jquery-ui-1.10.4/js/jquery-1.10.2.js"></script>
        <script type="text/javascript" src="./js/jquery-ui-1.10.4/js/jquery.ajaxfileupload.js"></script>        
        <script type="text/javascript" src="./js/jquery-ui-1.10.4/js/jquery-ui-1.10.4.min.js"></script>
        <script type="text/javascript" src="./js/jquery-ui-1.10.4/js/jquery.path.js"></script>
        <script type="text/javascript" src="./js/kickstart.js"></script>
        <script type="text/javascript" src="./fabric.js-1.4.12/dist/fabric.js"></script>
        <!--<script type="text/javascript" src="./fabric.js-1.5/dist/fabric.js"></script>-->
        <script type="text/javascript" src="./js/moment.js"></script>
        <script type="text/javascript" src="./js/alertify.js-0.3.11/lib/alertify.js"></script>
        <script type="text/javascript" src="./js/jquery.ui.touch-punch.min.js"></script>

        <link rel="stylesheet" href="./js/alertify.js-0.3.11/themes/alertify.core.css" />
        <link rel="stylesheet" href="./js/alertify.js-0.3.11/themes/alertify.default.css" />

        <script type="text/javascript" src="./js/globals.js"></script>
        <script type="text/javascript" src="./js/util/generalFunctions.js"></script>
        <script type="text/javascript" src="./js/project/Project.js"></script>
        <script type="text/javascript" src="./js/interaction/canvasEvents.js"></script>
        <script type="text/javascript" src="./js/interaction/objectsEvents.js"></script>
        <script type="text/javascript" src="./js/interaction/widgetsEvents.js"></script>
        <script type="text/javascript" src="./js/interaction/blobsCounter.js"></script>

        <link rel="stylesheet" type="text/css" href="./css/tooltipster.css" />
        <script type="text/javascript" src="./js/tooltipster/js/jquery.tooltipster.js"></script>
        <script type="text/javascript" src="./js/hammer.js/hammer.js"></script>
        <script type="text/javascript" src="./js/jsts/javascript.util.js"></script>
        <script type="text/javascript" src="./js/jsts/jsts.js"></script>        
        <script type="text/javascript" src="./js/simplify.js/simplify.js"></script>
        <script type="text/javascript" src="./js/classes/operators/Operator.js"></script>
        <script type="text/javascript" src="./js/classes/operators/AdditionOperator.js"></script>
        <script type="text/javascript" src="./js/classes/operators/SubtractionOperator.js"></script>
        <script type="text/javascript" src="./js/classes/operators/MultiplicationOperator.js"></script>
        <script type="text/javascript" src="./js/classes/operators/DivisionOperator.js"></script>
        <script type="text/javascript" src="./js/classes/Connector.js"></script>
        
        <script type="text/javascript" src="./js/classes/iconPaths.js"></script>
        <script type="text/javascript" src="./js/classes/VisualProperty.js"></script>
        
        <script type="text/javascript" src="./js/classes/marks/Mark.js"></script>
        <script type="text/javascript" src="./js/classes/marks/EllipticMark.js"></script>
        <script type="text/javascript" src="./js/classes/marks/CircularMark.js"></script>
        <script type="text/javascript" src="./js/classes/marks/SquaredMark.js"></script>
        <script type="text/javascript" src="./js/classes/marks/RectangularMark.js"></script>
        <script type="text/javascript" src="./js/classes/marks/FatFontMark.js"></script>
        <script type="text/javascript" src="./js/classes/marks/SVGPathGroupMark.js"></script>
        <script type="text/javascript" src="./js/classes/marks/SVGPathMark.js"></script>
        <script type="text/javascript" src="./js/classes/marks/PathMark.js"></script>
        <script type="text/javascript" src="./js/classes/vixors/Vixor.js"></script>
        <script type="text/javascript" src="./js/classes/vixors/SVGPathVixor.js"></script>
        <script type="text/javascript" src="./js/classes/vixors/SamplerVixor.js"></script>
        <script type="text/javascript" src="./js/classes/vixors/TextualVixor.js"></script>
        <script type="text/javascript" src="./js/classes/TextInput.js"></script>
        <script type="text/javascript" src="./js/classes/FreeSelection.js"></script>
        <script type="text/javascript" src="./js/classes/Player.js"></script>        
        <script type="text/javascript" src="./js/classes/LabeledRect.js"></script>
        <script type="text/javascript" src="./js/classes/DataWidget.js"></script>
        <script type="text/javascript" src="./js/classes/Aggregator.js"></script>
        <script type="text/javascript" src="./js/classes/Locator.js"></script>
        <script type="text/javascript" src="./js/classes/types/Value.js"></script>
        <script type="text/javascript" src="./js/classes/types/DataType.js"></script>
        <script type="text/javascript" src="./js/classes/types/NumericData.js"></script>
        <script type="text/javascript" src="./js/classes/types/StringData.js"></script>
        <script type="text/javascript" src="./js/classes/types/DateAndTimeData.js"></script>
        <script type="text/javascript" src="./js/classes/types/DurationData.js"></script>
        <script type="text/javascript" src="./js/classes/types/ColorData.js"></script>
        <script type="text/javascript" src="./js/classes/types/ShapeData.js"></script>
        <script type="text/javascript" src="./js/js-quantities/src/quantities.js"></script>
        <script type="text/javascript" src="./js/classes/functions/CollectionGetter.js"></script>
        <script type="text/javascript" src="./js/classes/functions/CollectionAttributeSelector.js"></script>
        <script type="text/javascript" src="./js/classes/functions/Mapper.js"></script>
        <script type="text/javascript" src="./js/classes/functions/VerticalCollection.js"></script>
        <script type="text/javascript" src="./js/classes/functions/NumericCollectionGenerator.js"></script>
        <script type="text/javascript" src="./js/classes/functions/MapperInput.js"></script>
        <script type="text/javascript" src="./js/classes/functions/MapperOutput.js"></script>
        <script type="text/javascript" src="./js/classes/functions/NumberGenerator.js"></script>
        <script type="text/javascript" src="./js/classes/functions/NumberGeneratorOutput.js"></script>
        <script type="text/javascript" src="./js/classes/functions/NumericFunction.js"></script>
        <script type="text/javascript" src="./js/classes/functions/NumericFunctionInput.js"></script>
        <script type="text/javascript" src="./js/classes/functions/NumericFunctionOutput.js"></script>
        <script type="text/javascript" src="./js/classes/functions/FunctionDrawingCanvas.js"></script>
        <script type="text/javascript" src="./js/classes/functions/FunctionValuesCollection.js"></script>
        <script type="text/javascript" src="./js/colors.js"></script>
        <script type="text/javascript" src="./js/jsGradient.js"></script>
        <script type="text/javascript" src="./js/PapaParse/papaparse.min.js"></script>
        <script type="text/javascript" src="./js/FileSaver/FileSaver.min.js"></script>
        <script type="text/javascript" src="./js/mathjs/dist/math.min.js"></script>
        <script type="text/javascript" src="./js/colormix-1.0.0.min.js"></script>
        <script type="text/javascript" src="./js/webcamjs/webcam.js"></script>
        <script type="text/javascript" src="./js/h5utils.js"></script>
        <script type="text/javascript" src="./js/jquery.xdomainajax.js"></script>
        <script type="text/javascript" src="./js/resizeEvents/jquery.resize.js"></script>
        <script type="text/javascript" src="./js/jquery.drag.resize.js"></script>

        <% new OpenCVLoader();%>

    </head>

    <body oncontextmenu="return false;" onresize="adjustCanvasDimensions();" onload="noBack();" onpageshow="if (event.persisted) noBack();" onunload="">

        <!--------------------->
        <!-- HORIZONTAL MENU -->
        <!--------------------->
        <ul id="theMenu" class="menu nonSelection">

            <!--------------->
            <!-- FILE MENU -->
            <!--------------->
            <li id="fileMenu" class="verticalRightDivider verticalRightDivider2">
                <a href="javascript:void(0);">
                    <i class="fa fa-file-o fa-2x"></i>
                </a>
                <ul>
                    <li><a href="javascript:void(0);" onclick="saveProject();"><i id="saveProjectElement" class="fa-save icon-large"></i> Save project</a></li>
                    <li><a href="javascript:void(0);" onclick="loadiVoLVRProject();"><i class="fa-folder-open-o icon-large"></i> Open project</a></li>
                    <li> <input type="file" id="dataprojectFileInput" name="someProjectfile" onchange="handleDatafiles(this.files)" style="visibility:hidden;position:absolute;top:-50;left:-50"/></li>                    
                    <li><a href="javascript:void(0);"><i class="fa-lightbulb-o icon-large"></i> Sample projects</a>
                        <ul>
                            <li><a href="javascript:void(0);" onclick="openProjectFile('sampleProjects/Sample1.xml');"> Sample 1</a></li>
                            <li><a href="javascript:void(0);" onclick="openProjectFile('sampleProjects/Sample2.xml');"> Sample 2</a></li>
                            <li><a href="javascript:void(0);" onclick="openProjectFile('sampleProjects/Sample3.xml');"> Sample 3</a></li>
                            <li><a href="javascript:void(0);" onclick="openProjectFile('sampleProjects/Sample4.xml');"> Sample 4</a></li>
                            <li><a href="javascript:void(0);" onclick="openProjectFile('sampleProjects/Sample5.xml');"> Earth & Sun</a></li>
                        </ul>
                    </li>                                                            
                    <li class="divider"><a href="javascript:void(0);"><i class="fa-download icon-large"></i> Export canvas</a>
                        <ul>
                            <li><a href="javascript:void(0);" onclick="saveCanvas();"><i id="saveCanvasElement" class="fa-file-code-o icon-large"></i> As SVG</a></li>
                            <li><a href="javascript:void(0);" onclick="saveCanvas();"><i id="saveCanvasElement" class="fa-file-image-o icon-large"></i> As PNG</a></li>
                        </ul>
                    </li>
                </ul>
            </li>

            <!--------------->
            <!-- IMPORTING -->
            <!--------------->
            <li class=""><a href="javascript:onLoad();"><i class="icon-picture fa-2x"></i></a></li>
            <li> <input type="file" id="imageFileInput" name="someFile" onchange="handleImageFiles(this.files)" style="visibility:hidden;position:absolute;top:-50;left:-50"/></li>
            <li class="verticalLeftDivider"><a href="javascript:void(0);" onclick="showCameraSignal();"><i id="openCameraButton" class="fa fa-camera fa-2x"></i></a></li>
            <li class="verticalLeftDivider"><a href="javascript:readSVGFileAsData();"><i class="fa fa-file-code-o fa-2x"></i></a></li>
            <li> <input type="file" id="dataSVGFileInput" name="someSVGDataFile" onchange="handleSVGFiles(this.files, false)" style="visibility:hidden;position:absolute;top:-50;left:-50"/></li>
            <li class="verticalLeftDivider"><a href="javascript:loadDatafile();"><i class="icon-table fa-2x"></i></a></li>
            <li> <input type="file" id="dataimageFileInput" name="someDatafile" onchange="handleDatafiles(this.files)" style="visibility:hidden;position:absolute;top:-50;left:-50"/></li>
            <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2"><a href="javascript:void(0);" onclick="showWebPage();"><i id="openWebPageButton" class="fa fa-globe fa-2x"></i></a></li>

            <!---------->
            <!-- ZOOM -->
            <!---------->
            <li class=""><a href="javascript:zoomIn();" onclick=""><i class="icon-zoom-in fa-2x"></i></a></li>
            <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2"><a href="javascript:zoomOut();" onclick=""><i class="icon-zoom-out fa-2x"></i></a></li>

            <!------------------->
            <!-- DRAGGING MODE -->
            <!------------------->
            <li class=""><a id="panningModeActivatorLink" href="javascript:void(0);" onclick="activatePanningMode();"><i class="icon-hand-up fa-2x"></i></a></li>
            <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2"><a id="panningModeDeActivatorLink" href="javascript:void(0);" onclick="deActivatePanningMode();"><i class="fa fa-unlink fa-2x"></i></a></li>

            <!--------------------->
            <!-- TEXT EXTRACTORS -->
            <!--------------------->
            <li class=""><a id="lineTextualVixor" href="javascript:void(0);" onclick="drawTextualVixor('lineExtractor', this);"><i class="icon-strikethrough fa-2x"></i></a></li>
            <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2"><a id="blockTextualVixor" href="javascript:void(0);" onclick="drawTextualVixor('blockExtractor', this);"><i class="fa fa-stop fa-2x"></i></a></li>

            <!-------------------->
            <!-- COLOR SAMPLERS -->
            <!-------------------->
            <li class=""> <a id="samplerButton" href="javascript:void(0);" onclick="samplerButtonClicked();"><i class="collections-freeSampler" style="font-size: 26px;"></i> </a></li>
            <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2"><a id="samplerLineButton" href="javascript:void(0);" onclick="samplerLineButtonClicked();"><i class="collections-straightSampler" style="font-size: 26px;"></i> </a></li>
            <li class="verticalRightDivider"><a href="javascript:void(0);" onclick="duplicateObject();"><i class="fa fa-copy fa-2x"></i></a></li>

            <!--------------->
            <!-- MORE MENU -->
            <!--------------->
            <li id="configMenu" class="verticalRightDivider verticalRightDivider2">
                <a href="javascript:void(0);">
                    <i class="fa fa-plus fa-2x"></i>
                </a>
                <ul>
                    <li><a id="toggleConnectorsVisibilityActivatorLink" href="javascript:toggleConnectorsVisibility();"><i id="checkConnectorsVisibility" class="icon-check"></i> Show connectors</a></li>
                    <li><a href="javascript:void(0);" onclick="deleteObject();"><i class="fa-remove icon-large"></i> Remove object</a></li>
                    <li><a href="javascript:void(0);" onclick="deleteAllObjects();"><i class="fa-trash-o icon-large"></i> Clear canvas</a></li>
                </ul>
            </li>
            <li class="verticalLeftDivider2" style="float: right;"><a id="toggleAdditionalToolsVisibility" href="javascript:void(0);" onclick="togglePanelVisibility('#rightPanel');"><i class="fa fa-chevron-right fa-2x"></i></a></li>
        </ul>

        <div class="clear"></div>

        <div class="grid">

            <div class="col_12" id="mainContainer">

                <div class="rightPanel nonSelection" id="rightPanel" draggable="false">

                    <!-- MARKS -->
                    <h6 id="marksListH6" onclick="togglePanelVisibility('#marksList', false);" style="cursor: pointer;" class="nonSelection sectionHeader"><span class="fa fa-angle-down" style="margin-right: 5px;"></span>Marks</h6>
                    <ul id="marksList" class="horizontalButtomsRow">
                        <li id="circlePrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-circle"></i></a></li>
                        <li id="rectPrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-rectangle"></i></a></li>
                        <li id="squarePrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-square"></i></a></li>
                        <li id="pathMarkPrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-pathMark"></i></a></li>
                        <li id="fatFontPrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-fatfont"></i></a></li>
                        <li id="ellipsePrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-ellipse"></i></a></li>
                        <li style="visibility:hidden;position:absolute;top:0;left:0"> <input type="file" id="svgimageFileInput" name="someSVGFile" onchange="handleSVGFiles(this.files, true)"/></li>
                        <li id="filePrototype" unselectable='on' onselectstart='return false;' onmousedown='return false;' draggable="false" class="buttonInHorizontalList" style="height: 50px; margin-top: 3px; margin-bottom: 0px;"><a onclick="loadSVGFile();"><i class="mark-svg" style="margin-left: -100px; margin-right: 10px;"> </i> <span style="margin-top: 4px; position: absolute;">Create from SVG</span> </a></li>
                        <li id="drawPathMark" unselectable='on' onselectstart='return false;' onmousedown='drawPathMarkButtonClicked();' draggable="false" class="buttonInHorizontalList" style="height: 50px; margin-bottom: 0px;"><a><i class="mark-path" style="margin-left: -70px; margin-right: 10px;"> </i> <span style="margin-top: 4px; position: absolute;">Draw path</span> </a></li>
                        <li id="drawFilledMark" unselectable='on' onselectstart='return false;' onmousedown='drawFilledMarkButtonClicked();' draggable="false" class="buttonInHorizontalList" style="height: 50px; margin-bottom: 0px;"><a><i class="mark-filled" style="margin-left: -110px; margin-right: 10px;"> </i> <span style="margin-top: 4px; position: absolute;">Draw filled mark</span> </a></li>
                    </ul>
                    <hr />
                    
                    <!-- VALUES (DATA TYPES) -->
                    <h6 id="datatypesListH6" onclick="togglePanelVisibility('#datatypesList', false);" style="cursor: pointer;" class="nonSelection sectionHeader"><span class="fa fa-angle-down" style="margin-right: 5px;"></span>Values</h6>
                    <ul id="datatypesList" class="horizontalButtomsRow">
                        <li id="isColorData" draggable="true" class="dragElement circularBorder" style="margin-right: 12px; margin-bottom: 10px;"><a><i class="value-color"></i></a></li>
                        <li id="isStringData" draggable="true" class="dragElement circularBorder" style="margin-right: 12px; margin-bottom: 10px;"><a><i class="value-string"></i></a></li>
                        <li id="isNumericData" draggable="true" class="dragElement circularBorder" style="margin-right: 12px; margin-bottom: 10px;"><a><i class="value-number"></i></a></li>
                        <li id="isShapeData" draggable="true" class="dragElement circularBorder" style="margin-right: 12px;"><a><i class="value-shape"> </i> </a></li>
                        <li id="isDurationData" draggable="true" class="dragElement circularBorder" style="margin-right: 12px;"><a><i class="value-duration"> </i> </a></li>
                        <li id="isDateAndTimeData" draggable="true" class="dragElement circularBorder" style="margin-right: 12px;"><a><i class="value-dateAndTime"></i></i></a></li>
                    </ul>
                    <hr />

                    <!-- OPERATORS -->
                    <h6 id="operatorsListH6" onclick="togglePanelVisibility('#operatorsList', false);" style="cursor: pointer;" class="nonSelection sectionHeader"><span class="fa fa-angle-down" style="margin-right: 5px;"></span>Operators</h6>
                    <ul id="operatorsList" class="horizontalButtomsRow">
                        <li id="division-operator" draggable="true" class="dragElement circularBorder" style="margin-right: 5px;"><a><i class="operator-divisonIcon"></i></a></li>
                        <li id="multiplication-operator" draggable="true" class="dragElement circularBorder"><a><i class="operator-multiplicationIcon"></i></a></li>
                        <li id="subtraction-operator" draggable="true" class="dragElement circularBorder"><a><i class="operator-subtractionIcon"></i></a></li>
                        <li id="addition-operator" draggable="true" class="dragElement circularBorder"><a><i class="operator-additionIcon"></i></a></li>
                    </ul>
                    <hr />
                    
                    <!-- COLLECTIONS -->
                    <h6 id="draggableWidgetsListH6" onclick="togglePanelVisibility('#draggableWidgetsList', false);" style="cursor: pointer;" class="nonSelection sectionHeader"><span class="fa fa-angle-down" style="margin-right: 5px;"></span>Collections</h6>
                    <ul id="draggableWidgetsList" class="horizontalButtomsRow">
                        <li id="collectionGetterWidget" draggable="true" class="dragElement boxDivider" style="margin-right: 5px;"><a><i class="fa fa-angellist"></i></a></li>
                        <li id="collectionAttributeSelectorWidget" draggable="true" class="dragElement boxDivider" style="margin-right: 5px;"><a><i class="fa fa-archive"></i></a></li>
                        <li id="mapperWidget" draggable="true" class="dragElement boxDivider" style="margin-right: 5px;"><a><i class="collections-mapper"></i></a></li>
                        <li id="verticalCollection" draggable="true" class="dragElement boxDivider" style="margin-right: 3px;"><a><i class="collections-collection" ></i></a></li>
                        <li id="numberGenerator" draggable="true" class="dragElement boxDivider" style="margin-right: 5px;"><a><i class="generator-number"></i></a></li> 
                        <li id="collectionGenerator" draggable="true" class="dragElement boxDivider" style="margin-right: 3px;"><a><i class="collections-generator"></i></a></li>
                    </ul>
                    <hr />
                    
                    <!-- FUNCTIONS -->
                    <h6 id="functionsListH6" onclick="togglePanelVisibility('#functionsList', false);" style="cursor: pointer;" class="nonSelection sectionHeader"><span class="fa fa-angle-down" style="margin-right: 5px;"></span>Functions</h6>
                    <ul id='functionsList' class="horizontalButtomsRow">
                        <li id="xFunction" draggable="true" class="dragElement boxDivider"><a><i class="function-x"></i></a></li>
                        <li id="emptyFunction" draggable="true" class="dragElement boxDivider"><a><i class="function-empty"></i></a></li>
                        <li id="locatorWidget" draggable="true" class="dragElement boxDivider"><a><i class="collections-locator" style="font-size: 25px;"></i></a></li>
                        <li id="cosXFunction" draggable="true" class="dragElement boxDivider"><a><i class="function-cosx"></i></a></li>
                        <li id="sinXFunction" draggable="true" class="dragElement boxDivider"><a><i class="function-sinx"></i></a></li>
                        <li id="x2Function" draggable="true" class="dragElement boxDivider"><a><i class="function-x2"></i></a></li>
                        <li id="logXFunction" draggable="true" class="dragElement boxDivider"><a><i class="function-logx"></i></a></li>
                        <li id="sqrtXFunction" draggable="true" class="dragElement boxDivider"><a><i class="function-sqrtx"></i></a></li>
                        <li id="x3Function" draggable="true" class="dragElement boxDivider"><a><i class="function-x3"></i></a></li>
                        <li id="drawFunction" unselectable='on' onselectstart='return false;' onmousedown='drawFunctionButtonClicked();' draggable="false" class="buttonInHorizontalList"><a><i class="function-draw" style="margin-left: -87px; margin-right: 10px;"> </i> <span style="margin-top: 4px; position: absolute;">Draw function</span></a></li>
                        <li id="enterFunction" unselectable='on' onselectstart='return false;' onmousedown='enterFunctionButtonClicked();' draggable="false" class="buttonInHorizontalList">
                            <a><i class="fa-superscript icon-large" style="margin-left: -17px; margin-right: 10px;"></i>Enter definition</a>
                        </li>
                    </ul>

                </div>

                <section id="drop">
                    <div id="canvasContainer" class="canvasStyle">
                        <canvas id="theCanvas"></canvas>
                    </div>
                </section>

            </div>

        </div><!-- END GRID -->


        <script type="text/javascript">

            $(document).ready(function () {
                $('.tooltip').tooltipster();
            });
           
            // global variables
            var previousX = null;
            var previousY = null;
            var previousAngle = null;
            alertify.set({buttonReverse: true});
            var brushColor = "#000000";
            var brushWidth = 5;

            // create a wrapper around native canvas element (with id="theCanvas")            
            var canvas = new fabric.Canvas('theCanvas', {backgroundColor: "#ffffff", renderOnAddRemove: false});

            // WACOM plugin
            var plugin = document.getElementById('wtPlugin');
            if (LOG)
                console.log("plugin:");
            if (LOG)
                console.log(plugin);

            var width = $('#mainContainer').width();
//            var height = $('#footer').position().top - $('#canvasContainer').position().top;
            var height = $(document).height() - $('#theMenu').height();
            if (LOG)
                console.log("$(document).height() :" + $(document).height());
            if (LOG)
                console.log("$('#theMenu').height() :" + $('#theMenu').height());
            if (LOG)
                console.log("height :" + height);
            if (LOG)
                console.log("height: " + height);
            canvas.setWidth(width);
            canvas.setHeight(height);
            canvas.selection = false;
            canvas.connectorsHidden = false;
            canvas.selectionColor = 'rgba(229,238,244,0.2)';
            canvas.selectionBorderColor = '#7c7064';
            canvas.selectionLineWidth = 3;

            $("#canvasContainer").on('mousewheel', function (ev) {
                hideOpenTooltips();
                ev.preventDefault();
                var e = ev.originalEvent;
                displaywheel(e);
            });

            var canvasContainerElement = document.querySelector("#canvasContainer");
            var manager = new Hammer.Manager(canvasContainerElement);
            manager.add(new Hammer.Tap({event: 'doubletap', taps: 2, threshold: 500, interval: 1000, time: 600, posThreshold: 75}));
            manager.add(new Hammer.Press({event: 'press', time: 450}));
            var pan1Finger = new Hammer.Pan({event: 'pan1Finger', pointers: 1});
            manager.add(pan1Finger);
            var pinch = new Hammer.Pinch({event: 'pinch'});
            manager.add(pinch);
            manager.on("doubletap", function (ev) {
                if (LOG)
                    console.log("%cdoubletap detected", "background: #1f656a; color: white;");
                if (LOG)
                    console.log(ev);
                canvasDoubleTap(ev);
            });
            manager.on("press", function (ev) {
                if (LOG)
                    console.log(ev);
                canvasPressEvent(ev);
            });
            
            // ####################################################################################### //
            // ###################### PANNING WITH 1 FINGER (TO CUT CONNECTORS) ###################### //
            // ####################################################################################### //
            manager.on("pan1Fingerstart", function (ev) {

                if (!canvas.activePanningMode) {

                    if (!canvas.isDrawingMode && !canvas.getActiveObject() && !canvas.getActiveGroup()) {
                        if (LOG)
                            console.log("STARTING pan1Finger");
                        if (LOG)
                            console.log(ev);
                        canvas.pan1Fingerstarted = true;
                        gestureSetEnabled(manager, 'pinch', false);
                    }

                } else {

                    // This is to allow the canvas panning with one finger

                    if (LOG)
                        console.log("STARTING pan1Finger in PANNING MODE");
                    if (LOG)
                        console.log(ev);
                    canvas.viewportLeft = canvas.viewportTransform[4];
                    canvas.viewportTop = canvas.viewportTransform[5];
                    gestureSetEnabled(manager, 'pinch', false);
                }

                hideOpenTooltips();

            });
            manager.on("pan1Fingermove", function (ev) {

                if (!canvas.activePanningMode) {

                    if (!canvas.isDrawingMode && !canvas.getActiveObject() && !canvas.getActiveGroup() && canvas.pan1Fingerstarted) {
                        if (LOG)
                            console.log("MOVING pan1Finger");
                        if (LOG)
                            console.log(ev);
                    }

                } else {

                    // This should only happen when the mouse event happens over a zone where NO objects are being touched
                    if (!canvas.isDrawingMode && !canvas.getActiveObject() && !canvas.getActiveGroup()) {

                        var x = -canvas.viewportLeft - ev.deltaX;
                        var y = -canvas.viewportTop - ev.deltaY;
                        canvas.absolutePan(new fabric.Point(x, y));
                    }

                }


            });
            manager.on("pan1Fingerend", function (ev) {

                if (!canvas.activePanningMode && !canvas.isSamplingLineMode) {

                    if (!canvas.isDrawingMode && !canvas.getActiveObject() && !canvas.getActiveGroup() && canvas.pan1Fingerstarted && !canvas.connectorsHidden) {

                        if (LOG)
                            console.log("END pan1Finger");
                        if (LOG)
                            console.log(ev);
                        var xPage, yPage;
                        var viewportLeft = canvas.viewportTransform[4];
                        var viewportTop = canvas.viewportTransform[5];
                        var xPage = ev.pointers[0].pageX;
                        var yPage = ev.pointers[0].pageY;
                        var x2 = (xPage - viewportLeft - $('#theCanvas').offset().left) / canvas.getZoom();
                        var y2 = (yPage - viewportTop - $('#theCanvas').offset().top) / canvas.getZoom();
                        var x1 = (xPage - ev.deltaX - viewportLeft - $('#theCanvas').offset().left) / canvas.getZoom();
                        var y1 = (yPage - ev.deltaY - viewportTop - $('#theCanvas').offset().top) / canvas.getZoom();
                        var p1 = new fabric.Point(x1, y1);
                        var p2 = new fabric.Point(x2, y2);
                        var line = {x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y};
                        var crossedConnectors = getConnectorsCrossedByLine(line);
                        if (LOG)
                            console.log(crossedConnectors.length + " connectors crossed!");
                        crossedConnectors.forEach(function (object) {
                            var connector = object.connector;
                            var splitPoint = object.splitPoint;
                            connector.split(splitPoint, line);
                        });
                        canvas.pan1Fingerstarted = false;
                    }
                    gestureSetEnabled(manager, 'pinch', true);
                } else {

                    gestureSetEnabled(manager, 'pinch', true);
                }




            });
            // ###################################################### //
            // ###################### PINCHING ###################### //
            // ###################################################### //

            manager.on("pinchstart", function (ev) {
                if (!canvas.getActiveObject() && !canvas.getActiveGroup()) {
                    canvas.zoomBeforePanning = canvas.getZoom();
                }
            });
            manager.on("pinchmove", function (ev) {
                //                if (LOG) console.log("%cpinchmove", "background: aqua");
                //                if (LOG) console.log(ev);
                if (!canvas.getActiveObject() && !canvas.getActiveGroup()) {
                    var center = new fabric.Point(ev.center.x, ev.center.y);
                    canvas.zoomToPoint(center, canvas.zoomBeforePanning * ev.scale);
                    canvas.renderAll();
                }
            });
            manager.on("pinchend", function (ev) {

            });
            canvas.allowTouchScrolling = false;
            var lastCopiedObject = null;
            bindCanvasDefaultEvents();

            var copiedObject;
            var canvasScale = 1;

            /*$("#freeSelectionButton").click(function () {
             if (canvas.isFreeSelectionMode) {
             deActivateFreeSelectionMode();
             } else {
             activateFreeSelectionMode();
             }
             });*/
            /*$("#transmogrifyButton").click(function () {
             if (canvas.isTransmogrificationMode) {
             deActivateTransmogrificationMode();
             } else {
             activateTransmogrificationMode();
             }
             });

             $("#rectSelectionButton").click(function () {
             if (canvas.isRectSelectionMode) {
             deActivateRectSelectionMode();
             } else {
             activateRectSelectionMode();
             }
             });*/
    
            // button Zoom In
            $("#btnZoomIn").click(function () {
                zoomIn();
            });
            // button Zoom Out
            $("#btnZoomOut").click(function () {
                zoomOut();
            });
            // button Reset Zoom
            $("#btnResetZoom").click(function () {
                resetZoom();
            });
          
            $("#locatorWidget").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100;  margin-top: -1px; margin-left: 38px;'><li><i class='icon-screenshot icon-2x'></i></li></div>");
                }
            });
            $("#mapperWidget").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100;'><li><i class='collections-mapper'></i></li></div>");
                }
            });
            $("#collectionGetterWidget").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100;'><li><i class='fa fa-angellist'></i></li></div>");
                }
            });
            $("#collectionAttributeSelectorWidget").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100;'><li><i class='fa fa-archive'></i></li></div>");
                }
            });
            $("#numericFunctionWidget").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100;'><li><i class='fa-child icon-2x'></i></li></div>");
                }
            });
            $("#verticalCollection").draggable({
                cursorAt: {top: 18.5, left: 30},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100;'><li><i class='collections-collection'></i></li></div>");
                }
            });
            $("#collectionGenerator").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
//                    return $("<div style='z-index: 100;'><li><i class='collections-generator'></i></li></div>");
                    return $("<div style='z-index: 100; margin-top: -1px; margin-left: 38px;'><li><i class='collections-generator'></i></li></div>");
                }
            });
            $("#numberGenerator").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100;'><li><i class='collections-number'></i></li></div>");
                }
            });
            $("#squarePrototype").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100; margin-top: -1px; margin-left: 38px;'><li><i class='mark-square'></i></li></div>");
                }
            });
            $("#pathMarkPrototype").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100; margin-top: -1px; margin-left: 38px;'><li><i class='mark-pathMark'></i></li></div>");
                }
            });
            $("#rectPrototype").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100; margin-top: -1px; margin-left: 38px;'><li><i class='mark-rectangle'></i></li></div>");
                }
            });
            $("#circlePrototype").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
//                    return $("<div style='z-index: 100;'><li><i class='mark-circle'></i></li></div>");
                    return $("<div style='z-index: 100; margin-top: -1px; margin-left: 38px;'><li><i class='mark-circle'></i></li></div>");
                }
            });
            $("#fatFontPrototype").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100; margin-top: -1px; margin-left: 38px;'><li><i class='mark-fatfont'></i></li></div>");
                }
            });
            $("#ellipsePrototype").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100; margin-top: -1px; margin-left: 38px;'><li><i class='mark-ellipse'></i></li></div>");
                }
            });
            $("#isColorData").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100; margin-top: -4px; margin-left: 28px;'><li><i class='value-color' style='border:1px solid #aaa; border-radius: 10em; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px;'></i></li></div>");
                }
            });
            $("#isStringData").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100; margin-top: -4px; margin-left: 28px;'><li><i class='value-string' style='border:1px solid #aaa; border-radius: 10em; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px;'></i></li></div>");
                }
            });
            $("#isNumericData").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100; margin-top: -4px; margin-left: 28px;'><li><i class='value-number' style='border:1px solid #aaa; border-radius: 10em; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px;'></i></li></div>");
                }
            });
            $("#collectionValue").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100; margin-top: -20px; margin-left: -45px;'><li><i class='fa-flickr icon-2x' style='border:1px solid #aaa; border-radius: 5em; padding-top: 13px; padding-bottom: 10px; padding-left: 20px; padding-right: 47px;'></i></li></div>");
                }
            });
            $("#isShapeData").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100; margin-top: -4px; margin-left: 28px;'><li><i class='value-shape' style='border:1px solid #aaa; border-radius: 10em; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px;'></i></li></div>");
                }
            });
            $("#isDurationData").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100; margin-top: -4px; margin-left: 28px;'><li><i class='value-duration' style='border:1px solid #aaa; border-radius: 10em; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px;'></i></li></div>");
                }
            });
            $("#isDateAndTimeData").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100; margin-top: -4px; margin-left: 28px;'><li><i class='value-dateAndTime' style='border:1px solid #aaa; border-radius: 10em; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px;'></i></li></div>");
                }
            });
            $("#addition-operator").draggable({
                cursorAt: {top: 18.5, left: 8},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100; margin-left: -36px; margin-top: 0px; padding-left: 0px; padding-rigth: 60px;'><li><i class='operator-additionIcon' style='border:1px solid #aaa; border-radius: 5em; padding: 1em;'></i></li></div>");
                }
            });
            $("#subtraction-operator").draggable({
                cursorAt: {top: 18.5, left: 8},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100; margin-left: -36px; margin-top: 0px; padding-left: 0px; padding-rigth: 60px;'><li><i class='operator-subtractionIcon' style='border:1px solid #aaa; border-radius: 5em; padding: 1em;'></i></li></div>");
                }
            });
            $("#multiplication-operator").draggable({
                cursorAt: {top: 18.5, left: 8},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100; margin-left: -36px; margin-top: 0px; padding-left: 0px; padding-rigth: 60px;'><li><i class='operator-multiplicationIcon' style='border:1px solid #aaa; border-radius: 5em; padding: 1em;'></i></li></div>");
                }
            });
            $("#division-operator").draggable({
                cursorAt: {top: 18.5, left: 0},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100; margin-left: -36px; margin-top: 0px; padding-left: 0px; padding-rigth: 60px;'><li><i class='operator-divisonIcon' style='border:1px solid #aaa; border-radius: 5em; padding: 1em;'></i></li></div>");
                }
            });
            $("#xFunction").draggable({
                cursorAt: {top: 20, left: 23},
                cursor: 'none',
                helper: function (event) {
//                    return $("<div style='z-index: 100; overflow: auto; border: 1px dashed #555; padding-top: 261px; padding-bottom: 220px;  margin-top:-211px; margin-left:-307px; padding-left: 245px; padding-right: 285px;'><li><i class='function-x'></i></li></div>");
                    return $("<div style='z-index: 100;'><li><i class='function-x'></i></li></div>");
                }
            });
            $("#emptyFunction").draggable({
                cursorAt: {top: 20, left: 23},
                cursor: 'none',
                helper: function (event) {
//                    return $("<div style='z-index: 100; overflow: auto; border: 1px dashed #555; padding-top: 261px; padding-bottom: 220px;  margin-top:-211px; margin-left:-307px; padding-left: 245px; padding-right: 285px;'><li><i class='function-x'></i></li></div>");
                    return $("<div style='z-index: 100;'><li><i class='function-empty'></i></li></div>");
                }
            });
            $("#x2Function").draggable({
                cursorAt: {top: 20, left: 23},
                cursor: 'none',
                helper: function (event) {
//                    return $("<div style='z-index: 100; border: 1px dashed #555; padding-top: 261px; padding-bottom: 220px;  margin-top:-211px; margin-left:-307px; padding-left: 245px; padding-right: 285px;'><li><i class='function-x2'></i></li></div>");
                    return $("<div style='z-index: 100;'><li><i class='function-x2'></i></li></div>");
                }
            });
            $("#x3Function").draggable({
                cursorAt: {top: 20, left: 23},
                cursor: 'none',
                helper: function (event) {
//                    return $("<div style='z-index: 100; border: 1px dashed #555; padding-top: 332px; padding-bottom: 292px;  margin-top:-283px; margin-left:-269px; padding-left: 200px; padding-right: 254px;'><li><i class='function-x3'></i></li></div>");
                    return $("<div style='z-index: 100;'><li><i class='function-x3'></i></li></div>");
                }
            });
            $("#sinXFunction").draggable({
                cursorAt: {top: 20, left: 23},
                cursor: 'none',
                helper: function (event) {
//                    return $("<div style='z-index: 100; border: 1px dashed #555; padding-top: 261px; padding-bottom: 220px;  margin-top:-211px; margin-left:-293px; padding-left: 245px; padding-right: 285px;'><li><i class='function-sinx'></i></li></div>");
                    return $("<div style='z-index: 100;'><li><i class='function-sinx'></i></li></div>");
                }
            });
            $("#cosXFunction").draggable({
                cursorAt: {top: 20, left: 23},
                cursor: 'none',
                helper: function (event) {
//                    return $("<div style='z-index: 100; border: 1px dashed #555; padding-top: 261px; padding-bottom: 215px;  margin-top:-211px; margin-left:-293px; padding-left: 245px; padding-right: 285px;'><li><i class='function-cosx'></i></li></div>");
                    return $("<div style='z-index: 100;'><li><i class='function-cosx'></i></li></div>");
                }
            });
            $("#logXFunction").draggable({
                cursorAt: {top: 20, left: 23},
                cursor: 'none',
                helper: function (event) {
//                    return $("<div style='z-index: 100; border: 1px dashed #555; padding-top: 261px; padding-bottom: 220px;  margin-top:-213px; padding-left: 274px; margin-left:-325px; padding-right: 285px;'><li><i class='function-logx' style:'padding-left:-325px;'></i></li></div>");
                    return $("<div style='z-index: 100;'><li><i class='function-logx'></i></li></div>");
                }
            });
            $("#sqrtXFunction").draggable({
                cursorAt: {top: 20, left: 23},
                cursor: 'none',
                helper: function (event) {
//                    return $("<div style='z-index: 100; border: 1px dashed #555; padding-top: 261px; padding-bottom: 220px;  margin-top:-213px; padding-left: 274px; margin-left:-325px; padding-right: 285px;'><li><i class='function-sqrtx' style:'padding-left:-325px;'></i></li></div>");
                    return $("<div style='z-index: 100;'><li><i class='function-sqrtx'></i></li></div>");
                }
            });
            $("#theCanvas").droppable({
                accept: "#addition-operator, #subtraction-operator, #multiplication-operator, #division-operator, #xFunction, #emptyFunction, #x2Function, #x3Function, #sinXFunction, #cosXFunction, #logXFunction, #sqrtXFunction, #playerWidget, #locatorWidget, #mapperWidget, #collectionGetterWidget, #collectionAttributeSelectorWidget, #numericFunctionWidget, #verticalCollection, #collectionGenerator, #numberGenerator, #rectPrototype, #squarePrototype, #pathMarkPrototype, #circlePrototype, #fatFontPrototype, #ellipsePrototype, #isColorData, #isStringData, #isNumericData, #collectionValue, #isDurationData, #isDateAndTimeData, #isShapeData",
                drop: canvasDropFunction
            });

            activatePanningMode();

            ////////////////////////////////////
            // Creating a vertical collection //
            ////////////////////////////////////
            //addEmptyVerticalCollection(500, 150);

            ///////////////////////
            // Creating a number //
            ///////////////////////
            /*var numberDataType = createDefaultVisualValueByTypeProposition("isNumericData", 400, 250);
             canvas.add(numberDataType);
             numberDataType.animateBirth(false, null, null, false);*/

            //////////////////////////////
            // Creating a date and time //
            //////////////////////////////
            /*var dateAndTimeDataType1 = createDefaultVisualValueByTypeProposition("isDateAndTimeData", 500, 500);
             canvas.add(dateAndTimeDataType1);
             dateAndTimeDataType1.animateBirth(false, null, null, false);*/
            //////////////////////////////
            // Creating a date and time //
            //////////////////////////////
            /*var dateAndTimeDataType2 = createDefaultVisualValueByTypeProposition("isDateAndTimeData", 600, 500);
             canvas.add(dateAndTimeDataType2);
             dateAndTimeDataType2.animateBirth(false, null, null, false);*/
            /////////////////////////
            // Creating a duration //
            /////////////////////////
            /*var durationDataType = createDefaultVisualValueByTypeProposition("isDurationData", 700, 450);
             canvas.add(durationDataType);
             durationDataType.animateBirth(false, null, null, false);*/


            function addSampleMarksToCanvas() {

                var options1 = {
                    left: 100,
                    top: 100,
                    fill: rgb(122, 176, 114),
                    stroke: darkenrgb(122, 176, 114),
                    area: 2000,
                    label: 'Circular mark',
                    markAsSelected: false,
                    animateAtBirth: true
                };
                addMarkToCanvas(CIRCULAR_MARK, options1);
                
                var options2 = {
                    left: 400,
                    top: 100,
                    fill: rgb(255, 151, 40),
                    stroke: darkenrgb(255, 151, 40),
                    area: 12000,
                    label: 'A square',
                    markAsSelected: false,
                    animateAtBirth: true
                };
                addMarkToCanvas(RECTANGULAR_MARK, options2);
                var options3 = {
                    left: 650,
                    top: 100,
                    fill: rgb(180, 115, 168),
                    colorForStroke: darkenrgb(180, 115, 168),
                    fontFamily: 'Miguta',
                    number: 3,
                    fontSize: 80,
                    markAsSelected: false,
                    label: 'A FatFont',
                    animateAtBirth: true
                };
                addMarkToCanvas(FATFONT_MARK, options3);
                var options4 = {
                    left: 850,
                    top: 135,
                    fill: rgb(225, 79, 75),
                    stroke: darkenrgb(225, 79, 75),
                    width: 100,
                    height: 180,
                    label: 'A rectangle',
                    markAsSelected: false,
                    animateAtBirth: true
                };
                var aRectangle = addMarkToCanvas(RECTANGULAR_MARK, options4);
                var options5 = {
                    left: 1080,
                    top: 125,
                    fill: rgb(222, 201, 58),
                    stroke: darkenrgb(222, 201, 58),
                    //                            area: 16000,                
                    rx: 100,
                    ry: 30,
                    angle: -45,
                    label: 'I am an ellipse',
                    markAsSelected: false,
                    animateAtBirth: true
                };
                addMarkToCanvas(ELLIPTIC_MARK, options5);
            }

//            var coordinatesX = [createNumericValue(0), createNumericValue(100)];
//            var coordinatesY = [createNumericValue(0), createNumericValue(100)];
//            addNumericFunction(700, 500, coordinatesX, coordinatesY);
//            addNumericFunction(700, 500);

//            var circleCoordinates = getCircleCoordinates();
//            addNumericFunction(700, 500, circleCoordinates.XCoordinates, circleCoordinates.YCoordinates);
//            addVerticalCollection(1100, 400, circleCoordinates.XCoordinates);
//            addVerticalCollection(1200, 400, circleCoordinates.YCoordinates);

//            addVerticalCollection(100, 700, createNumericValues([13, 34, 56]));



            /*var path = new fabric.Path('M 100 200 L 200 100 L 300 100 L 400 100');
             
             if (LOG) console.log(path);
             
             path.set({left: 120, top: 120});
             canvas.add(path);
             
             if (LOG) console.log("path.path[0][1]:");
             if (LOG) console.log(path.path[0][2]);
             
             
             setTimeout(function () {
             
             path.path[0][2] = 300;
             
             
             updatePathCoords (path);
             
             
             
             
             canvas.renderAll();
             
             },3000);*/

//            addOperator('subtraction', 300, 600);

//            adjustCanvasDimensions();

//            var coordinates = getLinealFunctionCoordinates();
//             addNumericFunction(500, 300, coordinates.XCoordinates, coordinates.YCoordinates);

            ///////////////////////
            // Creating a number //
            ///////////////////////

            /*var numericValue = createNumericValue(80);
             
             var numberDataType = CreateDataTypeFromValue(numericValue);
             
             numberDataType.left= 100;
             numberDataType.top = 200;
             
             canvas.add(numberDataType);
             numberDataType.animateBirth(false, null, null, false);*/


//            addNumberGenerator(500, 700, 0, 100, {});


//            addNumericCollectionGenerator(800, 600);







//            canvas.forEachObject(function (object) {
//
//                if (object.isCircularMark) {
//                    console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
//                    var XMLNode = generateXMLNodeString(object);
//                    console.log(XMLNode);
//                    console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
//                }
//
//
//
//                /*if (object.isMark) {
//                    console.log("*****************************************");
//                    for (var property in object) {
//                        var value = object[property];
//
//                        if ($.isArray(value)) {
////                            console.log(property + '[array] : ' + value);
//                            console.log("%c" + property + '[array] : ' + JSON.stringify(value), "background: red; color: white;");
//                            value.forEach(function (item) {
//                                console.log(item);
//                            });
//                        } else {
//                            var type = typeof value;
//                            if (type !== "function") {
////                            console.log(property + '['+ type +'] : ' + value);
//                                console.log(property + '[' + type + '] : ' + JSON.stringify(value));
//
//                            }
//                        }
//
//                    }
//                    console.log("*****************************************");
//                }*/
//
//            });
//            
//            console.log(typeof 32.6);
//            console.log(typeof '3.2');
//            console.log(typeof false);*/



//            $("#openWebPageButton").click(showWebPage);




            var drop = document.querySelector('#drop');

            function cancel(e) {
                if (e.preventDefault)
                    e.preventDefault(); // required by FF + Safari
                e.dataTransfer.dropEffect = 'copy'; // tells the browser what drop effect is allowed here
                return false; // required by IE
            }

            function entities(s) {
                var e = {
                    '"': '&quot;',
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;'
                };
                return s.replace(/["&<>]/g, function (m) {
                    return e[m];
                });
            }

            addEvent(drop, 'dragover', cancel);
            addEvent(drop, 'dragenter', cancel);

            addEvent(drop, 'drop', function (e) {

                console.log("*** External page element dropped ***");

                if (e.preventDefault) {
                    e.preventDefault(); // stops the browser from redirecting off to the text.
                }

                console.log("e:");
                console.log(e);

                var canvasCoords = getCanvasCoordinates(e);
                var x = canvasCoords.x;
                var y = canvasCoords.y;

                var dataTransfer = e.dataTransfer;
                var text = e.dataTransfer.getData('Text');

                /*console.log("dataTransfer:");
                 console.log(dataTransfer);
                 
                 console.log("text:");
                 console.log(text);*/

                if (e.dataTransfer.types) {
                    [].forEach.call(e.dataTransfer.types, function (type) {
//                        console.log("***" + entities(e.dataTransfer.getData(type) + ' (content-type: ' + type + ')'));
//                        console.log("***" + e.dataTransfer.getData(type) + ' (content-type: ' + type + ')');

                        var contentType = type;
                        var dataString = e.dataTransfer.getData(type);

                        print("content-type " + contentType);

                        if (contentType === "text/html") {

                            var parsedHTML = $.parseHTML(dataString);

                            print("***" + dataString, 'red', 'white');

                            createVisualElementFromHTML(parsedHTML, x, y, true);



                        } else {
//                            print("***" + dataString);
                        }





                    });
                } else {
                    console.log(e.dataTransfer.getData('Text'));
                }

                return false;
            });

            window.history.forward(); // Disabling the back button 
            function noBack() {
                window.history.forward();
            }

//            window.onbeforeunload = function() { return "Are you sure you want to exit?"; };

//            showWebPage();

//            function mouseEventPreventDefault(evt) {
//                console.log("hshshshshs");
//                console.log(evt);
//            }


//            var texts = [
//                '84,951,200',
//                '10,194',
//                '100%',
//                '2014 est.',
//                'Peak Production',
//                '10,107,000 (3/2015)',
//                'Saudi Arabia',
//                '1,946,000 (1/2008)',
//                '0.00%',
//                '1,000',
//                '10.9 million',
//                '(4 %)',
//                '4 %',
//                'Wednesday 09 July 2015',
//                'Wednesday 08 July 2015',
//                '-1',
//                '-10.2',
//                '- 25',
//                'Wednesday 01 July',
//            ];
//            texts.forEach(function (text){
//                var type = guessMostSpecificType(text);
//                console.log(text + " : " + type);
//            });            
//            var visualValues = createVisualValuesFromArray(texts);
//            addVerticalCollectionWithVisualValues(800, 300, visualValues);

//            addCollectionGetter(800, 300);

//                addCollectionAttributeSelector(800, 300);






        </script>





    </body>

</html>