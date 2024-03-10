const prisma = require('../../../db_connection');

class inventarioHandler {
  static async getall() {
    try {
      const inventario = await prisma.inventario.findMany();
      return inventario;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getById(id) {
    try {
      const inventario = await prisma.inventario.findFirst({
        where: {
          id: parseInt(id, 10),
        },
      });
      if (!inventario) throw new Error('no encontrado');
      return inventario;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async post(proveedorId, puntoDeVentaId, productoId, cantidad, precio, stockMin, stockMax) {
    try {
      await prisma.inventario.create({
        data: {
          punto_de_venta_id: puntoDeVentaId,
          producto_id: productoId,
          stock: parseInt(cantidad, 10),
          precio_final: parseInt(precio, 10),
          stock_min: parseInt(stockMin, 10),
          stock_max: parseInt(stockMax, 10),
          proveedor_id: parseInt(proveedorId, 10),
        },
        include: {
          productoEnCarrito: true,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async put(inventarioId, price, stockMin, stockMax, providerId, cantidad) {
    try {
      const dataI = {};
      if (cantidad) dataI.stock = parseInt(cantidad, 10);
      if (stockMin) dataI.stock_min = parseInt(stockMin, 10);
      if (stockMax) dataI.stock_max = parseInt(stockMax, 10);
      if (price) dataI.precio_final = parseInt(price, 10);
      if (inventarioId) dataI.id = parseInt(inventarioId, 10);
      if (providerId) dataI.proveedor_id = parseInt(providerId, 10);
      await prisma.inventario.update({
        where: {
          id: parseInt(inventarioId, 10),
        },
        data: {
          ...dataI,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async delete(id) {
    try {
      await prisma.inventario.delete({
        where: {
          id: parseInt(id, 10),
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = inventarioHandler;
