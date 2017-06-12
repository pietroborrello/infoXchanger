
Given /^I have a token of (.*)$/ do |username|
  @user = User.create!(id:10, :first_name => username, :last_name => username, :email => username, :password => 'useruser', :password_confirmation => 'useruser')
  @token = Token.create!(id:10, :user => @user,info: '0 1 2 3 4 5 6 7 8 9', :token_hash => 'fakefakefake', password: '')
end

Given /^I have a password protected token of (.*) with password (.*)$/ do |username, password|
  @user = User.create!(id:10, :first_name => username, :last_name => username, :email => username, :password => 'useruser', :password_confirmation => 'useruser')
  @token = Token.create!(id:10, :user => @user,info: '0 1 2 3 4 5 6 7 8 9', :token_hash => 'fakefakefake', password: BCrypt::Password.create(password).to_s)
end

Given /^I have an info request from (.*)$/ do |username|
  @user = User.find_by(email: username)
  @inforequest = Inforequest.create!(:asker => @user, :asked => @current_user, info: '0 1 2 3 4 5 6 7 8 9')
end

Given /^I had previously scanned (.*)$/ do |username|
  @user = User.create!(id:10, :first_name => username, :last_name => username, :email => username, :password => 'useruser', :password_confirmation => 'useruser')
  @token = Token.create!(id:10, :user => @user,info: '0 1 2 3 4 5 6 7 8 9', :token_hash => 'fakefakefake', password: '')
  ScannedToken.create!(scanner: User.find(100), scanned: @user, token: @token)
end

Given /^I have been previously scanned by (.*)$/ do |username|
  @user = User.create!(id:10, :first_name => username, :last_name => username, :email => username, :password => 'useruser', :password_confirmation => 'useruser')
  @token = Token.create!(id:10, :user => @user,info: '0 1 2 3 4 5 6 7 8 9', :token_hash => 'fakefakefake', password: '')
  ScannedToken.create!(scanner: @user, scanned: User.find(100), token: @token)
end

When /^I visit the token link$/ do
  visit "/?t=fakefakefake"
end

When /^I visit a wrong token link$/ do
  visit "/?t=wrongwrongwrong"
end
