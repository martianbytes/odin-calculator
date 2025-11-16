const display = document.querySelector('#display');
const buttons = document.querySelectorAll("#keypad button");

let currentValue = '0';
let previousValue = null;
let operator = null;
let resetDisplay = false;

function updateDisplay() {
    display.textContent = currentValue;
}

function appendNumber(num) {
    if (resetDisplay) {
        currentValue = num;
        resetDisplay = false;
    }

    else {
        if (currentValue === '0') {
            currentValue = num;
        }
        else {
            currentValue += num;
        }
    }
}

function appendDecimal() {
    if(resetDisplay) {
        currentValue = '0';
        resetDisplay = false;
        return;
    }
    if(!currentValue.includes('.')) {
        currentValue += '.';
    }
}

function clearCalculator() {
    currentValue = '0';
    previousValue = null;
    operator = null;
    resetDisplay = false;
}

function toggleSign() {
    currentValue = (parseFloat(currentValue) * -1).toString();
}

function percent() {
    currentValue = (parseFloat(currentValue) / 100).toString();
}

function chooseOperator(op) {
    if(operator !== null) calculate();
    previousValue = currentValue;
    operator = op;
    resetDisplay = true;
}

function calculate() {
    if(operator === null || previousValue === null) return;

    const a = parseFloat(previousValue);
    const b = parseFloat(currentValue);
    let result;

    switch(operator) {
        case 'add':
            result = a + b;
            break;
        
        case 'subtract':
            result = a - b;
            break;
        
        case 'multiply':
            result = a * b;
            break;
        
        case 'divide':
            if (b === 0) {
                result = 'Error'
            }
            else {
                result = a / b;
            }
            break;
        
        default: 
            return;
    }
    currentValue = result.toString();
    operator = null;
    previousValue = null;
    resetDisplay = true;
}



// event listener for buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const num = button.dataset.num;
        const action = button.dataset.action;
        const op = button.dataset.op;

        if( num !== undefined) {
            appendNumber(num);

        }
        else if (action === 'decimal') {
            appendDecimal();
        }
        else if (action === 'clear') {
            clearCalculator();
        }
        else if (action === 'toggle-sign') {
            toggleSign();
        }
        else if (action === 'percent') {
            percent();
        }
        else if (action === 'operate') {
            chooseOperator(op);
        }
        else if (action === 'calculate') {
            calculate();
        }

        updateDisplay();
    })
});