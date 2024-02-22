const nodemailer = require('nodemailer');
const { GOOGLE_EMAIL, GOOGLE_PASS } = require('./env.config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GOOGLE_EMAIL,
    pass: GOOGLE_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = { transporter };
