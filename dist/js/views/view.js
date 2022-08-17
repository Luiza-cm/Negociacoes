export class View {
    constructor(selector, scape) {
        this.scape = false;
        const elemento = document.querySelector(selector);
        if (elemento) {
            this.element = elemento;
        }
        else {
            throw Error(`Seletor ${selector} não existe no DOM. Verifique.`);
        }
        if (scape) {
            this.scape = scape;
        }
    }
    update(model) {
        const t1 = performance.now();
        let templete = this.templete(model);
        if (this.scape) {
            templete = templete.replace(/<script>[\s\S/]*?<\/script>/, '');
        }
        this.element.innerHTML = templete;
        const t2 = performance.now();
        console.log(`Tempo de execução do método update: ${(t2 - t1) / 1000} segundos`);
    }
}
