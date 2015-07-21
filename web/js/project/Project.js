function createObjectFromXMLString(XMLNode) {

    var options = {};
    var deserializerFunction = null;

    console.log(XMLNode[0]);
    var children = XMLNode.children();
    children.each(function () {

        var child = $(this);

//        console.log(child);
//        console.log(this.tagName);
//        console.log(child.text());
//
//        console.log("child.attr('type'):");
//        console.log();

        var property = this.tagName;
        var value = child.text();

        if (property.includes(".")) {
            var parts = property.split(".");
            property = parts[1]; // the name after the dot is the name of the attribute
        }

        if (property === "deserializer") {

            console.log("deserializerFunction: " + value);
            deserializerFunction = eval(value);

            console.log("deserializerFunction:");
            console.log(deserializerFunction);

        } else {

            var type = child.attr('type');

            if (type === "number") {
                value = Number(value);
            } else if (type === "boolean") {
                value = value === "true";
            } else if (type === "array") {

                value = new Array();

                console.log("%c" + "An array has been found as child of a saved object!", "background: #9cf6f6; color: black;");
//                console.log("this:");
//                console.log(this);

                var elements = child.children('element');
                elements.each(function () {
                    var xmlElement = $(this);
                    var elementType = xmlElement.attr('type');
                    if (elementType === "number") {
                        value.push(Number(xmlElement.text()));
                    }


                });




//                console.log("elements:");
//                console.log(elements);

            }

            options[property] = value;
        }





    });

    console.log("options:");
    console.log(options);

    deserializerFunction(options);

}

function generateXMLNodeString(object) {


    var serializableProperties = object.serializableProperties;
    var XMLNode = createXMLElement(object.xmlNodeName);
    appendElementWithValue(XMLNode, 'deserializer', object.deserializer.name);
    appendElementWithValue(XMLNode, 'serialID', object.serialID);
    serializableProperties.forEach(function (property) {

        if (property.includes(".")) {

            var parts = property.split(".");
            var property1 = parts[0];
            var property2 = parts[1];

            var childObject = object[property1];

            print("childObject:", "#a77337", "white");
            console.log(childObject);

            print("property1: " + property1, "#a7377c", "white");
            print("property2: " + property2, "#a7377c", "white");

            if (childObject) {

                var value = childObject[property2];
                if (value) {
                    appendElementWithValue(XMLNode, property, value);
                }

            }

        } else {
            appendElementWithValue(XMLNode, property, object[property]);
        }



    });

    var xmlText = (new XMLSerializer()).serializeToString(XMLNode[0]);
    return xmlText;
}

function generateProjectXML() {

    var root = createXMLElement('iVoLVR_Canvas');

    addAttributeWithValue(root, "zoom", canvas.getZoom());
    addAttributeWithValue(root, "panX", -canvas.viewportTransform[4]);
    addAttributeWithValue(root, "panY", -canvas.viewportTransform[5]);

    // generating the ids of all the elements that are on the canvas
    var cont = 1;
    canvas.forEachObject(function (object) {
        if (!object.serialID) {
            object.serialID = cont;
        }
        cont++;
    });



    canvas.forEachObject(function (object) {
        if (!object.nonSerializable && object.toXML) {
            root.append(object.toXML());
        }
    });







    /*canvas.forEachObject(function (object) {
     
     if (!object.nonSerializable && object.serializableProperties && object.deserializer) {
     root.append(generateXMLNodeString(object));
     }
     
     
     });*/


    var xmlText = (new XMLSerializer()).serializeToString(root[0]);

    return formatXml(xmlText);
//    return xmlText;
}

