(function(JLog){
   var anonymousLoggerName = "[anonymous]";
  var defaultLoggerName = "[default]";
  var rootLoggerName = "root";

  var loggers = {};
  var loggerNames = [];

  var ROOT_LOGGER_DEFAULT_LEVEL = JLog.Level.DEBUG;
  var rootLogger = new Logger(rootLoggerName);
  rootLogger.setLevel(ROOT_LOGGER_DEFAULT_LEVEL);
  JLog.getRootLogger = function() {
    return rootLogger;
  };

  var defaultLogger = null;
  JLog.getDefaultLogger = function() {
    if (!defaultLogger) defaultLogger = JLog.getLogger(defaultLoggerName);
    return defaultLogger;
  };

  /*
    Class: Logger
    Manager of logged events.
  */
  function Logger(name) {
    this.parent = null;
    this.children = [];

    var _name = name;
    var _appenders = [];
    var _currentLevel = null;
    var _isRoot = (_name === rootLoggerName);
    var _enabled = true;

    var _appenderCache = null;
    var _appenderCacheInvalidated = false;

    this.turnOn  = function() { _enabled = true;  };
    this.turnOff = function() { _enabled = false; };
    this.isOn    = function() { return _enabled;  };

    this.getName = function() { return _name; }

    var _additive = true;
    /*
      Method: getAdditivity

      Get if log events are propagated higher in logger hierarchy.

      Returns:
        If events should be propagated higher.

      See Also:
        <setAdditivity>
    */
    this.getAdditivity = function() { return _additive; };

    /*
      Method: setAdditivity

      Set if log events are propagated higher in logger hierarchy.

      Parameters:
        additivity - if events should be propagated higher.

      See Also:
        <getAdditivity>
    */
    this.setAdditivity = function(additivity) {
      var valueChanged = (_additive != additivity);
      _additive = additivity;
      if(valueChanged) this.invalidateAppenderCache();
    };

    /*
      Method: addChild

      Makes given logger a child of current logger. If child is additive, all it's events will go through this logger
      either.

      Parameters:
        childLogger - given logger.
    */
    this.addChild = function(childLogger) {
      this.children.push(childLogger);
      childLogger.parent = this;
      childLogger.invalidateAppenderCache();
    };

    /*
      Method: addAppender

      Push an appender for this logger.

      Parameters:
        appender - appender to push.

      See Also:
        <removeAppender>
        <removeAllAppenders>
    */
    this.addAppender = function(appender) {
      if(_appenders.indexOf(appender) >= 0) return;
      _appenders.push(appender);
      this.invalidateAppenderCache();
    };

    /*
      Method: removeAppender

      Remove appender out of this logger.

      Parameters:
        appender - appender to remove.

      See Also:
        <addAppender>
        <removeAllAppenders>
    */
    this.removeAppender = function(appender) {
      _appenders.splice(_appenders.indexOf(appender), 1);
      this.invalidateAppenderCache();
    };

    /*
      Method: removeAllAppender

      Remove all appenders from this logger.

      See Also:
        <addAppender>
        <removeAppender>
    */
    this.removeAllAppenders = function() {
      _appenders = [];
      this.invalidateAppenderCache();
    };

    this.getEffectiveAppenders = function() {
      if (_appenderCache === null || _appenderCacheInvalidated) {
        // Build appender cache
        var parentEffectiveAppenders = (_isRoot || !this.getAdditivity()) ? [] : this.parent.getEffectiveAppenders();
        _appenderCache = _.union(parentEffectiveAppenders, _appenders);
        _appenderCacheInvalidated = false;
      }
      return _appenderCache;
    };

    this.invalidateAppenderCache = function() {
      _appenderCacheInvalidated = true;
      _.each(this.children, function(c) { c.invalidateAppenderCache(); });
    };

    this.log = function(level, params) {
      try {
        if(!(this.isOn() && level.isGreaterOrEqual(this.getEffectiveLevel()))) return;

        params = Array.prototype.slice.call(params || []);

        var exception;
        var finalParamIndex = params.length - 1;
        var lastParam = params[finalParamIndex];
        if (params.length > 1 && (lastParam instanceof Error)) {
          exception = lastParam;
          --finalParamIndex;
        }

        var messages = finalParamIndex >= 0 ? params.slice(0, finalParamIndex + 1) : [];

        var logEvent = new JLog.LoggingEvent(this, new Date(), level, messages, exception);

        this.callAppenders(logEvent);
      } catch(loggerError) {
        JLog.handleError(loggerError);
        // TODO deal with errors inside logger - user of the logger should not know about such a bugs, unless explicitly
        // requested this!
      }
    };

    this.callAppenders = function(logEvent) {
      _.each(this.getEffectiveAppenders(), function(app) { app.doAppend(logEvent); });
    };

    this.setLevel = function(level) {
      if(!(level instanceof JLog.Level)) throw new Error("Logger.setLevel: please use JLog.Level to set Level");
      // Having a level of null on the root logger would be very bad.
      if(_isRoot && level === null)
        throw new Error("Logger.setLevel: you cannot set the level of the root logger to null");
      _currentLevel = level;
    };

    this.getLevel = function() { return _currentLevel; };

    this.getEffectiveLevel = function() {
      for(var logger = this; logger !== null; logger = logger.parent) {
        var level = logger.getLevel();
        if(level !== null) return level;
      }
    };

    this.toString = function() { return "Logger[" + this.getName() + "]"; };
  };

  Logger.prototype = {
    debug: function() {
      this.log(JLog.Level.DEBUG, arguments);
    },

    info: function() {
      this.log(JLog.Level.INFO, arguments);
    },

    warn: function() {
      this.log(JLog.Level.WARN, arguments);
    },

    error: function() {
      this.log(JLog.Level.ERROR, arguments);
    },

    fatal: function() {
      this.log(JLog.Level.FATAL, arguments);
    },

    isEnabledFor: function(level) {
      return level >= this.getEffectiveLevel();
    },

    isDebugEnabled: function() {
      return this.isEnabledFor(JLog.Level.DEBUG);
    },

    isInfoEnabled: function() {
      return this.isEnabledFor(JLog.Level.INFO);
    },

    isWarnEnabled: function() {
      return this.isEnabledFor(JLog.Level.WARN);
    },

    isErrorEnabled: function() {
      return this.isEnabledFor(JLog.Level.ERROR);
    },

    isFatalEnabled: function() {
      return this.isEnabledFor(JLog.Level.FATAL);
    }
  };

  JLog.getLogger = function(loggerName) {
    // Use anonymous logger if loggerName is not specified or invalid
    if (!(typeof loggerName == "string")) loggerName = anonymousLoggerName;

    // Do not allow retrieval of the root logger by name
    if (loggerName == rootLoggerName)
      throw new Error("JLog.getLogger: root logger may not be obtained by name");

    // Create the logger for this name if it doesn't already exist
    if (!loggers[loggerName]) {
      var logger = new Logger(loggerName);
      loggers[loggerName] = logger;
      loggerNames.push(loggerName);

      // Set up parent logger, if it doesn't exist
      var lastDotIndex = loggerName.lastIndexOf(".");
      var parentLogger;
      if(lastDotIndex > -1) {
        var parentLoggerName = loggerName.substring(0, lastDotIndex);
        parentLogger = JLog.getLogger(parentLoggerName); // Recursively sets up grandparents etc.
      } else parentLogger = rootLogger;
      parentLogger.addChild(logger);
    }
    return loggers[loggerName];
  };
})(JLog);
