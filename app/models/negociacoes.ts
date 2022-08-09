import { Negociacao } from "./negociacao";

export class Negociacoes {
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
}

// const negociacoes = new Negociacoes();
// negociacoes.lista().forEach(element => {
//     element.
// });