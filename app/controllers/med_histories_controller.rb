class MedHistoriesController < ApplicationController

  def create
    med_history = MedHistory.new(med_hisotry_params)
    if med_history.save
      render json: med_history
    else
      render json: { error: med_history.errors.full_messages }, status: 422
    end
  end

  private

  def med_hisotry_params
    params.require(:med_history).permit(:med_group_id)
  end
  
end
