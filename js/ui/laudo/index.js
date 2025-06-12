// js/ui/laudo/index.js
//
import { generatePdfFromHtmlTable } from './pdf-generator.js'; // Assegure-se que este arquivo existe

/**
 * Inicializa as funcionalidades da interface do usuário relacionadas ao laudo.
 * Configura o botão para gerar PDF da tabela de laudo.
 */
export function inicializarUiLaudo() {
  const btnGerarPDF = document.getElementById('btnGerarPDFLaudo');
  // O ID da tabela DEVE corresponder ao ID da tag <table> no HTML que TableRenderer usa
  const idDaTabelaParaPDF = 'tabelaResultado'; 

  if (btnGerarPDF) {
    // Remove listener anterior para evitar duplicidade se esta função for chamada múltiplas vezes
    // (Embora com a lógica atual em main.js, ela é chamada uma vez após o processamento do CSV)
    // Para ser mais robusto, pode-se clonar o nó e adicionar listener ao clone, ou usar um flag.
    // Por simplicidade, vamos assumir que o listener é adicionado uma vez como pretendido.

    btnGerarPDF.addEventListener('click', () => {
      console.log(`Botão 'btnGerarPDFLaudo' clicado. Tentando gerar PDF para a tabela #${idDaTabelaParaPDF}...`);
      
        // Verifica se a tabela existe no DOM
      const tabelaElement = document.getElementById(idDaTabelaParaPDF);
      if (!tabelaElement || tabelaElement.tagName !== 'TABLE') {
          alert(`Erro: Elemento da tabela com ID "${idDaTabelaParaPDF}" não encontrado ou não é uma tag <table>. Verifique o HTML e o TableRenderer.`);
          console.error(`Elemento #${idDaTabelaParaPDF} não é uma tabela válida.`);
          return;
      }
      if (tabelaElement.rows.length <= 1) { // Considera a linha do cabeçalho
          alert(`A tabela #${idDaTabelaParaPDF} parece estar vazia. Gere dados primeiro.`);
          console.warn(`Tabela #${idDaTabelaParaPDF} está vazia ou contém apenas cabeçalho.`);
          // Poderia optar por não gerar o PDF ou gerar um PDF com uma mensagem.
          // return; // Descomente para não gerar PDF de tabela vazia
      }

      gerarPDFDeTabelaHTML(
        idDaTabelaParaPDF,
        'laudo_csv_export.pdf', // Nome do arquivo PDF
        'Relatório da Tabela CSV' // Título no PDF
      );
    });
    console.log(`Listener de clique adicionado a 'btnGerarPDFLaudo' para gerar PDF da tabela #${idDaTabelaParaPDF}.`);
  } else {
    console.warn(`Botão com ID "btnGerarPDFLaudo" não encontrado no DOM no momento da chamada de inicializarUiLaudo.`);
  }
}
 