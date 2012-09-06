jlog-rails
==========

JLog - Rails integration with server side logger for JLog.js

Usage:
------

In the Gemfile:

    gem 'jlog-rails'

then:

    rails g jlog:install

On the client-side:

    var logger = new JLog();
    logger.addAppender(new JLog.AjaxAppender('/jlog/append'));
    logger.warn('warning to be recorded in the server-side log');

Changelog:
----------

* 0.0.2
  * Changed format of output message
  * InstallGenerator now updates application.js
* 0.0.1
  * Added InstallGenerator
  * Renamed JLog to Jlog
  * Moved to AjaxController ActionController::Metal
  * Added support for server-side logging of client events with Rails.logger
  * Added AjaxAppender
  * Initial port of jlog.js