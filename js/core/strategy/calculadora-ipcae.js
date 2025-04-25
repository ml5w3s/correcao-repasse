export class CalculadoraIPCAE {
    constructor(taxa) {
        this.taxa = taxa;
    }

    calcular(valorOriginal, data) {
        const fator = 1 + this.taxa; // ou buscar com base na data
        const valorCorrigido = valorOriginal * fator;

        return {
            indice: 'IPCA-E',
            valorCorrigido,
            fator,
        };
    }
}
