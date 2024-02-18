const winston = require('winston');

const levels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  http: 4,
  debug: 5,
};

const colors = {
  debug: 'blue',
  http: 'green',
  info: 'cyan',
  warn: 'yellow',
  error: 'red',
  fatal: 'magenta',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const transports = [
  new winston.transports.File({
    filename: './errors.log',
    level: 'error',
    format,
  }),
];

if (process.env.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true }), format),
      level: 'info',
    })
  );
} else {
  transports.push(
    new winston.transports.Console({
      format,
      level: 'debug',
    })
  );
}

const logger = winston.createLogger({
  levels,
  format,
  transports,
});

const methodLogger = (req, res, next) => {
  const { method, url } = req;
  const start = new Date().getTime();

  res.on('finish', () => {
    const { statusCode } = res;
    const end = new Date().getTime();
    const duration = end - start;
    const message = `${method} ${url} ${statusCode} ${duration}ms`;

    if (statusCode >= 500) {
      logger.error(message);
    } else if (statusCode >= 400) {
      logger.warn(message);
    } else if (statusCode >= 100) {
      logger.http(message);
    }
  });

  next();
};

module.exports = {
  logger,
  methodLogger,
};
