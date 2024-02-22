const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const validateProductFields = async (req, res, next) => {
  const { name, marca, proveedoresCostos } = req.body;
  const { file } = req;

  // Verificar que todos los campos sean proporcionados
  if (!name || !marca || !file || !proveedoresCostos) {
    return res
      .status(400)
      .json({ message: 'Los campos name, marca, proveedoresCostos e imagen son requeridos' });
  }

  // Verificar que proveedoresCostos sea un array de objetos
  if (
    !Array.isArray(proveedoresCostos) ||
    proveedoresCostos.some(
      (proveedor) => typeof proveedor !== 'object' || !proveedor.proveedor_id || !proveedor.costo
    )
  ) {
    return res.status(400).json({
      message:
        'El campo proveedoresCostos debe ser un array de objetos con las propiedades proveedor_id y costo',
    });
  }

  // Verificar que proveedor_id y costo sean números enteros
  if (
    proveedoresCostos.some(
      (proveedor) =>
        typeof proveedor.proveedor_id !== 'number' ||
        !Number.isInteger(proveedor.proveedor_id) ||
        typeof proveedor.costo !== 'number' ||
        !Number.isInteger(proveedor.costo)
    )
  ) {
    return res
      .status(400)
      .json({ message: 'Los campos proveedor_id y costo deben ser números enteros' });
  }

  // Verificar que los proveedor_id existan en la base de datos
  const proveedoresIds = proveedoresCostos.map((proveedor) => proveedor.proveedor_id);
  const proveedoresExistentes = await prisma.proveedor.findMany({
    where: {
      id: {
        in: proveedoresIds,
      },
    },
  });

  if (proveedoresExistentes.length !== proveedoresIds.length) {
    return res
      .status(400)
      .json({ message: 'Al menos uno de los proveedores no existe en la base de datos' });
  }

  // Si todos los campos son válidos, continuar con la siguiente función en la cadena de middleware
  next();
  return true;
};

module.exports = validateProductFields;
