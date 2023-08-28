

function MathString(){
  this.arrMathOperations = [];
  this.mathStringForCalculation = "";
  this.mathStringForOutput = ""; 
}

function Operator() {
  this.mathOperator = "";
  this.triggerObject = "";
}

let calculation = {
  a: null,
  b: null,
  ["+"]: function () { return this.a + this.b },
  ["-"]: function () { return this.a - this.b },
  ["÷"]: function () { return this.a / this.b },
  ["×"]: function () { return this.a * this.b }
};

function getResult(arr) {
  for (let i = 0; i <= arr.length - 2; i++) {
    if (arr.length >= 3) {
      if (arr[i].match(/[×\-+÷](?!\d)/)) {
        calculation.a = Number(arr[i - 1]);
        calculation.b = Number(arr[i + 1]);
        let interimResult = calculation[arr[i]]();
        arr.splice(0, 3, interimResult.toString());
        console.log(interimResult);
        getResult(arr);
      };
    };
  };
  //Check whether the number of decimal places is greater than 12, then display as an e function.
  if (!Number.isInteger(Number(arr))) {
    if (arr[0].length >= 12) {
      // let arrSplit = arr[0].split(".");
      // if (arrSplit[1].length >= 10) {
      //   arr = expo(arrSplit[1], 4).toString();
      // };
      arr = expo(arr[0], 4).toString();
    };
  };
  return arr[0];
};

function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

function swapCommaPoint(str){
  return str.replace(/\./i, ",");
}

function setButtonActive(id) {
  let button = document.getElementById(id);
  button.style.backgroundColor = "#D5573B";
  button.style.color = "#C6ECAE";
};

function setButtonInactive(id) {
  let button = document.getElementById(id);
  button.style.backgroundColor = "#94C9A9";
  button.style.color = "#777DA7";
}

