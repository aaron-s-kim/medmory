require "twilio-ruby"


class MedHistoriesController < ApplicationController

  def create
    puts "JEFF NUMNNN"
    puts ENV['JEFF_NUMBER']
    med_history = MedHistory.new(med_history_params)
    to_user_id = MedGroup.find_by(id: med_history_params[:med_group_id]).message_to
    to_number = User.find_by(id: to_user_id).phone_number
    from_user_id = MedGroup.find_by(id: med_history_params[:med_group_id]).user_id
    from_user_first_name = User.find_by(id: from_user_id).first_name
    from_user_last_name = User.find_by(id: from_user_id).last_name
    from_user_full_name = "#{from_user_first_name} #{from_user_last_name}"
    med_group_name = MedGroup.find_by(id: med_history_params[:med_group_id]).name

    if med_history.save
      client = Twilio::REST::Client.new(ENV["TWILIO_ACCOUNT_SID"], ENV["TWILIO_AUTH_TOKEN"])

      client.messages.create(
        from: ENV["TWILIO_NUMBER"],
        to: to_number,
        body: "#{from_user_full_name} has taken med-group #{med_group_name}"
      )

      render json: med_history
    else
      render json: { error: med_history.errors.full_messages }, status: 422
    end
  end

  private

  def med_history_params
    params.require(:med_history).permit(:med_group_id)
  end
  
end
