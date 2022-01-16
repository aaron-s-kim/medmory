class User < ApplicationRecord
  has_many :med_groups, dependent: :destroy
  has_many :bond_invites, dependent: :destroy 

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, 
    presence: true, 
    uniqueness: { case_sensitive: false },
    format: { with: VALID_EMAIL_REGEX },
    length: { maximum: 105 }
    
  has_secure_password
end
