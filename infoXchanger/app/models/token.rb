class Token < ApplicationRecord
  belongs_to :user
  has_many :scanned_tokens, dependent: :destroy
end
