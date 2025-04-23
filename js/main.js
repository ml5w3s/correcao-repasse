// js/main.js
import { App } from './app.js';
import { loadNavbar } from './components/navbar.js';

window.addEventListener('DOMContentLoaded', async () => {
    await loadNavbar(); // Aguarda navbar ser injetado

    // Inicializa a aplicação depois que o DOM está completo
    new App(); // Agora o botão readFileBtn existe no DOM
});
