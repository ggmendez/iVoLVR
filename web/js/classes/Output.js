// The Output mixing defines all the common properties and behaviours that outputs share
var Output = function() {
   this.set('isOutput', true);
   this.set('originX', 'center');
   this.set('originY', 'center');
   this.set('transparentCorners', false);
   this.set('hasRotatingPoint', false);
   this.set('perPixelTargetFind', true);
//    if (fabric.isTouchSupported) {
//        this.set('hasBorders', false);
//        this.set('hasControls', false);
//    } else {
//        this.setControlsVisibility({
//            mt: false, // middle top disabled
//            mb: false, // midle bottom disabled
//            ml: false, // middle left disabled
//            mr: false // middle right disabled
//        });
//    }




   this.animateBirth = function(markAsSelected) {

      var theOutput = this;
      var scaleX = this.scaleX;
      var scaleY = this.scaleY;
      this.set('scaleX', 0);
      this.set('scaleY', 0);

      if (markAsSelected) {
         this.applySelectedStyle(false);
      }

      var easing = fabric.util.ease['easeOutElastic'];
      var duration = 1000;

      theOutput.animate('scaleX', scaleX, {
         duration: duration,
         easing: easing
      }); 

      theOutput.animate('scaleY', scaleY, {
         duration: duration,
         easing: easing,
         onChange: canvas.renderAll.bind(canvas),
         onComplete: canvas.renderAll.bind(canvas)
      });

   };
   this.applySelectedStyle = function(selectConnectors) {
      this.stroke = widget_selected_stroke_color;
      this.strokeWidth = widget_selected_stroke_width;
      this.strokeDashArray = widget_selected_stroke_dash_array;
      if (selectConnectors) {
         this.inConnectors.forEach(function(inConnector) {
            if (!inConnector.source.isOperator) {
               inConnector.applySelectedStyle(true, false);
            } else {
               inConnector.source.applySelectedStyle(false);
               inConnector.applySelectedStyle(false, false);
            }
         });
         this.outConnectors.forEach(function(outConnector) {
            if (!outConnector.source.isOperator) {
               outConnector.applySelectedStyle(false, true);
            } else {
               outConnector.destination.applySelectedStyle(false);
               outConnector.applySelectedStyle(false, false);
            }
         });
      }
   };
   this.applyUnselectedStyle = function(unselectConnectors) {
      this.stroke = this.colorForStroke;
      this.strokeWidth = this.originalStrokeWidth;
      this.strokeDashArray = [];
      if (unselectConnectors) {
         this.inConnectors.forEach(function(inConnector) {
            inConnector.applyUnselectedStyle(false, false);
         });
         this.outConnectors.forEach(function(outConnector) {
            outConnector.applyUnselectedStyle(false, false);
         });
      }
   };
   this.addInConnector = function(connector) {
      this.inConnectors.push(connector);
      connector.setDestination(this, true);
   };
   this.addOutConnector = function(connector) {
      this.outConnectors.push(connector);
   };
   this.blink = function() {
      var theOutput = this;
      var increment = 0.3;
      var duration = 100;
      var easing = fabric.util.ease['easeInCubic'];
      theOutput.animate('scaleX', '+=' + increment, {
         duration: duration,
         onChange: canvas.renderAll.bind(canvas),
         easing: easing,
         onComplete: function() {
            theOutput.animate('scaleX', '-=' + increment, {
               duration: 1100,
               onChange: canvas.renderAll.bind(canvas),
               easing: fabric.util.ease['easeOutElastic']
            });
         }
      });
      theOutput.animate('scaleY', '+=' + increment, {
         duration: duration,
         onChange: canvas.renderAll.bind(canvas),
         easing: easing,
         onComplete: function() {
            theOutput.animate('scaleY', '-=' + increment, {
               duration: 1100,
               onChange: canvas.renderAll.bind(canvas),
               easing: fabric.util.ease['easeOutElastic']
            });
         }
      });
   };
   this.remove = function() {
      if (LOG) console.log("%cRemoving OUTPUT", "background: MediumSpringGreen");
      if (this.iText) {
         this.iText.remove();
      }
      this.callSuper('remove');
   };
   this.associateEvents = function() {



//        var output = this;

      this.on({
         'inConnectionRemoved': function(options) {

            var theOutput = this;

            var removedConnection = options.connector;

            if (LOG) console.log("%cAn IN connection has been removed from this output", "background: LightBlue");
            fabric.util.removeFromArray(theOutput.inConnectors, removedConnection);


            if (LOG) console.log("%cthis.area BEFORE: " + theOutput.area, "background: LightBlue");



            // This output should be updated properly according to the new in connection that has been done
//                var area = (Math.PI * this.radius * this.radius) - removedConnection.value;
            theOutput.area -= removedConnection.value;

            if (LOG) console.log("%cthis.area AFTER: " + theOutput.area, "background: LightBlue");

            var newRadius = Math.sqrt(theOutput.area / Math.PI);

            if (LOG) console.log("New radius after removing a connector: " + newRadius);

            theOutput.label = '' + theOutput.area;


            var easing = fabric.util.ease['easeOutBounce'];
            var duration = 750;
            var options = new Array();
            options['radius'] = newRadius;
            for (var key in options) {
               var value = options[key];
               this.animate(key, value, {
                  duration: duration,
                  onChange: function() {
                     canvas.renderAll.bind(canvas);
                     canvas.renderAll();
//                            theOutput.iText.text = '' + (parseInt(theOutput.iText.text) - removedConnection.value);

                  },
                  onComplete: function() {

                     if (theOutput.inConnectors.length == 0) {
                        if (LOG) console.log("%cNO MORE IN CONNECTIONS TO THIS OUTPUT", "background: LightBlue");
                        theOutput.remove();
                        canvas.renderAll.bind(canvas);
                        canvas.renderAll();
                     } else {
                        canvas.setActiveObject(theOutput);
                        theOutput.iText.text = '' + (parseInt(theOutput.iText.text) - removedConnection.value);
                     }

                  },
                  easing: easing
               });
            }








         },
         'outConnectionRemoved': function(options) {
            var removedConnection = options.connector;
            if (LOG) console.log("%cAn OUT connection has been removed from this output", "background: LightBlue");
            fabric.util.removeFromArray(this.outConnectors, removedConnection);
         },
         'newInConnection': function(options) {
            var newInConnection = options.connector;
            var shouldAnimate = options.shouldAnimate;

            if (LOG) console.log("%cnewInConnection " + shouldAnimate, "background:brown; color: white");

//                if (LOG) console.log("%cthis.type: ", "background: red");
//                if (LOG) console.log(this.type);

            this.inConnectors.push(newInConnection);

            this.blink();

            if (LOG) console.log("%cNew IN connection detected in this output", "background:green");
            if (LOG) console.log("%cThe input value is " + newInConnection.value, "background:yellow");
            if (LOG) console.log("newInConnection:");
            if (LOG) console.log(newInConnection);

            // This output should be updated properly according to the new in connection that has been done
            this.area += newInConnection.value;
            var newRadius = Math.sqrt(this.area / Math.PI);

            this.label = '' + this.area;

            var theOutput = this;
            if (shouldAnimate) {

               var easing = fabric.util.ease['easeOutBounce'];
               var duration = 750;
               var options = new Array();
               options['radius'] = newRadius;
               for (var key in options) {
                  var value = options[key];
                  this.animate(key, value, {
                     duration: duration,
                     onChange: function() {
                        canvas.renderAll.bind(canvas);
                        canvas.renderAll();
                     },
                     onComplete: function() {
                        canvas.setActiveObject(theOutput);
                        theOutput.setCoords();
                     },
                     easing: easing
                  });
               }

            } else {

               theOutput.set('radius', newRadius);
               canvas.setActiveObject(theOutput);
               theOutput.setCoords();

            }

            this.iText.text = '' + (parseInt(this.iText.text) + newInConnection.value);


         },
         'inValueUpdated': function(options) {

            var theOutput = this;

            var inConnection = options.inConnection;
            var markAsSelected = options.markAsSelected;
            var shouldAnimate = options.shouldAnimate;

            // TODO: Eentually, this function should ask what specific parameter of this output to modify with every value updating in the in connectors
            // At the moment, it is assumed that any inValue has an influence on the area of the outputs but, eventually, 
            // it should be checked which property should be updated with this change

            // Also, each subclass should be able to implement its own updating routine as, for example, the updating process of a Circle is not the same of a Rectangle

            // If so, the label of this output should also be updated

//                var newRadius = Math.sqrt(inConnection.value / Math.PI);

//                this.area += inConnection.value;
//                var newRadius = Math.sqrt(this.area / Math.PI);


            if ($.isNumeric(inConnection.value)) {

               if (LOG) console.log("The value is being changed to: " + inConnection.value);



               var value = Math.abs(inConnection.value);

//                var newRadius = Math.sqrt(inConnection.value / Math.PI);
               var newRadius = Math.sqrt(value / Math.PI);




               theOutput.area = Math.PI * Math.abs(newRadius) * Math.abs(newRadius);

               theOutput.label = '' + theOutput.area;


               if (shouldAnimate) {

                  var easing = fabric.util.ease['easeOutBounce'];
                  var duration = 750;
                  var options = new Array();
                  options['radius'] = newRadius;
                  for (var key in options) {
                     var value = options[key];
                     this.animate(key, value, {
                        duration: duration,
                        onChange: function() {
                           canvas.renderAll.bind(canvas);
                           canvas.renderAll();
                        },
                        onComplete: function() {
                           if (markAsSelected) {
//                              canvas.setActiveObject(theOutput);
                           }
                           theOutput.setCoords();
                           canvas.renderAll.bind(canvas);
                           canvas.renderAll();
                        },
                        easing: easing
                     });
                  }

               } else {

                  theOutput.set('radius', newRadius);
                  if (markAsSelected) {
//                     canvas.setActiveObject(theOutput);
                  }
                  theOutput.setCoords();
               }

               theOutput.setCoords();

            }



            this.iText.text = '' + inConnection.value;




         }
      });
   };
   return this;
};


