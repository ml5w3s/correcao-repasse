export class CalculadoraSELIC {
    constructor(taxa) {
        this.taxa = taxa;
    }

    calcular(valorOriginal, data) {
        const fator = 1 + this.taxa; // poderia também ser buscado por data
        const valorCorrigido = valorOriginal * fator;

        return {
            indice: 'SELIC',
            valorCorrigido,
            fator,
        };
    }
}
