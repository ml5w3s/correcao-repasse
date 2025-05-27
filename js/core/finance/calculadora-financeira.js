export function calcularValoresFinais({
  valorOriginal,
  fatorCJF,
  percentualJuros,    // Ex: 0.06 para 6%
  taxaSelic           // Ex: 0.22 para 22%
}) {
  const valorCorrigido = valorOriginal * fatorCJF;
  const valorJuros = valorCorrigido * percentualJuros;
  const valorSelic = (valorCorrigido + valorJuros) * taxaSelic;
  const valorTotal = valorCorrigido + valorJuros + valorSelic;

  return {
    valorCorrigido,
    valorJuros,
    valorSelic,
    valorTotal
  };
}
