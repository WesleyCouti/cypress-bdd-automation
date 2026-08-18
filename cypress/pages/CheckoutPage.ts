export type CheckoutData = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class CheckoutPage {
  private readonly firstNameInput = '[data-test="firstName"]';
  private readonly lastNameInput = '[data-test="lastName"]';
  private readonly postalCodeInput = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';
  private readonly finishButton = '[data-test="finish"]';
  private readonly completeHeader = '[data-test="complete-header"]';

  fillCustomerData(data: CheckoutData): void {
    cy.get(this.firstNameInput)
      .should('be.visible')
      .clear()
      .type(data.firstName);

    cy.get(this.lastNameInput)
      .should('be.visible')
      .clear()
      .type(data.lastName);

    cy.get(this.postalCodeInput)
      .should('be.visible')
      .clear()
      .type(data.postalCode);

    cy.get(this.continueButton)
      .should('be.visible')
      .and('be.enabled')
      .click();

    cy.url().should('include', '/checkout-step-two.html');
  }

  finishOrder(): void {
    cy.get(this.finishButton)
      .should('be.visible')
      .and('be.enabled')
      .click();

    cy.url().should('include', '/checkout-complete.html');
  }

  assertCompleted(): void {
    cy.get(this.completeHeader)
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');
  }
}
