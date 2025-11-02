class Personagem2 {
    constructor(caneta, teclado, terreno) {
        const tela = document.getElementById("tela");
        this.caneta = caneta;
        this.teclado = teclado;
        this.terreno = terreno;
        this.telaWidth = tela.width;
        this.telaHeight = tela.height;

        this.velocidade = 1.5;
        this.scale = 0.20;
        this.descricao = { tipo: "Zumbi", habilidade: "Teletransporte" };
        this.estadoTeclado = "normal";
        this.dropTipo = "";

        this.frames = {};
        this.frameSizes = {};
        this.imagensCarregadas = false;
        this.frameAtual = null;
        this.numFrame = 0;
        this.contadorAtraso = 0;

        Promise.all([
        this.carregarFrames("png/sprites/personagem2/direita", 10),
        this.carregarFrames("png/sprites/personagem2/esquerda", 10),
        this.carregarFrames("png/sprites/personagem2/parado_direita", 15),
        this.carregarFrames("png/sprites/personagem2/parado_esquerda", 15),
        this.carregarFrames("png/sprites/personagem2/dead_direita", 12),
        this.carregarFrames("png/sprites/personagem2/dead_esquerda", 12)
        ]).then(([direita, esquerda, paradoDireita, paradoEsquerda, deadDireita, deadEsquerda]) => {

            this.frames.indoDireita    = direita;
            this.frames.indoEsquerda   = esquerda;
            this.frames.paradoDireita  = paradoDireita;
            this.frames.paradoEsquerda = paradoEsquerda;
            this.frames.deadDireita    = deadDireita;
            this.frames.deadEsquerda   = deadEsquerda;

            this.frameSizes.indoDireita    = { w: 430, h: 519, offsetY: 15 };
            this.frameSizes.indoEsquerda   = { w: 430, h: 519, offsetY: 15 };
            this.frameSizes.paradoDireita  = { w: 430, h: 519, offsetY: 15 };
            this.frameSizes.paradoEsquerda = { w: 430, h: 519, offsetY: 15 };
            this.frameSizes.deadDireita    = { w: 629, h: 526, offsetY: 55 };
            this.frameSizes.deadEsquerda   = { w: 629, h: 526, offsetY: 55 };

            this.estado = "paradoDireita"; // Estado inicial
            this.imgX = this.frameSizes.paradoDireita.w;
            this.imgY = this.frameSizes.paradoDireita.h;

            this.x = (this.telaWidth / 2) - ((this.imgX * this.scale) / 2);
            this.y = this.telaHeight - (this.terreno.getTamImgY * this.terreno.getScale) - (this.imgY * this.scale);
        
            this.imagensCarregadas = true;
        });
        
        // Caixa de colisão
        this.rect = { 
            x: this.x, 
            y: this.y, 
            width: this.imgX * this.scale, 
            height: this.imgY * this.scale 
        };
    }

    carregarFrames(caminhoBase, quantidade) {
        const promessas = [];

        for (let i = 1; i <= quantidade; i++) {
            promessas.push(new Promise(resolve => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.src = `${caminhoBase}/${i}.png`;
            }));
        }

        return Promise.all(promessas);
    }

    desenhar() {
        // Se ainda não carregou, não desenha nada
        if (!this.imagensCarregadas) return;

        // Lógica de multimovimento
        if (this.teclado.direita && this.teclado.esquerda) {
            switch (this.estado) {
                case "indoDireita":
                    this.estado = "paradoDireita";
                    break;
                case "indoEsquerda":
                    this.estado = "paradoEsquerda";
                    break;
                default:
                    break;
            }
        } else {
            // Lógica de movimento
            switch (this.estadoTeclado) {
                case "normal":
                    if (this.teclado.direita) {
                        this.x += this.velocidade;
                        this.estado = "indoDireita";
                    }
                    if (!this.teclado.direita && this.estado === "indoDireita") {
                        this.estado = "paradoDireita";
                    }
                    if (this.teclado.esquerda) {
                        this.x -= this.velocidade;
                        this.estado = "indoEsquerda";
                    }
                    if (!this.teclado.esquerda && this.estado === "indoEsquerda") {
                        this.estado = "paradoEsquerda";
                    }
                    break;
                case "invertRightLeft":
                    if (this.teclado.direita) {
                        this.x -= this.velocidade;
                        this.estado = "indoEsquerda";
                    }
                    if (!this.teclado.direita && this.estado === "indoEsquerda") {
                        this.estado = "paradoEsquerda";
                    }
                    if (this.teclado.esquerda) {
                        this.x += this.velocidade;
                        this.estado = "indoDireita";
                    }
                    if (!this.teclado.esquerda && this.estado === "indoDireita") {
                        this.estado = "paradoDireita";
                    }
                    break;
            }
        }
        
        // Atualiza o tamanho da hitbox
        const size = this.frameSizes[this.estado];

        this.rect.width = size.w * this.scale;
        this.rect.height = size.h * this.scale;
        this.rect.x = this.x;
        this.rect.y = this.y + (size.offsetY * this.scale);

        this.animar();
    }

    animar() {
        const atraso = 5;
        const imagens = this.frames[this.estado];

        this.contadorAtraso++;

        if (this.contadorAtraso >= atraso) {
            this.numFrame = (this.numFrame + 1) % imagens.length;
            this.contadorAtraso = 0;
            this.frameAtual = imagens[this.numFrame];
        }

        const frame = this.frameAtual || imagens[this.numFrame];
        if (!(frame instanceof HTMLImageElement) || !frame.complete) return;

        const size = this.frameSizes[this.estado];

        this.caneta.drawImage(
            frame,
            this.x,
            this.y + (size.offsetY * this.scale),
            size.w * this.scale,
            size.h * this.scale
        );
    }

    // Getters e setters
    get getDescricao() { return this.descricao; }
    get getImgX() { return this.imgX; }
    get getImgY() { return this.imgY; }
    get getPosX() { return this.x; }
    get getPosY() { return this.y; }
    get getScale() { return this.scale; }
    get getVelocidade() { return this.velocidade; }
    get getRect() { return this.rect; }
    get getEstadoTeclado() { return this.estadoTeclado; }
    get getDropTipo() { return this.dropTipo; }

    set setPosX(position) { this.x = position; }
    set setPosY(position) { this.y = position; }
    set setDropTipo(tipo) { this.dropTipo = tipo; }
    
    set setEstadoTeclado(estado) {
        this.estadoTeclado = estado === "invertRightLeft" ? "invertRightLeft" : "normal";
    }

    set setScale(scale) {
        if (scale < 0.05) scale = 0.05;
        if (scale > 6) scale = 6;

        const baseAntiga = this.y + (this.imgY * this.scale);
        this.scale = scale;
        const novaAltura = this.imgY * this.scale;
        this.y = baseAntiga - novaAltura;

        this.rect.width = this.imgX * this.scale;
        this.rect.height = novaAltura;
        this.rect.x = this.x;
        this.rect.y = this.y;
    }

    set setVelocidade(velocidade) {
        this.velocidade = velocidade <= 0 ? 1 : velocidade;
    }
}
