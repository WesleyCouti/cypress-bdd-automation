import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { checkoutCustomer } from '../data/checkout';


const inventoryPage = new InventoryPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

const requiredFirstNameError = 'Error: First Name is required';


Given('I have {string} in my cart', (productName: string) => {
  cy.loginAsStandardUser();

  inventoryPage.assertLoaded();
  inventoryPage.addProduct(productName);
  inventoryPage.assertCartCount(1);
  inventoryPage.openCart();

  cartPage.assertCartLoaded();
  cartPage.assertProduct(productName);
});


When('I complete the checkout with valid customer data', () => {
  cartPage.startCheckout();
  checkoutPage.fillCustomerData(checkoutCustomer);
});


When('I continue the checkout without customer data', () => {
  cartPage.startCheckout();
  checkoutPage.continueCheckout();
});


Then(
  'I should see {string} with price {string} in the order summary',
  (productName: string, productPrice: string) => {
    checkoutPage.assertOrderSummary(productName, productPrice);
    checkoutPage.finishOrder();
  }
);


Then('the order should be completed successfully', () => {
  checkoutPage.assertCompleted();
});


Then('I should see the required first name error', () => {
  checkoutPage.assertError(requiredFirstNameError);
});