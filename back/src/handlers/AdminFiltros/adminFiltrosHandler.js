const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class AdminFiltrosHandler {
  static async filtrarProductos(filtroPrecio, filtroEstado) {
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

      if (filtroPrecio === 'bajo') {
        return productosBajos;
      }
      if (filtroPrecio === 'medio') {
        return productosMedios;
      }
      if (filtroPrecio === 'alto') {
        return productosAltos;
      }

      if (filtroEstado === 'activo') {
        return productos.filter((p) => !p.disabled);
      }
      if (filtroEstado === 'inactivo') {
        return productos.filter((p) => p.disabled);
      }

      return productos;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = AdminFiltrosHandler;
