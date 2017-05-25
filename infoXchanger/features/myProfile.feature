Feature: Access profile
As a logged in user
So that i can see my informations
I want to go to my profile

Scenario: User go to his profile
 Given I am a logged in user
 And I am on the home page
 When I follow "My Profile"
 Then I should be on the users_myprofile page
 And I should see "First Name" 
