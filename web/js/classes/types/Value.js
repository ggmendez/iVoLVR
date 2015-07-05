function Value(options) {

    for (var prop in options) {
        this[prop] = options[prop];
    }

    this.interpolateTo = function (anotherValue, steps) {

        var thisValue = this;

        if (thisValue.dataTypeProposition !== anotherValue.dataTypeProposition) {
            return null;
        }

        if (thisValue.isNumericData) {

            return interpolateNumbers(thisValue.number, anotherValue.number, steps);

        } else if (thisValue.isStringData) {

        } else if (thisValue.isDurationData) {

        } else if (thisValue.isDateAndTimeData) {

        } else if (thisValue.isColorData) {

            return interpolateColors(thisValue.color.toHex(), anotherValue.color.toHex(), steps);

        } else if (thisValue.isShapeData) {

        }

        return null;

    };

    this.equals = function (anotherValue) {

        var thisValue = this;

        if (LOG)
            console.log("Comparing:");

        if (LOG)
            console.log("thisValue:");
        if (LOG)
            console.log(thisValue);

        if (LOG)
            console.log("with this other value:");
        if (LOG)
            console.log(anotherValue);

        if (thisValue.dataTypeProposition !== anotherValue.dataTypeProposition) {
            if (LOG)
                console.log("uno");
            return false;
        }

        if (thisValue.isNumericData) {

            /*if (anotherValue.units !== thisValue.units) {
             if (LOG) console.log("dos");
             return false;
             }*/

            if (anotherValue.inPrefix === thisValue.inPrefix) {
                if (LOG)
                    console.log("tres");
                return (anotherValue.unscaledValue == thisValue.unscaledValue);
            }

            var convertedNumber = createNumericValue(anotherValue.unscaledValue, anotherValue.inPrefix, thisValue.inPrefix, thisValue.units);

            if (LOG)
                console.log("convertedNumber:");
            if (LOG)
                console.log(convertedNumber);

            if (LOG)
                console.log("thisValue:");
            if (LOG)
                console.log(thisValue);

            if (LOG)
                console.log("cuatro");

            return (convertedNumber.number === thisValue.unscaledValue);

        }

        return false;

    };

    this.getDisplayableString = function () {

        if (this.isNumericData) {
            var valueToShow = this.number % 1 === 0 ? this.number : this.number.toFixed(2);
//         return valueToShow + ' ' + this.outPrefix + this.units;
//         return this.number + ' ' + (this.outPrefix || '') + this.units;
            return this.number.toFixed(2) + ' ' + (this.outPrefix || '') + (this.units || '');
        } else if (this.isStringData) {
            return this.string;
        } else if (this.isDurationData) {
            return this.duration.as(this.outputUnits).toFixed(2) + ' ' + this.outputUnits;
        } else if (this.isDateAndTimeData) {
            return this.moment.format('DD/MMM/YYYY, HH:mm:ss');
        } else if (this.isColorData) {
            return this.color.toRgb();
        } else if (this.isShapeData) {
            return this.shape;
        }

    };

    this.convert = function (newDataTypeProposition) {

        var convertedValue = null;

        if (this.isDurationData) {

            if (newDataTypeProposition === 'isNumericData') {


                if (LOG)
                    console.log("Going to convert: ");
                if (LOG)
                    console.log(this);

                var units = this.outputUnits;
                var unscaledValue = this.duration.as(units);
                var inPrefix = null;
                var outPrefix = null;
                return createNumericValue(unscaledValue, inPrefix, outPrefix, units);

            } else if (newDataTypeProposition === 'isStringData') {

                return  new Value({isStringData: true, string: '' + this.duration.as(this.outputUnits).toFixed(2) + ' ' + this.outputUnits});

            }

        } else if (this.isShapeData) {

            if (newDataTypeProposition === 'isStringData') {

                return  new Value({isStringData: true, string: '' + this.shape});

            }

        } else if (this.isNumericData) {

            if (newDataTypeProposition === 'isStringData') {

                return  new Value({isStringData: true, string: '' + this.number + ' ' + this.outPrefix + this.units});

            }

        } else if (this.isColorData) {

            if (newDataTypeProposition === 'isStringData') {

                return  new Value({isStringData: true, string: '' + this.color.toRgb()});

            }

        }

        return convertedValue;

    };

    this.subtract = function (theOtherValue, outputPrefix) {

        var thisValue = this;

        if (thisValue.isNumericData) {

            if (theOtherValue.isNumericData) { /////////////// Subtracting NUMBERS ///////////////

                return subtractNumbers(thisValue, theOtherValue, outputPrefix);

            } else {
                return null;
            }

        } else if (thisValue.isDateAndTimeData) {

            if (theOtherValue.isDateAndTimeData) { /////////////// Subtracting DATES ///////////////

                var outputUnits = outputPrefix || 'milliseconds';

                return computeDateDifference(thisValue.moment, theOtherValue.moment, outputUnits);

            } else {
                return null;
            }

        } else if (thisValue.isColorData) {

        } else if (thisValue.isDurationData) {

        } else if (thisValue.isShapeData) {

        } else if (thisValue.isStringData) {

        } else {
            return null;
        }

    };

    this.clone = function () {
        if (this.isColorData) {
            return createColorValue(new fabric.Color(this.color.toRgb()));
        } else if (this.isDateAndTimeData) {
            return;
        } else if (this.isNumericData) {
            var unscaledValue = this.unscaledValue;
            var inPrefix = this.inPrefix;
            var outPrefix = this.outPrefix;
            var units = this.units;
            return createNumericValue(unscaledValue, inPrefix, outPrefix, units);
        } else if (this.isDurationData) {
            return createDurationValue(this.duration, this.outputUnits);
        } else if (this.isShapeData) {
            return;
        } else if (this.isStringData) {
            return createStringValue(this.string);
        } else {
            return null;
        }
    };

    this.getTypeProposition = function () {
        if (this.isColorData) {
            return "isColorData";
        } else if (this.isDateAndTimeData) {
            return "isDateAndTimeData";
        } else if (this.isNumericData) {
            return "isNumericData";
        } else if (this.isDurationData) {
            return "isDurationData";
        } else if (this.isShapeData) {
            return "isShapeData";
        } else if (this.isStringData) {
            return "isStringData";
        } else {
            return null;
        }
    };

    this.getDistanceTo = function (anotherValue) {

        if (this.getTypeProposition() !== anotherValue.getTypeProposition()) {
            return null;
        } else {
            if (this.isColorData) {
                return computeColorDistance(this, anotherValue);
            } else if (this.isDateAndTimeData) {
                return computeDateAndTimeDistance(this, anotherValue);
            } else if (this.isNumericData) {
                return computeNumericDistance(this, anotherValue);
            } else if (this.isDurationData) {
                return computeDurationDistance(this, anotherValue);
            } else if (this.isShapeData) {
                return computeShapeDistance(this, anotherValue);
            } else if (this.isStringData) {
                return computeStringDistance(this, anotherValue);
            } else {
                return null;
            }
        }
    };

    this.getDistancesTo = function (arrayOfValues) {
        var theValue = this;
        var arrayOfDistances = new Array();
        arrayOfValues.forEach(function (value) {
            var distance = theValue.getDistanceTo(value);
            arrayOfDistances.push(distance);
        });
        return arrayOfDistances;
    }
}

