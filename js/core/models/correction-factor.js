// js/core/models/correction-factor.js

/**
 * Represents a correction factor rule for monetary updates,
 * with applicable date range and a correction rate.
 */
export class CorrectionFactor {
  /**
   * @param {Object} options - Configuration object
   * @param {string} options.id - Unique identifier for the correction rule
   * @param {Date} options.startDate - Date from which this rule is applicable
   * @param {Date|null} [options.endDate=null] - Optional end date of rule applicability
   * @param {number} options.rate - Correction multiplier (e.g. 1.05 = 5% increase)
   */
  constructor({ id, startDate, endDate = null, rate }) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.rate = rate;
  }

  /**
   * Checks if this correction factor applies to a given date.
   *
   * @param {Date} date - The date to check
   * @returns {boolean} True if date falls within the rule's period
   */
  appliesTo(date) {
    const isAfterStart = date >= this.startDate;
    const isBeforeEnd = !this.endDate || date <= this.endDate;
    return isAfterStart && isBeforeEnd;
  }

  /**
   * Applies this correction factor to a monetary amount.
   *
   * @param {number} amount - The amount to apply the correction to
   * @returns {number} The corrected amount
   */
  applyToAmount(amount) {
    return amount * this.rate;
  }

  /**
   * Returns the correction rate associated with this rule.
   *
   * @returns {number} Correction multiplier (e.g. 1.1 = 10% increase)
   */
  getRate() {
    return this.rate;
  }
}
