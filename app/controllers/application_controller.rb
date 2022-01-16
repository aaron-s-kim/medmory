class ApplicationController < ActionController::API

  def filtered_user (user)
    {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      imageUrl: user.image_url,
      easyMode: user.easy_mode
    }
  end

  def filtered_users_array (user_array)
    user_array.map {|user| filtered_user(user) }
  end
  

end
