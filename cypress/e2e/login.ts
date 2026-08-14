import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../data/users';

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();

Given('I am on the login page', () => {
  loginPage.visit();
});

When('I log in with a valid user', () => {
  loginPage.login(users.standard.username, users.standard.password);
});

When('I log in with a locked user', () => {
  loginPage.login(users.locked.username, users.locked.password);
});

Then('the product catalog should be displayed', () => {
  inventoryPage.assertLoaded();
});

Then('I should see the locked user error message', () => {
  loginPage.assertError('Sorry, this user has been locked out');
});
