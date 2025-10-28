class Drops{
    constructor(caneta, personagem1, ambiente){
        const tela = document.getElementById("tela");
        this.telaWidth = tela.width;
        this.telaHeight = tela.height;

        this.ambiente = ambiente;

        this.drops = [
            () => new Cogumelo(caneta, personagem1, ambiente, this.telaWidth, this.telaHeight),
            () => new Barril(caneta, personagem1, ambiente, this.telaWidth, this.telaHeight),
            () => new Caixa(caneta, personagem1, ambiente, this.telaWidth, this.telaHeight),
            () => new Placa(caneta, personagem1, ambiente, this.telaWidth, this.telaHeight),
        ]

        this.dropAtual = this.gerarNovoDrop();

        this.display = new Display(this.dropAtual);
    }

    desenhar() {
        const drop = this.dropAtual;
        const dropColidirPiso = this.colidirPiso(drop.getPosY, drop.getTamanhoImagemY, drop.getScale);
        const dropColidirPersonagem1 = drop.getColidirPersonagem1;

        if (
            dropColidirPiso || 
            dropColidirPersonagem1
        ){
            if (dropColidirPersonagem1){
                this.display.setDropDisplay = drop.getDisplay;
                this.display.desenhar();
            }
            
            this.dropAtual = this.gerarNovoDrop();
        }else{
            drop.desenhar();
        }
    }

    colidirPiso(posY, tamanhoImagemY, scale){
        if (posY > this.telaHeight - (this.ambiente.getTamImgY * this.ambiente.getScale) - (tamanhoImagemY * scale)) {
            return true;
        }

        return false;
    }

    gerarNovoDrop() {
        return this.drops[Math.floor(Math.random() * this.drops.length)]();
    }
}