const nodemailer = require('nodemailer');
const environment = require('./environment.config');

const { GOOGLE_EMAIL, GOOGLE_PASS } = environment;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: GOOGLE_EMAIL,
    pass: GOOGLE_PASS,
  },
});

const helloWorldMailOptions = (email) => ({
  from: GOOGLE_EMAIL,
  to: email,
  subject: 'Hello World',
  html: `<html>
    <head>
        <title>Hello World</title>
    </head>
    <body>
        <h1>Hello World</h1>
    </body>
    </html>`,
});

module.exports = { transporter, helloWorldMailOptions };