function init() {
  let arrOfButtons = document.querySelectorAll("button");
  let resultDisplayString = document.querySelector(".result_display_string");
  let resetDisplayString = false;
  let arrOfGui = [];
  let gui = new Operator();
  let mathStr = new MathString();

  resultDisplayString.innerHTML = "0";
  for (let button of arrOfButtons) {
    button.addEventListener("click", (e) => {
      switch (e.target.innerText) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          if (resetDisplayString === true) {
            resultDisplayString.innerHTML = "";
            mathStr.mathStringForCalculation = "";
            resetDisplayString = false;
            setButtonInactive(arrOfGui[arrOfGui.length - 1].triggerObject);
          };
          if (resultDisplayString.innerHTML.length <= 12) {
            // mathStr.arrMathOperations.push(e.target.innerText);
            if (resultDisplayString.innerHTML !== "0") {
              if (resultDisplayString.innerHTML.length >= 9) resultDisplayString.style.fontSize = "4vmax";
              mathStr.mathStringForCalculation += e.target.innerText;
              resultDisplayString.innerHTML += e.target.innerText;
              mathStr.mathStringForOutput += e.target.innerText
              resultDisplayString.innerHTML = tSeparator(resultDisplayString.innerHTML);
              mathStr.mathStringForOutput = tSeparator(resultDisplayString.innerHTML);
            } else {
              resultDisplayString.innerHTML = e.target.innerText;
              mathStr.mathStringForOutput = e.target.innerText;
              mathStr.mathStringForCalculation = e.target.innerText;
            };
          };
          break;
        case ",":
          if (resultDisplayString.innerHTML.length <= 12) {
            if (mathStr.mathStringForCalculation.includes(".") === false) {
              mathStr.mathStringForCalculation += ".";
              mathStr.mathStringForOutput += ",";
              resultDisplayString.innerHTML = mathStr.mathStringForOutput;
            };
          };
          break;
        case "-":
        case "+":
        case "÷":
        case "×":
          //gui related
          gui = new Operator();
          resetDisplayString = true;
          gui.triggerObject = e.target.id;
          gui.mathOperator = e.target.innerText;
          arrOfGui.push(gui);
          setButtonActive(e.target.id);
          //add operands to array
          mathStr.arrMathOperations.push(mathStr.mathStringForCalculation);
          //add operation to array
          mathStr.arrMathOperations.push(`#${e.target.innerText}#`);
          //the first element in the array may only be a number
          if (mathStr.arrMathOperations[0].match(/\#[×\-+÷]\#/)) {
            mathStr.arrMathOperations.splice(0, 1);
            setButtonInactive(e.target.id);
          };
          //just one operation at a time
          if (mathStr.arrMathOperations.length > 2) {
            if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 2].match(/\#[×\-+÷]\#/)) {
              mathStr.arrMathOperations.splice((mathStr.arrMathOperations.length - 2), 1);
              setButtonInactive(arrOfGui[arrOfGui.length - 2].triggerObject);
            }
          };
          //check whether there is a mathematical operation in the foreground. if so, calculate the last operation and output it.
          if (mathStr.arrMathOperations.length > 3) {
            if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 3].match(/\#[×\-+÷]\#/)) {
              const re = /#/;
              let string = mathStr.arrMathOperations.join("");
              let arr = string.split(re);
              if (arr[arr.length - 1] === "") arr.pop();
              let result = getResult(arr);
              mathStr.mathStringForCalculation = result;
              mathStr.mathStringForOutput = tSeparator(swapCommaPoint(result));
              resultDisplayString.innerHTML = mathStr.mathStringForOutput;
            };
          };
          break;
        case "=":
          //add operands to array
          mathStr.arrMathOperations.push(mathStr.mathStringForCalculation);
          
          const re = /#/;
          if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 1].match(/\#[×\-+÷]\#/)) mathStr.arrMathOperations.splice((mathStr.arrMathOperations.length - 1), 1);
          let string = mathStr.arrMathOperations.join("");
          let arr = string.split(re);
          let result = getResult(arr);
          mathStr.mathStringForCalculation = result;
          mathStr.arrMathOperations.length = 0;
          mathStr.mathStringForOutput = tSeparator(swapCommaPoint(result));
          resultDisplayString.innerHTML = mathStr.mathStringForOutput;
          console.log(result);
          break;
        case "AC":
          break;
        case "±":
          let tempStr = "";
          mathStr.mathStringForCalculation = tempStr.concat("-", mathStr.mathStringForCalculation);
          mathStr.mathStringForOutput = tempStr.concat("-", mathStr.mathStringForOutput);
          resultDisplayString.innerHTML = mathStr.mathStringForOutput;
      };
      console.log(`arrMathOperations: ${mathStr.arrMathOperations}`);
      console.log(`mathStringForCalculation: ${mathStr.mathStringForCalculation}`);
      console.log(`mathStr.mathStringForOutput: ${mathStr.mathStringForOutput}`);
    });
  };
};

function tSeparator(str) {
  //add thousands separator
  let separatorCount = 0;
  let arrBeforeComma, arrayAfterComma = [];
  let strHasComma = false;

  //check if a comma is within string
  strHasComma = str.includes(",");
  if (strHasComma) {
    arrBeforeComma = str.match(/\d+(?=[\-\.,])/g).join("").split("");
    arrayAfterComma = str.match(/,\s*([0-9]+)/g);
  } else {
    arrBeforeComma = str.match(/([\-0-9])/g);
  };
  let lenOfArrBeforeComma = arrBeforeComma.length;
  arrBeforeComma.reverse();
  for (let i = 0; i <= (lenOfArrBeforeComma - 1); i++) {
    if ((i > 0) && (i % 3 === 0)) {
      arrBeforeComma.splice(i + separatorCount, 0, ".");
      separatorCount++;
    };
  };
  arrBeforeComma.reverse();
  str = arrBeforeComma.join("") + arrayAfterComma.join("");
  return str;
};

init();

