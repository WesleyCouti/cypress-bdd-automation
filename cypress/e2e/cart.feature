Feature: Shopping cart

  As an authenticated customer
  I want to add products to my cart
  So that I can review my purchase before checkout

  @regression
  Scenario: Add a product to the cart
    Given I am authenticated in the product catalog
    When I add "Sauce Labs Backpack" to the cart
    Then the cart should contain 1 item
    And "Sauce Labs Backpack" should be displayed in the cart
