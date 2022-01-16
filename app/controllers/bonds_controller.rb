class BondsController < ApplicationController

  def show
    bond = Bond.find_by(id: params[:id])
    bond_users = User.where(bond_id: params[:id])

    render json: {
      bond: bond,
      usersInBond: filtered_users_array(bond_users)
    }
  end
 
  def create
    bond = Bond.new(bond_params)

    if bond.save
      render json: bond
    else
      render json: { error: "Bond cannot be created."}
    end
  end

  def update
    bond = Bond.find_by(id: params[:id])

    if bond.update(bond_params)
      render json: bond
    else
      render json: { error: bond.errors.full_messages }, status: 422
    end
  end

  def destroy
    bond = Bond.find_by(id: params[:id])

    if bond.destroy
      render json: { message: "Bond has been deleted"}
    else
      render json: { error: bond.errors.full_messages }, status: 422
    end
  end

  private

  def bond_params
    params.require(:bond).permit(:user_id, :name)
  end


end
