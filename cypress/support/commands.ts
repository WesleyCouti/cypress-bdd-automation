declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
    }
  }
}

const usernameInput = '[data-test="username"]';
const passwordInput = '[data-test="password"]';
const loginButton = '[data-test="login-button"]';

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.get(usernameInput)
    .should('be.visible')
    .clear();

  if (username) {
    cy.get(usernameInput)
      .type(username);
  }

  cy.get(passwordInput)
    .should('be.visible')
    .clear();

  if (password) {
    cy.get(passwordInput)
      .type(password, { log: false });
  }

  cy.get(loginButton)
    .should('be.visible')
    .and('be.enabled')
    .click();
});

export {};