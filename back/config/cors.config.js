const cors = require('cors');
const { FRONT_URL } = require('./env.config');

const corsConfig = cors({
  origin: [`${FRONT_URL}`, 'http://localhost:5174', 'https://mer-civ.vercel.app'],
  methods: 'GET,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
});

module.exports = corsConfig;
