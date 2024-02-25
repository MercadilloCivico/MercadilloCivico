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
  GOOGLE_EMAIL,
  GOOGLE_PASS,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  SECRET_JWT,
  CLIENT_ID,
  CLIENT_SECRET,
  SECRET_COOKIE,
  FRONT_URL,
} = process.env;

module.exports = {
  PORT,
  DATABASE_URL,
  GOOGLE_EMAIL,
  GOOGLE_PASS,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  SECRET_JWT,
  CLIENT_ID,
  CLIENT_SECRET,
  SECRET_COOKIE,
  FRONT_URL,
};
