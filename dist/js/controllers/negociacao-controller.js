import { WeekDays } from '../enums/week-days.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('#negociacoesView');
        this.mensagemView = new MensagemView('#mensagemView');
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.createFrom(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.workDay(negociacao.getData)) {
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas!');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.updateViews();
        this.limparFormulario();
    }
    workDay(date) {
        return date.getDay() > WeekDays.SUNDAY
            && date.getDay() < WeekDays.SATURDAY;
    }
    limparFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    updateViews() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso!');
    }
}
