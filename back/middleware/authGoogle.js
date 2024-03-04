const jwt = require('jsonwebtoken');
const { SECRET_JWT, FRONT_URL } = require('../config/env.config');
const passport = require('../config/passportSetup');

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
      httpOnly: false,
      maxAge: 3600000,
    });

    return res.redirect(`${FRONT_URL}/store`);
  })(req, res, next);
}

function protectRoute(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    return next();
  })(req, res, next);
}

module.exports = {
  authenticateGoogle,
  authenticateGoogleCallback,
  protectRoute,
};
