import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

describe('Fluxo de compra', () => {
  it('CT-003 - deve concluir uma compra com dois produtos no carrinho', () => {
    cy.fixture('products').then(({ itemsForCheckout, checkoutSummary, checkoutSuccessMessage }) => {
      cy.fixture('customer').then((customer) => {
        cy.loginAsStandardUser();
        InventoryPage.assertLoaded();

        itemsForCheckout.forEach((product, index) => {
          InventoryPage.addProductToCart(product.name, index + 1);
        });

        InventoryPage.openCart();
        CartPage.assertItems(itemsForCheckout);

        CartPage.proceedToCheckout();
        CheckoutPage.fillCustomerInformation(customer);
        CheckoutPage.continueCheckout();
        CheckoutPage.assertOrderSummary(itemsForCheckout, checkoutSummary);
        CheckoutPage.finishOrder();
        CheckoutPage.assertSuccessMessage(checkoutSuccessMessage);
      });
    });
  });
});
