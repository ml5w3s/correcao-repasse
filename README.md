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

# 🧮 Calculadora de Correção Monetária e Juros Moratórios

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Padrões de Projeto](https://img.shields.io/badge/design%20patterns-Strategy%2C%20Factory%20Method-orange)
![API Ready](https://img.shields.io/badge/API-integração%20em%20breve-yellow)

Este projeto é uma aplicação web para calcular valores atualizados com base nas regras da Justiça Federal. Ele aplica índices históricos (UFIR, IPCA-E, SELIC) e juros moratórios automaticamente, a partir de arquivos CSV fornecidos pelo usuário.

---

## 🚀 Funcionalidades

✅ Leitura automatizada de arquivos `.csv`  
✅ Aplicação de correção monetária com base em datas históricas  
✅ Cálculo de juros moratórios conforme normativas vigentes  
✅ Arquitetura extensível com uso de padrões de projeto  
✅ Suporte a exportação e visualização dos dados processados  

🧭 **Em breve:**

- Integração com APIs da Receita Federal e SUS
- Ajustes personalizáveis via interface
- Exportação para PDF/Excel
- Dashboards com gráficos

---

## 📦 Estrutura do Projeto

```bash
/js/
├── App.js                        # Entrada principal
├── csv-processor.js             # Context (Strategy), coordena cálculos

├── core/
│   ├── strategy/
│   │   ├── calculadora-ufir.js
│   │   ├── calculadora-ipcae.js
│   │   ├── calculadora-selic.js
│   │   ├── calculadora-poupanca.js
│   │   └── calculadora-atual.js
│   └── factory/
│       └── calculadora-factory.js

├── factory/
│   ├── fabrica-correcao.js
│   └── fabrica-juros.js

├── constants/
│   ├── regras-correcao.js
│   ├── taxas-selic.js
│   └── indices-poupanca.js

/data/
└── tunep_monum.csv

🧪 Tecnologias Utilizadas

    JavaScript (ES6+)
    HTML5 & CSS3
    PapaParse – Leitura de CSV
    APIs do Governo (em breve)

📄 Licença

Este projeto está sob a licença MIT.
👨‍💻 Desenvolvido por

Um entusiasta de aplicações web orientadas a dados, com foco em automação e fidelidade a fontes oficiais.

### Correção de Repasses SUS

Sistema para atualização monetária de valores devidos ao SUS, com base no Manual da Justiça Federal e nos índices econômicos oficiais da época do repasse.

🧱 Padrões de Projeto Aplicados
Padrão	Papel na Aplicação
Strategy	Define diferentes cálculos para UFIR, IPCA-E, SELIC, etc
Factory	Cria instâncias da estratégia adequada a cada situação
Service Layer (planejado)	Centraliza acesso a dados e APIs externas

## Instalação

1. Clone este repositório
2. Abra o index.html no navegador
3. Faça upload do seu arquivo .csv
4. Visualize os dados corrigidos

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

## 🧾 Kanban - Sistema de Correção Monetária e Juros (CSV + APIs)

Organização visual das etapas do projeto, com foco em clareza de propósito, separação de responsabilidades e aplicação de padrões de design.

---

## 🟦 TO DO – Etapas planejadas

### 📂 Organização e Ambiente

- `chore: reestruturar pastas para separar componentes e lógica de negócio`
- `doc: atualizar README com novas funcionalidades previstas`
- `chore: configurar ambiente local com proxy PHP (para evitar CORS nas APIs do BCB)`

### 🧠 Modelagem de Negócio

- `feat(core): implementar Strategy para diferentes políticas de correção`
- `feat(factory): criar Factory para escolher estratégia com base na data`
- `feat(service): criar Singleton ou Service Layer para cache e fetch de taxas (SELIC, poupança)`

### 📊 Integração de Dados

- `refactor(processor): reescrever CSVProcessor para usar as estratégias`
- `feat(core): criar fallback para quando não houver dado da API (valores fixos)`
- `test(core): validar cálculos com datas-chave conhecidas`

### 🧩 Interface e Componentes

- `feat(ui): permitir upload de CSV e exibir resultado`
- `feat(ui): criar tabela formatada com resultados`
- `feat(ui): botão para exportar CSV corrigido (usando jsPDF ou equivalente)`
- `chore: mover componentes HTML (header, nav, footer) para pasta /components na raiz`

### 🗃️ Documentação e Versionamento

- `doc: iniciar documentação dos padrões usados (Strategy, Factory, Service)`
- `doc: criar arquivos de exemplo para ajudar usuários a entender estrutura do CSV`

---

## 🟨 IN PROGRESS – Em andamento

- `refactor(core): implementar cálculo com integração parcial com API do BCB`
- `test(service): testar proxy PHP com a API do Banco Central (evitar bloqueio CORS)`

---

## ✅ DONE – Concluído

_(Mover itens aqui conforme for finalizando)*

---

## 🧠 Padrões de Projeto Aplicados

- **Strategy** – para diferentes políticas de cálculo de juros e correção monetária.
- **Factory** – para instanciar corretamente o tipo de estratégia baseado na data.
- **Service Layer / Singleton** – para acesso e cache das taxas de juros vindas da API.

---

## 🛠️ Sugestão de uso com Git / GitHub

- Crie uma **branch** por item relevante: `feature/strategy-pattern`, `refactor/csv-processor`, etc.
- Use **issues** com títulos semelhantes aos do Kanban.
- Utilize etiquetas como: `core`, `enhancement`, `refactor`, `docs`, `bug`, `ui`.
- Prefira commits no padrão:  
  `feat(core): aplicar strategy para política de juros de 2009-2012`

---

✅ Projeto em desenvolvimento contínuo com foco em clareza, reusabilidade e manutenibilidade.