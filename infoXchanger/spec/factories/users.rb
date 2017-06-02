require 'faker'

FactoryGirl.define do
	factory :user do |f|
		f.id 1
		f.first_name "John"
		f.last_name "Doe"
		f.email "john.doe@fake.com"
		f.password "Prova1234"
	end

	factory :invalid_user, parent: :user do |f|
		f.first_name nil
	end
end
