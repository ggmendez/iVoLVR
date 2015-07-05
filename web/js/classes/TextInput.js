var TextInput = fabric.util.createClass(fabric.IText, {
    type: 'textInput',
    initialize: function(text, options) {
        options || (options = {});

        this.callSuper('initialize', text, options);
        this.set('fontFamily', options.fontFamily || 'Arial');
//        this.set('lockScalingX', true);
//        this.set('lockScalingY', true);
        this.set('hasRotatingPoint', false);
        this.set('hasBorders', false);
//        this.set('hasControls', false);
        this.set('originX', options.originX || 'center');
        this.set('originY', options.originY || 'center');
        this.set('isTextInput', true);
        
        if (fabric.isTouchSupported) {
            this.set('hasBorders', false);
            this.set('hasControls', false);
        } else {
            this.setControlsVisibility({
                mt: false, // middle top disabled
                mb: false, // midle bottom disabled
                ml: false, // middle left disabled
                mr: false, // middle right disabled
            });
        }
    },
    _render: function(ctx) {
       ctx.save();
        this.callSuper('_render', ctx);
        var padding = 10;
        ctx.beginPath();
        ctx.rect(-this.width/2 - padding, -this.height/2 + 2, this.width + 2*padding, this.height);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
});