Feature: Reply To info request
As a logged user with an info request pending
So that I can reply an info request
I want to generate and send the Token, or reject the request

Scenario: Allow request
 Given  I am a logged in user
 And I am on the home page
 And another user called user2@user.com exists
 And I have an info request from user2@user.com
 When I follow "Info Requests"
 Then I should be on the inforequests_show page
 And I should see "user2@user.com"
 When I press "Allow"
 Then I should be on the inforequests_show page
 And I should not see "user2@user.com"
 When I am not authenticated
 And I log in as user2@user.com
 Then I should see "Scanned Tokens"
 And I go to the scannedtokens_scanned  page
 Then I should see "user@user.com"

 Scenario: Deny request
  Given  I am a logged in user
  And I am on the home page
  And another user called user2@user.com exists
  And I have an info request from user2@user.com
  When I follow "Info Requests"
  Then I should be on the inforequests_show page
  And I should see "user2@user.com"
  When I press "Deny"
  Then I should be on the inforequests_show page
  And I should not see "user2@user.com"
  When I am not authenticated
  And I log in as user2@user.com
  Then I should see "Scanned Tokens"
  And I go to the scannedtokens_scanned  page
  Then I should not see "user@user.com"
