// js/core/calculators/monetary-correction-calculator.js

/**
 * Strategy for applying monetary correction to a given value based on a date.
 */
export class MonetaryCorrectionCalculator {
  /**
   * @param {Object} rule - The correction rule to apply (must include 'indice', 'percentualJuros', etc.).
   */
  constructor(rule) {
    this.rule = rule;
  }

  /**
   * Calculates corrected values based on monetary index.
   * @param {number} originalValue - The base value from the CSV.
   * @param {Date} referenceDate - Date used to determine correction.
   * @returns {Object} - Result object with detailed calculation.
   */
  calculate(originalValue, referenceDate) {
    const { indice, percentualJuros } = this.rule;

    const correctedValue = originalValue * indice;
    const interestAmount = correctedValue * (percentualJuros / 100);
    const total = correctedValue + interestAmount;

    return {
      indice,
      percentualJuros,
      valorCorrigido: correctedValue,
      valorJuros: interestAmount,
      valorSelic: null,
      valorTotal: total
    };
  }
}
