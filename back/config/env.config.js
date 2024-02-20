const { logger } = require('./logger.config');

require('dotenv').config({
  path: process.argv[2] === 'development' ? './.env.development' : './.env.production',
});

const environment = process.argv[2];

if (!['development', 'production'].includes(environment)) {
  logger.error('Wrong environment');
  process.exit(1);
}

const {
  PORT,
  DATABASE_URL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  SECRET_JWT,
} = process.env;

module.exports = {
  PORT,
  DATABASE_URL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  SECRET_JWT,
};
