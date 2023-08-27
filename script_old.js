let arrOperations = [];

function Input(isA = false, isB = false) {
  this.operand = "";
  this.operator = "";
  this.trigger = "";
  this.isA = isA;
  this.isB = isB;
}

let calculation = {
  operation: "",
  trigger: "",
  a: null,
  b: null,
  x: null,
  ["+"]: function () { this.x = this.a + this.b },
  ["-"]: function () { this.x = this.a - this.b },
  ["÷"]: function () { this.x = this.a / this.b },
  ["×"]: function () { this.x = this.a * this.b }
};

function getResult(string) {
  let arrOfChar = string.split(" ");
  calculation.a = +(arrOfChar[0]);
  calculation.b = +(arrOfChar[2]);
  return calculation[arrOfChar[1]]();
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
  let resetDisplayString = false;
  let arrOfButtons = document.querySelectorAll("button");
  let resultDisplayString = document.querySelector(".result_display_string");
  let calculationString = "0";
  let hasComma = false;
  let index = 0;

  let control = new Input(true, false);

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
            calculationString = "";
            resetDisplayString = false;
            setButtonInactive(control.trigger);
          };

          if (resultDisplayString.innerHTML.length <= 12) {
            if (resultDisplayString.innerHTML !== "0") {
              if (resultDisplayString.innerHTML.length >= 9) resultDisplayString.style.fontSize = "4vmax";
              resultDisplayString.innerHTML += e.target.innerText;
              calculationString += e.target.innerText;
              resultDisplayString.innerHTML = tSeparator(resultDisplayString.innerHTML);
            } else {
              resultDisplayString.innerHTML = e.target.innerText;
              calculationString = e.target.innerText;
            };
          };
          break;
        case ",":
          if (resultDisplayString.innerHTML.length <= 12) {
            if (hasComma === false) {
              resultDisplayString.innerHTML += e.target.innerText;
              calculationString += ".";
              hasComma = true;
            };
          };
          break;
        case "-":
        case "+":
        case "÷":
        case "×":
        case "=":
          if (control.isA === true){
            if (calculation.a === null) calculation.a = Number(calculationString);
            resetDisplayString = true;
            setButtonActive(e.target.id);
            control.trigger = e.target.id;
            control.operator = e.target.innerText;
            control.isA = false;
            control.isB = true;
          } else if (control.isB === true){
            let operator = control.operator;
            calculation.b = Number(calculationString);
            resetDisplayString = true;
            setButtonActive(e.target.id);
            control.trigger = e.target.id;
            control.operator = e.target.innerText;
            control.isA = true;
            control.isB = false;
            if (e.target.innerText !== "="){
              calculation[operator]();
              calculation.a = calculation.x;
              resultDisplayString.innerHTML = calculation.a;
              control.isA = false;
              control.isB = true;
            }else{
              calculation[operator]();
              resultDisplayString.innerHTML = calculation.x;
              setButtonInactive(e.target.id);
            };
          };

          
          for (const [key, value] of Object.entries(control)) {
            console.log(`${key}: ${value}`);
          };
          console.log("-------------")
          for (const [key, value] of Object.entries(calculation)) {
            console.log(`${key}: ${value}`);
          };
      };
    });
  };
};

function tSeparator(str) {
  //add thousands separator
  let separatorCount = 0;
  let arrBeforeComma, arrayAfterComma = [];
  let hasComma = false;

  //check if a comma is within string
  hasComma = str.includes(",");
  if (hasComma) {
    arrBeforeComma = str.match(/\d+(?=[\.,])/g).join("").split("");
    arrayAfterComma = str.match(/,\s*([0-9]+)/g);
  } else {
    arrBeforeComma = str.match(/([0-9])/g);
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

