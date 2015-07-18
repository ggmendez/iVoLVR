var CircularMark = fabric.util.createClass(fabric.Circle, {
    type: 'circularMark',
    isCircularMark: true,
    serializableProperties: ['left', 'top', 'fill', 'colorForStroke', 'radius', 'label', 'isCompressed'],
    deserializer: addCircularMarkToCanvas,
    /*toXML: function () {
     var theMark = this;
     
     var XMLMark = createXMLElement('mark');
     
     appendElementWithValue(XMLMark, 'type', CIRCULAR_MARK);
     appendElementWithValue(XMLMark, 'serialID', theMark.serialID);
     appendElementWithValue(XMLMark, 'left', theMark.left);
     appendElementWithValue(XMLMark, 'top', theMark.top);
     appendElementWithValue(XMLMark, 'fill', theMark.fill);
     appendElementWithValue(XMLMark, 'stroke', theMark.colorForStroke);
     appendElementWithValue(XMLMark, 'radius', theMark.radius);
     appendElementWithValue(XMLMark, 'label', theMark.label);
     appendElementWithValue(XMLMark, 'isCompressed', theMark.isCompressed);
     
     var xmlText = (new XMLSerializer()).serializeToString(XMLMark[0]);
     
     return xmlText;
     },*/

    initialize: function (options) {
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

        this.createVariables();

        if (!options.withoutLabel) {
            this.createIText();
        }

        this.set('shape', CIRCULAR_MARK);

        this.set('stroke', options.colorForStroke || options.stroke);
        this.set('colorForStroke', options.colorForStroke || this.stroke);

        this.createRectBackground();

        this.specificProperties.push({attribute: "radius", readable: true, writable: true, types: ['number'], updatesTo: ['area'], dataTypeProposition: 'isNumericData', value: createNumericValue(this.radius)});
        this.specificProperties.push({attribute: "area", readable: true, writable: true, types: ['number'], updatesTo: ['radius'], dataTypeProposition: 'isNumericData', value: createNumericValue(this.area)});

        this.createVisualProperties();
        this.createPositionProperties();

        this.setCoreVisualPropertiesValues();

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
    setProperty: function (property, propertyValue, theVisualProperty, shouldAnimate) {
        var theMark = this;
        if (property == 'shape') {
            if (propertyValue == theMark.shape) {
                return;
            }

            var waitingTime = 250;
            if (theMark.isCompressed) {
                waitingTime = 0;
            }

            setTimeout(function () {
                changeMarkShape(theMark, propertyValue);
            }, waitingTime);
        } else if (property == 'label') {

            this.setLabelProperty(propertyValue);

        } else if (property == 'fill') {

            this.setColorProperty(propertyValue);

        } else if (property == 'radius' || property == 'area') {

            var numericValue = propertyValue.number;

            var changedVisualProperty = theMark.getVisualPropertyByAttributeName(property);
            var propertiesToUpdate = changedVisualProperty.updatesTo;

            if (property == 'area') {

                if (LOG)
                    console.log("%cModifying " + changedVisualProperty.attribute + ". Value: " + numericValue, "background:green; color:white;");

                theMark.area = numericValue; // This value has to be updated as fabric does not know its link with the radius attribute

                // Updating all the attributes that are affected by the modifications in the area property

                propertiesToUpdate.forEach(function (attributeName) {
                    var visualProperty = theMark.getVisualPropertyByAttributeName(attributeName);
                    var updatedValue = theMark.computeUpdatedValueOf(property, numericValue, attributeName);

                    if (LOG)
                        console.log("%cAfecting " + attributeName + ". Value: " + updatedValue, "background:red; color:white;");

                    visualProperty.outConnectors.forEach(function (outConnector) {
                        outConnector.setValue(updatedValue, false, false);
                    });
                });

                property = 'radius';
                numericValue = Math.sqrt(numericValue / Math.PI);

            } else if (property == 'radius') {

                if (LOG)
                    console.log("Modifying RADIUS. Value: " + numericValue);


                theMark.area = Math.PI * numericValue * numericValue;

                // Updating all the attributes that are affected by the modifications in the area property
                propertiesToUpdate.forEach(function (attributeName) {
                    var visualProperty = theMark.getVisualPropertyByAttributeName(attributeName);
                    var updatedValue = theMark.computeUpdatedValueOf(property, numericValue, attributeName);

                    if (LOG)
                        console.log("%cAfecting " + attributeName + ". Value: " + updatedValue, "background:red; color:white;");

                    visualProperty.outConnectors.forEach(function (outConnector) {
                        outConnector.setValue(updatedValue, false, false);
                    });
                });

            }

            var easing = fabric.util.ease['easeOutBack'];

            if (shouldAnimate) {
                theMark.animateProperty(property, numericValue, 500, easing);
            } else {
                theMark.changeProperty(property, numericValue);
            }

        }

        theMark.setCoords();

        var theParentObject = theMark.parentObject;
        if (theParentObject && theParentObject.isLocator) {
            computeUntransformedProperties(theMark);
            repositionWidget(theParentObject, theMark);
        }



        if (!shouldAnimate) {
            canvas.renderAll();
        }



    },
    positionLabel: function () {

        var groupLeft = 0;
        var groupTop = 0;
        var groupScaleX = 1;
        var groupScaleY = 1;

        this.setCoords();

        if (this.group) {
            groupLeft = this.group.left;
            groupTop = this.group.top;
            groupScaleX = this.group.getScaleX();
            groupScaleY = this.group.getScaleY();
        }

        var objectCenter = this.getCenterPoint();
        var boundingRect = this.getBoundingRect();
        if (this.scaleX == this.scaleY) {

            var markRealRadius = this.radius * this.scaleX;
            if (markRealRadius < this.propertiesRadius) {
                markRealRadius = this.propertiesRadius;
            }
            var wh = 2 * markRealRadius;
            boundingRect = {top: objectCenter.y - markRealRadius, left: objectCenter.x - markRealRadius, width: wh, height: 2 * this.radius * this.scaleY};
//            boundingRect = {top: objectCenter.y - markRealRadius, left: objectCenter.x - markRealRadius, width: wh, height: boundingRect.height};
        }

        var boundingRectCenterBottom = new fabric.Point(this.left, objectCenter.y + boundingRect.height / 2);
        boundingRectCenterBottom.y += this.labelGap;
        this.iText.text = this.label;
        this.iText.left = groupLeft + this.left * groupScaleX;
        this.iText.top = groupTop + boundingRectCenterBottom.y;

        this.iText.setCoords();

    },
    _render: function (ctx) {
        this.renderLocationLines(ctx);
        this.callSuper('_render', ctx);
        if (this.iText) {
            this.positionLabel();
        }
    },
    generateOptionsForShape: function (newShapeType) {

        var theMark = this;

        var options = {
            left: theMark.left,
            top: theMark.top,
            fill: theMark.fill,
            stroke: theMark.colorForStroke || theMark.stroke,
            colorForStroke: theMark.colorForStroke || theMark.stroke,
            label: theMark.label,
            angle: theMark.angle,
        };

        if (newShapeType === CIRCULAR_MARK) {

            options.area = theMark.area;

        } else if (newShapeType === RECTANGULAR_MARK) {

            options.width = rectangular_mark_default_width;
            options.height = theMark.area / options.width;

        } else if (newShapeType === ELLIPTIC_MARK || newShapeType === SQUARED_MARK) {

            options.area = theMark.area;

        } else if (newShapeType === FATFONT_MARK) {

            options.fontFamily = 'Miguta';
            options.number = Math.round(theMark.area / 100);
            options.fontSize = Math.round(theMark.radius * 2);
            options.stroke = '';

        } else if (newShapeType === FILLEDPATH_MARK || newShapeType === SVGPATHGROUP_MARK) {

            options.targetWidth = theMark.radius * 2;
            options.targetHeight = theMark.radius * 2;

        }

        return options;

    }

});
Mark.call(CircularMark.prototype);


function addCircularMarkToCanvas(options) {

    var circularMark = new CircularMark(options);
    canvas.add(circularMark);

    if (options.animateAtBirth) {
        if (circularMark.radius > 0) {
            circularMark.animateBirth(options.markAsSelected, null, null, options.doNotRefreshCanvas);
        }
    }

    if (!options.notAssociateEvents) {
        circularMark.associateEvents(circularMark);
    } else {
        circularMark.evented = false;
        circularMark.selectable = false;
    }


//   if (LOG) console.log("circularMark.radius: " + circularMark.radius);
//   if (LOG) console.log("circularMark.width: " + circularMark.width);

    return circularMark;
}

function addCircularMarkToCanvasFromXML($markNode) {

    console.log("adding CIRCULAR mark to canvas from XML");

    // numeric properties
    var serialID = Number($markNode.find('serialID').text());

    console.log("serialID:");
    console.log(serialID);

    var left = Number($markNode.find('left').text());
    var top = Number($markNode.find('top').text());
    var radius = Number($markNode.find('radius').text());

    // text fields
    var fill = $markNode.find('fill').text();
    var stroke = $markNode.find('stroke').text();
    var label = $markNode.find('label').text();

    // logic values
    var isCompressed = $markNode.find('isCompressed').text() === 'true';

    console.log("serialID: " + serialID);
    console.log("left: " + left);
    console.log("top: " + top);
    console.log("fill: " + fill);
    console.log("stroke: " + stroke);
    console.log("radius: " + radius);
    console.log("label: " + label);
    console.log("isCompressed: " + isCompressed);

    var options = {
        serialID: serialID,
        left: left,
        top: top,
        fill: fill,
        stroke: stroke,
        radius: radius,
        label: label || '',
        markAsSelected: false,
        animateAtBirth: isCompressed
    };

    var circularMark = addCircularMarkToCanvas(options);

    if (!isCompressed) {
        circularMark.expand(true);
    }


    return circularMark;
}
