Feature: Tracking rides

  As a bike courier
  I want to track my rides during delivery of packages
  To help me control how I work

  Scenario: Viewing stats
    Given I have existing trips in the system
    When I add a new trip to the system
    Then I can see updated weekly stats
    And I can see updated monthly stats
