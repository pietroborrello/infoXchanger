FactoryGirl.define do
  factory :blocked_user do |f|
    f.blocker 1
    f.blocked 2
  end
end
