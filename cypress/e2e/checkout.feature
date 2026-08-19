Feature: Checkout

  As an authenticated customer
  I want to complete my order
  So that I can finish the purchase flow

  @smoke @regression
  Scenario: Complete checkout successfully
    Given I have "Sauce Labs Bike Light" in my cart
    When I complete the checkout with valid customer data
    Then I should see "Sauce Labs Bike Light" with price "$9.99" in the order summary
    And the order should be completed successfully

  @regression
  Scenario: Required checkout information is not provided
    Given I have "Sauce Labs Bike Light" in my cart
    When I continue the checkout without customer data
    Then I should see the required first name error