// js/components/navbar.js

/**
 * Carrega o componente de navegação e adiciona os event listeners
 * após inserir o HTML na página.
 */
export async function loadNavbar() {
    const navbarContainer = document.createElement('div');

    try {
        // Corrige o caminho relativo ao projeto raiz
        const response = await fetch('./js/components/navbar.html');
        if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);

        const html = await response.text();
        navbarContainer.innerHTML = html;

        // Insere a navbar no início do <body>
        document.body.insertBefore(navbarContainer, document.body.firstChild);

        // Adiciona os listeners após a navbar ser renderizada
        document.getElementById('hamburger')?.addEventListener('click', toggleNav);
        document.getElementById('personalizar-indices')?.addEventListener('change', toggleInputs);

        console.log('✅ Navbar carregada com sucesso.');
    } catch (error) {
        console.error('❌ Erro ao carregar a navbar:', error);
    }
}

/**
 * Alterna a exibição do menu de navegação para dispositivos móveis.
 */
function toggleNav() {
    const navList = document.getElementById('nav-list');
    if (navList) {
        navList.style.display = navList.style.display === 'none' || navList.style.display === ''
            ? 'block'
            : 'none';
    }
}

/**
 * Mostra ou oculta os campos de personalização de índices.
 */
function toggleInputs() {
    const checkbox = document.getElementById('personalizar-indices');
    const inputsDiv = document.getElementById('indice-inputs');
    if (checkbox && inputsDiv) {
        inputsDiv.style.display = checkbox.checked ? 'block' : 'none';
    }
}
