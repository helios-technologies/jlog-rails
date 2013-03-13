/**
 *
 * @author Marcus R Breese mailto:mbreese@users.sourceforge.net
 * @license Apache License 2.0
 * @version 0.31
 *<pre>
 **************************************************************
 *
 * Copyright 2005 Fourspaces Consulting, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 *
 **************************************************************
 * </pre>
 */

/**
*
* @remixer Helios Technologies Ltd. mailto:contact@heliostech.fr
*
**/

function JLog(name) {
  var _currentLevel = JLog.ALL,
      _appenders = [new JLog.ConsoleAppender()],
      _name = null,
      _enabled = true;

  this.setName = function(name) {
    _name = name || null;
  };

  if (name) {
    this.setName(name);
  }

  this.addAppender = function(appender) {
    if (appender) {
      _appenders.push(appender);
    }
  };

  this.removeAppender = function(name) {
    for (var i in _appenders) {
      if (_appenders[i].name === name) {
        _appenders.splice(i, 1);
      }
    }
    return null;
  };

  this.turnOn = function() {
    _enabled = true;
  };

  this.turnOff = function() {
    _enabled = false;
  };

  this.isOn = function() {
    return _enabled;
  };

  // Sets the current threshold log level for this Log instance.  Only events that have a priority of this level or greater are logged.
  this.setLevel = function(level) {
    if (typeof level === 'number') {
      if (level >= JLog.ALL && level <= JLog.NONE) {
        _currentLevel = level;
      } else {
        _currentLevel = JLog.NONE;
      }
    } else if (level) {
      switch(level) {
        case 'all': _currentLevel = JLog.ALL; break;
        case 'debug': _currentLevel = JLog.DEBUG; break;
        case 'info': _currentLevel = JLog.INFO; break;
        case 'warn': _currentLevel = JLog.WARN; break;
        case 'error': _currentLevel = JLog.ERROR; break;
        case 'fatal': _currentLevel = JLog.FATAL; break;
        default: _currentLevel = JLog.NONE;
      }
    } else {
      _currentLevel = JLog.NONE;
    }
  };

  this.getName = function() {
    return _name;
  };

  this.getAppender = function(name) {
    for (var i in _appenders) {
      if (_appenders[i].name === name) {
        return _appenders[i];
      }
    }
    return null;
  };

  this.getAppenders = function() {
    return _appenders;
  };

  this.getLevel = function() {
    return _currentLevel;
  };
}

JLog.ALL    = 0;
JLog.DEBUG  = 1;
JLog.INFO   = 2;
JLog.WARN   = 3;
JLog.ERROR  = 4;
JLog.FATAL  = 5;
JLog.NONE   = 6;


JLog.prototype.debug = function() {
  if (this.getLevel() <= JLog.DEBUG) {
    this._log("DEBUG", arguments);
  }
};

JLog.prototype.info = function() {
  if (this.getLevel() <= JLog.INFO) {
    this._log("INFO", arguments);
  }
};

JLog.prototype.warn = function() {
  if (this.getLevel() <= JLog.WARN) {
    this._log("WARN", arguments);
  }
};

JLog.prototype.error = function() {
  if (this.getLevel() <= JLog.ERROR) {
    this._log("ERROR", arguments);
  }
};

JLog.prototype.fatal = function() {
  if (this.getLevel() <= JLog.FATAL) {
    this._log("FATAL", arguments);
  }
};

JLog.prototype._log = function() {
  if (this.isOn()) {
    var level = arguments[0],
        args = Array.prototype.slice.call(arguments[1]),
        namePrefix = this.getName() ? '[' + this.getName() + ']' : '',
        msgString = level + namePrefix + ': ',
        appenders = this.getAppenders();

    for (var i in args) {
      if (typeof args[i] === 'object') {
        args[i] = JSON.stringify(args[i]);
      }
    }

    msgString += args.join(', ');
    for(i = 0; i < appenders.length; ++i) {
      appenders[i].log(msgString);
    }
  }
};

JLog.ConsoleAppender = function() {
  this.name = 'ConsoleAppender';

  if (window.console && window.console.log)
    this.log = function(msg) { window.console.log(msg); };
  else
    this.log = function(msg) {};
};

JLog.AjaxAppender = function(url) {
  // Do we make more then 1 call at a time?
  var waitForResponse = true;
  // Current buffer of messages
  var queuedLoggingEvents = [];
  // Messages which should be sent
  var queuedRequests = [];
  // Maximum count of messages sent at a one time
  var batchSize = 10;
  // Are we currently sending something
  var sending = false;
  // Timeout between sending data
  var timerInterval = 1000;

  function scheduleSending() {
    window.setTimeout(sendAllRemaining, timerInterval);
  }

  function sendRequest(postData, callback) {
    $.post(url, postData, "json")
      .complete(function() {
        if (waitForResponse) sending = false;
        if (callback) callback(true);
      });
  }

  function sendAllRemaining() {
    if (queuedLoggingEvents.length === 0) return;
    var eventCopy = queuedLoggingEvents;
    queuedLoggingEvents = [];
    queuedRequests.push(eventCopy);
    sendAll();
  }

  function preparePostData(data) {
    return { message:data };
  }

  function sendAll() {
    if (waitForResponse && sending) return;
    sending = true;
    var currentRequestBatch;
    if (waitForResponse) {
      if (queuedRequests.length > 0) {
        currentRequestBatch = queuedRequests.shift();
        sendRequest(preparePostData(currentRequestBatch), sendAll);
      } else {
        sending = false;
        scheduleSending();
      }
    } else {
      // Rattle off all the requests without waiting to see the response
      while ((currentRequestBatch = queuedRequests.shift())) {
        sendRequest(preparePostData(currentRequestBatch));
      }
      sending = false;
      scheduleSending();
    }
  }

  scheduleSending();

  return {
    name: 'AjaxAppender',

    log: function(msg) {
      queuedLoggingEvents.push(msg);
      if (queuedLoggingEvents.length >= batchSize) sendAllRemaining();
      else if (queuedLoggingEvents.length == 1) scheduleSending();
    }
  };
};
