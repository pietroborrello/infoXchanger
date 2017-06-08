Feature: Show QRToken & LinkToken
As a logged user
So that I can show the QRToken of a TokenScanned
I want to click on a link that give me access to these info

Scenario: LinkToken Click
 Given I am a logged in user
 And I have a token of mario@fake.com
 When I visit the show token link
 Then I should be on the scannedtokens_showLinkToken page
 And I should see "Il QRCode e QRCodeLink del Token selezionato sono i seguenti"
