Feature: Ask For Information
As a logged user
So that I can have a user's info
I want to send him a request for a specfic info

Scenario: Ask for an info
 Given I was previously logged in as "prova@prova.com"
 And I am a logged in user
 And I am on the home page
 When I fill in "query_" with "prova@prova.com"
 And I press "Search"
 Then I should be on the users_search page
 And I should see "prova@prova.com"
 When I follow "Show"
 And I press "Ask him personal information"
 Then I should be on the inforequests_select page
 And I should see "Select info to ask"
