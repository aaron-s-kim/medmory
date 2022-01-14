class AddDosageToMeds < ActiveRecord::Migration[6.1]
  def change
    remove_column :meds, :dosag
    add_column :meds, :dosage, :string
  end
end
