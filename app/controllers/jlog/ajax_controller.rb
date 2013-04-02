module Jlog

  class AjaxController < ActionController::Metal
    include ActionController::Rendering

    Levels = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL']

    def append
      messages = Array(params[:message])
      messages.each do |message|
        path = request.original_fullpath
        message = message[1]
        output = JLog.formatter(path).call(:path => path, :message => message[:message])

        if Levels.include? message[:level]
          level = $1
          JLog.logger(path).send(message[:level].downcase.to_sym, output)
        else
          JLog.logger.warn('*** Attempt to log with a nonexistent level ***')
          JLog.logger.warn(output)
        end
      end

      render text: 'ok', status: :ok
    end

  end

end