function processCanvasXMLNode(canvasNode) {
    if (LOG) {
        console.log("canvasNode:");
        console.log(canvasNode);
    }

    var currentZoom = canvas.getZoom();
    var currentPanX = -canvas.viewportTransform[4];
    var currentPanY = -canvas.viewportTransform[5];

    var newZoom = Number(canvasNode.attr('zoom'));
    var newPanX = Number(canvasNode.attr('panX'));
    var newPanY = Number(canvasNode.attr('panY'));

//    canvas.setZoom(newZoom);
//    canvas.absolutePan(new fabric.Point(panX, panY));

    var children = canvasNode.children();

    if (LOG) {
        console.log("children:");
        console.log(children);
    }

    console.log("currentZoom: " + currentZoom);
    console.log("newZoom: " + newZoom);
    
    var duration = 1300;
    
    var tempPanX = currentPanX;
    var tempPanY = currentPanY;
    fabric.util.animate({
        startValue: currentPanX,
        endValue: newPanX,
        duration: duration,
        onChange: function (value) {
            tempPanX = value;
        }
    });
    fabric.util.animate({
        startValue: currentPanY,
        endValue: newPanY,
        duration: duration,
        onChange: function (value) {
            tempPanY = value;
        }
    });

    fabric.util.animate({
        startValue: currentZoom,
        endValue: newZoom,
        duration: duration,
        onChange: function (value) {
            console.log(value);
            canvas.setZoom(value);
            canvas.absolutePan(new fabric.Point(tempPanX, tempPanY));
        },
        onComplete: function () {
            canvas.setZoom(newZoom);
            canvas.absolutePan(new fabric.Point(newPanX, newPanY));
        }
    });



//     Refreshing the canvas so that all the loaders do not do it
//    fabric.util.animate({
//        duration: 1300,
//        onChange: refresherFunction,
//        onComplete: refresherFunction
//    });

    children.each(function () {

        var child = $(this);
        var tagName = this.tagName;

//        console.log(child);
//        console.log(this.tagName);
//        console.log(child.text());

        if (tagName === "mark") {

            createMarkFromXMLNode(child);

        } else if (tagName === "operator") {

            createOperatorFromXMLNode(child);

        } else if (tagName === "visualValue") {

            createVisualVariableFromXMLNode(child);

        }



    });
}


function openProjectFile(fileName) {
    $.get(fileName, function (xmlDoc) {
        var $xml = $(xmlDoc);
        var canvasNode = $xml.find('iVoLVR_Canvas');
        processCanvasXMLNode(canvasNode);
    });
}

function loadProjectXML(XMLString) {
    var xmlDoc = $.parseXML(XMLString);
    var $xml = $(xmlDoc);
    var canvasNode = $xml.find('iVoLVR_Canvas');
    processCanvasXMLNode(canvasNode);
}


function makeConnections($rootElement) {

    var connectorNodes = $rootElement.find('connector');

    console.log(connectorNodes.length + " CONNECTORS found!");

    connectorNodes.each(function () {

        var $connectorNode = $(this);

        var sourceID = Number($connectorNode.find('source').text());
        var destinationID = Number($connectorNode.find('destination').text());

        var value = $connectorNode.find('destination').text(); // TODO: the value could be a composite data, so, this should be another structured XML element
        var color = $connectorNode.find('arrowColor').text();

        var sourceElement = getElementBySerialID(sourceID);
        var destinationElement = getElementBySerialID(destinationID);

        console.log("sourceElement:");
        console.log(sourceElement);

        console.log("destinationElement:");
        console.log(destinationElement);

        var sourceAttribute = $connectorNode.find('sourceAttribute').text();
        if (sourceAttribute) {
            sourceElement = sourceElement.getVisualPropertyByAttributeName(sourceAttribute);
        }

        var destinationAttribute = $connectorNode.find('destinationAttribute').text();
        if (destinationAttribute) {
            destinationElement = destinationElement.getVisualPropertyByAttributeName(destinationAttribute);
        }


        console.log("sourceElement:");
        console.log(sourceElement);

        console.log("destinationElement:");
        console.log(destinationElement);

        if (sourceElement && destinationElement) {
            connectElements(sourceElement, destinationElement, value, color);
        }

    });

}

function getElementBySerialID(serialID) {
    var canvasObjects = canvas.getObjects();
    for (var i = 0; i < canvasObjects.length; i++) {
        var object = canvas.item(i);
        if (object.serialID === serialID) {
            return object;
        }
    }
    return null;
}