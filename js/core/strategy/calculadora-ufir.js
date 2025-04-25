// calculators/calculadora-ufir.js
export { CalculadoraUFIR };
class CalculadoraUFIR {
    constructor(taxa) {
        this.taxa = taxa;
    }

    calcular(valorOriginal, data) {
        const fator = 1 + this.taxa; // Pode evoluir para uso dinâmico por data
        const valorCorrigido = valorOriginal * fator;

        return {
            indice: 'UFIR',
            valorCorrigido,
            fator,
        };
    }
}

