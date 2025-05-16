import { MonetaryCorrectionCalculator } from '../../../js/core/calculators/monetary-correction-calculator.js';

describe('MonetaryCorrectionCalculator', () => {
  const rule = {
    indice: 1.25,
    percentualJuros: 10
  };

  const calculator = new MonetaryCorrectionCalculator(rule);

  test('should correctly calculate corrected value, interest, and total', () => {
    const originalValue = 1000;
    const referenceDate = new Date('2021-12-01');

    const result = calculator.calculate(originalValue, referenceDate);

    expect(result.indice).toBe(1.25);
    expect(result.percentualJuros).toBe(10);
    expect(result.valorCorrigido).toBeCloseTo(1250);
    expect(result.valorJuros).toBeCloseTo(125);
    expect(result.valorTotal).toBeCloseTo(1375);
    expect(result.valorSelic).toBeNull();
  });

  test('should handle zero original value', () => {
    const result = calculator.calculate(0, new Date());

    expect(result.valorCorrigido).toBe(0);
    expect(result.valorJuros).toBe(0);
    expect(result.valorTotal).toBe(0);
  });
});
