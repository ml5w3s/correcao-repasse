// js/ui/laudo/pdf-generator.js

/**
 * Gera um PDF a partir de uma tabela HTML especificada.
 * As bibliotecas jsPDF e jsPDF-AutoTable devem estar carregadas globalmente (via CDN, por exemplo).
 *
 * @param {string} tableId O ID da tabela HTML que será convertida para PDF.
 * @param {string} fileName O nome do arquivo PDF que será salvo.
 * @param {string} documentTitle O título a ser exibido no início do documento PDF.
 */
export function generatePdfFromHtmlTable(tableId, fileName, documentTitle) {
  // Acessa jsPDF do escopo global (carregado via CDN no HTML)
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Adiciona um título ao PDF
  if (documentTitle) {
    doc.setFont("helvetica", "bold");
    doc.text(documentTitle, 14, 15); // (texto, x, y)
  }

  // Converte a tabela HTML em PDF usando autoTable
  doc.autoTable({
    html: `#${tableId}`,
    startY: documentTitle ? 25 : 15, // Posição Y para iniciar a tabela
    theme: 'striped', // Temas: 'striped', 'grid', 'plain'
    headStyles: { fillColor: [22, 160, 133] }, // Exemplo: Verde-azulado para cabeçalho
    styles: { font: "helvetica", fontSize: 10 },
    columnStyles: { 0: { fontStyle: 'bold' } } // Exemplo: Primeira coluna em negrito
  });

  // Salva o PDF
  doc.save(fileName);
}
