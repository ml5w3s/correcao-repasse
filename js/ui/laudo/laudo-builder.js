// js/ui/laudo/builder/laudo-builder.js
//
const { PDFDocument, rgb } = window.PDFLib;

export class LaudoBuilder {
  constructor({ formData, csvResumo, basePdfUrl }) {
    this.formData = formData;
    this.csvResumo = csvResumo;
    this.basePdfUrl = basePdfUrl;
  }

  async generateReport() {
    const { PDFDocument, rgb } = window.PDFLib;

    const basePdfResponse = await fetch(this.basePdfUrl);
    const basePdfBytes = await basePdfResponse.arrayBuffer();
    const basePdfDocument = await PDFDocument.load(basePdfBytes);

    const finalReportPdf = await PDFDocument.create();

    const pages = await finalReportPdf.copyPages(basePdfDocument, basePdfDocument.getPageIndices());
    pages.forEach(page => finalReportPdf.addPage(page));

    const summaryPage = finalReportPdf.addPage();
    const { width, height } = summaryPage.getSize();
    let y = height - 50;

    summaryPage.drawText('Report Summary', { x: 50, y, size: 14, color: rgb(0, 0, 0) });
    y -= 20;

    for (const [group, info] of Object.entries(this.formData.meta)) {
      if (typeof info === 'object') {
        for (const [key, value] of Object.entries(info)) {
          summaryPage.drawText(`${key.toUpperCase()}: ${value}`, { x: 50, y, size: 10 });
          y -= 12;
        }
      } else {
        summaryPage.drawText(`${group.toUpperCase()}: ${info}`, { x: 50, y, size: 10 });
        y -= 12;
      }
    }

    y -= 10;
    summaryPage.drawText('Table Summary:', { x: 50, y, size: 12 });
    y -= 15;

    const columns = Object.keys(this.csvResumo[0]).slice(0, 4);
    this.csvResumo.slice(0, 15).forEach((row) => {
      const lineText = columns.map(col => row[col]).join(' | ');
      summaryPage.drawText(lineText, { x: 50, y, size: 9 });
      y -= 12;
    });

    const pdfBytes = await finalReportPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'final_report.pdf';
    a.click();
    URL.revokeObjectURL(a.href);
  }
}
