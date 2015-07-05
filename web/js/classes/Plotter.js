// The Output mixing defines all the common properties and behaviours that outputs share
var Plotter = function () {

   this.set('isPlotter', true);
   this.set('originX', 'center');
   this.set('originY', 'center');
   this.set('transparentCorners', false);

   this.set('perPixelTargetFind', false);
   this.set('isCompressed', true);

   this.set('labelVisible', true);

   this.set('indent', 20);
   this.set('propertiesRadius', 25);

   this.set('propertiesSeparation', 65);
   this.set('propertiesGap', 35);

   this.set('coreProperties', new Array());

//    this.coreProperties.push({attribute: "shape", readable: true, writable: true, types: ['object', 'string'], updatesTo: []});
   this.coreProperties.push({attribute: "fill", readable: true, writable: true, types: ['object', 'string'], updatesTo: []});
   this.coreProperties.push({attribute: "x", readable: true, writable: true, types: ['object'], updatesTo: []});
   this.coreProperties.push({attribute: "y", readable: true, writable: true, types: ['object'], updatesTo: []});



//   this.coreProperties.push({attribute: "fill", readable: true, writable: false});
//   this.coreProperties.push({attribute: "fill", readable: false, writable: true});



//   this.coreProperties.push({attribute: "width", readable: true, writable: false});
//   this.coreProperties.push({attribute: "width", readable: true, writable: true});
//   this.coreProperties.push({attribute: "width", readable: false, writable: true});
//   this.coreProperties.push({attribute: "height", readable: true, writable: true});
//   this.coreProperties.push({attribute: "x", readable: true, writable: false});
//   this.coreProperties.push({attribute: "y", readable: true, writable: false});

//   this.set('hasBorders', false);
//   this.set('hasControls', false);
//   this.set('hasRotatingPoint', false);

//   if (fabric.isTouchSupported) {
//      this.set('hasBorders', false);
//      this.set('hasControls', false);
//      this.set('hasRotatingPoint', false);
//   } else {
//      this.setControlsVisibility({
//         mt: false, // middle top disabled
//         mb: false, // midle bottom disabled
//         ml: false, // middle left disabled
//         mr: false // middle right disabled
//      });
//   }





   this.createRectBackground = function () {
      var thePlotter = this;
      var backgroundRect = new fabric.Rect({
         originX: 'center',
         originY: 'center',
         top: thePlotter.top,
         left: thePlotter.left,
         width: 0,
         height: 0,
         fill: '',
         lockMovementX: true,
         lockMovementY: true,
         lockScalingX: true,
         lockScalingY: true,
         lockRotation: true,
         hasControls: false,
         hasRotationPoint: false,
         hasBorders: false,
         selectable: true,
         evented: true,
         rx: 10,
         ry: 10
      });
      backgroundRect.on({
         'doubleTap': function (options) {
            thePlotter.trigger('doubleTap', options);
         },
         'moving': function (options) {

         }
      });
      this.set('backgroundRect', backgroundRect);
      canvas.add(backgroundRect);
   };
   this.createVisualProperties = function () {
      for (var i = 0; i < this.coreProperties.length; i++) {
         var visualProperty = new CreateVisualProperty(this.coreProperties[i], this, this.left, this.top - this.getHeight() / 2);
         this.visualProperties.push(visualProperty);
         visualProperty.setCoords();
      }
      for (var i = 0; i < this.specificProperties.length; i++) {
         var visualProperty = new CreateVisualProperty(this.specificProperties[i], this, this.left, this.top - this.getHeight() / 2);
         this.visualProperties.push(visualProperty);
         visualProperty.setCoords();
      }
   };
   this.animateBirth = function (markAsSelected) {

      var thePlotter = this;
      var scaleX = this.scaleX;
      var scaleY = this.scaleY;
      this.set('scaleX', 0);
      this.set('scaleY', 0);

      if (markAsSelected) {
         this.applySelectedStyle(false);
      }

      var easing = fabric.util.ease['easeOutElastic'];
      var duration = 1200;

      thePlotter.animate('scaleX', scaleX, {
         duration: duration,
         easing: easing
      });

      thePlotter.animate('scaleY', scaleY, {
         duration: duration,
         easing: easing,
         onChange: canvas.renderAll.bind(canvas),
         onComplete: canvas.renderAll.bind(canvas)
      });

   };
   this.applySelectedStyle = function () {

      if (LOG) console.log("At the mark");

      this.stroke = widget_selected_stroke_color;
      this.strokeWidth = widget_selected_stroke_width;
      this.strokeDashArray = widget_selected_stroke_dash_array;
   };
   this.applyUnselectedStyle = function () {
      this.stroke = this.colorForStroke;
      this.strokeWidth = this.originalStrokeWidth;
      this.strokeDashArray = [];
   };
   this.blink = function () {
      var thePlotter = this;
      var increment = 0.3;
      var duration = 100;
      var easing = fabric.util.ease['easeInCubic'];
      thePlotter.animate('scaleX', '+=' + increment, {
         duration: duration,
         easing: easing,
         onComplete: function () {
            thePlotter.animate('scaleX', '-=' + increment, {
               duration: 1100,
               easing: fabric.util.ease['easeOutElastic']
            });
         }
      });
      thePlotter.animate('scaleY', '+=' + increment, {
         duration: duration,
         onChange: canvas.renderAll.bind(canvas),
         easing: easing,
         onComplete: function () {
            thePlotter.animate('scaleY', '-=' + increment, {
               duration: 1100,
               onChange: canvas.renderAll.bind(canvas),
               easing: fabric.util.ease['easeOutElastic']
            });
         }
      });
   };
   this.animateProperty = function (property, value, duration, easing) {
      var thePlotter = this;
      thePlotter.animate(property, value, {
         duration: duration,
         easing: easing,
         onChange: function () {
            if (thePlotter.isEllipticPlotter) {
               thePlotter.width = thePlotter.rx * 2;
               thePlotter.height = thePlotter.ry * 2;
            }
            if (thePlotter.isFatFontPlotter) { // For some reason, there is the need to refresh the canvas for some of the properties of the IText (e.g. the fontSize attribute)
               canvas.renderAll();
            }
            thePlotter.positionElements();

         },
         onComplete: function () {
            thePlotter.positionElements();
            canvas.renderAll();
         }
      });
   };
   this.remove = function () {
      if (LOG) console.log("%cRemoving OUTPUT", "background: MediumSpringGreen");
      if (this.iText) {
         this.iText.remove();
      }
      this.callSuper('remove');
   };
   this.changeColors = function (fill, stroke) {
      this.fill = fill;
      this.stroke = stroke;
      this.colorForStroke = stroke;
      this.backgroundRect.stroke = stroke;
      this.visualProperties.forEach(function (visualProperty) {
         visualProperty.stroke = stroke;
         visualProperty.fill = fill;
         visualProperty.outConnectors.forEach(function (outConnector) {
            outConnector.changeColor(stroke);
         });

      });
   };

   this.animateObjectProperty = function (object, prop, endValue, duration, easing, refreshCanvas, removeAfterCompletion, computeGeometryProperties) {
      var thePlotter = this;
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
            thePlotter.positionConnectors();
            if (removeAfterCompletion) {
               object.remove();
               canvas.renderAll();
            }
            if (computeGeometryProperties) {
               computeUntransformedProperties(object);
            }
         }
      });
   };




   this.positionConnectors = function () {
      this.visualProperties.forEach(function (visualProperty) {
         visualProperty.inConnectors.forEach(function (inConnector) {
            inConnector.set({'x2': visualProperty.left, 'y2': visualProperty.top});
         });
         visualProperty.outConnectors.forEach(function (outConnector) {
            outConnector.set({'x1': visualProperty.left, 'y1': visualProperty.top});
         });
      });
   };
   this.toggleState = function (refreshCanvas) {
      if (this.isCompressed) {
         this.expand(refreshCanvas);
      } else {
         this.compress(refreshCanvas);
      }
   };

   this.expand = function (refreshCanvas) {

      if (!this.isCompressed)
         return;

      var thePlotter = this;
      thePlotter.setCoords();

      var theBackground = this.backgroundRect;
      var duration = 500;
      var easing = fabric.util.ease['easeOutCubic'];

      var boundingRect = thePlotter.getBoundingRect();
      var objectCenter = thePlotter.getCenterPoint();

      if (thePlotter.isCircularMark && (thePlotter.scaleX == thePlotter.scaleY)) {
         var markRealRadius = thePlotter.radius * thePlotter.scaleX;
         if (markRealRadius < thePlotter.propertiesRadius) {
            markRealRadius = thePlotter.propertiesRadius + 5;
         }
         var wh = 2 * markRealRadius;
         boundingRect = {top: objectCenter.y - markRealRadius, left: objectCenter.x - markRealRadius, width: wh, height: wh};
      } else if (thePlotter.isEllipticMark && (thePlotter.rx == thePlotter.ry) && (thePlotter.scaleX == thePlotter.scaleY)) {

         var markRealRadius = thePlotter.rx * thePlotter.scaleX;
         if (markRealRadius < thePlotter.propertiesRadius) {
            markRealRadius = thePlotter.propertiesRadius + 5;
         }
         var wh = 2 * markRealRadius;
         boundingRect = {top: objectCenter.y - markRealRadius, left: objectCenter.x - markRealRadius, width: wh, height: wh};
      }

      if (boundingRect.width < thePlotter.propertiesRadius) {
         boundingRect.width = 2 * thePlotter.propertiesRadius;
      }

      // TODO: Eventually, this bug should be removed
      compensateBoundingRect(boundingRect);

//        drawRectAt(new fabric.Point(boundingRect.left, boundingRect.top), "green");
//        drawRectAt(new fabric.Point(boundingRect.left + boundingRect.width, boundingRect.top), "red");

      var newHeight = boundingRect.height + 2 * thePlotter.indent;
      var newWidth = boundingRect.width + 2 * thePlotter.indent + 2 * thePlotter.indent + thePlotter.propertiesRadius;
      var newLeft = thePlotter.left + (newWidth / 2 - boundingRect.width / 2 - thePlotter.indent);

      theBackground.width = 0;
      theBackground.height = newHeight;
      theBackground.left = thePlotter.left;
      theBackground.top = thePlotter.top;
      theBackground.stroke = thePlotter.colorForStroke;
      theBackground.strokeWidth = 1;


//        thePlotter.bringToFront();
      if (thePlotter.iText) {
         thePlotter.iText.bringToFront();
      }

      var boundingRectRightBottom = new fabric.Point(boundingRect.left + boundingRect.width, boundingRect.top + boundingRect.height);
//        drawRectAt(boundingRectCenterBottom, "green");
      boundingRectRightBottom.x += thePlotter.indent;

      theBackground.opacity = 1;

      // In the animation of the background, the canvas is not redrawn, as this is done while the visual properties are being moved
      theBackground.animate('left', newLeft, {
         easing: easing,
         duration: duration,
      });
      theBackground.animate('width', newWidth, {
         duration: duration,
         easing: easing,
         onChange: function () {
            theBackground.setGradient('fill', {
               type: 'linear',
               x1: 0,
               y1: 0,
               x2: 0,
               y2: theBackground.getHeight(),
               colorStops: {
                  0: 'rgb(255,255,255, 1)',
                  0.5: 'rgba(242,242,242,0.75)',
                  1: 'rgb(255,255,255, 1)'
               }
            });
         },
         onComplete: function () {
            thePlotter.isCompressed = false;
//                drawRectAt(new fabric.Point(theBackground.left, theBackground.top), "black");
         }
      });

      var positions = new Array();
      var i = 0;
      thePlotter.visualProperties.forEach(function (visualProperty) {

         var x = boundingRectRightBottom.x + thePlotter.propertiesRadius;
         var y = thePlotter.backgroundRect.top - thePlotter.backgroundRect.getHeight() / 2 + i * thePlotter.propertiesSeparation + thePlotter.propertiesRadius + thePlotter.indent;

//            drawRectAt(new fabric.Point(x,y), generateRandomColor());

         canvas.add(visualProperty);
         visualProperty.bringForward(true);

         visualProperty.left = thePlotter.left;
         visualProperty.top = thePlotter.top;
         visualProperty.scaleX = 0;
         visualProperty.scaleY = 0;
         visualProperty.opacity = 0;

         positions.push({x: x, y: y});

         i++;
      });

//        var easing = fabric.util.ease['easeInCubic'];
      var easing = fabric.util.ease['easeOutQuad'];

      for (var i = 0; i < thePlotter.visualProperties.length; i++) {
         var visualProperty = thePlotter.visualProperties[i];
         thePlotter.animateObjectProperty(visualProperty, 'opacity', 1, duration, easing, false, false);
         thePlotter.animateObjectProperty(visualProperty, 'scaleX', 1, duration, easing, false, false);
         thePlotter.animateObjectProperty(visualProperty, 'scaleY', 1, duration, easing, false, false);
         thePlotter.animateObjectProperty(visualProperty, 'left', positions[i].x, duration, easing, false, false);
         thePlotter.animateObjectProperty(visualProperty, 'top', positions[i].y, duration, easing, refreshCanvas && i == thePlotter.visualProperties.length - 1, false);
      }

   };

   this.compress = function (refreshCanvas) {

      if (this.isCompressed)
         return;

      if (LOG) console.log("%cCompressing", "background:green; color:white");
      if (LOG) console.log("refreshCanvas: " + refreshCanvas + " - " + this.type);

      var thePlotter = this;
      var theBackground = this.backgroundRect;
      var duration = 500;
      var easing = fabric.util.ease['easeOutQuad'];

      theBackground.animate('left', thePlotter.left, {
         easing: easing,
         duration: duration,
      });
      theBackground.animate('opacity', 0, {
         duration: duration,
      });

      theBackground.animate('width', 0, {
         duration: duration,
         easing: easing,
         onComplete: function () {
            theBackground.width = 0;
            thePlotter.isCompressed = true;
            theBackground.setCoords();
//                theBackground.remove();
            canvas.renderAll();
         }
      });



      for (var i = 0; i < thePlotter.visualProperties.length; i++) {
         var visualProperty = thePlotter.visualProperties[i];
         thePlotter.animateObjectProperty(visualProperty, 'opacity', 0, duration, easing, false, true);
         thePlotter.animateObjectProperty(visualProperty, 'scaleX', 0, duration, easing, false, true);
         thePlotter.animateObjectProperty(visualProperty, 'scaleY', 0, duration, easing, false, true);
         thePlotter.animateObjectProperty(visualProperty, 'left', thePlotter.left, duration, easing, false, true);
         thePlotter.animateObjectProperty(visualProperty, 'top', thePlotter.top, duration, easing, refreshCanvas && i == thePlotter.visualProperties.length - 1, true);
      }

   };


   this.positionElements = function () {

      var thePlotter = this;
      thePlotter.setCoords();

      var objectCenter = thePlotter.getCenterPoint();
      var boundingRect = thePlotter.getBoundingRect();

//        drawRectAt(objectCenter, "blue");
//        drawRectAt(new fabric.Point(boundingRect.left, boundingRect.top), "green");
//        drawRectAt(new fabric.Point(boundingRect.left + boundingRect.width, boundingRect.top + boundingRect.height), "green");

      if (thePlotter.isCircularPlotter && (thePlotter.scaleX == thePlotter.scaleY)) {
         var markRealRadius = thePlotter.radius * thePlotter.scaleX;

         if (markRealRadius < thePlotter.propertiesRadius) {
            markRealRadius = thePlotter.propertiesRadius;
         }
         var wh = 2 * markRealRadius;
         boundingRect = {top: objectCenter.y - markRealRadius, left: objectCenter.x - markRealRadius, width: wh, height: wh};

      } else if (thePlotter.isEllipticPlotter && (thePlotter.rx == thePlotter.ry) && (thePlotter.scaleX == thePlotter.scaleY)) {

         var markRealRadius = thePlotter.rx * thePlotter.scaleX;
         if (markRealRadius < thePlotter.propertiesRadius) {
            markRealRadius = thePlotter.propertiesRadius + 5;
         }
         var wh = 2 * markRealRadius;
         boundingRect = {top: objectCenter.y - markRealRadius, left: objectCenter.x - markRealRadius, width: wh, height: wh};
      }

      if (boundingRect.width < thePlotter.propertiesRadius) {
         boundingRect.width = 2 * thePlotter.propertiesRadius;
      }

      compensateBoundingRect(boundingRect);

      var newHeight = boundingRect.height + 2 * thePlotter.indent;
      var newWidth = boundingRect.width + 2 * thePlotter.indent + 2 * thePlotter.indent + thePlotter.propertiesRadius;


      thePlotter.backgroundRect.top = thePlotter.top;


      thePlotter.backgroundRect.width = newWidth;
      thePlotter.backgroundRect.height = newHeight;

      if (thePlotter.isCompressed) {
         thePlotter.backgroundRect.left = thePlotter.left;
      } else {
         var newLeft = thePlotter.left + (newWidth / 2 - boundingRect.width / 2 - thePlotter.indent);
         thePlotter.backgroundRect.left = newLeft;
      }

      thePlotter.backgroundRect.setCoords();

      var boundingRectRightBottom = new fabric.Point(boundingRect.left + boundingRect.width, boundingRect.top + boundingRect.height);
//        drawRectAt(boundingRectCenterBottom, "green");
      boundingRectRightBottom.x += thePlotter.indent;

      var i = 0;
      this.visualProperties.forEach(function (visualProperty) {

         var x = boundingRectRightBottom.x + thePlotter.propertiesRadius;
         var y = thePlotter.backgroundRect.top - thePlotter.backgroundRect.getHeight() / 2 + i * thePlotter.propertiesSeparation + thePlotter.propertiesRadius + thePlotter.indent;

         visualProperty.left = x;
         visualProperty.top = y;
         visualProperty.setCoords();

         visualProperty.inConnectors.forEach(function (inConnector) {
            if (thePlotter.isCompressed) {
               inConnector.set({'x2': thePlotter.left, 'y2': thePlotter.top});
            } else {
               inConnector.set({'x2': visualProperty.left, 'y2': visualProperty.top});
            }
         });

         visualProperty.outConnectors.forEach(function (outConnector) {
            if (thePlotter.isCompressed) {
               outConnector.set({'x1': thePlotter.left, 'y1': thePlotter.top});
            } else {
               outConnector.set({'x1': visualProperty.left, 'y1': visualProperty.top});
            }
         });



         i++;

      });

      thePlotter.setCoords();

   };

   this.getVisualPropertyByAttributeName = function (attributeName) {
      var thePlotter = this;
      for (var i = 0; i < thePlotter.visualProperties.length; i++) {
         if (thePlotter.visualProperties[i].attribute == attributeName) {
            return thePlotter.visualProperties[i];
         }
      }
      return null;
   };

   this.associateEvents = function () {
      var thePlotter = this;
      thePlotter.on({
         'moving': function (options) {
            objectMoving(options, thePlotter);
            thePlotter.positionElements();
            this.widgets.forEach(function (mark) {
               mark.positionElements();
            });
         },
         'rotating': function (options) {
            objectMoving(options, thePlotter);
            thePlotter.positionElements();
         },
         'scaling': function (options) {
            objectMoving(options, thePlotter);
            thePlotter.positionElements();
         },
         'doubleTap': function (options) {
            if (LOG) console.log("%cDouble tap on this mark!", "color:blue;");
            if (this.isCompressed) {
               this.expand(true);
            } else {
               this.compress(true);
            }
         }
      });
   };


   this.changeColors = function (fill, stroke) {
      this.fill = fill;
      this.stroke = stroke;
      this.colorForStroke = stroke;
      this.backgroundRect.stroke = stroke;
      this.visualProperties.forEach(function (visualProperty) {
         visualProperty.stroke = stroke;
         visualProperty.fill = fill;
         visualProperty.outConnectors.forEach(function (outConnector) {
            outConnector.changeColor(stroke);
         });
      });
      this.widgets.forEach(function (fatFontMark) {
         fatFontMark.changeColors(fill, stroke);
      });
   };
   return this;
};

