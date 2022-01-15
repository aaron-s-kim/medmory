class MedGroupsController < ApplicationController

  def create
    med_group = MedGroup.new(med_group_params)

    if med_group.save
      render json: med_group
    else
      render json: { error: med_group.errors.full_messages }, status: 422
    end
  end
  
  def show
    med_group = MedGroup.find_by(id: params[:id])
    med_history_today = med_group.med_histories.where("created_at > '#{Date.today.to_s(:long)}'")[0]
    med_history_ten_days = med_group.med_histories.where("
        created_at > '#{(Date.today - 9.days).to_s(:long)}'
        AND created_at < '#{(Date.today + 1.days).to_s(:long)}'
      ")

    render json: {
      medGroup: med_group,
      meds: med_group_medications(med_group),
      isCompliedToday: med_history_today ? true : false,
      historyTenDays: med_history_ten_days
    }
  end

  def update
    med_group = MedGroup.find_by(id: params[:id])

    if med_group.update(med_group_params)
      render json: med_group
    else
      render json: { error: med_group.errors.full_messages }, status: 422
    end
  end
  
  def destroy
    med_group = MedGroup.find_by(id: params[:id])

    if med_group.destroy
      render json: { message: "The medication group has been deleted"}
    else
      render json: { error: med_group.errors.full_messages }, status: 422
    end
  end
  
  private

  def med_group_params
    params.require(:med_group).permit(:name, :detail, :message_to, :user_id, :compliance_time)
  end

  def med_group_medications (med_group)
    med_group.meds.map do |med|
      {
        name: med.name,
        dosage: med.dosage,
        measure: med.measure,
        numOfPill: med.num,
        pillType: med.pill_type
      }
    end
    
  end
  
end
