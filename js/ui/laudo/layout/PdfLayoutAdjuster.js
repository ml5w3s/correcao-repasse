// js/ui/laudo/export/PdfTableExportStrategy.js

import { ExportStrategy } from './ExportStrategy.js';

export class PdfTableExportStrategy extends ExportStrategy {
  constructor({ tableId, fileName = 'laudo_tabela.pdf', title = '' }) {
    super();
    this.tableId = tableId;
    this.fileName = fileName;
    this.title = title;
  }

  export() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape' });

    const table = document.getElementById(this.tableId);
    if (!table) {
      console.error(`Tabela #${this.tableId} não encontrada.`);
      alert(`Tabela #${this.tableId} não foi localizada.`);
      return;
    }

    doc.setFontSize(16);
    if (this.title) {
      doc.text(this.title, doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
    }

    doc.autoTable({
      html: `#${this.tableId}`,
      startY: 30,
      styles: {
        overflow: 'linebreak',
        cellWidth: 'wrap',
        fontSize: 8,
      },
      headStyles: {
        fillColor: [34, 112, 147],
        textColor: [255, 255, 255],
        halign: 'center'
      },
      bodyStyles: {
        halign: 'center'
      },
    });

    doc.save(this.fileName);
  }
}
