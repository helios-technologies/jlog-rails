module Jlog

  class AjaxController < ActionController::Metal
    include ActionController::Rendering

    Levels = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL']
    LevelsPattern = Regexp.new("^(#{Levels.join("|")})", Regexp::IGNORECASE)

    def append
      messages = Array(params[:message])
      messages.each do |message|
        path = request.original_fullpath
        output = JLog.formatter(path).call(:path => path, :message => message)

        if message =~ LevelsPattern
          level = $1
          JLog.logger(path).send(level.downcase.to_sym, output)
        else
          JLog.logger.warn('*** Attempt to log with a nonexistent level ***')
          JLog.logger.warn(output)
        end
      end

      render text: 'ok', status: :ok
    end

  end

end
