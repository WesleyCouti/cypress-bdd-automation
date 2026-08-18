Feature: Authentication

  As a customer
  I want to authenticate in the application
  So that I can access the product catalog

  @smoke
  Scenario: Successful login
    Given I am on the login page
    When I authenticate with valid credentials
    Then the product catalog should be displayed

  @regression
  Scenario: Locked user cannot access the application
    Given I am on the login page
    When I authenticate with locked user credentials
    Then I should see the locked user error message
