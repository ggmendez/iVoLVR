var connectableElements = null;
var pendingConnections = null;

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
    addAttributeWithValue(root, "connectorsHidden", canvas.connectorsHidden);

    var reversedObjects = new Array();

    // generating the ids of all the elements that are on the canvas
    var cont = 1;
    canvas.forEachObject(function (object) {
        reversedObjects.push(object);
        if (object.setXmlIDs) {
            cont = object.setXmlIDs(cont);
        }
    });

    reversedObjects = reversedObjects.reverse();

    reversedObjects.forEach(function (object) {
        if (!object.nonSerializable && object.toXML) {
            root.append(object.toXML());
        }
    });

    var xmlText = (new XMLSerializer()).serializeToString(root[0]);

    return formatXml(xmlText);
//    return xmlText;
}

function processCanvasXMLNode(canvasNode) {

//    pendingConnections = new Array();
//    connectableElements = new Array();

    pendingConnections = new Object();
    connectableElements = new Object();

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

    var connectorsHidden = canvasNode.attr('connectorsHidden') === "true";
    canvas.connectorsHidden = connectorsHidden;
    if (connectorsHidden) {
        $('#toggleConnectorsVisibilityActivatorLink').html('<i id="checkConnectorsVisibility" class="icon-check-empty"></i> Show connectors');
    } else {
        $('#toggleConnectorsVisibilityActivatorLink').html('<i id="checkConnectorsVisibility" class="icon-check"></i> Show connectors');
    }

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
//            console.log(value);
            canvas.setZoom(value);
            canvas.absolutePan(new fabric.Point(tempPanX, tempPanY));
        },
        onComplete: function () {
            canvas.setZoom(newZoom);
            canvas.absolutePan(new fabric.Point(newPanX, newPanY));
        }
    });

    var connectors = new Array();
    var marks = new Array();
    var locators = new Array();
    var images = new Array();

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

            marks.push(child);

        } else if (tagName === "operator") {

            createOperatorFromXMLNode(child);

        } else if (tagName === "visualValue") {

            createVisualVariableFromXMLNode(child);

        } else if (tagName === "numericFunction") {

            createNumericFunctionFromXMLNode(child);

        } else if (tagName === "numberGenerator") {

            createNumberGeneratorFromXMLNode(child);

        } else if (tagName === "verticalCollection") {

            createVerticalCollectionFromXMLNode(child);

        } else if (tagName === "numericCollectionGenerator") {

            createNumericCollectionGeneratorFromXMLNode(child);

        } else if (tagName === "importedImage") {

            images.push(child);

        } else if (tagName === "extractor") {

            var type = child.attr('type');
            if (type === SAMPLER_VIXOR) {

                createColorSamplerFromXMLNode(child);

            } else if (type === TEXT_RECOGNIZER) {

                createTextRecogniserFromXMLNode(child);

            }

        } else if (tagName === "locator") {

            locators.push(child);

        } else if (tagName === "mapper") {

            createMapperFromXMLNode(child);

        } else if (tagName === "connector") {

//            connectors.push(child);

            var fromID = child.attr('from');
            var toID = child.attr('to');

            var firstLevelArray = pendingConnections[fromID];

            if (!firstLevelArray) {
                pendingConnections[fromID] = new Array();
            }

            pendingConnections[fromID][toID] = child;
//            
//            pendingConnections.push(child);

        }

    });


    images.forEach(function (imageNode) {
        var image = importImageFromXMLNode(imageNode);
    });

    console.log("%c" + "All IMAGES loaded and added to the canvas", "background: #0afff9; color: black;");

    locators.forEach(function (locatorNode) {
        var locator = createLocatorFromXMLNode(locatorNode);
    });

    marks.forEach(function (markNode) {
        var mark = createMarkFromXMLNode(markNode);
    });

    console.log("%c" + "All COLOR SAMPLERS loaded and added to the canvas", "background: #0afff9; color: black;");

    // the same happens for connectors (for instance, connections to position visual properties of marks)
//    connectors.forEach(function (connectorNode) {
//        createConnectorFromXMLNode(connectorNode);
//    });

    var totalPendingConnections = getSize(pendingConnections);
    console.log("%c" + "There are " + totalPendingConnections + " PENDING connections!", "font-weight: bold; background: #0afff9; color: black;");

}

//function executePendingConnections(objectXmlID) {
//    
//    
//    console.log("%c" + "Executing pending connections for element with ID: " + objectXmlID, "background: rgb(81,195,183); color: white;");
//
//    if (!pendingConnections || pendingConnections.length === 0) {
//        console.log("%c" + "There are not pending connections at the moment!!!: " + objectXmlID, "background: rgb(81,195,183); color: white;");
//        return;
//    }
//
//    
//    var cont = 0;
//
//    for (var i = pendingConnections.length - 1; i >= 0; i--) { // We iterate in reverse, as the removal of elements from the array will change its size
//        var connectorNode = pendingConnections[i];
//
//        var fromID = Number(connectorNode.attr('from'));
//        var toID = Number(connectorNode.attr('to'));
//
//        if (objectXmlID === fromID || objectXmlID === toID) {
//            if (createConnectorFromXMLNode(connectorNode)) { // We check if the connection was succesful. Only in that case the connection is removed from the array
//                fabric.util.removeFromArray(pendingConnections, connectorNode);
//                cont++;
//            }
//        }
//    }
//
//    console.log("%c" + cont + " connections executed sucessfully for element with ID: " + objectXmlID, "background: rgb(81,195,183); color: white;");
//
//    var totalPendingConnections = pendingConnections.length;
//    console.log("%c" + "There are STILL " + totalPendingConnections + " connections!", "background: #0afff9; color: black;");
//}



