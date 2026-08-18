export class LoginPage {
  private readonly loginButton = '[data-test="login-button"]';
  private readonly errorMessage = '[data-test="error"]';

  visit(): void {
    cy.visit('/');

    cy.get(this.loginButton)
      .should('be.visible');
  }

  login(username: string, password: string): void {
    cy.login(username, password);
  }

  assertError(message: string): void {
    cy.get(this.errorMessage)
      .should('be.visible')
      .and('contain.text', message);
  }
}
