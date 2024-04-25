const buttons = document.querySelectorAll('button');
const result = document.querySelector('.result');
const partial = document.querySelector('.partial');
const body = document.querySelector('.body');

body.classList.add('cientific');

function invertCalc() {
    body.classList.toggle('cientific');
}

let expression = '';
let numTemp = '';
let isOperator = false;
let calcPartial = '';

buttons.forEach((button, value) => {
    button.addEventListener('click', () => {
        click(value);
    });
});

function click( data ) {
    const button = buttons[data];

    if (!button) return;

    const buttonValue = button.value;

    switch (buttonValue) {        
        case 'dell':
            clear();
            break;
        case 'close':
            eraser();
            break;
        case 'equal':
            calculate();
            break;
        case 'invert':
            invertCalc();
            break;
        case 'porcent':
            break;
        default:
            show(buttonValue);
    }
    upDisplayParse();
}

function show(value) {
    if (result.innerHTML.length > 9) return;
    else if (isOperator && !isNaN(value)) {
        result.innerHTML += value;
        numTemp += value;
        isOperator = false;
        calcPartial = expression + numTemp;
    } else {
        if (value === ',') {
            if (result.innerHTML === '0') numTemp = '0.';
            else numTemp += '.';
            result.innerHTML += value;
        } else if (['+', '-', '*', '/'].includes(value)) {
            let symbol;
            if (value === '*') symbol = 'x';
            else symbol = value;
            result.innerHTML += symbol;
            operator(value);
            isOperator = true;
        } else {
            if (result.innerHTML === '0'){
                result.innerHTML = value;
                numTemp = value;
                calcPartial = expression + numTemp;
            } else {
                result.innerHTML += value;
                numTemp += value;
                calcPartial = expression + numTemp;
            }
        }
    }
}

function operator(op) {
    expression += numTemp + op;
    numTemp = '';
}

function porcent () {
    let por = numTemp/ 100;
    if (expression === '') numTemp = por;
    else numTemp = calcPartial * por;
}

function clear() {
    expression = '';
    calcPartial = '';
    result.innerHTML = '0';
    partial.innerHTML = '';
}

function eraser() {
    result.innerHTML = result.innerHTML.slice(0, -1);
    expression.slice(0, -1);
    if (result.innerHTML.length < 2) {
        clear();
    }
}

function upDisplayParse() {
    console.log(calcPartial);
    partial.innerHTML = eval(calcPartial) ?? '';
}

function calculate() {
    expression += numTemp;
    numTemp = '';
    let calculate = eval(expression);
    result.innerHTML = calculate;
    partial.innerHTML = '';
    calcPartial = '';
    expression = calculate;
}