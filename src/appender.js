/*
  Class: Appender

  Base class for sending/outputting of logging event.
*/
JLog.Appender = function() {};

JLog.Appender.prototype = {
  /*
    Property: layout

    Layout to use with this appender.
  */
  layout: new JLog.PatternLayout(),

  /*
    Property: threshold

    Appender's internal <Level>.
  */
  threshold: JLog.Level.ALL,

  /*
    Method: doAppend

    Checks and navigates logging events. Logger uses this method as gateway.

    Parameters:
      loggingEvent - <LoggingEvent> to append
  */
  doAppend: function(loggingEvent) {
    if(loggingEvent.level.isGreaterOrEqual(this.threshold)) {
      this.append(loggingEvent);
    }
  },

  /*
    Method: append

    Virtual method, has to be overloaded by derivative classes to perform actual appending.

    Parameters:
      loggingEvent - <LoggingEvent> to append
  */
  append: function(loggingEvent) {
    JLog.handleError("JLog.Appender: This method has to be implemented by derivative classes!");
  },

  /*
    Method: setLayout

    Set appender's <Layout>

    Parameters:
      layout - <Layout> for appender.
  */
  setLayout: function(layout) {
    if (layout instanceof JLog.Layout) {
      this.layout = layout;
    } else {
      JLog.handleError("Appender.setLayout: layout supplied to " +
                  this.toString() + " is not a subclass of Layout");
    }
  },

  /*
    Method: getLayout

    Get appender's <Layout>
  */
  getLayout: function() { return this.layout; },

  /*
    Method: setThreshold

    Set appender's threshold <Level>

    Parameters:
      threshold - <Level> for appender.
  */
  setThreshold: function(threshold) { this.threshold = threshold; },

  /*
    Method: getThreshold

    Get appender's threshold <Level>
  */
  getThreshold: function() { return this.threshold; },

  toString: function() {
    JLog.handleError("Appender.toString: all appenders must override this method");
  }
};
