class Display{
    constructor(dropDisplay){
        this.display = document.getElementById("display");
        this.dropDisplay = dropDisplay;
    }

    desenhar() {
        this.display.innerHTML = `
            <p>Nome: ${this.dropDisplay.nome}</p>
            <p>Modificador: ${this.dropDisplay.modificador}</p>
            <p>Estado: ${this.dropDisplay.estado}</p>
            <p>Descrição: ${this.dropDisplay.descricao}</p>
        `;
    }

    get getDropDisplay(){
        return this.dropDisplay;
    }

    set setDropDisplay(dropDisplay){
        this.dropDisplay = dropDisplay;
    }
}