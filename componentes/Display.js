class Display{
    constructor(dropDisplay, personagemDisplay){
        this.drop = document.getElementById("drop");
        this.personagem = document.getElementById("personagem");
        this.dropDisplay = dropDisplay;
        this.personagemDisplay = personagemDisplay;
    }

    desenhar() {

        this.personagem.innerHTML = `
            <h1>Personagem</h1>
            <p>Tipo: ${this.personagemDisplay.tipo}</p>
            <p>Habilidade: ${this.personagemDisplay.habilidade}</p>
        `;

        if (this.dropDisplay.tipo){
            this.drop.innerHTML = `
                <h1>Drop coletado</h1>
                <p>Tipo: ${this.dropDisplay.tipo}</p>
                <p>Modificador: ${this.dropDisplay.modificador}</p>
                <p>Estado: ${this.dropDisplay.estado}</p>
                <p>Descrição: ${this.dropDisplay.descricao}</p>
            `;
        }else{
            this.drop.innerHTML = `
                <h1>Drop coletado</h1>
                <p>Nenhum drop coletado</p>
            `;
        }
    }

    get getDropDisplay(){
        return this.dropDisplay;
    }

    get getPersonagemDisplay(){
        return this.personagemDisplay;
    }

    set setDropDisplay(dropDisplay){
        this.dropDisplay = dropDisplay;
    }

    set setPersonagemDisplay(personagemDisplay){
        this.personagemDisplay = personagemDisplay;
    }
}