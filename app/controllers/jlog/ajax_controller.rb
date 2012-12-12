module Jlog

  class AjaxController < ActionController::Metal
    include ActionController::Rendering

    def append
      messages = params[:message]
      messages = [messages] unless messages.is_a? Array
      messages.each do |message|
        level_pattern = /^(DEBUG|INFO|WARN|ERROR|FATAL)/
        level = message.match(level_pattern)[1]
        message = "#{Time.now} Client " << message

        if ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'].include? level
          Rails.logger.send(level.downcase.to_sym, message)
        else
          Rails.logger.warn('*** Attempt to log with a nonexistent level ***')
          Rails.logger.warn(message)
        end
      end

      render text: 'ok', status: :ok
    end

  end

end
