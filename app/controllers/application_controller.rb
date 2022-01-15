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

  def user_med_group_data (user)
    user.med_groups.map do |med_group|
      {
        name: med_group.name,
        detail: med_group.detail,
        complianceTime: med_group.compliance_time,
        historyToday: med_group.med_histories.where("created_at > '#{Date.today.to_s(:long)}'")[0],
        historyTen_days: med_group.med_histories.where("
        created_at > '#{(Date.today - 9.days).to_s(:long)}'
        AND created_at < '#{(Date.today + 1.days).to_s(:long)}'")
      }
    end
  end
end
