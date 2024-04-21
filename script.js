const deg = document.querySelector('#deg');
const sin = document.querySelector('#sin');
const cos = document.querySelector('#cos');
const tan = document.querySelector('#tan');
const [isInvert, setIsInvert] = false;
revertFunctions() {
    if (isInvert) {

    } else {
        
    }
}

//forEach nos botões para adicionar um evento de click que chama a função de mesmo nome
btns.forEach((button, value) => {
    button.addEventListener('click', () => {
        click(value);
    });
});

//função acionada ao clicar em um botão
function click(value) {
    btns.forEach((button, index) => {
        if(index === value) {
            if (index === 0) {
                clear();
            } else if (index === 1) {
                eraser();
            } else if (index === 18) {
                calculate();
            } else {
                show(button.value);
            }  
        }
    });
}

//função para mostrar valor digitado na tela
function show(value) {
    resul.innerHTML += value;
    upDisplayParse();
}

//função acionada ao clicar no botão "C" que limpa o display
function clear() {
    resul.innerHTML = '';
    parse.innerHTML = '';
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
