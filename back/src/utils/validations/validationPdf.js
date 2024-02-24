const validationFile = (file) => {
  const allowedExtensions = ['.pdf']; // Extensiones permitidas
  const fileExtension = file[0].originalname
    .substring(file[0].originalname.lastIndexOf('.'))
    .toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    throw new Error('Formato de archivo no permitido');
  }
};

module.exports = validationFile;
