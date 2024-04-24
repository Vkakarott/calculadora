const buttons = document.querySelectorAll('button');
const result = document.querySelector('.result');
const partial = document.querySelector('.partial');
const body = document.querySelector('.body');

body.classList.add('cientific');

function invertCalc() {
    body.classList.toggle('cientific');
}

result.innerHTML = '0';
let expression = '';
let numTemp = '';
let isOperator = false;

let lastTerm = 0;
let fistTerm = '';

buttons.forEach((button, value) => {
    button.addEventListener('click', () => {
        click(value);
    });
});

function click( data ) {
    buttons.forEach((button, value) => {
        if(data === value) {
            if (isNaN(buttons[value].value)) {
                switch (buttons[value].value) {
                    case '.':
                        show(',');
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
                    case 'porcent':
                        porcent(lastTerm, fistTerm);
                        break;
                    case '+':
                    case '-':
                    case '/':
                    case '*':
                        show(buttons[value].value);
                        break;
                }
            } else {
                show(buttons[value].value);
            }
        }
    });
}

function show(value) {
    if (isOperator && !isNaN(value)) {
        result.innerHTML += value;
        numTemp += value;
        isOperator = false;
    } else {
        if (value === ',') {
            numTemp += '.';
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
            } else {
                result.innerHTML += value;
                numTemp += value;
            }
        }
    }
}

function operator(op) {
    expression += numTemp + op;
    numTemp = '';
}

function porcent () {
    
}

function clear() {
    expression = '';
    result.innerHTML = '0';
    partial.innerHTML = '';
}

function eraser() {
    result.innerHTML = result.innerHTML.slice(0, -1);
    if (result.innerHTML.length < 2) {
        clear();
    }
}

function upDisplayParse() {
    
}

function calculate() {
    expression += numTemp;
    numTemp = '';
    let calculate = eval(expression);
    result.innerHTML = calculate;
    expression = calculate;
}