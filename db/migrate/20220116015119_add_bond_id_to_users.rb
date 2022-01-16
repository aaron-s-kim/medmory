class AddBondIdToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :bond_id, :integer
    add_foreign_key :users, :bonds
  end
end
