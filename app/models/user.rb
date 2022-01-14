class User < ApplicationRecord
  has_many :med_groups
  has_one :bond_join

  has_secure_password
end
