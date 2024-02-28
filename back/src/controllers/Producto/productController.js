const ProductHandler = require('../../handlers/Producto/productHandler');

class ProductController {
  static async post(req, res) {
    try {
      const { name, description, calification, marca, proveedoresCostos, image } = req.body;

      // const { file } = req

      // El arreglo de proveedoresCostos debe ser un arreglo de objetos del siguiente tipo:
      // let proveedoresCostos = [
      //   { proveedor_id: 1, costo: 300 },
      //   { proveedor_id: 2, costo: 200 },
      // ];

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

  static async get(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.query;
      if (name) {
        const product = await ProductHandler.getNameById(name);
        return res.status(200).json(product);
      }
      if (id) {
        const product = await ProductHandler.getOne(id);
        return res.status(200).json(product);
      }
      return res.status(200).json(await ProductHandler.getAll());
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message, error: 'Error al obtener los Productos' });
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
