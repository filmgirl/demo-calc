const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentInput = '0';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            currentInput = '0';
            previousInput = '';
            operator = '';
        } else if (value === '+/-') {
            currentInput = (parseFloat(currentInput) * -1).toString();
        } else if (value === '%') {
            currentInput = (parseFloat(currentInput) / 100).toString();
        } else if (value === '=') {
            if (operator && previousInput) {
                currentInput = calculate(previousInput, currentInput, operator);
                operator = '';
                previousInput = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (operator && previousInput) {
                currentInput = calculate(previousInput, currentInput, operator);
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '0';
        } else {
            if (currentInput === '0') {
                currentInput = value;
            } else {
                currentInput += value;
            }
        }

        display.textContent = currentInput;
    });
});

function calculate(a, b, operator) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    switch (operator) {
        case '+':
            return (numA + numB).toString();
        case '-':
            return (numA - numB).toString();
        case '*':
            return (numA * numB).toString();
        case '/':
            return (numA / numB).toString();
        default:
            return b;
    }
}
