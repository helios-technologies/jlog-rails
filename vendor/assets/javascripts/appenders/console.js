JLog.ConsoleAppender = function(loggingEvent) {
  this.name = 'ConsoleAppender';

  if (window.console && window.console.log)
    this.append = function(loggingEvent) {
      window.console.log(this.getLayout().format(loggingEvent));
    };
};

JLog.ConsoleAppender.prototype = new JLog.Appender();
