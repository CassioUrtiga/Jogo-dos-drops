class Cogumelo{
    constructor(caneta, personagem1, ambiente, telaWidth, telaHeight){
        this.img1 = new Image();
        this.img2 = new Image();
        this.img1.src = "png/Object/Mushroom_1.png"; // reduz velocidade
        this.img2.src = "png/Object/Mushroom_2.png"; // aumenta velocidade

        this.caneta = caneta;
        this.personagem1 = personagem1;
        this.ambiente = ambiente;
        this.telaWidth = telaWidth;
        this.telaHeight = telaHeight;
 
        this.tamanhoImagemX = 49;
        this.tamanhoImagemY = 41;
        this.scale = 1;
        this.velocidadeQueda = 1.5;
        this.fatorVelocidadePersonagem = 0.1;

        this.img = null;
        this.cogumelo = null;
        this.colidirPersonagem1 = false;

        this.gerarCogumelo();

        this.dadosDisplay = {
            nome: "Cogumelos",
            modificador: "Velocidade",
            estado: "Normal",
            descricao: "Aumenta ou reduz a velocidade do personagem",
        }

        // Caixa de colisão
        this.rect = { 
            x: this.posX, 
            y: this.posY, 
            width: this.tamanhoImagemX * this.scale, 
            height: this.tamanhoImagemY * this.scale
        };
    }

    gerarCogumelo() {
        if (Math.random() < 0.5) {
            this.img = this.img1;
            this.cogumelo = 1;
        }else{
            this.img = this.img2;
            this.cogumelo = 2;
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

            switch (this.cogumelo) {
                case 1:
                    this.personagem1.setVelocidade = this.personagem1.getVelocidade - this.fatorVelocidadePersonagem;
                    this.dadosDisplay.estado = "Diminuiu";
                    this.gerarCogumelo();
                    break;
                case 2:
                    this.personagem1.setVelocidade = this.personagem1.getVelocidade + this.fatorVelocidadePersonagem;
                    this.dadosDisplay.estado = "Aumentou";
                    this.gerarCogumelo();
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