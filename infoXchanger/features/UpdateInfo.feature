Feature: Update Info
As a logged in user
So that all the ones that have access to that info will see the last update
I want to update an info and save it on the server

Scenario: User update his profile
 Given I am a logged in user
 And I am on the myprofile page
 When I follow "Edit Profile"
 Then I should be on the users_edit page
 When I fill in "user[first_name]" with "New_name"
 And I press "Save changes"
 Then I should see "New_name"
