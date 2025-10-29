class Terreno {
    constructor(caneta) {
        this.caneta = caneta;
        const tela = document.getElementById("tela");
        this.telaWidth = tela.width;
        this.telaHeight = tela.height;

        this.img = new Image();
        this.img.src = "png/Tiles/2.png";

        this.tamanhoImagemX = 128;
        this.tamanhoImagemY = 128;
        this.scale = 0.8;

        this.posY = this.telaHeight - this.tamanhoImagemY * this.scale;
    }

    desenhar() {
        const tileWidth = this.tamanhoImagemX * this.scale;

        // garante que o desenho só ocorra após carregar a imagem
        if (!this.img.complete) {
            this.img.onload = () => this.desenhar();
            return;
        }

        // desenha blocos até preencher a largura total da tela
        for (let x = 0; x < this.telaWidth; x += tileWidth) {
            this.caneta.drawImage(
                this.img,              // imagem fonte
                0,                     // sx
                0,                     // sy
                this.tamanhoImagemX,   // sw
                this.tamanhoImagemY,   // sh
                x,                     // dx (posição horizontal)
                this.posY,             // dy (posição vertical)
                this.tamanhoImagemX * this.scale, // dw
                this.tamanhoImagemY * this.scale  // dh
            );
        }
    }

    get getScale(){
        return this.scale;
    }

    get getTamImgY(){
        return this.tamanhoImagemY;
    }
}
