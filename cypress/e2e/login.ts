import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../data/users';

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();

const lockedUserError =
  'Sorry, this user has been locked out';

Given('I am on the login page', () => {
  loginPage.visit();
});

When('I authenticate with valid credentials', () => {
  loginPage.login(
    users.standard.username,
    users.standard.password
  );
});

When('I authenticate with locked user credentials', () => {
  loginPage.login(
    users.locked.username,
    users.locked.password
  );
});

Then('the product catalog should be displayed', () => {
  inventoryPage.assertLoaded();
});

Then('I should see the locked user error message', () => {
  loginPage.assertError(lockedUserError);
});
