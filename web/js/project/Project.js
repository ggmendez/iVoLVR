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
                value = [7, 9, 1985]; // TODO: Deal with this value, as it should be an array in the options parameter
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

    // generating the ids of all the elements that are on the canvas
    var cont = 1;
    canvas.forEachObject(function (object) {
        if (!object.serialID) {
            object.serialID = cont;
        }
        cont++;
    });

    var root = createXMLElement('project');
    canvas.forEachObject(function (object) {

        if (object.serializableProperties && object.deserializer) {
            root.append(generateXMLNodeString(object));
        }

//        if (object.toXML) {
//            root.append(object.toXML());
//        }
    });
    var xmlText = (new XMLSerializer()).serializeToString(root[0]);
    return xmlText;
}

function loadProjectXML(XMLString) {

    // the logic that creates the instances according to the content of the XML file should be here

    var xmlDoc = $.parseXML(XMLString);
    var $xml = $(xmlDoc);


    var projectNode = $xml.find('project');

    console.log("projectNode:");
    console.log(projectNode);

    /*var $rootElement = $xml.first();
     console.log("$rootElement:");
     console.log($rootElement);
     console.log("$($rootElement):");
     console.log($($rootElement)); */

    var children = projectNode.children();
    console.log("children:");
    console.log(children);

    children.each(function () {
        var child = $(this);
//        console.log(child);
        console.log(this.tagName);
        console.log(child.text());

        createObjectFromXMLString(child);

    });

//    loadMarks($rootElement);

//    makeConnections($rootElement);

    setTimeout(function () {
        canvas.renderAll();
    }, 500);


}

function loadMarks($rootElement) {

    var markNodes = $rootElement.find('mark');

    console.log(markNodes.length + " marks found!");

    markNodes.each(function () {
        var $markNode = $(this);
        var markType = $markNode.find('type').text();
        addMarkToCanvasFromXML(markType, $markNode);
    });






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