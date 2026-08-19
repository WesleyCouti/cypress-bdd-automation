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
  private readonly errorMessage = '[data-test="error"]';
  private readonly inventoryItemName = '[data-test="inventory-item-name"]';
  private readonly inventoryItemPrice = '[data-test="inventory-item-price"]';
  private readonly totalLabel = '[data-test="total-label"]';

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

    this.continueCheckout();

    cy.url().should('include', '/checkout-step-two.html');
  }

  continueCheckout(): void {
    cy.get(this.continueButton)
      .should('be.visible')
      .and('be.enabled')
      .click();
  }

  assertOrderSummary(productName: string, productPrice: string): void {
    cy.contains(this.inventoryItemName, productName)
      .should('be.visible');

    cy.get(this.inventoryItemPrice)
      .should('be.visible')
      .and('have.text', productPrice);

    cy.get(this.totalLabel)
      .should('be.visible')
      .and('contain.text', 'Total:');
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

  assertError(message: string): void {
    cy.get(this.errorMessage)
      .should('be.visible')
      .and('contain.text', message);
  }
}