const prisma = require('../../../db_connection');

class CarritoHandler {
  static async getById(id) {
    try {
      await this.verificarExistencia('usuario', id);
      const carrito = await prisma.carrito_de_Compras.findUnique({
        where: { user_id: id },
        include: {
          productoEnCarrito: {
            orderBy: {
              ref: 'asc',
            },
          },
        },
      });
      if (!carrito) throw new Error('El usuario no tiene asignado un carrito, error del sistema');
      return carrito;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAll() {
    try {
      const carritos = await prisma.carrito_de_Compras.findMany();
      return carritos;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async post(id) {
    try {
      await this.verificarExistencia('usuario', id);
      const carrito = await prisma.carrito_de_Compras.create({
        data: {
          user_id: id,
        },
      });
      return {
        message: 'Carrito creado exitosamente',
        carrito,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async verificarExistencia(entidad, id) {
    const idNumber = Number(id);

    if (!Number.isNaN(idNumber)) {
      id = idNumber;
    }
    const findEntity = await prisma[entidad].findFirst({ where: { id } });
    if (!findEntity) {
      throw new Error(`La ${entidad} no se encuentra en la base de datos`);
    }
  }

  static async addProduct(carritoId, inventarioId, cantidad) {
    try {
      await this.verificarExistencia('carrito_de_Compras', carritoId);
      await this.verificarExistencia('inventario', inventarioId);
      await prisma.producto_En_Carrito.create({
        data: {
          carritoId,
          inventarioId,
          cantidad: cantidad === 0 ? 1 : cantidad,
        },
      });
      return { message: 'Producto añadido' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async removeProduct(carritoId, inventarioId) {
    try {
      await this.verificarExistencia('carrito_de_Compras', carritoId);
      await this.verificarExistencia('inventario', inventarioId);
      await prisma.producto_En_Carrito.delete({
        where: {
          inventarioId_carritoId: { inventarioId, carritoId },
        },
      });
      return { message: 'Producto eliminado del carrito exitosamente' };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async controlCantidad(carritoId, inventarioId, metodo) {
    try {
      await this.verificarExistencia('carrito_de_Compras', carritoId);
      await this.verificarExistencia('inventario', inventarioId);
      const productoEnCarrito = await prisma.producto_En_Carrito.findUnique({
        where: {
          inventarioId_carritoId: { inventarioId, carritoId },
        },
      });
      if (!productoEnCarrito) {
        throw new Error('El producto no está en el carrito de compras');
      }
      if (!metodo) throw new Error('Porfavor específica el metodo que desear realizar');
      let nuevaCantidad;
      if (metodo === 'sumar') {
        nuevaCantidad = productoEnCarrito.cantidad + 1;
      }
      if (metodo === 'restar') {
        nuevaCantidad = productoEnCarrito.cantidad - 1;
      }
      if (nuevaCantidad <= 0)
        throw new Error('La cantidad minima de este producto en carrito debe ser 1');
      const productoActualizado = await prisma.producto_En_Carrito.update({
        where: {
          inventarioId_carritoId: { inventarioId, carritoId },
        },
        data: {
          cantidad: nuevaCantidad,
        },
      });

      return {
        message: 'Cantidad actualizada exitosamente',
        data: productoActualizado,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async limpiar(id) {
    try {
      await this.verificarExistencia('carrito_de_Compras', id);
      await prisma.producto_En_Carrito.deleteMany({
        where: {
          carritoId: id,
        },
      });
      return { message: 'Carrito limpiado exitosamente' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CarritoHandler;
