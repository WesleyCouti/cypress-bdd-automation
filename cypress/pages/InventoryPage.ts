export class InventoryPage {
  private readonly title = '[data-test="title"]';
  private readonly inventoryItem = '[data-test="inventory-item"]';
  private readonly inventoryItemName = '[data-test="inventory-item-name"]';
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

  sortProducts(option: string): void {
    cy.get(this.sortSelect)
      .should('be.visible')
      .select(option);
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

  assertProductsSortedByName(order: 'ascending' | 'descending'): void {
    cy.get(this.inventoryItemName)
      .should('have.length.greaterThan', 1)
      .then(($names) => {
        const names = [...$names].map(
          (element) => element.textContent?.trim() ?? ''
        );

        const sortedNames = [...names].sort((a, b) =>
          a.localeCompare(b)
        );

        if (order === 'descending') {
          sortedNames.reverse();
        }

        expect(names).to.deep.equal(sortedNames);
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