class DropBondJoins < ActiveRecord::Migration[6.1]
  def change
    drop_table :bond_joins
  end
end
