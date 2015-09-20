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
        <link rel="stylesheet" type="text/css" href="./css/fonts/font-awesome-4.4.0/css/font-awesome.css" media="all" />

        <link rel="stylesheet" href="./js/alertify.js-0.3.11/themes/alertify.core.css" />
        <link rel="stylesheet" href="./js/alertify.js-0.3.11/themes/alertify.default.css" />
        <link rel="stylesheet" type="text/css" href="./css/tooltipster.css" />

        <script type="text/javascript" src="./js/jquery-ui-1.10.4/js/jquery-1.10.2.js"></script>
        <script type="text/javascript" src="./js/jquery-ui-1.10.4/js/jquery.ajaxfileupload.js"></script>        
        <script type="text/javascript" src="./js/jquery-ui-1.10.4/js/jquery-ui-1.10.4.min.js"></script>
        <script type="text/javascript" src="./js/jquery-ui-1.10.4/js/jquery.path.js"></script>
        <script type="text/javascript" src="./js/kickstart.js"></script>


        <!--<script type="text/javascript" src="./fabric.js-1.4.12/dist/fabric.js"></script>-->
        <script type="text/javascript" src="./fabric.js-1.6.0-rc.1/dist/fabric.js"></script>

        <script type="text/javascript" src="./js/moment.js"></script>
        <script type="text/javascript" src="./js/alertify.js-0.3.11/lib/alertify.js"></script>
        <script type="text/javascript" src="./js/tooltipster/js/jquery.tooltipster.js"></script>
        <script type="text/javascript" src="./js/jquery.ui.touch-punch.min.js"></script>
        <script type="text/javascript" src="./js/globals.js"></script>



        <script type="text/javascript" src="./js/util/generalFunctions.js"></script>
        <script type="text/javascript" src="./js/project/Project.js"></script>
        <script type="text/javascript" src="./js/interaction/canvasEvents.js"></script>
        <script type="text/javascript" src="./js/interaction/objectsEvents.js"></script>
        <script type="text/javascript" src="./js/interaction/widgetsEvents.js"></script>
        <script type="text/javascript" src="./js/interaction/blobsCounter.js"></script>
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
        <script type="text/javascript" src="./js/classes/vixors/SVGText.js"></script>
        <script type="text/javascript" src="./js/classes/TextInput.js"></script>

        <!--<script type="text/javascript" src="./js/classes/FreeSelection.js"></script>-->

        <script type="text/javascript" src="./js/classes/selection/SquaredSelection.js"></script>

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
        <script type="text/javascript" src="./js/classes/functions/DateGenerator.js"></script>
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

        <script type="text/javascript" src="./js/toPathTransformations.js"></script>
        
        <script type="text/javascript" src="./js/LevenshteinDistance/lib/levenshtein.js"></script>

        <% new OpenCVLoader();%>

    </head>

    <body onresize="adjustCanvasDimensions();" onload="noBack();" onpageshow="if (event.persisted) noBack();" onunload="">
        <!--<body oncontextmenu="return false;" onresize="adjustCanvasDimensions();" onload="noBack();" onpageshow="if (event.persisted) noBack();" onunload="">-->

        <!--------------------->
        <!-- HORIZONTAL MENU -->
        <!--------------------->
        <ul id="theMenu" class="menu nonSelection">

            <!--------------->
            <!-- IMPORTING -->
            <!--------------->



            <li><a href="javascript:void(0);" onclick="onLoad();"><i class="icon-picture fa-2x"></i></a></li>
            <li> <input type="file" accept=".jpeg, .png, .jpg"  id="imageFileInput" name="someFile" onchange="handleImageFiles(this.files)" style="visibility:hidden;position:absolute;top:-50;left:-50"/></li>

            <li class="verticalLeftDivider"><a href="javascript:void(0);" onclick="showCameraSignal();"><i id="openCameraButton" class="fa fa-camera fa-2x"></i></a></li>

            <li class="verticalLeftDivider"><a href="javascript:readSVGFileAsData();"><i class="fa fa-file-code-o fa-2x"></i></a></li>
            <li> <input type="file" accept=".svg" id="dataSVGFileInput" name="someSVGDataFile" onchange="handleSVGFiles(this.files, false)" style="visibility:hidden;position:absolute;top:-50;left:-50"/></li>

            <li class="verticalLeftDivider"><a href="javascript:loadDatafile();"><i class="icon-table fa-2x"></i></a></li>
            <li> <input type="file" accept=".csv, .json" id="dataimageFileInput" name="someDatafile" onchange="handleDatafiles(this.files)" style="visibility:hidden;position:absolute;top:-50;left:-50"/></li>

            <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2"><a href="javascript:void(0);" onclick="showWebPage();"><i id="openWebPageButton" class="fa fa-globe fa-2x"></i></a></li>

            <!---------->
            <!-- ZOOM -->
            <!---------->
            <li class=""><a href="javascript:zoomIn();" onclick=""><i class="icon-zoom-in fa-2x"></i></a></li>
            <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2"><a href="javascript:zoomOut();" onclick=""><i class="icon-zoom-out fa-2x"></i></a></li>            

            <!------------------------------>
            <!-- DRAGGING & PANNING MODES -->
            <!------------------------------>

            <!--<li id="panningModeButton" unselectable='on' onselectstart='return false;' onmousedown='modeButtonClicked(this);' draggable="false" class="mode"><a><i class="fa fa-hand-paper-o fa-2x"> </i> </a></li>-->
            <li id="panningModeButton" unselectable='on' onselectstart='return false;' onmousedown='modeButtonClicked(this);' draggable="false" class="mode"><a><i class="fa fa-hand-paper-o fa-2x"> </i> </a></li>
            <li class="verticalLeftDivider" id="disconnectingModeButton" unselectable='on' onselectstart='return false;' onmousedown='modeButtonClicked(this);' draggable="false" class="mode"><a><i class="fa fa-unlink fa-2x"> </i> </a></li>

            <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2" id="squaredSelectionButton" unselectable='on' onselectstart='return false;' onmousedown='modeButtonClicked(this);' draggable="false" class="mode"><a><i class="fa fa-object-group fa-2x"> </i> </a></li>
            <!--<li class="verticalLeftDivider verticalRightDivider verticalRightDivider2" id="freeSelectionButton" unselectable='on' onselectstart='return false;' onmousedown='modeButtonClicked(this);' draggable="false" class="mode"><a><i class="fa fa-circle-o-notch fa-2x"> </i> </a></li>-->


            <!--<li class=""><a id="panningModeActivatorLink" href="javascript:void(0);" onclick="activatePanningMode();"><i class="icon-hand-up fa-2x"></i></a></li>-->
            <!--<li class="verticalLeftDivider verticalRightDivider verticalRightDivider2"><a id="panningModeDeActivatorLink" href="javascript:void(0);" onclick="deActivatePanningMode();"><i class="fa fa-unlink fa-2x"></i></a></li>-->            


            <!--------------------------->
            <!-- CONNECTORS VISIBILITY -->
            <!--------------------------->
            <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2" id="disconnectingModeButton" unselectable='on' onselectstart='return false;' draggable="false" class="mode"><a id="connectorsVisibilityButton" onmousedown="toggleConnectorsVisibility(this);"><i class="fa fa-eye fa-2x"></i></a></li>            
            <!--            <li><a id="toggleConnectorsVisibilityActivatorLink" href="javascript:toggleConnectorsVisibility();"><i id="checkConnectorsVisibility" class="icon-check"></i> Show connectors</a></li>-->




            <!--------------------->
            <!-- COLOR REGIONS EXTRACTORS -->
            <!--------------------->
            <!--            <li><a id="scribbleDectivator" href="javascript:void(0);" onclick="deactivateScribbleMode();"><i class="fa fa-magic fa-2x"></i></a></li>
                        <li class="verticalLeftDivider"><a id="scribbleActivator1" href="javascript:void(0);" onclick="activateScribbleMode(false);"><i class="fa fa-pencil fa-2x"></i></a></li>
                        <li class="verticalLeftDivider verticalRightDivider2"><a id="scribbleActivator2" href="javascript:void(0);" onclick="activateScribbleMode(true);"><i class="fa fa-paint-brush fa-2x"></i></a></li>-->

            <!--------------------->
            <!-- TEXT EXTRACTORS -->
            <!--------------------->
            <!--            <li class=""><a id="lineTextualVixor" href="javascript:void(0);" onclick="drawTextualVixor('lineExtractor', this);"><i class="icon-strikethrough fa-2x"></i></a></li>
                        <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2"><a id="blockTextualVixor" href="javascript:void(0);" onclick="drawTextualVixor('blockExtractor', this);"><i class="fa fa-stop fa-2x"></i></a></li>-->

            <!-------------------->
            <!-- COLOR SAMPLERS -->
            <!-------------------->
            <!--            <li class=""> <a id="samplerButton" href="javascript:void(0);" onclick="samplerButtonClicked();"><i class="collections-freeSampler" style="font-size: 26px;"></i> </a></li>
                        <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2"><a id="samplerLineButton" href="javascript:void(0);" onclick="samplerLineButtonClicked();"><i class="collections-straightSampler" style="font-size: 26px;"></i> </a></li>-->



            <!--------------------------->
            <!-- OPERATIONS ON OBJECTS -->
            <!--------------------------->

            <li class="mode verticalLeftDivider" unselectable='on' onselectstart='return false;' onmousedown='duplicateObject();' draggable="false"><a><i class="fa fa-clone fa-flip-horizontal fa-2x clicMenu"> </i> </a></li>


            <li class="mode verticalLeftDivider" unselectable='on' onselectstart='return false;' onmousedown='expandMarks();' draggable="false"><a><i class="fa fa-angle-double-down fa-2x clicMenu"> </i> </a></li>
            <li class="mode verticalLeftDivider" unselectable='on' onselectstart='return false;' onmousedown='compressMarks();' draggable="false"><a><i class="fa fa-angle-double-up fa-2x clicMenu"> </i> </a></li>




            <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2" unselectable='on' onselectstart='return false;' onmousedown='deleteObject();' draggable="false" class="mode"><a><i class="fa fa-remove fa-2x"> </i> </a></li>





            <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2"><a href="javascript:void(0);" onclick="deleteAllObjects();"><i class="fa fa-trash-o fa-2x"></i></a></li>

            <!--------------->
            <!-- FILE MENU -->
            <!--------------->
            <li id="fileMenu" onclick="showMenu(this);" class="verticalRightDivider verticalRightDivider2">
                <a>
                    <i class="fa fa-file-o fa-2x"></i>
                </a>
                <ul id="fileMenuUL">
                    <li><a href="javascript:void(0);" onclick="saveProject();"><i id="saveProjectElement" class="fa-save icon-large"></i> Save project</a></li>

                    <li><a href="javascript:loadiVoLVRProject();"><i class="fa-folder-open-o icon-large"></i> Open project</a></li>





                    <li> <input type="file" accept=".xml" id="dataprojectFileInput" name="someProjectfile" onchange="handleDatafiles(this.files)" style="visibility:hidden;position:absolute;top:-50;left:-50"/></li>                    
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
            <!-- MORE MENU -->
            <!--            -----------
            <li id="configMenu" onclick="showMenu(this);" class="verticalRightDivider verticalRightDivider2">
                <a>
                    <i class="fa fa-plus fa-2x"></i>
                </a>
                <ul id="configMenuUL">
                    

                    <li><a href="javascript:void(0);" onclick="deleteAllObjects();"><i class="fa-trash-o icon-large"></i> Clear canvas</a></li>
                </ul>
            </li>-->


            <!-- RIGHT PANEL HANDLER -->



            <li class="verticalLeftDivider2" style="float: right;"><a id="toggleAdditionalToolsVisibility" href="javascript:void(0);" onclick="togglePanelVisibility('#rightPanel');"><i class="fa fa-chevron-right fa-2x"></i></a></li>


        </ul>

        <!--<div class="clear"></div>-->

        <div class="grid">

            <!--<div class="col_12" id="mainContainer">-->
            <div style="width: 100%" id="mainContainer">

                <div class="rightPanel nonSelection" id="rightPanel" draggable="false">




                    <!---------------->
                    <!-- EXTRACTORS -->
                    <!---------------->

                    <h6 id="extractorsListH6" onclick="togglePanelVisibility('#extractorsList', false);" style="cursor: pointer;" class="nonSelection sectionHeader"><span class="fa fa-angle-down" style="margin-right: 5px;"></span>Extractors</h6>
                    <ul id="extractorsList" class="horizontalButtomsRow">



                        <!--<li style="width: 100%; height: 15px; padding: 0px; margin: 0px; margin-bottom: 0px; margin-top: 0px; font-size: 10px; color: #777;">COLOURED REGIONS</li>-->

                        <li id="groupColorRegionButton" unselectable='on' onselectstart='return false;' onmousedown='modeButtonClicked(this);' draggable="false" class="boxDivider mode" style="margin-right: 8px; margin-bottom: 6px;"><a><i class="fa fa-paint-brush" style="font-size: 25px;"> </i> </a></li>

                        <li id="multipleColorRegionsButton" unselectable='on' onselectstart='return false;' onmousedown='modeButtonClicked(this);' draggable="false" class="boxDivider mode" style="margin-right: 8px; margin-bottom: 6px;"><a><i class="fa fa-pencil" style="font-size: 25px;"> </i> </a></li>

                        <li id="floodFillButton" unselectable='on' onselectstart='return false;' onmousedown='modeButtonClicked(this);' draggable="false" class="boxDivider mode" style="margin-right: 8px; margin-bottom: 6px;"><a><i class="fa fa-magic" style="font-size: 25px;"> </i> </a></li>



                        <!--<hr style="border-top: 1px solid #bbb; margin-top: 3px;" />-->

                        <!--<li style="width: 100%; height: 15px; padding: 0px; margin-top: 5px; margin-bottom: 0px; margin-top: 0px; font-size: 10px; color: #777;">COLOUR SAMPLERS</li>-->

                        <li id="samplerLineButton" onclick="modeButtonClicked(this);" unselectable='on' onselectstart='return false;' draggable="false" class="boxDivider mode" style="width: 44%; margin-right: 8px; margin-bottom: 6px;"><a><i class="collections-straightSampler" style="font-size: 22px;"> </i> </a></li>

                        <li id="samplerButton" onclick="modeButtonClicked(this);" unselectable='on' onselectstart='return false;' draggable="false" class="boxDivider mode" style="width: 44%; margin-right: 8px; margin-bottom: 6px;"><a><i class="collections-freeSampler" style="font-size: 22px;"> </i> </a></li>


                        <!--<hr style="border-top: 1px solid #bbb; margin-top: 3px;" />-->


                        <!--<li style="width: 100%; height: 15px; padding: 0px; margin-top: 5px; margin-bottom: 0px; margin-top: 0px; font-size: 10px; color: #777;">TEXT EXTRACTORS</li>-->

                        <li id="lineTextExtractorButton" unselectable='on' onselectstart='return false;' onmousedown="modeButtonClicked(this);" draggable="false" class="boxDivider mode" style="width: 44%; margin-right: 8px;"><a><i class="icon-strikethrough icon-large" style="font-size: 19px;"> </i> </a></li>

                        <li id="blockTextExtractorButton" unselectable='on' onselectstart='return false;' onmousedown="modeButtonClicked(this);" draggable="false" class="boxDivider mode" style="width: 44%; margin-right: 8px;"><a><i class="fa fa-stop icon-large" style="font-size: 19.5px;"> </i> </a></li>

                        <!--<li id="lineTextualVixor" onclick="drawTextualVixor('lineExtractlineTextualVixoror', this);" unselectable='on' onselectstart='return false;' draggable="false" class="boxDivider clicElement"><a><i class="icon-strikethrough icon-large"> </i> </a></li>-->
                        <!--<li id="blockTextualVixor" onclick="drawTextualVixor('blockExtractor', this);" unselectable='on' onselectstart='return false;' draggable="false" class="boxDivider mode"><a><i class="fa fa-stop icon-large"> </i> </a></li>-->



                        <!--                        <li id="samplerButton" onclick="//samplerButtonClicked();" unselectable='on' onselectstart='return false;' draggable="false" class="boxDivider clicElement"><a><i class="collections-freeSampler" style="font-size: 20px;"> </i> </a></li>
                                                <li id="samplerLineButton" onclick="//samplerLineButtonClicked();" unselectable='on' onselectstart='return false;' draggable="false" class="boxDivider clicElement"><a><i class="collections-straightSampler" style="font-size: 20px;"> </i> </a></li>-->

                    </ul>
                    <hr />

                    <!----------->
                    <!-- MARKS -->
                    <!----------->
                    <h6 id="marksListH6" onclick="togglePanelVisibility('#marksList', false);" style="cursor: pointer;" class="nonSelection sectionHeader"><span class="fa fa-angle-down" style="margin-right: 5px;"></span>Marks</h6>
                    <ul id="marksList" class="horizontalButtomsRow">
                        <li id="circlePrototype" draggable="true" class="dragElement circularBorder" style="margin-right: 15px; margin-bottom: 3px;"><a><i class="mark-circle" style="font-size: 28px;"></i></a></li>
                        <li id="rectPrototype" draggable="true" class="dragElement circularBorder" style="margin-right: 12px; margin-bottom: 3px;"><a><i class="mark-rectangle" style="font-size: 28px;"></i></a></li>
                        <li id="squarePrototype" draggable="true" class="dragElement circularBorder" style="margin-right: 12px; margin-bottom: 3px;"><a><i class="mark-square" style="font-size: 28px;"></i></a></li>

                        <li id="pathMarkPrototype" draggable="true" class="dragElement circularBorder" style="margin-right: 15px; margin-bottom: 3px;"><a><i class="mark-pathMark" style="font-size: 28px;"></i></a></li>
                        <li id="fatFontPrototype" draggable="true" class="dragElement circularBorder" style="margin-right: 12px; margin-bottom: 3px;"><a><i class="mark-fatfont" style="font-size: 28px;"></i></a></li>
                        <li id="ellipsePrototype" draggable="true" class="dragElement circularBorder" style="margin-right: 12px; margin-bottom: 3px;"><a><i class="mark-ellipse" style="font-size: 28px;"></i></a></li>

                        <li style="visibility:hidden;position:absolute;top:0;left:0"> <input type="file" accept=".svg" id="svgimageFileInput" name="someSVGFile" onchange="handleSVGFiles(this.files, true)"/></li>
                        <li id="filePrototype" draggable="false" class="dragElement boxDivider" style="margin-right: 6px; margin-bottom: 0px;"><a onclick="loadSVGFile();"><i class="mark-svg"></i></a></li>                        
                        <li id="drawFilledMark" onclick="modeButtonClicked(this);" unselectable='on' onselectstart='return false;' draggable="false" class="boxDivider mode" style="margin-right: 5px; margin-bottom: 0px;"><a><i class="mark-filled"> </i> </a></li>
                        <li id="drawPathMark" onclick="modeButtonClicked(this);" unselectable='on' onselectstart='return false;' draggable="false" class="boxDivider mode" style="margin-right: 5px; margin-bottom: 0px;"><a><i class="mark-path"> </i> </a></li>


                        <!--                        <li id="circlePrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-circle"></i></a></li>
                                                <li id="rectPrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-rectangle"></i></a></li>
                                                <li id="squarePrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-square"></i></a></li>
                                                <li id="pathMarkPrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-pathMark"></i></a></li>
                                                <li id="fatFontPrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-fatfont"></i></a></li>
                                                <li id="ellipsePrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-ellipse"></i></a></li>
                                                <li style="visibility:hidden;position:absolute;top:0;left:0"> <input type="file" accept=".svg" id="svgimageFileInput" name="someSVGFile" onchange="handleSVGFiles(this.files, true)"/></li>
                                                <li id="filePrototype" draggable="false" class="dragElement boxDivider"><a onclick="loadSVGFile();"><i class="mark-svg"></i></a></li>                        
                                                <li id="drawFilledMark" onclick="modeButtonClicked(this);" unselectable='on' onselectstart='return false;' draggable="false" class="boxDivider clicElement"><a><i class="mark-filled"> </i> </a></li>
                                                <li id="drawPathMark" onclick="modeButtonClicked(this);" unselectable='on' onselectstart='return false;' draggable="false" class="boxDivider clicElement"><a><i class="mark-path"> </i> </a></li>
                                                                        <li id="drawFilledMark" onclick="drawFilledMarkButtonClicked();" unselectable='on' onselectstart='return false;' draggable="false" class="boxDivider clicElement"><a><i class="mark-filled"> </i> </a></li>
                                                                        <li id="drawPathMark" onclick="drawPathMarkButtonClicked();" unselectable='on' onselectstart='return false;' draggable="false" class="boxDivider clicElement"><a><i class="mark-path"> </i> </a></li>-->
                    </ul>
                    <hr />

                    <!-- VALUES (DATA TYPES) -->
                    <h6 id="datatypesListH6" onclick="togglePanelVisibility('#datatypesList', false);" style="cursor: pointer;" class="nonSelection sectionHeader"><span class="fa fa-angle-down" style="margin-right: 5px;"></span>Values</h6>
                    <ul id="datatypesList" class="horizontalButtomsRow">
                        <li id="isShapeData" draggable="true" class="dragElement circularBorder" style="margin-right: 1px; margin-bottom: 5px;"><a><i class="value-shape" style="font-size: 25px;"> </i> </a></li>
                        <li id="isColorData" draggable="true" class="dragElement circularBorder" style="margin-right: 1px; margin-bottom: 5px;"><a><i class="value-color" style="font-size: 25px;"></i></a></li>
                        <li id="isStringData" draggable="true" class="dragElement circularBorder" style="margin-right: 1px; margin-bottom: 5px;"><a><i class="value-string" style="font-size: 25px;"></i></a></li>
                        <li id="isNumericData" draggable="true" class="dragElement circularBorder" style="margin-right: 1px; margin-bottom: 5px;"><a><i class="value-number" style="font-size: 25px;"></i></a></li>

                        <li id="dateGenerator" draggable="true" class="dragElement circularBorder" style="margin-right: 10px; margin-bottom: 0px;"><a style="padding-top: 6px; padding-left: 10px; padding-bottom: 0px;"><i class="fa fa-adn" style="font-size: 24px;"></i></a></li> 
                        <li id="numberGenerator" draggable="true" class="dragElement circularBorder" style="margin-right: 10px; margin-bottom: 0px;"><a style="padding-top: 6px; padding-left: 10px; padding-bottom: 0px;"><i class="generator-number" style="font-size: 24px;"></i></a></li> 
                        <li id="isDurationData" draggable="true" class="dragElement circularBorder" style="margin-right: 1px; margin-bottom: 0px;"><a><i class="value-duration" style="font-size: 25px;"> </i> </a></li>
                        <li id="isDateAndTimeData" draggable="true" class="dragElement circularBorder" style="margin-right: 1px; margin-bottom: 0px;"><a><i class="value-dateAndTime" style="font-size: 25px;"></i></i></a></li>


                        <!--                        <li id="isColorData" draggable="true" class="dragElement circularBorder" style="margin-right: 10px; margin-bottom: 5px;"><a><i class="value-color" style="font-size: 28px;"></i></a></li>
                                                <li id="isStringData" draggable="true" class="dragElement circularBorder" style="margin-right: 12px; margin-bottom: 5px;"><a><i class="value-string" style="font-size: 28px;"></i></a></li>
                                                <li id="isNumericData" draggable="true" class="dragElement circularBorder" style="margin-right: 12px; margin-bottom: 5px;"><a><i class="value-number" style="font-size: 28px;"></i></a></li>
                                                <li id="isShapeData" draggable="true" class="dragElement circularBorder" style="margin-right: 10px; margin-bottom: 5px;"><a><i class="value-shape" style="font-size: 28px;"> </i> </a></li>
                                                <li id="isDurationData" draggable="true" class="dragElement circularBorder" style="margin-right: 12px; margin-bottom: 5px;"><a><i class="value-duration" style="font-size: 28px;"> </i> </a></li>
                                                <li id="isDateAndTimeData" draggable="true" class="dragElement circularBorder" style="margin-right: 12px; margin-bottom: 5px;"><a><i class="value-dateAndTime" style="font-size: 28px;"></i></i></a></li>
                                                <li id="numberGenerator" draggable="true" class="dragElement circularBorder"><a><i class="generator-number"></i></a></li> 
                        -->
                    </ul>
                    <hr />

                    <!-- OPERATORS -->
                    <h6 id="operatorsListH6" onclick="togglePanelVisibility('#operatorsList', false);" style="cursor: pointer;" class="nonSelection sectionHeader"><span class="fa fa-angle-down" style="margin-right: 5px;"></span>Operators</h6>
                    <ul id="operatorsList" class="horizontalButtomsRow">
                        <li id="division-operator" draggable="true" class="dragElement circularBorder" style="margin-right: 1px;"><a><i class="operator-divisonIcon" style="font-size: 24px;"></i></a></li>
                        <li id="multiplication-operator" draggable="true" class="dragElement circularBorder" style="margin-right: 2px;"><a><i class="operator-multiplicationIcon" style="font-size: 24px;"></i></a></li>
                        <li id="subtraction-operator" draggable="true" class="dragElement circularBorder" style="margin-right: 2px;"><a><i class="operator-subtractionIcon" style="font-size: 24px;"></i></a></li>
                        <li id="addition-operator" draggable="true" class="dragElement circularBorder" style="margin-right: 2px;"><a><i class="operator-additionIcon" style="font-size: 24px;"></i></a></li>
                    </ul>
                    <hr />

                    <!-- COLLECTIONS -->
                    <h6 id="draggableWidgetsListH6" onclick="togglePanelVisibility('#draggableWidgetsList', false);" style="cursor: pointer;" class="nonSelection sectionHeader"><span class="fa fa-angle-down" style="margin-right: 5px;"></span>Collections</h6>
                    <ul id="draggableWidgetsList" class="horizontalButtomsRow">

