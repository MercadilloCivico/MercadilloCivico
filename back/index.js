const app = require('./app');
const { PORT } = require('./config/env.config');
const { logger } = require('./config/logger.config');

app.listen(PORT, () => {
  logger.info(`Server raised in: http://localhost:${PORT}`);
});
