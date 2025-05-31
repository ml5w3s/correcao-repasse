//js/table-renderer.js

export class TableRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.data = [];
        this.currentPage = 1;
        this.rowsPerPage = 5;
    }

    /**
     * Atualiza os dados e renderiza a primeira página.
     * @param {Array<Object>} data
     */
    setData(data) {
        this.data = data;
        this.currentPage = 1;
        this.renderTable();
    }

    /**
     * Renderiza os dados em uma tabela HTML.
     */
    renderTable() {
        const startIndex = (this.currentPage - 1) * this.rowsPerPage;
        const endIndex = startIndex + this.rowsPerPage;
        const paginatedData = this.data.slice(startIndex, endIndex);

        this.container.innerHTML = '';

        if (paginatedData.length === 0) {
            this.container.innerHTML = '<p>Nenhum dado disponível.</p>';
            return;
        }

        const table = document.createElement('table');
        const headerRow = document.createElement('tr');

        Object.keys(paginatedData[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        paginatedData.forEach(row => {
            const dataRow = document.createElement('tr');
            Object.values(row).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value ?? ''; // exibe vazio se for null/undefined
                dataRow.appendChild(td);
            });
            table.appendChild(dataRow);
        });

        this.container.appendChild(table);

        this.renderPaginationControls();
    }

    /**
     * Cria os controles de paginação.
     */
    renderPaginationControls() {
        // Remove controles anteriores, se houver
        const existingControls = document.getElementById('paginationControls');
        if (existingControls) {
            existingControls.remove();
        }

        if (this.data.length <= this.rowsPerPage) return; // Não renderiza paginação desnecessária

        const paginationContainer = document.createElement('div');
        paginationContainer.id = 'paginationControls';
        paginationContainer.style.marginTop = '10px';

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Anterior';
        prevButton.disabled = this.currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderTable();
            }
        });

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Próximo';
        nextButton.disabled = this.currentPage * this.rowsPerPage >= this.data.length;
        nextButton.addEventListener('click', () => {
            if (this.currentPage * this.rowsPerPage < this.data.length) {
                this.currentPage++;
                this.renderTable();
            }
        });

        paginationContainer.appendChild(prevButton);
        paginationContainer.appendChild(nextButton);
        this.container.appendChild(paginationContainer);
    }
}
