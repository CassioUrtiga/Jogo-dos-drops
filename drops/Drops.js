class Drops{
    constructor(caneta, personagens, terreno){
        const tela = document.getElementById("tela");
        this.telaWidth = tela.width;
        this.telaHeight = tela.height;

        this.terreno = terreno;
        this.personagens = personagens;

        this.drops = [
            () => new Cogumelo(caneta, () => this.personagens.getPersonagem, this.telaWidth, this.telaHeight),
            () => new Barril(caneta, () => this.personagens.getPersonagem, this.telaWidth, this.telaHeight),
            () => new Caixa(caneta, () => this.personagens.getPersonagem, this.telaWidth, this.telaHeight),
            () => new Placa(caneta, () => this.personagens.getPersonagem, this.telaWidth, this.telaHeight),
        ]

        this.dropsLength = this.drops.length;
        
        if (this.dropsLength !== 0){
            this.dropAtual = this.gerarNovoDrop();
            this.display = new Display(this.dropAtual, this.personagens.getPersonagem.getDescricao);
        }
    }

    desenhar() {
        if (this.dropsLength !== 0){
            const drop = this.dropAtual;

            const dropColidirPiso = this.colidirPiso(drop.getPosY, drop.getTamanhoImagemY, drop.getScale);

            const dropColidirPersonagem = drop.getDropColidirPersonagem;

            this.display.setPersonagemDisplay = this.personagens.getPersonagem.getDescricao;

            if (
                dropColidirPiso || 
                dropColidirPersonagem
            ){
                if (dropColidirPersonagem){
                    this.personagens.getPersonagem.setDropTipo = drop.getDisplay.tipo;
                    this.display.setDropDisplay = drop.getDisplay;
                }
                
                this.dropAtual = this.gerarNovoDrop();
            }else{
                drop.desenhar();
            }

            this.display.desenhar();
        }
    }

    colidirPiso(posY, tamanhoImagemY, scale){
        if (posY > this.telaHeight - (this.terreno.getTamImgY * this.terreno.getScale) - (tamanhoImagemY * scale)) {
            return true;
        }

        return false;
    }

    gerarNovoDrop() {
        return this.drops[Math.floor(Math.random() * this.dropsLength)]();
    }
}