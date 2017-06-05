require 'faker'

FactoryGirl.define do
	factory :token do |f|
		f.id 1
		f.user nil
		f.info "0 1 2 3 4 5 6 7 8 9 10"
		f.token_hash "fakefakefake"
	end
end
