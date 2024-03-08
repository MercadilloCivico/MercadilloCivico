const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class AdminFiltrosHandler {
  static async filtrarProductos(filtroPrecio, filtroEstado, name) {
    try {
      const productos = await prisma.producto.findMany({
        include: {
          inventario: true,
          resenas: true,
          proveedor: true,
          favorites: true,
        },
      });

      const preciosOnly = productos.map((p) => p.inventario.precio_final);

      const precioMin = Math.min(...preciosOnly);
      const precioMax = Math.max(...preciosOnly);

      const rango = (precioMax - precioMin) / 3;
      const bajoLimite = precioMin + rango;
      const medioLimite = bajoLimite + rango;

      const productosBajos = productos.filter((p) => p.inventario.precio_final <= bajoLimite);
      const productosMedios = productos.filter(
        (p) => p.inventario.precio_final > bajoLimite && p.inventario.precio_final <= medioLimite
      );
      const productosAltos = productos.filter((p) => p.inventario.precio_final > medioLimite);

      if (name && !filtroEstado && !filtroPrecio) {
        return productos.filter((p) => p.name.startsWith(name));
      }

      if (filtroPrecio === 'bajo') {
        if (name) {
          return productosBajos.filter((p) => p.name.startsWith(name));
        }
        return productosBajos;
      }
      if (filtroPrecio === 'medio') {
        if (name) {
          return productosBajos.filter((p) => p.name.startsWith(name));
        }
        return productosMedios;
      }
      if (filtroPrecio === 'alto') {
        if (name) {
          return productosBajos.filter((p) => p.name.startsWith(name));
        }
        return productosAltos;
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
