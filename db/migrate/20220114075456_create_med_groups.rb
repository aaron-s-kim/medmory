class CreateMedGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :med_groups do |t|
      t.string :name
      t.text :detail
      t.integer :compliance_time
      t.integer :message_to
      t.references :user, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
