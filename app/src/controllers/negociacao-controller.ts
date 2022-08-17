import { NegociacoesService } from './../services/negociacoes-service.js';
import { domInjector } from '../decorators/dom-injector.js';
import { inspect } from '../decorators/inspect.js';
import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { WeekDays } from '../enums/week-days.js';
import { Negociacao } from '../models/negociacao.js'
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
import { imprimir } from '../utils/imprimir.js';



export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement;

    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;

    @domInjector('#valor')
    private inputValor: HTMLInputElement;

    private negociacoes: Negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesService();

    constructor() {
        // this.inputData = <HTMLInputElement>document.querySelector('#data');
        // this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        // this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
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

    @logarTempoDeExecucao()
    @inspect()
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
        imprimir(negociacao);
        console.log(this.negociacoes.paraTexto());
        this.updateViews();
        this.limparFormulario();
    }

    public importarDados(): void {
        this.negociacoesService
            .obterNegociacoesDoDia()
            .then(negociacoesDeHoje => {
                return negociacoesDeHoje.filter(negociacoesDeHoje => {
                    return !this.negociacoes
                        .lista()
                        .some(negociacao => negociacao
                            .ehIgual(negociacoesDeHoje));
                });
            })
            .then(negociacoesDeHoje => {
                for(let negociacao of negociacoesDeHoje) {
                    this.negociacoes.adiciona(negociacao)
                }
                this.negociacoesView.update(this.negociacoes)
            });
            
    }

}