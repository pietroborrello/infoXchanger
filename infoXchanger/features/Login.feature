Feature: Login
As a registered user
So that i can access my profile
I want to login with my credentials

Scenario: User Successfully Logs in
 Given I am a registered user
 And I am on the home page
 And I am not authenticated
 When I log in
 Then I should be on the home page
 And I should see "Logged in"

 Scenario: User fails to Log in
  Given I am not a registered user
  And I am on the home page
  And I am not authenticated
  When I log in
  Then I should be on the login page
  And I should see "Invalid Email or password."
