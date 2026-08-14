export class CartPage {
  assertProduct(productName: string): void {
    cy.contains('[data-test="inventory-item-name"]', productName).should('be.visible');
  }

  startCheckout(): void {
    cy.get('[data-test="checkout"]').click();
  }
}
