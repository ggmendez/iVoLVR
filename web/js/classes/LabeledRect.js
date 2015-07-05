var LabeledRect = fabric.util.createClass(fabric.Rect, {
    type: 'labeledRect',
    initialize: function (options) {
        options || (options = {});

        this.callSuper('initialize', options);
        this.set('originX', 'center');
        this.set('originY', 'center');
        this.set('label', options.label || '');
        this.set('labelColor', options.labelColor || '#FFF');


    },
    toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            label: this.get('label')
        });
    },
    _render: function (ctx) {
        this.callSuper('_render', ctx);

//    ctx.font = '20px Helvetica';
        ctx.font = '16px Courier New';
        ctx.fillStyle = this.labelColor;
        ctx.textAlign = "center";
        ctx.moveTo(0, 0);
//    ctx.fillText(this.label, -this.width/2, -this.height/2 + 20);
        ctx.fillText(this.label, 0, this.height / 2 - 16);
    }
});