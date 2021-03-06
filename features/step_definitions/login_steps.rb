When /^I log in$/ do
  if @user == nil
    login('fake@fake.com','fake')
  else
    @current_user = @user
    login(@user.email, 'useruser')
  end
end

When /^I log in as (.*)$/ do |email|
  @user = User.find_by(email: email)
  @current_user = @user
  login(@user.email, 'useruser')
end

When /^I register as (.+), (.+)$/ do |email, password|
  register(email, password)
end

Given /^I am signed in with (.*) provider$/ do |provider|
  visit "/users/auth/#{provider.downcase}"
end

When /^I sign in with (.*) provider$/ do |provider|
  visit "/users/auth/#{provider.downcase}"
end

Given /^I am a registered user$/ do
  @user = User.create!(:first_name => 'user', :last_name => 'user', :email => 'user@user.com', :password => 'useruser', :password_confirmation => 'useruser')
end

Given /^another user exists$/ do
  @user = User.create!(:first_name => 'fake', :last_name => 'fake', :email => 'fake@user.com', :password => 'useruser', :password_confirmation => 'useruser')
end

Given /^another user called (.*) exists$/ do |user|
  @user = User.create!(:first_name => user, :last_name => user, :email => user, :password => 'useruser', :password_confirmation => 'useruser')
end

When /^I press Delete button$/ do
  visit('/admin/users/0/delete')
end

When /^I press "Yes, I'm sure" button$/ do
  element = find_by_id('edit_user_0')
  Capybara::RackTest::Form.new(page.driver, element.native).submit
end

Given /^I am not a registered user$/ do
  @user = nil
end

Given /^I am a logged in user$/ do
  @user = User.create!(id: 100, :first_name => 'user', :last_name => 'user', :email => 'user@user.com', :password => 'useruser')
  @current_user = @user
  login(@user.email, @user.password)
end

Given /^I am a logged in admin user$/ do
  @user = User.create!(id: 100, :first_name => 'user', :last_name => 'user',admin: true, :email => 'user@user.com', :password => 'useruser')
  @current_user = @user
  login(@user.email, @user.password)
end

Given /^I was previously logged in as (.*)$/ do |user|
  @user = User.create!(id: 101, :first_name => user, :last_name => user, :email => user, :password => 'useruser')
  login(@user.email, @user.password)
  visit('/users/sign_out')
end

Given /^I am not authenticated$/ do
  visit '/users/sign_out'  # ensure that at least
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
    fill_in('First name', :with => email)
    fill_in('Last name', :with => email)
    fill_in('Password', :with => password)
    fill_in('Password confirmation', :with => password)
    click_button('Sign up')
  end
end

World(LoginSteps)
