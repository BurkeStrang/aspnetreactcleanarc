﻿@Login
Feature: Login
    User can log in

Scenario: User can log in with valid credentials
	Given a logged out user
	When the user logs in with valid credentials
	Then they log in successfully

Scenario: User cannot log in with invalid credentials
  Given a logged out user
  When the user logs in with invalid credentials
  Then an error is displayed

# Scenario: User can log out
#   Given a logged in user
#   When the user logs out
#   Then they log out successfully

# Scenario: User can register
#   Given a logged out user
#   When the user registers
#   Then they register successfully

