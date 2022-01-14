class CreateMeds < ActiveRecord::Migration[6.1]
  def change
    create_table :meds do |t|
      t.string :name
      t.string :dosag
      t.references :med_group, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
