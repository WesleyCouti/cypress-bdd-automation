export class LoginPage {
  visit(): void {
    cy.visit('/');
    cy.get('[data-test="login-button"]').should('be.visible');
  }

  login(username: string, password: string): void {
    cy.login(username, password);
  }

  assertError(message: string): void {
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', message);
  }
}
