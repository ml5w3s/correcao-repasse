// csv-processor.js
import { MonetaryAdjustment } from './monetary-adjustment.js';

export class CSVProcessor {
    constructor() {
        this.adjuster = new MonetaryAdjustment();
    }

    processarCSV(dataCSV) {
        return dataCSV.map(linha => this.processarLinha(linha));
    }

    processarLinha(linha) {
        const data = new Date(linha['Mês do Crédito'] + '-01');
        const valorOriginal = parseFloat(linha['Diferença devida e não paga (R$)']);

        const resultado = this.adjuster.calcularCorrecao(valorOriginal, data);

        return {
            ...linha,
            'Índice aplicado': resultado.indice,
            'Juros (%)': resultado.juros,
            'Valor Corrigido': resultado.valorCorrigido.toFixed(2)
        };
    }
} 
 
// Exemplo de uso:
// const processor = new CSVProcessor();
// const dadosCorrigidos = processor.processarCSV(dadosCSV);
// console.log(dadosCorrigidos);
