const jwt = require('jsonwebtoken');
const { SECRET_JWT } = require('../config/env.config');

async function checkAuthentication(req, res) {
  try {
    const token = req.cookies.sessionToken;

    if (!token) {
      return res.status(401).json({ message: 'Token ha expirado', redirectToLogin: true });
    }

    const decoded = jwt.verify(token, SECRET_JWT);
    const expiracionEnMilisegundos = decoded.exp * 1000;

    if (expiracionEnMilisegundos < Date.now()) {
      return res.status(401).json({ message: 'Token ha expirado', redirectToLogin: true });
    }

    return res.status(200).json({ message: 'Token válido' });
  } catch (error) {
    return res.status(401).json({ message: 'Acceso no autorizado', redirectToLogin: true });
  }
}

module.exports = {
  checkAuthentication,
};
