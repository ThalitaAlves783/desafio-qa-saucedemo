class CartPage {
  assertItems(expectedItems) {
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

      expect(actualItems, 'cart items').to.deep.equal(expectedItems);
    });
  }

  proceedToCheckout() {
    cy.get('[data-test="checkout"]').click();
  }
}

export default new CartPage();
