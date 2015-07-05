var RectangularVixor = fabric.util.createClass(fabric.Rect, {
    type: 'rectangularVixor',
    isRectangularVixor: true,
    initialize: function (options) {
        options || (options = {});
        this.callSuper('initialize', options);
        this.set('strokeWidth', options.strokeWidth || 2);
        this.set('originalStrokeWidth', options.strokeWidth || 2);

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
       


        this.set('colorForStroke', options.colorForStroke || this.stroke);

        this.createRectBackground();

        this.set('widgets', new Array());
        this.set('visualProperties', new Array());

        this.set('specificProperties', new Array());
        
        this.specificProperties.push({attribute: "width", readable: true, writable: true, types: ['number'], updatesTo: ['area']});
        this.specificProperties.push({attribute: "height", readable: true, writable: true, types: ['number'], updatesTo: ['area']});
        this.specificProperties.push({attribute: "area", readable: true, writable: true, types: ['number'], updatesTo: ['width', 'height']});
        this.specificProperties.push({attribute: "angle", readable: true, writable: true, types: ['number'], updatesTo: []});

        this.createVisualProperties();

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
        this.callSuper('_render', ctx);
        
        ctx.restore();
    }
});
Vixor.call(RectangularVixor.prototype);

function addRectangularVixorToCanvas(options) {
    var rectangularVixor = new RectangularVixor(options);
    canvas.add(rectangularVixor);
    if (rectangularVixor.width > 0 && rectangularVixor.height > 0) {
        rectangularVixor.animateBirth(options.markAsSelected);
    }
    rectangularVixor.associateEvents();
}