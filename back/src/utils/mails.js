const { GOOGLE_EMAIL } = require('../../config/env.config');
const { transporter } = require('../../config/nodemailer.config');

// ?SUGERENCIA DE FORMA DE USO
// Importar transporter en tu archivo y crear la función necesaria editando el contenido del mail utilizando esta base como guía.
const imagen =
  'https://res.cloudinary.com/dkewon763/image/upload/v1708612425/edexolvzvgml9gh7jm1e.png';
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
      color: black
      }
  
      td {
        text-align: center;
        padding: 20px;
      color: black

      }
  td strong{
    font-size: 30px;
  }
      img {
        display: block;
        margin: 0 auto;
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
        <p style="color:black"><p style="text-decoration:underline">Tu código de recuperación es:</p><br><br><strong>${token}</strong></br></br></p>
        <p style="color:black">Ingresa al siguiente link para recuperar tu cuenta: <a href=http://localhost:3001/api/forgot/password?email=${email}&password=${token} target="_blank">CLIC AQUI</a></p>
        <p style="color:black">¡No compartas este código con nadie! Si no has solicitado esta recuperación, puedes ignorar este correo. 🚫</p>
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
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Error al enviar email: ${error.message}`);
    } else {
      console.log('Correo enviado correctamente', info.response);
    }
  });
};

module.exports = sendRecoveryEmail;