function executePendingConnections(objectXmlID) {

    // outgoingConnections
    var fromID = objectXmlID;
    var outgoingConnections = pendingConnections[fromID];
    for (var toID in outgoingConnections) {
        var connection = outgoingConnections[toID];
        var success = createConnectorFromXMLNode(connection);
        if (success) {
            delete outgoingConnections[toID];
        }
    }

    for (var fromID in pendingConnections) {
        var incommingConnections = pendingConnections[fromID];
        for (var toID in incommingConnections) {
            if (toID === objectXmlID) {
                var connection = incommingConnections[toID];
                var success = createConnectorFromXMLNode(connection);
                if (success) {
                    delete incommingConnections[toID];
                }
            }
        }
    }

    var totalPendingConnections = getSize(pendingConnections);
    console.log("%c" + "There are " + totalPendingConnections + " PENDING connections!", "font-weight: bold; background: #0afff9; color: black;");

    console.log("%c" + "Current state of connectableElements pool:", "background: rgb(255,25,47); color: white;");
    console.log(connectableElements);



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


//function makeConnections($rootElement) {
//
//    var connectorNodes = $rootElement.find('connector');
//
//    console.log(connectorNodes.length + " CONNECTORS found!");
//
//    connectorNodes.each(function () {
//
//        var $connectorNode = $(this);
//
//        var sourceID = Number($connectorNode.find('source').text());
//        var destinationID = Number($connectorNode.find('destination').text());
//
//        var value = $connectorNode.find('destination').text(); // TODO: the value could be a composite data, so, this should be another structured XML element
//        var color = $connectorNode.find('arrowColor').text();
//
////        var sourceElement = getElementBySerialID(sourceID);
////        var destinationElement = getElementBySerialID(destinationID);
//        var sourceElement = getFabricElementByXmlID(sourceID);
//        var destinationElement = getFabricElementByXmlID(destinationID);
//
//        console.log("sourceElement:");
//        console.log(sourceElement);
//
//        console.log("destinationElement:");
//        console.log(destinationElement);
//
//        var sourceAttribute = $connectorNode.find('sourceAttribute').text();
//        if (sourceAttribute) {
//            sourceElement = sourceElement.getVisualPropertyByAttributeName(sourceAttribute);
//        }
//
//        var destinationAttribute = $connectorNode.find('destinationAttribute').text();
//        if (destinationAttribute) {
//            destinationElement = destinationElement.getVisualPropertyByAttributeName(destinationAttribute);
//        }
//
//
//        console.log("sourceElement:");
//        console.log(sourceElement);
//
//        console.log("destinationElement:");
//        console.log(destinationElement);
//
//        if (sourceElement && destinationElement) {
//            connectElements(sourceElement, destinationElement, value, color);
//        }
//    });
//
//}

function getFabricElementByXmlID(xmlID) {
    var canvasObjects = canvas.getObjects();
    for (var i = 0; i < canvasObjects.length; i++) {
        var object = canvas.item(i);
        if (object.xmlID === xmlID) {
            return object;
        } else {

            if (object.isMark) { // If this object is a mark, we also have to look in its position visual properties and, if it is compressed in its all other one

                if (object.xVisualProperty.xmlID === xmlID) {
                    return object.xVisualProperty;
                } else if (object.yVisualProperty.xmlID === xmlID) {
                    return object.yVisualProperty;
                } else if (object.isCompressed) {

                    var visualProperties = object.visualProperties;

                    for (var j = 0; j < visualProperties.length; j++) {
                        var visualProperty = visualProperties[j];
                        if (visualProperty && visualProperty.xmlID === xmlID) {
                            return visualProperty;
                        }

                    }



                }


            } else if (object.isVixor) { // If this object is a mark, we also have to look in its position visual properties and, if it is compressed in its all other one

                if (object.isCompressed) {

                    var visualProperties = object.visualProperties;

                    for (var j = 0; j < visualProperties.length; j++) {
                        var visualProperty = visualProperties[j];
                        if (visualProperty && visualProperty.xmlID === xmlID) {
                            return visualProperty;
                        }

                    }

                }


            } else if (object.isVerticalCollection && object.isCompressed) {

                var visualValues = object.visualValues;
                for (var j = 0; j < visualValues.length; j++) {
                    var visualValue = visualValues[j];
                    if (visualValue && visualValue.xmlID === xmlID) {
                        return visualValue;
                    }
                }

            } else if (object.isNumericCollectionGenerator && object.isCompressed) {

                var visualProperties = object.visualProperties;

                for (var j = 0; j < visualProperties.length; j++) {
                    var visualProperty = visualProperties[j];

                    if (visualProperty && visualProperty.xmlID === xmlID) {
                        return visualProperty;
                    }

                }
            }
        }
    }

    console.log("%c" + "!!!!!!!!!!!! xmlID " + xmlID + " not FOUND!!!", "background: red; color: yellow;");

    return null;
}