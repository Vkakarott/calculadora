const $html = document.querySelector('html');
const buttons = document.querySelectorAll('button');
const result = document.querySelector('.result');
const partial = document.querySelector('.partial');
const body = document.querySelector('.body');
const trigonometric = document.querySelectorAll('.sec');
const deg = document.querySelector('#deg');
const secund = document.querySelector('#second');

function setCalculatorCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCalculatorCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function loadCalculatorStateFromCookie() {
    var savedState = JSON.parse(getCalculatorCookie('calculatorState'));
    if (savedState) {
        if (savedState.theme === 'light') {
            $html.classList.add('light');
        } else {
            $html.classList.remove('light');
        }
        if (savedState.scientificMode) {
            body.classList.add('cientific');
        } else {
            body.classList.remove('cientific');
        }
    }
}

window.addEventListener('load', loadCalculatorStateFromCookie);

$html.addEventListener('click', function() {
    saveCalculatorState();
});

body.addEventListener('click', function() {
    saveCalculatorState();
});

function saveCalculatorState() {
    setCalculatorCookie('calculatorState', JSON.stringify({
        theme: $html.classList.contains('light') ? 'light' : 'dark',
        scientificMode: body.classList.contains('cientific')
    }), 30);
}

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
            upDisplayParse();
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
            upDisplayParse();
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
            upDisplayParse();
            break;
        case 'pi':
            calculation(Math.PI.toFixed(5));
            upDisplayParse();
            break;
        case 'e':
            calculation(Math.E.toFixed(5));
            upDisplayParse();
            break;
        default:
            calculation(buttonValue);
            upDisplayParse();
    }
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

    if (functionAwait === 'sqrt') {
        simpleShowValue('√');
        return;
    }

    simpleShowValue(functionAwait + '(');
}

function sin(value) {
    if (isDeg) numTemp = Math.sin(value * (Math.PI / 180)).toFixed(5);
    else numTemp = Math.sin(value).toFixed(5);
}

function cos(value) {
    if (isDeg) numTemp = Math.cos(value * (Math.PI / 180)).toFixed(5);
    else numTemp = Math.cos(value).toFixed(5);
}

function tan(value) {
    if (isDeg) numTemp = Math.tan(value * (Math.PI / 180)).toFixed(5);
    else numTemp = Math.tan(value).toFixed(5);
}

function ln(value) {
    numTemp = Math.log(value).toFixed(5);
}

function log(value) {
    numTemp = Math.log10(value).toFixed(5);
}

function sqrt(value) {
    numTemp = Math.sqrt(value).toFixed(5);
}

function arcsin(value) {
    if (isDeg) numTemp = Math.asin(value) * (180 / Math.PI).toFixed(5);
    else numTemp = Math.asin(value).toFixed(5);
}

function arccos(value) {
    if (isDeg) numTemp = Math.acos(value) * (180 / Math.PI).toFixed(5);
    else numTemp = Math.acos(value).toFixed(5);
}

function arctan(value) {
    if (isDeg) numTemp = Math.atan(value) * (180 / Math.PI).toFixed(5);
    else numTemp = Math.atan(value).toFixed(5);
}

function resetFunctionAwait() {
    functionAwait = '';
    awaitClosing = false;
    amount = '';
    result.innerHTML += ')';
    return;
}

let amount = '';

function synCalculator(value) {
    if (value === ')') resetFunctionAwait();
    if (isNaN(value)) return;
    simpleShowValue(value);
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
}

let numTemp = '';
let expression = '';
let buffer = '';
let isOperator = false;
let hasComma = false;

function simpleShowValue(value) {
    if (result.innerHTML === '0') result.innerHTML = value;
    else result.innerHTML += value;
}

function exceptionShow(value) {
    if (value === '/') value = '÷';
    if (value === '*') value = 'x';
    if (value === '**') value = '^';
    if (value === '**(-1)') value = '^(-1)';
    result.innerHTML += value;
}

function valueNumber(value) {
    numTemp += buffer + value;
    buffer = '';
    isOperator = false;
    simpleShowValue(value);
}

let hasParent = false;
let before = '';

function openParentesis() {
    hasParent = true;
    expression += buffer;
    before = expression;
    expression = '';
    simpleShowValue('(');
}

function closeParentesis() {
    hasParent = false;
    hasComma = false;
    expression += numTemp;
    expression = before + '(' + expression + ')';
    simpleShowValue(')');
}

function valueComa(value) {
    hasComma = true;
    numTemp += buffer + value;
    buffer = '';
    isOperator = false;
    exceptionShow(',');
}

function operation(value) {
    buffer = value;
    expression += numTemp;
    numTemp = '';
    isOperator = true;
    hasComma = false;
    if (value === '**(-1)') {
        expression += buffer;
        buffer = '';
    }
    exceptionShow(value);
}

function piAndE(value) {
    numTemp += buffer + value;
    buffer = '';
    isOperator = false;
    if (value === '3.14159') simpleShowValue('π');
    else simpleShowValue('e');
}

function calculation(value) {
    if (numTemp.length > 7 || expression.length > 21) return;

    if (['3.14159', '2.71828'].includes(value)) piAndE(value);

    else if (awaitClosing) synCalculator(value);

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
    amount = '';
    functionAwait = '';
    invertTrigonometric = false;
    hasParent = false;
    hasComma = false;
    isDeg = true;
    awaitClosing = false;
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
    partial.innerHTML = eval(calcPartial) ?? '';
}

function calculate() {
    expression = before + expression + numTemp;
    numTemp = '';
    let calculate = eval(expression);
    calcPartial = '';
    before = '';
    expression = calculate ?? 'Error';
    result.innerHTML = expression;
    partial.innerHTML = '';
}

function showFatorial() {
    let response = 0;
    response = Number(numTemp);
    response = factor(response);
    numTemp = response;
    result.innerHTML += '!';
}

function factor(value) {
    if (value === 0) return 1;
    else return value * factor(value - 1);
}