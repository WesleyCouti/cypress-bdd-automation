export class InventoryPage {
  assertLoaded(): void {
    cy.url().should('include', '/inventory.html');
    cy.get('[data-test="title"]').should('have.text', 'Products');
    cy.get('[data-test="inventory-item"]').should('have.length.greaterThan', 0);
  }

  addProduct(productName: string): void {
    cy.contains('[data-test="inventory-item"]', productName)
      .should('be.visible')
      .within(() => {
        cy.contains('button', 'Add to cart').click();
      });
  }

  assertCartCount(count: number): void {
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', String(count));
  }

  openCart(): void {
    cy.get('[data-test="shopping-cart-link"]').click();
  }
}
