class ResetBondInvites < ActiveRecord::Migration[6.1]
  def change
    create_table :bond_invites do |t|
      t.references :user, foreign_key: true, index: true
      t.references :bond, foreign_key: true, index: true

      t.timestamps
    end
  end
end
