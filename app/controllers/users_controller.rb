class UsersController < ApplicationController

  def show
    user = User.find_by(id: params[:id])
    user_data(user)
  end

  def update
    user = User.find_by(id: params[:id])
    if user && user.update(bond_id: user_params[:bond_id])
      user_data(user)
    else
      render json: { error: 'No user found' }, status: 400
    end
  end
  

  def get_auth_user_data
    if session[:user_id]
      user = User.find_by(id: session[:user_id])
      user_data(user)
    else
      render json: { error: 'No user found' }, status: 400
    end
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
    session[:user_id] = nil
    render json: { message: "User has signed out." }
  end

  private

    def user_params
      params.require(:user).permit(:email, :password_digest, :bond_id)
    end

    def user_data (user)
      render json: { 
          user: filtered_user(user),
          userMedGroupArr: user_med_group_data(user),
          bond: user_bond_data(user),
          pendingInvite: user_pending_bond_invites(user)
        }
    end
  
    def user_med_group_data (user)
      user.med_groups.map do |med_group|
        {
          id: med_group.id, # <== blame aaron: added this line
          name: med_group.name,
          detail: med_group.detail,
          complianceTime: med_group.compliance_time,
          isCompliedToday: med_group.med_histories.where("created_at > '#{Date.today.to_s(:long)}'")[0] ? true: false
        }
      end
    end

    def user_bond_data (user)
      bond = Bond.find_by(id: user.bond_id)
      if bond
        bond_users = User.where(bond_id: bond.id)
        {
          id: bond.id,
          name: bond.name, 
          imageUrl: bond.image_url,
          bondUsers: filtered_users_array(bond_users)
        }
      else
        bond
      end
    end

    def user_pending_bond_invites (user)
      bond_invite_array = BondInvite.where(user_id: user.id)
      return nil if bond_invite_array.length() == 0 

      bond_invite = bond_invite_array[0]
      bond = Bond.find_by(id: bond_invite.bond_id)
      {
        id: bond_invite.id,
        bondId: bond.id,
        bondName: bond.name
      }
    end

end
