Feature: LoginWithGoogle
As a GL user
So that i can register to the service
I want to login with my GL credentials

@omniauth_test
Scenario: User Logs in with GL
 Given I am on the home page
 And I am not authenticated
 When I sign in with Google_oauth2 provider
 Then I should be on the home page
 And I should see "Successfully authenticated from Google account."
