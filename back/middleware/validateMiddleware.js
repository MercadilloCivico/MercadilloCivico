const prisma = require('../db_connection');

const validateMiddleware = {
  validateProveedores: async (req, res, next) => {
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
  },

  validateProductFields: async (req, res, next) => {
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
  },

  validateInventario: async (req, res, next) => {
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
      return res
        .status(500)
        .json({ message: error.message, error: 'Error al crear el inventario' });
    }
  },

  validateReseña: async (req, res, next) => {
    try {
      const { userId, productId, calification } = req.body;
      if (!userId || !productId || !calification) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }
      if (!Number.isInteger(calification)) {
        return res.status(400).json({ message: 'la calificación debe ser un numero entero' });
      }
      const findUser = await prisma.usuario.findUnique({ where: { id: userId } });
      if (!findUser)
        return res.status(400).json({ message: 'El usuario no se encuentra en la base de datos' });
      const findProduct = await prisma.producto.findUnique({ where: { id: productId } });
      if (!findProduct)
        return res.status(400).json({ message: 'El producto no se encuentra en la base de datos' });
      next();
      return true;
    } catch (error) {
      return res.status(500).json({ message: error.message, error: 'Error al crear la reseña' });
    }
  },
};

module.exports = validateMiddleware;
