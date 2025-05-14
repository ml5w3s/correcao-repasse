// teste/core/constants/interest-rules.test.js
import { INTEREST_RULES_DEFINITIONS } from '../../../js/core/constants/interest-rules.js';
import { getInterestDefinitionForDate } from '../../../js/core/constants/interest-rules.js';

describe('INTEREST_RULES_DEFINITIONS', () => {
  test('should be frozen (immutable)', () => {
    expect(Object.isFrozen(INTEREST_RULES_DEFINITIONS)).toBe(true);
  });

  test('should contain definitions with required fields', () => {
    for (const def of INTEREST_RULES_DEFINITIONS) {
      expect(def).toHaveProperty('id');
      expect(def).toHaveProperty('interestType');
      expect(def).toHaveProperty('description');
      // startDate and endDate are optional, so we check type if present
      if (def.startDate) expect(def.startDate).toBeInstanceOf(Date);
      if (def.endDate) expect(def.endDate).toBeInstanceOf(Date);
      if (def.monthlyRate !== undefined) {
        expect(typeof def.monthlyRate).toBe('number');
      }
    }
  });
});

describe('getInterestDefinitionForDate', () => {
  test('should return fixed interest definition for date in 2001', () => {
    const date = new Date('2001-05-10');
    const rule = getInterestDefinitionForDate(date, INTEREST_RULES_DEFINITIONS);
    expect(rule).toMatchObject({
      id: 'JUROS_FIXO_ATE_DEZ2002',
      monthlyRate: 0.005,
    });
  });

  test('should return SELIC interest rule for March 2004', () => {
    const date = new Date('2004-03-15');
    const rule = getInterestDefinitionForDate(date, INTEREST_RULES_DEFINITIONS);
    expect(rule).toMatchObject({
      id: 'JUROS_SELIC_JAN2003_JUN2009',
      interestType: 'SELIC_MENSAL',
    });
  });

  test('should return POUPANCA interest rule for September 2018', () => {
    const date = new Date('2018-09-01');
    const rule = getInterestDefinitionForDate(date, INTEREST_RULES_DEFINITIONS);
    expect(rule).toMatchObject({
      id: 'JUROS_POUPANCA_MAI2012_NOV2021',
      interestType: 'POUPANCA_MENSAL',
    });
  });

  test('should return last rule (no interest) for 2024-01-01', () => {
    const date = new Date('2024-01-01');
    const rule = getInterestDefinitionForDate(date, INTEREST_RULES_DEFINITIONS);
    expect(rule).toMatchObject({
      id: 'JUROS_NAO_INCIDENCIA_APOS_NOV2021',
      monthlyRate: 0,
    });
  });

  test('should return null for a future date not covered by any rule if last rule has no startDate', () => {
    const definitionsWithoutFinal = INTEREST_RULES_DEFINITIONS.filter(
      d => d.id !== 'JUROS_NAO_INCIDENCIA_APOS_NOV2021'
    );
    const date = new Date('2024-01-01');
    const rule = getInterestDefinitionForDate(date, definitionsWithoutFinal);
    expect(rule).toBe(null);
  });
});
