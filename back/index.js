const app = require('./app');
const { PORT } = require('./config/env.config');
const { logger } = require('./config/logger.config');
const limpiarDB = require('./src/utils/limpiarDB');
// Esta función va a limpiar la base de datos cada vez que se reinicie el server, comentar las lineas 7 y 9 si quieren desactivar el 'force: true'

app.listen(PORT, async () => {
  await limpiarDB();
  logger.info(`Server raised in: http://localhost:${PORT}`);
  logger.warn("DB en modo 'force: true'");
});
