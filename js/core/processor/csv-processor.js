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
  const fatorCJF = parseFloat(row['Fator de Atualização do CJF até Dez/2021'].replace(',', '.'));

  const valorCorrigido = originalAmount * fatorCJF;
  const jurosMora = taxas.juros;
  const jurosMoratorios = valorCorrigido * taxas.juros;
  const taxaSelic = taxas.selic;
  const valorComJuros = (valorCorrigido + jurosMoratorios) * taxas.selic;
  const valorSelic = (valorCorrigido + jurosMoratorios) * taxas.selic;
  const valorTotal = valorCorrigido + jurosMoratorios + valorSelic;

  return {
    ...row,
    'Valor atualizado em dez/2021 (R$)': formatarValor(valorCorrigido),
    'juros moratorios %': jurosMora,
    'Valor dos juros monetários até dez/2021 (R$)': formatarValor(jurosMoratorios),
    'taxa Selic dez/21 a ago/24' : taxas.selic,
    'Valor atualização selic (R$)': formatarValor(valorSelic),
    'Valor total Devido em ago/2024 (R$)': formatarValor(valorTotal),
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
