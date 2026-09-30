class InventoryPage {
  assertLoaded() {
    cy.location('pathname').should('eq', '/inventory.html');
    cy.get('[data-test="title"]').should('have.text', 'Products');
    cy.get('[data-test="inventory-item"]').should('have.length.greaterThan', 0);
  }

  assertCatalogMatches(expectedProducts) {
    cy.get('[data-test="inventory-item"]').should('have.length', expectedProducts.length);
    cy.get('[data-test="inventory-item-price"]').should('have.length', expectedProducts.length);

    cy.get('[data-test="inventory-item"]').then(($items) => {
      const actualProducts = [...$items].map((item) => {
        const root = Cypress.$(item);
        const name = root.find('[data-test="inventory-item-name"]').text().trim();
        const rawPrice = root.find('[data-test="inventory-item-price"]').text().trim();

        return {
          name,
          price: this.parsePrice(rawPrice),
        };
      });

      expect(actualProducts, 'catalog products').to.deep.equal(expectedProducts);
    });
  }

  addProductToCart(productName, expectedCartCount) {
    cy.get('[data-test="inventory-item"]')
      .filter((index, item) => {
        const name = Cypress.$(item)
          .find('[data-test="inventory-item-name"]')
          .text()
          .trim();

        return name === productName;
      })
      .should('have.length', 1)
      .within(() => {
        cy.get('[data-test^="add-to-cart-"]')
          .should('have.text', 'Add to cart')
          .click();
        cy.get('[data-test^="remove-"]')
          .should('have.text', 'Remove');
      });

    this.assertCartBadge(expectedCartCount);
  }

  openCart() {
    cy.get('[data-test="shopping-cart-link"]').click();
  }

  selectSort(optionValue) {
    cy.get('[data-test="product-sort-container"]').select(optionValue);
    cy.get('[data-test="product-sort-container"]').should('have.value', optionValue);
  }

  assertCartBadge(expectedCount) {
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', String(expectedCount));
  }

  assertSortedCatalog(expectedProducts) {
    cy.get('[data-test="product-sort-container"]').should('have.value', 'lohi');
    cy.get('[data-test="inventory-item"]').should('have.length', expectedProducts.length);
    cy.get('[data-test="inventory-item-price"]').should('have.length', expectedProducts.length);

    const expectedSortedProducts = [...expectedProducts].sort((a, b) => a.price - b.price);

    cy.get('[data-test="inventory-item"]').then(($items) => {
      const actualProducts = [...$items].map((item) => {
        const root = Cypress.$(item);
        const name = root.find('[data-test="inventory-item-name"]').text().trim();
        const rawPrice = root.find('[data-test="inventory-item-price"]').text().trim();

        return {
          name,
          price: this.parsePrice(rawPrice),
        };
      });

      expect(actualProducts, 'sorted catalog products').to.deep.equal(expectedSortedProducts);
    });
  }

  parsePrice(rawPrice) {
    const normalizedPrice = rawPrice.replace('$', '').trim();
    const price = Number(normalizedPrice);

    expect(normalizedPrice, `price text "${rawPrice}"`).to.not.equal('');
    expect(Number.isFinite(price), `valid numeric price "${rawPrice}"`).to.equal(true);

    return price;
  }
}

export default new InventoryPage();
