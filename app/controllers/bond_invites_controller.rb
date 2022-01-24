class BondInvitesController < ApplicationController
  def create
    bond_invite = BondInvite.new(bond_invite_params)
    existing_user_pending_invite = BondInvite.where(user_id: bond_invite_params[:user_id]).destroy_all

    if bond_invite.save
      ActionCable.server.broadcast 'bond_invites_channel', { bondInviteCreated: bond_invite }
      render json: bond_invite
    else
      render json: { error: "Bond invite cannot be created."}
    end 
  end
  
  def destroy
    bond_invite = BondInvite.find_by(id: params[:id])

    if bond_invite.destroy
      ActionCable.server.broadcast 'bond_invites_channel', { bondInviteDeleted: bond_invite }
      render json: { message: "Bond invite has been deleted"}
    else
      render json: { error: bond_invite.errors.full_messages }, status: 422
    end
  end
  

  private

  def bond_invite_params
    params.require(:bond_invite).permit(:user_id, :bond_id)
  end

end
