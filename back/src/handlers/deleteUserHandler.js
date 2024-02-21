const bcrypt = require('bcrypt');
const prisma = require('../../db_connection');

const deleteUserHandler = async (email, password) => {
  try {
    const findUser = await prisma.usuario.findUnique({
      where: { email },
    });
    if (!findUser) throw new Error('El usuario no se encuentra registrado en la base de datos');
    if (!bcrypt.compare(password, findUser.password))
      throw new Error('La contraseña es incorrecta');
    await prisma.usuario.update({
      where: {
        email,
      },
      data: {
        disabled: true,
      },
    });
    return {
      usuarioEliminadoCorrectamente: true,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = deleteUserHandler;
