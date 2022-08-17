export class View {
    constructor(selector) {
        const elemento = document.querySelector(selector);
        if (elemento) {
            this.element = elemento;
        }
        else {
            throw Error(`Seletor ${selector} não existe no DOM. Verifique.`);
        }
    }
    update(model) {
        let templete = this.templete(model);
        this.element.innerHTML = templete;
    }
}
//# sourceMappingURL=view.js.map