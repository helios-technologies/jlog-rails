module Jlog
  class InstallGenerator < Rails::Generators::Base

    desc "Install Jlog engine"

    def mount_engine
      puts "Mounting Jlog engine at /jlog in config/routes.rb"
      insert_into_file("config/routes.rb", :after => /routes\.draw\sdo\n/) do
        %Q{\n  mount Jlog::Engine, at: '/jlog'\n}
      end
    end

    def create_initializer
      puts "Create Jlog initializer config/initializers/jlog.rb"
      create_file("config/initializers/jlog.rb") do
        %Q{require 'jlog-rails'\n
JLog.configure("/jlog/append") do |config|
  config.logger = Logger.new(File.join(Rails.root, "log", "jlog_\#\{Rails.env\}.log"))
end
}
      end
    end

    def include_js_file
      append_to_file 'app/assets/javascripts/application.js' do
        %Q{\n//\n//= require jlog}
      end
    end

  end
end
