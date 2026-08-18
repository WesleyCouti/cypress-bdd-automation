export class CartPage {
  private readonly cartItem = '[data-test="cart-item"]';
  private readonly productName = '[data-test="inventory-item-name"]';
  private readonly checkoutButton = '[data-test="checkout"]';

  assertProduct(productName: string): void {
    cy.contains(this.productName, productName)
      .should('be.visible');
  }

  assertCartLoaded(): void {
    cy.url().should('include', '/cart.html');

    cy.get(this.cartItem)
      .should('have.length.greaterThan', 0);
  }

  startCheckout(): void {
    cy.get(this.checkoutButton)
      .should('be.visible')
      .and('be.enabled')
      .click();

    cy.url().should('include', '/checkout-step-one.html');
  }
}
