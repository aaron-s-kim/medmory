class RemoveAdminToBonds < ActiveRecord::Migration[6.1]
  def change
    remove_column :bonds, :user_id
  end
end
