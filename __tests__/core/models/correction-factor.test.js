import { CorrectionFactor } from '../../../js/core/models/correction-factor';

describe('CorrectionFactor', () => {
  const factor = new CorrectionFactor({
    id: 'CORRECAO_EXEMPLO',
    startDate: new Date('2020-01-01'),
    endDate: new Date('2020-12-31'),
    rate: 1.2
  });
  // Verifica se o valor é armazenado corretamente

  test('should apply factor correctly to amount', () => {
    const result = factor.applyToAmount(1000);
    expect(result).toBe(1200); // 1000 * 1.2
  });

  test('should return true for applicable date', () => {
    const date = new Date('2020-06-15');
    expect(factor.appliesTo(date)).toBe(true);
  });

  test('should return false for date before startDate', () => {
    const date = new Date('2019-12-31');
    expect(factor.appliesTo(date)).toBe(false);
  });

  test('should return false for date after endDate', () => {
    const date = new Date('2021-01-01');
    expect(factor.appliesTo(date)).toBe(false);
  });

  test('should handle rule without endDate', () => {
    const openFactor = new CorrectionFactor({
      id: 'CORRECAO_ABERTA',
      startDate: new Date('2022-01-01'),
      rate: 1.1
    });

    const futureDate = new Date('2025-05-10');
    expect(openFactor.appliesTo(futureDate)).toBe(true);
  });
  // Verifica se a correção é aplicada corretamente ao valor base
});
