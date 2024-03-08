const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// eslint-disable-next-line import/no-extraneous-dependencies
const { CLIENT_ID, CLIENT_SECRET, API_URL } = require('./env.config');
const prisma = require('../db_connection');
const CarritoHandler = require('../src/handlers/Carrito/carritoHandler');

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: `${API_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await prisma.usuario.findFirst({
          where: {
            google_id: profile.id,
          },
        });
        if (!user) {
          user = await prisma.usuario.create({
            data: {
              google_id: profile.id,
              first_name: profile.name.givenName, // Obtener el nombre dado del perfil de Google
              last_name: profile.name.familyName, // Obtener el apellido del perfil de Google
              email: profile.emails[0].value, // Obtener el correo electrónico del perfil de Google
              photo: profile.photos[0].value, // Obtener la URL de la foto de perfil del perfil de Google
            },
          });
          await CarritoHandler.post(user.id);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      } finally {
        await prisma.$disconnect();
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.usuario.findUnique({
      where: { id },
    });
    done(null, user);
  } catch (error) {
    done(error);
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = passport;
