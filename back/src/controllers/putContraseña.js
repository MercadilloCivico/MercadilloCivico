const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET_JWT } = require('../../config/env.config');
const prisma = require('../../db_connection');
const validationPassword = require('../utils/validationPassword');

const putContrasenia = async (req, res) => {
  try {
    // falta validar contraseña y hacer prueba con el front
    let token = req.cookies.sessionToken;

    const decoded = jwt.verify(token, SECRET_JWT);
    if (!decoded) {
      res.status(401).json({ message: 'Acceso no autorizado' });
    }
    const error = validationPassword(req.body.password);
    if (error !== null) {
      throw new Error(error);
    }
    const password = await bcrypt.hash(req.body.password, 11);

    await prisma.usuario.update({
      where: {
        id: decoded.id,
      },
      data: {
        password,
      },
    });
    const response = await prisma.usuario.findFirst({
      where: {
        id: decoded.id,
      },
    });

    token = jwt.sign({ id: response.id }, SECRET_JWT, { expiresIn: '1h' });
    res.cookie('sessionToken', token, {
      httpOnly: true,
      maxAge: 3600000,
    });
    res.status(200).json({ message: 'Contrasenia actualizada' });
  } catch (error) {
    res.status(401).json({ message: 'Acceso no autorizado' });
  }
};

module.exports = putContrasenia;
