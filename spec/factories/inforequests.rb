require 'faker'

FactoryGirl.define do
  factory :inforequest do |f|
    f.id 100
    f.asker nil
    f.asked nil
    f.info "0 1 2 3 4 5"
  end
end
