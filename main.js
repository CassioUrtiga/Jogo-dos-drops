let canvas = document.getElementById('tela');
let caneta = canvas.getContext('2d');

const teclado = {
    cima: false,
    baixo: false,
    direita: false,
    esquerda: false
}

window.addEventListener('keydown', (evt) =>{
    switch (keyPressed(evt)){
        case '&':
            teclado.cima=true;
            break;
        case '(':
            teclado.baixo=true;
            break;
        case "'":
            teclado.direita=true;
            break;
        case '%':
            teclado.esquerda=true;
            break;
        default:
            break;
    }
})

window.addEventListener('keyup', (evt) =>{
    switch (keyPressed(evt)){
        case '&':
            teclado.cima=false;
            break;
        case '(':
            teclado.baixo=false;
            break;
        case "'":
            teclado.direita=false;
            break;
        case '%':
            teclado.esquerda=false;
            break;
        default:
            break;
    }
})

function keyPressed(evt){
    evt = evt || window.event;
    var key = evt.keyCode || evt.which;
    return String.fromCharCode(key); 
}

let terreno = new Terreno(caneta);
let personagens = new Personagens(caneta, terreno, teclado);
let drops= new Drops(caneta, personagens, terreno);

function inicializar(){
    caneta.clearRect(0, 0, canvas.width, canvas.height);

    terreno.desenhar();
    personagens.desenhar();
    drops.desenhar();
    
    requestAnimationFrame(inicializar)
}

inicializar();