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
        } else if (['sin', 'cos', 'tan', 'ln', 'log', 'exp', '^', '√', 'sin⁻¹', 'cos⁻¹', 'tan⁻¹', '!', 'π', 'e'].includes(value)) {
            currentInput = scientificCalculate(currentInput, value);
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

function scientificCalculate(input, func) {
    const num = parseFloat(input);

    switch (func) {
        case 'sin':
            return Math.sin(num).toString();
        case 'cos':
            return Math.cos(num).toString();
        case 'tan':
            return Math.tan(num).toString();
        case 'ln':
            return Math.log(num).toString();
        case 'log':
            return Math.log10(num).toString();
        case 'exp':
            return Math.exp(num).toString();
        case '^':
            return Math.pow(num, 2).toString();
        case '√':
            return Math.sqrt(num).toString();
        case 'sin⁻¹':
            return Math.asin(num).toString();
        case 'cos⁻¹':
            return Math.acos(num).toString();
        case 'tan⁻¹':
            return Math.atan(num).toString();
        case '!':
            return factorial(num).toString();
        case 'π':
            return Math.PI.toString();
        case 'e':
            return Math.E.toString();
        default:
            return input;
    }
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
