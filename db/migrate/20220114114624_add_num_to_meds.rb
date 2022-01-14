class AddNumToMeds < ActiveRecord::Migration[6.1]
  def change
    add_column :meds, :num, :integer
    add_column :meds, :pill_type, :string
    remove_column :meds, :dosage
    add_column :meds, :dosage, :integer
  end
end
