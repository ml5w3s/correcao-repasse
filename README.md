# correcoes-repasses

## Descrição

Solução para fazer atualização monetária de repasses monetários do SUS para hospitais.

A funcionalidade principal é ler dados em arquivo CSV a serem processados em um DataFrame, tendo um relatório PDF como saída.

## Funcionalidades

- Processamento de arquivos CSV contendo repasses não pagos
- Cálculo de correção monetária com base em:
  - UFIR
  - IPCA-E
  - SELIC (com integração à API do Banco Central)
- Aplicação de juros moratórios conforme período histórico
- Visualização dos valores corrigidos até data de referência
- Integração planejada com:
  - API da Receita Federal (para validação de CNPJs)
  - API do SUS (SIGTAP/TUNEP) para detalhamento de procedimentos
- Componentização da interface (header, footer, navegação)

### Saídas

- **Relatórios no PDF:**
  - Relatórios impressos
  - Tabelas com critérios estabelecidos
  - Dashboards

### Filtros

- Por hospital
- Por valores
- Por datas
- Por procedimentos
- Por descrição
- Por quantidade

### Funcionalidades

- Categorizar os dados
- Permissões de usuário e níveis de acesso

### Correção de Repasses SUS

Sistema para atualização monetária de valores devidos ao SUS, com base no Manual da Justiça Federal e nos índices econômicos oficiais da época do repasse.

## Estrutura do Projeto

/components # Fragmentos HTML reutilizáveis (header, nav, footer) |-- header.html |-- nav.html |-- menu-controller.js

/js # Lógica do sistema |-- app.js # Inicialização da aplicação |-- csv-processor.js # Processamento e cálculo por linha |-- monetary-adjustment.js # Regras e índices históricos |-- utils/ |-- fetch-taxas.js # Integração com API do Banco Central

/assets # CSS, imagens e fontes /data # CSVs

## Instalação

_Instruções para instalação._

## Exemplo de Uso

1. Faça upload de um arquivo CSV contendo a coluna "Mês do Crédito" e "Diferença devida e não paga (R$)"
2. O sistema aplicará os índices de correção e juros moratórios conforme a data
3. Os resultados são exibidos com os seguintes campos adicionais:
   - Índice aplicado
   - Juros (%)
   - Valor Corrigido

## Planejamento Futuro

- Integração completa com SIGTAP/TUNEP (dados de procedimentos SUS)
- Validação automática de CNPJs via Receita Federal
- Exportação de dados processados em PDF/Excel
- Personalização de índices e datas pelo usuário

## Como contribuir

_Instruções sobre como contribuir com o projeto._
