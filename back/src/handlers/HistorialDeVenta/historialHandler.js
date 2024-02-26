const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class HistorialHandler {
  static async post(idUsuario, precioFinal, puntoDeVenta, productos) {
    try {
      // Construir la cadena de texto para los productos
      const productosString = productos
        .map((item) => `${item.producto} X${item.cantidad}`)
        .join(', ');

      // Construir la cadena final incluyendo los productos y el precio final
      const resultado = `Punto de Venta: ${puntoDeVenta} - Compra: ${productosString} - Total: $${precioFinal}`;

      const newHistorial = await prisma.historial_Compras.create({
        data: {
          user_id: idUsuario,
          info_compra: resultado,
        },
      });

      return {
        message: 'Se ha guardado la compra en tu historial',
        historial: newHistorial,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAll() {
    try {
      const historial = await prisma.historial_Compras.findMany();
      return historial;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getById(id) {
    try {
      const historial = await prisma.historial_Compras.findFirst({
        where: {
          id: parseInt(id, 10),
        },
      });
      return historial;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async delete(id) {
    try {
      await prisma.historial_Compras.delete({
        where: {
          id: parseInt(id, 10),
        },
      });
      return {
        message: 'Historial eliminado exitosamente',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = HistorialHandler;
