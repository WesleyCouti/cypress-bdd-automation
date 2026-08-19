import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { InventoryPage } from '../pages/InventoryPage';


const inventoryPage = new InventoryPage();


Given('I am authenticated in the product catalog', () => {
  cy.loginAsStandardUser();
  inventoryPage.assertLoaded();
});


When('I sort the products using {string}', (sortOption: string) => {
  inventoryPage.sortProducts(sortOption);
});


Then('the products should be displayed in ascending price order', () => {
  inventoryPage.assertProductsSortedByPriceLowToHigh();
});


Then(
  'the products should be displayed in {string} alphabetical order',
  (order: string) => {
    inventoryPage.assertProductsSortedByName(
      order as 'ascending' | 'descending'
    );
  }
);