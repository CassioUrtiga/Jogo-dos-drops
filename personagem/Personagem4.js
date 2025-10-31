class Personagem4{

    constructor(caneta, teclado, terreno){
        const tela = document.getElementById("tela");
        this.img = new Image();

        this.telaWidth = tela.width;
        this.telaHeight = tela.height;
        this.img.src = "png/sprites/personagem4.png";

        this.teclado = teclado;
        this.caneta = caneta;
        this.terreno = terreno;

        this.imgX = 120;
        this.imgY = 130;
        this.velocidade = 1.5;
        this.scale = 0.6;

        this.descricao = {
            tipo: "teste",
            habilidade: "teste",
        }
        
        this.numSprite = 0; // número do sprite atual
        this.alternaSprite = 0; // alterna entre o eixo x do sprite
        this.contadorAtraso = 0;
        this.estadoTeclado = "normal";
        this.dropTipo = ""; // tipo do drop que colidiu com o personagem

        this.x = (this.telaWidth / 2) - ((this.imgX * this.scale) / 2);
        this.y = this.telaHeight - (this.terreno.getTamImgY * this.terreno.getScale) - (this.imgY * this.scale);

        // Dados dos sprites
        this.sprites = {
            estadoAtual : 0, // parado(0), Dir(2), Esq(-2)
            indoDireita: {
                altura: 130,
                totalSprites: 10,
                atraso: 5,
            },
            indoEsquerda: {
                altura: 390,
                totalSprites: 10,
                atraso: 5,
            },
            paradoDireita: {
                altura: 0,
                totalSprites: 15,
                atraso: 5,
            },
            paradoEsquerda: {
                altura: 260,
                totalSprites: 15,
                atraso: 5,
            },
        }

        // Caixa de colisão
        this.rect = { 
            x: this.x, 
            y: this.y, 
            width: this.imgX * this.scale, 
            height: this.imgY * this.scale
        };
    }

    desenhar(){
        // Atualiza a posição da caixa de colisão
        this.rect.x = this.x;
        this.rect.y = this.y;

        //animação multimovimento
        if (this.teclado.direita && this.teclado.esquerda){
            switch (this.sprites.estadoAtual) {
                case 2:
                    this.animation(
                        this.img, 
                        this.sprites.paradoDireita.atraso, 
                        this.sprites.paradoDireita.totalSprites, 
                        this.sprites.paradoDireita.altura, 
                        this.imgX, 
                        this.imgY
                    );
                    break;
                case -2:
                    this.animation(
                        this.img, 
                        this.sprites.paradoEsquerda.atraso, 
                        this.sprites.paradoEsquerda.totalSprites, 
                        this.sprites.paradoEsquerda.altura, 
                        this.imgX, 
                        this.imgY
                    );
                    break;
                default:
                    this.animation(
                        this.img, 
                        this.sprites.paradoDireita.atraso, 
                        this.sprites.paradoDireita.totalSprites, 
                        this.sprites.paradoDireita.altura, 
                        this.imgX, 
                        this.imgY
                    );
                    break;
            }  
        }else{
            //animação parado (estado inicial)
            if (this.sprites.estadoAtual == 0){
                this.animation(
                    this.img, 
                    this.sprites.paradoDireita.atraso, 
                    this.sprites.paradoDireita.totalSprites, 
                    this.sprites.paradoDireita.altura, 
                    this.imgX, 
                    this.imgY
                );
            }

            switch (this.estadoTeclado) {
                case "normal":
                    //animação indo para direita
                    if (this.teclado.direita){
                        this.x += this.velocidade;
                        this.sprites.estadoAtual = 2;
                        this.animation(
                            this.img, 
                            this.sprites.indoDireita.atraso, 
                            this.sprites.indoDireita.totalSprites, 
                            this.sprites.indoDireita.altura, 
                            this.imgX, 
                            this.imgY
                        );
                    }
                    //animação parado na direita
                    if (!this.teclado.direita && this.sprites.estadoAtual == 2){
                        this.animation(
                            this.img, 
                            this.sprites.paradoDireita.atraso, 
                            this.sprites.paradoDireita.totalSprites, 
                            this.sprites.paradoDireita.altura, 
                            this.imgX, 
                            this.imgY
                        );
                    }
                    //animação indo para esquerda
                    if (this.teclado.esquerda){
                        this.x -= this.velocidade;
                        this.sprites.estadoAtual = -2;
                        this.animation(
                            this.img, 
                            this.sprites.indoEsquerda.atraso, 
                            this.sprites.indoEsquerda.totalSprites, 
                            this.sprites.indoEsquerda.altura, 
                            this.imgX, 
                            this.imgY
                        );
                    }
                    //animação parado na esquerda
                    if (!this.teclado.esquerda && this.sprites.estadoAtual == -2){
                        this.animation(
                            this.img, 
                            this.sprites.paradoEsquerda.atraso, 
                            this.sprites.paradoEsquerda.totalSprites, 
                            this.sprites.paradoEsquerda.altura, 
                            this.imgX, 
                            this.imgY
                        );
                    }
                    break;
                case "invertRightLeft":
                    if (this.teclado.direita) {
                        this.x -= this.velocidade;
                        this.sprites.estadoAtual = -2;
                        this.animation(
                            this.img, 
                            this.sprites.indoDireita.atraso, 
                            this.sprites.indoDireita.totalSprites, 
                            this.sprites.indoDireita.altura, 
                            this.imgX, 
                            this.imgY
                        );
                    }

                    if (!this.teclado.direita && this.sprites.estadoAtual == -2) {
                        this.animation(
                            this.img, 
                            this.sprites.paradoDireita.atraso, 
                            this.sprites.paradoDireita.totalSprites, 
                            this.sprites.paradoDireita.altura, 
                            this.imgX, 
                            this.imgY
                        );
                    }

                    if (this.teclado.esquerda) {
                        this.x += this.velocidade;
                        this.sprites.estadoAtual = 2;
                        this.animation(
                            this.img, 
                            this.sprites.indoEsquerda.atraso, 
                            this.sprites.indoEsquerda.totalSprites, 
                            this.sprites.indoEsquerda.altura, 
                            this.imgX, 
                            this.imgY
                        );
                    }

                    if (!this.teclado.esquerda && this.sprites.estadoAtual == 2) {
                        this.animation(
                            this.img, 
                            this.sprites.paradoEsquerda.atraso, 
                            this.sprites.paradoEsquerda.totalSprites, 
                            this.sprites.paradoEsquerda.altura, 
                            this.imgX, 
                            this.imgY
                        );
                    }
                    break;
                default:
                    break;
            }
        }
    }

    animation(
        img, 
        atrasoSprite, 
        totalSprite, 
        ySprite, 
        tamImgX, 
        tamImgY,
    ){
        this.contadorAtraso++;

        if (this.contadorAtraso >= atrasoSprite || this.numSprite > totalSprite - 1){
            this.numSprite ++;
            this.contadorAtraso = 0;

            if (this.numSprite > totalSprite - 1){
                this.numSprite = 0;
            }
            this.alternaSprite = this.numSprite * tamImgX;
        }
        
        this.caneta.drawImage(
            img, 
            this.alternaSprite, 
            ySprite, 
            tamImgX, 
            tamImgY, 
            this.x, 
            this.y, 
            tamImgX * this.scale, 
            tamImgY * this.scale
        );
    }

    get getDescricao(){
        return this.descricao;
    }

    get getImgX(){
        return this.imgX;
    }

    get getImgY(){
        return this.imgY;
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

    get getDropTipo(){
        return this.dropTipo;
    }

    set setPosX(position){
        this.x = position;
    }

    set setPosY(position){
        this.y = position;
    }

    set setDropTipo(tipo){
        this.dropTipo = tipo;
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
        // Limita o valor da escala
        if (scale < 0.05) scale = 0.05;
        if (scale > 6) scale = 6;

        const baseAntiga = this.y + (this.imgY * this.scale);

        this.scale = scale;

        const novaAltura = this.imgY * this.scale;

        this.y = baseAntiga - novaAltura;

        // Atualiza a caixa de colisão
        this.rect.width = this.imgX * this.scale;
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