Feature: Product catalog

  As an authenticated customer
  I want to organize the product catalog
  So that I can easily compare available products

  @regression
  Scenario: Sort products by price from low to high
    Given I am authenticated in the product catalog
    When I sort the products using "lohi"
    Then the products should be displayed in ascending price order

  @regression
  Scenario Outline: Sort products alphabetically
    Given I am authenticated in the product catalog
    When I sort the products using "<sortOption>"
    Then the products should be displayed in "<order>" alphabetical order

    Examples:
      | sortOption | order      |
      | az         | ascending  |
      | za         | descending |