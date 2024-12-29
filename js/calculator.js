const screenDisplay = document.querySelector('.screen')
const buttons = document.querySelectorAll('.numeral')

let calcArray = [];
let targetArray = [];

let finalCalculation = [];

function buttonPress(button) {
    console.log(`User pressed: ${button.textContent}`)
    const value = button.textContent;

    calcArray.push(value)

    const displayNumber = parseFloat(calcArray.join(''))
    screenDisplay.textContent = displayNumber.toLocaleString('en-US')
}

function clearAll() {
    console.log(`Clearing all values.`)
    calcArray = [];
    screenDisplay.textContent = '0';
    console.log(calcArray);
}

// event listeners // 


buttons.forEach( button => button.addEventListener( 'click' , () => buttonPress(button) ) )
