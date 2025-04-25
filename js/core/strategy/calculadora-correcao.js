// core/strategy/calculadora-correcao.js

import { regrasCorrecao } from '../rules/regra-correcao.js';

export class CalculadoraCorrecao {
  static obterFator(data) {
    const regra = regrasCorrecao.find(r => r.cond(data));
    return { indice: regra.indice, fator: regra.fator };
  }

  static aplicar(valor, data) {
    const { fator } = this.obterFator(data);
    return valor * fator;
  }
}
