const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET_JWT } = require('../../../config/env.config');
const prisma = require('../../../db_connection');
const validationImage = require('../../utils/validations/validationImage');
const ValidationPassword = require('../../utils/validations/validationPassword');
const uploadToCloudinary = require('../../handlers/uploadToCloudinary');
const eliminaPhotoUtil = require('../../utils/eliminarPhoto');

const putUsuario = async (req, res) => {
  try {
    // falta validar contraseña y hacer prueba con el front
    let token = req.cookies.sessionToken;

    const decoded = jwt.verify(token, SECRET_JWT);
    if (!decoded) {
      res.status(401).json({ message: 'Acceso no autorizado' });
    }

    const { firstName, secondName, lastName, email, password } = req.body;
    const photo = req.file;

    // Construir objeto de datos a actualizar
    const dataToUpdate = {};
    if (firstName) dataToUpdate.first_name = firstName;
    if (secondName) dataToUpdate.second_name = secondName;
    if (lastName) dataToUpdate.last_name = lastName;
    if (email) dataToUpdate.email = email;
    if (password) {
      const error = ValidationPassword(password);
      if (error) throw new Error(error);
      const hashPassword = await bcrypt.hash(password, 11);
      dataToUpdate.password = hashPassword;
    }
    if (photo) {
      validationImage(photo);
      const secureUrl = uploadToCloudinary(photo);
      dataToUpdate.photo = secureUrl;
      eliminaPhotoUtil(decoded.id, 'Usuario');
    }

    // Actualizar usuario en la base de datos
    const response = await prisma.usuario.update({
      where: { id: decoded.id },
      data: dataToUpdate,
    });

    token = jwt.sign({ id: response.id }, SECRET_JWT, { expiresIn: '1h' });
    res.cookie('sessionToken', token, {
      httpOnly: true,
      maxAge: 3600000,
    });
    res.status(200).json({ message: 'Datos de usuario actualizados' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = putUsuario;
