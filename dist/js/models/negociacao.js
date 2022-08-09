export class Negociacao {
    constructor(data, quantidade, valor) {
        this.data = data;
        this.quantidade = quantidade;
        this.valor = valor;
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
    static createFrom(dataString, quantityString, valueString) {
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        const quantity = parseInt(quantityString);
        const value = parseFloat(valueString);
        return new Negociacao(date, quantity, value);
    }
}
