// js/factory/fabrica-correcao.js

import { CalculadoraUFIR } from '../calculators/calculadora-ufir.js';
import { CalculadoraIPCAE } from '../calculators/calculadora-ipcae.js';
import { CalculadoraSELIC } from '../calculators/calculadora-selic.js';

export class FabricaCorrecao {
  static criar(data) {
    if (data < new Date('2001-01-01')) return new CalculadoraUFIR();
    if (data <= new Date('2021-11-30')) return new CalculadoraIPCAE();
    return new CalculadoraSELIC();
  }
}
