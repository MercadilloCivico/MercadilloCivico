const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class AdminFiltrosHandler {
  static async filtrarProductos(filtroMarca, filtroEstado, name, orderType) {
    try {
      let whereConditions = {};
      let order = {};

      if (filtroMarca) {
        whereConditions = {
          ...whereConditions,
          marca: filtroMarca,
        };
      }

      if (orderType === 'nameAsc') {
        order = {
          name: 'asc',
        };
      } else if (orderType === 'nameDesc') {
        order = {
          name: 'desc',
        };
      } else if (orderType === 'marcaAsc') {
        order = {
          marca: 'asc',
        };
      } else if (orderType === 'marcaDesc') {
        order = {
          marca: 'desc',
        };
      } else if (orderType === 'estadoAsc') {
        order = {
          disabled: 'asc',
        };
      } else if (orderType === 'estadoDesc') {
        order = {
          disabled: 'desc',
        };
      } else if (orderType === 'ventas') {
        order = {
          ventas: 'desc',
        };
      }

      const productos = await prisma.producto.findMany({
        where: whereConditions,
        orderBy: order,
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
