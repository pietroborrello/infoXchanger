Feature: automatically get GL data
As a registered GL user
So that i can populate my profile easier
I want to have my gl data imported automatically at registration

@omniauth_test
Scenario: User Logs in with GL
 Given I am on the home page
 And I am signed in with Google_oauth2 provider
 Then I should be on the home page
 And I should see "Successfully authenticated from Google account."
 When I follow "my Profile"
 Then I should be on the users_myprofile page
 And I should see "First Name: John"
 And I should see "Last Name: Smith"
 And I should see "Email: john@smith.com"
