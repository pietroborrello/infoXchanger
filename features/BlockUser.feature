Feature: BlockUser
As a Logged user
So that i can revoke the access of a user from my personal info
I want to block a user from the access of a specific token

Scenario: Block User
 Given I was previously logged in as "prova@prova.com"
 And I am a logged in user
 And I am on the home page
 When I fill in "query_" with "prova@prova.com"
 And I press "Search"
 Then I should be on the users_search page
 And I should see "prova@prova.com"
 When I follow "Show"
 And I press "Block this user"
 Then I should be on the blockedusers_show page
 And I should see "prova@prova.com"
