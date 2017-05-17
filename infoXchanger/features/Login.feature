Feature: Login

Scenario: User Successfully Logs in
 Given I am on the home page
 When I follow "Login"
 Then I should be on the Login page
 When I fill in "Email" with "user@user.com"
 And I fill in "Password" with "useruser"
 And I press "Log in"
 Then I should be on the home page
 And I should see "Logged in"
