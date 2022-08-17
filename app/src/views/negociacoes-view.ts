import { escape } from "../decorators/escape.js";
import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./view.js";

export class NegociacoesView extends View<Negociacoes> {

    @escape
    protected templete(model: Negociacoes): string{
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                    </tr>
                </thead>
                <tbody>
                    ${model.lista().map(negociacao => {
                        return `
                            <tr>
                                <td>${this.formatter(negociacao.getData)}</td>
                                <td>${negociacao.getQuantidade}</td>
                                <td>${negociacao.getValor}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
    }

    private formatter(data: Date){
        return new Intl.DateTimeFormat('pt-BR').format(data);
    }

}