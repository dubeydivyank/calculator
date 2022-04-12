const theme = document.querySelector(".radio-buttons");
const screen = document.querySelector(".screen");
const keypress = document.querySelector(".keypad-container");
const theme_sfx = new Audio("./audio/switch-sfx.mp3");
const key_sfx = new Audio("./audio/keys-sfx.mp3");
theme_sfx.preload = "auto";
key_sfx.preload = "auto";

//------------------------------CHANGE THEME------------------------------------//
theme.addEventListener("click", (e) => {
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

//------------------------------CALCULATOR LOGIC--------------------------------//
let operand = "";
let operation = "";
let resultSoFar = "";
let displayOnScreen = "";

keypress.addEventListener("click", (e) => {
  key_sfx.play();
  //if we press a number right after '=', it will reset the previously calculated result
  if (
    e.target.id !== "delete" &&
    e.target.id !== "reset" &&
    e.target.id !== "equal" &&
    e.target.id !== "plus" &&
    e.target.id !== "minus" &&
    e.target.id !== "divide" &&
    e.target.id !== "multiply"
  ) {
    if (
      operation === "" &&
      operand === "" &&
      displayOnScreen === "" &&
      resultSoFar !== ""
    ) {
      resultSoFar = "";
    }
  }
  switch (e.target.id) {
    case "one":
      operand += "1";
      displayOnScreen += 1;
      screen.innerHTML = displayOnScreen;
      break;
    case "two":
      operand += "2";
      displayOnScreen += 2;
      screen.innerHTML = displayOnScreen;
      break;
    case "three":
      operand += "3";
      displayOnScreen += 3;
      screen.innerHTML = displayOnScreen;
      break;
    case "four":
      operand += "4";
      displayOnScreen += 4;
      screen.innerHTML = displayOnScreen;
      break;
    case "five":
      operand += "5";
      displayOnScreen += 5;
      screen.innerHTML = displayOnScreen;
      break;
    case "six":
      operand += "6";
      displayOnScreen += 6;
      screen.innerHTML = displayOnScreen;
      break;
    case "seven":
      operand += "7";
      displayOnScreen += 7;
      screen.innerHTML = displayOnScreen;
      break;
    case "eight":
      operand += "8";
      displayOnScreen += 8;
      screen.innerHTML = displayOnScreen;
      break;
    case "nine":
      operand += "9";
      displayOnScreen += 9;
      screen.innerHTML = displayOnScreen;
      break;
    case "zero":
      operand += "0";
      displayOnScreen += 0;
      screen.innerHTML = displayOnScreen;
      break;
    case "dot":
      operand += ".";
      displayOnScreen += ".";
      screen.innerHTML = displayOnScreen;
      break;
    //-----------------------------ADD----------------------------------//
    case "plus":
      if (operation === "") {
        resultSoFar = calculate(resultSoFar, operand, "add");
      } else {
        resultSoFar = calculate(resultSoFar, operand, operation);
      }
      displayOnScreen = resultSoFar + " + ";
      operation = "add";
      operand = "";
      screen.innerHTML = displayOnScreen;
      break;
    //----------------------------SUBTRACT------------------------------//
    case "minus":
      if (operation === "") {
        if (resultSoFar === "") {
          resultSoFar = operand;
        } else {
          resultSoFar = calculate(resultSoFar, operand, "substract");
        }
      } else {
        resultSoFar = calculate(resultSoFar, operand, operation);
      }
      displayOnScreen = resultSoFar + " - ";
      operation = "substract";
      operand = "";
      screen.innerHTML = displayOnScreen;
      break;
    //-----------------------------MULTIPLY-----------------------------//
    case "multiply":
      if (operation === "") {
        if (resultSoFar === "") {
          resultSoFar = operand;
        } else {
          resultSoFar = calculate(resultSoFar, 1, "multiply");
        }
      } else {
        resultSoFar = calculate(resultSoFar, operand, operation);
      }
      displayOnScreen = resultSoFar + " x ";
      operation = "multiply";
      operand = "";
      screen.innerHTML = displayOnScreen;
      break;
    //-----------------------------DIVIDE-------------------------------//
    case "divide":
      if (operation === "") {
        if (resultSoFar === "") {
          resultSoFar = operand;
        } else {
          resultSoFar = calculate(resultSoFar, 1, "divide");
        }
      } else {
        resultSoFar = calculate(resultSoFar, operand, operation);
      }
      displayOnScreen = resultSoFar + " / ";
      operation = "divide";
      operand = "";
      screen.innerHTML = displayOnScreen;
      break;
    //------------------------------EQUAL-------------------------------//
    case "equal":
      resultSoFar = calculate(resultSoFar, operand, operation);
      let nf = new Intl.NumberFormat("en-US");
      screen.innerHTML = nf.format(resultSoFar);
      operand = "";
      operation = "";
      displayOnScreen = "";
      // resultSoFar = "";
      break;
    //------------------------------RESET-------------------------------//
    case "reset":
      screen.innerHTML = "0";
      operand = "";
      resultSoFar = "";
      operation = "";
      displayOnScreen = "";
      break;
    //------------------------------DELETE-------------------------------//
    case "delete":
      operand = operand.slice(0, -1);
      displayOnScreen = displayOnScreen.slice(0, -1);
      screen.innerHTML = displayOnScreen;
      break;
  }
});

function calculate(x, y, operation) {
  switch (operation) {
    case "add":
      return Number(x) + Number(y);
    case "substract":
      return Number(x) - Number(y);
    case "multiply":
      return Number(x) * Number(y);
    case "divide":
      return Number(x) / Number(y);
  }
}
