const ProductHandler = require('../../handlers/Producto/productHandler');

class ProductController {
  static async post(req, res) {
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

      const response = await ProductHandler.post(
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
  }

  static async logicDelete(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Se necesita el id del producto de venta para desactivarlo');

      const response = await ProductHandler.logicDelete(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message, error: 'Error al desactivar el producto' });
    }
  }

  static async trueDelete(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Se necesita el id del punto de venta para eliminarlo');
      const response = await ProductHandler.trueDelete(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message, error: 'Error al eliminar el producto' });
    }
  }

  static async put(req, res) {
    try {
      const { name, description, calification, marca, proveedoresCostos } = req.body;

      let image;
      if (req.file) {
        image = req.file;
      }
      const { id } = req.params;
      if (!id) throw new Error('Se necesita el id del producto para actualizarlo');
      const response = await ProductHandler.put(
        id,
        name,
        description,
        image,
        calification,
        marca,
        proveedoresCostos
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message, error: 'Error al actualizar el producto' });
    }
  }
}

module.exports = ProductController;
