const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// eslint-disable-next-line import/no-extraneous-dependencies
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const { logger } = require('../config/logger.config');
const { SECRET_JWT } = require('../config/env.config');
const authHandler = require('../src/handlers/authHandler');

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      logger.info(email, password);
      const token = await authHandler(email, password);
      return done(null, { token });
    } catch (error) {
      return done(error);
    }
  })
);

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
