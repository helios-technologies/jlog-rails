JLog.Layout = function() {};
/*
  Class: Layout

  Handles message formatting.
*/
JLog.Layout.prototype = {
  defaults: {
    loggerKey: "logger",
    timeStampKey: "timestamp",
    millisecondsKey: "milliseconds",
    levelKey: "level",
    messageKey: "message",
    exceptionKey: "exception",
    urlKey: "url"
  },
  loggerKey: "logger",
  timeStampKey: "timestamp",
  millisecondsKey: "milliseconds",
  levelKey: "level",
  messageKey: "message",
  exceptionKey: "exception",
  urlKey: "url",
  /*
    Property: beachhead

    Header of batch output.

    See Also:
      <allowBatching>, <batchFooter>, <batchSeparator>
  */
  batchHeader: "",
  /*
    Property: batchFooter

    Footer of batch output.

    See Also:
      <allowBatching>, <batchHeader>, <batchSeparator>
  */
  batchFooter: "",
  /*
    Property: batchSeparator

    Separator of batch output.

    See Also:
      <allowBatching>, <batchHeader>, <batchFooter>
  */
  batchSeparator: "",
  /*
    Property: useTimeStampsInMilliseconds

    If timestamp should be outputted in milliseconds.
  */
  useTimeStampsInMilliseconds: null,

  /*
    Method: format

    Formats log message into a string.

    Parameters:
      logMessage - Log Message to format.

    Returns:
      Message formatted as string.
  */
  format: function(logMessage) {
    JLog.handleError("Layout.format: layout supplied has no format() method");
  },

  /*
    Method: getContentType

    Used to set content type for network sending.

    Returns:
      Content-Type header value.
  */
  getContentType: function() {
    return "text/plain";
  },

  /*
    Method: allowBatching

    If formatted messages can be send in a batch. If true, messages will be send in format:
    batchHeader+MESSAGES.join(batchSeparator)+batchFooter

    Returns:
      Boolean

    See Also:
      <batchHeader>, <batchFooter>, <batchSeparator>
  */
  allowBatching: function() {
    return true;
  },

  getTimeStampValue: function(loggingEvent) {
    return this.useTimeStampsInMilliseconds() ?
      loggingEvent.timeStampInMilliseconds : loggingEvent.timeStampInSeconds;
  },

  getDataValues: function(loggingEvent, combineMessages) {
    var dataValues = [
      [this.loggerKey, loggingEvent.logger.name],
      [this.timeStampKey, this.getTimeStampValue(loggingEvent)],
      [this.levelKey, loggingEvent.level.name],
      [this.urlKey, window.location.href],
      [this.messageKey, combineMessages ? loggingEvent.getCombinedMessages() : loggingEvent.messages]
    ];
    if(!this.useTimeStampsInMilliseconds()) {
      dataValues.push([this.millisecondsKey, loggingEvent.milliseconds]);
    }
    if(loggingEvent.exception) {
      dataValues.push([this.exceptionKey, getExceptionStringRep(loggingEvent.exception)]);
    }
    if(this.hasCustomFields()) {
      for(var i = 0, len = this.customFields.length; i < len; i++) {
        var val = this.customFields[i].value;

        // Check if the value is a function. If so, execute it, passing it the
        // current layout and the logging event
        try {
          if(typeof val === "function")
            val = val(this, loggingEvent);
        } catch(e) {
          JLog.handleError(e);
          val = "[Exception during evaluating]"
        }

        dataValues.push([this.customFields[i].name, val]);
      }
    }
    return dataValues;
  },

  setKeys: function(loggerKey, timeStampKey, levelKey, messageKey,
                    exceptionKey, urlKey, millisecondsKey) {
    this.loggerKey = extractStringFromParam(loggerKey, this.defaults.loggerKey);
    this.timeStampKey = extractStringFromParam(timeStampKey, this.defaults.timeStampKey);
    this.levelKey = extractStringFromParam(levelKey, this.defaults.levelKey);
    this.messageKey = extractStringFromParam(messageKey, this.defaults.messageKey);
    this.exceptionKey = extractStringFromParam(exceptionKey, this.defaults.exceptionKey);
    this.urlKey = extractStringFromParam(urlKey, this.defaults.urlKey);
    this.millisecondsKey = extractStringFromParam(millisecondsKey, this.defaults.millisecondsKey);
  },

  setCustomField: function(name, value) {
    var fieldUpdated = false;
    for (var i = 0, len = this.customFields.length; i < len; i++) {
      if (this.customFields[i].name === name) {
        this.customFields[i].value = value;
        fieldUpdated = true;
      }
    }
    if (!fieldUpdated) {
      this.customFields.push({"name": name, "value": value});
    }
  },

  hasCustomFields: function() {
    return (this.customFields.length > 0);
  },

  toString: function() {
    JLog.handleError("Layout.toString: all layouts must override this method");
  }
};
