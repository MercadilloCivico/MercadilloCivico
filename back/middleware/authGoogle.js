const jwt = require('jsonwebtoken');
const { SECRET_JWT } = require('../config/env.config');
const passport = require('../config/passportSetup');

function authenticateGoogle(req, res, next) {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
}

function authenticateGoogleCallback(req, res, next) {
  passport.authenticate('google', { failureRedirect: '/' }, (err, user) => {
    if (err || !user) {
      return res.redirect('http://localhost:5173/login/alreadyRegistered');
    }
    const token = jwt.sign({ sub: user._id }, SECRET_JWT, { expiresIn: '1h' });
    res.cookie('sessionToken', token, {
      httpOnly: false,
      maxAge: 3600000,
    });

    return res.redirect(`http://localhost:5173/store`);
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
