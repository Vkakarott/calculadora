const btns = document.querySelectorAll('button');
const result = document.querySelector('.result');
const partial = document.querySelector('.partial');
const body = document.querySelector('.body');

body.classList.add('cientific');

result.innerHTML = '0';

let lastTerm = 0;
let fistTerm = '';
let terms = [];
let operators = [];
let numTemp = '';
let isOperator = false;

btns.forEach((button, value) => {
    button.addEventListener('click', () => {
        click(value);
    });
});

//função acionada ao clicar em um botão
function click( data ) {
    btns.forEach((button, value) => {
        if(data === value) {
            if (isNaN(btns[value].value)) {
                switch (btns[value].value) {
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
                        show(btns[value].value);
                        break;
                }
            } else {
                show(btns[value].value);
            }
        }
    });
}

function invertCalc() {
    body.classList.toggle('cientific');
}

function operator(op) {
    terms.push(numTemp);
    operators.push(op);
    numTemp = '';
}

function porcent (value, term) {
    if (value) {
        let out = value * (term/100);
        show(out);
    } else {
        console.log('por: ', term);

        let out = term / 100;

        console.log('saida: ', out);

        clear();
        show(out);
    }
}

//função para mostrar valor digitado na tela
function show(value) {
    if (isOperator) {
        if (value === ',') return;
        else if (['+', '-', '/', "*"].includes(value)) return;
        else {
            result.innerHTML += value;
            numTemp += value;
            isOperator = false;
        }
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
    upDisplayParse();
}

//função acionada ao clicar no botão "C" que limpa o display
function clear() {
    result.innerHTML = '0';
    partial.innerHTML = '';
}

//função que apaga ultimo valor digitado
function eraser() {
    result.innerHTML = result.innerHTML.slice(0, -1);
    upDisplayParse();
    if (result.innerHTML.length < 2) {
        clear();
    }
}

//função que faz o calculo da espressão e mostra como resultado parcial
function upDisplayParse() {
    
}

//função que transforma o resultado parcial em resultado final
function calculate() {
    result.innerHTML = partial.innerHTML;
    partial.innerHTML = '';
}