const jwt = require('jsonwebtoken');
const { SECRET_JWT, FRONT_URL, COOKIE_SAMESITE_CONFIG } = require('../config/env.config');
const passport = require('../config/passportSetup');
const prisma = require('../db_connection');

function authenticateGoogle(req, res, next) {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
}

function authenticateGoogleCallback(req, res, next) {
  passport.authenticate('google', { failureRedirect: '/' }, (err, user) => {
    if (err || !user) {
      return res.redirect(`${FRONT_URL}/login/alreadyRegistered`);
    }
    const token = jwt.sign({ id: user.id }, SECRET_JWT, { expiresIn: '1h' });
    res.cookie('sessionToken', token, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: COOKIE_SAMESITE_CONFIG,
      secure: true,
    });
    return res.redirect(`${FRONT_URL}/${token}/?auth=google`);
  })(req, res, next);
}

async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.sessionToken;
    const decoded = jwt.verify(token, SECRET_JWT);
    const user = await prisma.usuario.findUnique({ where: { id: decoded.id } });
    if (!user) {
      throw new Error('session invalida');
    }
    if (user.rol === 'admin') {
      return next();
    }

    throw new Error('no tienes permisos');
  } catch (error) {
    return res.status(401).json({ message: error.message, error: 'Acceso no autorizado' });
  }
}

module.exports = {
  authenticateGoogle,
  authenticateGoogleCallback,
  protectRoute,
};
