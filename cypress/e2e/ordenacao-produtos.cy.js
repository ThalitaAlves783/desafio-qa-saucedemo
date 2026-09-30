import InventoryPage from '../pages/InventoryPage';

describe('Ordenacao de produtos', () => {
  it('CT-004 - deve ordenar produtos por preco do menor para o maior', () => {
    cy.fixture('products').then(({ catalog }) => {
      cy.loginAsStandardUser();
      InventoryPage.assertLoaded();
      InventoryPage.selectSort('lohi');
      InventoryPage.assertSortedCatalog(catalog);
    });
  });
});
