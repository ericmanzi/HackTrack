"use strict";

// Authors: Eric Manzi, Favyen Bastani

// Exposes an e-mail function that sends e-mails based on templates.
// The e-mail is sent asynchronously.
// A callback can be optionally specified, but should only be used if
//   the caller actually needs to wait until the e-mail is sent.
var config = require('../config');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path')

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport((smtpTransport({
    service: config.smtp_service,
    auth: config.smtp_auth
})));

module.exports = function(to, subject, tmplStr, params, callback) {
    if(!callback) {
        callback = function(){};
    }
    var template = new EmailTemplate(path.join(__dirname, '..', 'emailtmpl', tmplStr));
    template.render(params, function(err, results) {
        if(err) {
            callback(err);
            return;
        }
        transport.sendMail({
            from: config.smtp_from,
            to: to,
            subject: subject,
            text: results.text,
            html: results.html,
        }, function(err, info) {
            if(err){
                console.log('Error sending e-mail: ' + err);
                callback(err);
            } else {
                callback(null);
            }
        });
    });
};
