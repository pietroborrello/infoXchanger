Feature: Register
As a user
So that i can create my profile
I want to register to the service with an email and password

Scenario: User Successfully register
 Given I am not a registered user
 And I am on the home page
 And I am not authenticated
 When I register as user@user.com, useruser
 Then I should be on the home page
 And I should see "Logged in"

 Scenario: User fails to register
  Given I am not a registered user
  And I am on the home page
  And I am not authenticated
  When I register as user, useruser
  Then I should be on the users page
  And I should see "error"
