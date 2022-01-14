class BondsController < ApplicationController

  def show
    bond = Bond.find_by(id: params[:id])
    render json: bond.to_json(except: [:created_at, :updated_at], include: [:bond_joins])
  end
  
end
