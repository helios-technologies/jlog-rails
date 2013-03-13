module JLog
  module Formatter
    Default = proc do |params|
      "#{Time.now} #{params[:path]}: #{params[:message]}"
    end

    SplunkGenericSingleLine = proc do |params|
      ([Time.now.strftime("%Y-%m-%dT%H:%M:%S.%3N")] + params.map { |k,v| "#{k}=#{ERB::Util.url_encode(v)}" }).join " "
    end
  end
end
