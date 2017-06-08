class Inforequest < ApplicationRecord
  belongs_to :asker, class_name: 'User'
  belongs_to :asked, class_name: 'User'
end
