Feature: Access Token
As a logged user
So that I can see the info of another user anywhere in the internet
I want to click on a link that give me access to these info

Scenario: LinkToken Click
 Given I am a logged in user
 And I have a token of mario@fake.com
 When I visit the token link
 Then I should be on the users_show page
 And I should see "mario@fake.com"
