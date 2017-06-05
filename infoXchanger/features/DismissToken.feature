Feature: Dismiss QRToken
As a Logged user
So that no one with that token can scan it anymore
I want to delete a QRToken from the server

Scenario: Dismiss QRToken
 Given I am a logged in user
 And I am on the home page
 When I press "Create Token"
 And I check "select_all"
 And I press "Generate Token"
 And I follow "Home"
 And I follow "My Tokens"
 Then I should be on the tokens_mytokens page
 And I should see "user"
 When I press "Dismiss this token"
 Then I should not see "user"
