class ApplicationController < ActionController::API

  def filtered_user (user)
    {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      imageUrl: user.image_url,
      easyMode: user.easy_mode,
      bond_id: user.bond_id
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
