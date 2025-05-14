# correcao-repasse

## Descrição

Solução web para atualização monetária de repasses do SUS a hospitais, processando dados de arquivos CSV e gerando relatórios em PDF.

## Funcionalidades Principais

- **Processamento de CSV:** Leitura de arquivos CSV contendo repasses não pagos.
- **Cálculo de Correção Monetária:** Aplicação de UFIR, IPCA-E e SELIC (com integração à API do Banco Central).
- **Juros Moratórios:** Cálculo automático conforme o período histórico.
- **Visualização:** Exibição dos valores corrigidos até a data de referência.

### Saídas

- Relatórios em PDF com tabelas e dashboards dos valores corrigidos.

### Filtros (Planejado)

- Por hospital, valores, datas, procedimentos, descrição e quantidade.

## ⚙️ Tecnologias Utilizadas

- JavaScript (ES6+)
- HTML5 & CSS3
- PapaParse (para leitura de CSV)
- APIs do Governo (integração futura com Receita Federal e SUS)

## 🧱 Padrões de Projeto Aplicados

- **Strategy:** Para diferentes cálculos de correção (UFIR, IPCA-E, SELIC).
- **Factory:** Para criar a estratégia de cálculo adequada.
- **Service Layer (Planejado):** Para centralizar o acesso a dados e APIs.

## 🚀 Como Usar (Fase Inicial)

1. Clone este repositório.
2. Abra o `index.html` no navegador.
3. Faça upload do seu arquivo `.csv`.
4. Visualize os dados processados com os valores corrigidos.

### Exemplo de CSV Esperado

O arquivo CSV deve conter colunas como "Mês do Crédito" e "Diferença devida e não paga (R$)".

### Resultados

O sistema exibirá os dados com colunas adicionais, incluindo:
- Índice aplicado
- Juros (%)
- Valor Corrigido

## 🗺️ Planejamento Futuro

- Integração completa com SIGTAP/TUNEP (dados de procedimentos SUS).
- Validação automática de CNPJs via Receita Federal.
- Exportação de dados processados em PDF/Excel.
- Personalização de índices e datas pelo usuário.
- Melhorias na interface e dashboards.

## 🧪 Como Podemos Testar Sua Aplicação?

Agora que tenho uma visão clara do projeto, podemos começar a pensar em como testá-lo nesta fase inicial. Para te ajudar da melhor forma, preciso de algumas informações adicionais:

1.  **Você já tem algum arquivo CSV de exemplo que podemos usar para os testes?** Se sim, poderia compartilhar (ou um exemplo simplificado da estrutura)?
2.  **Qual parte da aplicação está mais desenvolvida e pronta para testes?** (Por exemplo, a leitura do CSV, o cálculo de algum índice específico, a exibição dos dados na tela).
3.  **Quais são os principais fluxos ou funcionalidades que você gostaria de testar agora?**
4.  **Você já tem alguma expectativa sobre os resultados para um determinado arquivo CSV de entrada?** (Isso nos ajudaria a verificar se os cálculos estão corretos).
