// js/app.js
import { CSVProcessor } from './csv-processor.js';
import { TableRenderer } from './table-renderer.js';

export class App {
    constructor() {
        this.processor = new CSVProcessor();
        this.renderer = new TableRenderer('tableContainer');
        this.setupListeners();
    }

    setupListeners() {
        const readFileBtn = document.getElementById('readFileBtn');

        if (readFileBtn) {
            readFileBtn.addEventListener('click', () => this.lerArquivo());
        } else {
            console.warn('Botão readFileBtn não encontrado no DOM');
        }
    }

    lerArquivo() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv';

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const dados = results.data;
                    const corrigidos = this.processor.processarCSV(dados);
                    this.renderer.setData(corrigidos);
                },
                error: (err) => {
                    console.error('Erro ao ler o CSV:', err);
                }
            });
        });

        input.click();
    }
}
