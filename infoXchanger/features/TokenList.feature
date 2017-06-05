Feature: My QRToken List
As a Logged user
So that I can track the QRToken and links I generate
I want to see a list of the QRtokens and links I have ever generated

Scenario: My QRToken List
 Given I am a logged in user
 And I am on the home page
 When I press "Create Token"
 And I check "select_all"
 And I press "Generate Token"
 And I follow "Home"
 And I follow "My Tokens"
 Then I should be on the tokens_mytokens page
 And I should see "Here all the tokens you have generated"
 And I should see "user"
