// const { logger } = require('../../config/logger.config');
// eslint-disable-next-line import/no-useless-path-segments
const { authHandler, logoutHandler } = require('../../src/handlers/authHandler');

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const token = await authHandler(email, password);

    res.cookie('sessionToken', token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: error.message, error: 'Error en el login' });
  }
}

async function logout(req, res) {
  try {
    const token = req.cookies.sessionToken;
    await logoutHandler(token);
    res.clearCookie('sessionToken');
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
  } catch (error) {
    res.status(500).json({ message: error.message, error: 'Error en el logout' });
  }
}

module.exports = {
  login,
  logout,
};
