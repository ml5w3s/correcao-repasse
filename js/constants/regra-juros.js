// js/constants/regra-juros.js
export const regrasJuros = [
    {
      cond: data => data <= new Date('2002-12-31'),
      tipo: 'FIXO',
      valor: 0.5
    },
    {
      cond: data => data <= new Date('2009-06-30'),
      tipo: 'SELIC'
    },
    {
      cond: data => data <= new Date('2012-04-30'),
      tipo: 'FIXO',
      valor: 0.5
    },
    {
      cond: data => data <= new Date('2021-11-30'),
      tipo: 'POUPANCA'
    },
    {
      cond: () => true,
      tipo: 'ZERO',
      valor: 0
    }
  ];
  