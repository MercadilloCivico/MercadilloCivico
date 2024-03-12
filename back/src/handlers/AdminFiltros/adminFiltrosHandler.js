const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class AdminFiltrosHandler {
  static async filtrarProductos(filtroMarca, filtroEstado, name) {
    try {
      let whereConditions = {};

      if (filtroMarca) {
        whereConditions = {
          ...whereConditions,
          marca: filtroMarca,
        };
      }

      const productos = await prisma.producto.findMany({
        where: whereConditions,
        include: {
          inventario: true,
          resenas: true,
          proveedor: true,
          favorites: true,
        },
      });

      if (name && !filtroEstado) {
        return productos.filter((p) => p.name.startsWith(name));
      }

      if (filtroEstado === 'activo') {
        const filtrados = productos.filter((p) => !p.disabled);
        if (name) {
          return filtrados.filter((p) => p.name.startsWith(name));
        }
        return filtrados;
      }

      if (filtroEstado === 'inactivo') {
        const filtrados = productos.filter((p) => p.disabled);
        if (name) {
          return filtrados.filter((p) => p.name.startsWith(name));
        }
        return filtrados;
      }

      return productos;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = AdminFiltrosHandler;
