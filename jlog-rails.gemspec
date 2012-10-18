# -*- encoding: utf-8 -*-
require File.expand_path("lib/jlog/version")

Gem::Specification.new do |s|
  s.name        = 'jlog-rails'
  s.version     = Jlog::VERSION
  s.date        = '2012-10-18'
  s.summary     = "Jlog for Rails"
  s.description = "A lightweight JavaScript logger (for Rails)"
  s.authors     = ["Alexey-высокогорный-чай-Golubev"]
  s.email       = 'oholubyev@heliostech.hk'
  s.files       = `git ls-files`.split("\n")
  s.test_files  = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.homepage    = 'http://rubygems.org/gems/jlog-rails'

  s.rubyforge_project = "jlog-rails"

  s.add_dependency "jquery-rails"
end
