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

export const CORRECTION_RULES = Object.freeze({
  UFIR: new CorrectionFactor(1.5),
  'IPCA-E': new CorrectionFactor(1.3),
  SELIC: new CorrectionFactor(1.2)
});
