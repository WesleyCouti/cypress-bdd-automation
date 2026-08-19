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
- Scenario Outline
- GitHub Actions
- CI/CD

---

## Test Coverage

The automated suite covers critical user flows against the public **SauceDemo** application.

### Authentication

- Successful login
- Locked user validation
- Required field validation
- Reusable authentication through Cypress Custom Commands

### Product Catalog

- Product catalog validation
- Sort products by price from low to high
- Sort products alphabetically from A to Z
- Sort products alphabetically from Z to A
- Parameterized sorting behavior
- Scenario Outline for multiple sorting combinations

### Shopping Cart

- Add product to cart
- Remove product from cart
- Validate cart quantity
- Validate selected product
- Validate empty cart state

### Checkout

- Add product before checkout
- Fill customer information
- Validate required customer information
- Validate product and price in the order summary
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

This approach helps keep test scenarios understandable for both technical and non-technical stakeholders.

The project also uses **Scenario Outline** to execute the same business behavior with different data combinations.

Example:

```gherkin
@regression
Scenario Outline: Sort products alphabetically
  Given I am authenticated in the product catalog
  When I sort the products using "<sortOption>"
  Then the products should be displayed in "<order>" alphabetical order

  Examples:
    | sortOption | order      |
    | az         | ascending  |
    | za         | descending |
```

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
│   │   ├── inventory.feature
│   │   ├── inventory.ts
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
├── package-lock.json
├── package.json
├── tsconfig.json
└── README.md
```

### Responsibilities

| Directory | Responsibility |
|---|---|
| `cypress/e2e/` | Gherkin scenarios and TypeScript step definitions |
| `cypress/pages/` | Page interactions, selectors and reusable UI behavior |
| `cypress/data/` | Reusable and centralized test data |
| `cypress/support/` | Cypress custom commands and global setup |
| `.github/workflows/` | Continuous integration pipeline |

---

## Test Strategy

The framework was structured around principles commonly applied to maintainable E2E automation.

### Business-Readable Scenarios

BDD scenarios describe expected behavior using **Given / When / Then**, keeping test intent separated from automation implementation.

### Maintainability

Page interactions and selectors are encapsulated inside Page Objects.

This reduces duplicated selectors and helps isolate UI changes from business scenarios.

### Reusability

Common actions are implemented through reusable Cypress Custom Commands.

The project provides generic authentication:

```typescript
cy.login(username, password);
```

And reusable authentication for the standard test user:

```typescript
cy.loginAsStandardUser();
```

This prevents repeated authentication implementation across multiple scenarios.

### Test Data Management

User and checkout data are maintained separately from test implementation.

This makes scenarios easier to read and allows test data to evolve independently.

### Stable Selectors

The project prioritizes selectors based on `data-test` attributes whenever available.

This reduces coupling with visual layout and CSS implementation.

### Reliability

Tests rely on Cypress retryability and assertions instead of fixed waits.

This reduces unnecessary timing dependencies and improves execution stability.

### Parameterized Testing

Reusable methods and Scenario Outlines are used when the same behavior needs to be validated against different conditions.

Product sorting, for example, uses a reusable Page Object method:

```typescript
sortProducts(option);
```

This supports different sorting strategies without duplicating interaction logic.

---

## Smoke and Regression Strategy

BDD scenarios are classified using Cucumber tags:

```text
@smoke
@regression
```

These tags are actively used by GitHub Actions to execute dedicated suites.

### Smoke Suite

The Smoke suite focuses on fast validation of the application's most critical business flows.

Examples include:

- Successful authentication
- Shopping cart
- Successful checkout

Run with:

```bash
npm run test:smoke
```

### Regression Suite

The Regression suite provides broader functional coverage.

It includes scenarios involving:

- Authentication
- Negative validations
- Shopping cart behavior
- Checkout validations
- Product catalog sorting

Run with:

```bash
npm run test:regression
```

This strategy allows critical-path validation and broader regression coverage to execute independently.

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

Install dependencies using the committed lockfile:

```bash
npm ci
```

Using `npm ci` provides deterministic dependency installation based on `package-lock.json`, which is also used by the CI pipeline.

---

## Running the Tests

Run the complete suite in headless mode:

```bash
npm test
```

Open Cypress Test Runner:

```bash
npm run test:open
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

