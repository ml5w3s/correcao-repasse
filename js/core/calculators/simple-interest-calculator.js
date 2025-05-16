// js/core/calculators/simple-interest-calculator.js

/**
 * Strategy for applying simple interest to a value.
 */
export class SimpleInterestCalculator {
  /**
   * @param {Object} rule - The interest rule to apply (must include 'percentualJuros', etc.).
   */
  constructor(rule) {
    this.rule = rule;
  }

  /**
   * Calculates interest and total value.
   * @param {number} originalValue - The base value from the CSV.
   * @param {Date} referenceDate - Date used for interest rule application.
   * @returns {Object} - Result object with detailed calculation.
   */
  calculate(originalValue, referenceDate) {
    const { percentualJuros } = this.rule;

    const interestAmount = originalValue * (percentualJuros / 100);
    const total = originalValue + interestAmount;

    return {
      indice: null,
      percentualJuros,
      valorCorrigido: originalValue,
      valorJuros: interestAmount,
      valorSelic: null,
      valorTotal: total
    };
  }
}
