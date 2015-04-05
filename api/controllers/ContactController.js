var ContactController = function (nodemailer) {
  'use strict'; 

  nodemailer = nodemailer || require('nodemailer');

  this.send = function (req, res) {
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: sails.config.emailUser,
        pass: sails.config.emailPassword
      }
    });

    var viewOptions = { 
      message: req.param('text'), 
      email: req.param('email') 
    };

    res.render('contact-email', viewOptions, function (error, html) {
      var mailOptions = {
        from: 'Greg Considine <greg@greg-considine.com>',
        to: 'Greg Considine <greg@greg-considine.com>',
        subject: 'Contact Form Submission',
        html: html
      };

      transporter.sendMail(mailOptions, function (error, info) {});
    });

    return res.json(200, {});
  };

};

module.exports = new ContactController();
