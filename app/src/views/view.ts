export abstract class View<T> {

    protected element: HTMLElement;

    constructor(selector: string){
        const elemento = document.querySelector(selector);
        if (elemento) {
            this.element = elemento as HTMLElement
        } else {
            throw Error (`Seletor ${selector} não existe no DOM. Verifique.`)
        }
        
    }

    // declaracao de metodo abstrato que obriga o filho implementar o metodo
    protected abstract templete(model: T): string;

    public update(model: T): void {
        let templete = this.templete(model);
        this.element.innerHTML = templete;
    }

    
}