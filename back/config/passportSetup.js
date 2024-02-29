const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// eslint-disable-next-line import/no-extraneous-dependencies
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const { SECRET_JWT, CLIENT_ID, CLIENT_SECRET } = require('./env.config');
const prisma = require('../db_connection');
const CarritoHandler = require('../src/handlers/Carrito/carritoHandler');

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/api/auth/google/callback',
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

// revisar
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_JWT,
    },
    (payload, done) => {
      // Esta función se llama cuando el token JWT ha sido verificado con éxito

      // payload: Contiene la información del usuario almacenada en el token

      // done: Una función que se llama para indicar si la autenticación fue exitosa o no
      // null indica que no hay errores, y se pasa el objeto payload como argumento, que representa al usuario autenticado
      return done(null, payload);
    }
  )
);
module.exports = passport;
