<%@page import="classes.OpenCVLoader"%>
<!DOCTYPE html>
<html style="overflow-x: no-display;">
    <head>
        <title>iVoLVR: Interactive Visual Language for Visual Reasoning</title>
        <meta charset="UTF8">


        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

        <!--<meta name="viewport" content="minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0,user-scalable=no" />-->
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />


        <meta name="description" content="" />


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
        <!--<script type="text/javascript" src="./fabric.js-1.5.0/dist/fabric.js"></script>-->

        <script type="text/javascript" src="./js/moment.js"></script>

        <!--        Seems like the scaling & rotating events are not been triggered in this version for multi-touch devices. Because of this, the elements of a mark or a function are not positioned correctly since only the 'moving' event is being recognised -->
        <!--<script type="text/javascript" src="./fabric.js-1.4.13/dist/fabric.js"></script>-->  

        <script type="text/javascript" src="./js/alertify.js-0.3.11/lib/alertify.js"></script>

        <script type="text/javascript" src="./js/jquery.ui.touch-punch.min.js"></script>

        <!-- include the core styles -->
        <link rel="stylesheet" href="./js/alertify.js-0.3.11/themes/alertify.core.css" />
        <link rel="stylesheet" href="./js/alertify.js-0.3.11/themes/alertify.default.css" />

        <script type="text/javascript" src="./js/globals.js"></script>
        <script type="text/javascript" src="./js/util/generalFunctions.js"></script>
        <script type="text/javascript" src="./js/project/Project.js"></script>
        <script type="text/javascript" src="./js/interaction/canvasEvents.js"></script>
        <script type="text/javascript" src="./js/interaction/objectsEvents.js"></script>
        <script type="text/javascript" src="./js/interaction/widgetsEvents.js"></script>
        <!--        <script type="text/javascript" src="./js/interaction/outputs.js"></script>
                <script type="text/javascript" src="./js/interaction/connectors.js"></script>-->
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
        <script type="text/javascript" src="./js/classes/Output.js"></script>

        <script type="text/javascript" src="./js/classes/iconPaths.js"></script>
        <script type="text/javascript" src="./js/classes/VisualProperty.js"></script>
        <script type="text/javascript" src="./js/classes/Plotter.js"></script>

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
        <!--        <script type="text/javascript" src="./js/classes/ContinuousFunction.js"></script>-->
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

    <body onresize="adjustCanvasDimensions()">


        <!--<object id="wtPlugin" style="visibility: hidden;" type="application/x-wacomtabletplugin"></object>-->
        <!--<object id="wtPlugin" type="application/x-wacomtabletplugin"></object>-->

        <input type="color" id="colorPicker" onchange="colorPicked()" style="visibility:hidden;position:absolute;top:-50;left:-50" />

        <!-- Menu Horizontal -->
        <ul id="theMenu" class="menu">

            <!--------------->
            <!-- FILE MENU -->
            <!--------------->
            <li id="fileMenu" class="verticalRightDivider verticalRightDivider2">
                <a href="javascript:void(0);">
                    <i class="fa fa-file-o fa-2x"></i>
                </a>
                <ul>
                    <li><a href="javascript:void(0);" onclick="saveProject();"><i id="saveProjectElement" class="fa-save icon-large"></i> Save project</a></li>

                    <li><a href="javascript:void(0);" onclick="loadiVoLVRProject();"><i id="loadProjectElement" class="fa-folder-open-o icon-large"></i> Open project</a></li>
                    <li> <input type="file" id="dataprojectFileInput" name="someProjectfile" onchange="handleDatafiles(this.files)" style="visibility:hidden;position:absolute;top:-50;left:-50"/></li>

                    <li><a href="javascript:void(0);"><i class="fa-download icon-large"></i> Export canvas</a>
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
            <!--<li class=""><a href="javascript:onLoad();"><i class="icon-picture icon-large"></i> Image</a></li>-->
            <li> <input type="file" id="imageFileInput" name="someFile" onchange="handleImageFiles(this.files)" style="visibility:hidden;position:absolute;top:-50;left:-50"/></li>



            <!--<li class="verticalLeftDivider"><a href="javascript:loadDatafile();"><i class="icon-table icon-large"></i> Data</a></li>-->
            <li class="verticalLeftDivider"><a href="javascript:loadDatafile();"><i class="icon-table fa-2x"></i></a></li>
            <li> <input type="file" id="dataimageFileInput" name="someDatafile" onchange="handleDatafiles(this.files)" style="visibility:hidden;position:absolute;top:-50;left:-50"/></li>


            <!--<li class="verticalLeftDivider verticalRightDivider"><a href="javascript:takePicture();"><i class="fa-camera icon-large"></i> Photo</a></li>-->

            <!--<li class="verticalLeftDivider verticalRightDivider"><a href="javascript:void(0);" onclick="showCameraSignal();"><i id="openCameraButton" class="fa-camera icon-large"></i> Photo</a></li>-->
            <li class="verticalLeftDivider"><a href="javascript:void(0);" onclick="showCameraSignal();"><i id="openCameraButton" class="fa fa-camera fa-2x"></i></a></li>

            <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2"><a href="javascript:void(0);" onclick="showWebPage();"><i id="openWebPageButton" class="fa fa-globe fa-2x"></i></a></li>


            <!---------->
            <!-- ZOOM -->
            <!---------->
            <!--<li class=""><a href="javascript:zoomIn();" onclick=""><i class="icon-zoom-in icon-large"></i></a></li>-->
            <li class=""><a href="javascript:zoomIn();" onclick=""><i class="icon-zoom-in fa-2x"></i></a></li>
            <!--<li class="verticalLeftDivider verticalRightDivider"><a href="javascript:zoomOut();" onclick=""><i class="icon-zoom-out icon-large"></i></a></li>-->
            <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2"><a href="javascript:zoomOut();" onclick=""><i class="icon-zoom-out fa-2x"></i></a></li>

            <!--<li class="verticalLeftDivider"><a id="panningModeActivatorLink" href="javascript:togglePanningMode();"><i class="icon-hand-up icon-large"></i> Panning</a></li>-->
            <!--<li class="verticalLeftDivider"><a href="javascript:void(0);" style="margin-right: -17px">Dragging mode:</a></li>-->


            <!------------------->
            <!-- DRAGGING MODE -->
            <!------------------->
            <li class=""><a id="panningModeActivatorLink" href="javascript:void(0);" onclick="activatePanningMode();"><i class="icon-hand-up fa-2x"></i></a></li>
            <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2"><a id="panningModeDeActivatorLink" href="javascript:void(0);" onclick="deActivatePanningMode();"><i class="fa fa-unlink fa-2x"></i></a></li>



            <!--------------------->
            <!-- TEXT EXTRACTORS -->
            <!--------------------->
            <!--<li class=""><a href="javascript:void(0);" style="margin-right: -17px">Text extractors:</a></li>-->
            <li class=""><a id="lineTextualVixor" href="javascript:void(0);" onclick="drawTextualVixor('lineExtractor', this);"><i class="icon-strikethrough fa-2x"></i></a></li>
            <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2"><a id="blockTextualVixor" href="javascript:void(0);" onclick="drawTextualVixor('blockExtractor', this);"><i class="fa fa-stop fa-2x"></i></a></li>
            <!--<li><a href="javascript:void(0);" onclick="draw('Rectangle');"><i class="icon-stop icon-large"></i></a></li>-->


            <!-------------------->
            <!-- COLOR SAMPLERS -->
            <!-------------------->
            <!--<li class=""><a href="javascript:void(0);" style="margin-right: -17px">Samplers:</a></li>-->
            <li class=""> <a id="samplerButton" href="javascript:void(0);" onclick="samplerButtonClicked();"><i class="collections-freeSampler" style="font-size: 26px;"></i> </a></li>
            <li class="verticalLeftDivider verticalRightDivider verticalRightDivider2"><a id="samplerLineButton" href="javascript:void(0);" onclick="samplerLineButtonClicked();"><i class="collections-straightSampler" style="font-size: 26px;"></i> </a></li>




            <!--<li class="verticalLeftDivider"><a id="transmogrifyButton" href="javascript:void(0);"><i class="icon-magic icon-large"></i> Transmogrify</a></li>-->




            <!--<li class="verticalRightDivider"><a id="toggleConnectorsVisibilityActivatorLink" href="javascript:toggleConnectorsVisibility();"><i id="checkConnectorsVisibility" class="icon-check"></i> Show connectors</a></li>-->



            <!--         <li class="verticalLeftDivider"><a id="toggleMarksExpansionActivatorLink" href="javascript:toggleMarksExpansion();"><i id="checkConnectorsVisibility"></i> Marks:</a></li>
                     <li><a id="toggleMarksExpansionActivatorLink" href="javascript:toggleMarksExpansion();"><i id="checkConnectorsVisibility" class="icon-double-angle-down icon-large"></i></a></li>
                     <li><a id="toggleMarksExpansionActivatorLink" href="javascript:toggleMarksExpansion();"><i id="checkConnectorsVisibility" class="icon-double-angle-up icon-large"></i></a></li>-->

            <!--<li class="verticalLeftDivider"><a id="toggleMarksExpansionActivatorLink" href="javascript:toggleMarksExpansion();"><i id="checkConnectorsVisibility" class="icon-check-empty"></i> Expand marks</a></li>-->

            <!--            <li class="verticalLeftDivider"><a id="objectModeActivatorLink" href="javascript:showConnectors();" onclick=""><i class="icon-eye-open icon-large"></i></a></li>
                        <li><a id="objectModeActivatorLink" href="javascript:hideConnectors();" onclick=""><i class="icon-eye-close icon-large"></i></a></li>-->



            <!--<li><a id="panningModeActivatorLink" href="javascript:activePanningMode();" onclick=""><i class="icon-move icon-large"></i> Panning</a></li>-->

            <!--<li><a id="panningModeActivatorLink" href="javascript:activePanningMode();" onclick=""><i class="icon-fullscreen icon-large"></i> Zoom</a></li>-->


            <!--            <li class="verticalLeftDivider"><a href="javascript:void(0);" onclick=""><i class="icon-pencil icon-large"></i> Drawing mode</a></li>
            
                        <li id="drawingMenu" ><a href="#"><i class="icon-cog icon-large"></i></a>
                            <ul>
                                <li><a id="drawingModeActivatorLink" href="javascript:toggleDrawingMode();"><i id="checkDrawingMode" class="icon-check-empty"></i> Activate</a></li>
            
                                <li class="divider"><a href="javascript:setBrushColor();"><i class="icon-tint icon-large"></i> Brush color</a></li>
                                <li> <input type="color" value="#005E7A" id="colorChooser" style="visibility:hidden;position:absolute;top:-50;left:-50"/></li>
            
                                <li><a href="#"><i class="icon-magic icon-large"></i> Brush style</a>
                                    <ul>
                                        <li><a href="javascript:void(0);"><i class="icon-reorder icon-large"></i> Line</a>
                                            <ul>
                                                <li><a href="javascript:void(0);" onclick="setBrushMode('Pencil');
                                                        setLineWidth(5);"><i class="icon-minus icon-large"></i></a></li>
                                                <li><a href="javascript:void(0);" onclick="setBrushMode('Pencil');
                                                        setLineWidth(7);"><i class="icon-minus icon-2x"></i></a></li>
                                                <li><a href="javascript:void(0);" onclick="setBrushMode('Pencil');
                                                        setLineWidth(9);"><i class="icon-minus icon-3x"></i></a></li>
                                                <li><a href="javascript:void(0);" onclick="setBrushMode('Pencil');
                                                        setLineWid
                                                        th(11);"><i class="icon-minus icon-4x"></i></a></li>
                                            </ul>
                                        </li>
                                        <li><a href="javascript:void(0);" onclick="setBrushMode('Circle');"><i class="icon-spinner icon-large"></i> Circle</a></li>
                                        <li><a href="javascript:void(0);" onclick="setBrushMode('Spray');"><i class="icon-certificate"></i> Spray</a></li>
                                    </ul>
                                </li>                    
                            </ul>
                        </li>-->


            <!--            <li class="verticalLeftDivider"><a href="javascript:void(0);" onclick="drawTextualVixor();"><i class="icon-text-width icon-large"></i> Select text</a></li>            
                        <li class="verticalLeftDivider"><a href="javascript:void(0);" onclick="draw('Rectangle');"><i class="icon-stop icon-large"></i> Rectangle</a></li>         -->


            <!--<li class="verticalLeftDivider"><a id="rectSelectionButton" href="javascript:void(0);"><i class="icon-check-empty icon-large"></i>Rect Selection</a></li>-->

            <!--<li class="verticalLeftDivider"><a id="freeSelectionButton" href="javascript:void(0);"><i class="icon-hand-up icon-large"></i> Free selection</a></li>-->

            <!--            <li ><a href="javascript:void(0);" onclick="draw('Circle');"><i class="icon-circle icon-large"></i> Circle</a></li>
                        <li ><a href="javascript:void(0);" onclick="draw('Ellipse');"><i class="icon-circle icon-large"></i> Circle</a></li>-->






            <li class="verticalRightDivider"><a href="javascript:void(0);" onclick="duplicateObject();"><i class="fa fa-copy fa-2x"></i></a></li>
            <li class="verticalRightDivider verticalRightDivider verticalRightDivider2"><a href="javascript:void(0);" onclick="deleteObject();"><i class="fa fa-remove fa-2x"></i></a></li>

            <!--<li class="verticalRightDivider"><a href="javascript:void(0);" onclick="duplicateObject();"><i class="fa-copy icon-large"></i> Duplicate mark</a></li>-->




            <!--<li class="verticalRightDivider"><a href="javascript:void(0);" onclick="showInfo();"><i id="infoElement" class="fa-info-circle icon-large"></i></a></li>-->

            <!--<li class="verticalRightDivider"><a href="javascript:void(0);" onclick="saveCanvas();"><i id="saveCanvasElement" class="fa-download icon-large"></i></a></li>-->

            <!--<li class="verticalRightDivider"><a href="javascript:void(0);" onclick="saveProject();"><i id="saveProjectElement" class="fa-save icon-large"></i></a></li>-->

            <!--            <li class="verticalRightDivider"><a href="javascript:void(0);" onclick="loadiVoLVRProject();"><i id="loadProjectElement" class="fa-folder-open-o icon-large"></i></a></li>
                        <li> <input type="file" id="dataprojectFileInput" name="someProjectfile" onchange="handleDatafiles(this.files)" style="visibility:hidden;position:absolute;top:-50;left:-50"/></li>-->



            <!--<li class="verticalLeftDivider"><a href="javascript:void(0);" onclick="deleteAllObjects();"><i class="icon-trash icon-large"></i> Remove all</a></li>-->



            <!----------------->
            <!-- CONFIG MENU -->
            <!----------------->
            <li id="configMenu" class="verticalRightDivider verticalRightDivider2">
                <a href="javascript:void(0);">
                    <!--<i class="fa fa-cog fa-2x"></i>-->
                    <i class="fa fa-plus fa-2x"></i>
                </a>
                <ul>


                    <li><a id="toggleConnectorsVisibilityActivatorLink" href="javascript:toggleConnectorsVisibility();"><i id="checkConnectorsVisibility" class="icon-check"></i> Show connectors</a></li>

                    <li><a href="javascript:void(0);" onclick="deleteAllObjects();"><i class="fa fa-trash-o fa-2x"></i></a></li>

                    <li><a href="javascript:void(0);" onclick="loadiVoLVRProject();"><i id="loadProjectElement" class="fa-folder-open-o icon-large"></i> Open project</a></li>
                    <li> <input type="file" id="dataprojectFileInput" name="someProjectfile" onchange="handleDatafiles(this.files)" style="visibility:hidden;position:absolute;top:-50;left:-50"/></li>

                    <li><a href="javascript:void(0);"><i class="fa-download icon-large"></i> Export canvas...</a>
                        <ul>
                            <li><a href="javascript:void(0);" onclick="saveCanvas();"><i id="saveCanvasElement" class="fa-file-code-o icon-large"></i> As SVG</a></li>

                            <li><a href="javascript:void(0);" onclick="saveCanvas();"><i id="saveCanvasElement" class="fa-file-image-o icon-large"></i> As PNG</a></li>
                        </ul>
                    </li>
                </ul>
            </li>




            <li class="verticalLeftDivider" style="float: right;"><a id="toggleAdditionalToolsVisibility" href="javascript:void(0);" onclick="togglePanelVisibility('#rightPanel');"><i class="icon-chevron-right fa-2x"></i> Less</a></li>









        </ul>

        <!--        <div id="footer">
                    &copy; 2014 The <a href="https://www.st-andrews.ac.uk/">University of St Andrews</a> is a charity registered in Scotland, No SC013532 &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp; College Gate, St Andrews, Fife KY16 9AJ, Scotland, United Kingdom. Telephone: +44 (0)1334 476161
                </div>-->

        <div class="clear"></div>

        <div class="grid">

            <!-- ===================================== END HEADER ===================================== -->

            <div class="col_12" id="mainContainer">



                <div class="rightPanel" id="rightPanel" draggable="false">


                    <!--               <h6 onclick="togglePanelVisibility('#objectActions', false);" style="cursor: pointer;">Object actions</h6>
                                   <ul id="objectActions" class="icons">
                    
                                      <li class="clicElement"> <a onclick="duplicateObject();" ><i class="icon-copy icon-large"></i> Duplicate</a></li>
                    
                                      <li class="clicElement"> <a onclick="bringToFront();"><i class="icon-chevron-up icon-large"></i> Bring to front</a></li>
                    
                                      <li class="clicElement"> <a onclick="sendToBack();"><i class="icon-chevron-down icon-large"></i> Send to back</a></li>
                    
                                      <li class="clicElement"> <a onclick="bringForward();"><i class="icon-double-angle-up icon-large"></i> Bring forwards</a></li>
                    
                                      <li class="clicElement"> <a onclick="sendBackwards();"><i class=" icon-double-angle-down icon-large"></i> Send backwards</a></li>
                    
                                      <li class="clicElement"> <a onclick="deleteObject();"><i class="icon-minus-sign icon-large"></i> Remove</a></li>
                    
                                   </ul>
                                   <hr />-->


                    <h6 onclick="togglePanelVisibility('#marksList', false);" style="cursor: pointer;">Marks:</h6>                    
                    <ul id="marksList" class="horizontalButtomsRow">


                        <li id="circlePrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-circle"></i></a></li>
                        <li id="rectPrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-rectangle"></i></a></li>
                        <li id="squarePrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-square"></i></a></li>

                        <li id="pathMarkPrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-pathMark"></i></a></li>

                        <!--<li id="filePrototype" draggable="false" class="boxDivider"><a onclick="loadSVGFile();"><i class="mark-svg"></i></a></li>-->

                        <li id="fatFontPrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-fatfont"></i></a></li>
                        <li id="ellipsePrototype" draggable="true" class="dragElement boxDivider"><a><i class="mark-ellipse"></i></a></li>

                        <li style="visibility:hidden;position:absolute;top:0;left:0"> <input type="file" id="svgimageFileInput" name="someSVGFile" onchange="handleSVGFiles(this.files)"/></li>

                        <li id="filePrototype" unselectable='on' onselectstart='return false;' onmousedown='return false;' draggable="false" class="buttonInHorizontalList" style="height: 50px; margin-top: 3px; margin-bottom: 0px;"><a onclick="loadSVGFile();"><i class="mark-svg" style="margin-left: -100px; margin-right: 10px;"> </i> <span style="margin-top: 4px; position: absolute;">Import from file</span> </a></li>
                        <li id="drawPathMark" unselectable='on' onselectstart='return false;' onmousedown='drawPathMarkButtonClicked();' draggable="false" class="buttonInHorizontalList" style="height: 50px; margin-bottom: 0px;"><a><i class="mark-path" style="margin-left: -70px; margin-right: 10px;"> </i> <span style="margin-top: 4px; position: absolute;">Draw path</span> </a></li>
                        <li id="drawFilledMark" unselectable='on' onselectstart='return false;' onmousedown='drawFilledMarkButtonClicked();' draggable="false" class="buttonInHorizontalList" style="height: 50px; margin-bottom: 0px;"><a><i class="mark-filled" style="margin-left: -110px; margin-right: 10px;"> </i> <span style="margin-top: 4px; position: absolute;">Draw filled mark</span> </a></li>
                    </ul>


                    <hr />

                    <h6 onclick="togglePanelVisibility('#datatypesList', false);" style="cursor: pointer;">Values:</h6>
                    <ul id="datatypesList" class="horizontalButtomsRow">
                        <li id="isColorData" draggable="true" class="dragElement circularBorder" style="margin-right: 12px; margin-bottom: 10px;"><a><i class="value-color"></i></a></li>

                        <li id="isStringData" draggable="true" class="dragElement circularBorder" style="margin-right: 12px; margin-bottom: 10px;"><a><i class="value-string"></i></a></li>
                        <li id="isNumericData" draggable="true" class="dragElement circularBorder" style="margin-right: 12px; margin-bottom: 10px;"><a><i class="value-number"></i></a></li>

                        <li id="isShapeData" draggable="true" class="dragElement circularBorder" style="margin-right: 12px;"><a><i class="value-shape"> </i> </a></li>
                        <li id="isDurationData" draggable="true" class="dragElement circularBorder" style="margin-right: 12px;"><a><i class="value-duration"> </i> </a></li>
                        <li id="isDateAndTimeData" draggable="true" class="dragElement circularBorder" style="margin-right: 12px;"><a><i class="value-dateAndTime"></i></i></a></li>




                    </ul>

                    <hr />

                    <h6 onclick="togglePanelVisibility('#operatorsList', false);" style="cursor: pointer;">Operators:</h6>                    
                    <ul id="operatorsList" class="horizontalButtomsRow">
                        <li id="division-operator" draggable="true" class="dragElement circularBorder" style="margin-right: 5px;"><a><i class="operator-divisonIcon"></i></a></li>
                        <li id="multiplication-operator" draggable="true" class="dragElement circularBorder"><a><i class="operator-multiplicationIcon"></i></a></li>
                        <li id="subtraction-operator" draggable="true" class="dragElement circularBorder"><a><i class="operator-subtractionIcon"></i></a></li>
                        <li id="addition-operator" draggable="true" class="dragElement circularBorder"><a><i class="operator-additionIcon"></i></a></li>
                    </ul>

                    <hr />
                    <h6 onclick="togglePanelVisibility('#draggableWidgetsList', false);" style="cursor: pointer;">Collections:</h6>
                    <ul id="draggableWidgetsList" class="horizontalButtomsRow">
                        <!--                  <li id="square-grower" draggable="true" class="dragElement boxDivider"><a><i class="icon-fullscreen icon-large"></i></a></li>
                                          <li id="vertical-grower" draggable="true" class="dragElement boxDivider"><a><i class="icon-resize-vertical icon-large"></i></a></li>
                                          <li id="horizontal-grower" draggable="true" class="dragElement boxDivider"><a><i class="icon-resize-horizontal icon-large"></i></a></li>-->
                        <!--<li id="playerWidget" draggable="true" class="dragElement boxDivider"><a><i class="fa-caret-square-o-right icon-large"></i></a></li>-->
                        <!--<li id="aggregatorWidget" draggable="true" class="dragElement boxDivider"><a><i class="fa-ellipsis-h icon-large"></i></a></li>-->

                        <li id="mapperWidget" draggable="true" class="dragElement boxDivider" style="margin-right: 5px;"><a><i class="collections-mapper"></i></a></li>
                        <!--<li id="numericFunctionWidget" draggable="true" class="dragElement boxDivider"><a><i class="fa-child icon-large"></i></a></li>-->

                        <li id="verticalCollection" draggable="true" class="dragElement boxDivider" style="margin-right: 3px;"><a><i class="collections-collection" ></i></a></li>


                        <li id="numberGenerator" draggable="true" class="dragElement boxDivider" style="margin-right: 5px;"><a><i class="generator-number"></i></a></li> 
                        <li id="collectionGenerator" draggable="true" class="dragElement boxDivider" style="margin-right: 3px;"><a><i class="collections-generator"></i></a></li>









                    </ul>


                    <hr />

                    <h6 onclick="togglePanelVisibility('#functionsList', false);" style="cursor: pointer;">Functions:</h6>                                        

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


                        <li id="drawFunction" unselectable='on' onselectstart='return false;' onmousedown='drawFunctionButtonClicked();' draggable="false" class="buttonInHorizontalList"><a><i class="function-draw" style="margin-left: -87px; margin-right: 10px;"> </i> <span style="margin-top: 4px; position: absolute;">Draw function</span> </a></li>

                        <li id="enterFunction" unselectable='on' onselectstart='return false;' onmousedown='enterFunctionButtonClicked();' draggable="false" class="buttonInHorizontalList">
                            <a>
                                <i class="fa-superscript icon-large" style="margin-left: -17px; margin-right: 10px;"></i> Enter definition
                                <!--<span style="margin-top: 4px; position: absolute;"></span>-->
                            </a>
                        </li>

                    </ul>














                    <!--                    <h6>Draggable widgets</h6>
                    
                                        <ul class="icons">               
                                            <li id="horizontal-grower" draggable="true" class="dragElement"><i class="icon-resize-horizontal icon-large"></i> Horizontal grower</li>               
                                            <li id="vertical-grower" draggable="true" class="dragElement"><a><i class="icon-resize-vertical icon-large"></i> Vertical grower</a></li>               
                                            <li id="square-grower" draggable="true" class="dragElement"><a><i class="icon-fullscreen icon-large"></i> Square grower</a></li>
                    
                                        </ul>-->




                </div>

                <section id="drop">

                    <div id="canvasContainer" class="canvasStyle">
                        <canvas id="theCanvas"></canvas>
                    </div>

                </section>



            </div>

        </div><!-- END GRID -->










        <script type="text/javascript">

            var NowMoment = moment();
            var formatedString = NowMoment.format("YYYY;M;D");
            if (LOG)
                console.log(formatedString);
            $(document).ready(function () {
                $('.tooltip').tooltipster();
            });
            //            $.fn.tooltipster('setDefaults', {                
            //                delay: 0
            //            });





            // global variables
            var previousX = null;
            var previousY = null;
            var previousAngle = null;
            alertify.set({buttonReverse: true});
            var brushColor = "#000000";
            var brushWidth = 5;
            //            if (LOG) console.log("$('#footer').position():");
            //            if (LOG) console.log($('#footer').position());






            // create a wrapper around native canvas element (with id="theCanvas")            
            var canvas = new fabric.Canvas('theCanvas', {backgroundColor: "#ffffff", renderOnAddRemove: false});
            var p1 = {x: 1, y: -1};
            var p2 = {x: 2, y: 4};
            var line = {p1: p1, p2: p2};
            var length = computeLength(line);
            if (LOG)
                console.log("length:");
            if (LOG)
                console.log(length);
            var vector = {x: line.p2.x - line.p1.x, y: line.p2.y - line.p1.y};
            if (LOG)
                console.log("vector:");
            if (LOG)
                console.log(vector);
            var unitVector = {x: vector.x / length, y: vector.y / length};
            if (LOG)
                console.log("unitVector:");
            if (LOG)
                console.log(unitVector);
            var distance = 4;
            var productVector = {x: unitVector.x * distance, y: unitVector.y * distance};
            if (LOG)
                console.log("productVector:");
            if (LOG)
                console.log(productVector);
            var addVector = {x: productVector.x + line.p1.x, y: productVector.y + line.p1.y};
            if (LOG)
                console.log("addVector:");
            if (LOG)
                console.log(addVector);
            var pointAt = getPointAlongLine(line, distance);
            if (LOG)
                console.log("pointAt:");
            if (LOG)
                console.log(pointAt);
            //         var path = new fabric.Path('M 295.18658465029534 473.84753298711473 L 295.2452433644849 478.7480389456039 L 296.2588162564095 483.542939308535 L 298.1883522832691 488.04796874399676 L 300.95970046041344 492.09000149787755 L 304.4663594297368 495.513704517567 L 308.57357025469685 498.18750681378816 L 313.12349512727917 500.00865566920004 L 317.9412829862237 500.9071653499618 L 322.8417889447129 500.8485066330835 L 327.63668930764396 499.83493374384767 L 332.14171874310574 497.90539771698803 L 339.2220667527544 494.01120631060576 L 350.26253513922654 491.3347291271471 L 373.8758124408049 490.0228803875731 L 415.9159476052378 491.40881891101384 L 422.85015311478253 492.965477292244 L 424.6643409013131 501.31074110920923 L 425.8335401804891 505.1631129596319 L 438.8335401782594 538.1631129585222 L 440.3167467538657 541.2785231066691 L 466.81674675521515 588.2785231068812 L 470.27391270827104 593.0112774832343 L 476.7739127085006 600.0112774838951 L 480.2637740496574 603.126395934835 L 499.26377404991473 617.126395933468 L 503.55280283686307 619.6691074576503 L 508.26112773008947 621.3100908555851 L 513.2014617373726 621.9840713588477 L 527.2014617360055 622.4840713592789 L 531.7533088326591 622.2307021553604 L 536.1834623760236 621.1549477641635 L 540.3446037553539 619.2925808987961 L 544.0983599909717 616.7055319906639 L 550.09835999077 611.7055319890395 L 552.8659014614203 609.010794332954 L 555.1852871931826 605.9218873049273 L 558.685287193513 600.4218873055603 L 560.6516578593016 596.6608946351766 L 561.9535298924307 592.6214876670172 L 563.4535298910358 586.1214876667876 L 564.0591957333112 579.1860291732331 L 562.5591957320173 550.686029172847 L 561.4168945011188 544.4199085672457 L 554.4168945004579 522.4199085670892 L 551.5340149205985 516.3433054859373 L 544.0340149221951 504.8433054867721 L 541.2187358400254 501.28126345139265 L 531.7187358398968 491.2812634508327 L 529.2111261889689 488.97827976303057 L 516.7111261889412 478.9782797651593 L 513.8572188536075 477.0036314043325 L 497.8572188532493 467.5036314042039 L 494.57042313754914 465.86576851759463 L 480.7520246208104 460.2052197268278 L 496.72056172091834 447.5029743079984 L 509.38341806044485 441.7842649917256 L 513.6306945687385 439.33905707362595 L 517.319324448235 436.1122305975527 L 520.3075557245572 432.22779069798264 L 522.4805523408792 427.83501421715255 L 523.7548072608859 423.10271309818097 L 524.0813515790018 418.2127470132644 L 523.4476363839943 413.3530346197381 L 521.8780149927574 408.71033194019105 L 519.4328070719689 404.46305543189743 L 516.2059805985843 400.7744255524009 L 512.3215406963257 397.7861942760786 L 507.92876421818426 395.61319765706793 L 503.196463096524 394.33894273975005 L 498.3064970142961 394.01239841894545 L 493.4467846207698 394.6461136166415 L 488.804081938534 396.21573500787855 L 473.3040819386071 403.2157350085394 L 468.0306608536464 406.4349736467877 L 446.03066085348996 423.9349736457511 L 442.8747928708547 426.92892146029976 L 440.2856817850798 430.42459450445494 L 432.0820166877922 443.79353021725865 L 424.569708558957 442.1070936973882 L 419.91747832197296 441.51357425329155 L 374.4174783203662 440.0135742519976 L 372.20699950963 440.0384911689036 L 345.2069995105379 441.5384911701975 L 340.703749358401 442.2037473568163 L 324.2037493603002 446.203747357578 L 318.04578125682036 448.5946022821045 L 308.04578125626034 454.09460228416015 L 304.0037485023796 456.8659504586157 L 300.5800454826901 460.37260943062785 L 297.906243186469 464.47982025558787 L 296.08509433105706 469.0297451281702 L 295.18658465029534 473.84753298711473 M 484.52725148788664 517.7383197344583 L 486.8346326221965 519.1083272841311 L 496.64397736385325 526.9558030779942 L 503.39872782037907 534.0660667147442 L 507.799597874972 540.8140674658371 L 512.7970629805725 556.5203863691529 L 513.2608608326277 565.3325455555133 L 511.81502189557096 564.267190549261 L 508.9214811026182 561.1510696982075 L 484.720109429193 518.2278822022989 L 484.52725148788664 517.7383197344583');
            //         path.fill = '';
            //         path.stroke = 'blue';
            //         path.strokeWith = 1;
            //         path.set({left: 500, top: 300, scaleX: 2, scaleY: 2});
            //         canvas.add(path);


            //         var polyPoints = new Array();
            //
            //         /* example usage: */
            //         var b = bezier([[100, 250], [150, -150], [300, 0]]);
            //         var frequency = 10;
            //         for (var t = 0; t <= frequency; t++) {
            //            var aPoint = b(t / frequency);
            //            if (LOG) console.log(aPoint);
            //            polyPoints.push({x: aPoint[0], y: aPoint[1]});
            //
            //            drawRectAt(new fabric.Point(aPoint[0], aPoint[1]), generateRandomColor());
            //         }
            //
            //         var polygon = new fabric.Polygon(polyPoints, {
            //            left: 600,
            //            top: 50,
            ////                scaleX: 100,
            ////                scaleY: 100,
            //            strokeWith: 1,
            //            stroke: '',
            //            fill: 'black',
            //         });
            //         canvas.add(polygon);








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

                /*$(".tooltipstered").tooltipster("hide", function () {
                 document.body.removeChild(this[0]);
                 //                        if (LOG) console.log("this");
                 //                        if (LOG) console.log(this);
                 });
                 //                if (LOG) console.log(ev);*/
                hideOpenTooltips();



                ev.preventDefault();
                var e = ev.originalEvent;
                displaywheel(e);
            });
            //            var colorIconPath = 'M 26.53125 0.5 C 24.73365 0.5 22.97605 0.68455 21.28125 1.03125 C 19.58635 1.37785 17.96345 1.9041 16.40625 2.5625 C 14.84895 3.221 13.3849 4.0021 12 4.9375 C 10.6152 5.873 9.3026 6.9475 8.125 8.125 C 6.9475 9.3026 5.90415 10.58395 4.96875 11.96875 C 4.03325 13.35355 3.221 14.84895 2.5625 16.40625 C 1.9041 17.96345 1.37785 19.58635 1.03125 21.28125 C 0.68455 22.97605 0.5 24.73365 0.5 26.53125 C 0.5 28.32885 0.68455 30.08635 1.03125 31.78125 C 1.37785 33.47605 1.9041 35.09895 2.5625 36.65625 C 3.221 38.21355 4.03325 39.70895 4.96875 41.09375 C 5.90415 42.47855 6.9475 43.76 8.125 44.9375 C 9.3026 46.1151 10.6152 47.1896 12 48.125 C 13.3849 49.0605 14.84895 49.87275 16.40625 50.53125 C 17.96345 51.18975 19.58635 51.68455 21.28125 52.03125 C 22.97605 52.37795 24.73365 52.5625 26.53125 52.5625 C 28.32875 52.5625 30.08635 52.37795 31.78125 52.03125 C 33.47605 51.68455 35.1303 51.18975 36.6875 50.53125 C 38.2448 49.87275 39.70885 49.0605 41.09375 48.125 C 42.47855 47.1896 43.76 46.1151 44.9375 44.9375 C 46.1151 43.76 47.1896 42.47855 48.125 41.09375 C 49.0605 39.70895 49.87275 38.21355 50.53125 36.65625 C 51.18965 35.09895 51.68455 33.47605 52.03125 31.78125 C 52.37785 30.08635 52.5625 28.32885 52.5625 26.53125 C 52.5625 24.73365 52.37785 22.97605 52.03125 21.28125 C 51.68455 19.58635 51.18965 17.96345 50.53125 16.40625 C 49.87275 14.84895 49.0605 13.35355 48.125 11.96875 C 47.1896 10.58395 46.1151 9.3026 44.9375 8.125 C 43.76 6.9475 42.47855 5.873 41.09375 4.9375 C 39.70885 4.0021 38.2448 3.221 36.6875 2.5625 C 35.1303 1.9041 33.47605 1.37785 31.78125 1.03125 C 30.08635 0.68455 28.32875 0.5 26.53125 0.5 z M 26.53125 2.53125 C 28.18875 2.53125 29.8121 2.71155 31.375 3.03125 C 32.9379 3.35085 34.47035 3.8303 35.90625 4.4375 C 37.34235 5.0447 38.69175 5.7625 39.96875 6.625 C 41.24575 7.4877 42.4142 8.4766 43.5 9.5625 C 44.586 10.6484 45.5749 11.848 46.4375 13.125 C 47.3001 14.4019 48.04905 15.78265 48.65625 17.21875 C 49.26335 18.65465 49.7428 20.1245 50.0625 21.6875 C 50.3821 23.2503 50.53125 24.87365 50.53125 26.53125 C 50.53125 28.18885 50.3821 29.8121 50.0625 31.375 C 49.7428 32.9379 49.26335 34.439 48.65625 35.875 C 48.04905 37.3111 47.3001 38.69175 46.4375 39.96875 C 45.5749 41.24575 44.586 42.4142 43.5 43.5 C 42.4142 44.586 41.24575 45.60615 39.96875 46.46875 C 38.69175 47.33135 37.34235 48.0803 35.90625 48.6875 C 34.47035 49.2947 32.9379 49.7428 31.375 50.0625 C 29.8121 50.3822 28.18875 50.53125 26.53125 50.53125 C 24.87365 50.53125 23.2503 50.3822 21.6875 50.0625 C 20.1245 49.7428 18.6234 49.2947 17.1875 48.6875 C 15.7514 48.0803 14.4021 47.33135 13.125 46.46875 C 11.8481 45.60615 10.6484 44.586 9.5625 43.5 C 8.4766 42.4142 7.51885 41.24575 6.65625 39.96875 C 5.79355 38.69175 5.0447 37.3111 4.4375 35.875 C 3.8303 34.439 3.35085 32.9379 3.03125 31.375 C 2.71155 29.8121 2.53125 28.18885 2.53125 26.53125 C 2.53125 24.87365 2.71155 23.2503 3.03125 21.6875 C 3.35085 20.1245 3.8303 18.65465 4.4375 17.21875 C 5.0447 15.78265 5.79355 14.4019 6.65625 13.125 C 7.51885 11.848 8.4766 10.6484 9.5625 9.5625 C 10.6484 8.4766 11.8481 7.4877 13.125 6.625 C 14.4021 5.7625 15.7514 5.0447 17.1875 4.4375 C 18.6234 3.8303 20.1245 3.35085 21.6875 3.03125 C 23.2503 2.71155 24.87365 2.53125 26.53125 2.53125 z M 26.53125 8.15625 C 20.80995 18.97225 13.6153 22.80815 13.4375 32.21875 C 13.3037 39.23435 19.29865 44.90625 26.53125 44.90625 C 33.76385 44.90625 39.625 39.23565 39.625 32.21875 C 39.625 25.20185 32.60815 18.61765 26.53125 8.15625 z';
            //            var colorIconPath = 'M -1729.6876,2910.8438 C -1731.5092,2910.8438 -1733.2933,2911.0419 -1735.0107,2911.3933 -1736.7284,2911.7444 -1738.3781,2912.2715 -1739.956,2912.9387 -1741.5343,2913.606 -1743.0171,2914.3949 -1744.4206,2915.3427 -1745.8238,2916.2907 -1747.1422,2917.3775 -1748.3356,2918.5709 -1749.529,2919.7643 -1750.5814,2921.0826 -1751.5294,2922.4859 -1752.4775,2923.8892 -1753.3005,2925.4065 -1753.9678,2926.9848 -1754.6349,2928.5627 -1755.1619,2930.1781 -1755.5131,2931.8958 -1755.8645,2933.6131 -1756.0626,2935.3972 -1756.0626,2937.2188 -1756.0626,2939.0404 -1755.8645,2940.8244 -1755.5131,2942.5419 -1755.1619,2944.2595 -1754.6349,2945.9091 -1753.9678,2947.4872 -1753.3005,2949.0655 -1752.4775,2950.5827 -1751.5294,2951.9861 -1750.5814,2953.3894 -1749.529,2954.6734 -1748.3356,2955.8668 -1747.1422,2957.0602 -1745.8238,2958.1813 -1744.4206,2959.1293 -1743.0171,2960.0772 -1741.5343,2960.9004 -1739.956,2961.5677 -1738.3781,2962.2349 -1736.7284,2962.7274 -1735.0107,2963.0787 -1733.2933,2963.4301 -1731.5092,2963.5938 -1729.6876,2963.5938 -1727.8661,2963.5938 -1726.0821,2963.4301 -1724.3646,2963.0787 -1722.647,2962.7274 -1720.9629,2962.2349 -1719.3849,2961.5677 -1717.8067,2960.9004 -1716.3237,2960.0772 -1714.9203,2959.1293 -1713.517,2958.1813 -1712.233,2957.0602 -1711.0397,2955.8668 -1709.8462,2954.6734 -1708.7595,2953.3894 -1707.8115,2951.9861 -1706.8636,2950.5827 -1706.0404,2949.0655 -1705.3731,2947.4872 -1704.706,2945.9091 -1704.1791,2944.2595 -1703.8278,2942.5419 -1703.4766,2940.8244 -1703.3126,2939.0404 -1703.3126,2937.2188 -1703.3126,2935.3972 -1703.4766,2933.6131 -1703.8278,2931.8958 -1704.1791,2930.1781 -1704.706,2928.5627 -1705.3731,2926.9848 -1706.0404,2925.4065 -1706.8636,2923.8892 -1707.8115,2922.4859 -1708.7595,2921.0826 -1709.8462,2919.7643 -1711.0397,2918.5709 -1712.233,2917.3775 -1713.517,2916.2907 -1714.9203,2915.3427 -1716.3237,2914.3949 -1717.8067,2913.606 -1719.3849,2912.9387 -1720.9629,2912.2715 -1722.647,2911.7444 -1724.3646,2911.3933 -1726.0821,2911.0419 -1727.8661,2910.8438 -1729.6876,2910.8438 z M -1729.6876,2917.0254 C -1728.0181,2919.8997 -1726.267,2922.5087 -1724.6049,2924.9242 -1722.9429,2927.3396 -1721.3843,2929.5504 -1720.003,2931.6553 -1718.6217,2933.7602 -1717.4305,2935.7572 -1716.6032,2937.6996 -1716.1896,2938.6706 -1715.8656,2939.6261 -1715.6416,2940.5844 -1715.4177,2941.5425 -1715.2982,2942.5051 -1715.2982,2943.4691 -1715.2982,2944.433 -1715.4155,2945.3768 -1715.6072,2946.2852 -1715.7989,2947.1935 -1716.0673,2948.0609 -1716.4314,2948.8952 -1717.1595,2950.5639 -1718.2203,2952.0644 -1719.5222,2953.3255 -1720.8241,2954.5863 -1722.3683,2955.6084 -1724.0898,2956.3132 -1724.9506,2956.6655 -1725.866,2956.9519 -1726.8028,2957.1374 -1727.7396,2957.3229 -1728.694,2957.4122 -1729.6876,2957.4122 -1730.6812,2957.4122 -1731.6663,2957.3229 -1732.6068,2957.1374 -1733.5474,2956.9519 -1734.4532,2956.6656 -1735.3198,2956.3132 -1737.0528,2955.6083 -1738.6105,2954.5864 -1739.9216,2953.3255 -1741.2327,2952.0644 -1742.2913,2950.5638 -1743.0125,2948.8952 -1743.373,2948.0609 -1743.6551,2947.1935 -1743.8367,2946.2852 -1744.0182,2945.3768 -1744.0956,2944.4329 -1744.0771,2943.4691 -1744.0527,2942.1764 -1743.9123,2940.9913 -1743.665,2939.8632 -1743.4179,2938.7349 -1743.0683,2937.6524 -1742.6348,2936.635 -1741.7679,2934.5997 -1740.5596,2932.7474 -1739.1661,2930.8311 -1737.7726,2928.915 -1736.1926,2926.9463 -1734.5642,2924.7181 -1732.9358,2922.4899 -1731.2594,2919.997 -1729.6876,2917.0254 z';
            //
            //            var colorIcon = new fabric.Path(colorIconPath, {
            //                fill: 'white',
            //                strokeWidth: 0,
            //                originX: 'center',
            //                originY: 'center',
            //                stroke: 'red',
            //                hasControls: false,
            //                hasBorders: false
            //            });
            //            colorIcon.set({left: 300, top: 300});
            //            colorIcon.setCoords();
            //            canvas.add(colorIcon);




            //            var options = {
            //                left: 100,
            //                top: 125,
            //                fill: rgb(122,176,114),
            //                stroke: darkenrgb(122,176,114),
            //                rx: 100,
            //                ry: 100
            //            };
            //            canvas.add(new fabric.Ellipse(options));








            //            var aFunction = new MyFunction('M 0 0 L 200 100 L 170 200', {
            //                left: 200,
            //                top: 200,
            //            });
            //            canvas.add(aFunction);

            //            var textInput = new TextInput('85', {
            //                left: 500,
            //                top: 300,
            //                fill: 'blue'
            //            });
            //            canvas.add(textInput);





            //            var fatFontCreator = new FatFontCreator();
            //            fatFontCreator.setup({
            ////                canvasSelector: '#theCanvas'
            //                canvasID: '#theCanvas'
            //            });
            //
            //            fatFontCreator.utilities.drawing.drawNumber({
            //                number: 123,
            //                size: 40,
            //                x: 240,
            //                y: 70
            //            });



            //            var svgString = "<svg id=\"miguta_1\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xml:space=\"preserve\" height=\"2839.6px\" width=\"2839.6px\" version=\"1.1\" y=\"0px\" x=\"0px\" xmlns:xlink=\"http:\/\/www.w3.org\/1999\/xlink\" viewBox=\"0 0 2839.642 2839.642\" enable-background=\"new 0 0 2839.642 2839.642\">\r\n\t\t<g id=\"template\" stroke=\"#231F20\" fill=\"none\" display=\"none\">\r\n\t\t\t<path d=\"m0.798 1420c-0.105-5.71-0.158-11.43-0.158-17.161\" display=\"inline\"\/>\r\n\t\t\t<circle cx=\"1423.2\" cy=\"1417\" r=\"496.06\" display=\"inline\"\/>\r\n\t\t\t<circle cx=\"1418.1\" cy=\"1420\" r=\"1417.3\" display=\"inline\"\/>\r\n\t\t<\/g>\r\n\t\t<g id=\"final_x5F_nine\" display=\"none\">\r\n\t\t\t<path d=\"m1577 1498.8c0.041-0.608 0.076-1.219 0.106-1.83\" stroke=\"#231F20\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<g display=\"inline\">\r\n\t\t\t\t<path d=\"m2760.9 965.49c-161-507.47-678.3-873.12-1339.1-873.12-755.22 0-1336.3 495.52-1369 1088-32.632 591.62 613.92 1011.7 1369.1 1011.7 242.16 0 531.68-100.99 746.62-195.76-138.73 315.58-402.44 510.79-746.62 510.79-275.71 0-542.48-48.457-810.33-320.07l-232.41 194.5c292.32 292.32 609.01 454.44 1038.9 454.44 782.76 0 1417.3-634.56 1417.3-1417.3 0-158-29.3-310.4-74.5-453.11zm-1338.7 947.61c-273.97 0-496.06-222.1-496.06-496.06 0-273.97 222.1-496.06 496.06-496.06 273.97 0 496.06 222.1 496.06 496.06 0 274-222.1 496.1-496.1 496.1z\"\/>\r\n\t\t\t<\/g>\r\n\t\t\t<circle cx=\"1423.1\" cy=\"1415.9\" stroke=\"#231F20\" r=\"496.06\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle id=\"temp_x5F_big\" opacity=\"0\" cy=\"1418.8\" display=\"inline\" stroke=\"#231F20\" cx=\"1418\" r=\"1417.3\" fill=\"none\"\/>\r\n\t\t\t<circle id=\"temp_x5F_small\" opacity=\"0\" cy=\"1413.9\" display=\"inline\" stroke=\"#231F20\" cx=\"1422.9\" r=\"496.06\" fill=\"none\"\/>\r\n\t\t<\/g>\r\n\t\t<g id=\"final_x5F_nine_x5F_it1\" display=\"none\">\r\n\t\t\t<g display=\"inline\">\r\n\t\t\t\t<path d=\"m1804.8 170.3c-748.9-227.66-1538.5 190.96-1725.4 806.01l-0.276-0.098c-46.328 140.07-71.401 289.81-71.401 445.4l0.156 0.156c10.842 591.1 580.87 1067.5 1282.5 1067.5 543.8 0 987.13-428.26 1020.5-784.93-33.335 663.34-577.87 963.03-1015.8 970.79-5.793 0.103-11.609 0.156-17.444 0.156-67.778 0-132.74-7.041-192.89-19.932v142.56l0.015-0.068c11.143 2.749 22.334 5.361 33.574 7.842 98.799 21.807 201.46 33.301 306.82 33.301 352.47 0 674.89-128.66 922.85-341.58 210.37-180.64 367.15-421.92 443.23-696.74l0.386 0.107c186.8-615.2-237.9-1402.9-986.8-1630.6zm-381.7 1744.1c-273.96 0-496.06-222.1-496.06-496.06s222.1-496.06 496.06-496.06c273.97 0 496.06 222.1 496.06 496.06 0 274-222.1 496.1-496.1 496.1z\"\/>\r\n\t\t\t\t<path stroke=\"#231F20\" d=\"m1804.8 170.3c-748.9-227.66-1538.5 190.96-1725.4 806.01l-0.276-0.098c-46.328 140.07-71.401 289.81-71.401 445.4l0.156 0.156c10.842 591.1 580.87 1067.5 1282.5 1067.5 543.8 0 987.13-428.26 1020.5-784.93-33.335 663.34-577.87 963.03-1015.8 970.79-5.793 0.103-11.609 0.156-17.444 0.156-67.778 0-132.74-7.041-192.89-19.932v142.56l0.015-0.068c11.143 2.749 22.334 5.361 33.574 7.842 98.799 21.807 201.46 33.301 306.82 33.301 352.47 0 674.89-128.66 922.85-341.58 210.37-180.64 367.15-421.92 443.23-696.74l0.386 0.107c186.8-615.2-237.9-1402.9-986.8-1630.6zm-381.7 1744.1c-273.96 0-496.06-222.1-496.06-496.06s222.1-496.06 496.06-496.06c273.97 0 496.06 222.1 496.06 496.06 0 274-222.1 496.1-496.1 496.1z\" fill=\"none\"\/>\r\n\t\t\t<\/g>\r\n\t\t\t<path d=\"m0.798 1420c-0.105-5.711-0.158-11.431-0.158-17.162\" stroke=\"#231F20\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle cx=\"1423.2\" cy=\"1416.9\" stroke=\"#231F20\" r=\"496.06\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle id=\"temp_x5F_big_1_\" opacity=\"0\" cy=\"1419.8\" display=\"inline\" stroke=\"#231F20\" cx=\"1418.1\" r=\"1417.3\" fill=\"none\"\/>\r\n\t\t\t<circle id=\"temp_x5F_small_1_\" opacity=\"0\" cy=\"1414.9\" display=\"inline\" stroke=\"#231F20\" cx=\"1423.1\" r=\"496.06\" fill=\"none\"\/>\r\n\t\t<\/g>\r\n\t\t<g id=\"final_x5F_nine_x5F_old\" display=\"none\">\r\n\t\t\t<path d=\"m1415.4 1632\" stroke=\"#231F20\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<path d=\"m1591.2 1520.8\" stroke=\"#231F20\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<g display=\"inline\">\r\n\t\t\t\t<path d=\"m1802 127.38c-748.9-227.65-1538.4 190.96-1725.4 806.02l-0.276-0.098c-46.328 140.07-71.401 289.81-71.401 445.4l0.156 0.156c10.842 591.1 580.87 1067.5 1282.5 1067.5 194.49 0 378.87-36.609 544.03-102.12-34 162.38-270.34 288.14-556.85 288.14-67.776 0-132.74-7.041-192.89-19.932v142.56l0.015-0.068c11.14 2.749 22.334 5.361 33.577 7.842 98.799 21.807 201.46 33.301 306.82 33.301 352.47 0 674.89-128.66 922.85-341.58 210.37-180.64 367.15-421.92 443.23-696.74l0.386 0.107c186.9-615.1-237.9-1402.9-986.8-1630.5zm-380.8 1786.7c-273.97 0-496.06-222.1-496.06-496.06s222.1-496.06 496.06-496.06c273.97 0 496.06 222.1 496.06 496.06s-222.1 496.1-496.1 496.1z\"\/>\r\n\t\t\t\t<path stroke=\"#231F20\" d=\"m1802 127.38c-748.9-227.65-1538.4 190.96-1725.4 806.02l-0.276-0.098c-46.328 140.07-71.401 289.81-71.401 445.4l0.156 0.156c10.842 591.1 580.87 1067.5 1282.5 1067.5 194.49 0 378.87-36.609 544.03-102.12-34 162.38-270.34 288.14-556.85 288.14-67.776 0-132.74-7.041-192.89-19.932v142.56l0.015-0.068c11.14 2.749 22.334 5.361 33.577 7.842 98.799 21.807 201.46 33.301 306.82 33.301 352.47 0 674.89-128.66 922.85-341.58 210.37-180.64 367.15-421.92 443.23-696.74l0.386 0.107c186.9-615.1-237.9-1402.9-986.8-1630.5zm-380.8 1786.7c-273.97 0-496.06-222.1-496.06-496.06s222.1-496.06 496.06-496.06c273.97 0 496.06 222.1 496.06 496.06s-222.1 496.1-496.1 496.1z\" fill=\"none\"\/>\r\n\t\t\t<\/g>\r\n\t\t\t<circle cx=\"1423.2\" cy=\"1416.9\" stroke=\"#231F20\" r=\"496.06\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle id=\"temp_x5F_big_2_\" opacity=\"0\" cy=\"1419.8\" display=\"inline\" stroke=\"#231F20\" cx=\"1418.1\" r=\"1417.3\" fill=\"none\"\/>\r\n\t\t\t<circle id=\"temp_x5F_small_2_\" opacity=\"0\" cy=\"1414.9\" display=\"inline\" stroke=\"#231F20\" cx=\"1423.1\" r=\"496.06\" fill=\"none\"\/>\r\n\t\t<\/g>\r\n\t\t<g id=\"final_x5F_eight\" display=\"none\">\r\n\t\t\t<g display=\"inline\">\r\n\t\t\t\t<path d=\"m2626.7 1582.5c-18.669-92.121-50.986-180.17-95.077-262.52-41.729-77.938-94.004-150.77-155.24-217.12-68.747-74.497-148.79-140.83-237.87-197.04-23.55-14.86-47.735-29.007-72.506-42.417 36.939-26.542 68.925-55.397 95.146-86.126 52.5-61.525 81.93-130.54 81.93-203.45 0-26.903-4.007-53.275-11.7-78.937-16.291-54.335-49.113-105.48-95.434-151.73-58.415-58.319-138.3-108.84-233.56-148.12-72.159-29.749-153.14-53.048-240.31-68.4-77.678-13.681-160.27-21.05-245.89-21.05-80.998 0-159.28 6.594-233.25 18.886-91.001 15.122-175.49 38.866-250.52 69.564-69.188 28.308-130.33 62.529-181.12 101.36-60.093 45.937-105.69 98.32-132.97 154.98-18.933 39.328-29.04 80.717-29.04 123.44 0 108.19 64.799 207.81 173.62 287.09 0.472 0.344 0.944 0.687 1.417 1.03l0.661 1.234c-18.692 10.11-37.049 20.644-55.052 31.584-73.938 44.935-141.91 96.742-202.68 154.35-60.438 57.296-113.75 120.33-158.73 188.05-45.96 69.203-83.212 143.3-110.46 221.17-34.311 98.047-52.76 202.07-52.76 309.83 0 97.506 15.105 191.95 43.398 281.68 30.24 95.903 75.545 186.42 133.57 269.51 68.207 97.665 153.99 185.08 253.56 258.95 148.44 110.14 327.52 190.16 524.62 229.15 88.374 17.482 180.37 26.716 274.86 26.716 177.79 0 346.76-32.69 499.36-91.514 155.58-59.972 294.14-147.11 407.66-254.46 103.02-97.427 185.43-211.5 241.21-337.04 52.819-118.86 81.773-248 81.773-383 0-63.5-6.3-125.5-18.6-185.8zm-1411.6-999.72c11.692-21.591 30.48-40.807 54.416-56.308 38.666-25.04 90.764-40.385 148.08-40.385 34.964 0 67.987 5.711 97.204 15.851 38.052 13.206 69.647 33.922 90.664 59.316 17.905 21.634 28.132 46.662 28.132 73.333 0 16.484-3.907 32.341-11.119 47.157-14.153 29.077-41.035 54.144-76.098 72.073-35.959 18.388-80.522 29.27-128.78 29.27-22.914 0-44.994-2.453-65.715-6.998-23.954-5.253-46.092-13.302-65.603-23.588-24.938-13.146-45.584-29.948-60.247-49.239-15.609-20.538-24.435-43.897-24.435-68.675-0.1-18.22 4.7-35.67 13.4-51.8zm654.4 1050.2c-25.134 51.888-59.042 98.733-99.796 138.61-37.219 36.418-80.147 67.023-127.32 90.349-66.196 32.732-140.75 51.127-219.59 51.127-71.939 0-140.3-15.313-202-42.858-57.246-25.555-108.76-61.638-152.08-105.79-52.194-53.19-92.497-118.09-116.61-190.39-16.455-49.348-25.366-102.15-25.366-157.02 0-72.325 15.478-141.03 43.301-203 26.857-59.809 65.217-113.33 112.26-157.75 40.219-37.975 86.787-69.298 137.94-92.209 61.847-27.699 130.4-43.103 202.55-43.103 76.43 0 148.82 17.285 213.48 48.158 52.802 25.211 100.45 59.484 140.92 100.81 50.801 51.864 90.309 114.83 114.54 184.93 17.571 50.817 27.115 105.38 27.115 162.17 0 77.4-17.7 150.7-49.3 216z\"\/>\r\n\t\t\t<\/g>\r\n\t\t\t<circle cx=\"1423.2\" cy=\"1416.9\" stroke=\"#231F20\" r=\"496.06\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle id=\"temp_x5F_big_3_\" opacity=\"0\" cy=\"1419.8\" display=\"inline\" stroke=\"#231F20\" cx=\"1418.1\" r=\"1417.3\" fill=\"none\"\/>\r\n\t\t\t<circle id=\"temp_x5F_small_3_\" opacity=\"0\" cy=\"1414.9\" display=\"inline\" stroke=\"#231F20\" cx=\"1423.1\" r=\"496.06\" fill=\"none\"\/>\r\n\t\t<\/g>\r\n\t\t<g id=\"final_x5F_seven\" stroke=\"#231F20\" display=\"none\">\r\n\t\t\t<path display=\"inline\" d=\"m200.11 905.21c23.792 272.86 258.21 487.07 543.88 487.07 63.604 0 124.67-10.619 181.43-30.141l-0.43-1.286c-3.663-21.301-0.238 15.038-0.238-7.309 0-205.06 256.56-428.02 494.72-430.28 308.63-2.928 429.96 4.966 603.64 4.966-16.883 187.49 90.416 608.1-292.53 885.26-255.8 185.14-420.52 100.45-620.62 277.9-318.03 282.03-245.61 640.05-245.61 640.05h1088l868.14-1511.1c-31.579-392.1-367.3-874.53-753.02-1054.8h-1314.2l-0.162-0.317c-160.38 84.838-302.51 199.55-419 336.72l-0.907 0.36c-75.948 91.545-135.14 230.17-135.14 357.15 0.03 15.23 0.71 30.5 2.02 45.6z\"\/>\r\n\t\t\t<path d=\"m2095.3 1695.7\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1416.9\" cx=\"1424.1\" r=\"496.06\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1419.8\" cx=\"1419\" r=\"1417.3\" display=\"inline\" fill=\"none\"\/>\r\n\t\t<\/g>\r\n\t\t<g id=\"final_x5F_six\" display=\"none\">\r\n\t\t\t<g display=\"inline\">\r\n\t\t\t\t<path d=\"m2247.2 857.96c-173.72-117.82-383.35-192.77-609.93-187.17-364.58 9.024-687.16 181.6-882.71 459.7l-1.68 10.159c-2.058-23.633-3.109-47.554-3.109-71.722 0-450.57 365.26-815.84 815.84-815.84 151.32 0 293.02 41.199 414.5 112.99l0.418 2.597v-254.75l5.077-0.16c-185.1-85.194-410.3-111.34-640.3-111.34-351.51 0-663.79 168.71-861.01 429.92l1.534-2.308c-181.18 266.13-290.48 610.89-290.48 987.59 0 316.95 77.38 611.34 209.85 855.27 203.13 374.05 654.9 562.07 1106.1 562.07 273.15 0 559.11-141 751.06-281.36 200.92-146.93 340.94-468.85 340.94-842.56 0-382.8-147.2-711.48-356.1-853.14zm-707 1462.3c-398.95 0-722.37-323.42-722.37-722.37s323.42-722.37 722.37-722.37 722.37 323.42 722.37 722.37c0 399-323.4 722.4-722.4 722.4z\"\/>\r\n\t\t\t\t<path stroke=\"#000\" d=\"m2247.2 857.96c-173.72-117.82-383.35-192.77-609.93-187.17-364.58 9.024-687.16 181.6-882.71 459.7l-1.68 10.159c-2.058-23.633-3.109-47.554-3.109-71.722 0-450.57 365.26-815.84 815.84-815.84 151.32 0 293.02 41.199 414.5 112.99l0.418 2.597v-254.75l5.077-0.16c-185.1-85.194-410.3-111.34-640.3-111.34-351.51 0-663.79 168.71-861.01 429.92l1.534-2.308c-181.18 266.13-290.48 610.89-290.48 987.59 0 316.95 77.38 611.34 209.85 855.27 203.13 374.05 654.9 562.07 1106.1 562.07 273.15 0 559.11-141 751.06-281.36 200.92-146.93 340.94-468.85 340.94-842.56 0-382.8-147.2-711.48-356.1-853.14zm-707 1462.3c-398.95 0-722.37-323.42-722.37-722.37s323.42-722.37 722.37-722.37 722.37 323.42 722.37 722.37c0 399-323.4 722.4-722.4 722.4z\" fill=\"none\"\/>\r\n\t\t\t<\/g>\r\n\t\t\t<circle opacity=\"0\" cy=\"1416.9\" stroke=\"#231F20\" cx=\"1423.2\" r=\"496.06\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1419.8\" stroke=\"#231F20\" cx=\"1418.1\" r=\"1417.3\" display=\"inline\" fill=\"none\"\/>\r\n\t\t<\/g>\r\n\t\t<g id=\"final_x5F_five\" stroke=\"#231F20\" display=\"none\">\r\n\t\t\t<path display=\"inline\" d=\"m362.3 1299.1l503.48 33.911c16.731-42.019 37.293-82.097 61.254-119.8 128.14-201.65 353.51-335.46 610.13-335.46 398.95 0 722.37 323.41 722.37 722.37s-323.42 722.37-722.37 722.37c-259.6 0-523.8-162.04-636.58-381.94 0 0-541.07 257.3-539.23 261.15 206.5 431.85 695.68 635.5 1146.9 635.5 273.15 0 559.11-141 751.06-281.36 200.92-146.93 340.94-468.85 340.94-842.56 0-382.85-147.2-711.5-356.07-853.17-173.72-117.82-383.35-192.77-609.93-187.17-241.16 5.969-463.95 83.501-643.74 215.8l109.53-394.66h1096.6v-253.6h-1572l-262.4 1058.6z\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1415.9\" cx=\"1423.1\" r=\"496.06\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1418.8\" cx=\"1418\" r=\"1417.3\" display=\"inline\" fill=\"none\"\/>\r\n\t\t<\/g>\r\n\t\t<g id=\"final_x5F_four\" stroke=\"#231F20\" display=\"none\">\r\n\t\t\t<path display=\"inline\" d=\"m83.702 1911.3l1332.9-1801h495.86s51.542 254.8-123.28 503.83c-32.407 46.161-72.593 92.123-122.33 136.23-200.1 177.45-304.93 92.758-560.74 277.9-382.95 277.16-275.65 697.77-292.53 885.26 173.68 0 295.01 7.895 603.64 4.965 238.16-2.26 494.71-225.22 494.71-430.28 0-22.348 3.424 13.992-0.238-7.311l-0.43-1.285c22.947-7.891 45.396-11.502 69.633-16.371l-1.199 445.84 653.75-0.002c1.279 9.084 2.328 18.24 3.133 27.463 1.316 15.098 1.988 30.375 1.988 45.805 0 67.471-18.127 138.23-46.512 203.46h1.135-613.49v535.16h0.961c-173.49 74.898-364.63 116.97-564.06 117.57v-652.73h0.583-1197.4c-53.88-86.5-100.46-176.9-136.2-274.7z\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1418.9\" cx=\"1423.1\" r=\"496.06\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1421.8\" cx=\"1418\" r=\"1417.3\" display=\"inline\" fill=\"none\"\/>\r\n\t\t<\/g>\r\n\t\t<g id=\"final_x5F_three\" stroke=\"#231F20\" display=\"none\">\r\n\t\t\t<path display=\"inline\" d=\"m1420.6 920.25c210.62 0.479 404.91 66.788 561.15 178.35l-12.577-8.269c67.854 42.817 128.82 93.339 181.18 150.08 46.641 50.541 86.459 106.02 118.24 165.38 40.192 75.066 59.067 134.08 72.419 199.96 9.308 45.926 14.161 93.182 14.161 141.42 0 102.82-22.055 201.19-62.286 291.72-42.49 95.615-105.25 182.51-183.73 256.72-86.465 81.766-192 148.14-310.51 193.82-116.23 44.805-244.94 69.705-380.36 69.705-71.97 0-142.04-7.033-209.36-20.35-150.13-29.699-286.52-90.65-399.59-174.54-75.836-56.266-141.18-122.85-193.13-197.24l1.52 0.225-16.161 15.16-209.76 196.75c57.875 68.143 124.35 130.5 198.4 185.44 153.76 114.07 339.23 196.96 543.38 237.34 91.535 18.107 186.82 27.672 284.69 27.672 184.15 0 359.17-33.859 517.22-94.787 161.15-62.117 304.66-152.37 422.24-263.56 106.71-100.91 192.06-219.07 249.84-349.09 54.709-123.12 84.699-256.87 84.699-396.7 0-65.596-6.6-129.86-19.256-192.31-18.155-89.576-43.824-169.83-98.479-271.91-43.221-80.726-97.366-156.16-160.79-224.89-71.206-77.162-154.11-145.86-246.38-204.09-25.053-15.808-50.794-30.844-77.18-45.067l0.8 2.06c38.806-27.745 72.366-57.95 99.83-90.134 54.378-63.726 84.86-135.21 84.86-210.73 0-27.865-4.15-55.181-12.119-81.761-16.873-56.278-50.87-109.26-98.848-157.16-60.504-60.405-143.24-112.73-241.92-153.41-74.74-30.813-158.62-54.946-248.91-70.847-80.457-14.17-166-21.803-254.69-21.803-83.896 0-164.97 6.83-241.59 19.561-94.257 15.663-181.77 40.257-259.48 72.053-13.953 5.708-27.589 11.649-40.893 17.813l-3.155-5.037 16.449 26.267 21.238 33.915 78.391 125.18c30.576-21.836 65.557-41.372 104.12-58.112 52.323-22.713 111.24-40.28 174.7-51.469 51.588-9.095 106.18-13.973 162.66-13.973 59.713 0 117.31 5.452 171.48 15.574 60.789 11.358 117.27 28.597 167.59 50.607 66.436 29.06 122.14 66.438 162.88 109.58 32.303 34.215 55.191 72.059 66.552 112.26 5.365 18.985 8.159 38.498 8.159 58.402 0 43.279-13.052 84.503-37.181 122.7-76.599 121.25-296.89 191.3-539.47 191.3-3.668 0-7.328-0.015-10.979-0.05h-0.071v90.31z\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1416.9\" cx=\"1423.2\" r=\"496.06\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1419.8\" cx=\"1418.1\" r=\"1417.3\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1414.9\" cx=\"1423.1\" r=\"496.06\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1417.8\" cx=\"1418\" r=\"1417.3\" display=\"inline\" fill=\"none\"\/>\r\n\t\t<\/g>\r\n\t\t<g id=\"final_x5F_two\" stroke=\"#231F20\" display=\"none\">\r\n\t\t\t<path d=\"m5314 2396.5\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<path d=\"m2234 2384.3\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<path d=\"m2234 2384.3\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<path d=\"m772.63 2380\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<path d=\"m2385.5 2387.2\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<path display=\"inline\" d=\"m2290.8 2375c120.14-26.077 226.76-79.025 307.4-170.11v-0.003c-82.973 124.36-185.08 234.86-302.12 327.3v-0.005h-1724.2v0.008c-27.149-43.135-51.56-88.478-72.966-135.73-66.727-147.3-104.22-313.16-104.22-488.57 0-590.81 448.83-1074.5 983.81-1104.2 10.471-0.583-10.537 0.617 0 0 345.33-20.205 621.3-152.36 621.3-339.65 0-192.89-253.22-349.25-612.99-349.25-191.11 0-363 85.252-482.16 155.54l0.003 0.004-96.15-128.22-2.263 0.911c139.26-56.667 295.37-130.24 611.77-140.53 435.48-14.17 724.77 226.7 724.77 470.47 0 289.31-272.98 411.53-670.31 447.76-476.16 43.421-804.02 449.57-804.02 1000.3 0 160.37 34.368 299.68 92.941 433.92 2.942 6.743 9.009 20.098 9.009 20.098s1132 0 1520.4 0z\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1415\" cx=\"1423.1\" r=\"496.06\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1418\" cx=\"1418\" r=\"1417.3\" display=\"inline\" fill=\"none\"\/>\r\n\t\t<\/g>\r\n\t\t<g id=\"final_x5F_two_x5F_new\" stroke=\"#231F20\" display=\"none\">\r\n\t\t\t<path d=\"m5314 2396.5\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<path d=\"m2234 2384.3\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<path d=\"m2234 2384.3\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<path d=\"m772.63 2380\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<path d=\"m2385.5 2387.2\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<path display=\"inline\" d=\"m2465 2375s-51.875 64.749-168.92 157.18v-0.005h-1724.2v0.008c-27.149-43.135-51.56-88.478-72.966-135.73-66.727-147.3-104.22-313.16-104.22-488.57 0-590.81 448.83-1074.5 983.81-1104.2 10.471-0.583-10.537 0.617 0 0 345.33-20.205 621.3-152.36 621.3-339.65 0-192.89-253.22-349.25-612.99-349.25-191.11 0-363 85.252-482.16 155.54l0.003 0.004-96.15-128.22-2.263 0.911c139.26-56.667 295.37-130.24 611.77-140.53 435.48-14.17 724.77 226.7 724.77 470.47 0 289.31-271.43 439.26-670.31 447.76-599.31 12.766-804.02 449.57-804.02 1000.3 0 160.37 34.368 299.68 92.941 433.92 2.942 6.743 9.009 20.098 9.009 20.098h1694.6z\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1415\" cx=\"1423.1\" r=\"496.06\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<path opacity=\"0\" d=\"m2835.3 1418c0 852.79-719.25 1417.3-1417.3 1417.3-782.77 0-1417.3-634.56-1417.3-1417.3s634.5-1417.4 1417.3-1417.4c782.7 0.041 1417.3 634.6 1417.3 1417.4z\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1418.9\" cx=\"1423.1\" r=\"496.06\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1421.8\" cx=\"1418\" r=\"1417.3\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1416.9\" cx=\"1422.9\" r=\"496.06\" display=\"inline\" fill=\"none\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1419.8\" cx=\"1417.8\" r=\"1417.3\" display=\"inline\" fill=\"none\"\/>\r\n\t\t<\/g>\r\n\t\t<g id=\"final_x5F_one\">\r\n\t\t\t<path stroke=\"#000\" d=\"m1076.6 174.51l220.08 0.587c-301.75 327.52-502.06 764.94-502.06 1245.4 0 489.91 207.62 935.06 520 1264.6l-260.87-0.587v104h-5.292 738.96-3.287v-104l-272.27 0.001c-354.73-306.23-579.23-759.19-579.23-1264.6 0-581.74 296.95-1093.7 748.07-1392.7-84.677-15.778-169-26.475-258.25-26.475-40.749 51.726-113.27 83.729-200.35 83.729-56.885 0-109.06-20.043-149.76-44.76h2.262v134.77\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1415\" stroke=\"#231F20\" cx=\"1423.1\" r=\"496.06\" fill=\"none\"\/>\r\n\t\t\t<circle opacity=\"0\" cy=\"1418\" stroke=\"#231F20\" cx=\"1418\" r=\"1417.3\" fill=\"none\"\/>\r\n\t\t<\/g>\r\n\t<\/svg>";
            //            fabric.loadSVGFromString(svgString, function(objects, options) {
            //                var svgElement = new fabric.PathGroup(objects, options);
            //                svgElement.scaleX = 0.15;
            //                svgElement.scaleY = 0.15;
            //                svgElement.originX = 'center';
            //                svgElement.originY = 'center';
            //                svgElement.top = 300;
            //                svgElement.left = 300;
            //                canvas.add(svgElement);
            //            });








            //            var circularOutput = new CircularOutput({
            //                left: 100,
            //                top: 100,
            //                radius: 50,
            //                fill: 'red',
            //                stroke: 'black'
            //            });
            //            canvas.add(circularOutput);


            //            
            //            var rectangularOutput = new RectangularOutput({
            //                left: 300,
            //                top: 100,
            //                width: 50,
            //                height: 100,
            //                fill: 'yellow',
            //                stroke: 'black'
            //            });
            //            canvas.add(rectangularOutput);
            //            
            //            
            //            circularOutput.blink();
            //            rectangularOutput.associateEvents();
            //            
            //            if (LOG) console.log(circularOutput.pepe);
            //            if (LOG) console.log(rectangularOutput.pepe);

            //            
            //            
            //            
            //            
            //            
            //            var addition = new AdditionOperator({
            //                left: 300,
            //                top: 400,
            //            });
            //            canvas.add(addition);
            //
            //

            /*var additionOperator = new AdditionOperator({
             left: 300,
             top: 400,
             });
             canvas.add(additionOperator);*/

            //            
            //            var multiplication = new MultiplicationOperator({
            //                left: 300,
            //                top: 500,
            //            });
            //            canvas.add(multiplication);
            //            
            //            var division = new DivisionOperator({
            //                left: 600,
            //                top: 500,
            //            });
            //            canvas.add(division);
            //            
            //            
            //            var connector1 = new Connector({source: addition, destination: subtraction});
            //            canvas.add(connector1);
            //            canvas.sendToBack(connector1);
            //            connector1.positionTriangles();
            //            
            //            var connector2 = new Connector({source: subtraction, destination: multiplication});
            //            canvas.add(connector2);
            //            
            //            var connector3 = new Connector({source: division, destination: subtraction});
            //            canvas.add(connector3);
            //            
            //            drawRectAt(new fabric.Point(800, 300), "red")
            //            var connector4 = new Connector({source: subtraction, x2: 800, y2: 300});
            //            canvas.add(connector4);





            //            var deltaX = Math.abs(line.x2 - line.x1);
            //            var deltaY = Math.abs(line.y2 - line.y1);
            //            var minX = line.x2 < line.x1 ? line.x2 : line.x1;
            //            var minY = line.y2 < line.y1 ? line.y2 : line.y1;
            //            var triangle1 = new fabric.Triangle({
            //                originX: 'center',
            //                originY: 'center',
            //                left: minX + deltaX / 3,
            //                top: minY + deltaY / 3,
            //                opacity: 1,
            //                width: 20,
            //                height: 20,
            //                fill: '#000'
            //            });
            //            canvas.add(triangle1);
            //            
            //            var triangle2 = new fabric.Triangle({
            //                originX: 'center',
            //                originY: 'center',
            //                left: minX + 2*deltaX/3,
            //                top: minY + 2*deltaY/3,
            //                opacity: 1,
            //                width: 20,
            //                height: 20,
            //                fill: '#000'
            //            });
            //            canvas.add(triangle2);



            //
            //
            //            canvas.observe('object:moving', function(e) {
            //                var p = e.target;
            //                if (p.point_type === 'start')
            //                {
            //                    connector.set('x1', p.left);
            //                    connector.set('y1', p.top);
            //                    connector._setWidthHeight();
            //                    var x = connector.get('x2') - connector.get('x1');
            //                    var y = connector.get('y2') - connector.get('y1');
            //                    var angle;
            //                    if (x == 0) {
            //                        if (y == 0) {
            //                            angle = 0;
            //                        }
            //                        else if (y > 0) {
            //                            angle = Math.PI / 2;
            //                        }
            //                        else {
            //                            angle = Math.PI * 3 / 2;
            //                        }
            //                    }
            //                    else if (y == 0) {
            //                        if (x > 0) {
            //                            angle = 0;
            //                        }
            //                        else {
            //                            angle = Math.PI;
            //                        }
            //                    }
            //                    else {
            //                        if (x < 0) {
            //                            angle = Math.atan(y / x) + Math.PI;
            //                        }
            //                        else if (y < 0) {
            //                            angle = Math.atan(y / x) + (2 * Math.PI);
            //                        }
            //                        else {
            //                            angle = Math.atan(y / x);
            //                        }
            //                    }
            //                    angle = angle * 180 / Math.PI;
            //                    // var angle = -Math.atan((y)/(x))*180/Math.PI
            //
            //                    p.set('angle', angle - 90);
            //
            //
            //
            //
            //
            //
            //
            //                    canvas.renderAll();
            //                }
            //                else if (p.point_type === 'end') {
            //
            ////                    var deltaX = Math.abs(connector.x2 - connector.x1);
            ////                    var deltaY = Math.abs(connector.y2 - connector.y1);
            ////                    var angle = fabric.util.radiansToDegrees(Math.atan(deltaY/deltaX) + Math.PI/2);
            ////                    
            ////                    if (LOG) console.log("angle: " + angle);
            ////                    
            ////                    var minX = connector.x2 < connector.x1 ? connector.x2 : connector.x1;
            ////                    var minY = connector.y2 < connector.y1 ? connector.y2 : connector.y1;
            ////                    
            ////                    triangle1.left = minX + deltaX/3;
            ////                    triangle1.top = minY + deltaY/3;
            ////                    triangle1.angle = angle;
            ////                    
            ////                    triangle2.left = minX + 2*deltaX/3;
            ////                    triangle2.top = minY + 2*deltaY/3;
            ////                    triangle2.angle = angle;
            ////
            ////
            ////  
            //
            //
            //                    
            //
            //
            //
            //                    connector.x2 = p.left;
            //                    connector.y2 = p.top;
            //                    
            //                    connector.positionTriangles();
            //
            //
            //
            //
            //                    connector._setWidthHeight();
            //                    var x = connector.get('x2') - connector.get('x1');
            //                    var y = connector.get('y2') - connector.get('y1');
            //                    var angle;
            //                    if (x == 0) {
            //                        if (y == 0) {
            //                            angle = 0;
            //                        }
            //                        else if (y > 0) {
            //                            angle = Math.PI / 2;
            //                        }
            //                        else {
            //                            angle = Math.PI * 3 / 2;
            //                        }
            //                    }
            //                    else if (y == 0) {
            //                        if (x > 0) {
            //                            angle = 0;
            //                        }
            //                        else {
            //                            angle = Math.PI;
            //                        }
            //                    }
            //                    else {
            //                        if (x < 0) {
            //                            angle = Math.atan(y / x) + Math.PI;
            //                        }
            //                        else if (y < 0) {
            //                            angle = Math.atan(y / x) + (2 * Math.PI);
            //                        }
            //                        else {
            //                            angle = Math.atan(y / x);
            //                        }
            //                    }
            //                    angle = angle * 180 / Math.PI;
            //                    //var angle = -Math.atan((y)/(x))*180/Math.PI
            //
            //                    p.point_start.set('angle', angle - 90);
            //                    canvas.renderAll();
            //                }
            //            });

            //            
            //
            //            if (LOG) console.log("%c" + canvas, "background: #FFFF00");
            //            if (LOG) console.log(canvas);
            //
            //
            //            
            //            var ctx = canvas.getContext('2d');
            //
            //            ctx.strokeStyle = this.color;
            //            ctx.lineWidth = 5;
            //            ctx.beginPath();
            //            ctx.moveTo(5, 0);
            //            ctx.lineTo(5, 10);
            //            ctx.closePath();
            //            ctx.stroke();
            //
            //
            //            var squareWidth = 10, squareDistance = 5;
            //            var rect = new fabric.Rect({
            //                top: 0,
            //                left: 0,
            //                width: squareWidth,
            //                height: squareWidth,
            //                angle: 45,
            //                fill: this.color
            //            });
            //            
            //            rect.render(ctx); //
            //




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

                if (!canvas.activePanningMode) {

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




            /*$("#drawFilledMark").click(function () {
             if (canvas.isFilledMarkDrawingMode) {
             deActivateFilledMarkDrawingMode();
             } else {
             activateFilledMarkDrawingMode();
             }
             });*/

            /*$("#drawPathMark").click(function () {
             if (canvas.isPathMarkDrawingMode) {
             deActivatePathMarkDrawingMode();
             } else {
             activatePathMarkDrawingMode();
             }
             });*/
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
             $("#samplerButton").click(function () {
             if (canvas.isSamplingMode) {
             deActivateSamplingMode();
             } else {
             activateSamplingMode();
             }
             });
             $("#samplerLineButton").click(function () {
             if (canvas.isSamplingLineMode) {
             deActivateLineSamplingMode();
             } else {
             activateLineSamplingMode();
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
            $("#horizontal-grower").draggable({
                cursorAt: {top: 18.5, left: 8},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100;'><li><i class='icon-resize-horizontal icon-2x'></i></li></div>");
                }
            });
            $("#vertical-grower").draggable({
                cursorAt: {top: 18.5, left: 8},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100;'><li><i class='icon-resize-vertical icon-2x'></i></li></div>");
                }
            });
            $("#square-grower").draggable({
                cursorAt: {top: 18.5, left: 8},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100;'><li><i class='icon-fullscreen icon-2x'></i></li></div>");
                }
            });
            $("#playerWidget").draggable({
                cursorAt: {top: 18.5, left: 80},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100;'><li><i class='fa-caret-square-o-right icon-2x'></i></li></div>");
                }
            });
            $("#aggregatorWidget").draggable({
                cursorAt: {top: 18.5, left: 80},
                cursor: 'none',
                helper: function (event) {
                    return $("<div style='z-index: 100;'><li><i class='fa-ellipsis-h icon-2x'></i></li></div>");
                }
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
                accept: "#horizontal-grower, #vertical-grower, #square-grower, #addition-operator, #subtraction-operator, #multiplication-operator, #division-operator, #xFunction, #emptyFunction, #x2Function, #x3Function, #sinXFunction, #cosXFunction, #logXFunction, #sqrtXFunction, #playerWidget, #aggregatorWidget, #locatorWidget, #mapperWidget, #numericFunctionWidget, #verticalCollection, #collectionGenerator, #numberGenerator, #rectPrototype, #squarePrototype, #pathMarkPrototype, #circlePrototype, #fatFontPrototype, #ellipsePrototype, #isColorData, #isStringData, #isNumericData, #collectionValue, #isDurationData, #isDateAndTimeData, #isShapeData",
                drop: function (ev, ui) {

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
                        if (id == "horizontal-grower") {
                            addHorizontalSlider(x, y, targetObject);
                        } else if (id == "vertical-grower") {
                            addVerticalSlider(x, y, targetObject);
                        } else if (id == "square-grower") {
                            addSquareSlider(x, y, targetObject);
                        } else if (id == "addition-operator") {
                            addOperator('addition', x, y);
                        } else if (id == "subtraction-operator") {
                            addOperator('subtraction', x, y);
                        } else if (id == "multiplication-operator") {
                            addOperator('multiplication', x, y);
                        } else if (id == "division-operator") {
                            addOperator('division', x, y);
                        } else if (id === "emptyFunction") {

                            addNumericFunction(x, y);
                        } else if (id === "xFunction") {

                            var coordinates = getLinealFunctionCoordinates();
                            addNumericFunction(x, y, coordinates.XCoordinates, coordinates.YCoordinates);
                        } else if (id === "x2Function") {

                            var coordinates = getQuadraticFunctionCoordinates();
                            addNumericFunction(x, y, coordinates.XCoordinates, coordinates.YCoordinates);
                            // xSquared(x, y);

                        } else if (id === "x3Function") {

                            var coordinates = getCubicFunctionCoordinates();
                            addNumericFunction(x, y, coordinates.XCoordinates, coordinates.YCoordinates);
                            // xToPower3(x, y);


                        } else if (id === "sinXFunction") {

                            var coordinates = getSinFunctionCoordinates();
                            addNumericFunction(x, y, coordinates.XCoordinates, coordinates.YCoordinates);
                            // sinX(0, 2 * Math.PI, 68, 200, x, y);

                        } else if (id === "cosXFunction") {

                            var coordinates = getCosFunctionCoordinates();
                            addNumericFunction(x, y, coordinates.XCoordinates, coordinates.YCoordinates);
                            // sinX(Math.PI / 2, 5 * Math.PI / 2, 68, 198, x, y);

                        } else if (id === "logXFunction") {

                            var coordinates = getLogFunctionCoordinates();
                            addNumericFunction(x, y, coordinates.XCoordinates, coordinates.YCoordinates);

                        } else if (id === "sqrtXFunction") {

                            var coordinates = getSqrtFunctionCoordinates();
                            addNumericFunction(x, y, coordinates.XCoordinates, coordinates.YCoordinates);


                        } else if (id === "playerWidget") {

                            var player = new Player({
                                left: x,
                                top: y
                            });
                            canvas.add(player);
                        } else if (id === "aggregatorWidget") {

                            var anAggregator = new Aggregator({
                                left: x,
                                top: y
                            });
                            canvas.add(anAggregator);
                        } else if (id === "locatorWidget") {

                            addLocator(x, y);
                        } else if (id === "mapperWidget") {

                            addMapper(x, y);
                        } else if (id === "numericFunctionWidget") {

                            addNumericFunction(x, y);
                        } else if (id === "verticalCollection") {

                            addEmptyVerticalCollection(x, y);

                        } else if (id === "collectionGenerator") {

                            addNumericCollectionGenerator(x, y);

                        } else if (id === "numberGenerator") {

                            addNumberGenerator(x, y, 0, 100, {});

                        } else if (id === "squarePrototype") {

                            var options = {
                                left: x,
                                top: y,
                                fill: rgb(225, 153, 75),
                                stroke: darkenrgb(225, 153, 75),
//                                fill: rgb(96, 202, 234),
//                                stroke: darkenrgb(96, 202, 234),
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
                                side: 60,
                                label: '',
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

                            /*var fillColor = generateRandomColor();
                             var rgbColor = hexToRGB(fillColor);
                             var r = rgbColor.r;
                             var g = rgbColor.g;
                             var b = rgbColor.b;
                             var strokeColor = darkenrgb(r, g, b);*/

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
                        } else if (id === "isColorData" || id === "isStringData" || id === "isNumericData" ||
                                id === "isDurationData" || id === "isDateAndTimeData" || id === "isShapeData") {

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
            });


            $("#colorChooser").change(function () {
                var color = $(this).val();
                canvas.freeDrawingBrush.color = color;
                brushColor = color;
                enableDrawingMode();
            });


//            hideRightPanel(false);
            activatePanningMode();
            //            hidePanel("#objectActions", false);

            //            hidePanel("#functionsList", false);

            //            hidePanel("#operatorsList", false);
            //            hidePanel("#draggableWidgetsList", false);



            //         activateSamplingMode();



            //            
            //            if (LOG) console.log("time1.isValid():");
            //            if (LOG) console.log(time1.isValid());


            //            if (LOG) console.log("%caTime.isValid: " + time1.isValid (), 'background: black; color: yellow;');
            //            
            //            if (LOG) console.log("Valid time: " + time1.parsingFlags ());
            //            if (LOG) console.log(time1.parsingFlags ());
            //            
            //            if (LOG) console.log("%cDAYS: " + time1.day(), 'background: blue; color: white;');
            //            if (LOG) console.log("%cMONTHS: " + time1.month(), 'background: blue; color: white;');
            //            if (LOG) console.log("%cYEAR: " + time1.year(), 'background: blue; color: white;');
            //
            //            if (LOG) console.log("%cHOURS: " + time1.hour(), 'background: blue; color: white;');            
            //            if (LOG) console.log("%cMINUTES: " + time1.minute(), 'background: blue; color: white;');
            //            if (LOG) console.log("%cSECONDS: " + time1.second(), 'background: blue; color: white;');


            /*var time1 = moment("0750", ["HHmm", "HH:mm", "HH:mm:ss"], true);
             printTime(time1);
             
             var time2 = moment("0758", ["HHmm", "HH:mm", "HH:mm:ss"], true);
             printTime(time2);
             
             var timeDifference = computeTimeDifference(time1, time2);
             printTime(timeDifference);*/


//            var date1 = moment("07/09/1985", getDateFormats(), true);
            //            var date1 = moment("Saturday March 21st", getDateFormats(), true);
//            printDate(date1);
//            if (LOG) console.log("Is this date?: " + date1._isAMomentObject);
            //            var date2 = moment("Tuesday March 31st", getDateFormats(), true);
//            var date2 = moment("19/02/2015", getDateFormats(), true);
//            printDate(date2);
            /*var difference = date2.diff(date1, 'years', true);
             if (LOG) console.log(difference);
             var theDuration = moment.duration(difference, 'years');
             if (LOG) console.log(theDuration.asDays() + " days");
             if (LOG) console.log(theDuration.humanize());*/

            /*var duration = computeDateDifference(date1, date2);
             if (LOG) console.log(duration.duration.asYears() + " years");
             if (LOG) console.log(duration.duration.asMonths() + " months");
             if (LOG) console.log(duration.duration.asDays() + " days");
             if (LOG) console.log("Humanization: " + duration.duration.humanize());*/
            //
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






//        var fColor = new fabric.Color('');
//        console.log(color1.toHsl(););

            console.log("*************************************************************************************************");

            var regular_joe = 'I am here to save the day!';

            console.log(regular_joe);

            function supermax() {
//                    var regular_joe = 'regular_joe is assigned';

                console.log(regular_joe);

                function prison() {
//                        var regular_joe;
                    console.log(regular_joe);
                }

                prison();
            }

//            supermax();

//            addSampleMarksToCanvas();





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

                            createVisualElementFromHTML(parsedHTML, x, y);



                        } else {
//                            print("***" + dataString);
                        }





                    });
                } else {
                    console.log(e.dataTransfer.getData('Text'));
                }

                return false;
            });

            function removeUselessTags(parsedHTML) {

                var filterNodes = [];

                $.each(parsedHTML, function (i, el) {
                    if (el.nodeName !== "META") {
                        filterNodes.push(el);
                    } else {
                        console.log("META tag found!");
                    }
                });

                return filterNodes;

            }

            function createVisualElementFromHTML(parsedHTML, x, y) {

                print("addVisualElementFromHTML FUNCTION. x: " + x + " y: " + y);

                parsedHTML = removeUselessTags(parsedHTML);



                var totalElements = parsedHTML.length;
                console.log("totalElements:" + totalElements);

                if (totalElements === 1) {

                    var htmlElement = parsedHTML[0];
                    var elementType = htmlElement.nodeName.toUpperCase();

                    console.log("elementType: " + elementType);

                    console.log("htmlElement:");
                    console.log(htmlElement);

                    if (elementType === "TABLE") {
                        
                        console.log("ES UNA TABLA!!!");
                        console.log(htmlElement);
                        
                        
                    } else if (elementType === "IMG") {

                        console.log(htmlElement.src);

                        importImageToCanvas(htmlElement.src, x, y);

//                    } else if (elementType === "A" || elementType === "SPAN" || elementType === "H2") {
                    } else {

                        var jQueryElement = $(htmlElement);
                        var theText = jQueryElement.text().trim();

                        if (theText) {

                            var options = {
                                left: x,
                                top: y
                            };
                            
                            if (theText.endsWith('%')) {
                                theText = theText.substring(0, theText.length-1);
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

                                        console.log(theText + " was a VALID TIME!!!)");

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

                            canvas.add(theVisualVariable);
                            theVisualVariable.animateBirth(false, null, null, false);

                        }






                    }

                } else {

                    $.each(parsedHTML, function (i, currentElement) {

                        var htmlElementType = currentElement.nodeName.toUpperCase();

                        console.log("htmlElementType: " + htmlElementType);

                    });

                }



            }



//
//            $.ajax({
//                url: 'http://www.bbc.co.uk/news',
//                type: 'GET',
//                success: function (res) {
//
//                    var responseText = $(res.responseText).text();
//
//                    console.log(responseText);
//
//                }
//            });



            /*console.log("canBeCurrency ('1.23')");
             console.log(canBeCurrency ('1.23'));
             
             console.log("canBeCurrency ('1,000')");
             console.log(canBeCurrency ('1,000'));
             
             console.log("canBeCurrency ('3967')");
             console.log(canBeCurrency ('3967'));
             
             console.log("canBeCurrency ('23')");
             console.log(canBeCurrency ('23'));
             
             console.log("canBeCurrency ('1.2')");
             console.log(canBeCurrency ('1.2'));
             
             console.log("canBeCurrency ('999,999.99')");
             console.log(canBeCurrency ('999,999.99'));
             
             console.log("canBeCurrency ('84,951,200')");
             console.log(canBeCurrency ('84,951,200'));
             
             console.log("canBeCurrency ('1,831,060')");
             console.log(canBeCurrency ('1,831,060'));
             
             console.log("canBeCurrency ('1,831,00')");
             console.log(canBeCurrency ('1,831,00'));*/




        </script>





    </body>

</html>