function subtractNumbers(value1, value2, outputPrefix) {
    var clonedValue2 = value2.clone();
    clonedValue2.number = -clonedValue2.number;
    return addTwoNumbers(value1, clonedValue2, outputPrefix);
}

function addNumericValues(numericValues, outputPrefix) {
    var result = numericValues[0];
    for (var i = 1; i < numericValues.length; i++) {
        result = addTwoNumbers(result, numericValues[i], outputPrefix);
    }
    return result;
}

function mixColors(colorValues) {
    
    var percent = 100 / colorValues.length;
    var percents = new Array();
    var colors = new Array();
    
    for (var i = 0; i < colorValues.length; i++) {
        var currentColor = colorValues[i].color;
        colors.push(new ColorMix.Color(getR(currentColor), getG(currentColor), getB(currentColor)));
        percents.push(percent);
    }
    
    var mixResult = ColorMix.mix(colors, percents);
    var fabricColor = new fabric.Color(rgb(mixResult.red, mixResult.green, mixResult.blue));
               
    return createColorValue(fabricColor);
    
}

function concatStrings (stringValues) {
    var concatenation = "";
    for (var i = 0; i < stringValues.length; i++) {
//        concatenation += stringValues[i].string;
        concatenation += stringValues[i].getDisplayableString();
    }
    return createStringValue(concatenation);
}

