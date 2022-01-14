class CreateBondJoins < ActiveRecord::Migration[6.1]
  def change
    create_table :bond_joins do |t|
      t.references :user, null: false, foreign_key: true, index: true
      t.references :bond, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
