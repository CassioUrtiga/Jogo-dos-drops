class Personagem1{

    constructor(caneta, ambiente, teclado){
        const tela = document.getElementById("tela");
        this.img = new Image();

        this.ambiente = ambiente
        this.teclado = teclado;
        this.caneta = caneta;

        this.telaWidth = tela.width;
        this.telaHeight = tela.height;
        this.img.src = "png/sprites/personagem1.png";

        this.tamanhoImagemX = 120;
        this.tamanhoImagemY = 130;
        this.velocidade = 1.5;
        this.scale = 0.6;
        this.estadoTeclado = "normal";

        this.x = (this.telaWidth / 2) - ((this.tamanhoImagemX * this.scale) / 2);
        this.y = this.telaHeight - (this.ambiente.getTamImgY * this.ambiente.getScale) - (this.tamanhoImagemY * this.scale);

        this.estado = -1; //guarda o estado atual do sprite
        this.numSprite = 0; //número do sprite atual
        this.alternaSprite = 0; //alterna entre o eixo x do sprite
        this.contadorAtraso = 0;

        // Caixa de colisão
        this.rect = { 
            x: this.x, 
            y: this.y, 
            width: this.tamanhoImagemX * this.scale, 
            height: this.tamanhoImagemY * this.scale
        };
    }

    desenhar(){
        // Atualiza a posição da caixa de colisão
        this.rect.x = this.x;
        this.rect.y = this.y;

        //animação multimovimento
        if (this.teclado.direita && this.teclado.esquerda){
            this.animation(this.img, 50, 3, 0, 120, 130);
        }else{
            //animação parado de frente
            if (this.estado == -1){
                this.animation(this.img, 50, 3, 0, 120, 130);
            }

            switch (this.estadoTeclado) {
                case "normal":
                    //animação indo para direita
                    if (this.teclado.direita){
                        this.x += this.velocidade;
                        this.estado = 2;
                        this.animation(this.img, 5, 10, 910, 120, 130);
                    }
                    //animação parado na direita
                    if (!this.teclado.direita && this.estado == 2){
                        this.animation(this.img, 50, 3, 0, 120, 130);
                    }
                    //animação indo para esquerda
                    if (this.teclado.esquerda){
                        this.x -= this.velocidade;
                        this.estado = -2;
                        this.animation(this.img, 5, 10, 650, 120, 130);
                    }
                    //animação parado na esquerda
                    if (!this.teclado.esquerda && this.estado == -2){
                        this.animation(this.img, 50, 3, 0, 120, 130);
                    }
                    break;
                case "invertRightLeft":
                    if (this.teclado.direita) {
                        this.x -= this.velocidade;
                        this.estado = -2;
                        this.animation(this.img, 5, 10, 650, 120, 130);
                    }

                    if (!this.teclado.direita && this.estado == -2) {
                        this.animation(this.img, 50, 3, 0, 120, 130);
                    }

                    if (this.teclado.esquerda) {
                        this.x += this.velocidade;
                        this.estado = 2;
                        this.animation(this.img, 5, 10, 910, 120, 130);
                    }

                    if (!this.teclado.esquerda && this.estado == 2) {
                        this.animation(this.img, 50, 3, 0, 120, 130);
                    }
                    break;
                default:
                    break;
            }
        }
    }

    animation(img, atrasoSprite, totalSprite, ySprite, tamX, tamY){
        this.contadorAtraso++;

        if (this.contadorAtraso >= atrasoSprite || this.numSprite > totalSprite-1){
            this.numSprite++;
            this.contadorAtraso = 0;

            if (this.numSprite > totalSprite-1){
                this.numSprite = 0;
            }
            this.alternaSprite = this.numSprite*tamX;
        }
        
        this.caneta.drawImage(
            img, 
            this.alternaSprite, 
            ySprite, 
            tamX, 
            tamY, 
            this.x, 
            this.y, 
            tamX*this.scale, 
            tamY*this.scale
        );
    }

    get getPosX(){
        return this.x;
    }

    get getPosY(){
        return this.y;
    }

    get getScale(){
        return this.scale;
    }

    get getVelocidade(){
        return this.velocidade;
    }

    get getRect(){
        return this.rect;
    }

    get getEstadoTeclado(){
        return this.estadoTeclado;
    }

    set setEstadoTeclado(estado){
        switch (estado) {
            case "normal":
                this.estadoTeclado = "normal";
                break;
            case "invertRightLeft":
                this.estadoTeclado = "invertRightLeft";
                break;
            default:
                this.estadoTeclado = "normal";
                break;
        }
    }

    set setScale(scale){
        const baseAntiga = this.y + (this.tamanhoImagemY * this.scale);

        this.scale = scale;

        const novaAltura = this.tamanhoImagemY * this.scale;

        // Mantém os pés no mesmo lugar
        this.y = baseAntiga - novaAltura;

        // Atualiza o tamanho da hitbox
        this.rect.width = this.tamanhoImagemX * this.scale;
        this.rect.height = novaAltura;
        this.rect.x = this.x;
        this.rect.y = this.y;
    }

    set setVelocidade(velocidade){
        if (velocidade <= 0){
            this.velocidade = 1;
        }else{
            this.velocidade = velocidade;
        }
    }

}