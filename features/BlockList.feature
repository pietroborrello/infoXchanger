Feature: BlockUserList
As a Logged user
So that i can easily remember users I have blocked
I want to see a list of all the users I have blocked

Scenario: Blocked-Users List
 Given I am a logged in user
 And I am on the myprofile page
 When I press "Blocked Users"
 Then I should be on the blockedusers_show page
 And I should see "Users you have blocked"
