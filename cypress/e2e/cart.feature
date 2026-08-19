Feature: Shopping cart

  As an authenticated customer
  I want to manage products in my cart
  So that I can review my purchase before checkout

  @smoke @regression
  Scenario: Add a product to the cart
    Given I am authenticated in the product catalog
    When I add "Sauce Labs Backpack" to the cart
    Then the cart should contain 1 item
    And "Sauce Labs Backpack" should be displayed in the cart

  @regression
  Scenario: Remove a product from the cart
    Given I am authenticated in the product catalog
    And I have "Sauce Labs Backpack" in the cart
    When I remove "Sauce Labs Backpack" from the cart
    Then the cart should be empty