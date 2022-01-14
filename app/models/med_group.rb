class MedGroup < ApplicationRecord
  belongs_to :user
  has_many :meds, dependent: :destroy
  has_many :med_histories, dependent: :destroy
end
