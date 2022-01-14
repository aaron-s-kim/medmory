class FullNameToUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :username
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
  end
end
