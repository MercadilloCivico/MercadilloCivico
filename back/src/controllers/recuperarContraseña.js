const { authHandler } = require('../handlers/authHandler');

const recuperarContrasenia = async (req, res) => {
  try {
    const { email, password } = req.query;

    const response = await authHandler(email, password);
    if (response) {
      res.cookie('sessionToken', response, {
        httpOnly: true,
        maxAge: 3600000,
      });
      res.redirect('http://localhost:5173/');
    }
  } catch (error) {
    res.redirect('http://localhost:5173/');
    res.status(500).json({ message: error.message, error: 'Error en el login' });
  }
};

module.exports = recuperarContrasenia;
