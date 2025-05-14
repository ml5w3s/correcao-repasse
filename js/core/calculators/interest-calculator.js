// js/core/calculators/interest-calculator.js

import { getInterestDefinitionForDate } from '../constants/interest-rules.js';
import { INTEREST_RULES_DEFINITIONS } from '../constants/interest-rules.js';

/**
 * Calculates interest amount based on date and interest rules.
 *
 * @param {number} baseAmount - The original amount.
 * @param {Date} referenceDate - The date to determine which rule to apply.
 * @param {Array} rules - (Optional) List of interest rules.
 * @returns {number} - Calculated interest amount.
 */
export function calculateInterestAmount(baseAmount, referenceDate, rules = INTEREST_RULES_DEFINITIONS) {
  const rule = getInterestDefinitionForDate(referenceDate, rules);

  if (!rule) {
    throw new Error('No interest rule found for the given date');
  }

  const monthlyRate = rule.monthlyRate || 0;
  return baseAmount * monthlyRate;
}
