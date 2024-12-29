// initialize values

const screenDisplay = document.querySelector(".screen");
const buttons = document.querySelectorAll(".numeral");
const operators = document.querySelectorAll(".operator");
const calculate = document.querySelector("#equals");

console.log(calculate);

let calcArray1 = [];
let calcArray2 = [];

let finalCalculation = [];

let operatorPressed = false; // initialize operator press
let currentOperator = ""; // initialize operator
let calculationComplete = false;

let operatorLookUp = {
  // converts the user readable operator to a js usable operator
  "+": "+", // text + to js + operator
  "-": "-", // text - to js - operator
  x: "*",   // text x to js * operator
  "÷": "/", // text alt code 0247 to js / operator
};

function buttonPress(button) {
    console.log(`User pressed: ${button.textContent}`);
    console.log('Current state:', {
        operatorPressed,
        calcArray1Length: calcArray1.length,
        calcArray1,
        calcArray2
    });


  // initialize value container  
  const value = button.textContent;
  let displayNumber;

  if (!operatorPressed && calculationComplete) {
    // if user presses a numeral button post-calculation, and calcArray1 only has 1 number, clear the previous result (begin new calc operation)
    calcArray1 = []; // Clear the previous result
    calculationComplete = false; // Reset the calculationComplete flag and prepare for next operation
  }

  if (operatorPressed) {
    calcArray2.push(value);
    displayNumber = parseFloat(calcArray2.join(""));
  } else if (!operatorPressed) {
    calcArray1.push(value);
    displayNumber = parseFloat(calcArray1.join(""));
  }

  console.log(calcArray1);
  console.log(calcArray2);

  screenDisplay.textContent = displayNumber.toLocaleString("en-US");

  
}

function operatorPress(operator) {
  // use the operator lookup table to convert operator from human-readable to js usable operator

  if (calcArray1.length === 0) {
    console.log(`User pressed an operator with no numbers stored.`);
    console.log(currentOperator);
    return;
  }

  operatorPressed = true;
  currentOperator = operatorLookUp[operator.textContent] || operator.textContent;
  console.log(currentOperator);
}

function calculateTotal(value1, value2, operation) {
  const num1 = parseFloat(value1.join(""));
  const num2 = parseFloat(value2.join(""));

  if (value1.length === 0) {
    return;
  } else if (value1.length !== 0 && value2.length === 0) {
    return num1;
  } else {
    let result;

    switch (operation) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
      default:
        return;
    }

    // after calculation, account for natural user behaviour (continue operations using displayed value)
    calcArray1 = [result.toString()]; // store the result as first number to calculate
    calcArray2 = []; // clear second array
    operatorPressed = false; // Reset operator state
    calculationComplete = true;
    return result;
  }
}

function clearAll() { // AC button press handling, resets back to default state
    console.log(`Clearing all values.`);
  
    // clear all calculation arrays
    calcArray1 = [];
    calcArray2 = [];
  
    screenDisplay.textContent = "0"; // set the value of the input field to 0
    console.log(calcArray1);
    console.log(calcArray2);
  
    operatorPressed = false; // clear any operator
    currentOperator = ""; // set the current operator to empty
  }

// event listeners //

// listener to add functionality to numeral keys (incl decimal key)
buttons.forEach((button) =>
  button.addEventListener("click", () => buttonPress(button))
);

// listenr to add functionality to operator keys
operators.forEach((operator) =>
  operator.addEventListener("click", () => operatorPress(operator))
);

// listener to add functionality to equals key and return final result
calculate.addEventListener("click", () => {
  const result = calculateTotal(calcArray1, calcArray2, currentOperator);
  if (result !== undefined) {
    screenDisplay.textContent = result.toLocaleString("en-US");
  } else {
    return;
  }
});


//-- theme selector module --//  

const themeList = [
    'theme-default',
    'theme-twilight',
    'theme-pinkiepie',
    'theme-applejack',
    'theme-rainbowdash',
    'theme-rarity',
    'theme-fluttershy',
]

function switchTheme(themeName) {
    const calculator = document.querySelector('.calculator-container');
    const body = document.querySelector('body')
    // Remove any existing theme classes
    calculator.classList.remove(...themeList);
    body.classList.remove(...themeList);

    // Add the new theme class
    calculator.classList.add(`theme-${themeName}`);
    body.classList.add(`theme-${themeName}`);
}

// Get menu elements
const menuButton = document.getElementById('menu');
const themeMenu = document.querySelector('.theme-menu');
const themeButtons = document.querySelectorAll('.theme-option');

// Toggle menu visibility
menuButton.addEventListener('click', (event) => {
    themeMenu.classList.toggle('hidden');
    
    // Prevent the click from being detected by the document click handler
    event.stopPropagation();
});

// Add click handlers for theme buttons
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.dataset.theme;
        switchTheme(theme);
        themeMenu.classList.add('hidden');  // hides menu after selection
    });
});

// Close menu if clicking outside
document.addEventListener('click', (event) => {
    if (!menuButton.contains(event.target) && !themeMenu.contains(event.target)) {
        themeMenu.classList.add('hidden');
    }
});

console.log('Menu button:', menuButton);
console.log('Theme menu:', themeMenu);
console.log('Theme buttons:', themeButtons);
