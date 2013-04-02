/*
  Class: AjaxAppender

  Ajax calls based appender.
*/
JLog.AjaxAppender = function(url) {
  this.name = 'AjaxAppender';

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
    $.ajax({
      type: 'POST',
      url: url,
      data: postData,
      dataType: 'json',
      global: false,
      complete: function() {
        if (waitForResponse) sending = false;
        if (callback) callback(true);
      }
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

  /*
    Method: append

    Attempts to send message.
  */
  this.append = function(msg) {
    queuedLoggingEvents.push({level:msg.level.name, message:this.getLayout().format(msg)});
    if (queuedLoggingEvents.length >= batchSize) sendAllRemaining();
    else if (queuedLoggingEvents.length == 1) scheduleSending();
  }
};

JLog.AjaxAppender.prototype = new JLog.Appender();
