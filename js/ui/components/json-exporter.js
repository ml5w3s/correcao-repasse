export function exportarJSONParaArquivo(dados, nomeArquivo = 'tabela_creditos.json') {
  const jsonString = JSON.stringify(dados, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nomeArquivo;
  a.click();

  URL.revokeObjectURL(url);
}
