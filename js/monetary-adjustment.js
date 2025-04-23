export class MonetaryAdjustment {
    constructor() {
        this.ano = null;
        this.mes = null;
    }

    setData(data) {
        this.ano = data.getFullYear();
        this.mes = data.getMonth() + 1;
    }

    getIndiceCorrecao() {
        if (this.ano < 2001) return 'UFIR';
        if (this.ano < 2021 || (this.ano === 2021 && this.mes <= 11)) return 'IPCA-E';
        return 0.3083;
    }

    getJurosMoratorios() {
        if (this.ano < 2003) return 0.5;
        if (this.ano < 2009 || (this.ano === 2009 && this.mes <= 6)) return 'SELIC';
        if (this.ano < 2012 || (this.ano === 2012 && this.mes <= 4)) return 0.5;
        if (this.ano < 2021 || (this.ano === 2021 && this.mes <= 11)) return 'POUPANCA';
        return 0.179;
    }

    calcularCorrecao(valorOriginal, data) {
        this.setData(data);

        const indice = this.getIndiceCorrecao();
        let juros = this.getJurosMoratorios();

        const fatores = {
            'UFIR': 1.5,
            'IPCA-E': 1.3,
            'SELIC': 1.2
        };

        const taxas = {
            'SELIC': 1.2,
            'POUPANCA': 0.6
        };

        const fatorCorrecao = fatores[indice] ?? 1.0;

        if (typeof juros === 'string') {
            juros = taxas[juros] ?? 0;
        }

        const valorCorrigido = valorOriginal * fatorCorrecao;

        return {
            valorCorrigido,
            indice,
            juros
        };
    }
}
