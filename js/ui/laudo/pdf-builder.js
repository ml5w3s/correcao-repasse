// js/ui/laudo/pdf-builder.js

export async function gerarLaudoFinal(resultados) {
  const { PDFDocument, rgb } = PDFLib;

  // 1. Carrega o PDF existente
  const tunepResponse = await fetch('../../data/entrada/TUNEP-Parcial.pdf');
  const tunepBytes = await tunepResponse.arrayBuffer();
  const tunepPdf = await PDFDocument.load(tunepBytes);

  // 2. Novo documento final
  const finalPdf = await PDFDocument.create();

  // 3. Copia páginas da TUNEP para o novo documento
  const tunepPages = await finalPdf.copyPages(tunepPdf, tunepPdf.getPageIndices());
  tunepPages.forEach((page) => finalPdf.addPage(page));

  // 4. Adiciona nova página com resumo da tabela
  const page = finalPdf.addPage();
  const { width, height } = page.getSize();
  let y = height - 50;

  page.drawText('Resumo da Tabela de Cálculos', {
    x: 50,
    y,
    size: 14,
    color: rgb(0, 0, 0),
  });
  y -= 20;

  const colunas = Object.keys(resultados[0]).slice(0, 4);
  resultados.slice(0, 20).forEach((linha, i) => {
    const textoLinha = colunas.map(col => `${linha[col]}`).join(' | ');
    page.drawText(textoLinha, {
      x: 50,
      y: y - (15 * (i + 1)),
      size: 10,
    });
  });

  // 5. Gera e baixa o PDF final
  const pdfBytes = await finalPdf.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'laudo_final.pdf';
  a.click();
  URL.revokeObjectURL(a.href);
}
 