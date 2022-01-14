class ImageUrlAndPasswordToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :image_url, :string
    remove_column :users, :password_digest
    add_column :users, :password, :string
  end
end
