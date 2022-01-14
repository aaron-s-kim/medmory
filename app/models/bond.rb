class Bond < ApplicationRecord
  has_many :bond_joins, dependent: :destroy
end
