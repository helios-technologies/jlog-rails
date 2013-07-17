/*
  Class: ConsoleAppender

  Simple console appender.
*/
JLog.ConsoleAppender = function() {
  this.name = 'ConsoleAppender';

  /*
    Method: append

    Attempts to append message into console.
  */
  if (window.console && window.console.log) {
    this.calls = {};
    this.calls[JLog.Level.DEBUG.name] = _.bind(window.console.debug || window.console.log, window.console);
    this.calls[JLog.Level.WARN.name] = _.bind(window.console.warn || window.console.log, window.console);
    this.calls[JLog.Level.ERROR.name] = _.bind(window.console.error || window.console.log, window.console);
    this.calls[JLog.Level.FATAL.name] = _.bind(window.console.fatal ||
                                         window.console.error ||
                                         window.console.log, window.console);
    this.append = _.bind(function(loggingEvent) {
      var message = this.getLayout().format(loggingEvent);
      if (this.calls[loggingEvent.level.name])
        this.calls[loggingEvent.level.name](message);
      else
        window.console.log(message);
    }, this);
  }

  this.toString = _.bind(function() {
    return "JLog.ConsoleAppender(name=\"" + this.name + "\")";
  }, this);
};

JLog.ConsoleAppender.prototype = new JLog.Appender();
