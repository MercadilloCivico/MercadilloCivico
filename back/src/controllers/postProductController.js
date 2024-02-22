const postProductHandler = require('../handlers/postProductHandler');

const postProduct = async (req, res) => {
  try {
    const { name, description, calification, marca, proveedoresCostos } = req.body;

    // El arreglo de proveedoresCostos debe ser un arreglo de objetos del siguiente tipo:
    // let proveedoresCostos = [
    //   { proveedor_id: 1, costo: 300 },
    //   { proveedor_id: 2, costo: 200 },
    // ];

    let image;
    // Verifica si es que se ha enviado una imagen
    if (req.file) {
      image = req.file;
    }

    const response = await postProductHandler(
      name,
      description,
      image,
      calification,
      marca,
      proveedoresCostos
    );

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message, error: 'Error al crear producto' });
  }
};

module.exports = postProduct;
