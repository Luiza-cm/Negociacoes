export class Negociacao {
    constructor(data, quantidade, valor) {
        this.data = data;
        this.quantidade = quantidade;
        this.valor = valor;
    }
    static createFrom(dataString, quantityString, valueString) {
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        const quantity = parseInt(quantityString);
        const value = parseFloat(valueString);
        return new Negociacao(date, quantity, value);
    }
    get getData() {
        const data = new Date(this.data.getTime());
        return data;
    }
    get getQuantidade() {
        return this.quantidade;
    }
    get getValor() {
        return this.valor;
    }
    get getVolume() {
        return this.valor * this.quantidade;
    }
    paraTexto() {
        return `
            Data: ${this.data},
            Quantidade: ${this.quantidade},
            Valor: ${this.valor}
            
        `;
    }
    ehIgual(negociacao) {
        return this.data.getDate() === negociacao.data.getDate()
            && this.data.getMonth() === negociacao.data.getMonth()
            && this.data.getFullYear() === negociacao.data.getFullYear();
    }
}
//# sourceMappingURL=negociacao.js.map