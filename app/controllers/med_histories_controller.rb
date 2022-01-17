require "twilio-ruby"


class MedHistoriesController < ApplicationController

  def create
    med_history = MedHistory.new(med_history_params)
    if med_history.save
      client = Twilio::REST::Client.new(ENV["TWILIO_ACCOUNT_SID"], ENV["TWILIO_AUTH_TOKEN"])

      client.messages.create(
        from: ENV["TWILIO_NUMBER"],
        to: ENV["MY_NUMBER"],
        body: "MEEP MORP1"
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
