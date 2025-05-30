// js/core/ui/App.js
import { CSVProcessor } from '../core/processor/csv-processor.js';
import { formatarValor } from '../utils/formatador.js';
// REMOVER: import Papa from 'papaparse';  <-- Não funciona com CDN

/**
 * Inicializa os eventos da interface (botões, inputs).
 */
export function initUI() {
  const inputFile = document.getElementById('csvInput');
  const btnProcessar = document.getElementById('btnProcessar');
  const tabela = document.getElementById('tabelaResultado');

  btnProcessar?.addEventListener('click', () => {
    const file = inputFile?.files?.[0];
    if (!file) {
      alert('Selecione um arquivo CSV primeiro.');
      return;
    }

    // Papa é global (via CDN), pode ser usado diretamente
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const dados = results.data;

        const processor = new CSVProcessor();
        const resultados = processor.processCSV(dados, taxas);

        renderTable(tabela, resultados);
      },
      error: (err) => {
        console.error('Erro ao ler CSV:', err);
        alert('Erro ao ler o arquivo. Verifique o formato.');
      }
    });
  });
}

/**
 * Renderiza a tabela de resultados na interface.
 */
function renderTable(tabela, dados) {
  if (!tabela) return;

  tabela.innerHTML = '';

  if (!dados || dados.length === 0) {
    tabela.innerHTML = '<tr><td colspan="6">Nenhum dado encontrado</td></tr>';
    return;
  }

  const cabecalho = Object.keys(dados[0]);

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  cabecalho.forEach((coluna) => {
    const th = document.createElement('th');
    th.textContent = coluna;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  tabela.appendChild(thead);

  const tbody = document.createElement('tbody');
  dados.forEach((linha) => {
    const tr = document.createElement('tr');
    cabecalho.forEach((coluna) => {
      const td = document.createElement('td');
      td.textContent = formatarValor(linha[coluna]);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  tabela.appendChild(tbody);
}
