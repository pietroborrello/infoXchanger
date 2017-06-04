Feature: My QRToken List
As a Logged user
So that I can track the QRToken and links I generate
I want to see a list of the QRtokens and links I have ever generated

Scenario: Scanned List
 Given I am a logged in user
 And I am on the home page
 And I had previously created a token
 When I press "My Tokens"
 Then I should be on the mytokens page
 And I should see "Here all the tokens you have generated:"
 And I should see "Mario@mario.com" ????
