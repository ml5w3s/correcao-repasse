// js/ui/laudo/table-to-json.js

/**
 * Salva os dados da tabela processada em um arquivo .json.
 * @param {Array<Object>} data - Dados da tabela processada
 * @param {string} nomeArquivo - Nome do arquivo de saída
 */
export function salvarTabelaComoJSON(data, nomeArquivo = 'tabela_creditos.json') {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn('Nenhum dado para exportar.');
    return;
  }

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = nomeArquivo;
  a.click();

  URL.revokeObjectURL(a.href);
}
