class User < ApplicationRecord
  has_many :med_groups
  has_one :bond_join
end
