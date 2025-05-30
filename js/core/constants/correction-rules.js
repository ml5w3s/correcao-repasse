// js/core/constants/correction-rules.js

export class CorrectionFactor {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  applyCorrection(amount) {
    return amount * this.value;
  }
}

export const CORRECTION_RULES_DEFINITIONS = Object.freeze([
  {
    type: 'monetary-correction',
    appliesTo: (date) => date < new Date('2006-01-01'),
    factor: new CorrectionFactor(1.5),
    index: 'UFIR',
    percent: 1.791,
  },
  {
    type: 'monetary-correction',
    appliesTo: (date) => date >= new Date('2006-01-01') && date < new Date('2022-01-01'),
    factor: new CorrectionFactor(1.3),
    index: 'IPCA-E',
    percent: 1.5,
  },
  {
    type: 'monetary-correction',
    appliesTo: (date) => date >= new Date('2022-01-01'),
    factor: new CorrectionFactor(1.2),
    index: 'SELIC',
    percent: 2.0,
  }
]);
 
