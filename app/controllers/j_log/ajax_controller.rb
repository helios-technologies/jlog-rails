module JLog

  class AjaxController < ActionController::Metal
    include ActionController::Rendering

    def append
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

      render text: 'ok', status: :ok
    end

  end

end