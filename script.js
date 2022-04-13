const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const deleteBtn = document.querySelector(".delete");
const resetBtn = document.querySelector(".reset");
const screen = document.querySelector(".screen");
const themeSelector = document.querySelector(".radio-buttons");
const theme_sfx = new Audio("./audio/switch-sfx.mp3");
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
let result = "";
let operator = "";
let lastOperation = "";
let display = "";
let decimalAlreadyUsed = false;

//-----------------------------NUMBERS-------------------------------------//
numberBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (operand === "" && operator === "") {
      display = "";
      result = "";
    }

    if (e.target.innerText === "." && !decimalAlreadyUsed) {
      decimalAlreadyUsed = true;
    } else if (e.target.innerText === "." && decimalAlreadyUsed) {
      return;
    }
    operand += e.target.innerText;
    display += e.target.innerText;
    screen.innerText = display;
  });
});

//-----------------------------OPERATORS-------------------------------------//
operatorBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (display[display.length - 1] === ".") return;

    if (operand === "" && result === "") return;

    if (lastOperation) {
      operand = calculate();
      decimalAlreadyUsed = false;
      lastOperation = "";
      result = "";
      display = `${operand}${operator}`;
      screen.innerText = display;
    }

    operator = e.target.innerHTML;
    decimalAlreadyUsed = false;
    lastOperation = operator;

    result = calculate();
    operand = "";
    display = `${result}${operator}`;
    screen.innerText = display;
  });
});

//-----------------------------RESET--------------------------------//

resetBtn.addEventListener("click", () => {
  operand = "";
  result = "";
  operator = "";
  lastOperation = "";
  display = "";
  screen.innerText = "";
  decimalAlreadyUsed = false;
});

//---------------------------EQUALS--------------------------------//
equalsBtn.addEventListener("click", () => {
  if (!operator) return;
  if (display[display.length - 1] === ".") return;
  result = calculate();
  display = result;
  screen.innerText = display;
  operand = "";
  operator = "";
  lastOperation = "";
});

//----------------------------DELETE-------------------------------//
deleteBtn.addEventListener("click", () => {
  if (display[display.length - 1] === operator) {
    operator = "";
    lastOperation = "";
  } else {
    operand = operand.slice(0, -1);
  }

  display = display.slice(0, -1);
  screen.innerHTML = display;
});

//----------------------------CALCULATE-----------------------------//
function calculate() {
  if (operand === "" && result === "") return "";

  switch (operator) {
    case "+":
      return result === "" ? operand : Number(result) + Number(operand);

    case "-":
      return result === "" ? operand : Number(result) - Number(operand);

    case "x":
      if (result === "" || operand === "") {
        if (result === "") return operand;
        else if (operand === "") return result;
      }
      return (Number(result) * Number(operand)).toFixed(2);

    case "/":
      if (result === "" || operand === "") {
        if (result === "") return operand;
        else if (operand === "") return result;
      }

      const temp = Number(result) / Number(operand);
      if (isNaN(temp)) return "undefined";
      else return temp.toFixed(2);
  }
}
