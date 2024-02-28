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

  static async post(proveedorId, puntoDeVntaId, productoId, cantidad, precio, stockMin, stockMax) {
    try {
      // const idsProveedores = (
      //   await prisma.producto.findMany({
      //     where: {
      //       id: productoId,
      //     },
      //     include: {
      //       proveedor: true,
      //     },
      //   })
      // ).flatMap((element) => element.proveedor.map((el) => el.proveedor_id));

      // const idsProveedoresPunto = (
      //   await prisma.punto_De_Venta.findMany({
      //     where: {
      //       id: puntoDeVntaId,
      //     },
      //     include: {
      //       provedores: true,
      //     },
      //   })
      // ).flatMap((element) => element.provedores.map((el) => el.proveedor_id));

      // const isValid = idsProveedores.some((id) => idsProveedoresPunto.includes(id));
      // if (!isValid) {
      //   throw new Error('El proveedor de este producto no se encuentra en el punto de venta');
      // }
      await prisma.inventario.create({
        data: {
          punto_de_venta_id: puntoDeVntaId,
          producto_id: productoId,
          stock: cantidad,
          precio_final: precio.toFixed(3),
          stock_min: stockMin,
          stock_max: stockMax,
          proveedor_id: proveedorId,
        },
        include: {
          productoEnCarrito: true,
        },
      });
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
