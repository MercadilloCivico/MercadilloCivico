/* eslint-disable no-unused-vars */
const { logger } = require('./logger.config');

const errorCatcher = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  logger.error(err);

  return res.status(status).send({ error: message });
};

module.exports = errorCatcher;
