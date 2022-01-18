# Load the Rails application.
require_relative "application"

Rails.application.configure do
  config.time_zone = "Pacific Time (US & Canada)"
  config.active_record.default_timezone = :local
end

# Initialize the Rails application.
Rails.application.initialize!

require "dotenv"
Dotenv.load
