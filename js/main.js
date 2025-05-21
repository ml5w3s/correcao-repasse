import { initUI } from './core/ui/App.js';
import { CSVProcessor } from './core/processor/csv-processor.js';
import { TableRenderer } from './table-renderer.js';
import { loadNavbar } from './components/navbar.js';

const defaultTaxas = {
  ipcae: 1.28,
  juros: 0.179,
  selic: 0.3083
};

document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();
  const readFileBtn = document.getElementById('readFileBtn');
  const csvInput = document.getElementById('csvFileInput');
  const renderer = new TableRenderer('tabelaResultado');
  const processor = new CSVProcessor();

  if (readFileBtn) {
    readFileBtn.addEventListener('click', async () => {
      try {
        const csvData = await readCSVFromInput(csvInput);
        const result = processor.processCSV(csvData, defaultTaxas);
        renderer.setData(result);
      } catch (err) {
        alert('Erro ao processar o CSV: ' + err.message);
        console.error(err);
      }
    });
  }
});

function readCSVFromInput(inputElement) {
  return new Promise((resolve, reject) => {
    const file = inputElement.files[0];
    if (!file) return reject(new Error('Nenhum arquivo selecionado.'));

    const reader = new FileReader();
    reader.onload = function (e) {
      const csvText = e.target.result;
      const data = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true
      });
      resolve(data.data);
    };

    reader.onerror = function () {
      reject(new Error('Erro ao ler o arquivo.'));
    };

    reader.readAsText(file);
  });
}
