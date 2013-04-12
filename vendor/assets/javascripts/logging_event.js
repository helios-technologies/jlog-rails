/*
  Class: LoggingEvent

  Contains all the data about single log event.
*/

/*
  Constructor: LoggingEvent

  Initializes event.

  Parameters:
    logger - <Logger> which was the event source
    timeStamp - Date of event occurrence
    level - <Level> of the log event
    messages - Array of messages in event
    exception - Exception of the message
*/
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

/*
  Property: logger

  <Logger> which was the event source
*/

/*
  Property: timeStamp

  Date of event occurrence
*/

/*
  Property: level

  <Level> of the log event
*/

/*
  Property: messages

  Array of messages in event
*/

/*
  Property: exception

  Exception of the message
*/

JLog.LoggingEvent.prototype = {
  /*
    Method: getThrowableStrRep

    Returns exception of the message as a String.
  */
  getThrowableStrRep: function() {
    return this.exception ? JLog.getExceptionStringRep(this.exception) : "";
  },

  /*
    Method: getCombinedMessages

    Returns messages of the event joined with new line symbol.
  */
  getCombinedMessages: function() {
    return (this.messages.length == 1) ? this.messages[0] : this.messages.join(newLine);
  },
  toString: function() {
    return "LoggingEvent[" + this.level + "]";
  }
};
