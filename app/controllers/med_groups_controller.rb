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
    med_history_today = med_group.med_histories.where("created_at > '#{Date.today.to_s(:long)}'")
    med_history_ten_days = med_group.med_histories.where("
        created_at > '#{(Date.today - 9.days).to_s(:long)}'
        AND created_at < '#{(Date.today + 1.days).to_s(:long)}'
      ")

    render json: {
      medGroup: med_group.to_json(except: [:created_at, :updated_at], include: [:meds]),
      historyToday: med_history_today[0].to_json(except: [:updated_at]),
      historyTenDays: med_history_ten_days.to_json(except: [:updated_at]),
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
  

  def get_user_med_groups
    user_med_groups = MedGroup.where(user_id: params[:user_id])

    render json: user_med_groups
  end
  
  private

  def med_group_params
    params.require(:med_group).permit(:name, :note, :message_to, :user_id)
  end
  
end
