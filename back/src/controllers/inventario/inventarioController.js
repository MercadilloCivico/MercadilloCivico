const inventarioHandler = require('../../handlers/inventario/inventarioHandler');

class inventario {
  static async get(req, res) {
    try {
      const { id } = req.params;
      let inventarioget;
      if (id) {
        inventarioget = await inventarioHandler.getById(id);
        return res.status(200).json(inventarioget);
      }
      inventarioget = await inventarioHandler.getall();
      return res.status(200).json(inventarioget);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async post(req, res) {
    try {
      const { puntoDeVentaId, productoId, proveedorId, cantidad, precio, stockMin, stockMax } =
        req.body;
      await inventarioHandler.post(
        proveedorId,
        puntoDeVentaId,
        productoId,
        cantidad,
        precio,
        stockMin,
        stockMax
      );
      return res.status(200).json({ message: 'Producto añadido a inventario' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async put(req, res) {
    try {
      const { inventarioId, price, stockMin, stockMax, providerId, cantidad } = req.body;
      await inventarioHandler.put(inventarioId, price, stockMin, stockMax, providerId, cantidad);
      return res.status(200).json({ message: 'Inventario actualizado' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      await inventarioHandler.delete(id);
      return res.status(200).json({ message: 'Inventario eliminado' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = inventario;
