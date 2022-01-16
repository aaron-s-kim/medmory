class AddBondIdexOnUsers < ActiveRecord::Migration[6.1]
  def change
    add_index :users, :bond_id
  end
end
