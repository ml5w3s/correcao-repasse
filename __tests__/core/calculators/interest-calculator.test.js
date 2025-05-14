// __tests__/core/calculators/interest-calculator.test.js

import { calculateInterestAmount } from '../../../js/core/calculators/interest-calculator.js';

describe('calculateInterestAmount', () => {
  const mockRules = [
    {
      id: 'MOCK_RULE',
      startDate: new Date('2000-01-01'),
      endDate: new Date('2025-12-31'),
      monthlyRate: 0.01, // 1%
    },
  ];

  test('should calculate interest based on rule', () => {
    const baseAmount = 1000;
    const referenceDate = new Date('2024-01-01');

    const result = calculateInterestAmount(baseAmount, referenceDate, mockRules);

    expect(result).toBeCloseTo(10); // 1% of 1000
  });

  test('should throw error if no rule matches date', () => {
    const baseAmount = 1000;
    const invalidDate = new Date('1999-01-01');

    expect(() => {
      calculateInterestAmount(baseAmount, invalidDate, mockRules);
    }).toThrow('No interest rule found for the given date');
  });
});
