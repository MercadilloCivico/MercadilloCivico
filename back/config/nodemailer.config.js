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

// ?SUGERENCIA DE FORMA DE USO
// Importar transporter en tu archivo y crear la función necesaria editando el contenido del mail utilizando esta base como guía.
/*
const pruebaEnviarMail = (email) => {
  const mailOptions = {
  from: GOOGLE_EMAIL,
  to: email,
  subject: 'Hello World',
  html: `<html>
    <head>
        <title>Hello World</title>
    </head>
    <body>
        <h1>Gracias por Registrarte en Mercadillo Cívico!</h1>
        <p></p>
    </body>
    </html>`,
}

transporter.sendMail(mailOptions,(error, info) => {
  if (error) {
    console.log("Error al enviar email " + error.message);
  } else {
    console.log("mail enviado correctamente", info.response);
  }
})
};
*/

module.exports = { transporter };
