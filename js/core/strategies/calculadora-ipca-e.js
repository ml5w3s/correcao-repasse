import { calcularValoresFinais } from '../finance/calculadora-financeira.js';
import { obterFatorCJF } from '../constants/fatores-cjf.js'; // suposição

export class CalculadoraIpcaE {
  calculate(valorOriginal, creditDate, taxas) {
    const fatorCJF = obterFatorCJF(creditDate) ?? 1;
    const percentualJuros = 0.06; // Ex: juros de poupança até dez/21
    const taxaSelic = 0.22; // Ex: acumulado de dez/21 até ago/24

    return {
      factor: fatorCJF,
      percentualJuros: percentualJuros * 100, // percentual legível
      ...calcularValoresFinais({
        valorOriginal,
        fatorCJF,
        percentualJuros,
        taxaSelic
      })
    };
  }
}
