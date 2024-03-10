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

  static async post(puntoDeVentaId) {
    // proveedorId, productoId, cantidad, precio, stockMin, stockMax
    try {
      const productoEnPuntoDeVenta = await prisma.punto_De_Venta.findFirst({
        where: {
          id: puntoDeVentaId,
        },
        include: {
          inventario: true,
        },
      });
      console.log(productoEnPuntoDeVenta);
      // await prisma.inventario.create({
      //   data: {
      //     punto_de_venta_id: puntoDeVentaId,
      //     producto_id: productoId,
      //     stock: cantidad,
      //     precio_final: precio.toFixed(3),
      //     stock_min: stockMin,
      //     stock_max: stockMax,
      //     proveedor_id: proveedorId,
      //   },
      //   include: {
      //     productoEnCarrito: true,
      //   },
      // });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async put(id, cantidad, precio, stockMin, stockMax) {
    try {
      const dataI = {};
      if (cantidad) dataI.stock = cantidad;
      if (stockMin) dataI.stock_min = stockMin;
      if (stockMax) dataI.stock_max = stockMax;
      if (precio) dataI.precio_final = precio.toFixed(3);

      await prisma.inventario.update({
        where: {
          id: parseInt(id, 10),
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
