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
    this.calls[JLog.Level.DEBUG.name] = (window.console.debug || window.console.log).bind(window.console);
    this.calls[JLog.Level.WARN.name] = (window.console.warn || window.console.log).bind(window.console);
    this.calls[JLog.Level.ERROR.name] = (window.console.error || window.console.log).bind(window.console);
    this.calls[JLog.Level.FATAL.name] = (window.console.fatal ||
                                         window.console.error ||
                                         window.console.log).bind(window.console);
    this.append = function(loggingEvent) {
      var message = this.getLayout().format(loggingEvent);
      if(this.calls[loggingEvent.level.name])
        this.calls[loggingEvent.level.name](message);
      else
        window.console.log(message);
    }.bind(this);
  }

  this.toString = function() {
    return "JLog.ConsoleAppender(name=\"" + this.name + "\")";
  }.bind(this);
};

JLog.ConsoleAppender.prototype = new JLog.Appender();
