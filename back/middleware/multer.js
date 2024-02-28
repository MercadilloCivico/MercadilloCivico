// multerMiddleware.js

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const handleFileUpload = (req, res, next) => {
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'camaraDeComercio', maxCount: 1 },
    { name: 'certificadoBancario', maxCount: 1 },
    // Puedes agregar más objetos para manejar diferentes campos
  ])(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'Error al procesar archivos' });
    }
    if (err) {
      return res.status(500).json({ message: 'Error inesperado al procesar archivos' });
    }
    next();
    return true;
  });
};

module.exports = { handleFileUpload };
