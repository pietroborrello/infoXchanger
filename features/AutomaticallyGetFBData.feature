Feature: automatically get FB data
As a registered FB user
So that i can populate my profile easier
I want to have my fb data imported automatically at registration

@omniauth_test
Scenario: User Logs in with FB
 Given I am on the home page
 And I am signed in with Facebook provider
 Then I should be on the home page
 And I should see "Successfully authenticated from Facebook account."
 When I follow "My Profile"
 Then I should be on the users_myprofile page
 And I should see "First Name: John"
 And I should see "Last Name: Smith"
 And I should see "Email: john@smith.com"
