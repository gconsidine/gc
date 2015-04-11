var AppUtility = function () {
  'use strict';

  this.request = function (o) {
    var postString,
        httpRequest;

    this.updateStatus('pending');

    if(this.validateRequest(o)) {
      postString = 'text=' + encodeURIComponent(o.text) + '&email=' + 
                   encodeURIComponent(o.email) + '&_csrf=' + encodeURIComponent(o._csrf);
    } else {
      this.updateStatus('fail');
      return false;
    }

    httpRequest = new XMLHttpRequest();

    if(!httpRequest){
      return false;
    }
    
    httpRequest.onreadystatechange = alertContents.bind(this);
    httpRequest.open('POST', '/contact');
    httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpRequest.send(postString);
    
    function alertContents() {
      if(httpRequest.readyState === 4) {
        if(httpRequest.status === 200) {
          this.updateStatus('success');      
        } else {
          this.updateStatus('fail');
        }
      }
    }
  };

  this.validateRequest = function (o) {
    if(o.text !== '' && o.email !== '') {
      if(o.email.indexOf('@') !== -1 && o.email.indexOf('.') !== -1) {
        return true;
      }
    }

    return false;
  };

  this.updateStatus = function (message) {
    var contactButton = document.getElementById('contactButton'),
        contactStatus = document.getElementById('contactStatus'),
        contactSending = document.getElementById('contactSending'),
        contactSuccess = document.getElementById('contactSuccess'),
        userMessage = document.getElementById('userMessage'),
        userEmail = document.getElementById('userEmail');

    if(message === 'pending') {
      contactButton.style.display = 'none';
      contactSending.style.display = 'block';
      contactButton.style.display = 'none';
    } else if (message === 'success') {
      contactStatus.style.display = 'none';
      contactButton.style.display = 'none';
      contactSending.style.display = 'none';
      contactSuccess.style.display = 'block';
      userMessage.readOnly = 'readonly';
      userEmail.readOnly = 'readonly';
    } else {
      contactSending.style.display = 'none';
      contactStatus.innerHTML = 'Invalid submission';
      contactStatus.style.display = 'block';
      contactButton.innerHTML = 'Try Again';
      contactButton.style.display = 'block';
    }
  };
};

module.exports = new AppUtility();
