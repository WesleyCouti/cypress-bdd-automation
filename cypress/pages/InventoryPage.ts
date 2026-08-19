export class InventoryPage {
  private readonly title = '[data-test="title"]';
  private readonly inventoryItem = '[data-test="inventory-item"]';
  private readonly cartBadge = '[data-test="shopping-cart-badge"]';
  private readonly cartLink = '[data-test="shopping-cart-link"]';
  private readonly sortSelect = '[data-test="product-sort-container"]';
  private readonly itemPrice = '[data-test="inventory-item-price"]';

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

  sortByPriceLowToHigh(): void {
    cy.get(this.sortSelect)
      .should('be.visible')
      .select('lohi');
  }

  assertProductsSortedByPriceLowToHigh(): void {
    cy.get(this.itemPrice)
      .should('have.length.greaterThan', 1)
      .then(($prices) => {
        const prices = [...$prices].map((element) =>
          Number(element.textContent?.replace('$', '') ?? 0)
        );

        const sortedPrices = [...prices].sort((a, b) => a - b);

        expect(prices).to.deep.equal(sortedPrices);
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