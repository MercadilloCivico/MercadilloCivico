// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../db_connection');
// const { logger } = require('../../config/logger.config');

async function authHandler(email, password) {
  try {
    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('usuario o contraseña incorrecta');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('usuario o contraseña incorrecta');
    }
    if (passwordMatch) {
      const token = jwt.sign({ access: true }, 'secret', { expiresIn: '1h' });
      return token;
    }
    throw new Error('Usuario o contraseña incorrecta');

    // return token;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = authHandler;
