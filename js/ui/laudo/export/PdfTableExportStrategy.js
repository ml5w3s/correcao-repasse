// js/ui/laudo/export/PdfTableExportStrategy.js
import { ExportStrategy } from './ExportStrategy.js';

export class PdfTableExportStrategy extends ExportStrategy {
  constructor({ tableId, fileName, title }) {
    super();
    this.tableId = tableId;
    this.fileName = fileName;
    this.title = title;
  }

  export() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape' });

    doc.setFontSize(16);
    if (this.title) {
      doc.text(this.title, doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
    }

    doc.autoTable({
      html: `#${this.tableId}`,
      startY: 30,
      styles: {
        overflow: 'linebreak',     // quebra de linha automática
        cellWidth: 'wrap',         // evita corte de coluna
        fontSize: 8,
      },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save(this.fileName);
  }
}
