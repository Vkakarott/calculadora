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
    }
}

let numTemp = '';
let expression = '';
let buffer = '';
let isOperator = false;

function calculation(value) {
    if (numTemp.length > 7 || expression.length > 15) return;

    if (awaitClosing) synCalculator(value);

    else if (!isNaN(value)) {
        numTemp += buffer + value;
        buffer = '';
        isOperator = false;
    }

    else if (value === '(' && (!expression || isOperator)) {
        
    }

    else if (value === ')') {

    }

    else if (value === '.') {

    }

    else if (['+', '-', '*', '/', '**', '**(-1)'].includes(value)) {

    }
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

/*function formatShow(value) {
    value = String(value);
    value = value.replace(/\s/g, '');   
    value = value.replace(/\./g,',');
    return value;
}

function formatCalc(value) {
    value = String(value);
    value = value.replace(/\s/g, '');   
    value = value.replace(/\,/g,'.');
    return value;
}*/

let calcPartial = '';
let isParent = false
let residue = 0;
let hasComma = false;
let hasParent = false;
let before = '';
let after = '';

function preCalc(value, comma, operator) {
    value = formatCalc(value);
    numTemp += value;
    calcPartial = before + '(' + expression + numTemp + ')' + after;
    isOperator = operator;
    hasComma = comma;
}

function show(value) {
    if (result.innerHTML.length > 9) return;

    if (!isNaN(value)) {
        value = formatCalc(value);
        if (result.innerHTML === '0') result.innerHTML = value;
        else result.innerHTML += value;

        preCalc(value, false, false);

        return;
    } 

    if (value === '('){
        if (result.innerHTML === '0') {
            result.innerHTML = value;
            preCalc('', true, true);
            return;
        } else { 
            if (isOperator){
                result.innerHTML += value;
                hasParent = true;
                before = expression;
                expression = '';
            } 
            return;
        }
    }

    if (value === ')') {
        if (result.innerHTML === '' || isOperator) return;
        result.innerHTML += ')';
        expression = '(' + expression + ')';
        return;
    }

    if (isOperator) return;
    
    if (value === ',') {
        if (hasComma) return;
        result.innerHTML += value;
        
        preCalc(value, true, true);

        return;
    }

    let symbol;

    if (value === '*') symbol = 'x';
    else if (value === '**') symbol = '^';
    else if (value === '/') symbol = '÷';
    else if (value === '**(-1)') symbol = '^(-1)';
    else symbol = value;

    result.innerHTML += symbol;
    operator(value);
    preCalc('', true, true);
}

function operator(op) {
    if (numTemp === '') numTemp = '0';
    residue = eval(numTemp);
    expression += numTemp + op;
    numTemp = '';
    isOperator = true;
}

function clear() {
    expression = '';
    calcPartial = '';
    numTemp = '';
    after = '';
    before = '';
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
    if (result.innerHTML === '0') return;
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
    calcPartial = formatCalc(calcPartial);
    partial.innerHTML = eval(calcPartial) ?? '';
}

function calculate() {
    expression += numTemp;
    numTemp = '';
    expression = before + expression + after;
    let calculate = eval(expression);
    calculate = formatShow(calculate);
    result.innerHTML = calculate;
    partial.innerHTML = '';
    calcPartial = '';
    after = '';
    before = '';
    expression = calculate;
}





function sin(){
    if (result.innerHTML === '0') result.innerHTML = 'sin(';
    else result.innerHTML += 'sin(';
}

function showFatorial() {
    let value = Number(numTemp);
    value = factor(value);
    result.innerHTML = value;
    partial.innerHTML = '';
    calcPartial = '';
    numTemp = '';
    expression += value;
}

function factor(value) {
    if (value === 0) return 1;
    else return value * factor(value - 1);
}