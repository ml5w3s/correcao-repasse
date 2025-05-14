// js/core/calculators/correction-calculator.js

import { CORRECTION_RULES_DEFINITIONS } from '../constants/correction-rules.js';
import { getCorrectionDefinitionForDate } from '../constants/correction-rules.js';

/**
 * Calculates the corrected amount based on a reference date and correction rules.
 *
 * @param {number} originalAmount - The original monetary value
 * @param {Date} referenceDate - The date used to determine which correction factor applies
 * @returns {number} The amount after applying the correction factor
 *
 * @throws {Error} If originalAmount is invalid
 * @throws {Error} If referenceDate is not a valid Date
 * @throws {Error} If no correction rule is found for the given date
 */
export function calculateCorrectedAmount(originalAmount, referenceDate) {
  if (!originalAmount || isNaN(originalAmount)) {
    throw new Error('Invalid original amount');
  }

  if (!(referenceDate instanceof Date) || isNaN(referenceDate)) {
    throw new Error('Invalid reference date');
  }

  const correctionRule = getCorrectionDefinitionForDate(referenceDate, CORRECTION_RULES_DEFINITIONS);

  if (!correctionRule) {
    throw new Error('No correction rule found for the given date');
  }

  return correctionRule.applyToAmount(originalAmount);
}