function addTwoNumbers(value1, value2, outputPrefix) {


    if (LOG)
        console.log("%c**********************************Trying to ADD: with the outputPrefix: " + outputPrefix, "background: red; color: white;");
    if (LOG)
        console.log(value1);
    if (LOG)
        console.log(value2);

    // Here, both values are numbers

    var units1 = value1.units.trim();
    var units2 = value2.units.trim();

    var number1 = value1.number;
    var number2 = value2.number;

    if (units1 === units2) {

        // The two numbers have are expressed in the same units

        var prefix1 = value1.outPrefix;
        var prefix2 = value2.outPrefix;

        if (prefix1 === prefix2) {

            // The two numbers have the same prefixes

            var unscaledValue = number1 + number2;

            return createNumericValue(unscaledValue, prefix1, prefix1, units1);

        } else {

            // We need to choose a common prefix (the first one, for instance); then, both magnitudes should be transformed to have the same scaling


//               var secondValue = null;

//               if (outputPrefix) {

            var firstValue = createNumericValue(number1, prefix1, outputPrefix, units1);
            var secondValue = createNumericValue(number2, prefix2, outputPrefix, units1);

            if (LOG)
                console.log("jhshshsh");

            return addValues(firstValue, secondValue);
//               }

//               if (units1 !== '') {
//                  secondValue = createNumericValue(number2, prefix2, prefix1, units1);
//                  return addValues(value1, secondValue);
//               } else {
//                  secondValue = createNumericValue(number1, prefix1, prefix2, units2);
//                  return addValues(value2, secondValue);
//               }





        }

    } else {

        // Units mismatching

    }


}

function subtractMoments(moment1, moment2) {
    return moment2.diff(moment1);
}

function addValues(value1, value2, outputPrefix) {

//   if (!value1 || !value2) {
//      return null;
//   }

    if (value1.isNumericData) {

        if (value2.isNumericData) {

            return addTwoNumbers(value1, value2, outputPrefix);

        }

    } else if (value1.isDateAndTimeData) {
       
       if (value2.isDurationData) {
          
          console.log("value1:");
          console.log(value1);
          
          console.log("value2:");
          console.log(value2);

            var theDate = value1.moment;
            var theDuration = value2.duration;
            
            var newDate = theDate.clone().add(theDuration);
            
            return createDateAndTimeValue(newDate);

        }

    }
    
    return null;
}



function subtractValues(value1, value2, outputPrefix) {

//   if (!value1 || !value2) {
//      return null;
//   }

    if (value1.isNumericData) {

        if (value2.isNumericData) {

            /////////////// Subtracting NUMBERS ///////////////
            return subtractNumbers(value1, value2, outputPrefix);

        }

    } else {

        if (value1.isDateAndTimeData) {

            if (value2.isDateAndTimeData) {

                /////////////// Subtracting DATES ///////////////
                var outputUnits = outputPrefix || 'milliseconds'; // when a previous value already exists, the new computed one should be expressed in the units of the existing one

                return computeDateDifference(value2.moment, value1.moment, outputUnits);

            }

        } else {

        }

    }
}

function createDefaultValueByTypeProposition(dataTypeProposition) {

    var value = null;

    if (dataTypeProposition === "isColorData") {

        value = createColorValue(new fabric.Color(rgb(112, 112, 112)));

    } else if (dataTypeProposition === "isStringData") {

        value = createStringValue('String');

    } else if (dataTypeProposition === "isNumericData") {

        value = createNumericValue(100);

    } else if (dataTypeProposition === "isDurationData") {

        var duration = moment.duration({
            milliseconds: 1,
            seconds: 1,
            minutes: 1,
            hours: 1,
            days: 0,
            weeks: 0,
            months: 0,
            years: 0
        });
        value = createDurationValue(duration, 'minutes');

    } else if (dataTypeProposition === "isDateAndTimeData") {

        var theMoment = moment();
        value = createDateAndTimeValue(theMoment);

    } else if (dataTypeProposition === "isShapeData") {

        var shape = CIRCULAR_MARK;
        value = createShapeValue(shape, null);

    }

    if (LOG)
        console.log("value:");
    if (LOG)
        console.log(value);

    return value;

}

function computeColorDistance(colorValue1, colorValue2) {
//    return computeDeltaE2000(colorValue1.color, colorValue2.color);
    return computeDeltaE2000(colorValue1.color, colorValue2.color);
}

function computeDateAndTimeDistance(dateAndTimeValue1, dateAndTimeValue2) {
    return null;
}

function computeNumericDistance(numericValue1, numericValue2) {
    return numericValue2.number - numericValue1.number;
}

function computeDurationDistance(durationValue1, durationValue2) {
    return null;
}

function computeShapeDistance(shapeValue1, shapeValue2) {
    return null;
}

function computeStringDistance(stringValue1, stringValue2) {
    return null;
}

