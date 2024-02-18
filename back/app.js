const express = require('express');
const routes = require('./routes/index');
const corsConfig = require('./config/cors.config');
const errorCatcher = require('./config/error.config');
const { methodLogger } = require('./config/logger.config');

const app = express();

app.use(express.json());
app.use(methodLogger);
app.use(corsConfig);
app.use('/api', routes);
app.use(errorCatcher);

module.exports = app;
