# -*- RUBY -*-
require File.expand_path("lib/jlog/version")
require 'date'

Gem::Specification.new do |s|
  s.name        = 'jlog-rails'
  s.version     = Jlog::VERSION
  s.date        = Date.today.to_s
  s.summary     = "Jlog for Rails"
  s.description = "A lightweight JavaScript logger (for Rails)"
  s.authors     = ["Helios Technologies"]
  s.email       = 'contact@heliostech.fr'
  s.files       = `git ls-files`.split("\n")
  s.test_files  = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.homepage    = 'http://rubygems.org/gems/jlog-rails'

  s.rubyforge_project = "jlog-rails"

  s.add_dependency "jquery-rails"
end
