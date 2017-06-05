Feature: whoscannedme QRToken List
As a Logged user
So that i can check who has requested the info I have shared
I want to see the list of all the users that have scanned me

Scenario: WhoScannedMe List
 Given I am a logged in user
 And I am on the home page
 And I have been previously scanned by Mario@mario.com
 When I follow "Who Scanned Me"
 Then I should be on the scannedtokens_whoscannedme page
 And I should see "Who Scanned Me"
 And I should see "Mario@mario.com"
