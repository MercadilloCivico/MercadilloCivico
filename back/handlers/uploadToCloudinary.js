const cloudinary = require('../config/cloudinary.config');
const { CLOUDINARY_API_KEY } = require('../config/env.config');

const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: 'auto', api_key: CLOUDINARY_API_KEY }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      })
      .end(file.buffer);
  });
};

module.exports = uploadToCloudinary;
