class UsersController < ApplicationController

  def show
    user = User.find_by(id: params[:id])
    user_data(user)
  end

  def sign_in
    user = User.find_by({email: user_params[:email].downcase})

    if user && user.authenticate(user_params[:password_digest])
      session[:user_id] = user.id

      user_data(user)
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

    def user_data (user)
      render json: { 
          user: filtered_user(user),
          userMedGroupArr: user_med_group_data(user)
        }
    end
end
