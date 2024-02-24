const { FRONT_URL } = require('../../../config/env.config');
const { authHandler } = require('../../handlers/Usuario/authHandler');

const recuperarContrasenia = async (req, res) => {
  try {
    const { email, password } = req.query;

    const response = await authHandler(email, password);
    if (response) {
      res.cookie('sessionToken', response, {
        httpOnly: true,
        maxAge: 3600000,
      });
      res.redirect(`${FRONT_URL}/Nueva`);
    }
  } catch (error) {
    res.redirect(`${FRONT_URL}`);
    res.status(500).json({ message: error.message, error: 'Error en el login' });
  }
};

module.exports = recuperarContrasenia;
