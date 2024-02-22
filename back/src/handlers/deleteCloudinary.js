const cloudinary = require('../../config/cloudinary.config');
const {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} = require('../../config/env.config');

const getImagePublicId = (imageUrl) => {
  const parts = imageUrl.split('/');
  const filename = parts[parts.length - 1];
  const publicId = filename.split('.')[0];
  return publicId;
};
const deleteFromCloudinaryByUrl = async (imageUrl) => {
  const publicId = getImagePublicId(imageUrl);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      {
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
        cloud_name: CLOUDINARY_CLOUD_NAME,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = deleteFromCloudinaryByUrl;
