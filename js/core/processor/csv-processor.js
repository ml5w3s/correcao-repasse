// js/core/processor/csv-processor.js
import { CalculationStrategyFactory } from '../factory/calculation-strategy-factory.js';
import { formatarValor } from '../../utils/formatador.js';

/**
 * Processa os dados do CSV aplicando cálculos de correção e juros.
 */
export class CSVProcessor {
  constructor() {
    this.factory = new CalculationStrategyFactory();
  }

  /**
   * Processa o array de objetos CSV.
   * @param {Array<Object>} csvData
   * @param {Object} taxas - taxas como { ipcae, juros, selic }
   * @returns {Array<Object>}
   */
  processCSV(csvData, taxas) {
    return csvData.map(row => this.processRow(row, taxas));
  }

  /**
   * Processa uma linha do CSV aplicando as estratégias de cálculo.
   * @param {Object} row
   * @param {Object} taxas
   * @returns {Object}
   */
  processRow(row, taxas) {
    const creditDate = new Date(`${row['Mês do Crédito']}-01`);
    const originalAmount = this._parseCurrency(row['Diferença devida e não paga (R$)']);

    const calculator = this.factory.getCalculator(creditDate);
    const result = calculator.calculate(originalAmount, creditDate, taxas);

    return {
      ...row,
      'Índice aplicado': result.indice,
      'Juros aplicado (%)': result.percentualJuros,
      'Valor atualizado em dez/2021 (R$)': formatarValor(result.valorCorrigido),
      'Valor dos juros monetários até dez/2021 (R$)': formatarValor(result.valorJuros),
      'Valor atualização selic (R$)': formatarValor(result.valorSelic ?? 0),
      'Valor total Devido em ago/2024 (R$)': formatarValor(result.valorTotal)
    };
  }

  /**
   * Converte string monetária em número.
   * @param {string} valueStr
   * @returns {number}
   */
  _parseCurrency(valueStr) {
    if (!valueStr) return 0;
    return parseFloat(valueStr.replace(/\./g, '').replace(',', '.')) || 0;
  }
}
