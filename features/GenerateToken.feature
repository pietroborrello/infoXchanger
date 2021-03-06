Feature: Generate QRToken & LinkToken
As a logged user
So that I can share a subset of my info with a QRCode
I want to generate a Token

Scenario: GenerateToken
 Given I am a logged in user
 And I am on the home page
 When I press "Create Token"
 Then I should be on the users_select page
 When I check "select_all"
 And I press "Generate Token"
 Then I should be on the user_token page
 And I should see "/?t="

 Scenario: Generate Password protected Token
  Given I am a logged in user
  And I am on the home page
  When I press "Create Token"
  Then I should be on the users_select page
  When I check "select_all"
  And I fill in "password" with "12345678"
  And I press "Generate Token"
  Then I should be on the user_token page
  And I should see "/?t="
