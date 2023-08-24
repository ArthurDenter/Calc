
let calculate = {
  a: 0,
  b: 0,
  ["+"]: function () { return this.a + this.b },
  ["-"]: function () { return this.a - this.b },
  ["÷"]: function () { return this.a / this.b },
  ["×"]: function () { return this.a * this.b }
};

function getResult(string) {
  let arrOfChar = string.split(" ");
  calculate.a = +(arrOfChar[0]);
  calculate.b = +(arrOfChar[2]);
  return calculate[arrOfChar[1]]();
}

function init() {
  let arrOfButtons = document.querySelectorAll("button");
  let resultDisplayString = document.querySelector(".result_display_string");
  let onlyOneComma = false;

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
          if (resultDisplayString.innerHTML.length <= 12) {
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
          if (onlyOneComma === false) {
            resultDisplayString.innerHTML += e.target.innerText;
            onlyOneComma = true;
          }
          break;
        case "+":

      };
    });
  }
};

function tSeparator(str) {
  //add thousands separator
  let separatorCount = 0;
  let arrBeforeComma, arrayAfterComma = [];
  let isCommaWithin = false;

  //check if a comma is within string
  isCommaWithin = str.includes(",");
  if (isCommaWithin) {
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

