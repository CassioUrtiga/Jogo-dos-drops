class Caixa{
    constructor(caneta, personagem1, ambiente, telaWidth, telaHeight){
        this.img = new Image();
        this.img.src = "png/Object/Crate.png"; // troca o personagem

        this.caneta = caneta;
        this.personagem1 = personagem1;
        this.ambiente = ambiente;
        this.telaWidth = telaWidth;
        this.telaHeight = telaHeight;
 
        this.tamanhoImagemX = 77;
        this.tamanhoImagemY = 77;
        this.scale = 0.6;
        this.velocidadeQueda = 3.5;

        this.dadosDisplay = {
            nome: "Caixa",
            modificador: "Personagem",
            estado: "Normal",
            descricao: "Troca o personagem para outro com novas habilidades, use a tecla de espaço para usar a habilidade",
        }

        this.colidirPersonagem1 = false;

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
        // Atualiza a posição da caixa de colisão
        this.rect.x = this.posX;
        this.rect.y = this.posY;

        // Atualiza o drop da colisão com o personagem
        this.colidirPersonagem1 = false;

        // Verifica a colisão
        if (
            this.rect.x < this.personagem1.rect.x + this.personagem1.rect.width &&
            this.rect.x + this.rect.width > this.personagem1.rect.x &&
            this.rect.y < this.personagem1.rect.y + this.personagem1.rect.height &&
            this.rect.y + this.rect.height > this.personagem1.rect.y
        ) {
            this.colidirPersonagem1 = true;
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

    get getColidirPersonagem1(){
        return this.colidirPersonagem1;
    }
}