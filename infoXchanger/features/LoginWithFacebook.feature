Feature: LoginWithFacebook
As a FB user
So that i can register to the service
I want to login with my FB credentials

@omniauth_test
Scenario: User Logs in with FB
 Given I am on the home page
 And I am not authenticated
 When I sign in with Facebook provider
 Then I should be on the home page
 And I should see "Successfully authenticated from Facebook account."
