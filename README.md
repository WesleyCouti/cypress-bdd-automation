# Cypress BDD Automation

[![Cypress BDD Tests](https://github.com/WesleyCouti/cypress-bdd-automation/actions/workflows/cypress.yml/badge.svg)](https://github.com/WesleyCouti/cypress-bdd-automation/actions/workflows/cypress.yml)

End-to-end test automation framework built with **Cypress, TypeScript and Cucumber/Gherkin**, focused on BDD, maintainability, reusable components, business-readable scenarios and continuous integration.

This project is part of my **QA Automation portfolio** and demonstrates how I structure E2E automation by separating business scenarios, page interactions, test data and reusable Cypress commands.

---

## Tech Stack

- Cypress
- TypeScript
- Cucumber / Gherkin
- BDD
- @badeball/cypress-cucumber-preprocessor
- esbuild
- Page Object Model
- Custom Commands
- GitHub Actions
- CI/CD

---

## Test Coverage

The automated suite covers critical user flows against the public **SauceDemo** application.

### Authentication

- Successful login
- Locked user validation

### Shopping Cart

- Add product to cart
- Validate cart quantity
- Validate selected product

### Checkout

- Add product before checkout
- Fill customer information
- Complete purchase flow
- Validate order confirmation

---

## BDD Strategy

Business scenarios are written using **Gherkin**, keeping expected behavior readable and separated from technical implementation.

Example:

```gherkin
@smoke @regression
Scenario: Complete checkout successfully
  Given I have "Sauce Labs Bike Light" in my cart
  When I complete the checkout with valid customer data
  Then the order should be completed successfully
```

The `.feature` files describe business behavior while TypeScript step definitions implement the automation.

This approach helps keep test scenarios understandable for technical and non-technical stakeholders.

---

## Test Architecture

```text
                     Feature Files
                    Cucumber / Gherkin
                           │
                           ▼
                    Step Definitions
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
        Page Objects   Test Data   Custom Commands
             │             │             │
             └─────────────┼─────────────┘
                           │
                           ▼
                        Cypress
                           │
                           ▼
                       SauceDemo
                           │
                           ▼
                    GitHub Actions
                           │
                ┌──────────┴──────────┐
                ▼                     ▼
           Screenshots              Videos
           on failure              Artifacts
```

This structure keeps business scenarios separated from implementation details and reduces duplicated automation logic.

---

## Project Structure

```text
cypress-bdd-automation/
├── .github/
│   └── workflows/
│       └── cypress.yml
│
├── cypress/
│   ├── data/
│   │   ├── checkout.ts
│   │   └── users.ts
│   │
│   ├── e2e/
│   │   ├── cart.feature
│   │   ├── cart.ts
│   │   ├── checkout.feature
│   │   ├── checkout.ts
│   │   ├── login.feature
│   │   └── login.ts
│   │
│   ├── pages/
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   ├── InventoryPage.ts
│   │   └── LoginPage.ts
│   │
│   └── support/
│       ├── commands.ts
│       └── e2e.ts
│
├── cypress.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Responsibilities

| Directory | Responsibility |
|---|---|
| `cypress/e2e/` | Gherkin scenarios and step definitions |
| `cypress/pages/` | Page interactions and reusable UI behavior |
| `cypress/data/` | Reusable test data |
| `cypress/support/` | Cypress custom commands and global setup |
| `.github/workflows/` | Continuous integration pipeline |

---

## Test Strategy

The framework was structured around principles commonly applied to maintainable E2E automation.

### Business-Readable Scenarios

BDD scenarios describe behavior using **Given / When / Then**, keeping test intent separated from automation implementation.

### Maintainability

Page interactions are encapsulated inside Page Objects.

This reduces duplicated selectors and helps isolate UI changes from business scenarios.

### Reusability

Common actions such as authentication are implemented through reusable Cypress custom commands.

Example:

```typescript
cy.login(username, password);
```

This prevents repeated login implementation across multiple scenarios.

### Test Data Management

User and checkout data are maintained separately from test implementation.

This makes the scenarios easier to read and allows test data to evolve independently.

### Stable Selectors

The project prioritizes selectors based on `data-test` attributes whenever available.

This reduces coupling with visual layout and CSS implementation.

### Reliability

Tests rely on Cypress retryability and assertions instead of fixed waits.

This reduces unnecessary timing dependencies and improves execution stability.

### Smoke and Regression Classification

Scenarios use tags such as:

```text
@smoke
@regression
```

to express their intended test scope and future execution strategy.

### Continuous Integration

The complete automation suite is executed through GitHub Actions in a clean CI environment.

---

## Getting Started

### Requirements

- Node.js
- npm

Clone the repository:

```bash
git clone https://github.com/WesleyCouti/cypress-bdd-automation.git
```

Enter the project directory:

```bash
cd cypress-bdd-automation
```

Install dependencies:

```bash
npm install
```

---

## Running the Tests

Run the complete suite in headless mode:

```bash
npm test
```

Open Cypress Test Runner:

```bash
npm run open
```

Run tests with the browser visible:

```bash
npm run test:headed
```

Run using Chrome:

```bash
npm run test:chrome
```

Run TypeScript validation:

```bash
npm run typecheck
```

---

## CI/CD Pipeline

The project uses **GitHub Actions** to validate the automation framework.

```text
Push / Pull Request
        │
        ▼
Checkout repository
        │
        ▼
Setup Node.js
        │
        ▼
Install dependencies
        │
        ▼
TypeScript validation
        │
        ▼
Run Cypress BDD tests
        │
        ├───────────────┐
        ▼               ▼
Screenshots           Videos
on failure           Artifacts
```

The workflow can also be manually triggered through the **Actions** tab.

The current pipeline status is displayed by the badge at the top of this README.

---

## Test Evidence

The Cypress configuration generates execution evidence to support failure analysis.

### Screenshots

Screenshots are automatically generated when tests fail.

### Videos

Video recording is enabled for automated runs.

In CI, videos are uploaded as GitHub Actions artifacts after execution.

These artifacts help investigate test failures without immediately reproducing the scenario locally.

---

## Application Under Test

### SauceDemo

SauceDemo is used to demonstrate browser-based automation covering:

- Authentication
- Product catalog
- Shopping cart
- Checkout

The application is a public testing environment and is not affiliated with this project.

---

## Technical Decisions

### Why Cypress?

Cypress provides browser automation, automatic retryability, integrated assertions and a developer-friendly test runner suitable for E2E automation.

### Why BDD?

BDD helps describe expected behavior using business-readable scenarios.

It creates a clear separation between:

```text
Business behavior
       ↓
Gherkin scenarios
       ↓
Step definitions
       ↓
Automation implementation
```

### Why Cucumber/Gherkin?

Gherkin makes scenarios understandable beyond the automation code itself and provides a structured vocabulary through Given, When and Then.

### Why Page Object Model?

Page Objects centralize page interactions and selectors.

This keeps step definitions focused on behavior instead of implementation details.

### Why Custom Commands?

Custom commands are useful for reusable actions shared across different scenarios, such as login.

This reduces duplication and improves readability.

### Why Separate Test Data?

Keeping test data outside test implementation makes scenarios easier to maintain and helps avoid hardcoded information throughout the suite.

### Why GitHub Actions?

Continuous integration provides a repeatable execution environment and demonstrates that the framework can execute independently of a local machine.

---

## Skills Demonstrated

This project demonstrates practical experience with:

`Cypress` • `TypeScript` • `BDD` • `Cucumber` • `Gherkin` • `E2E Testing` • `Page Object Model` • `Custom Commands` • `Smoke Testing` • `Regression Testing` • `Test Data Management` • `Stable Selectors` • `GitHub Actions` • `CI/CD`

---

## Roadmap

Possible future improvements:

- [ ] Scenario Outline with multiple test data combinations
- [ ] Execution by Cucumber tags
- [ ] Dedicated Cucumber HTML report
- [ ] API interception and validation with `cy.intercept()`
- [ ] Accessibility testing
- [ ] Multi-environment configuration
- [ ] Parallel execution strategy
- [ ] Additional negative scenarios

---

## Author

**Wesley Coutinho**

QA Engineer | Test Automation

Playwright • Cypress • API Testing • JavaScript • TypeScript • SQL • CI/CD

LinkedIn: https://www.linkedin.com/in/wesleycoutinhoqa/  
GitHub: https://github.com/WesleyCouti
