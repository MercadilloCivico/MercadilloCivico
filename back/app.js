const express = require('express');
const helmet = require('helmet');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const routes = require('./src/routes/index');
const corsConfig = require('./config/cors.config');
const errorCatcher = require('./config/error.config');
const passport = require('./config/passportSetup');
const { methodLogger } = require('./config/logger.config');

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(helmet());
app.use(express.json());
app.use(upload.single('image'));
app.use(passport.initialize());
app.use(cookieParser());
app.use(methodLogger);
app.use(corsConfig);
app.use('/api', routes);
app.use(errorCatcher);

module.exports = app;
