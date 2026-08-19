Feature: Product catalog

  As an authenticated customer
  I want to organize the product catalog
  So that I can easily compare available products

  @regression
  Scenario: Sort products by price from low to high
    Given I am authenticated in the product catalog
    When I sort the products by price from low to high
    Then the products should be displayed in ascending price order