// js/core/constants/interest-rules.js

export class InterestRate {
  constructor(monthlyRate) {
    this.monthlyRate = monthlyRate;
  }

  getMonthlyRate() {
    return this.monthlyRate;
  }

  calculateMonthlyInterest(amount) {
    return amount * this.monthlyRate;
  }

  toString() {
    return `${(this.monthlyRate * 100).toFixed(2)}% a.m.`;
  }
}

export const INTEREST_RULES_DEFINITIONS = Object.freeze([
  {
    id: 'JUROS_FIXO_ATE_DEZ2002',
    interestType: 'FIXO_MENSAL',
    monthlyRate: 0.005,
    endDate: new Date('2002-12-31T23:59:59.999'),
    description: 'Juros de 0,5% a.m. até Dez/2002'
  },
  {
    id: 'JUROS_SELIC_JAN2003_JUN2009',
    interestType: 'SELIC_MENSAL',
    startDate: new Date('2003-01-01'),
    endDate: new Date('2009-06-30T23:59:59.999'),
    description: 'Juros pela SELIC de Jan/2003 a Jun/2009'
  },
  {
    id: 'JUROS_FIXO_JUL2009_ABR2012',
    interestType: 'FIXO_MENSAL',
    monthlyRate: 0.005,
    startDate: new Date('2009-07-01'),
    endDate: new Date('2012-04-30T23:59:59.999'),
    description: 'Juros de 0,5% a.m. de Jul/2009 a Abr/2012'
  },
  {
    id: 'JUROS_POUPANCA_MAI2012_NOV2021',
    interestType: 'POUPANCA_MENSAL',
    startDate: new Date('2012-05-01'),
    endDate: new Date('2021-11-30T23:59:59.999'),
    description: 'Juros pela Poupança de Mai/2012 a Nov/2021'
  },
  {
    id: 'JUROS_NAO_INCIDENCIA_APOS_NOV2021',
    interestType: 'SEM_JUROS_ADICIONAIS',
    monthlyRate: 0,
    startDate: new Date('2021-12-01'),
    description: 'Sem juros moratórios adicionais após Nov/2021'
  }
])

export function getInterestDefinitionForDate(date, definitions = INTEREST_RULES_DEFINITIONS) {
  for (const def of definitions) {
    const starts = def.startDate || new Date(-8640000000000000); // início mínimo
    const ends = def.endDate || new Date(8640000000000000);      // fim máximo
    if (date >= starts && date <= ends) {
      return def;
    }
  }
  return null;
};
