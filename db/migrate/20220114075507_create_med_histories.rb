class CreateMedHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :med_histories do |t|
      t.references :med_group, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
