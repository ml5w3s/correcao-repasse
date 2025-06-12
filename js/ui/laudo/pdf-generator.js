// js/ui/laudo/pdf-generator.js
//
/**
 * Generates a PDF from a specified HTML table element.
 *
 * @param {Object} config Configuration object.
 * @param {string} config.tableId - The HTML table element ID.
 * @param {string} config.fileName - The name of the output PDF file.
 * @param {string} [config.documentTitle] - Optional title to display at the top of the PDF.
 */
export function generatePdfFromHtmlTable({ tableId, fileName, documentTitle }) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  if (documentTitle) {
    doc.setFont("helvetica", "bold");
    doc.text(documentTitle, 14, 15);
  }

  doc.autoTable({
    html: `#${tableId}`,
    startY: documentTitle ? 25 : 15,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
    styles: { font: "helvetica", fontSize: 10 },
    columnStyles: { 0: { fontStyle: 'bold' } }
  });

  doc.save(fileName);
}