/* Function to add outputs to Canvas*/
function addPlotterToCanvas(outputType, options) {
   if (outputType == IMAGE_PLOTTER) {
      addImagePlotterToCanvas(options);
   }
}














var ImagePlotter = fabric.util.createClass(fabric.Image, {
   type: 'imagePlotter',
   isImagePlotter: true,
   initialize: function (element, options) {
      options || (options = {});
      this.callSuper('initialize', element, options);
      this.set('strokeWidth', options.strokeWidth || 2);
      this.set('originalStrokeWidth', options.strokeWidth || 2);

      if (options.area) {
         var radius = Math.sqrt(options.area / Math.PI);
         this.set('radius', Math.abs(radius));
         this.set('area', options.area);
      } else {
         this.set('radius', options.radius || 0);
         this.set('area', Math.PI * Math.abs(this.radius) * Math.abs(this.radius));
      }

      var iText = null;
      var label = null;

      if (options.labeled != false) {
         label = options.label || '';
         iText = new fabric.IText(this.label, {
            originX: 'center',
            originY: 'center',
            fontSize: 15,
            textAlign: 'center',
            fontFamily: 'calibri',
            hasControls: false,
            hasBorders: false,
            hasRotatingPoint: false,
//                lockRotation: true,
//                lockScalingX: true,
//                lockScalingY: true,
//                lockMovementX: true,
//                lockMovementY: true,
            selectable: false,
            evented: true,
            editable: true
         });
         this.set('iText', iText);
         canvas.add(iText);

         setTimeout(function () {
            iText.bringToFront(true);
         }, 100);

         var bottomRight = this.getPointByOrigin('right', 'bottom');
         iText.set({'left': bottomRight.x, 'top': bottomRight.y + this.iText.getHeight() / 2 + 5});
         iText.setCoords();

      }

      this.set('shape', 'Circle');
      this.set('label', label);
      this.set('iText', iText);


      this.createRectBackground();

      this.set('colorForStroke', options.colorForStroke || this.stroke);



      this.set('widgets', new Array());
      this.set('visualProperties', new Array());

      this.set('specificProperties', new Array());


      this.specificProperties.push({attribute: "label", readable: true, writable: true, types: ['object', 'string'], updatesTo: []});
      this.specificProperties.push({attribute: "number", readable: true, writable: true, types: ['object', 'number'], updatesTo: ['label']});
//        this.specificProperties.push({attribute: "fontSize", readable: true, writable: true, types: ['object', 'number'], updatesTo: []});
      this.specificProperties.push({attribute: "angle", readable: true, writable: true, types: ['object', 'number'], updatesTo: []});


      this.createVisualProperties();


   },
   hideLabel: function () {
      this.widgets.forEach(function (mark) {
         mark.hideLabel();
      });
      canvas.renderAll();
      this.labelVisible = false;
   },
   showLabel: function () {
      this.widgets.forEach(function (mark) {
         mark.showLabel();
      });
      canvas.renderAll();
      this.labelVisible = true;
   },
   fromURL: function (url, callback, imgOptions) {
      return fabric.Image.fromURL(url, callback, imgOptions);
   },
   computeUpdatedValueOf: function (updater, value, updatedProperty) {
      if (updater == 'radius') {
         if (updatedProperty == 'area') {
            return Math.PI * value * value;
         }
      } else if (updater == 'area') {
         if (updatedProperty == 'radius') {
            return Math.sqrt(value / Math.PI);
         }
      }
   },
   createMarks: function (attribute, attributeValues) {

      // attribute can be x, y, number or label
      var thePlotter = this;

      var topLeft = thePlotter.getPointByOrigin('left', 'top');
      var centerPoint = thePlotter.getCenterPoint();

      var duration = 750;

//        var easing = fabric.util.ease['easeInCirc'];
//        var easing = fabric.util.ease['easeInExpo'];
      var easing = fabric.util.ease['easeInQuint'];

      for (var i = 0; i < attributeValues.length; i++) {

         var left = centerPoint.x;
         var top = centerPoint.y;
         var number = i + 1;
         var label = '';

         if (attribute == "x") {
            left = topLeft.x + attributeValues[i];
         }

         if (attribute == "y") {
            top = topLeft.y + attributeValues[i];
         }

         if (attribute == "number") {
            number = attributeValues[i];
         }

         if (attribute == "label") {
            label = attributeValues[i];
         }

         var options = {
            left: left,
            top: top,
            fill: 'black',
            colorForStroke: 'black',
//                fill: thePlotter.fill,
//                colorForStroke: thePlotter.stroke,
            fontFamily: 'Miguta',
            number: number,
            untransformedScaleX: 1,
            untransformedScaleY: 1,
            untransformedAngle: 0,
            parentObject: thePlotter,
            scaleX: 0,
            scaleY: 0,
            label: label,
         };

         var text = '' + number;
         var fatFontMark = new FatFontMark(text, options);
         fatFontMark.associateEvents();
         thePlotter.widgets.push(fatFontMark);

         fatFontMark.setProperty("number", number, null);

         canvas.add(fatFontMark);

         thePlotter.animateObjectProperty(fatFontMark, 'scaleX', 1, duration, easing, false, false, false);
         thePlotter.animateObjectProperty(fatFontMark, 'scaleY', 1, duration, easing, i == (attributeValues.length - 1), false, true);

      }

   },
   setProperty: function (property, value, theVisualProperty) {
      var thePlotter = this;
      if (property == 'fill') {
         if ($.isArray(value)) {
            for (var i = 0; i < thePlotter.widgets.length; i++) {
               thePlotter.widgets[i].setProperty(property, value[i], null);
            }
         } else {
            if (theVisualProperty && theVisualProperty.parentObject && theVisualProperty.parentObject.colorForStroke) {
               thePlotter.changeColors(value, theVisualProperty.parentObject.colorForStroke);
            } else {
               // Here, if -for instance- the value of the color comes from the input provided by an aggregator
               thePlotter.changeColors(value, value);
            }
         }
      } else if (property == 'label' || property == 'number' || property == 'angle' || property == 'fontSize') {
         if (thePlotter.widgets && thePlotter.widgets.length > 0) {
            if ($.isArray(value)) {
               for (var i = 0; i < thePlotter.widgets.length; i++) {
                  thePlotter.widgets[i].setProperty(property, value[i], null);
               }
            } else {
               for (var i = 0; i < thePlotter.widgets.length; i++) {
                  thePlotter.widgets[i].setProperty(property, value, null);
               }
            }
         } else {
            thePlotter.createMarks(property, value);
         }
      } else if (property == 'x') {

         // There are marks already associated to this ploter 
         if (thePlotter.widgets && thePlotter.widgets.length > 0) {

            var topLeft = thePlotter.getPointByOrigin('left', 'top');

            var duration = 500;
            var easing = fabric.util.ease['easeOutQuad'];
            for (var i = 0; i < thePlotter.widgets.length; i++) {
               var mark = thePlotter.widgets[i];
               var newLeft = topLeft.x + value[i];
               thePlotter.animateObjectProperty(mark, 'left', newLeft, duration, easing, i == thePlotter.widgets.length - 1, false, true);
            }

         } else {
            thePlotter.createMarks('x', value);
         }

      } else if (property == 'y') {

         var topLeft = thePlotter.getPointByOrigin('left', 'top');




         // There are marks already associated to this ploter 
         if (thePlotter.widgets && thePlotter.widgets.length > 0) {



            var duration = 500;
            var easing = fabric.util.ease['easeOutQuad'];
            for (var i = 0; i < thePlotter.widgets.length; i++) {
               var mark = thePlotter.widgets[i];
               var newTop = topLeft.y + value[i];
               thePlotter.animateObjectProperty(mark, 'top', newTop, duration, easing, i == thePlotter.widgets.length - 1, false, true);
            }



         } else {

            thePlotter.createMarks('y', value);

         }


      } else if (property == 'radius' || property == 'area') {


         var changedVisualProperty = thePlotter.getVisualPropertyByAttributeName(property);
         var propertiesToUpdate = changedVisualProperty.updatesTo;







         var easing = fabric.util.ease['easeOutBack'];
         if (property == 'radius' && value < 15) {
            easing = fabric.util.ease['easeOutCirc'];
         }

         thePlotter.animateProperty(property, value, 500, easing);


      }
      canvas.renderAll();
      thePlotter.setCoords();

   },
});


ImagePlotter.fromObject = function (object, callback) {
   fabric.util.loadImage(object.src, function (img) {
      callback && callback(new ImagePlotter(img, object));
   });
};

ImagePlotter.async = true;


Plotter.call(ImagePlotter.prototype);
















function addImagePlotterToCanvas(options) {

   var imagePlotter = new ImagePlotter(options.element, options);
   imagePlotter.associateEvents();

//    imagePlotter.left = 600;
//    imagePlotter.top = 300;
   canvas.add(imagePlotter);
   canvas.renderAll();



}