const jwt = require('jsonwebtoken');
const { SECRET_JWT } = require('../config/env.config');
// const { validTokens } = require('../src/handlers/authHandler');

function authenticateToken(req, res, next) {
  const token = req.cookies.sessionToken;

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  // if (!validTokens.has(token)) {
  //   return res.status(401).json({ message: 'Acceso no autorizado' });
  // }

  jwt.verify(token, SECRET_JWT, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Token Inválido' });
    }
    req.user = user;
    next();
    return true;
  });
  return true;
}

module.exports = {
  authenticateToken,
};
