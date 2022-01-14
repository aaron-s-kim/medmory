class UsersController < ApplicationController

  def show
    user = User.find_by(id: params[:id])
    render json: user.to_json(except: [:created_at, :updated_at, :password_digest])
  end

  def sign_in
    user = User.find_by({email: user_params[:email].downcase})

    if user && user.authenticate(user_params[:password_digest])
      med_group = MedGroup.find_by({user_id: user.id})
      med_history_today = med_group.med_histories.where("created_at > '#{Date.today.to_s(:long)}'")
      med_history_week = med_group.med_histories.where("created_at > '#{(Date.today - 6.days).to_s(:long)}'")

      session[:user_id] = user.id
      render json: { 
        user: user.to_json(except: [:created_at, :updated_at, :password_digest]),
        medGroup: med_group.to_json(except: [:created_at, :updated_at], include: [:meds]),
        historyToday: med_history_today[0].to_json(except: [:updated_at]),
        historyWeek: med_history_week.to_json(except: [:updated_at]),
      }
    else
      render json: { error: "User credentials are invalid."}, status: 400
    end 
  end

  def sign_out
    session.delete(params[:user_id])
    render json: { message: "User has signed out." }
  end

  private

    def user_params
      params.require(:user).permit(:email, :password_digest)
    end

end