<!--                        <li id="collectionGetterWidget" draggable="true" class="dragElement boxDivider" style="margin-right: 5px;"><a><i class="fa fa-angellist"></i></a></li>
                                                <li id="collectionAttributeSelectorWidget" draggable="true" class="dragElement boxDivider" style="margin-right: 5px;"><a><i class="fa fa-archive"></i></a></li>-->
                        
                        <!--                        <li id="collectionGetterWidget" draggable="true" class="dragElement boxDivider" style="margin-right: 5px;"><a><i class="fa fa-angellist"></i></a></li>
                                                <li id="collectionAttributeSelectorWidget" draggable="true" class="dragElement boxDivider" style="margin-right: 5px;"><a><i class="fa fa-archive"></i></a></li>-->

                        <!--                        <li id="mapperWidget" draggable="true" class="dragElement boxDivider" style="margin-right: 5px;"><a><i class="collections-mapper"></i></a></li>
                                                <li id="verticalCollection" draggable="true" class="dragElement boxDivider" style="margin-right: 3px;"><a><i class="collections-collection" ></i></a></li>
                                                <li id="numberGenerator" draggable="true" class="dragElement boxDivider" style="margin-right: 5px;"><a><i class="generator-number"></i></a></li> 
                                                <li id="collectionGenerator" draggable="true" class="dragElement boxDivider" style="margin-right: 3px;"><a><i class="collections-generator"></i></a></li>-->


                        <li id="collectionGenerator" draggable="true" class="dragElement circularBorder" style="margin-right: 0px; margin-bottom: 0px;"><a><i class="collections-generator"></i></a></li>
                        <li id="mapperWidget" draggable="true" class="dragElement circularBorder" style="margin-right: 0px; margin-bottom: 0px;"><a><i class="collections-mapper"></i></a></li>
                        <li id="verticalCollection" draggable="true" class="dragElement circularBorder" style="margin-right: 0px; margin-bottom: 0px;"><a><i class="collections-collection" ></i></a></li>







                    </ul>
                    <hr />

                    <!-- FUNCTIONS -->
                    <h6 id="functionsListH6" onclick="togglePanelVisibility('#functionsList', false);" style="cursor: pointer;" class="nonSelection sectionHeader"><span class="fa fa-angle-down" style="margin-right: 5px;"></span>Functions</h6>
                    <ul id='functionsList' class="horizontalButtomsRow">

                        <!--                        <li id="xFunction" draggable="true" class="dragElement boxDivider"><a><i class="function-x"></i></a></li>
                                                <li id="emptyFunction" draggable="true" class="dragElement boxDivider"><a><i class="function-empty"></i></a></li>
                                                <li id="locatorWidget" draggable="true" class="dragElement boxDivider"><a><i class="collections-locator" style="font-size: 25px;"></i></a></li>
                                                <li id="cosXFunction" draggable="true" class="dragElement boxDivider"><a><i class="function-cosx"></i></a></li>
                                                <li id="sinXFunction" draggable="true" class="dragElement boxDivider"><a><i class="function-sinx"></i></a></li>
                                                <li id="x2Function" draggable="true" class="dragElement boxDivider"><a><i class="function-x2"></i></a></li>
                                                <li id="logXFunction" draggable="true" class="dragElement boxDivider"><a><i class="function-logx"></i></a></li>
                                                <li id="sqrtXFunction" draggable="true" class="dragElement boxDivider"><a><i class="function-sqrtx"></i></a></li>
                                                <li id="x3Function" draggable="true" class="dragElement boxDivider"><a><i class="function-x3"></i></a></li>-->

                        <li id="x2Function" draggable="true" class="dragElement circularBorder" style="margin-right: 3px; margin-bottom: 6px;"><a><i class="function-x2"></i></a></li>
                        <li id="xFunction" draggable="true" class="dragElement circularBorder" style="margin-right: 0px; margin-bottom: 6px;"><a><i class="function-x"></i></a></li>
                        <li id="emptyFunction" draggable="true" class="dragElement circularBorder" style="margin-right: 0px; margin-bottom: 6px;"><a><i class="function-empty"></i></a></li>
                        <li id="locatorWidget" draggable="true" class="dragElement circularBorder" style="margin-right: 0px; margin-bottom: 6px;"><a><i class="collections-locator" style="font-size: 25px;"></i></a></li>

                        <li id="logXFunction" draggable="true" class="dragElement circularBorder" style="margin-right: 3px; margin-bottom: 6px;"><a><i class="function-logx"></i></a></li>
                        <li id="cosXFunction" draggable="true" class="dragElement circularBorder" style="margin-right: 0px; margin-bottom: 6px;"><a><i class="function-cosx"></i></a></li>
                        <li id="sinXFunction" draggable="true" class="dragElement circularBorder" style="margin-right: 0px; margin-bottom: 6px;"><a><i class="function-sinx"></i></a></li>
                        <li id="x3Function" draggable="true" class="dragElement circularBorder" style="margin-right: 0px; margin-bottom: 6px;"><a><i class="function-x3"></i></a></li>

                        <li id="enterFunction" onclick="enterFunctionButtonClicked();" unselectable='on' onselectstart='return false;' draggable="false" class="boxDivider" style="width: 30%;"><a><i class="fa-superscript icon-large" style="font-size: 22.5px;"> </i> </a></li>
                        <li id="drawFunction" onclick="modeButtonClicked(this);" unselectable='on' onselectstart='return false;' draggable="false" class="boxDivider mode" style="width: 30%; margin-right: 10px;"><a><i class="function-draw"> </i> </a></li>
                        <li id="sqrtXFunction" draggable="true" class="dragElement circularBorder" style="margin-right: 10px;"><a><i class="function-sqrtx"></i></a></li>

                        <!--<li id="drawFunction" onclick="drawFunctionButtonClicked();" unselectable='on' onselectstart='return false;' draggable="false" class="boxDivider clicElement"><a><i class="function-draw"> </i> </a></li>-->


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
//            var plugin = document.getElementById('wtPlugin');
//            if (LOG)
//                console.log("plugin:");
//            if (LOG)
//                console.log(plugin);

            var width = $('#mainContainer').width();
            var height = $(document).height() - $('#theMenu').height() - 5;
            if (LOG) {
                console.log("$(document).height() :" + $(document).height());
                console.log("$('#theMenu').height() :" + $('#theMenu').height());
                console.log("height :" + height);
                console.log("height: " + height);
            }
            canvas.setWidth(width);
            canvas.setHeight(height);
            canvas.selection = false;
            canvas.connectorsHidden = false;
            canvas.selectionColor = 'rgba(229,238,244,0.5)';
            canvas.selectionDashArray = [7, 7];
            canvas.selectionBorderColor = '#7c7064';
            canvas.selectionLineWidth = 3;

            checkForRetinaDisplay();

            $("#canvasContainer").on('mousewheel', function (ev) {
                hideOpenTooltips();
                ev.preventDefault();
                var e = ev.originalEvent;
                displaywheel(e);
            });

            var canvasContainerElement = document.querySelector("#canvasContainer");
            var manager = new Hammer.Manager(canvasContainerElement);
