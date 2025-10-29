class Cogumelo{
    constructor(caneta, getPersonagem, telaWidth, telaHeight){
        this.img1 = new Image();
        this.img2 = new Image();
        this.img1.src = "png/Object/Mushroom_1.png"; // reduz velocidade
        this.img2.src = "png/Object/Mushroom_2.png"; // aumenta velocidade

        this.caneta = caneta;
        this.getPersonagem = getPersonagem;
        this.telaWidth = telaWidth;
        this.telaHeight = telaHeight;
 
        this.tamanhoImagemX = 49;
        this.tamanhoImagemY = 41;
        this.scale = 1;
        this.velocidadeQueda = 1.5;
        this.fatorVelocidadePersonagem = 0.1;

        this.img = null;
        this.cogumelo = null;
        this.dropColidirPersonagem = false;

        this.gerarCogumelo();

        this.dadosDisplay = {
            tipo: "Cogumelos",
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

            switch (this.cogumelo) {
                case 1:
                    personagem.setVelocidade = personagem.getVelocidade - this.fatorVelocidadePersonagem;
                    this.dadosDisplay.estado = "Diminuiu";
                    this.gerarCogumelo();
                    break;
                case 2:
                    personagem.setVelocidade = personagem.getVelocidade + this.fatorVelocidadePersonagem;
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

    get getDropColidirPersonagem(){
        return this.dropColidirPersonagem;
    }
}