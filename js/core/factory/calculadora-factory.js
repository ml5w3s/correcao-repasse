import { CalculadoraUFIR } from '../strategies/calculadora-ufir.js';
import { CalculadoraIPCAE } from '../strategies/calculadora-ipcae.js';
import { CalculadoraPoupanca } from '../strategies/calculadora-poupanca.js';
import { CalculadoraSELIC } from '../strategies/calculadora-selic.js';
import { CalculadoraAtual } from '../strategies/calculadora-atual.js';

export class CalculadoraFactory {
  constructor() {
    this.regras = [
      {
        condicao: data => data.getFullYear() < 2001,
        calculadora: () => new CalculadoraUFIR()
      },
      {
        condicao: data => data < new Date(2003, 0),
        calculadora: () => new CalculadoraIPCAE('0.5%') // juros fixo
      },
      {
        condicao: data => data < new Date(2009, 6),
        calculadora: () => new CalculadoraSELIC()
      },
      {
        condicao: data => data < new Date(2012, 4),
        calculadora: () => new CalculadoraIPCAE('0.5%') // novamente juros fixo
      },
      {
        condicao: data => data < new Date(2021, 11),
        calculadora: () => new CalculadoraPoupanca()
      },
      {
        condicao: () => true,
        calculadora: () => new CalculadoraAtual()
      }
    ];
  }

  getCalculadora(data) {
    const regra = this.regras.find(r => r.condicao(data));
    return regra ? regra.calculadora() : new CalculadoraAtual();
  }
}