Run the Smoke suite:

```bash
npm run test:smoke
```

Run the Regression suite:

```bash
npm run test:regression
```

---

## CI/CD Pipeline

The project uses **GitHub Actions** to execute independent Smoke and Regression BDD suites.

```text
                  Push / Pull Request
                          │
                          ▼
                  Checkout Repository
                          │
                          ▼
                     Setup Node.js
                          │
                          ▼
                       npm ci
                          │
                          ▼
                 TypeScript Validation
                          │
               ┌──────────┴──────────┐
               │                     │
               ▼                     ▼
        @smoke execution      @regression execution
               │                     │
               ▼                     ▼
          Smoke Suite           Regression Suite
               │                     │
               └──────────┬──────────┘
                          │
                 ┌────────┴────────┐
                 ▼                 ▼
            Screenshots          Videos
             on failure         Artifacts
```

The pipeline runs automatically on pushes and pull requests to the main branch and can also be manually triggered through the **Actions** tab.

The current pipeline status is displayed by the badge at the top of this README.

---

## Continuous Integration

Each CI execution runs the project in a clean Linux environment.

The workflow performs:

1. Repository checkout
2. Node.js setup
3. Deterministic dependency installation with `npm ci`
4. TypeScript validation
5. Smoke execution
6. Regression execution
7. Evidence upload through GitHub Actions artifacts

Smoke and Regression are executed as independent jobs, making their results clearly visible in the GitHub Actions interface.

---

## Test Evidence

The Cypress configuration generates execution evidence to support failure analysis.

### Screenshots

Screenshots are automatically generated when tests fail.

Failed-test screenshots are uploaded as GitHub Actions artifacts.

### Videos

Video recording is enabled for automated runs.

Videos are uploaded as GitHub Actions artifacts after execution.

These artifacts help investigate failures without immediately reproducing the scenario locally.

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

Custom Commands are useful for reusable actions shared across different scenarios, such as authentication.

This reduces duplication and improves readability.

### Why Scenario Outline?

Scenario Outline allows the same business behavior to be validated against multiple data combinations without duplicating scenarios.

The product catalog sorting tests demonstrate this approach.

### Why Separate Test Data?

Keeping test data outside test implementation makes scenarios easier to maintain and helps avoid hardcoded information throughout the suite.

### Why Stable Selectors?

Using `data-test` selectors reduces dependency on layout and styling changes.

This makes the automation less fragile when visual implementation changes without affecting business behavior.

### Why Smoke and Regression Tags?

Tags allow the same BDD framework to support different testing objectives.

Smoke scenarios prioritize fast validation of critical flows, while regression scenarios provide broader functional confidence.

### Why npm ci?

The project commits its `package-lock.json` and uses `npm ci` in continuous integration.

This provides predictable dependency versions and makes CI executions more reproducible.

### Why GitHub Actions?

Continuous integration provides a repeatable execution environment and demonstrates that the framework can execute independently of a local development machine.

---

## Skills Demonstrated

This project demonstrates practical experience with:

`Cypress` • `TypeScript` • `BDD` • `Cucumber` • `Gherkin` • `E2E Testing` • `Page Object Model` • `Custom Commands` • `Scenario Outline` • `Smoke Testing` • `Regression Testing` • `Negative Testing` • `Test Data Management` • `Stable Selectors` • `Parameterized Testing` • `Tag-Based Execution` • `Test Evidence` • `GitHub Actions` • `CI/CD`

---

## Roadmap

Possible future improvements:

- [ ] Dedicated Cucumber HTML report
- [ ] API interception and validation with `cy.intercept()`
- [ ] Accessibility testing
- [ ] Multi-environment configuration
- [ ] Parallel execution strategy

The current version already provides a complete foundation for maintainable BDD E2E automation and CI execution.

---

## Author

**Wesley Coutinho**

QA Engineer | Test Automation

Playwright • Cypress • API Testing • JavaScript • TypeScript • SQL • CI/CD

LinkedIn: https://www.linkedin.com/in/wesleycoutinhoqa/  
GitHub: https://github.com/WesleyCouti
