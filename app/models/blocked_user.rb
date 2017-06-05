class BlockedUser < ApplicationRecord
	belongs_to :blocker, class_name: 'User'
	belongs_to :blocked, class_name: 'User'
	validates_uniqueness_of :blocker, scope: [:blocked]
end
