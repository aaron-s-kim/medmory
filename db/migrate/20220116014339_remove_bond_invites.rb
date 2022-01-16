class RemoveBondInvites < ActiveRecord::Migration[6.1]
  def change
    drop_table :bond_invites
  end
end
