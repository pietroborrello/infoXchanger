Feature: Search User
As a Logged user
So that i can find someone
I want to search a particular user by name

Scenario: User found
 Given I am a logged in user
 And I am on the home page
 When I fill in "query_" with "user@user.com"
 And I press "Search"
 Then I should be on the users_search page
 And I should see "user@user.com"

 Scenario: User not found
 Given I am a logged in user
 And I am on the home page
 When I fill in "query_" with "notexistinguser@user.com"
 And I press "Search"
 Then I should be on the home page
 And I should see "No user found"
