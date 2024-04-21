const btns = document.querySelectorAll('button');
const result = document.querySelector('.result');
const partial = document.querySelector('.partial');

//forEach nos botões para adicionar um evento de click que chama a função de mesmo nome
btns.forEach((button, value) => {
    button.addEventListener('click', () => {
        click(value);
    });
});

//função acionada ao clicar em um botão
function click( data ) {
    btns.forEach((button, value) => {
        if(data === value) {
            if (value === 'dell') clear();
            else if (value === 'close') 
        }
    });
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
    resul.innerHTML = resul.innerHTML.slice(0, -1);
    upDisplayParse();
    if (resul.innerHTML.length < 2) {
        clear();
    }
}

//função que faz o calculo da espressão e mostra como resultado parcial
function upDisplayParse() {
    const expression = resul.innerHTML;
    if (expression) {
        let result = eval(expression);
        parse.innerHTML = result;
    }
}

//função que transforma o resultado parcial em resultado final
function calculate() {
    resul.innerHTML = parse.innerHTML;
    parse.innerHTML = '';
}