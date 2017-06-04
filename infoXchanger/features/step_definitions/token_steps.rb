
Given /^I have a token of (.*)$/ do |username|
  @user = User.create!(id:10, :first_name => username, :last_name => username, :email => username, :password => 'useruser', :password_confirmation => 'useruser')
  @token = Token.create!(id:10, :user => @user,info: '0 1 2 3 4 5 6 7 8 9', :token_hash => 'fakefakefake')
end

Given /^I had previously scanned (.*)$/ do |username|
  @user = User.create!(id:10, :first_name => username, :last_name => username, :email => username, :password => 'useruser', :password_confirmation => 'useruser')
  @token = Token.create!(id:10, :user => @user,info: '0 1 2 3 4 5 6 7 8 9', :token_hash => 'fakefakefake')
  ScannedToken.create!(scanner: User.find(1), scanned: @user, token: @token)
end

Given /^I had previously created a token$/ do 
  @user = User.create!(id:10, :first_name => 'Mario', :last_name => 'Rossi', :email => 'mariorossi@fake.it', :password => 'useruser', :password_confirmation => 'useruser')
  @token = Token.create!(id:10, :user => @user,info: '0 1 2 3 4 5 6 7 8 9', :token_hash => 'fakefakefake')
end

When /^I visit the token link$/ do
  visit "/?t=fakefakefake"
end
