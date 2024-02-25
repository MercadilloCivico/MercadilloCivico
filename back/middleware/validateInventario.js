const prisma = require('../db_connection');

const validateInventario = async (req, res, next) => {
  try {
    const { puntoDeVntaId, productoId, cantidad, precio, stockMin, stockMax } = req.body;
    if (!puntoDeVntaId || !productoId || !stockMin || !stockMax || !cantidad || !precio) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
    const inventario = await prisma.inventario.findFirst({
      where: {
        punto_de_venta_id: puntoDeVntaId,
      },
    });
    if (inventario) {
      return res.status(400).json({ message: 'el producto ya existe en este punto de venta' });
    }
    next();
    return true;
  } catch (error) {
    return res.status(500).json({ message: error.message, error: 'Error al crear el inventario' });
  }
};

module.exports = validateInventario;
