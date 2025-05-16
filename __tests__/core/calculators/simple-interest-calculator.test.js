import { SimpleInterestCalculator } from '../../../js/core/calculators/simple-interest-calculator.js';

describe('SimpleInterestCalculator', () => {
  const rule = {
    percentualJuros: 8
  };

  const calculator = new SimpleInterestCalculator(rule);

  test('should correctly calculate interest and total', () => {
    const originalValue = 2000;
    const referenceDate = new Date('2023-08-01');

    const result = calculator.calculate(originalValue, referenceDate);

    expect(result.indice).toBeNull();
    expect(result.percentualJuros).toBe(8);
    expect(result.valorCorrigido).toBe(2000);
    expect(result.valorJuros).toBeCloseTo(160);
    expect(result.valorTotal).toBeCloseTo(2160);
    expect(result.valorSelic).toBeNull();
  });

  test('should handle zero original value', () => {
    const result = calculator.calculate(0, new Date());

    expect(result.valorCorrigido).toBe(0);
    expect(result.valorJuros).toBe(0);
    expect(result.valorTotal).toBe(0);
  });
});
