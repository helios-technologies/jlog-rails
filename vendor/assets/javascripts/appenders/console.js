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
  if (window.console && window.console.log)
    this.append = function(loggingEvent) {
      window.console.log(this.getLayout().format(loggingEvent));
    };
};

JLog.ConsoleAppender.prototype = new JLog.Appender();
