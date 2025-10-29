class Caixa{
    constructor(caneta, getPersonagem, telaWidth, telaHeight){
        this.img = new Image();
        this.img.src = "png/Object/Crate.png"; // troca o personagem

        this.caneta = caneta;
        this.getPersonagem = getPersonagem;
        this.telaWidth = telaWidth;
        this.telaHeight = telaHeight;
 
        this.tamanhoImagemX = 77;
        this.tamanhoImagemY = 77;
        this.scale = 0.6;
        this.velocidadeQueda = 3.5;

        this.dadosDisplay = {
            tipo: "Caixa",
            modificador: "Personagem",
            estado: "Normal",
            descricao: "Troca o personagem para outro com novas habilidades, use a tecla de espaço para usar a habilidade",
        }

        this.dropColidirPersonagem = false;

        this.gerarCaixa();

        // Caixa de colisão
        this.rect = { 
            x: this.posX, 
            y: this.posY, 
            width: this.tamanhoImagemX * this.scale, 
            height: this.tamanhoImagemY * this.scale
        };
    }

    gerarCaixa() {
        this.posX = Math.random() * (this.telaWidth - this.tamanhoImagemX * this.scale);

        this.posY = -this.tamanhoImagemY * this.scale;
    }

    logica(){
        const personagem = this.getPersonagem();
        
        // Atualiza a posição da caixa de colisão
        this.rect.x = this.posX;
        this.rect.y = this.posY;

        // Atualiza o drop da colisão com o personagem
        this.dropColidirPersonagem = false;

        // Verifica a colisão
        if (
            this.rect.x < personagem.rect.x + personagem.rect.width &&
            this.rect.x + this.rect.width > personagem.rect.x &&
            this.rect.y < personagem.rect.y + personagem.rect.height &&
            this.rect.y + this.rect.height > personagem.rect.y
        ) {
            this.dropColidirPersonagem = true;
            this.dadosDisplay.estado= "Trocou o personagem";
            this.gerarCaixa();
        }
        
        // Atualiza a velocidade de queda
        this.posY += this.velocidadeQueda;
    }

    desenhar() {
        this.logica();

        this.caneta.drawImage(
            this.img,
            0, 0,
            this.tamanhoImagemX,
            this.tamanhoImagemY,
            this.posX,
            this.posY,
            this.tamanhoImagemX * this.scale,
            this.tamanhoImagemY * this.scale
        );
    }

    get getPosY(){
        return this.posY;
    }

    get getTamanhoImagemY(){
        return this.tamanhoImagemY;
    }

    get getScale(){
        return this.scale;
    }

    get getDisplay(){
        return this.dadosDisplay;
    }

    get getDropColidirPersonagem(){
        return this.dropColidirPersonagem;
    }
}