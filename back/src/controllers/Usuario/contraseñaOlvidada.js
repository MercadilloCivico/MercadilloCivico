const putEmailValidator = require('../../handlers/Usuario/putEmailValidator');

const contraseñaOlvidada = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await putEmailValidator(email);
    if (!response) {
      res.status(400).json(response);
    }
    res.status(200).send('Se ha enviado una nueva contraseña a su correo');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = contraseñaOlvidada;
