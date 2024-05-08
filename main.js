const $html = document.querySelector('html');
const buttons = document.querySelectorAll('button');
const result = document.querySelector('.result');
const partial = document.querySelector('.partial');
const body = document.querySelector('.body');
const trigonometric = document.querySelectorAll('.sec');
const deg = document.querySelector('#deg');
const secund = document.querySelector('#second');

buttons.forEach((button, value) => {
    button.addEventListener('click', () => {
        click(value);
    });
});

$html.classList.add('light');

function click(data) {
    const button = buttons[data];

    if (!button) return;

    const buttonValue = button.value;

    switch (buttonValue) {        
        case 'second':
            invertFunction();
            break;
        case 'deg':
            isDegOrRad();
            break;
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
        case 'mode':
            themerMode();
            break;
        case 'porcent':
            porcent();
            break;
        case 'sin':
        case 'cos':
        case 'tan':
        case 'log':
        case 'ln':
        case 'sqrt':
            isFunctionAwait(buttonValue);
            break;
        case 'fatorial':
            showFatorial();
            break;
        case 'pi':
            break;
        case 'e':
            break;
        default:
            calculation(buttonValue);
    }
    upDisplayParse();
}

function invertCalc() {
    body.classList.toggle('cientific');
}

function themerMode() {
    $html.classList.toggle('light');
}

let awaitClosing = false;
let functionAwait = '';
let invertTrigonometric = false;

function isFunctionAwait(value) {
    awaitClosing = true;
    if (invertTrigonometric) functionAwait = 'arc' + value;
    else functionAwait = value;
}

function sin(value) {
    if (isDeg) numTemp = Math.sin(value * (Math.PI / 180));
    else numTemp = Math.sin(value);
}

function cos(value) {
    if (isDeg) numTemp = Math.cos(value * (Math.PI / 180));
    else numTemp = Math.cos(value);
}

function tan(value) {
    if (isDeg) numTemp = Math.tan(value * (Math.PI / 180));
    else numTemp = Math.tan(value);
}

function ln(value) {
    numTemp = Math.log(value);
}

function log(value) {
    numTemp = Math.log10(value);
}

function sqrt(value) {
    numTemp = Math.sqrt(value);
}

function arcsin(value) {
    if (isDeg) numTemp = Math.asin(value) * (180 / Math.PI);
    else numTemp = Math.asin(value);
}

function arccos(value) {
    if (isDeg) numTemp = Math.acos(value) * (180 / Math.PI);
    else numTemp = Math.acos(value);
}

function arctan(value) {
    if (isDeg) numTemp = Math.atan(value) * (180 / Math.PI);
    else numTemp = Math.atan(value);
}

function definiiveAnswer() {
    functionAwait = '';
    awaitClosing = false;
    amount = '';
}

let amount = '';

function synCalculator(value) {
    amount += value;
    amount = Number(amount);
    switch (functionAwait) {
        case 'sin':
            sin(amount);
            break;
        case 'cos':
            cos(amount);
            break;
        case 'tan':
            tan(amount);
            break;
        case 'log':
            log(amount);
            break;
        case 'ln':
            ln(amount);
            break;
        case 'sqrt':
            sqrt(amount);
            break;
        case 'arcsin':
            arcsin(amount);
            break;
        case 'arccos':
            arccos(amount);
            break;
        case 'arctan':
            arctan(amount);
            break;
        default:
            break;
    }
    if (value === ')') definiiveAnswer();
}

let numTemp = '';
let expression = '';
let buffer = '';
let isOperator = false;
let hasComma = false;

function valueNumber(value) {
    numTemp += buffer + value;
    buffer = '';
    isOperator = false;
}

let hasParent = false;
let before = '';

function openParentesis() {
    hasParent = true;
    expression += buffer;
    before = expression;
    expression = '';
}

function closeParentesis() {
    hasParent = false;
    hasComma = false;
    expression += numTemp;
    expression = before + '(' + expression + ')';
}

function valueComa(value) {
    hasComma = true;
    valueNumber(value);
}

function operation(value) {
    buffer = value;
    expression += numTemp;
    numTemp = '';
    isOperator = true;
    hasComma = false;
}

function calculation(value) {
    if (numTemp.length > 7 || expression.length > 15) return;

    if (awaitClosing) synCalculator(value);

    else if (!isNaN(value)) valueNumber(value);

    else if (value === '(' && (!expression || isOperator)) openParentesis();

    else if (value === ')' && expression && !isOperator) closeParentesis();

    else if (value === '.' && !hasComma) valueComa(value);

    else if (['+', '-', '*', '/', '**', '**(-1)'].includes(value) && !hasParent) operation(value);
}

function invertFunction() {
    invertTrigonometric = !invertTrigonometric;

    if (invertTrigonometric) deg.setAttribute('disabled', true);
    else deg.disabled = false;

    trigonometric.forEach((item) => {
        if (invertTrigonometric) item.style.display = 'inline-flex';
        else item.style.display = 'none';
    })
}

let isDeg = true;

function isDegOrRad() {
    isDeg = !isDeg;

    if (isDeg) secund.disabled = false;
    else secund.disable = true;

    if (isDeg) deg.innerHTML = 'deg';
    else deg.innerHTML = 'rad';
}


function clear() {
    expression = '';
    numTemp = '';
    before = '';
    buffer = '';
    hasParent = false;
    hasComma = false;
    isOperator = false;
    result.innerHTML = '0';
    partial.innerHTML = '';
}

function eraser() {
    if (numTemp) numTemp = numTemp.slice(0, -1);
    else if (buffer) { 
        buffer = '';
        isOperator = false;
    }
    else if (awaitClosing & !numTemp) {
        awaitClosing = false;
        functionAwait = '';
        amount = '';
    } 
    else if (expression) expression = expression.slice(0, -1);
}

function porcent () {
    if (isOperator) return;
    let porcent;
    if (expression === '') {
        porcent = eval(numTemp) / 100;
        clear();
        numTemp = porcent;
    } else {
        let residue = '';
        if (isNaN(numTemp[0])) residue = numTemp.slice(1); 
        porcent = (expression * residue) / 100;
        numTemp = numTemp[0] + porcent;
    };
}

function upDisplayParse() {
    calcPartial = before + expression + numTemp;
    result.innerHTML = before + expression + buffer + numTemp;
    partial.innerHTML = eval(calcPartial);
}

function calculate() {
    expression = before + expression + numTemp;
    numTemp = '';
    let calculate = eval(expression);
    calcPartial = '';
    before = '';
    expression = calculate;
}

function showFatorial() {
    let response = 0;
    response = Number(numTemp);
    response = factor(response);
    numTemp = response;
}

function factor(value) {
    if (value === 0) return 1;
    else return value * factor(value - 1);
}