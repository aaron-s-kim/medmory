class AddMeasureToMeds < ActiveRecord::Migration[6.1]
  def change
    add_column :meds, :measure, :string
  end
end
