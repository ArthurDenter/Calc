

function MathString() {
  this.arrMathOperations = [];
  this.mathStringForCalculation = "";
  this.mathStringForOutput = "";
  this.maxNumberOfDigits = 12;

  this.updateMathStrings = function (digit) {
    let tempDisplayStr = "";
    if (digit === ",") {
      this.mathStringForCalculation += ".";
    } else {
      this.mathStringForCalculation += digit;
    };
    tempDisplayStr = this.mathStringForOutput + digit;
    this.mathStringForOutput = tSeparator(tempDisplayStr);
  };
};

function Operator() {
  this.mathOperator = "";
  this.triggerObject = "";
};

let calculation = {
  a: null,
  b: null,
  ["+"]: function () { return this.a + this.b },
  ["-"]: function () { return this.a - this.b },
  ["÷"]: function () { return this.a / this.b },
  ["×"]: function () { return this.a * this.b }
};

let interface = {
  ["+"]: "button_plus",
  ["-"]: "button_minus",
  ["/"]: "button_div",
  ["÷"]: "button_div",
  ["*"]: "button_mul",
  ["×"]: "button_mul",
  ["±"]: "button_free2",
  ["%"]: "button_free3",
  ["="]: "button_equ",
  [","]: "button_comma",
  ["0"]: "button_0",
  ["1"]: "button_1",
  ["2"]: "button_2",
  ["3"]: "button_3",
  ["4"]: "button_4",
  ["5"]: "button_5",
  ["6"]: "button_6",
  ["7"]: "button_7",
  ["8"]: "button_8",
  ["9"]: "button_9"
}

function getResult(arr) {
  try {
    for (let i = 0; i <= arr.length - 2; i++) {
      if (arr.length >= 3) {
        if (arr[i].match(/[×\-+÷](?!\d)/)) {
          calculation.a = Number(arr[i - 1]);
          calculation.b = Number(arr[i + 1]);
          let interimResult = calculation[arr[i]]();
          arr.splice(0, 3, interimResult.toString());
          getResult(arr);
        };
      };
    };
  }
  catch (error) {
    alert(error);
  };
  if (arr[0] < Number.MAX_VALUE){
    return arr[0];
  } else {
    return Infinity;
  }
};

function maxNumberOfDigits(str, maxNumberOfDigits){
  //Check whether the number of decimal places is greater than mathStr.maxNumberOfDigits, then display as an e function.
    if (str.length >= maxNumberOfDigits) {
      return expo(str, 4).toString();
    }else{
      return str;
    };
};

function backspaceStr(str) {
  return str.slice(0, str.length - 1);
}

function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

