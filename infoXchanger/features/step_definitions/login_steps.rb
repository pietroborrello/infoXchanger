When /^I log in$/ do
  if @user == nil
    login('fake@fake.com','fake')
  else
    login(@user.email, @user.password)
  end
end

When /^I register as (.+), (.+)$/ do |email, password|
  register(email, password)
end

Given /^I am a registered user$/ do
  @user = User.create!(:first_name => 'user', :last_name => 'user', :email => 'user@user.com', :password => 'useruser', :password_confirmation => 'useruser')
end


Given /^I am not a registered user$/ do
  @user = nil
end

Given /^I am a logged in user$/ do
  @user = User.create!(:first_name => 'user', :last_name => 'user', :email => 'user@user.com', :password => 'useruser')
  login(@user.email, @user.password)
end

Given /^I am not authenticated$/ do
  visit('/users/sign_out') # ensure that at least
end

module LoginSteps
  def login(email, password)
    visit('/users/sign_in')
    fill_in('Email', :with => email)
    fill_in('Password', :with => password)
    click_button('Log in')
  end
  def register(email, password)
    visit('/users/sign_up')
    fill_in('Email', :with => email)
    fill_in('Password', :with => password)
    fill_in('Password confirmation', :with => password)
    click_button('Sign up')
  end
end

World(LoginSteps)
