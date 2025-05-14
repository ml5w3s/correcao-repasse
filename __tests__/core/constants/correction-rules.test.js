// teste/core/constants/regras-correcao.test.js

import { CorrectionFactor, CORRECTION_RULES } from '../../../js/core/constants/correction-rules.js';

describe('CorrectionFactor class', () => {
  test('stores the value passed to constructor', () => {
    const factor = new CorrectionFactor(1.25);
    expect(factor.getValue()).toBe(1.25);
  });

  test('applies correction properly', () => {
    const factor = new CorrectionFactor(1.5);
    expect(factor.applyCorrection(100)).toBe(150);
  });
});

describe('CORRECTION_RULES object', () => {
  test('contains UFIR with correct value', () => {
    expect(CORRECTION_RULES.UFIR).toBeInstanceOf(CorrectionFactor);
    expect(CORRECTION_RULES.UFIR.getValue()).toBe(1.5);
  });

  test('contains IPCA-E with correct value', () => {
    expect(CORRECTION_RULES['IPCA-E']).toBeInstanceOf(CorrectionFactor);
    expect(CORRECTION_RULES['IPCA-E'].getValue()).toBe(1.3);
  });

  test('contains SELIC with correct value', () => {
    expect(CORRECTION_RULES.SELIC).toBeInstanceOf(CorrectionFactor);
    expect(CORRECTION_RULES.SELIC.getValue()).toBe(1.2);
  });

  test('correctly applies correction for SELIC', () => {
    const selic = CORRECTION_RULES.SELIC;
    expect(selic.applyCorrection(200)).toBe(240);
  });

  test('is immutable (Object.freeze)', () => {
    expect(Object.isFrozen(CORRECTION_RULES)).toBe(true);
  });
});
