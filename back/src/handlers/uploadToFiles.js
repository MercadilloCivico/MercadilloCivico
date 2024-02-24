const cloudinary = require('../../config/cloudinary.config');
const { CLOUDINARY_API_KEY } = require('../../config/env.config');

const uploadToFile = async (file) => {
  return new Promise((resolve, reject) => {
    // Verificar si el archivo está vacío
    if (!file[0] || !file[0].buffer || file[0].buffer.length === 0) {
      reject(new Error('Error al crear proveedor: Archivo vacío'));
      return;
    }

    const uploadOptions = { resource_type: 'raw', api_key: CLOUDINARY_API_KEY };

    // Verificar que file.originalname esté definido antes de usarlo
    if (file[0].originalname) {
      // Establecer el public_id para archivos PDF
      uploadOptions.public_id = `${file[0].fieldname}/${file[0].originalname.replace(/\.[^/.]+$/, '')}.pdf`;
    } else {
      reject(
        new Error('Error al crear proveedor: El nombre original del archivo no está definido.')
      );
      return;
    }

    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({ URL: result.secure_url, public_id: result.public_id });
        }
      })
      .end(file[0].buffer);
  });
};

module.exports = uploadToFile;
