const cores = ["Azul", "Vermelho", "Amarelo", "Branco", "Preto", "Rosa",]

const controle = document.querySelectorAll("[data-controle]");
const estatisticas = document.querySelectorAll("[data-estatistica]");
const pecas = {
    "bracos": {
        "forca": 29,
        "poder": 35,
        "energia": -21,
        "velocidade": -5,
    },
    "blindagem": {
        "forca": 41,
        "poder": 20,
        "energia": 0,
        "velocidade": -20,
    },
    "nucleos": {
        "forca": 0,
        "poder": 7,
        "energia": 48,
        "velocidade": -4,
    },
    "pernas": {
        "forca": 27,
        "poder": 21,
        "energia": -32,
        "velocidade": 43,
    },
    "foguetes": {
        "forca": 0,
        "poder": 28,
        "energia": 0,
        "velocidade": -2,
    }
}


controle.forEach( (elemento) => {
    elemento.addEventListener("click", (evento) => {
        if(evento.target.dataset.peca != "cor") {
            manipulaDados(evento.target.dataset.controle, evento.target.parentNode)
            atualizaEstatisticas(evento.target.dataset.peca, evento.target.dataset.controle, elemento.parentNode);
        } else {
            trocaCor(evento.target.dataset.controle, evento.target.parentNode)
        }    
    })
})

function manipulaDados (operacao, controle) {
    const peca = controle.querySelector("[data-contador]");
    
    if(operacao === "-") {
        peca.value = parseInt(peca.value) - 1;
    } else {
        peca.value = parseInt(peca.value) + 1;
    }
}

function atualizaEstatisticas(peca, operacao, controle) {
    let quantidadePeca = controle.querySelector("[data-contador]");
    
    if(operacao === "+") {
        estatisticas.forEach( (elemento) => {
            elemento.textContent = parseInt(elemento.textContent) + pecas[peca][elemento.dataset.estatistica]
       })
    } else if (quantidadePeca.value != "00") {
        estatisticas.forEach( (elemento) => {
            elemento.textContent = parseInt(elemento.textContent) - pecas[peca][elemento.dataset.estatistica]
       })
    }
    if (quantidadePeca.value == 0) {
        quantidadePeca.value = "00";
    }
   
}

function trocaCor(operacao, node_pai) {
    const tipo = node_pai.querySelector("[data-contador]");
    let corAtual = tipo.value;
    let indexCor = cores.indexOf(corAtual);

    if ( (operacao === "+") && (indexCor < cores.length - 1) ) {
        indexCor += 1;
        tipo.value = cores[indexCor];
    }
    if ( (operacao === "-") && (indexCor > 0) ) {
        indexCor -= 1;
        tipo.value = cores[indexCor];
    }

    let imagem = document.querySelector('.robo');
    let srcImagem = `img/robotron-${tipo.value}.png`; //template string
    document.getElementById("robotron").src = srcImagem;
}