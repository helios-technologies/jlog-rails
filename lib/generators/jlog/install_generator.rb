module JLog
  class InstallGenerator < Rails::Generators::Base

    desc "Install JLog engine"

    def mount_engine
      puts "Mounting JLog engine at /jlog in config/routes.rb"
      insert_into_file("config/routes.rb", :after => /routes\.draw\sdo\n/) do
        %Q{\nmount JLog::Engine, at: '/jlog'\n}
      end
    end

  end
end
