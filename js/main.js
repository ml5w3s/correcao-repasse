//js/main.js

import { loadNavbar } from './ui/components/navbar.js';
import { CSVProcessor } from './core/processor/csv-processor.js';
import { TableRenderer } from './ui/components/table-renderer.js';

const defaultTaxas = {
  ipcae: 1.28,    // se não estiver usando, pode remover
  juros: 1.3088167969,     // ex: juros moratórios em porcentagem
  selic: 30.83     // ex: SELIC acumulada 2021 a ago/2024
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
