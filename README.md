# Cypress BDD Automation

Projeto de portfólio para demonstrar automação E2E com **Cypress + TypeScript + Cucumber/Gherkin**, aplicando BDD, Page Objects, custom commands, dados reutilizáveis e execução contínua com GitHub Actions.

## Objetivo

O projeto complementa uma estratégia de QA Automation com cenários escritos em linguagem de negócio e implementação técnica separada em camadas reutilizáveis.

A aplicação utilizada é a plataforma pública **SauceDemo**.

## Stack

- Cypress
- TypeScript
- Cucumber / Gherkin
- @badeball/cypress-cucumber-preprocessor
- esbuild
- GitHub Actions

## Cenários

### Autenticação
- Login com usuário válido
- Bloqueio de usuário indisponível

### Carrinho
- Inclusão de produto
- Validação da quantidade no carrinho
- Validação do produto selecionado

### Checkout
- Fluxo completo de compra
- Dados de cliente
- Confirmação de pedido

## BDD

```gherkin
@smoke @regression
Scenario: Complete checkout successfully
  Given I have "Sauce Labs Bike Light" in my cart
  When I complete the checkout with valid customer data
  Then the order should be completed successfully
```

## Estrutura

```text
cypress-bdd-automation/
├── .github/workflows/
├── cypress/
│   ├── data/
│   ├── e2e/
│   ├── pages/
│   └── support/
├── cypress.config.ts
├── package.json
└── tsconfig.json
```

## Boas práticas demonstradas

- BDD com Gherkin
- Page Object Model
- Custom Commands
- Dados reutilizáveis
- Seletores estáveis com `data-test`
- Assertions orientadas ao comportamento
- Cenários de smoke e regressão
- Evidências automáticas em falha
- Vídeos da execução
- CI/CD com GitHub Actions
- TypeScript em modo strict

## Instalação

```bash
npm install
```

## Execução

```bash
npm test
npm run open
npm run test:headed
npm run test:chrome
npm run typecheck
```

## CI/CD

O workflow `Cypress BDD Tests` executa type check, a suíte BDD e publica screenshots/vídeos como artifacts.

## Competências demonstradas

`Cypress` `TypeScript` `BDD` `Cucumber` `Gherkin` `E2E Testing` `Page Object Model` `Custom Commands` `Smoke Testing` `Regression Testing` `GitHub Actions` `CI/CD`

## Autor

**Wesley Coutinho**  
QA Engineer | Test Automation

LinkedIn: https://www.linkedin.com/in/wesleycoutinhoqa/  
GitHub: https://github.com/WesleyCouti
