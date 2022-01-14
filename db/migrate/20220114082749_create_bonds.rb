class CreateBonds < ActiveRecord::Migration[6.1]
  def change
    create_table :bonds do |t|
      t.string :name
      t.string :image_url
      t.references :user, null: false, foreign_key: true, index: true
      
      t.timestamps
    end
  end
end
