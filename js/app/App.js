//js/app/App.js

// import { formatarValor } from '../utils/formatter.js';
import { inicializarUiLaudo } from '../ui/laudo/index.js';
import { gerarLaudoFinal } from '../ui/laudo/pdf-builder.js';
import { CSVProcessor } from '../core/processor/csv-processor.js';

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

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const dados = results.data;

        const taxas = {
          ipcae: 1.28,
          juros: 0.179,
          selic: 0.3083
        };

        const processor = new CSVProcessor();
        const resultados = processor.processCSV(dados, taxas);

        // ✅ Salva o JSON da tabela automaticamente
        salvarTabelaComoJSON(resultados, 'tabela_creditos.json');

        // ✅ Armazena para uso posterior (PDF, laudo, etc.)
        window.resultadosCalculados = resultados;

        renderTable(tabela, resultados);
      },
      error: (err) => {
        console.error('Erro ao ler CSV:', err);
        alert('Erro ao ler o arquivo. Verifique o formato.');
      }
    });

    document.getElementById('btnGerarPDFLaudo')?.addEventListener('click', () => {
      if (!window.resultadosCalculados) {
        alert('Nenhum resultado para gerar PDF.');
        return;
      }
      gerarLaudoFinal(window.resultadosCalculados);
    });

  });
}

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

document.addEventListener('DOMContentLoaded', () => {
  console.log('Aplicação (entity-form) iniciada.');

  // Inicializar lógica de core (se necessário para esta página)
  // inicializarCoreLogic();

  // Inicializar UI do Laudo
  inicializarUiLaudo();

  // Outras inicializações da página...
});
 