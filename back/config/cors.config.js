const cors = require('cors');

const corsConfig = cors({
  origin: '*',
  methods: 'GET,PUT,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
});

module.exports = corsConfig;
