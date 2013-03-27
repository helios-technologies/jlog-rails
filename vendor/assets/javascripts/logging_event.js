JLog.LoggingEvent = function(logger, timeStamp, level, messages, exception) {
  this.logger = logger;
  this.timeStamp = timeStamp;
  this.timeStampInMilliseconds = timeStamp.getTime();
  this.timeStampInSeconds = Math.floor(this.timeStampInMilliseconds / 1000);
  this.milliseconds = this.timeStamp.getMilliseconds();
  this.level = level;
  this.messages = messages;
  this.exception = exception;
};

JLog.LoggingEvent.prototype = {
  getThrowableStrRep: function() {
    return this.exception ? getExceptionStringRep(this.exception) : "";
  },
  getCombinedMessages: function() {
    return (this.messages.length == 1) ? this.messages[0] : this.messages.join(newLine);
  },
  toString: function() {
    return "LoggingEvent[" + this.level + "]";
  }
};
