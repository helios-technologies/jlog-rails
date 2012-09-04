class LoggerController < ApplicationController

  def log
    message = params[:message]
    level_pattern = /([A-Z]*) - /
    level = message.match(level_pattern)[1]
    message = 'Client Log: ' << message

    if ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'].include? level
      Rails.logger.send(level.downcase.to_sym, message)
    else
      Rails.logger.warn('*** Attempt to log with a nonexistent level ***')
      Rails.logger.warn(message)
    end

    render json: {}, status: :ok
  end
end