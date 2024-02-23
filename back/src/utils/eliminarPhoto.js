const prisma = require('../../db_connection');
const deleteCloudinary = require('../handlers/deleteCloudinary');

const eliminaPhotoUtil = async (id, model) => {
  try {
    const register = prisma[model].findUnique({
      where: {
        id,
      },
    });
    if (model === 'usuario') {
      return await deleteCloudinary(register.photo);
    }
    return await deleteCloudinary(register.image);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = eliminaPhotoUtil;
