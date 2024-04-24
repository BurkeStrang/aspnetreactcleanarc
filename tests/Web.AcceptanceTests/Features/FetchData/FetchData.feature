
@FetchData
Feature: Fetch Data
    User can fetch data from the fetch-data page

Scenario: User can fetch data from the fetch-data page
    Given a user is logged in
    When the user fetches data from the API
    Then the data is displayed

Scenario: User cannot fetch data from the fetch-data page
    Given a user is not logged in
    When the user fetches data from the API
    Then the data is not displayed
