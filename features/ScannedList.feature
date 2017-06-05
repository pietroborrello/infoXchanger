Feature: Scanned QRToken List
As a Logged user
So that i can access info every time I want
I want to see the list of all QRtokens I have seen

Scenario: Scanned List
 Given I am a logged in user
 And I am on the home page
 And I had previously scanned Mario@mario.com
 When I follow "Scanned Tokens"
 Then I should be on the scannedtokens_scanned page
 And I should see "Scanned"
 And I should see "Mario@mario.com"
