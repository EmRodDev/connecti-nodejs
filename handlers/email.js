const nodemailer = require('nodemailer');
const emailConfig = require('../config/email.js');
const fs = require('fs');
const util = require('util');
const ejs = require('ejs');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
});

exports.sendEmail = async (options) => {
    
    //Read the file for the email

    const file = __dirname + `/../views/emails/${options.file}.ejs`;

    //Compile it

    const compiled = ejs.compile(fs.readFileSync(file, 'utf-8'));

    //Create the HTML

    const html = compiled({url: options.url});

    //Configure email options

    const emailOptions = {
        from: 'Connecti <noreply@connecti.com>',
        to: options.user.email,
        subject: options.subject,
        html: html
    }

    //Send the email

    const sendEmail = util.promisify(transport.sendMail, transport);

    return sendEmail.call(transport, emailOptions);
}