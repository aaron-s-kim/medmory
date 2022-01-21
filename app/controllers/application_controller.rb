class ApplicationController < ActionController::API
  def is_user_bond_invited? (user)
    bond_invite_array = BondInvite.where(user_id: user.id)
    bond_invite_array.length() > 0 ? true : false
  end

  def filtered_user (user)
    {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      imageUrl: user.image_url,
      easyMode: user.easy_mode,
      bondId: user.bond_id,
      pendingInvite: is_user_bond_invited?(user)
    }
  end

  def filtered_users_array (user_array)
    user_array.map {|user| filtered_user(user) }
  end

  def med_group_medications (med_group)
    med_group.meds.map do |med|
      {
        id: med.id,
        name: med.name,
        dosage: med.dosage,
        measure: med.measure,
        numOfPill: med.num,
        pillType: med.pill_type
      }
    end
    
  end

end
