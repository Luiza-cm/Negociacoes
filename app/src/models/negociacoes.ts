import { Modelo } from './../interfaces/modelo.js';
import { Negociacao } from "./negociacao.js";

export class Negociacoes implements Modelo<Negociacoes> {
    private negociacoes: Array<Negociacao> = [];

    // obs: declaracao do tipo array pode ser feito de duas formas:
    // a: Array<T> OU a: T[]

    public adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    // obs: declaracao do tipo ReadonlyArray pode ser feito de duas formas:
    // a: ReadonlyArray<T> OU a: readonly T[]
    public lista(): ReadonlyArray<Negociacao> {
        return this.negociacoes;
    }

    public paraTexto(): string {
        return JSON.stringify(this.negociacoes, null, 2);
    }

    ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista())
    }
}

// const negociacoes = new Negociacoes();
// negociacoes.lista().forEach(element => {
//     element.
// });