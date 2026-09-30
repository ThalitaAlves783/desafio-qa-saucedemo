class CheckoutPage {
  fillCustomerInformation({ firstName, lastName, postalCode }) {
    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);
    cy.get('[data-test="postalCode"]').type(postalCode);
  }

  continueCheckout() {
    cy.get('[data-test="continue"]').click();
  }

  assertOrderSummary(expectedItems, expectedSummary) {
    cy.location('pathname').should('eq', '/checkout-step-two.html');
    cy.get('[data-test="cart-list"] [data-test="inventory-item"]')
      .should('have.length', expectedItems.length);

    cy.get('[data-test="cart-list"] [data-test="inventory-item"]').then(($items) => {
      const actualItems = [...$items].map((item) => {
        const root = Cypress.$(item);
        const name = root.find('[data-test="inventory-item-name"]').text().trim();
        const rawPrice = root.find('[data-test="inventory-item-price"]').text().trim();
        const quantityText = root.find('[data-test="item-quantity"]').text().trim();
        const quantity = Number(quantityText);
        const price = Number(rawPrice.replace('$', '').trim());

        expect(Number.isInteger(quantity), `quantity for ${name}`).to.equal(true);
        expect(Number.isFinite(price), `price for ${name}`).to.equal(true);

        return { name, price, quantity };
      });

      expect(actualItems, 'overview items').to.deep.equal(expectedItems);
    });

    this.assertMoney('[data-test="subtotal-label"]', 'Item total', expectedSummary.subtotal);
    this.assertMoney('[data-test="tax-label"]', 'Tax', expectedSummary.tax);
    this.assertMoney('[data-test="total-label"]', 'Total', expectedSummary.total);
  }

  finishOrder() {
    cy.get('[data-test="finish"]').click();
  }

  assertSuccessMessage(message) {
    cy.get('[data-test="complete-header"]')
      .should('be.visible')
      .and('have.text', message);
  }

  assertMoney(selector, label, expectedValue) {
    cy.get(selector).should('have.text', `${label}: $${expectedValue.toFixed(2)}`);
  }
}

export default new CheckoutPage();
