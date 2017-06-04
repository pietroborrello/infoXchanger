Feature: Admin Delete Profile
As a admin user
So that i can delete a user
I want to be able to remove him from the database

Scenario: Admin deletes user
 Given I am a logged in admin user
 And another user exists
 And I am on the home page
 When I follow "Admin Dashboard"
 Then I should be on the admin page
 When I follow "Delete"
 Then I should be on the admin_users_delete page
