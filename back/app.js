const express = require('express');
const helmet = require('helmet');
const multer = require('multer');
const routes = require('./routes/index');
const corsConfig = require('./config/cors.config');
const errorCatcher = require('./config/error.config');
const { methodLogger } = require('./config/logger.config');

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(helmet());
app.use(express.json());
app.use(upload.single('image'));

app.use(methodLogger);
app.use(corsConfig);
app.use('/api', routes);
app.use(errorCatcher);

module.exports = app;