var CircularOutput = fabric.util.createClass(fabric.Circle, {
   type: 'circularOutput',
   initialize: function(options) {
      options || (options = {});
      this.callSuper('initialize', options);
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


      if (LOG) console.log("this.left: ");
      if (LOG) console.log(this.left);
      if (LOG) console.log("this.top: ");
      if (LOG) console.log(this.top);

      var iText = null;
      var label = null;

      if (options.labeled != false) {
         label = options.label || '';
         iText = new fabric.IText(this.label, {
            originX: 'center',
            originY: 'center',
            fontSize: 20,
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

         setTimeout(function() {
            iText.bringToFront(true);
         }, 100);

         var bottomRight = this.getPointByOrigin('right', 'bottom');
         iText.set({'left': bottomRight.x, 'top': bottomRight.y + this.iText.getHeight() / 2 + 5});
         iText.setCoords();

      }

      this.set('label', label);
      this.set('iText', iText);


      this.set('colorForStroke', options.colorForStroke || this.stroke);
      this.set('inConnectors', new Array());
      this.set('outConnectors', new Array());





   },
   toObject: function() {
      return fabric.util.object.extend(this.callSuper('toObject'), {
         inConnectors: this.get('inConnectors'),
         outConnectors: this.get('outConnectors')
      });
   },
   _render: function(ctx) {
      ctx.save();
      this.callSuper('_render', ctx);
      if (this.iText) {

         var groupLeft = 0;
         var groupTop = 0;
         var groupScaleX = 1;
         var groupScaleY = 1;

         if (this.group) {
            groupLeft = this.group.left;
            groupTop = this.group.top;
            groupScaleX = this.group.getScaleX();
            groupScaleY = this.group.getScaleY();
         }
         
         var bottomRight = this.getPointByOrigin('right', 'bottom');
         this.iText.left = groupLeft + this.left*groupScaleX;
         this.iText.top = groupTop + (bottomRight.y + this.iText.height/2)*groupScaleY + 5;
         this.iText.setCoords();





      }
      ctx.restore();
   }
});
Output.call(CircularOutput.prototype);


var RectangularOutput = fabric.util.createClass(fabric.Rect, {
   type: 'rectangularOutput',
   initialize: function(options) {
      options || (options = {});
      this.callSuper('initialize', options);
//        this.set('label', options.label || '');
   },
   toObject: function() {
      return fabric.util.object.extend(this.callSuper('toObject'), {
//      label: this.get('label')
      });
   },
   _render: function(ctx) {
      this.callSuper('_render', ctx);

//    ctx.font = '20px Helvetica';
//    ctx.fillStyle = '#333';
//    ctx.fillText(this.label, -this.width/2, -this.height/2 + 20);
   }
});
Output.call(RectangularOutput.prototype);

















/* Functions to add outputs to Canvas*/

function addOutputToCanvas(connector, outputType, options) {
   if (outputType == CIRCULAR_OUTPUT) {
      addCircularOutputToCanvas(connector, options);
   }
}

function addCircularOutputToCanvas(connector, options) {
   var circularOutput = new CircularOutput(options);
   circularOutput.addInConnector(connector);
   canvas.add(circularOutput);
   if (circularOutput.radius > 0) {
      circularOutput.animateBirth(true);
   }
   circularOutput.associateEvents(circularOutput);
}