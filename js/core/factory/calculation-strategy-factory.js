// js/core/factory/calculation-strategy-factory.js
import { CORRECTION_RULES_DEFINITIONS } from '../constants/correction-rules.js';
import { INTEREST_RULES_DEFINITIONS } from '../constants/interest-rules.js';

import { MonetaryCorrectionCalculator, SimpleInterestCalculator } from '../calculators/index.js';

/**
 * Factory responsible for selecting the appropriate calculator strategy
 * based on the provided date and predefined correction/interest rules.
 */
export class CalculationStrategyFactory {
  /**
   * @param {Array} correctionRules - Correction rules to apply
   * @param {Array} interestRules - Interest rules to apply
   */
  constructor(correctionRules = CORRECTION_RULES_DEFINITIONS, interestRules = INTEREST_RULES_DEFINITIONS) {
    this.correctionRules = correctionRules;
    this.interestRules = interestRules;
  }

  /**
   * Returns the appropriate calculator strategy for a given reference date.
   * @param {Date} referenceDate
   * @returns {MonetaryCorrectionCalculator|SimpleInterestCalculator}
   */
  getCalculator(referenceDate) {
    const correctionRule = this.correctionRules.find(rule => rule.appliesTo(referenceDate));
    const interestRule = this.interestRules.find(rule => rule.appliesTo(referenceDate));

    if (correctionRule && correctionRule.type === 'monetary-correction') {
      return new MonetaryCorrectionCalculator(correctionRule);
    }

    if (interestRule && interestRule.type === 'simple-interest') {
      return new SimpleInterestCalculator(interestRule);
    }

    throw new Error('No calculation strategy defined for the given date');
  }
}
