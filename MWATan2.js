// import data from "./valid_units.json" assert { type: "json" };
// reimpliment the import (although I had it working so I accomplished my goal.)
// Alternatively just ask Dr. Stewart if there's a way to get LiveServer to allow 
// imports

const data = [
    {
        "name": "radians",
      "symbol": "rad",
        "conversion": "1"
    },
  
    {
        "name": "degrees",
      "symbol": "\u00b0",
        "conversion": "180 / pi"
    },
    
    {
        "name": "binary radians",
      "symbol": "brad",
        "conversion": "256 / tau"
    },
    
    {
        "name": "gradians",
      "symbol": "grad",
        "conversion": "200 / pi"
    },
    
    {
        "name": "signs",
      "symbol": "30\u00b0",
        "conversion": "6 / pi"
    },
    
    {
        "name": "turns",
      "symbol": "turns",
        "conversion": "1 / tau"
    },  
    
    {
        "name": "octants",
      "symbol": "oct",
        "conversion": "4 / pi"
    },
    
    {
        "name": "sextants",
      "symbol": "60\u00b0'",
        "conversion": "3 / pi"
    },
    
    {
        "name": "quadrants",
      "symbol": "quad'",
        "conversion": "2 / pi"
    },
    
    {
        "name": "centirads",
      "symbol": "crad",
        "conversion": "100"
    },
    
    {
        "name": "millirads",
      "symbol": "mrad",
        "conversion": "1000"
    },
    
    {
        "name": "arcminutes",
      "symbol": "'",
        "conversion": "10800 / pi"
    },
    
    {
        "name": "arcseconds",
      "symbol": "\"",
        "conversion": "648000 / pi"
    },
    
    {
        "name": "hour angles",
      "symbol": "HA",
        "conversion": "24 / tau"
    },
    
    {
        "name": "diameter parts",
      "symbol": "\u2205",
        "conversion": "60"
    },
    
    {
        "name": "centesimal minutes",
      "symbol": "c MOA",
        "conversion": "20000 / pi"
    },
    
    {
        "name": "centesimal seconds",
      "symbol": "c SOA",
        "conversion": "2000000 / pi"
    }
  ];

const units = data;
const tau = Math.PI * 2;

// new addition: rethink form "submission"
document.getElementById("calc").addEventListener('click', function () {

    var x_coord = document.getElementById("x").value;
    var y_coord = document.getElementById("y").value;
    var unit = document.getElementById("unit").value;

    var unit = findUnit(unit);
    
    var symbol = unit["symbol"];
    var conversionFactor = unit["conversion"];

    conversionFactor = parseConversionFactor(conversionFactor);

    var result = calculate(x_coord, y_coord);

    unit = unit["name"];

    result = (unit === "radians") ? result : result * conversionFactor;

    alert(generateMessage());

    function calculate(x, y) {

        let result = (x != 0) ? Math.atan(y / x) : 0;

        if (x > 0)
            return result >= 0 ? result : result + tau;

        if (x < 0)
            return result + Math.PI;

        if (y > 0)
            return Math.PI / 2;

        if (y < 0)
            return 3 * Math.PI / 2;

        return undefined;
    }

    function findUnit(str) {

        for (var un of units) {


            if (str == un["name"]) {
                console.log("found");
                return un;
            }
        }
    }

    function parseConversionFactor(str) {

        let re = /^\d+$/;

        if (re.test(str))
            return Number(str);

        let stripped = str.replace(/\s+/g, "");

        console.log(`STRIPPED: ${stripped}\n`)

        re = /[+\-*\/]/;

        let operatorLocation = stripped.search(re);
        let operator = stripped[operatorLocation];

        console.log(`OPERATOR: ${operator}`);

        let subStr1 = stripped.substring(0, operatorLocation);
        let subStr2 = stripped.substring(operatorLocation + 1, stripped.length);

        console.log(`sub1: ${subStr1}`);
        console.log(`sub2: ${subStr2}`);

        re = /^\d+$/;

        let operandL = handleConstants(subStr1);
        let operandR = handleConstants(subStr2);

        console.log(`OPERAND 1: ${operandL}`);
        console.log(`OPERAND 2: ${operandR}`);

        return performOperation(operandL, operandR, operator);

        function handleConstants(str) {

            if (re.test(str)) {
                console.log("true");
                return Number(str);
            }

            if (str === "pi")
                return Math.PI;

            if (str === "tau")
                return Math.PI * 2;
        }

        function performOperation(operand1, operand2, operator) {

            switch (operator) {

                case "+":
                    return operand1 + operand2;

                case "-":
                    return operand1 - operand2;

                case "*":
                    return operand1 * operand2;

                case "/":
                    return operand1 / operand2;
            }
        }
    }

    function generateMessage() {
        return `The standard angle produced with terminal ray passing through the point ` +
               `(${x_coord}, ${y_coord}) is ${result}${(unit == "degrees") ? symbol : " " + symbol}`;
    }
});

// var form = document.getElementById("coords");

// form.addEventListener("submit", submission, true);