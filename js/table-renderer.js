//js/table-renderer.js
export class TableRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.data = [];
        this.currentPage = 1;
        this.rowsPerPage = 5; // Define o número de registros por página
    }

    /**
     * Renderiza os dados em uma tabela HTML.
     * @param {Array<Object>} data - Dados do CSV processado.
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

        // Criando cabeçalho da tabela
        Object.keys(paginatedData[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Criando linhas da tabela
        paginatedData.forEach(row => {
            const dataRow = document.createElement('tr');
            Object.values(row).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                dataRow.appendChild(td);
            });
            table.appendChild(dataRow);
        });

        this.container.appendChild(table);

        // Renderiza os controles de paginação
        this.renderPaginationControls();
    }

    /**
    * Atualiza os dados e renderiza a primeira página.
    */
    setData(data) {
        this.data = data;
        this.currentPage = 1;
        this.renderTable(); // ← Aqui estava o erro
    }


    /**
     * Cria os controles de paginação.
     */
    renderPaginationControls() {
        const paginationContainer = document.createElement('div');
        paginationContainer.id = 'paginationControls';

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Anterior';
        prevButton.disabled = this.currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.render();
            }
        });

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Próximo';
        nextButton.disabled = this.currentPage * this.rowsPerPage >= this.data.length;
        nextButton.addEventListener('click', () => {
            if (this.currentPage * this.rowsPerPage < this.data.length) {
                this.currentPage++;
                this.render();
            }
        });

        paginationContainer.appendChild(prevButton);
        paginationContainer.appendChild(nextButton);
        this.container.appendChild(paginationContainer);
    }
}
