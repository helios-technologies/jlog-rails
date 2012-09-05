module Jlog
  class InstallGenerator < Rails::Generators::Base

    desc "Install Jlog engine"

    def mount_engine
      puts "Mounting Jlog engine at /jlog in config/routes.rb"
      insert_into_file("config/routes.rb", :after => /routes\.draw\sdo\n/) do
        %Q{\n  mount Jlog::Engine, at: '/jlog'\n}
      end
    end

  end
end
