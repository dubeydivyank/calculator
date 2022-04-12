const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const deleteBtn = document.querySelector(".delete");
const resetBtn = document.querySelector(".reset");
const display1 = document.querySelector(".screen-1");
const display2 = document.querySelector(".screen-2");
const themeSelector = document.querySelector(".radio-buttons");
const theme_sfx = new Audio("./audio/switch-sfx.mp3");
const key_sfx = new Audio("./audio/keys-sfx.mp3");
//------------------------------CHANGE THEME------------------------------------//
themeSelector.addEventListener("click", (e) => {
  theme_sfx.play();
  if (e.target.checked) {
    switch (e.target.id) {
      case "1":
        document.querySelector("body").classList = "theme-1";
        break;
      case "2":
        document.querySelector("body").classList = "theme-2";
        break;
      case "3":
        document.querySelector("body").classList = "theme-3";
        break;
      default:
        document.querySelector("body").classList = "theme-1";
    }
  }
});

//------------------------------------------------------------------//
let operand = "";
let res = "";
let operator = "";
let lastOperation = "";
let display = "";

let decimalAlreadyUsed = false;

//------------------------------------------------------------------//
numberBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !decimalAlreadyUsed) {
      decimalAlreadyUsed = true;
    } else if (e.target.innerText === "." && decimalAlreadyUsed) {
      return;
    }
    operand += e.target.innerText;
    display2.innerText = display + operand;
  });
});

//------------------------------------------------------------------//
operatorBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (lastOperation) {
      operand = calculate();
      decimalAlreadyUsed = false;

      lastOperation = "";
      display = operand + operator;
      display2.innerText = display;
      // operand = "";
      res = "";
    }
    switch (e.target.id) {
      case "plus":
        operator = "+";
        break;
      case "minus":
        operator = "-";
        break;
      case "divide":
        operator = "/";
        break;
      case "multiply":
        operator = "*";
        break;
    }
    if (operand === "" && res === "") return;
    decimalAlreadyUsed = false;

    lastOperation = operator;
    res = calculate();
    display = res + operator;
    display2.innerText = display;
    operand = "";
  });
});

//-----------------------------RESET--------------------------------//

resetBtn.addEventListener("click", () => {
  operand = "";
  res = "";
  operator = "";
  lastOperation = "";
  display = "";
  display2.innerText = 0;
});

//---------------------------EQUALS--------------------------------//
equalsBtn.addEventListener("click", () => {});

//----------------------------DELETE-------------------------------//
deleteBtn.addEventListener("click", () => {});

//------------------------------------------------------------------//

//----------------------------CALCULATE-----------------------------//
function calculate() {
  if (operand === "" && res === "") return "";
  switch (operator) {
    case "+":
      return res === "" ? operand : Number(res) + Number(operand);
    case "-":
      return res === "" ? operand : Number(res) - Number(operand);
    case "*":
      if (res === "" || operand === "") {
        if (res === "") return operand;
        else if (operand === "") return res;
      }
      return Number(res) * Number(operand);
    // return res === "" || operand === ""
    //   ? operand
    //   : Number(res) * Number(operand);
    case "/":
      if (res === "" || operand === "") {
        if (res === "") return operand;
        else if (operand === "") return res;
      }
      return Number(res) / Number(operand);
    // return res === "" ? operand : Number(res) / Number(operand);
  }
}
