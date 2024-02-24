const prisma = require('../db_connection');

const validateProveedores = async (req, res, next) => {
  const { nameProv, ubicacion, tel } = req.body;
  try {
    if (!nameProv || !ubicacion || !tel) {
      return res
        .status(400)
        .json({ message: 'Los campos nameProv, ubicacion y tel son requeridos' });
    }

    // validar que el proveedor no exista
    const proveedor = await prisma.proveedor.findFirst({
      where: { name_prov: nameProv },
    });

    if (proveedor) {
      return res.status(400).json({ message: 'El proveedor ya existe' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: 'Error al crear proveedor' });
  }
  return true;
};

module.exports = validateProveedores;
