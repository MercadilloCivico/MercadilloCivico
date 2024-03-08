const { GOOGLE_EMAIL, API_URL } = require('../../config/env.config');
const { transporter } = require('../../config/nodemailer.config');

// ?SUGERENCIA DE FORMA DE USO
// Importar transporter en tu archivo y crear la función necesaria editando el contenido del mail utilizando esta base como guía.
const imagen =
  'https://res.cloudinary.com/dkewon763/image/upload/v1709096874/tf8i2xbzl0jljyiuxeez.png';
const sendRecoveryEmail = async (email, token) => {
  const mailOptions = {
    from: GOOGLE_EMAIL,
    to: email,
    subject: 'Recuperación de Cuenta - Mercadillo Cívico',
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
      /* Add inline styles for better email client compatibility */
      body {
        font-family: 'Arial', sans-serif;
        padding: 20px;
      }
  
      table {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #eee3d6;
        border-radius: 5px;
      }
  
      td {
        text-align: center;
        padding: 20px;
      }
  td strong{
    font-size: 30px;
  }
      img {
        display: block;
        margin: 0 auto;
      }
      a{
        border: 2px solid black;
        padding: 10px;
        border-radius: 5px;
        text-decoration: none;
      }
      a:hover{
        background-color: rgb(60, 86, 28);
        color: white;
      }
      .title{
        margin-bottom: 25px;
      }
      .title2{
        margin-top: 25px;
      }
      /* Add more styles as needed */
    </style>
    </head>
    <body style="font-family:'Arial',sans-serif;justify-content: center;display:flex">
    <table>
    <tr>
      <td>
        <img src="${imagen}" alt="logo" width="130" height="120">
      </td>
    </tr>
    <tr>
      <td>
        <!-- Contenido de tu correo -->
        <h1 style="color: black">Hola,</h1>
        <p style="color:black">¡Esperamos que te encuentres bien! Recibes este correo porque has solicitado la recuperación de tu cuenta en Mercadillo Cívico.</p>
        <p class="title" style="color:black">Ingresa al siguiente link para recuperar tu cuenta:</p>
        <a href=${API_URL}/api/forgot/password?email=${email}&password=${token} target="_blank">CLIC AQUI</a>
        <p class="title2" style="color:black">¡No compartas este código con nadie! Si no has solicitado esta recuperación, puedes ignorar este correo. 🚫</p>
        <p style="color:black">¡Gracias por ser parte de Mercadillo Cívico! 🎉</p>
      </td>
    </tr>
  </table>
    </body>
    </html>
    
    `,
    // corregir la ruta y mirar mejor los estilos
    attachments: [
      {
        filename: 'imagen.jpg',
        path: imagen,
        cid: imagen, // esto es importante para referenciar la imagen en el cuerpo del correo
      },
    ],
  };
  /* eslint-disable no-console */
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Error al enviar email: ${error.message}`);
    } else {
      console.log('Correo enviado correctamente', info.response);
    }
  });
};
/* eslint-enable no-console */
const registerEmail = async (email, name) => {
  const mailOptions = {
    from: GOOGLE_EMAIL,
    to: email,
    subject: 'Bienvenido a Mercadillo Cívico',
    html: `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          /* Add inline styles for better email client compatibility */
          body {
            font-family: 'Arial', sans-serif;
            padding: 20px;
          }
    
          table {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #eee3d6;
            border-radius: 5px;
          }
    
          td {
            text-align: center;
            padding: 20px;
            padding-inline: 30px;
          }
    
          .contenido {
            text-align: justify;
            text-wrap: balance;
          }
          #title {
            text-align: center;
          }
          li {
            padding-block: 10px;
            text-align: start;
          }
          p {
            line-height: 22px;
          }
          img {
            display: block;
            margin: 0 auto;
          }
          /* Add more styles as needed */
        </style>
      </head>
      <body style="font-family: 'Arial', sans-serif; justify-content: center; display: flex">
        <table>
          <tr>
            <td>
              <img
                src="${imagen}"
                alt="logo"
                width="130"
                height="120" />
            </td>
          </tr>
          <tr class="contenidoPrincipal">
            <td class="contenido">
              <h2 id="title">😃 ¡Bienvenido a Mercadillo Cívico, ${name}! 😃</h2>
              <!-- Contenido de tu correo -->
              <p>
                📣 Estamos emocionados de tenerte con nosotros y queremos agradecerte por unirte a
                nuestra comunidad. En Mercadillo Cívico, te ofrecemos una experiencia de compra
                personalizada y la oportunidad de apoyar a los emprendedores locales.<br /><br />
                Explora nuestro mercado, encuentra productos increíbles y contribuye al crecimiento de
                tu comunidad. Aquí hay algunas cosas que puedes hacer en Mercadillo Cívico:
              </p>
              <ul>
                <li>
                  👀 <strong>Productos Únicos:</strong> Explora una amplia variedad de productos hechos
                  a mano y exclusivos de vendedores locales.
                </li>
                <li>
                  💖 <strong>Guarda tus Favoritos:</strong> Guarda tus productos favoritos para
                  encontrarlos fácilmente más tarde.
                </li>
                <li>
                  🛡️ <strong>Realiza Compras Seguras:</strong> Disfruta de compras seguras con nuestro
                  sistema de pago protegido.
                </li>
              </ul>
              <p>
                📝 ¡Gracias por ser parte de Mercadillo Cívico! Si tienes alguna pregunta o necesitas
                ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte. ¡Que disfrutes
                explorando y apoyando a los vendedores locales en Mercadillo Cívico!
              </p>
              <p>
                💌 Saludos,<br />
                <u> Equipo de Mercadillo Cívico</u>
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
    
    `,
    // corregir la ruta y mirar mejor los estilos
    attachments: [
      {
        filename: 'imagen.jpg',
        path: imagen,
        cid: imagen, // esto es importante para referenciar la imagen en el cuerpo del correo
      },
    ],
  };

  /* eslint-disable no-console */
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Error al enviar email: ${error.message}`);
    } else {
      console.log('Correo enviado correctamente', info.response);
    }
  });
  /* eslint-enable no-console */
};
module.exports = { sendRecoveryEmail, registerEmail };
