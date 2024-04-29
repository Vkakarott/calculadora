const generate  = document.querySelector('html');
const buttons = document.querySelectorAll('button');
const result = document.querySelector('.result');
const partial = document.querySelector('.partial');
const body = document.querySelector('.body');
const trigger = document.querySelectorAll('.sec');
const deg = document.querySelector('#deg');

buttons.forEach((button, value) => {
    button.addEventListener('click', () => {
        click(value);
    });
});

function click(data) {
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
        case 'mode':
            themerMode();
            break;
        case 'porcent':
            porcent();
            break;
        case 'second':
            invertFunction();
            break;
        default:
            show(buttonValue);
    }
    upDisplayParse();
}

function invertCalc() {
    body.classList.toggle('cientific');
}

function themerMode() {
    generate.classList.toggle('light');
}

let isOperator = false;
let expression = '';
let numTemp = '';
let calcPartial = '';
let residue = 0;
let hasComma = false;
let invertTrigger = false;

function show(value) {
    if (result.innerHTML.length > 9) return;

    if (!isNaN(value)) {
        value = String(value);
        value = value.replace(/\./g, ',');
        if (result.innerHTML === '0') result.innerHTML = value;
        else result.innerHTML += value;

        numTemp += value;
        calcPartial = expression + numTemp;
        isOperator = false;
        hasComma = false;

        return;
    } 

    if (isOperator) return;
    
    if (value === ',') {
        if (hasComma) return;
        if (result.innerHTML === '0') numTemp = '0.';
        else numTemp += '.';
        result.innerHTML += value;
        hasComma = true;
        return;
    }

    let symbol;

    if (value === '*') symbol = 'x';
    else symbol = value;

    result.innerHTML += symbol;
    operator(value);
    isOperator = true;
}

function operator(op) {
    residue = eval(numTemp);
    expression += numTemp + op;
    numTemp = '';
}

function clear() {
    expression = '';
    calcPartial = '';
    numTemp = '';
    hasComma = false;
    isOperator = false;
    result.innerHTML = '0';
    partial.innerHTML = '';
}

function eraser() {
    if (result.innerHTML === '0') return;

    if (isOperator) isOperator = false;

    if (result.innerHTML.length < 2) clear();
    else result.innerHTML = result.innerHTML.slice(0, -1);

    if (numTemp === '') {
        expression = expression.slice(0, -1);
        calcPartial = expression + numTemp;
        return;
    } else numTemp = numTemp.slice(0, -1);  

    if (numTemp === '') {
        numTemp = expression.substring(expression.length - 1);
        expression = expression.slice(0, -1);
        calcPartial = expression;
        return;
    }

    calcPartial = expression + numTemp;
}

function porcent () {
    let porcent;
    if (expression === '') {
        porcent = eval(numTemp) / 100;
        clear();
        show(porcent);
    } else {
        porcent = (residue * numTemp) / 100;
        numTemp = '';
        result.innerHTML = expression;
        show(porcent);
    };
}

function upDisplayParse() {
    calcPartial = calcPartial.replace(/\,/g, '.');
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

function invertFunction() {
    invertTrigger = !invertTrigger;

    if (invertTrigger) deg.style.color = ''

    trigger.forEach((item) => {
        if (invertTrigger) item.style.display = 'inline-flex';
        else item.style.display = 'none';
    })
}