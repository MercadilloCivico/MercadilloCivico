const prisma = require('../../../db_connection');

class FiltroHandler {
  static async filterProductos(
    puntoDeVentaId,
    filtroMarca,
    filtroPrecio,
    calificacion,
    alfabetico,
    precio,
    name
  ) {
    try {
      const consulta = {
        include: {
          inventario: true,
        },
        where: {
          inventario: {
            some: {
              punto_de_venta_id: puntoDeVentaId,
            },
          },
        },
      };
      if (filtroMarca) {
        consulta.where.marca = filtroMarca;
      }

      if (calificacion) {
        consulta.orderBy = {
          calification: calificacion,
        };
      }

      if (alfabetico) {
        consulta.orderBy = {
          name: alfabetico,
        };
      }

      const productos = await prisma.producto.findMany(consulta);

      let arrayFilteredProducts = productos.map((producto) => {
        // Filtrar el inventario para dejar solo los elementos con el punto de venta id correcto
        const inventarioFiltrado = producto.inventario.filter(
          (item) => item.punto_de_venta_id === puntoDeVentaId
        );
        // Crear un nuevo objeto producto con el inventario filtrado
        return {
          ...producto,
          inventario: inventarioFiltrado[0],
        };
      });
      if (precio) {
        if (precio === 'desc') {
          arrayFilteredProducts = arrayFilteredProducts.sort((a, b) => {
            return b.inventario.precio_final - a.inventario.precio_final;
          });
        } else {
          arrayFilteredProducts = arrayFilteredProducts.sort((a, b) => {
            return a.inventario.precio_final - b.inventario.precio_final;
          });
        }
      }
      if (filtroPrecio) {
        const preciosOnly = arrayFilteredProducts.map((p) => {
          return Number(p.inventario.precio_final);
        });

        // Obtener el precio máximo y mínimo
        const precioMin = Math.min(...preciosOnly);
        const precioMax = Math.max(...preciosOnly);

        // Calcular los límites de cada categoría
        const rango = (precioMax - precioMin) / 3;
        const bajoLimite = precioMin + rango;
        const medioLimite = bajoLimite + rango;

        // Filtrar productos según los límites
        const productosBajos = arrayFilteredProducts.filter(
          (p) => p.inventario.precio_final <= bajoLimite
        );
        const productosMedios = arrayFilteredProducts.filter(
          (p) => p.inventario.precio_final > bajoLimite && p.inventario.precio_final <= medioLimite
        );
        const productosAltos = arrayFilteredProducts.filter(
          (p) => p.inventario.precio_final > medioLimite
        );

        // Según el filtro de precio, devolver el array correspondiente
        if (filtroPrecio === 'bajo') {
          return productosBajos;
        }
        if (filtroPrecio === 'medio') {
          return productosMedios;
        }
        if (filtroPrecio === 'alto') {
          return productosAltos;
        }
      }

      if (name) {
        arrayFilteredProducts = arrayFilteredProducts.filter((p) => {
          const nameP = p.name.toLowerCase();
          return nameP.startsWith(name.toLowerCase());
        });
      }

      return arrayFilteredProducts;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = FiltroHandler;
