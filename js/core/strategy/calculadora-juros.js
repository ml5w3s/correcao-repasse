// core/strategy/calculadora-juros.js

import { regrasJuros } from '../rules/regra-juros.js';

const TAXAS = {
  SELIC: 0.3083,
  POUPANCA: 0.6
};

export class CalculadoraJuros {
  static obterTaxa(data) {
    const regra = regrasJuros.find(r => r.cond(data));

    if (regra.tipo === 'FIXO') return regra.valor;
    if (regra.tipo === 'SELIC') return TAXAS.SELIC;
    if (regra.tipo === 'POUPANCA') return TAXAS.POUPANCA;
    return 0;
  }

  static aplicar(valor, data) {
    const taxa = this.obterTaxa(data);
    return valor * taxa;
  }
}
