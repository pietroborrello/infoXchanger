class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook, :google_oauth2]

  validates :first_name, presence: true
  validates :last_name, presence: true
  has_many :tokens, dependent: :destroy
  has_many :scanned_tokens, foreign_key: "scanner_id", dependent: :destroy
  has_many :whoscannedme_tokens, foreign_key: "scanned_id", class_name: "ScannedToken", dependent: :destroy

   def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      name = auth.info.name
      user.first_name, user.last_name = name.split(' ', 2)
      user.image_url = auth.info.image
    end
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end

end