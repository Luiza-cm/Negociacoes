import { Modelo } from './../interfaces/modelo.js';

export class Negociacao implements Modelo<Negociacao> {
    // private data: Date;
    // private quantidade: number;
    // private valor: number;

    // constructor(data: Date, quantidade: number , valor: number){
    //     this.data = data;
    //     this.quantidade = quantidade;
    //     this.valor = valor;
    // }
    
    // quando o construtor recebe parametros/atributos de entrada, os atributos da classe
    // podem ser declarados no proprio construtor, como abaixo

    constructor(
        private data: Date, 
        private quantidade: number, 
        private valor: number

        // uma alternativa para o modo privado de uma classe eh declara-la
        // como public readonly - assim ninguem podera modifica-la fora do construtor da classe
    ) {}

    public static createFrom(dataString: string, quantityString: string, valueString: string): Negociacao {
        const exp = /-/g;
        const date = new Date(dataString.replace(exp,','));
        const quantity = parseInt(quantityString);
        const value = parseFloat(valueString);

        return new Negociacao(date, quantity, value);
    }

    get getData(): Date {

        // programacao defensiva: evita que metodos de objetos internos do js (ex. setTime() de Date() )
        // altere a data original fornecida pelo usuario
        
        const data = new Date(this.data.getTime());
        return data;
    }

    get getQuantidade(): number {
        return this.quantidade;
    }

    get getValor(): number {
        return this.valor;
    }

    get getVolume(): number {
        return this.valor * this.quantidade;
    }

    public paraTexto(): string {
        return `
            Data: ${this.data},
            Quantidade: ${this.quantidade},
            Valor: ${this.valor}
            
        `;
    }

    public ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() === negociacao.data.getDate()
            && this.data.getMonth() === negociacao.data.getMonth()
            && this.data.getFullYear() === negociacao.data.getFullYear();
    }

    
    
}