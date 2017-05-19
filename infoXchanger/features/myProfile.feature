Feature: Login
As a logged in user
So that i can see my informations
I want to go to my profile

Scenario: User Successfully Logs in
 Given I am a logged in user
 And I am on the home page
 When I follow "my Profile"
 Then I should be on the user user@user.com profile page
 And I should see "First Name"
