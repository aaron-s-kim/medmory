class BondJoinsController < ApplicationController
  def create
    bond_join = BondJoin.new(bond_join_params)

    if bond_join.save
      render json: bond_join
    else
      render json: { error: "Bond join cannot be created."}
    end 
  end
  
  def destroy
    bond_join = BondJoin.find_by(id: params[:id])

    if bond_join.destroy
      render json: { message: "Bond join has been deleted"}
    else
      render json: { error: bond_join.errors.full_messages }, status: 422
    end
  end
  

  private

  def bond_join_params
    params.require(:bond_join).permit(:user_id, :bond_id)
  end
  
end