//            manager.add(new Hammer.Tap({event: 'doubletap', taps: 2, threshold: 500, interval: 1000, time: 600, posThreshold: 75}));            
            manager.add(new Hammer.Tap({event: 'doubletap', taps: 2, threshold: 75, interval: 400, time: 600, posThreshold: 25}));            
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

                } else if (!canvas.selection) {

                    /*****************************/
                    /********** PANNING **********/
                    /*****************************/

                    canvas.defaultCursor = "-webkit-grabbing";

                    // This is to allow the canvas panning with one finger

                    if (LOG)
                        console.log("STARTING pan1Finger in PANNING MODE");
                    if (LOG)
                        console.log(ev);
                    canvas.viewportLeft = canvas.viewportTransform[4];
                    canvas.viewportTop = canvas.viewportTransform[5];
                    gestureSetEnabled(manager, 'pinch', false);

                } else if (!canvas.getActiveObject()) {
                    console.log("Starting selection");
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

                } else if (!canvas.selection) {

                    /*****************************/
                    /********** PANNING **********/
                    /*****************************/

                    canvas.defaultCursor = "-webkit-grabbing";

                    // This should only happen when the mouse event happens over a zone where NO objects are being touched
                    if (!canvas.isDrawingMode && !canvas.getActiveObject() && !canvas.getActiveGroup()) {

                        var x = -canvas.viewportLeft - ev.deltaX;
                        var y = -canvas.viewportTop - ev.deltaY;
                        canvas.absolutePan(new fabric.Point(x, y));
                    }

                } else if (!canvas.getActiveObject()) {

                    /**************************************/
                    /********** SQUARE SELECTING **********/
                    /**************************************/

                    console.log("Selecting");
                }


            });
            manager.on("pan1Fingerend", function (ev) {

                if (!canvas.activePanningMode && !canvas.isSamplingLineMode && !canvas.selection) {

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
                        
                        var totalConnectors = crossedConnectors.length;
                        var i = 0;
                        
                        crossedConnectors.forEach(function (object) {                            
                            var refreshCanvas = i === (totalConnectors - 1);
                            var connector = object.connector;
                            var splitPoint = object.splitPoint;
                            connector.split(splitPoint, line, refreshCanvas);
                            i++;
                        });
                        canvas.pan1Fingerstarted = false;
                    }
                    gestureSetEnabled(manager, 'pinch', true);

                } else if (!canvas.selection) {

                    canvas.defaultCursor = "-webkit-grab";
                    gestureSetEnabled(manager, 'pinch', true);

                } else if (!canvas.getActiveObject()) {

                    console.log("Square selection ended");

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
            $("#dateGenerator").draggable({
                cursorAt: {top: 18.5, left: 60},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100;'><li><i class='fa fa-adn'></i></li></div>");
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
                accept: "#addition-operator, #subtraction-operator, #multiplication-operator, #division-operator, #xFunction, #emptyFunction, #x2Function, #x3Function, #sinXFunction, #cosXFunction, #logXFunction, #sqrtXFunction, #playerWidget, #locatorWidget, #mapperWidget, #collectionGetterWidget, #collectionAttributeSelectorWidget, #verticalCollection, #collectionGenerator, #numberGenerator, #dateGenerator, #rectPrototype, #squarePrototype, #pathMarkPrototype, #circlePrototype, #fatFontPrototype, #ellipsePrototype, #isColorData, #isStringData, #isNumericData, #collectionValue, #isDurationData, #isDateAndTimeData, #isShapeData",
                drop: canvasDropFunction
            });




//            deactivateScribbleMode();

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
                    top: 400,
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
                    top: 200,
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
                    top: 400,
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
                    top: 400,
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



//            var path = new fabric.Path('M 294 75 L 293 76 L 292 76 L 291 76 L 290 76 L 289 76 L 288 76 L 287 76 L 286 76 L 285 76 L 284 76 L 283 76 L 282 77 L 281 77 L 280 77 L 279 77 L 278 77 L 277 77 L 276 77 L 275 78 L 274 78 L 273 78 L 272 78 L 271 78 L 270 79 L 269 79 L 268 79 L 267 79 L 266 80 L 265 80 L 264 80 L 263 81 L 262 81 L 261 81 L 260 81 L 259 81 L 258 82 L 257 82 L 256 82 L 255 83 L 254 83 L 253 83 L 252 84 L 251 84 L 250 84 L 249 85 L 248 85 L 247 85 L 246 86 L 245 86 L 244 86 L 243 87 L 242 87 L 241 87 L 240 88 L 239 88 L 238 89 L 237 89 L 236 90 L 235 90 L 234 91 L 233 91 L 232 91 L 231 92 L 230 92 L 229 93 L 228 93 L 227 94 L 226 94 L 225 95 L 224 95 L 223 96 L 222 96 L 221 97 L 220 97 L 219 98 L 218 99 L 217 99 L 216 100 L 215 100 L 214 101 L 213 101 L 212 102 L 211 103 L 210 103 L 209 104 L 208 105 L 207 105 L 206 106 L 205 107 L 204 107 L 203 108 L 202 109 L 201 110 L 200 110 L 199 111 L 198 112 L 197 112 L 196 113 L 195 114 L 194 115 L 193 116 L 192 117 L 191 117 L 190 118 L 189 119 L 188 120 L 187 121 L 186 122 L 185 123 L 184 124 L 183 125 L 182 125 L 182 126 L 181 127 L 180 128 L 179 129 L 178 129 L 178 130 L 177 131 L 176 132 L 175 133 L 174 134 L 173 135 L 172 136 L 171 137 L 170 138 L 169 139 L 169 140 L 168 141 L 167 142 L 166 143 L 166 144 L 165 145 L 164 146 L 163 147 L 163 148 L 162 149 L 161 150 L 160 151 L 160 152 L 159 153 L 158 154 L 158 155 L 157 156 L 156 157 L 156 158 L 155 159 L 154 160 L 154 161 L 153 162 L 153 163 L 152 164 L 152 165 L 151 166 L 150 167 L 150 168 L 149 169 L 149 170 L 148 171 L 148 172 L 147 173 L 147 174 L 146 175 L 145 176 L 145 177 L 145 178 L 144 179 L 144 180 L 143 181 L 143 182 L 142 183 L 142 184 L 142 185 L 141 186 L 141 187 L 140 188 L 140 189 L 139 190 L 139 191 L 139 192 L 139 193 L 138 194 L 138 195 L 137 196 L 137 197 L 137 198 L 136 199 L 136 200 L 136 201 L 135 202 L 135 203 L 135 204 L 135 205 L 134 206 L 134 207 L 134 208 L 133 209 L 133 210 L 133 211 L 133 212 L 132 213 L 132 214 L 132 215 L 132 216 L 131 217 L 131 218 L 131 219 L 131 220 L 130 221 L 130 222 L 130 223 L 130 224 L 130 225 L 130 226 L 130 227 L 130 228 L 129 229 L 129 230 L 129 231 L 129 232 L 129 233 L 129 234 L 129 235 L 129 236 L 128 237 L 128 238 L 128 239 L 128 240 L 128 241 L 128 242 L 128 243 L 128 244 L 128 245 L 128 246 L 128 247 L 128 248 L 128 249 L 128 250 L 127 251 L 127 252 L 127 253 L 127 254 L 127 255 L 127 256 L 127 257 L 127 258 L 127 259 L 127 260 L 128 261 L 128 262 L 128 263 L 128 264 L 128 265 L 128 266 L 128 267 L 128 268 L 128 269 L 128 270 L 128 271 L 128 272 L 128 273 L 128 274 L 129 275 L 129 276 L 129 277 L 129 278 L 129 279 L 129 280 L 129 281 L 129 282 L 130 283 L 130 284 L 130 285 L 130 286 L 130 287 L 130 288 L 130 289 L 131 288 L 132 288 L 133 288 L 134 288 L 135 288 L 136 287 L 137 287 L 138 287 L 139 287 L 140 286 L 141 286 L 142 286 L 143 286 L 144 286 L 145 285 L 146 285 L 147 285 L 148 285 L 149 285 L 150 285 L 151 285 L 152 285 L 153 284 L 154 284 L 155 284 L 156 284 L 157 283 L 158 283 L 159 283 L 160 283 L 161 283 L 162 282 L 163 282 L 164 282 L 165 282 L 166 281 L 167 281 L 168 281 L 169 281 L 170 281 L 171 280 L 172 280 L 173 280 L 174 280 L 175 280 L 176 280 L 177 280 L 178 280 L 179 279 L 180 279 L 181 279 L 182 279 L 183 278 L 184 278 L 185 278 L 186 278 L 187 278 L 188 277 L 189 277 L 190 277 L 191 277 L 192 276 L 193 276 L 194 276 L 195 276 L 196 276 L 197 275 L 198 275 L 199 275 L 200 275 L 201 275 L 202 275 L 203 275 L 204 275 L 205 274 L 206 274 L 207 274 L 208 274 L 209 273 L 210 273 L 211 273 L 212 273 L 213 273 L 214 272 L 215 272 L 216 272 L 217 272 L 218 271 L 219 271 L 220 271 L 221 271 L 222 271 L 223 271 L 224 271 L 225 271 L 226 270 L 227 270 L 228 270 L 229 270 L 230 270 L 231 269 L 232 269 L 233 269 L 234 269 L 235 268 L 236 268 L 237 268 L 238 268 L 239 268 L 240 267 L 241 267 L 242 267 L 243 267 L 244 267 L 245 266 L 246 266 L 247 266 L 248 266 L 249 266 L 250 266 L 251 266 L 252 265 L 253 265 L 254 265 L 255 265 L 256 265 L 257 264 L 258 264 L 259 264 L 260 264 L 261 263 L 262 263 L 263 263 L 264 263 L 265 263 L 266 262 L 267 262 L 268 262 L 269 262 L 270 262 L 271 261 L 272 261 L 273 261 L 274 261 L 275 261 L 276 261 L 277 261 L 278 260 L 279 260 L 280 260 L 281 260 L 282 260 L 283 259 L 284 259 L 285 259 L 286 259 L 287 258 L 288 258 L 289 258 L 290 258 L 291 258 L 292 257 L 293 257 L 294 257 L 295 257 L 296 257 L 297 256 L 298 256 L 299 256 L 300 256 L 301 256 L 302 256 L 303 256 L 304 256 L 305 255 L 306 254 L 307 254 L 308 254 L 308 253 L 308 252 L 308 251 L 308 250 L 308 249 L 308 248 L 308 247 L 308 246 L 308 245 L 308 244 L 308 243 L 308 242 L 308 241 L 308 240 L 308 239 L 308 238 L 308 237 L 308 236 L 308 235 L 308 234 L 308 233 L 308 232 L 308 231 L 308 230 L 308 229 L 308 228 L 308 227 L 308 226 L 308 225 L 308 224 L 308 223 L 308 222 L 308 221 L 308 220 L 308 219 L 308 218 L 308 217 L 308 216 L 308 215 L 308 214 L 308 213 L 308 212 L 308 211 L 308 210 L 308 209 L 308 208 L 308 207 L 308 206 L 308 205 L 308 204 L 308 203 L 308 202 L 308 201 L 308 200 L 308 199 L 308 198 L 308 197 L 308 196 L 308 195 L 308 194 L 308 193 L 308 192 L 308 191 L 308 190 L 308 189 L 308 188 L 308 187 L 308 186 L 308 185 L 308 184 L 308 183 L 308 182 L 308 181 L 308 180 L 308 179 L 308 178 L 308 177 L 308 176 L 308 175 L 308 174 L 308 173 L 308 172 L 308 171 L 308 170 L 308 169 L 308 168 L 308 167 L 308 166 L 308 165 L 308 164 L 308 163 L 308 162 L 308 161 L 308 160 L 308 159 L 308 158 L 308 157 L 308 156 L 308 155 L 308 154 L 308 153 L 308 152 L 308 151 L 308 150 L 308 149 L 308 148 L 308 147 L 308 146 L 308 145 L 308 144 L 308 143 L 308 142 L 308 141 L 308 140 L 308 139 L 308 138 L 308 137 L 308 136 L 308 135 L 308 134 L 308 133 L 308 132 L 308 131 L 308 130 L 308 129 L 308 128 L 308 127 L 308 126 L 308 125 L 308 124 L 308 123 L 308 122 L 308 121 L 308 120 L 308 119 L 308 118 L 308 117 L 308 116 L 308 115 L 308 114 L 308 113 L 308 112 L 308 111 L 308 110 L 308 109 L 308 108 L 308 107 L 308 106 L 308 105 L 308 104 L 308 103 L 308 102 L 308 101 L 308 100 L 308 99 L 308 98 L 308 97 L 308 96 L 308 95 L 308 94 L 308 93 L 308 92 L 308 91 L 308 90 L 308 89 L 308 88 L 308 87 L 308 86 L 308 85 L 308 84 L 308 83 L 308 82 L 308 81 L 308 80 L 308 79 L 308 78 L 308 77 L 308 76 L 308 75 L 307 75 L 306 75 L 305 75 L 304 75 L 303 75 L 302 75 L 301 75 L 300 75 L 299 75 L 298 75 L 297 75 L 296 75 L 295 75 Z');
            /*var path = new fabric.Path('M 396 97 L 395 98 L 395 99 L 394 100 L 394 101 L 393 102 L 393 103 L 392 104 L 392 105 L 391 106 L 390 107 L 390 108 L 389 109 L 389 110 L 388 111 L 388 112 L 387 113 L 387 114 L 386 115 L 385 116 L 385 117 L 384 118 L 384 119 L 384 120 L 383 121 L 382 122 L 382 123 L 381 124 L 381 125 L 380 126 L 379 127 L 379 128 L 379 129 L 378 130 L 377 131 L 377 132 L 376 133 L 376 134 L 375 135 L 375 136 L 374 137 L 374 138 L 373 139 L 372 140 L 372 141 L 371 142 L 371 143 L 370 144 L 370 145 L 369 146 L 369 147 L 368 148 L 367 149 L 367 150 L 366 151 L 366 152 L 365 153 L 365 154 L 364 155 L 364 156 L 363 157 L 362 158 L 362 159 L 361 160 L 361 161 L 360 162 L 360 163 L 359 164 L 359 165 L 358 166 L 358 167 L 357 168 L 356 169 L 356 170 L 355 171 L 355 172 L 354 173 L 354 174 L 353 175 L 353 176 L 352 177 L 351 178 L 351 179 L 350 180 L 350 181 L 349 182 L 349 183 L 348 184 L 348 185 L 347 186 L 346 187 L 346 188 L 345 189 L 345 190 L 344 191 L 344 192 L 343 193 L 343 194 L 342 195 L 342 196 L 341 197 L 341 198 L 340 199 L 340 200 L 339 201 L 338 202 L 338 203 L 337 204 L 337 205 L 336 206 L 336 207 L 335 208 L 335 209 L 334 210 L 333 211 L 333 212 L 332 213 L 332 214 L 331 215 L 331 216 L 330 217 L 330 218 L 329 219 L 328 220 L 328 221 L 327 222 L 327 223 L 326 224 L 326 225 L 325 226 L 325 227 L 324 228 L 323 229 L 323 230 L 322 231 L 322 232 L 321 233 L 321 234 L 320 235 L 320 236 L 319 237 L 318 238 L 318 239 L 317 240 L 317 241 L 316 242 L 316 243 L 315 244 L 315 245 L 314 246 L 313 247 L 313 248 L 312 249 L 312 250 L 311 251 L 311 252 L 310 253 L 310 254 L 309 255 L 309 256 L 308 257 L 307 257 L 306 257 L 305 257 L 304 257 L 303 257 L 302 258 L 301 258 L 300 258 L 299 258 L 298 258 L 297 258 L 296 258 L 295 258 L 294 259 L 293 259 L 292 259 L 291 259 L 290 260 L 289 260 L 288 260 L 287 260 L 286 260 L 285 261 L 284 261 L 283 261 L 282 261 L 281 262 L 280 262 L 279 262 L 278 262 L 277 262 L 276 263 L 275 263 L 274 263 L 273 263 L 272 263 L 271 264 L 270 264 L 269 264 L 268 264 L 267 264 L 266 264 L 265 264 L 264 265 L 263 265 L 262 265 L 261 265 L 260 265 L 259 266 L 258 266 L 257 266 L 256 266 L 255 267 L 254 267 L 253 267 L 252 267 L 251 267 L 250 268 L 249 268 L 248 268 L 247 268 L 246 268 L 245 268 L 244 268 L 243 268 L 242 269 L 241 269 L 240 269 L 239 269 L 238 270 L 237 270 L 236 270 L 235 270 L 234 270 L 233 271 L 232 271 L 231 271 L 230 271 L 229 272 L 228 272 L 227 272 L 226 272 L 225 272 L 224 273 L 223 273 L 222 273 L 221 273 L 220 273 L 219 273 L 218 273 L 217 273 L 216 274 L 215 274 L 214 274 L 213 274 L 212 275 L 211 275 L 210 275 L 209 275 L 208 275 L 207 276 L 206 276 L 205 276 L 204 276 L 203 277 L 202 277 L 201 277 L 200 277 L 199 277 L 198 278 L 197 278 L 196 278 L 195 278 L 194 278 L 193 278 L 192 278 L 191 278 L 190 279 L 189 279 L 188 279 L 187 279 L 186 279 L 185 280 L 184 280 L 183 280 L 182 280 L 181 281 L 180 281 L 179 281 L 178 281 L 177 282 L 176 282 L 175 282 L 174 282 L 173 282 L 172 282 L 171 283 L 170 283 L 169 283 L 168 283 L 167 283 L 166 283 L 165 283 L 164 284 L 163 284 L 162 284 L 161 284 L 160 285 L 159 285 L 158 285 L 157 285 L 156 285 L 155 286 L 154 286 L 153 286 L 152 286 L 151 286 L 150 287 L 149 287 L 148 287 L 147 287 L 146 287 L 145 288 L 144 288 L 143 288 L 142 288 L 141 288 L 140 288 L 139 288 L 138 289 L 137 289 L 136 289 L 135 289 L 134 289 L 133 290 L 132 290 L 131 290 L 131 291 L 131 292 L 131 293 L 131 294 L 132 295 L 132 296 L 132 297 L 132 298 L 133 299 L 133 300 L 133 301 L 134 302 L 134 303 L 134 304 L 134 305 L 135 306 L 135 307 L 135 308 L 135 309 L 136 310 L 136 311 L 136 312 L 137 313 L 137 314 L 137 315 L 138 316 L 138 317 L 139 318 L 139 319 L 139 320 L 140 321 L 140 322 L 140 323 L 141 324 L 141 325 L 142 326 L 142 327 L 143 328 L 143 329 L 143 330 L 144 331 L 144 332 L 145 333 L 145 334 L 146 335 L 146 336 L 147 337 L 147 338 L 148 339 L 148 340 L 149 341 L 149 342 L 150 343 L 150 344 L 151 345 L 152 346 L 152 347 L 153 348 L 153 349 L 154 350 L 154 351 L 155 352 L 156 353 L 157 354 L 157 355 L 158 356 L 158 357 L 159 358 L 160 359 L 160 360 L 161 361 L 162 362 L 163 363 L 163 364 L 164 365 L 165 366 L 166 367 L 167 368 L 167 369 L 168 370 L 169 371 L 170 372 L 171 373 L 172 374 L 172 375 L 173 376 L 174 377 L 175 378 L 176 379 L 177 380 L 178 381 L 179 382 L 180 383 L 181 384 L 182 385 L 183 386 L 184 387 L 185 388 L 186 389 L 187 390 L 188 391 L 189 391 L 190 392 L 191 393 L 192 394 L 193 395 L 194 396 L 195 396 L 196 397 L 197 398 L 198 399 L 199 400 L 200 400 L 201 401 L 202 402 L 203 403 L 204 403 L 205 404 L 206 405 L 207 405 L 208 406 L 209 407 L 210 407 L 211 408 L 212 409 L 213 409 L 214 410 L 215 410 L 216 411 L 217 412 L 218 412 L 219 413 L 220 413 L 221 414 L 222 414 L 223 415 L 224 415 L 225 416 L 226 416 L 227 417 L 228 418 L 229 418 L 230 418 L 231 419 L 232 419 L 233 420 L 234 420 L 235 421 L 236 421 L 237 422 L 238 422 L 239 423 L 240 423 L 241 423 L 242 424 L 243 424 L 244 424 L 245 425 L 246 425 L 247 425 L 248 426 L 249 426 L 250 427 L 251 427 L 252 427 L 253 428 L 254 428 L 255 428 L 256 428 L 257 429 L 258 429 L 259 429 L 260 429 L 261 430 L 262 430 L 263 430 L 264 431 L 265 431 L 266 431 L 267 431 L 268 432 L 269 432 L 270 432 L 271 432 L 272 433 L 273 433 L 274 433 L 275 433 L 276 433 L 277 433 L 278 433 L 279 434 L 280 434 L 281 434 L 282 434 L 283 434 L 284 434 L 285 434 L 286 435 L 287 435 L 288 435 L 289 435 L 290 435 L 291 435 L 292 435 L 293 435 L 294 435 L 295 436 L 296 436 L 297 436 L 298 436 L 299 436 L 300 436 L 301 436 L 302 436 L 303 436 L 304 436 L 305 436 L 306 436 L 307 436 L 308 436 L 309 436 L 310 436 L 311 436 L 312 436 L 313 436 L 314 436 L 315 436 L 316 436 L 317 436 L 318 436 L 319 436 L 320 436 L 321 435 L 322 435 L 323 435 L 324 435 L 325 435 L 326 435 L 327 435 L 328 435 L 329 435 L 330 435 L 331 434 L 332 434 L 333 434 L 334 434 L 335 434 L 336 434 L 337 434 L 338 433 L 339 433 L 340 433 L 341 433 L 342 433 L 343 433 L 344 432 L 345 432 L 346 432 L 347 432 L 348 432 L 349 431 L 350 431 L 351 431 L 352 430 L 353 430 L 354 430 L 355 430 L 356 429 L 357 429 L 358 429 L 359 429 L 360 428 L 361 428 L 362 428 L 363 427 L 364 427 L 365 427 L 366 426 L 367 426 L 368 426 L 369 425 L 370 425 L 371 425 L 372 424 L 373 424 L 374 424 L 375 423 L 376 423 L 377 422 L 378 422 L 379 421 L 380 421 L 381 421 L 382 420 L 383 420 L 384 419 L 385 419 L 386 418 L 387 418 L 388 417 L 389 417 L 390 416 L 391 416 L 392 415 L 393 415 L 394 414 L 395 413 L 396 413 L 397 413 L 398 412 L 399 411 L 400 411 L 401 410 L 402 410 L 403 409 L 404 409 L 405 408 L 406 407 L 407 407 L 408 406 L 409 405 L 410 404 L 411 404 L 412 403 L 413 403 L 414 402 L 415 401 L 416 400 L 417 400 L 418 399 L 419 398 L 420 397 L 421 396 L 422 396 L 423 395 L 424 394 L 425 393 L 426 392 L 427 391 L 428 391 L 429 390 L 430 389 L 431 388 L 432 387 L 433 386 L 434 385 L 435 384 L 436 383 L 437 382 L 438 381 L 439 380 L 440 379 L 441 378 L 442 377 L 443 376 L 444 375 L 444 374 L 445 373 L 446 372 L 447 371 L 448 370 L 449 369 L 449 368 L 450 367 L 451 366 L 452 365 L 453 364 L 453 363 L 454 362 L 455 361 L 455 360 L 456 359 L 457 358 L 457 357 L 458 356 L 459 355 L 459 354 L 460 353 L 461 352 L 461 351 L 462 350 L 463 349 L 463 348 L 464 347 L 464 346 L 465 345 L 466 344 L 466 343 L 467 342 L 467 341 L 468 340 L 468 339 L 469 338 L 469 337 L 470 336 L 470 335 L 471 334 L 471 333 L 472 332 L 472 331 L 472 330 L 473 329 L 473 328 L 474 327 L 474 326 L 475 325 L 475 324 L 476 323 L 476 322 L 476 321 L 477 320 L 477 319 L 477 318 L 478 317 L 478 316 L 478 315 L 479 314 L 479 313 L 480 312 L 480 311 L 480 310 L 481 309 L 481 308 L 481 307 L 481 306 L 482 305 L 482 304 L 482 303 L 482 302 L 483 301 L 483 300 L 483 299 L 483 298 L 484 297 L 484 296 L 484 295 L 484 294 L 485 293 L 485 292 L 485 291 L 485 290 L 486 289 L 486 288 L 486 287 L 486 286 L 486 285 L 486 284 L 486 283 L 487 282 L 487 281 L 487 280 L 487 279 L 487 278 L 487 277 L 487 276 L 487 275 L 487 274 L 488 273 L 488 272 L 488 271 L 488 270 L 488 269 L 488 268 L 488 267 L 488 266 L 488 265 L 488 264 L 488 263 L 488 262 L 488 261 L 489 260 L 489 259 L 489 258 L 489 257 L 488 256 L 488 255 L 488 254 L 488 253 L 488 252 L 488 251 L 488 250 L 488 249 L 488 248 L 488 247 L 488 246 L 488 245 L 488 244 L 488 243 L 488 242 L 488 241 L 488 240 L 488 239 L 488 238 L 487 237 L 487 236 L 487 235 L 487 234 L 487 233 L 487 232 L 487 231 L 487 230 L 487 229 L 486 228 L 486 227 L 486 226 L 486 225 L 486 224 L 486 223 L 486 222 L 485 221 L 485 220 L 485 219 L 485 218 L 485 217 L 484 216 L 484 215 L 484 214 L 483 213 L 483 212 L 483 211 L 483 210 L 482 209 L 482 208 L 482 207 L 482 206 L 482 205 L 481 204 L 481 203 L 481 202 L 480 201 L 480 200 L 480 199 L 479 198 L 479 197 L 478 196 L 478 195 L 478 194 L 477 193 L 477 192 L 477 191 L 476 190 L 476 189 L 476 188 L 475 187 L 475 186 L 474 185 L 474 184 L 473 183 L 473 182 L 472 181 L 472 180 L 472 179 L 471 178 L 471 177 L 470 176 L 470 175 L 469 174 L 469 173 L 468 172 L 468 171 L 467 170 L 467 169 L 466 168 L 466 167 L 465 166 L 464 165 L 464 164 L 463 163 L 463 162 L 462 161 L 461 160 L 461 159 L 460 158 L 459 157 L 459 156 L 458 155 L 458 154 L 457 153 L 456 152 L 455 151 L 455 150 L 454 149 L 453 148 L 453 147 L 452 146 L 451 145 L 450 144 L 450 143 L 449 142 L 448 141 L 447 140 L 446 139 L 445 138 L 444 137 L 444 136 L 443 135 L 442 134 L 441 133 L 440 132 L 439 131 L 438 130 L 437 129 L 436 128 L 435 127 L 434 126 L 433 125 L 432 124 L 431 123 L 430 122 L 429 121 L 428 120 L 427 119 L 426 119 L 425 118 L 424 117 L 423 116 L 422 115 L 421 114 L 420 114 L 419 113 L 418 112 L 417 111 L 416 111 L 415 110 L 414 109 L 413 108 L 412 108 L 411 107 L 410 106 L 409 106 L 408 105 L 407 104 L 406 104 L 405 103 L 404 102 L 403 102 L 402 101 L 401 101 L 400 100 L 399 100 L 398 99 L 397 98 Z');
             
             if (LOG)
             console.log(path);
             
             path.set({left: 120, top: 120});
             canvas.add(path);
             
             
             canvas.renderAll();*/


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





//            addNumericCollectionGenerator(800, 600);







//            canvas.forEachObject(function (object) {
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

                var canvasCoords = getCanvasCoordinates(e);

                /*var dataTransfer = e.dataTransfer;
                 var text = e.dataTransfer.getData('Text');
                 
                 console.log("dataTransfer:");
                 console.log(dataTransfer);
                 
                 console.log("text:");
                 console.log(text);*/

                if (e.dataTransfer.types) {
                    
                    console.log("e.dataTransfer.types:");
                    console.log(e.dataTransfer.types);
                    
                    var totalTypes = e.dataTransfer.types.length;
                    for (var i=0; i<totalTypes; i++) {
                        var type = e.dataTransfer.types[i];
                        
                        
                        var contentType = type;
                        var dataString = e.dataTransfer.getData(type);

                        console.log("content-type " + contentType);
                        console.log("dataString: " + dataString);

                        if (contentType === "text/html") {

                            var parsedHTML = $.parseHTML(dataString);

                            console.log("***" + dataString, 'red', 'white');

                            var found = addVisualElementFromHTML(parsedHTML, canvasCoords, true);
                            
                            if (found) {
                                break;
                            }
                            
//                            break;


//                        } else if (contentType === "text/uri-list") {
                        } else if (false) {

                            var url = dataString;

                            showWebPage(url);
                            
//                            break;

//                        } else if (contentType === "text/plain") {
                        } else if (false) {

                            var x = canvasCoords.x;
                            var y = canvasCoords.y;

                            var theText = dataString;

                            var targetObject = findPotentialDestination(canvasCoords, ['isVisualProperty', 'isMark']);

                            if (targetObject) {

                                var value = createBestValueFromText(theText);

                                if (targetObject.isVisualProperty) {

                                    blink(targetObject, false);
                                    targetObject.setValue(value, true, true);

                                } else if (targetObject.isMark) {

                                    var attribute = null;

                                    if (value.isStringData) {
                                        attribute = 'label';
                                    } else if (value.isColorData) {
                                        attribute = 'fill';
                                    }

                                    if (attribute !== null) {

                                        var visualProperty = targetObject.getVisualPropertyByAttributeName(attribute);

                                        if (targetObject.isCompressed) {
                                            blink(targetObject, true);
                                        } else {
                                            blink(targetObject, !visualProperty);
                                        }

                                        if (visualProperty) {
                                            if (!targetObject.isCompressed) {
                                                blink(visualProperty, attribute === 'label');
                                            }
                                            visualProperty.setValue(value, true, true);
                                        }

                                    }

                                }


                            } else {

                                var theVisualVariable = createBestVisualVariableFromText(theText, x, y);


                                canvas.add(theVisualVariable);
                                theVisualVariable.animateBirth(false, null, null, false);


                                return theVisualVariable;

                            }


                            break;

                        }
                        
                        
                    }
                    
//                    e.dataTransfer.types.forEach(function (type) {
//                        
//                        
////                    [].forEach.call(e.dataTransfer.types, function (type) {
////                        console.log("***" + entities(e.dataTransfer.getData(type) + ' (content-type: ' + type + ')'));
////                        console.log("***" + e.dataTransfer.getData(type) + ' (content-type: ' + type + ')');
//
//                        var contentType = type;
//                        var dataString = e.dataTransfer.getData(type);
//
//                        console.log("content-type " + contentType);
//                        console.log("dataString: " + dataString);
//
//                        if (contentType === "text/html") {
//
//                            var parsedHTML = $.parseHTML(dataString);
//
//                            console.log("***" + dataString, 'red', 'white');
//
//                            addVisualElementFromHTML(parsedHTML, canvasCoords, true);
//                            
//                            break;
//
//
//                        } else if (contentType === "text/uri-list") {
//
//                            var url = dataString;
//
//                            showWebPage(url);
//                            
//                            break;
//
//                        } else if (contentType === "text/plain") {                        
//
//                            var x = canvasCoords.x;
//                            var y = canvasCoords.y;
//
//                            var theText = dataString;
//
//                            var targetObject = findPotentialDestination(canvasCoords, ['isVisualProperty', 'isMark']);
//
//                            if (targetObject) {
//
//                                var value = createBestValueFromText(theText);
//
//                                if (targetObject.isVisualProperty) {
//
//                                    blink(targetObject, false);
//                                    targetObject.setValue(value, true, true);
//
//                                } else if (targetObject.isMark) {
//
//                                    var attribute = null;
//
//                                    if (value.isStringData) {
//                                        attribute = 'label';
//                                    } else if (value.isColorData) {
//                                        attribute = 'fill';
//                                    }
//
//                                    if (attribute !== null) {
//
//                                        var visualProperty = targetObject.getVisualPropertyByAttributeName(attribute);
//
//                                        if (targetObject.isCompressed) {
//                                            blink(targetObject, true);
//                                        } else {
//                                            blink(targetObject, !visualProperty);
//                                        }
//
//                                        if (visualProperty) {
//                                            if (!targetObject.isCompressed) {
//                                                blink(visualProperty, attribute === 'label');
//                                            }
//                                            visualProperty.setValue(value, true, true);
//                                        }
//
//                                    }
//
//                                }
//
//
//                            } else {
//
//                                var theVisualVariable = createBestVisualVariableFromText(theText, x, y);
//
//
//                                canvas.add(theVisualVariable);
//                                theVisualVariable.animateBirth(false, null, null, false);
//
//
//                                return theVisualVariable;
//
//                            }
//
//
//                            break;
//
//                        }
//
//
//                    });
                    
                    
                    
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







//            var svgns = "http://www.w3.org/2000/svg";
//            var rect = document.createElementNS(svgns, 'rect');
//            rect.setAttributeNS(null, 'x', 100);
//            rect.setAttributeNS(null, 'y', 100);
//            rect.setAttributeNS(null, 'height', '50');
//            rect.setAttributeNS(null, 'width', '50');
//            rect.setAttributeNS(null, 'fill', '#' + Math.round(0xffffff * Math.random()).toString(16));
//            
//            var pepe = flattenToPaths(rect);
//
//            console.log("pepe:");
//            console.log(pepe);





//            addSampleMarksToCanvas();


            /*var path = new fabric.Path('M 4.287474155426025,-0.9000000357627869 L 4.287486553192139,0.665740966796875 L 4.287486553192139,2.2314453125 L 4.287486553192139,3.79718017578125 L 4.2874860763549805,5.362884521484375 L 4.2874860763549805,6.928619384765625 L 4.2874860763549805,8.494354248046875 L 4.2874860763549805,10.06005859375 L 4.2874860763549805,11.62579345703125 L 4.2874860763549805,13.1915283203125 L 4.2874860763549805,14.757232666015625 L 4.287485599517822,16.322967529296875 L 4.287485599517822,17.888671875 L 4.287485599517822,19.45440673828125 L 4.287485599517822,21.0201416015625 L 4.287485599517822,22.585845947265625 L 4.287485599517822,24.151580810546875 L 4.287485599517822,25.717315673828125 L 4.287485122680664,27.28302001953125 L 4.287485122680664,28.848739624023438 L 4.287485122680664,30.414474487304688 L 4.287485122680664,31.980194091796875 L 4.287485122680664,33.54591369628906 L 4.287485122680664,35.11163330078125 L 4.287485122680664,36.6773681640625 L 4.287484645843506,38.24308776855469 L 4.287484645843506,39.808807373046875 L 4.287484645843506,41.37452697753906 L 4.287484645843506,42.94024658203125 L 4.287484645843506,44.5059814453125 L 4.287484645843506,46.07170104980469 L 4.287484645843506,47.637420654296875 L 4.287484169006348,49.203155517578125 L 4.287484169006348,50.76887512207031 L 4.287484169006348,52.3345947265625 L 4.287484169006348,53.90031433105469 L 4.287484169006348,55.466033935546875 L 4.287484169006348,57.031768798828125 L 4.287484169006348,58.59748840332031 L 4.2874836921691895,60.1632080078125 L 4.2874836921691895,61.72892761230469 L 4.2874836921691895,63.294647216796875 L 4.2874836921691895,64.86038208007812 L 4.2874836921691895,66.42610168457031 L 4.2874836921691895,67.9918212890625 L 4.2874836921691895,69.55755615234375 L 4.287483215332031,71.12326049804688 L 4.287483215332031,72.68899536132812 L 4.287483215332031,74.25471496582031 L 4.287483215332031,75.8204345703125 L 4.287483215332031,77.38616943359375 L 4.287483215332031,78.95188903808594 L 4.287483215332031,80.51760864257812 L 4.287482738494873,82.08334350585938 L 4.287482738494873,83.6490478515625 L 4.287482738494873,85.21478271484375 L 4.287482738494873,86.78050231933594 L 4.287482738494873,88.34622192382812 L 4.287482738494873,89.91195678710938 L 4.287482738494873,91.4776611328125 L 4.287482261657715,93.04339599609375 L 4.287482261657715,94.60911560058594 L 4.287482261657715,96.17483520507812 L 4.287482261657715,97.74057006835938 L 4.287482261657715,99.30628967285156 L 4.287482261657715,100.87200927734375 L 4.287482261657715,102.437744140625 L 4.287481784820557,104.00344848632812 L 4.287481784820557,105.56918334960938 L 4.287481784820557,107.13490295410156 L 4.287481784820557,108.70062255859375 L 4.287481784820557,110.266357421875 L 4.287481784820557,111.83206176757812 L 4.287481784820557,113.39779663085938 L 4.287481307983398,114.96351623535156 L 4.287481307983398,116.52923583984375 L 4.287481307983398,118.094970703125 L 4.287481307983398,119.66069030761719 L 4.287481307983398,121.22640991210938 L 4.287481307983398,122.79214477539062 L 4.28748083114624,124.35784912109375 L 4.28748083114624,125.923583984375 L 4.28748083114624,127.48930358886719 L 4.28748083114624,129.05502319335938 L 4.28748083114624,130.62074279785156 L 4.28748083114624,132.1864776611328 L 4.28748083114624,133.752197265625 L 4.287480354309082,135.3179168701172 L 4.287480354309082,136.88363647460938 L 4.287480354309082,138.44937133789062 L 4.287480354309082,140.0150909423828 L 4.287480354309082,141.580810546875 L 4.287480354309082,143.1465301513672 L 4.287480354309082,144.71226501464844 L 4.287479877471924,146.27798461914062 L 4.287479877471924,147.8437042236328 L 4.287479877471924,149.409423828125 L 4.287479877471924,150.97515869140625 L 4.287479877471924,152.54087829589844 L 4.287479877471924,154.10659790039062 L 4.287479877471924,155.6723175048828 L 4.287479400634766,157.238037109375 L 4.287479400634766,158.80377197265625 L 4.287479400634766,160.36949157714844 L 4.287479400634766,161.93521118164062 L 4.287479400634766,163.5009307861328 L 4.287479400634766,165.06666564941406 L 4.287479400634766,166.63238525390625 L 4.287478923797607,168.19810485839844 L 4.287478923797607,169.76382446289062 L 4.287478923797607,171.32955932617188 L 4.287478923797607,172.89527893066406 L 4.287478923797607,174.46099853515625 L 4.287478923797607,176.02671813964844 L 4.287478923797607,177.59243774414062 L 4.287478446960449,179.15817260742188 L 4.287478446960449,180.72389221191406 L 4.287478446960449,182.28961181640625 L 4.287478446960449,183.85533142089844 L 4.287478446960449,185.4210662841797 L 4.287478446960449,186.98678588867188 L 4.287478446960449,188.55250549316406 L 4.287477970123291,190.11822509765625 L 4.287477970123291,191.6839599609375 L 4.287477970123291,193.2496795654297 L 4.287477970123291,194.81539916992188 L 4.287477970123291,196.38111877441406 L 4.287477970123291,197.94683837890625 L 4.287477970123291,199.5125732421875 L 4.287477493286133,201.0782928466797 L 4.287477493286133,202.64401245117188 L 4.287477493286133,204.20973205566406 L 4.287477493286133,205.7754669189453 L 4.287477493286133,207.3411865234375 L 4.287477493286133,208.9069061279297 L 4.287477493286133,210.47262573242188 L 4.287477016448975,212.03836059570312 L 4.287477016448975,213.6040802001953 L 4.287477016448975,215.1697998046875 L 4.287477016448975,216.7355194091797 L 4.287477016448975,218.30123901367188 L 4.287477016448975,219.86697387695312 L 4.287477016448975,221.4326934814453 L 4.287476539611816,222.9984130859375 L 4.287476539611816,224.5641326904297 L 4.287476539611816,226.12986755371094 L 4.287476539611816,227.69558715820312 L 4.287476539611816,229.2613067626953 L 4.287476539611816,230.8270263671875 L 4.287476539611816,232.39276123046875 L 4.287476062774658,233.95848083496094 L 4.287476062774658,235.52420043945312 L 4.287476062774658,237.0899200439453 L 4.287476062774658,238.6556396484375 L 4.287476062774658,240.22137451171875 L 4.287476062774658,241.78709411621094 L 4.287476062774658,243.35281372070312 L 4.2874755859375,244.9185333251953 L 4.2874755859375,246.48426818847656 L 4.2874755859375,248.04998779296875 L 4.2874755859375,249.61570739746094 L 4.2874755859375,251.18142700195312 L 4.2874755859375,252.74716186523438 L 4.2874755859375,254.31288146972656 L 4.287475109100342,255.87860107421875 L 4.287475109100342,257.4443359375 L 4.287475109100342,259.0100402832031 L 4.287475109100342,260.5757751464844 L 4.287475109100342,262.1414794921875 L 4.287475109100342,263.70721435546875 L 4.287475109100342,265.27294921875 L 4.287474632263184,266.8386535644531 L 4.287474632263184,268.4043884277344 L 4.287474632263184,269.9701232910156 L 4.287474632263184,271.53582763671875 L 4.287474632263184,273.1015625 L 4.287474632263184,274.6672668457031 L 4.287474632263184,276.2330017089844 L 4.287474155426025,277.7987365722656 L 4.287474155426025,279.36444091796875 L 4.287474155426025,280.93017578125 L 4.29833984375,282.4850158691406 L 5.86407470703125,282.4850158691406 L 7.4298095703125,282.4850158691406 L 8.995513916015625,282.4850158691406 L 10.561248779296875,282.4850158691406 L 12.126983642578125,282.4850158691406 L 13.69268798828125,282.4850158691406 L 15.2584228515625,282.4850158691406 L 16.824127197265625,282.4850158691406 L 18.389862060546875,282.4850158691406 L 19.955596923828125,282.4850158691406 L 21.52130126953125,282.4850158691406 L 23.0870361328125,282.4850158691406 L 24.65277099609375,282.4850158691406 L 26.218475341796875,282.4850158691406 L 27.784210205078125,282.4850158691406 L 29.34991455078125,282.4850158691406 L 30.9156494140625,282.4850158691406 L 32.48138427734375,282.4850158691406 L 34.047088623046875,282.4850158691406 L 35.612823486328125,282.4850158691406 L 37.17852783203125,282.4850158691406 L 38.7442626953125,282.4850158691406 L 40.30999755859375,282.4850158691406 L 41.875701904296875,282.4850158691406 L 43.441436767578125,282.4850158691406 L 45.007171630859375,282.4850158691406 L 46.5728759765625,282.4850158691406 L 48.13861083984375,282.4850158691406 L 49.704315185546875,282.4850158691406 L 51.270050048828125,282.4850158691406 L 52.835784912109375,282.4850158691406 L 54.4014892578125,282.4850158691406 L 55.96722412109375,282.4850158691406 L 57.532928466796875,282.4850158691406 L 59.098663330078125,282.4850158691406 L 60.664398193359375,282.4850158691406 L 62.2301025390625,282.4850158691406 L 63.79583740234375,282.4850158691406 L 65.361572265625,282.4850158691406 L 66.92727661132812,282.4850158691406 L 68.49301147460938,282.4850158691406 L 70.0587158203125,282.4850158691406 L 71.62445068359375,282.4850158691406 L 73.190185546875,282.4850158691406 L 74.75588989257812,282.4850158691406 L 76.32162475585938,282.4850158691406 L 77.8873291015625,282.4850158691406 L 79.45306396484375,282.4850158691406 L 81.018798828125,282.4850158691406 L 82.58450317382812,282.4850158691406 L 84.15023803710938,282.4850158691406 L 85.71597290039062,282.4850158691406 L 87.28167724609375,282.4850158691406 L 88.847412109375,282.4850158691406 L 90.41311645507812,282.4850158691406 L 91.97885131835938,282.4850158691406 L 93.54458618164062,282.4850158691406 L 95.11029052734375,282.4850158691406 L 96.676025390625,282.4850158691406 L 98.24172973632812,282.4850158691406 L 99.80746459960938,282.4850158691406 L 101.37319946289062,282.4850158691406 L 102.93890380859375,282.4850158691406 L 104.504638671875,282.4850158691406 L 106.07037353515625,282.4850158691406 L 107.63607788085938,282.4850158691406 L 109.20181274414062,282.4850158691406 L 110.76751708984375,282.4850158691406 L 112.333251953125,282.4850158691406 L 113.89898681640625,282.4850158691406 L 115.46469116210938,282.4850158691406 L 117.03042602539062,282.4850158691406 L 118.59613037109375,282.4850158691406 L 120.161865234375,282.4850158691406 L 121.72760009765625,282.4850158691406 L 123.29330444335938,282.4850158691406 L 124.85903930664062,282.4850158691406 L 126.42477416992188,282.4850158691406 L 127.990478515625,282.4850158691406 L 129.55621337890625,282.4850158691406 L 131.12191772460938,282.4850158691406 L 132.68765258789062,282.4850158691406 L 134.25338745117188,282.4850158691406 L 135.819091796875,282.4850158691406 L 137.38482666015625,282.4850158691406 L 138.95053100585938,282.4850158691406 L 140.51626586914062,282.4850158691406 L 142.08200073242188,282.4850158691406 L 143.647705078125,282.4850158691406 L 145.21343994140625,282.4850158691406 L 146.7791748046875,282.4850158691406 L 148.34487915039062,282.4850158691406 L 149.91061401367188,282.4850158691406 L 151.476318359375,282.4850158691406 L 153.04205322265625,282.4850158691406 L 154.6077880859375,282.4850158691406 L 156.17349243164062,282.4850158691406 L 157.73922729492188,282.4850158691406 L 159.304931640625,282.4850158691406 L 160.87066650390625,282.4850158691406 L 162.4364013671875,282.4850158691406 L 164.00210571289062,282.4850158691406 L 165.56784057617188,282.4850158691406 L 167.13357543945312,282.4850158691406 L 168.69927978515625,282.4850158691406 L 170.2650146484375,282.4850158691406 L 171.83071899414062,282.4850158691406 L 173.39645385742188,282.4850158691406 L 174.96218872070312,282.4850158691406 L 176.52789306640625,282.4850158691406 L 178.0936279296875,282.4850158691406 L 179.65933227539062,282.4850158691406 L 181.22506713867188,282.4850158691406 L 182.79080200195312,282.4850158691406 L 184.35650634765625,282.4850158691406 L 185.9222412109375,282.4850158691406 L 187.48797607421875,282.4850158691406 L 189.05368041992188,282.4850158691406 L 190.61941528320312,282.4850158691406 L 192.18511962890625,282.4850158691406 L 193.7508544921875,282.4850158691406 L 195.31658935546875,282.4850158691406 L 196.88229370117188,282.4850158691406 L 198.44802856445312,282.4850158691406 L 200.01373291015625,282.4850158691406 L 201.5794677734375,282.4850158691406 L 203.14520263671875,282.4850158691406 L 204.71090698242188,282.4850158691406 L 206.27664184570312,282.4850158691406 L 207.84237670898438,282.4850158691406 L 209.4080810546875,282.4850158691406 L 210.97381591796875,282.4850158691406 L 212.53952026367188,282.4850158691406 L 214.10525512695312,282.4850158691406 L 215.67098999023438,282.4850158691406 L 217.2366943359375,282.4850158691406 L 218.80242919921875,282.4850158691406 L 220.3681640625,282.4850158691406 L 221.93386840820312,282.4850158691406 L 223.49960327148438,282.4850158691406 L 225.0653076171875,282.4850158691406 L 226.63104248046875,282.4850158691406 L 228.19677734375,282.4850158691406 L 229.76248168945312,282.4850158691406 L 231.32821655273438,282.4850158691406 L 232.8939208984375,282.4850158691406 L 234.45965576171875,282.4850158691406 L 236.025390625,282.4850158691406 L 237.59112548828125,282.4850158691406 L 239.15679931640625,282.4850158691406 L 240.7225341796875,282.4850158691406 L 242.28826904296875,282.4850158691406 L 243.85400390625,282.4850158691406 L 245.41973876953125,282.4850158691406 L 246.98541259765625,282.4850158691406 L 248.5511474609375,282.4850158691406 L 250.11688232421875,282.4850158691406 L 251.6826171875,282.4850158691406 L 253.24835205078125,282.4850158691406 L 254.8140869140625,282.4850158691406 L 256.3797607421875,282.4850158691406 L 257.94549560546875,282.4850158691406 L 259.51123046875,282.4850158691406 L 261.07696533203125,282.4850158691406 L 262.6427001953125,282.4850158691406 L 264.2083740234375,282.4850158691406 L 265.77410888671875,282.4850158691406 L 267.33984375,282.4850158691406 L 268.90557861328125,282.4850158691406 L 270.4713134765625,282.4850158691406 L 272.0369873046875,282.4850158691406 L 273.60272216796875,282.4850158691406 L 275.16845703125,282.4850158691406 L 276.73419189453125,282.4850158691406 L 278.2999267578125,282.4850158691406 L 279.8656005859375,282.4850158691406 L 281.43133544921875,282.4850158691406 L 282.9970703125,282.4850158691406 L 284.56280517578125,282.4850158691406 L 286.1285400390625,282.4850158691406 L 287.6942138671875,282.4850158691406 L 289.25994873046875,282.4850158691406 L 290.82568359375,282.4850158691406 L 292.39141845703125,282.4850158691406 L 293.9571533203125,282.4850158691406 L 295.52288818359375,282.4850158691406 L 297.08856201171875,282.4850158691406 L 298.654296875,282.4850158691406 L 300.22003173828125,282.4850158691406 L 301.7857666015625,282.4850158691406 L 303.35150146484375,282.4850158691406 L 304.91717529296875,282.4850158691406 L 306.48291015625,282.4850158691406 L 308.04864501953125,282.4850158691406 L 309.6143798828125,282.4850158691406 L 311.18011474609375,282.4850158691406 L 312.74578857421875,282.4850158691406 L 314.3115234375,282.4850158691406 L 315.87725830078125,282.4850158691406 L 317.4429931640625,282.4850158691406 L 319.00872802734375,282.4850158691406 L 320.57440185546875,282.4850158691406 L 322.14013671875,282.4850158691406 L 323.70587158203125,282.4850158691406 L 325.2716064453125,282.4850158691406 L 326.83734130859375,282.4850158691406 L 328.403076171875,282.4850158691406 L 329.96875,282.4850158691406 L 331.53448486328125,282.4850158691406 L 333.1002197265625,282.4850158691406 L 334.66595458984375,282.4850158691406 L 336.231689453125,282.4850158691406 L 337.79736328125,282.4850158691406 L 339.36309814453125,282.4850158691406 L 340.9288330078125,282.4850158691406 L 342.49456787109375,282.4850158691406 L 344.060302734375,282.4850158691406 L 345.6259765625,282.4850158691406 L 347.19171142578125,282.4850158691406 L 348.7574462890625,282.4850158691406 L 350.32318115234375,282.4850158691406 L 351.888916015625,282.4850158691406 L 353.45458984375,282.4850158691406 L 355.02032470703125,282.4850158691406 L 356.5860595703125,282.4850158691406 L 358.15179443359375,282.4850158691406 L 359.717529296875,282.4850158691406 L 361.283203125,282.4850158691406 L 362.84893798828125,282.4850158691406 L 364.4146728515625,282.4850158691406 L 365.98040771484375,282.4850158691406 L 367.546142578125,282.4850158691406 L 369.11187744140625,282.4850158691406 L 370.67755126953125,282.4850158691406 L 372.2432861328125,282.4850158691406 L 373.80902099609375,282.4850158691406 L 375.374755859375,282.4850158691406 L 376.94049072265625,282.4850158691406 L 378.50616455078125,282.4850158691406 L 380.0718994140625,282.4850158691406 L 381.63763427734375,282.4850158691406 L 383.203369140625,282.4850158691406 L 384.76910400390625,282.4850158691406 L 386.33477783203125,282.4850158691406 L 387.9005126953125,282.4850158691406 L 389.46624755859375,282.4850158691406 L 391.031982421875,282.4850158691406 L 392.59771728515625,282.4850158691406 L 394.16339111328125,282.4850158691406 L 395.7291259765625,282.4850158691406 L 397.29486083984375,282.4850158691406 L 398.860595703125,282.4850158691406 L 400.42633056640625,282.4850158691406 L 401.99200439453125,282.4850158691406 L 403.5577392578125,282.4850158691406 L 405.12347412109375,282.4850158691406 L 406.689208984375,282.4850158691406 L 408.25494384765625,282.4850158691406 L 409.8206787109375,282.4850158691406 L 411.3863525390625,282.4850158691406 L 412.95208740234375,282.4850158691406 L 414.517822265625,282.4850158691406 L 416.08355712890625,282.4850158691406 L 417.6492919921875,282.4850158691406 L 419.2149658203125,282.4850158691406 L 420.78070068359375,282.4850158691406 L 422.346435546875,282.4850158691406 L 423.91217041015625,282.4850158691406 L 425.4779052734375,282.4850158691406 L 427.0435791015625,282.4850158691406 L 428.60931396484375,282.4850158691406 L 430.175048828125,282.4850158691406 L 431.74078369140625,282.4850158691406 L 433.3065185546875,282.4850158691406 L 434.8721923828125,282.4850158691406 L 436.43792724609375,282.4850158691406 L 438.003662109375,282.4850158691406 L 439.56939697265625,282.4850158691406 L 441.1351318359375,282.4850158691406 L 442.7008056640625,282.4850158691406 L 444.26654052734375,282.4850158691406 L 445.832275390625,282.4850158691406 L 447.39801025390625,282.4850158691406 L 448.9637451171875,282.4850158691406 L 450.52947998046875,282.4850158691406 L 452.09515380859375,282.4850158691406 L 453.660888671875,282.4850158691406 L 455.22662353515625,282.4850158691406 L 456.7923583984375,282.4850158691406 L 458.35809326171875,282.4850158691406 L 459.92376708984375,282.4850158691406 L 461.489501953125,282.4850158691406 L 463.05523681640625,282.4850158691406 L 464.6209716796875,282.4850158691406 L 466.18670654296875,282.4850158691406 L 467.75238037109375,282.4850158691406 L 469.318115234375,282.4850158691406 L 470.88385009765625,282.4850158691406 L 472.4495849609375,282.4850158691406 L 474.01531982421875,282.4850158691406 L 475.58099365234375,282.4850158691406 L 477.146728515625,282.4850158691406 L 478.71246337890625,282.4850158691406 L 480.2781982421875,282.4850158691406 L 481.84393310546875,282.4850158691406 L 483.40960693359375,282.4850158691406 L 484.975341796875,282.4850158691406 L 486.54107666015625,282.4850158691406 L 488.1068115234375,282.4850158691406 L 489.67254638671875,282.4850158691406 L 491.23828125,282.4850158691406 L 492.803955078125,282.4850158691406 L 494.36968994140625,282.4850158691406 L 495.9354248046875,282.4850158691406 L 497.50115966796875,282.4850158691406 L 499.06689453125,282.4850158691406 L 500.632568359375,282.4850158691406 L 502.19830322265625,282.4850158691406');
             //            var path = new fabric.Path('m 4.2874742 -0.9 l 0 283.38502 l 499.4765558 0');
             path.set({
             left: 120, 
             top: 120,
             stroke: 'red',
             fill: '',
             });
             canvas.add(path);
             canvas.renderAll();
             
             console.log("path:");
             console.log(path);*/

//            showWebPage();

// When the system starts up, the panning mode is active by default
            applyActiveMenuButtonStyle($("#panningModeButton"));
            activatePanningMode();


//            applyActiveMenuButtonStyle($("#squaredSelectionButton"));
//            activateSquaredSelection();

//            canvas.absolutePan(new fabric.Point(100,100));
//            canvas.renderAll();


            var bubbleSound = new Audio("audio/bubble.wav"); // buffers automatically when created
            var popSound = new Audio("audio/pop.wav"); // buffers automatically when created
            var trashSound = new Audio("audio/trash.wav"); // buffers automatically when created
            

        </script>
        
        





    </body>

</html>
