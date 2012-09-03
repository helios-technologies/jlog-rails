# -*- encoding: utf-8 -*-
require File.expand_path("lib/jlog-rails/version")

Gem::Specification.new do |s|
  s.name        = 'jlog-rails'
  s.version     = JLog::VERSION
  s.date        = '2012-08-31'
  s.summary     = "JLog for Rails"
  s.description = "A lightweight JavaScript logger (for Rails)"
  s.authors     = ["Alexey Golubev"]
  s.email       = 'oholubyev@heliostech.hk'
  s.files       = `git ls-files`.split("\n")
  s.test_files  = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.homepage    = 'http://rubygems.org/gems/jlog-rails'

  s.rubyforge_project = "jlog-rails"

  s.add_dependency "jquery-rails"
end