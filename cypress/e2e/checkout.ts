import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users } from '../data/users';
import { checkoutCustomer } from '../data/checkout';

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

Given('I have {string} in my cart', (productName: string) => {
  loginPage.visit();

  loginPage.login(
    users.standard.username,
    users.standard.password
  );

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
  checkoutPage.finishOrder();
});

Then('the order should be completed successfully', () => {
  checkoutPage.assertCompleted();
});
