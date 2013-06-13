jlog-rails
==========

JLog - Rails integration with server side logger for JLog.js

See docs: http://dimalev.github.com/jlog-rails/

Usage:
------

In the Gemfile:

    gem 'jlog-rails'

then:

    rails g jlog:install

On the client-side:

    var logger = JLog.getLogger("package.class");
    logger.addAppender(new JLog.AjaxAppender('/jlog/append'));
    logger.warn('warning to be recorded in the server-side log');

Dependencies:

    Underscore.js
    jQuery

Changelog:
----------
* 0.2.3
  * Using console error/warn facility to make console appender more verbose
  * Moving all the sources into separate file; adding Makefile to create one output file
* 0.2.2
  * Removed jquery-rails dependency
  * Fixed an issue with multi-line logging
* 0.2.1 Bugfix
  * Added helpers to format Error backtraces
  * Removed the just_underscore dependancy from gemspecs
* 0.2.0 Switching to use log4javascript code base
  * Added LoggingEvent class to encapsulate log event.
  * Added Appender and Layout base classes to format and output log events.
  * Pattern layout with custom fields.
  * Logger error handler to handle errors inside logger.
* 0.1.3
  * Set jQuery $.ajax 'global' setting to false to prevent the global handlers
  like ajaxStart or ajaxStop from being triggered.
* 0.1.1
  * Cleaned JLog.JS code
* 0.1.0
  * JLog rails engine can now be mounted several times
  * Added ability to configure the ruby logger(s) and the output format(s)
  * Fixed JSHint warnings
* 0.0.3
  * Adding bulk flush in the ajax appender
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
