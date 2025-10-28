class Placa{
    constructor(caneta, personagem1, ambiente, telaWidth, telaHeight){
        this.img1 = new Image();
        this.img2 = new Image();
        this.img1.src = "png/Object/Sign_1.png"; // normaliza controles
        this.img2.src = "png/Object/Sign_2.png"; // inverte controles

        this.caneta = caneta;
        this.personagem1 = personagem1;
        this.ambiente = ambiente;
        this.telaWidth = telaWidth;
        this.telaHeight = telaHeight;
 
        this.tamanhoImagemX = 63;
        this.tamanhoImagemY = 65;
        this.scale = 0.8;
        this.velocidadeQueda = 2;

        this.img = null;
        this.placa = null;
        this.colidirPersonagem1 = false;
        
        this.gerarPlaca();

        this.dadosDisplay = {
            nome: "Placas",
            modificador: "Controles",
            estado: "Normal",
            descricao: "Inverte ou normaliza os controles de movimento do personagem",
        }

        // Caixa de colisão
        this.rect = { 
            x: this.posX, 
            y: this.posY, 
            width: this.tamanhoImagemX * this.scale, 
            height: this.tamanhoImagemY * this.scale
        };
    }

    gerarPlaca() {
        if (Math.random() < 0.5) {
            this.img = this.img1;
            this.placa = 1;
        }else{
            this.img = this.img2;
            this.placa = 2;
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

            switch (this.placa) {
                case 1:
                    this.personagem1.setEstadoTeclado = "normal";
                    this.dadosDisplay.estado = "Normal";
                    this.gerarPlaca();
                    break;
                case 2:
                    this.personagem1.setEstadoTeclado = "invertRightLeft";
                    this.dadosDisplay.estado = "Invertidos";
                    this.gerarPlaca();
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