export type CheckoutData = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class CheckoutPage {
  fillCustomerData(data: CheckoutData): void {
    cy.get('[data-test="firstName"]').type(data.firstName);
    cy.get('[data-test="lastName"]').type(data.lastName);
    cy.get('[data-test="postalCode"]').type(data.postalCode);
    cy.get('[data-test="continue"]').click();
  }

  finishOrder(): void {
    cy.get('[data-test="finish"]').click();
  }

  assertCompleted(): void {
    cy.get('[data-test="complete-header"]')
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');
  }
}
