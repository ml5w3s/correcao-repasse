// js/main.js

import { loadNavbar } from './ui/components/navbar.js'; // Assegure-se que este arquivo existe
import { CSVProcessor } from './core/processor/csv-processor.js'; // Assegure-se que este arquivo existe
import { TableRenderer } from './ui/components/table-renderer.js'; // Assegure-se que este arquivo existe
import { inicializarUiLaudo } from './ui/laudo/index.js'; // Importa a função para configurar o botão PDF

const defaultTaxas = {
  ipcae: 1.28,
  juros: 1.3088167969,
  selic: 30.83
};

// Função para carregar componentes HTML reutilizáveis (header, footer)
// Movida para cá para manter a lógica de inicialização da página junta
async function loadHtmlComponent(id, file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Erro HTTP ${res.status} ao carregar ${file}`);
    const html = await res.text();
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = html;
    } else {
      console.warn(`Placeholder com ID "${id}" não encontrado para o arquivo ${file}.`);
    }
  } catch (error) {
    console.error(`Falha ao carregar componente ${id} de ${file}:`, error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Carrega componentes visuais primeiro
  loadHtmlComponent('header-placeholder', 'js/ui/components/header.html'); // Adapte o caminho se necessário
  loadHtmlComponent('footer-placeholder', 'js/ui/components/footer.html'); // Adapte o caminho se necessário
  
  if (typeof loadNavbar === 'function') { // Verifica se loadNavbar existe antes de chamar
      loadNavbar();
  } else {
      console.warn('loadNavbar não está definida ou não é uma função.');
  }

  const readFileBtn = document.getElementById('readFileBtn');
  const csvInput = document.getElementById('csvFileInput');
  const tabelaElementId = 'tabelaResultado'; // ID da <table> no HTML
  
  // Assegure-se que TableRenderer e CSVProcessor estão corretamente implementados
  let renderer;
  try {
    renderer = new TableRenderer(tabelaElementId);
  } catch (e) {
    console.error("Erro ao instanciar TableRenderer:", e);
    alert("Erro ao configurar o renderizador da tabela. Verifique o console.");
    return; // Interrompe se o renderer não puder ser criado
  }
  
  const processor = new CSVProcessor();

  if (readFileBtn && csvInput && renderer) {
    readFileBtn.addEventListener('click', async () => {
      try {
        const csvData = await readCSVFromInput(csvInput);
        if (!csvData || csvData.length === 0) {
            alert('Nenhum dado válido encontrado no arquivo CSV.');
            renderer.setData([]); // Limpa a tabela ou mostra mensagem de "sem dados"
            return;
        }
        const result = processor.processCSV(csvData, defaultTaxas);
        renderer.setData(result); // TableRenderer deve atualizar o DOM com a tabela

        // Após a tabela ser renderizada (ou os dados definidos para ela),
        // inicializa a UI do Laudo, que configurará o botão 'btnGerarPDFLaudo'
        inicializarUiLaudo(); 

        // Opcional: Armazenar 'result' globalmente se for usar para outro tipo de PDF builder
        window.csvProcessedData = result; 
        console.log("Dados processados e armazenados em window.csvProcessedData:", result);

      } catch (err) {
        alert('Erro ao processar o CSV: ' + err.message);
        console.error(err);
        if (renderer) renderer.setData([]); // Limpa a tabela em caso de erro
      }
    });
  } else {
    if (!readFileBtn) console.warn("Botão 'readFileBtn' não encontrado.");
    if (!csvInput) console.warn("Input 'csvFileInput' não encontrado.");
    if (!renderer) console.warn("TableRenderer não foi inicializado.");
  }
});

function readCSVFromInput(inputElement) {
  return new Promise((resolve, reject) => {
    if (!inputElement || !inputElement.files) {
        return reject(new Error('Elemento de input de arquivo inválido.'));
    }
    const file = inputElement.files[0];
    if (!file) return reject(new Error('Nenhum arquivo selecionado.'));

    const reader = new FileReader();
    reader.onload = function (e) {
      const csvText = e.target.result;
      try {
        const data = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true, // Converte automaticamente números e booleanos
        });
        if (data.errors && data.errors.length > 0) {
            console.warn("Erros no parsing do CSV:", data.errors);
            // Decide se quer rejeitar ou resolver com dados parciais
        }
        resolve(data.data);
      } catch (parseError) {
        reject(new Error('Erro ao fazer o parse do texto CSV: ' + parseError.message));
      }
    };

    reader.onerror = function () {
      reject(new Error('Erro ao ler o arquivo com FileReader.'));
    };

    reader.readAsText(file);
  });
}
 