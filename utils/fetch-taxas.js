// js/utils/fetch-taxas.js

const BASE_BCB_API = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs';
const SELIC_SERIE_ID = 4390;
const POUPANCA_SERIE_ID = 195;

async function fetchBCBData(serieId) {
    const url = `${BASE_BCB_API}/${serieId}/dados?formato=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao acessar API BCB [${serieId}] - ${response.status}`);
        }

        const data = await response.json();

        const taxasPorMes = {};

        data.forEach(entry => {
            const [dia, mes, ano] = entry.data.split('/');
            const key = `${ano}-${mes.padStart(2, '0')}`;
            const valor = parseFloat(entry.valor.replace(',', '.'));
            if (!isNaN(valor)) {
                taxasPorMes[key] = valor;
            }
        });

        return taxasPorMes;

    } catch (error) {
        console.error(`Erro ao buscar série ${serieId}:`, error);
        return {};
    }
}

export async function fetchSelicData() {
    return await fetchBCBData(SELIC_SERIE_ID);
}

export async function fetchPoupancaData() {
    return await fetchBCBData(POUPANCA_SERIE_ID);
}
