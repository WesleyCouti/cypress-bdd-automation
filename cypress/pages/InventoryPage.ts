export class InventoryPage {
  private readonly title = '[data-test="title"]';
  private readonly inventoryItem = '[data-test="inventory-item"]';
  private readonly cartBadge = '[data-test="shopping-cart-badge"]';
  private readonly cartLink = '[data-test="shopping-cart-link"]';

  assertLoaded(): void {
    cy.url().should('include', '/inventory.html');

    cy.get(this.title)
      .should('be.visible')
      .and('have.text', 'Products');

    cy.get(this.inventoryItem)
      .should('have.length.greaterThan', 0);
  }

  addProduct(productName: string): void {
    cy.contains(this.inventoryItem, productName)
      .should('be.visible')
      .within(() => {
        cy.contains('button', 'Add to cart')
          .should('be.visible')
          .click();
      });
  }

  assertCartCount(count: number): void {
    cy.get(this.cartBadge)
      .should('be.visible')
      .and('have.text', String(count));
  }

  openCart(): void {
    cy.get(this.cartLink)
      .should('be.visible')
      .click();

    cy.url().should('include', '/cart.html');
  }
}
