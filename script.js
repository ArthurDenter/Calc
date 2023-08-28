let arrOperations = [];

function Input() {
  this.operator = "";
  this.trigger = "";
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
  let strHasComma = false;
  let resetDisplayString = false;
  let arrOfGui = [];
  let gui = new Input();

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
            setButtonInactive(arrOfGui[arrOfGui.length - 1].trigger);
          };
          if (resultDisplayString.innerHTML.length <= 12) {
            arrOperations.push(e.target.innerText);
            if (resultDisplayString.innerHTML !== "0") {
              if (resultDisplayString.innerHTML.length >= 9) resultDisplayString.style.fontSize = "4vmax";
              resultDisplayString.innerHTML += e.target.innerText;
              resultDisplayString.innerHTML = tSeparator(resultDisplayString.innerHTML);
            } else {
              resultDisplayString.innerHTML = e.target.innerText;
            };
          };
          break;
        case ",":
          if (resultDisplayString.innerHTML.length <= 12) {
            if (strHasComma === false) {
              arrOperations.push(".");
              resultDisplayString.innerHTML += e.target.innerText;
              strHasComma = true;
            };
          };
          break;
        case "-":
        case "+":
        case "÷":
        case "×":
          //gui related
          gui = new Input();
          resetDisplayString = true;
          gui.trigger = e.target.id;
          gui.operator = e.target.innerText;
          arrOfGui.push(gui);
          setButtonActive(e.target.id);

          //add operation to array
          arrOperations.push(`#${e.target.innerText}#`);
          //the first element in the array may only be a number
          if (arrOperations[0].match(/\#[×\-+÷]\#/)) {
            arrOperations.splice(0, 1);
            setButtonInactive(e.target.id);
          };
          //just one operation at a time
          if (arrOperations.length > 2) {
            if (arrOperations[arrOperations.length - 2].match(/\#[×\-+÷]\#/)) {
              arrOperations.splice((arrOperations.length - 2), 1);
              setButtonInactive(arrOfGui[arrOfGui.length - 2].trigger);
            }
          };
          //check whether there is a mathematical operation in the foreground. if so, calculate the last operation and output it.
          if (arrOperations.length > 3) {
            if (arrOperations[arrOperations.length - 3].match(/\#[×\-+÷]\#/)) {
              const re = /#/;
              let string = arrOperations.join("");
              let arr = string.split(re);
              if (arr[arr.length - 1] === "") arr.pop();
              let result = getResult(arr);
              resultDisplayString.innerHTML = tSeparator(result);
            };
          };
          break;
        case "=":
          const re = /#/;
          if (arrOperations[arrOperations.length - 1].match(/\#[×\-+÷]\#/)) arrOperations.splice((arrOperations.length - 1), 1);
          let string = arrOperations.join("");
          let arr = string.split(re);
          let result = getResult(arr);
          resultDisplayString.innerHTML = tSeparator(result);
          console.log(result);
          break;
        case "AC":
          break;
        case "±":
          let arrTemp = [];
          if (arrOperations.join("").search(/\#[×\-+÷]\#/) >= 0) {
            
          }
      };
      console.log(arrOperations);
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

