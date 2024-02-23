const validationImage = (image) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.svg']; // Extensiones permitidas
  const fileExtension = image.originalname
    .substring(image.originalname.lastIndexOf('.'))
    .toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    throw new Error('Formato de imagen no permitido');
  }
};

module.exports = validationImage;
