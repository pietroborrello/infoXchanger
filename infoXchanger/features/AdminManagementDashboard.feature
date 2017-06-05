Feature: Admin Management DashBoard
As a admin user
So that i can delete and edit a users
I want to be able to have access to the admin dashboard

Scenario: Admin access granted
 Given I am a logged in admin user
 And I am on the home page
 When I follow "Admin Dashboard"
 Then I should be on the admin page
 And I should see "Site Administration"

 Scenario: User access not granted
  Given I am a logged in user
  And I am on the home page
  Then I should not see "Admin Dashboard"
  When I go to the admin page
  Then I should be on the home page
  And I should see "You are not authorized to access this page."
