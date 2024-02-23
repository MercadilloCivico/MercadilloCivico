const cloudinary = require('../../config/cloudinary.config');
const { CLOUDINARY_API_KEY } = require('../../config/env.config');

const deleteFile = async (publicId) => {
  try {
    const deletionResult = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'raw',
      api_key: CLOUDINARY_API_KEY,
    });
    return deletionResult;
  } catch (error) {
    throw new Error(`Error al eliminar archivo de Cloudinary: ${error.message}`);
  }
};

module.exports = deleteFile;
