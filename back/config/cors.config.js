const cors = require('cors');

const corsConfig = cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://mer-civ.vercel.app'],
  methods: 'GET,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
});

module.exports = corsConfig;
