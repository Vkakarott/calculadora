const btns = document.querySelectorAll('button');
const result = document.querySelector('.result');
const partial = document.querySelector('.partial');
const body = document.querySelector('.body');

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

//função para mostrar valor digitado na tela
function show(value) {
    result.innerHTML += value;
    upDisplayParse();
}

//função acionada ao clicar no botão "C" que limpa o display
function clear() {
    result.innerHTML = '';
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
    const expression = result.innerHTML;
    if (expression) {
        let result = eval(expression);
        parse.innerHTML = result;
    }
}

//função que transforma o resultado parcial em resultado final
function calculate() {
    result.innerHTML = parse.innerHTML;
    parse.innerHTML = '';
}