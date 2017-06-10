Feature: Access password protected LinkToken
As a logged user
So that I can see the info of another user anywhere in the internet
I want to click on a link that give me access to these info

Scenario: Right Password
 Given I am a logged in user
 And I have a password protected token of mario@fake.com with password 12345678
 When I visit the token link
 Then I should be on the tokens_password page
 And I should see "Password"
 When I fill in "password_" with "12345678"
 And I press "Ok"
 Then I should be on the users_show page
 And I should see "mario@fake.com"

 Scenario: Empty Password
  Given I am a logged in user
  And I have a password protected token of mario@fake.com with password 12345678
  When I visit the token link
  Then I should be on the tokens_password page
  And I should see "Password"
  When I fill in "password_" with ""
  And I press "Ok"
  Then I should be on the tokens_password page
  And I should see "You have to insert a password"

  Scenario: Wrong Password
   Given I am a logged in user
   And I have a password protected token of mario@fake.com with password 12345678
   When I visit the token link
   Then I should be on the tokens_password page
   And I should see "Password"
   When I fill in "password_" with "00000000"
   And I press "Ok"
   Then I should be on the tokens_password page
   And I should see "Wrong Password"
