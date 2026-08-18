import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../data/users';

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();
const cartPage = new CartPage();

Given('I am authenticated in the product catalog', () => {
  loginPage.visit();

  loginPage.login(
    users.standard.username,
    users.standard.password
  );

  inventoryPage.assertLoaded();
});

When('I add {string} to the cart', (productName: string) => {
  inventoryPage.addProduct(productName);
});

Then('the cart should contain {int} item', (count: number) => {
  inventoryPage.assertCartCount(count);
  inventoryPage.openCart();
  cartPage.assertCartLoaded();
});

Then('{string} should be displayed in the cart', (productName: string) => {
  cartPage.assertProduct(productName);
});
