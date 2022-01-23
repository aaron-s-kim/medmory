class BondInvitesChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'bond_invites_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
