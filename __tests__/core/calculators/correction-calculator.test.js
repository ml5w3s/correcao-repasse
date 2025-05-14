// __tests__/core/calculators/correction-calculator.test.js

// Mock deve vir antes da importação de qualquer dependente
jest.mock('../../../js/core/constants/correction-rules.js', () => {
  const { CorrectionFactor } = require('../../../js/core/models/correction-factor.js');

  const mockDefinitions = [
    new CorrectionFactor({
      id: 'MOCK_RULE',
      label: 'Mock Rule',
      startDate: new Date('2000-01-01'),
      endDate: new Date('2020-12-31'),
      rate: 1.5,
    }),
  ];

  return {
    CORRECTION_RULES_DEFINITIONS: mockDefinitions,
    getCorrectionDefinitionForDate: (date) => {
      return mockDefinitions.find((def) => {
        return (
          (!def.startDate || date >= def.startDate) &&
          (!def.endDate || date <= def.endDate)
        );
      }) || null;
    },
  };
});

import { calculateCorrectedAmount } from '../../../js/core/calculators/correction-calculator.js';

describe('calculateCorrectedAmount', () => {
  test('should apply correction using mock rule', () => {
    const value = 100;
    const date = new Date('2010-06-15');
    const result = calculateCorrectedAmount(value, date);
    expect(result).toBeCloseTo(150); // 100 * 1.5
  });
  // Usa uma regra mock para validar o cálculo da correção
  test('should throw error for invalid amount', () => {
    expect(() => {
      calculateCorrectedAmount(null, new Date('2010-01-01'));
    }).toThrow('Invalid original amount');
  });

  test('should throw error for invalid date', () => {
    expect(() => {
      calculateCorrectedAmount(100, 'invalid-date');
    }).toThrow('Invalid reference date');
  });

  test('should throw error if no applicable correction rule', () => {
    const futureDate = new Date('2030-01-01');
    expect(() => {
      calculateCorrectedAmount(100, futureDate);
    }).toThrow('No correction rule found for the given date');
  });
  // Verifica se exceção é lançada quando nenhuma regra é aplicável
});