function swapCommaPoint(str) {
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

function tSeparator(str) {
  //add thousands separator
  let separatorCount = 0;
  let arrBeforeComma, arrAfterComma = [];
  let arrWithoutMinus = [];
  let strHasComma = false;
  let strHasMinus = false;

  //check if a comma is within string
  strHasComma = str.includes(",");
  if (strHasComma) {
    arrBeforeComma = str.match(/\d+(?=[\-\.,])/g).join("").split("");
    arrAfterComma = str.match(/,\s*([0-9]+)/g);
    if (arrAfterComma === null) arrAfterComma = [""];
  } else {
    arrBeforeComma = str.match(/([\-0-9])/g);
  };
  strHasMinus = arrBeforeComma.includes("-");
  if (strHasMinus) {
    arrWithoutMinus = arrBeforeComma.join("").match(/([0-9])/g);
  } else {
    arrWithoutMinus = [...arrBeforeComma];
  }

  let lenOfArrWithoutMinus = arrWithoutMinus.length;
  arrWithoutMinus.reverse();
  for (let i = 0; i <= (lenOfArrWithoutMinus - 1); i++) {
    if ((i > 0) && (i % 3 === 0)) {
      arrWithoutMinus.splice(i + separatorCount, 0, ".");
      separatorCount++;
    };
  };
  arrWithoutMinus.reverse();
  if (strHasMinus) {
    return "-" + arrWithoutMinus.join("") + arrAfterComma.join("");
  }
  else {
    return arrWithoutMinus.join("") + arrAfterComma.join("");
  };
};

function updateDisplay(str) {

};

function init() {
  let arrOfButtons = document.querySelectorAll("button");
  let resultDisplayString = document.querySelector(".result_display_string");
  let resetDisplayString = false;
  let arrOfGui = [];
  let gui = new Operator();
  let mathStr = new MathString();

  resultDisplayString.innerHTML = "0";
  for (let button of arrOfButtons) {
    button.addEventListener("keydown", (e) => {
      console.log(e);
      switch (e.code) {
        case "Digit0":
        case "Digit1":
        case "Digit2":
        case "Digit3":
        case "Digit4":
        case "Digit5":
        case "Digit6":
        case "Digit7":
        case "Digit8":
        case "Digit9":
        case "Numpad0":
        case "Numpad1":
        case "Numpad2":
        case "Numpad3":
        case "Numpad4":
        case "Numpad5":
        case "Numpad6":
        case "Numpad7":
        case "Numpad8":
        case "Numpad9":
          if (resetDisplayString === true) {
            resultDisplayString.innerHTML = "";
            mathStr.mathStringForOutput = "";
            mathStr.mathStringForCalculation = "";
            resetDisplayString = false;
            if (arrOfGui.length > 0) {
              setButtonInactive(arrOfGui[arrOfGui.length - 1].triggerObject);
              arrOfGui[arrOfGui.length - 1].triggerObject = "";
              arrOfGui[arrOfGui.length - 1].mathOperator = "";
            };
          };
          if (resultDisplayString.innerHTML.length <= mathStr.maxNumberOfDigits) {
            if (resultDisplayString.innerHTML !== "0") {
              if (resultDisplayString.innerHTML.length >= 9) resultDisplayString.style.fontSize = "4vmax";
              mathStr.updateMathStrings(e.key);
              resultDisplayString.innerHTML = mathStr.mathStringForOutput;
            } else {
              mathStr.mathStringForOutput = e.key;
              mathStr.mathStringForCalculation = e.key;
              resultDisplayString.innerHTML = mathStr.mathStringForOutput;
            };
          };
          break;
        case "NumpadDecimal":
        case "Comma":
          if (resultDisplayString.innerHTML.length <= mathStr.maxNumberOfDigits) {
            if (mathStr.mathStringForCalculation.includes(".") === false) {
              mathStr.updateMathStrings(e.key);
              resultDisplayString.innerHTML = mathStr.mathStringForOutput;
            };
          };
          break;
        case "NumpadEnter":
          gui = new Operator();
          resetDisplayString = true;
          gui.triggerObject = interface[e.key];
          gui.mathOperator = e.key;
          arrOfGui.push(gui);
          //add operands to array
          mathStr.arrMathOperations.push(mathStr.mathStringForCalculation);
          const re = /#/;
          if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 1].match(/\#[×\-+÷]\#/)) mathStr.arrMathOperations.splice((mathStr.arrMathOperations.length - 1), 1);
          let string = mathStr.arrMathOperations.join("");
          let arr = string.split(re);
          let result = getResult(arr);
          if (result !== "Infinity") {
            result = maxNumberOfDigits(result, mathStr.maxNumberOfDigits);
            mathStr.mathStringForCalculation = result;
            //clear array
            mathStr.arrMathOperations.length = 0;
            if (result.match(/\d+[,\.]\d+e[-+]\d+/g)){
              mathStr.mathStringForOutput = swapCommaPoint(result);
            }else{
              mathStr.mathStringForOutput = tSeparator(swapCommaPoint(result));
            };
          } else {
            mathStr.mathStringForOutput = "Error: Div/0";
            //clear array
            mathStr.arrMathOperations.length = 0;
          };
          resultDisplayString.innerHTML = mathStr.mathStringForOutput;
          resetDisplayString = true;
          break;
        case "Backspace":
          if (resetDisplayString === false) {
            mathStr.mathStringForCalculation = backspaceStr(mathStr.mathStringForCalculation);
            mathStr.mathStringForOutput = backspaceStr(mathStr.mathStringForOutput);
            resultDisplayString.innerHTML = mathStr.mathStringForOutput;
          };
          break;
        case "NumpadAdd":
        case "NumpadSubtract":
        case "NumpadMultiply":
        case "NumpadDivide":
        case "Slash":
        case "BracketRight":
          //gui related
          gui = new Operator();
          resetDisplayString = true;
          gui.triggerObject = interface[e.key];
          if (e.code === "NumpadDivide") gui.mathOperator = "÷"
          else if (e.code === "NumpadMultiply") gui.mathOperator = "×"
          else gui.mathOperator = e.key;
          arrOfGui.push(gui);
          setButtonActive(interface[e.key]);
          //add operands to array
          mathStr.arrMathOperations.push(mathStr.mathStringForCalculation);
          //add operation to array
          if (e.code === "NumpadDivide") mathStr.arrMathOperations.push(`#÷#`)
          else if (e.code === "NumpadMultiply") mathStr.arrMathOperations.push(`#×#`)
          else mathStr.arrMathOperations.push(`#${e.key}#`);
          //the first element in the array may only be a number
          if (mathStr.arrMathOperations[0].match(/\#[×\-+÷]\#/)) {
            mathStr.arrMathOperations.splice(0, 1);
            setButtonInactive(interface[e.key]);
          };
          //just one operation at a time
          if (arrOfGui.length > 1) {
            if (arrOfGui[arrOfGui.length - 2].mathOperator.match(/[×\-+÷]/)) {
              mathStr.arrMathOperations.splice((mathStr.arrMathOperations.length - 3), 3, "#" + arrOfGui[arrOfGui.length - 1].mathOperator + "#");
              setButtonInactive(arrOfGui[arrOfGui.length - 2].triggerObject);
            };
          };
          //check whether there is a mathematical operation in the foreground. if so, calculate the last operation and output it.
          if (mathStr.arrMathOperations.length > 3) {
            if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 3].match(/\#[×\-+÷]\#/)) {
              const re = /#/;
              let string = mathStr.arrMathOperations.join("");
              let arr = string.split(re);
              if (arr[arr.length - 1] === "") arr.pop();
              let result = getResult(arr);
              if (result !== "Infinity") {
                mathStr.mathStringForCalculation = result;
                mathStr.mathStringForOutput = tSeparator(swapCommaPoint(result));
              } else {
                mathStr.mathStringForOutput = "Error: Div/0";
                //clear array
                mathStr.arrMathOperations.length = 0;
                resetDisplayString = true;
              };
              resultDisplayString.innerHTML = mathStr.mathStringForOutput;
            };
          };
          break;
      };
      console.log(`arrMathOperations: ${mathStr.arrMathOperations}`);
      console.log(`mathStringForCalculation: ${mathStr.mathStringForCalculation}`);
      console.log(`mathStr.mathStringForOutput: ${mathStr.mathStringForOutput}`);
      console.log(`gui.mathOperator: ${gui.mathOperator}`);
    });
  };
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
            mathStr.mathStringForOutput = "";
            resetDisplayString = false;
            if (arrOfGui.length > 0) {
              setButtonInactive(arrOfGui[arrOfGui.length - 1].triggerObject);
              arrOfGui[arrOfGui.length - 1].triggerObject = "";
              arrOfGui[arrOfGui.length - 1].mathOperator = "";
            };
          };
          if (resultDisplayString.innerHTML.length <= mathStr.maxNumberOfDigits) {
            if (resultDisplayString.innerHTML !== "0") {
              if (resultDisplayString.innerHTML.length >= 9) resultDisplayString.style.fontSize = "4vmax";
              mathStr.updateMathStrings(e.target.innerText);
              resultDisplayString.innerHTML = mathStr.mathStringForOutput;
            } else {
              resultDisplayString.innerHTML = e.target.innerText;
              mathStr.mathStringForOutput = e.target.innerText;
              mathStr.mathStringForCalculation = e.target.innerText;
            };
          };
          break;
        case ",":
          if (resultDisplayString.innerHTML.length <= mathStr.maxNumberOfDigits) {
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
          if (arrOfGui.length > 1) {
            if (arrOfGui[arrOfGui.length - 2].mathOperator.match(/[×\-+÷]/)) {
              mathStr.arrMathOperations.splice((mathStr.arrMathOperations.length - 3), 3, "#" + arrOfGui[arrOfGui.length - 1].mathOperator + "#");
              setButtonInactive(arrOfGui[arrOfGui.length - 2].triggerObject);
            };
          };
          //check whether there is a mathematical operation in the foreground. if so, calculate the last operation and output it.
          if (mathStr.arrMathOperations.length > 3) {
            if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 3].match(/\#[×\-+÷]\#/)) {
              const re = /#/;
              let string = mathStr.arrMathOperations.join("");
              let arr = string.split(re);
              if (arr[arr.length - 1] === "") arr.pop();
              let result = getResult(arr);
              if (result !== "Infinity") {
                mathStr.mathStringForCalculation = result;
                mathStr.mathStringForOutput = tSeparator(swapCommaPoint(result));
              } else {
                mathStr.mathStringForOutput = "Error: Div/0";
                //clear array
                mathStr.arrMathOperations.length = 0;
                resetDisplayString = true;
              };
              resultDisplayString.innerHTML = mathStr.mathStringForOutput;
            };
          };
          break;
        case "=":
          gui = new Operator();
          resetDisplayString = true;
          gui.triggerObject = e.target.id;
          gui.mathOperator = e.target.innerText;
          arrOfGui.push(gui);
          //add operands to array
          mathStr.arrMathOperations.push(mathStr.mathStringForCalculation);
          const re = /#/;
          if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 1].match(/\#[×\-+÷]\#/)) mathStr.arrMathOperations.splice((mathStr.arrMathOperations.length - 1), 1);
          let string = mathStr.arrMathOperations.join("");
          let arr = string.split(re);
          let result = getResult(arr);
          if (result !== "Infinity") {
            result = maxNumberOfDigits(result, mathStr.maxNumberOfDigits);
            mathStr.mathStringForCalculation = result;
            //clear array
            mathStr.arrMathOperations.length = 0;
            if (result.match(/\d+[,\.]\d+e[-+]\d+/g)){
              mathStr.mathStringForOutput = swapCommaPoint(result);
            }else{
              mathStr.mathStringForOutput = tSeparator(swapCommaPoint(result));
            };
          } else {
            mathStr.mathStringForOutput = "Error: Div/0";
            //clear array
            mathStr.arrMathOperations.length = 0;
          };
          resultDisplayString.innerHTML = mathStr.mathStringForOutput;
          resetDisplayString = true;
          break;
        case "%":
          if (mathStr.arrMathOperations.length < 2) {
            calculation.a = mathStr.mathStringForCalculation;
            calculation.b = 100;
            mathStr.mathStringForOutput = calculation["÷"]();
            resultDisplayString.innerHTML = mathStr.mathStringForOutput;
          } else {
            if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 1].match(/\#[\-+]\#/)) {
              mathStr.mathStringForOutput += e.target.innerText;
              mathStr.mathStringForCalculation = ((mathStr.mathStringForCalculation * mathStr.arrMathOperations[mathStr.arrMathOperations.length - 2]) / 100).toString();
              resultDisplayString.innerHTML = mathStr.mathStringForOutput;
            } else if (mathStr.arrMathOperations[mathStr.arrMathOperations.length - 1].match(/\#[×÷]\#/)) {
              mathStr.mathStringForOutput += e.target.innerText;
              mathStr.mathStringForCalculation = (mathStr.mathStringForCalculation / 100).toString();
              resultDisplayString.innerHTML = mathStr.mathStringForOutput;
            };
          };
          break;
        case "C":
          location.reload();
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
      console.log(`gui.mathOperator: ${gui.mathOperator}`);
    });
  };
};

init();

