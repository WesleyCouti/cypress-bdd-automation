Feature: Authentication

  As a customer
  I want to authenticate in the application
  So that I can access the product catalog

  @smoke
  Scenario: Successful login
    Given I am on the login page
    When I log in with a valid user
    Then the product catalog should be displayed

  @regression
  Scenario: Locked user cannot access the application
    Given I am on the login page
    When I log in with a locked user
    Then I should see the locked user error message
