// utils/formatador.js

export function formatarValor(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'decimal',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  }
  