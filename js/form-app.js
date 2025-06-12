// js/forrm-app.js

import { extrairDadosDoFormulario } from './ui/laudo/form-to-json.js';
import { LaudoBuilder } from './ui/laudo/laudo-builder.js';
import { generatePdfFromHtmlTable } from './ui/laudo/pdf-generator.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cadastro-form')?.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = {};
    const inputs = event.target.querySelectorAll('input');
    inputs.forEach(input => {
      formData[input.name] = input.value;
    });

    const docContent = Object.entries(formData).map(([label, value]) => `${label}: ${value}`).join('\n');

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Formulário de Cadastro', 14, 20);
    doc.setFontSize(10);

    let y = 30;
    docContent.split('\n').forEach(line => {
      doc.text(line, 14, y);
      y += 10;
    });

    doc.save('formulario.pdf');
  });
});
