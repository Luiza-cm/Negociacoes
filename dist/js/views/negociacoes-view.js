import { View } from "./view.js";
export class NegociacoesView extends View {
    templete(model) {
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
    formatter(data) {
        return new Intl.DateTimeFormat('pt-BR').format(data);
    }
}
