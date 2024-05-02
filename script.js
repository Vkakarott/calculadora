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
        case 'deg':
            isDegOrRad();
            break;
        case 'sin':
            sin();
            break;
        case 'cos':
        case 'tan':
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
    $html.classList.toggle('light');
}

function formatShow(value) {
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
}

let isOperator = false;
let expression = '';
let numTemp = '';
let calcPartial = '';
let isParent = false
let residue = 0;
let hasComma = false;
let invertTrigonometric = false;
let isDeg = true;

function preCalc(value, comma, operator) {
    value = formatCalc(value);
    numTemp += value;
    calcPartial = expression + numTemp;
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
                ...
            } 
            return;
        } 

        if(expression === '') preCalc('', true, true);
        else {
            hasParent = true;
            expression += numTemp;
            before = expression + numTemp;
        }

        preCalc(value, true, true);

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
    else symbol = value;

    result.innerHTML += symbol;
    operator(value);
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
    let calculate = eval(expression);
    calculate = formatShow(calculate);
    result.innerHTML = calculate;
    partial.innerHTML = '';
    calcPartial = '';
    expression = calculate;
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

function isDegOrRad() {
    isDeg = !isDeg;

    if (isDeg) secund.disabled = false;
    else secund.disable = true;

    if (isDeg) deg.innerHTML = 'deg';
    else deg.innerHTML = 'rad';
}

function sin(){
    if (result.innerHTML === '0') result.innerHTML = 'sin(';
    else result.innerHTML += 'sin(';
}