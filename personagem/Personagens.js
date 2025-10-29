class Personagens{
    constructor(caneta, terreno, teclado){
        const tela = document.getElementById("tela");
        this.telaWidth = tela.width;
        this.telaHeight = tela.height;

        this.personagemPadrao = 0;

        this.personagens = [
            () => new Personagem1(caneta, teclado, terreno),
            () => new Personagem2(caneta, teclado, terreno),
            () => new Personagem3(caneta, teclado, terreno),
            () => new Personagem4(caneta, teclado, terreno),
        ]

        this.indiceAtual = this.personagemPadrao;
        this.personagemAtual = this.personagens[this.personagemPadrao]();
    }

    desenhar() {
        const personagem = this.personagemAtual;

        if (personagem.getDropTipo == "Caixa"){
            this.personagemAtual = this.gerarNovoPersonagem();
        }else{
            personagem.desenhar();
        }
    }

    gerarNovoPersonagem() {
        if (this.personagens.length <= 1) {
            this.personagemAtual.setDropTipo = "";
            return this.personagemAtual;
        }

        const personagensRestantes = [...this.personagens];
        personagensRestantes.splice(this.indiceAtual, 1);
        const novoIndice = Math.floor(Math.random() * personagensRestantes.length);

        // Atualiza o índice real (baseado na lista original)
        this.indiceAtual = (novoIndice >= this.indiceAtual) ? novoIndice + 1 : novoIndice;

        const novoPersonagem = this.personagens[this.indiceAtual]();

        // --- mantém posição e escala do personagem anterior ---
        const antigo = this.personagemAtual;

        // Mantém escala
        novoPersonagem.setScale = antigo.getScale;

        // Calcula a base do personagem antigo (y + altura real)
        const baseAntiga = antigo.getPosY + (antigo.getImgY * antigo.getScale);

        // Calcula a nova altura
        const novaAltura = novoPersonagem.getImgY * novoPersonagem.getScale;

        // Reposiciona o novo personagem para manter os pés no mesmo lugar
        novoPersonagem.setPosX = antigo.getPosX;
        novoPersonagem.setPosY = baseAntiga - novaAltura;

        novoPersonagem.setDropTipo = "";

        return novoPersonagem;
    }

    get getPersonagem(){
        return this.personagemAtual;
    }
}