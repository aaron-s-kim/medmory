class Bond < ApplicationRecord
  has_many :bond_invites, dependent: :destroy
end
