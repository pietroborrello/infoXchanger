Feature: Show QRToken & LinkToken
As a logged user
So that I can share the info of a user
I want to share the link that refers the info I have

Scenario: LinkToken Click
Given I am a logged in user
And I am on the home page
And I had previously scanned Mario@mario.com
When I follow "Scanned Tokens"
Then I should be on the scannedtokens_scanned page
And I should see "Scanned"
And I should see "Mario@mario.com"
And I should see "Share"
When I follow "Share"
Then I should be on the scannedtokens_show page
And I should see "?t="
