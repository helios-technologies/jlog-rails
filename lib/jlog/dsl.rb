module JLog
  module DSL
    def configure(path = nil, &block)
      @configurations ||= {}
      config = Configuration.new
      @configurations[path] = config
      block.call(config) if block
    end

    def get_config(path)
      return nil unless @configurations or @configurations[path]
      return @configurations[path]
    end

    def logger(path)
      config = get_config(path)
      return config.logger if config
      Rails.logger
    end

    def formatter(path)
      config = get_config(path)
      return config.formatter if config
      Formatter::Default
    end
  end
end
