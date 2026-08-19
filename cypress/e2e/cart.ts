import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';


const inventoryPage = new InventoryPage();
const cartPage = new CartPage();


Given('I am authenticated in the product catalog', () => {
  cy.loginAsStandardUser();
  inventoryPage.assertLoaded();
});


Given('I have {string} in the cart', (productName: string) => {
  inventoryPage.addProduct(productName);
  inventoryPage.assertCartCount(1);
});


When('I add {string} to the cart', (productName: string) => {
  inventoryPage.addProduct(productName);
});


When('I remove {string} from the cart', (productName: string) => {
  inventoryPage.openCart();
  cartPage.assertCartLoaded();
  cartPage.removeProduct(productName);
});


Then('the cart should contain {int} item', (count: number) => {
  inventoryPage.assertCartCount(count);
  inventoryPage.openCart();
  cartPage.assertCartLoaded();
});


Then('{string} should be displayed in the cart', (productName: string) => {
  cartPage.assertProduct(productName);
});


Then('the cart should be empty', () => {
  cartPage.assertEmpty();
});