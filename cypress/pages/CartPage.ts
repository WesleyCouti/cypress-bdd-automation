export class CartPage {
  private readonly productName = '[data-test="inventory-item-name"]';
  private readonly checkoutButton = '[data-test="checkout"]';

  assertCartLoaded(): void {
    cy.url().should('include', '/cart.html');

    cy.get(this.checkoutButton)
      .should('be.visible');
  }

  assertProduct(productName: string): void {
    cy.contains(this.productName, productName)
      .should('be.visible');
  }

  startCheckout(): void {
    cy.get(this.checkoutButton)
      .should('be.visible')
      .and('be.enabled')
      .click();

    cy.url().should('include', '/checkout-step-one.html');
  }
}
