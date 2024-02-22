const postProductHandler = require('../handlers/postProductHandler');

const postProduct = async (req, res) => {
  try {
    const { name, description, calification, marca } = req.body;

    let image;
    // Verifica si es que se ha enviado una imagen
    if (req.file) {
      image = req.file;
    }

    const response = await postProductHandler(name, description, image, calification, marca);

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message, error: 'Error al crear producto' });
  }
};

module.exports = postProduct;
