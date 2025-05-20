import { CSVProcessor } from '../../../js/core/processor/csv-processor.js';
import { CalculationStrategyFactory } from '../../../js/core/factory/calculation-strategy-factory.js';

// Mocka o método da fábrica que retorna a calculadora
jest.mock('../../../js/core/factory/calculation-strategy-factory.js', () => {
  return {
    CalculationStrategyFactory: jest.fn().mockImplementation(() => ({
      getCalculator: jest.fn(() => ({
        calculate: jest.fn(() => ({
          indice: '1.234',
          percentualJuros: '5.00',
          valorCorrigido: 1234.56,
          valorJuros: 100.00,
          valorSelic: 50.00,
          valorTotal: 1384.56
        }))
      }))
    }))
  };
});

describe('CSVProcessor', () => {
  it('should process a single CSV row and return calculated values', () => {
    const processor = new CSVProcessor();

    const input = [
      {
        'Mês do Crédito': '2021-06',
        'Diferença devida e não paga (R$)': '1.000,00'
      }
    ];

    const result = processor.processCSV(input);

    expect(result).toHaveLength(1);
    expect(result[0]['Índice aplicado']).toBe('1.234');
    expect(result[0]['Juros aplicado (%)']).toBe('5.00');
    expect(result[0]['Valor atualizado em dez/2021 (R$)']).toBe('R$ 1.234,56');
    expect(result[0]['Valor dos juros monetários até dez/2021 (R$)']).toBe('R$ 100,00');
    expect(result[0]['Valor atualização selic (R$)']).toBe('R$ 50,00');
    expect(result[0]['Valor total Devido em ago/2024 (R$)']).toBe('R$ 1.384,56');

//    expect(result[0]['Valor atualizado em dez/2021 (R$)']).toBe('1.234,56'); valores daqui e aabaixo esperados podem ser ultilizados em novos cálculos
//    expect(result[0]['Valor dos juros monetários até dez/2021 (R$)']).toBe('100,00');
//    expect(result[0]['Valor atualização selic (R$)']).toBe('50,00');
//    expect(result[0]['Valor total Devido em ago/2024 (R$)']).toBe('1.384,56');
  });
});
