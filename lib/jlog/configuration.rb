module JLog
  class Configuration
    attr_accessor :logger, :formatter

    def initialize
      @logger = Rails.logger
      @formatter = Formatter::Default
    end
  end
end
