const bcrypt = require('bcrypt');
const prisma = require('../../../db_connection');
const uploadToCloudinary = require('../uploadToCloudinary');
const CarritoHandler = require('../Carrito/carritoHandler');
const validationImage = require('../../utils/validations/validationImage');

const registerHandler = async (firstName, lastName, email, password, secondName, photo) => {
  try {
    const repeatEmail = await prisma.usuario.findFirst({
      where: { email },
    });
    if (repeatEmail) {
      if (repeatEmail.disabled) {
        await prisma.usuario.update({
          where: { id: repeatEmail.id },
          data: { disabled: false },
        });
        throw new Error('Su cuenta vinculada al email ha sido reactivada, por favor inicie sesión');
      } else {
        throw new Error('El email ya se encuentra registrado, por favor inicie sesión');
      }
    }
    const hashPassword = await bcrypt.hash(password, 11);
    let secureUrl;
    if (photo) {
      validationImage(photo);
      secureUrl = await uploadToCloudinary(photo);
    }
    const newUser = await prisma.usuario.create({
      data: {
        first_name: firstName,
        second_name: secondName,
        last_name: lastName,
        email,
        password: hashPassword,
        photo: secureUrl || '',
      },
    });
    await CarritoHandler.post(newUser.id);
    return {
      registradoExitosamente: true,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = registerHandler;
