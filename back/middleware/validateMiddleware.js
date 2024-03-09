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
      return res.status(400).json({ message: 'Los campos name, marca, e imagen son requeridos' });
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
          producto_id: productoId,
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
      const { productId, calification } = req.body;
      if (!productId || !calification) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }
      if (!Number.isInteger(calification)) {
        return res.status(400).json({ message: 'la calificación debe ser un numero entero' });
      }
      const findProduct = await prisma.producto.findUnique({ where: { id: productId } });
      if (!findProduct)
        return res.status(400).json({ message: 'El producto no se encuentra en la base de datos' });
      next();
      return true;
    } catch (error) {
      return res.status(500).json({ message: error.message, error: 'Error al crear la reseña' });
    }
  },
  validateHistorial: async (req, res, next) => {
    try {
      const { precioFinal, puntoDeVenta, productos } = req.body;

      // const uuidRegex =
      //   /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      // // Verificar que id_usuario sea un UUID válido
      // if (!uuidRegex.test(idUsuario)) {
      //   return res.status(400).json({ error: 'El id_usuario no es válido' });
      // }

      // Verificar que precio_final sea un número
      if (typeof precioFinal !== 'number') {
        return res.status(400).json({ error: 'El precio_final debe ser un número' });
      }

      // Verificar que punto_de_venta sea un string
      if (typeof puntoDeVenta !== 'string') {
        return res.status(400).json({ error: 'El punto_de_venta debe ser un string' });
      }

      // Verificar que productos sea un array
      if (!Array.isArray(productos)) {
        return res.status(400).json({ error: 'El campo productos debe ser un array' });
      }

      // Verificar que cada elemento del array productos sea un objeto con las propiedades producto y cantidad
      const productosValidos = productos.map((producto, index) => {
        if (
          typeof producto !== 'object' ||
          !Object.prototype.hasOwnProperty.call(producto, 'producto') ||
          !Object.prototype.hasOwnProperty.call(producto, 'cantidad')
        ) {
          return res
            .status(400)
            .json({ error: `El elemento ${index} del array productos no es válido` });
        }
        return producto;
      });

      // Si todos los datos son válidos, continuar con la ejecución del siguiente middleware o controlador
      req.body.productos = productosValidos;
      next();
      return true;
    } catch (error) {
      return res.status(500).json({ message: error.message, error: 'Error al crear el historial' });
    }
  },

  validateFilter: async (req, res, next) => {
    try {
      const { filtroMarca, filtroPrecio, calificacion, alfabetico, precio } = req.query;
      const { id } = req.params;

      // const regex = /^[a-zA-Z]+$/;

      // Verificar que puntoDeVentaID esté presente
      if (!id) {
        return res.status(400).json({ error: 'El id del punto de venta es necesario' });
      }

      // Verificar que los parámetros filtroMarca y filtroPrecio sean de tipo string y solo contener letras
      if (filtroMarca) {
        if (typeof filtroMarca !== 'string') {
          return res
            .status(400)
            .json({ error: 'filtroMarca debe ser de tipo string y solo debe contener letras' });
        }
      }

      if (filtroPrecio) {
        if (typeof filtroPrecio !== 'string') {
          return res
            .status(400)
            .json({ error: 'filtroPrecio debe ser de tipo string y solo debe contener letras' });
        }
      }

      // Verificar que solo haya un orden
      const ordenes = [precio, calificacion, alfabetico];
      const orderCount = ordenes.filter(Boolean).length;

      if (orderCount > 1) {
        return res.status(400).json({ error: 'Solo se permite un orden' });
      }

      // Verificar que los parámetros calificacion, alfabetico y precio sean de tipo string y sean las palabras asc o desc
      if (calificacion) {
        if (
          typeof calificacion !== 'string' &&
          (calificacion !== 'asc' || calificacion !== 'desc')
        ) {
          return res
            .status(400)
            .json({ error: 'calificacion debe ser un string que diga solo asc o desc' });
        }
      }

      if (alfabetico) {
        if (typeof alfabetico !== 'string' && (alfabetico !== 'asc' || alfabetico !== 'desc')) {
          return res
            .status(400)
            .json({ error: 'alfabetico debe ser un string que diga solo asc o desc' });
        }
      }

      if (precio) {
        if (typeof precio !== 'string' && (precio !== 'asc' || precio !== 'desc')) {
          return res
            .status(400)
            .json({ error: 'precio debe ser un string que diga solo asc o desc' });
        }
      }

      next();

      return true;
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message, error: 'Error al filtrar los productos' });
    }
  },
};

module.exports = validateMiddleware;
