const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
// const { logger } = require('../config/logger.config');
const { SECRET_JWT } = require('../config/env.config');

// passport.use(
//   new LocalStrategy(function (username, password, done) {
//     return done(null, false);
//   })
// );

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_JWT,
    },
    (payload, done) => {
      return done(null, payload);
    }
  )
);

module.exports = passport;
