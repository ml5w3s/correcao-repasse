// __tests__/core/factory/calculation-strategy-factory.test.js
import { CalculationStrategyFactory } from '../../../js/core/factory/calculation-strategy-factory.js';
import { MonetaryCorrectionCalculator, SimpleInterestCalculator } from '../../../js/core/calculators';

describe('CalculationStrategyFactory', () => {
  const mockCorrectionRule = {
    type: 'monetary-correction',
    appliesTo: (date) => date < new Date('2022-01-01'),
    index: 'CJF',
    multiplier: 1.15
  };

  const mockInterestRule = {
    type: 'simple-interest',
    appliesTo: (date) => date >= new Date('2022-01-01'),
    rate: 0.05
  };

  const factory = new CalculationStrategyFactory(
    [mockCorrectionRule],
    [mockInterestRule]
  );

  test('returns MonetaryCorrectionCalculator for a date before 2022', () => {
    const date = new Date('2021-06-01');
    const calculator = factory.getCalculator(date);
    expect(calculator).toBeInstanceOf(MonetaryCorrectionCalculator);
    expect(calculator.rule.index).toBe('CJF');
  });

  test('returns SimpleInterestCalculator for a date after 2022', () => {
    const date = new Date('2022-03-01');
    const calculator = factory.getCalculator(date);
    expect(calculator).toBeInstanceOf(SimpleInterestCalculator);
    expect(calculator.rule.rate).toBe(0.05);
  });

  test('throws error if no strategy matches the given date', () => {
    const emptyFactory = new CalculationStrategyFactory([], []);
    const date = new Date('1900-01-01');
    expect(() => emptyFactory.getCalculator(date))
      .toThrow('No calculation strategy defined for the given date');
  });
});
