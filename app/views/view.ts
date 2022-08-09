import { Negociacao } from "../models/negociacao";
import { Negociacoes } from "../models/negociacoes";

export abstract class View<T> {

    protected element: HTMLElement;
    private scape = false;

    constructor(selector: string, scape?: boolean){
        const elemento = document.querySelector(selector);
        if (elemento) {
            this.element = elemento as HTMLElement
        } else {
            throw Error (`Seletor ${selector} não existe no DOM. Verifique.`)
        }
            
        if (scape){
            this.scape = scape;
        }
    }

    // declaracao de metodo abstrato que obriga o filho implementar o metodo
    protected abstract templete(model: T): string;

    public update(model: T): void {
        let templete = this.templete(model);
        if(this.scape) {
            templete = templete.replace(/<script>[\s\S/]*?<\/script>/,'')
        }
        this.element.innerHTML = templete;
    }

    
}