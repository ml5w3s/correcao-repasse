/**
 * @jest-environment jsdom
 */

describe('App UI Tests', () => {
  beforeAll(() => {
    // Moca o fetch global com uma resposta genérica de um componente HTML
    global.fetch = vi.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve('<div id="mock-component">Hello World</div>')
      })
    );
  });

  beforeEach(() => {
    // Limpa o DOM antes de cada teste
    document.body.innerHTML = '';
  });

  it('deve carregar componente com sucesso', async () => {
    // Simula função que carrega um HTML e injeta no DOM
    async function loadComponent(file, containerId) {
      const res = await fetch(file);
      const html = await res.text();
      document.getElementById(containerId).innerHTML = html;
    }

    // Cria o container no DOM
    const container = document.createElement('div');
    container.id = 'main-container';
    document.body.appendChild(container);

    // Executa
    await loadComponent('mock.html', 'main-container');

    expect(document.getElementById('mock-component')).not.toBeNull();
    expect(document.getElementById('main-container').innerHTML)
      .toContain('Hello World');
  });

});
