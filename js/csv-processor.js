import { CalculadoraFactory } from './core/factory/calculadora-factory.js';
import { formatarValor } from './utils/formatador.js';

/**
 * Classe responsável por processar arquivos CSV aplicando regras de correção e juros.
 * Atua como Contexto no padrão Strategy.
 */
export class CSVProcessor {
  constructor() {
    this.factory = new CalculadoraFactory();
  }

  /**
   * Processa uma lista de registros CSV.
   * @param {Array<Object>} dadosCSV - Array de objetos representando as linhas do CSV.
   * @returns {Array<Object>} - Dados com colunas de cálculo adicionadas.
   */
  processarCSV(dadosCSV) {
    return dadosCSV.map(linha => this.processarLinha(linha));
  }

  /**
   * Processa uma linha individual do CSV aplicando os cálculos de correção e juros.
   * @param {Object} linha - Linha do CSV como objeto.
   * @returns {Object} - Linha com os valores calculados.
   */
  processarLinha(linha) {
    const dataCredito = new Date(`${linha['Mês do Crédito']}-01`);
    const valorOriginal = this._parseValorMonetario(linha['Diferença devida e não paga (R$)']);

    const calculadora = this.factory.getCalculadora(dataCredito);
    const resultado = calculadora.calcular(valorOriginal, dataCredito);

    return {
      ...linha,
      'Índice aplicado': resultado.indice,
      'Juros aplicado (%)': resultado.percentualJuros,
      'Valor atualizado em dez/2021 (R$)': formatarValor(resultado.valorCorrigido),
      'Valor dos juros monetários até dez/2021 (R$)': formatarValor(resultado.valorJuros),
      'Valor atualização selic (R$)': formatarValor(resultado.valorSelic ?? 0),
      'Valor total Devido em ago/2024 (R$)': formatarValor(resultado.valorTotal)
    };
  }

  /**
   * Converte valor monetário do CSV em número.
   * @param {string} valorStr - Valor como string (pode conter . e ,).
   * @returns {number}
   */
  _parseValorMonetario(valorStr) {
    if (!valorStr) return 0;
    return parseFloat(
      valorStr.replace(/\./g, '').replace(',', '.')
    ) || 0;
  }
}

