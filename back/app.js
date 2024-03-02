const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./src/routes/index');
const corsConfig = require('./config/cors.config');
const errorCatcher = require('./config/error.config');
const passport = require('./config/passportSetup');
const { methodLogger } = require('./config/logger.config');
const { SECRET_COOKIE, FRONT_URL } = require('./config/env.config');
const { handleFileUpload } = require('./middleware/multer');
// const job = require('./src/handlers/pedidosProveedor/timerDeProducto');

const app = express();

app.use(helmet());
// ambiente de desarrollo modificar en produccion
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        // 'trusted-scripts.com', dominio cliente
        `${FRONT_URL}`,
        'http://localhost:3001',
        // 'cdn.jsdelivr.net', adquirir cuando el cliente lo desee
        'apis.google.com', // Permitir scripts de Google Auth
        'cdnjs.cloudflare.com', // Permitir scripts de Material-UI
      ],
      styleSrc: [
        "'self'",
        'cdn.jsdelivr.net',
        'fonts.googleapis.com', // Permitir estilos de Google Fonts
        'cdn.materialdesignicons.com', // Permitir estilos de Material Design Icons
      ],
      imgSrc: [
        "'self'",
        'data:',
        'res.cloudinary.com', // Permitir imágenes de Cloudinary
        'www.google.com', // Permitir imágenes de Google Auth
        `${FRONT_URL}`,
        'http://localhost:3001',
      ],
    },
  })
);
app.disable('x-powered-by');
app.use(helmet.noSniff());

app.use(corsConfig);
app.use(express.json());
app.use(handleFileUpload);
app.use(passport.initialize());
app.use(
  cookieParser(SECRET_COOKIE, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  })
);

app.use(methodLogger);
app.use((req, res, next) => {
  res.header('Content-Type', 'application/pdf');
  next();
});
app.use('/api', routes);
// job();
app.use(errorCatcher);

module.exports = app;
