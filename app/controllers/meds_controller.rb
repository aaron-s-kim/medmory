class MedsController < ApplicationController

  def create
    med = Med.new(med_params)

    if med.save
      render json: med
    else
      render json: { error: med.errors.full_messages }, status: 422
    end
  end
  
  def destroy
    med = Med.find(params[:id])

   if med.destroy
    render json: { message: "Medication has been deleted"}
   else
    render json: { error: med.errors.full_messages }, status: 422
   end
  end
  
  private 

  def med_params
    params.require(:med).permit(:name, :dosage, :med_group_id)
  end

end
