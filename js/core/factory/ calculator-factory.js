import { calculateCorrectedAmount } from '../calculators/correction-calculator.js';
import { calculateInterestAmount } from '../calculators/interest-calculator.js';
import { messages } from '../i18n/messages.js';

export class CalculatorFactory {
  static getCalculator(referenceDate, locale = 'en') {
    return new StandardCalculator(referenceDate, locale);
  }
}

class StandardCalculator {
  constructor(referenceDate, locale = 'en') {
    this.referenceDate = referenceDate;
    this.locale = locale;
    this.text = messages[locale];
  }

  calculate(originalAmount, parameters) {
    const correctedAmount = calculateCorrectedAmount(originalAmount, this.referenceDate);
    const interestAmount = calculateInterestAmount(correctedAmount, this.referenceDate);
    const selicAmount = this._calculateSelic(originalAmount, parameters.selic);
    const totalAmount = correctedAmount + interestAmount + selicAmount;

    return {
      index: this.text.defaultIndex,
      interestRate: this.text.defaultInterestRate,
      correctedAmount,
      interestAmount,
      selicAmount,
      totalAmount
    };
  }

  _calculateSelic(amount, rate) {
    return rate ? amount * rate : 0;
  }
}
