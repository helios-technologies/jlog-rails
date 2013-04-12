/*
  Enum: Level

  Levels of messages.

  ALL - Used to mark <Logger> of <Appender> as ones allowing all messages.
  DEBUG - Minimal priority for message. This one is used for least valuable, and massive messages.
  INFO - Used to trace the system status. These messages are less aggressive then <Level.DEBUG>.
  WARN - Something could be better at this time.
  ERROR - Same as <Level.WARN>, but brakes some part of the system. Has to be fixed.
  FATAL - Same as <Level.WARN>, but brakes all the system. If not fixed - nothing will work at all.
  NONE - Used to mark <Logger> of <Appender> as ones blocking all the messages.
*/
JLog.Level = (function() {
  function Level(priority, name) {
    this.priority = priority;
    this.name = name;
  }

  Level.prototype = {
    isGreaterOrEqual: function(otherLevel) {
      return this.priority >= otherLevel.priority;
    }
  };

  Level.ALL   = new Level(0, "ALL");
  Level.DEBUG = new Level(1, "DEBUG");
  Level.INFO  = new Level(2, "INFO");
  Level.WARN  = new Level(3, "WARN");
  Level.ERROR = new Level(4, "ERROR");
  Level.FATAL = new Level(5, "FATAL");
  Level.NONE  = new Level(6, "NONE");

  return Level;
})();
