Feature: Checkout

  As an authenticated customer
  I want to complete my order
  So that I can finish the purchase flow

  @smoke @regression
  Scenario: Complete checkout successfully
    Given I have "Sauce Labs Bike Light" in my cart
    When I complete the checkout with valid customer data
    Then the order should be completed successfully
