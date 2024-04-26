
@FetchData
Feature: Fetch Data
    User can fetch data from the fetch-data page

Scenario: User can fetch data from the fetch-data page
    Given a user is logged in
    When the user fetches data from the fetch-data page
    Then weather forecast is visible

Scenario: User who is not logged in cannot fetch data from the fetch-data page
    Given a user is not logged in
    When the user fetches data from the fetch-data page
    Then weather forecast is not visible
