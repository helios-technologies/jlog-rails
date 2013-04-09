require 'bundler'

Bundler::GemHelper.install_tasks

task :docs do
  NATURAL_DOCS_EXEC = '/home/dima/downloads/NaturalDocs/NaturalDocs'
  JS_HOME = "vendor/assets/javascripts/"
  DOC_HOME= "docs/"

  puts "Generating docs"
  exec "#{NATURAL_DOCS_EXEC} -i #{JS_HOME} -o HTML #{DOC_HOME} -p #{JS_HOME}"
end
