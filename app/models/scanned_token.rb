class ScannedToken < ApplicationRecord
  belongs_to :scanner, class_name: 'User'
  belongs_to :scanned, class_name: 'User'
  belongs_to :token
  validates_uniqueness_of :scanner, scope: [:token, :scanned]
end
