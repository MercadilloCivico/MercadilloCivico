// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../db_connection');
const { SECRET_JWT } = require('../../config/env.config');
// const { logger } = require('../../config/logger.config');
const validTokens = new Set();

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
      const token = jwt.sign({ access: true }, SECRET_JWT, { expiresIn: '1h' });
      validTokens.add(token);
      return token;
    }
    throw new Error('Usuario o contraseña incorrecta');

    // return token;
  } catch (error) {
    throw new Error(error);
  }
}

async function logoutHandler(token) {
  try {
    validTokens.delete(token);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  authHandler,
  logoutHandler,
  validTokens,
};
