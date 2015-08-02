var AppUtility = function () {
  'use strict';
  
  var self = this || {};

  self.postRequest = function (o) {
    var body,
        httpRequest;

    o.callback('pending');

    if(self.validateRequest(o)) {
      body = self.buildMessage(o, 'POST');
    } else {
      return o.callback('fail');
    }

    httpRequest = new XMLHttpRequest();

    if(!httpRequest){
      return false;
    }
    
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('POST', o.url);
    httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpRequest.send(body);
    
    function alertContents() {
      if(httpRequest.readyState === 4) {
        if(httpRequest.status === 200) {
          o.callback('success');      
        } else {
          o.callback('fail');
        }
      }
    }
  };

  self.buildMessage = function (o, method) {
    var body = '';

    for(var param in o.params) {
      if(o.params.hasOwnProperty(param)) {
        body += param + '=' + window.encodeURIComponent(o.params[param]) + '&';
      }
    }

    switch(method) {
      case 'GET':
        return '?' + body.substring(0, body.length - 1);
      case 'POST':
        return body.substring(0, body.length - 1);
    }
  };

  self.getRequest = function (o) {
    var httpRequest = new XMLHttpRequest();

    if(!httpRequest){
      return false;
    }
    
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', o.url);
    httpRequest.send();
    
    function alertContents() {
      if(httpRequest.readyState === 4) {
        if(httpRequest.status === 200) {
          o.callback(false, httpRequest.responseText);      
        } else {
          o.callback(true, null);
        }
      }
    }
  };

  self.validateRequest = function (o) {
    if(!o.url || !o.params || !o.params._csrf || !o.callback) {
      return false;
    }

    return true;
  };

};

module.exports = new AppUtility();
