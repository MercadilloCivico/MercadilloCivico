const { logger } = require('./logger.config');

const errorCatcher = (err, req, res) => {
  const status = err.status || 500;
  const message = err.message || err;
  logger.error(err);
  res.status(status).send(message);
};

module.exports = errorCatcher;
