
@FetchData
Feature: Fetch Data
    User can fetch data from the fetch-data page

Scenario: User can fetch data from the fetch-data page
    Given a user is logged in
    Then weather forecast is visible

    # Scenario: User cannot fetch data from the fetch-data page
    # Given a user is not logged in
    # Then wather forceast is not visible
