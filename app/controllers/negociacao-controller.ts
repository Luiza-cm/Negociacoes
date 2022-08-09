import { WeekDays } from '../enums/week-days.js';
import { Negociacao } from '../models/negociacao.js'
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';



export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes: Negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');

    constructor() {
        this.inputData = <HTMLInputElement>document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona(): void {
        const negociacao = Negociacao.createFrom(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        )

        // condicional para verificar se eh dia util
        if (!this.workDay(negociacao.getData)) {
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas!');
            return ;
        }
        this.negociacoes.adiciona(negociacao);
        this.updateViews();
        this.limparFormulario();
    }

    private workDay(date: Date) {
        return date.getDay() > WeekDays.SUNDAY
            && date.getDay() < WeekDays.SATURDAY;
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private updateViews(): void{
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso!');
    }
}