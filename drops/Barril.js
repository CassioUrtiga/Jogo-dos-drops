class Barril{
    constructor(caneta, personagem1, ambiente, telaWidth, telaHeight){
        this.img1 = new Image();
        this.img2 = new Image();
        this.img1.src = "png/Object/Barrel_1.png"; // reduz tamanho
        this.img2.src = "png/Object/Barrel_2.png"; // aumenta tamanho

        this.caneta = caneta;
        this.personagem1 = personagem1;
        this.ambiente = ambiente;
        this.telaWidth = telaWidth;
        this.telaHeight = telaHeight;

        this.tamanhoImagemX = 177;
        this.tamanhoImagemY = 238;
        this.scale = 0.25;
        this.velocidadeQueda = 3;
        this.fatorTamanhoPersonagem = 0.1;

        this.dadosDisplay = {
            nome: "Barris",
            modificador: "Tamanho",
            estado: "Normal",
            descricao: "Aumenta ou reduz o tamanho do personagem",
        }

        this.img = null;
        this.barril = null;
        this.colidirPersonagem1 = false;

        this.gerarBarril();

        // Caixa de colisão
        this.rect = { 
            x: this.posX, 
            y: this.posY, 
            width: this.tamanhoImagemX * this.scale, 
            height: this.tamanhoImagemY * this.scale
        };
    }

    gerarBarril() {
        if (Math.random() < 0.5) {
            this.img = this.img1;
            this.barril = 1;
        }else{
            this.img = this.img2;
            this.barril = 2;
        }

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

            switch (this.barril) {
                case 1:
                    this.personagem1.setScale = this.personagem1.getScale - this.fatorTamanhoPersonagem;
                    this.dadosDisplay.estado = "Diminuiu";
                    this.gerarBarril();
                    break;
                case 2:
                    this.personagem1.setScale = this.personagem1.getScale + this.fatorTamanhoPersonagem;
                    this.dadosDisplay.estado = "Aumentou";
                    this.gerarBarril();
                    break;
                default:
                    break;
            }
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