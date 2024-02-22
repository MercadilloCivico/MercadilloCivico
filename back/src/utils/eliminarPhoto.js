const prisma = require('../../db_connection');
const deleteCloudinary = require('../handlers/deleteCloudinary');

const eliminaPhotoUtil = async (id) => {
  try {
    const user = prisma.usuario.findUnique({
      where: {
        id,
      },
    });
    await deleteCloudinary(user.photo);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = eliminaPhotoUtil;
