Feature: Select Info to Share
As a logged user
So that I can choose which info share
I want to select a subset of my information

Scenario: Select a subset
 Given I am a logged in user
 And I am on the home page
 When I press "Xchange!"
 Then I should be on the users_select page
 And I should check the "first_name" checkbox