const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const upoloadToCloudinary = require('../uploadToCloudinary');

class ProductHandler {
  static async post(name, description, image, calification, marca, proveedoresCostos) {
    try {
      // Subir la imagen a cloudinary
      let imageURL;
      if (image) {
        imageURL = await upoloadToCloudinary(image);
      }

      // Creación del prodcuto en la base de datos
      const producto = await prisma.producto.create({
        data: {
          name,
          description,
          image: imageURL || '',
          calification,
          marca,
          proveedor: {
            createMany: {
              data: proveedoresCostos.map((objeto) => ({
                proveedor_id: objeto.proveedor_id,
                costo: objeto.costo,
              })),
            },
          },
        },
      });

      return {
        message: 'Producto creado exitosamente',
        data: producto,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async logicDelete(id) {
    try {
      const producto = await prisma.producto.findFirst({
        where: {
          id,
        },
      });

      if (!producto) throw new Error('El producto no se encuentra en la base de datos');

      await prisma.producto.update({
        where: {
          id,
        },
        data: {
          disabled: true,
        },
      });

      return {
        message: 'El producto se ha desactivado exitosamente',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async trueDelete(id) {
    try {
      const producto = await prisma.producto.findFirst({
        where: {
          id,
        },
      });

      if (!producto) throw new Error('El producto no se encuentra en la base de datos');

      await prisma.producto.delete({
        where: {
          id,
        },
      });

      return {
        message: 'El producto se ha eliminado exitosamente',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAll() {
    try {
      const productos = await prisma.producto.findMany();
      return productos;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getOne(id) {
    try {
      const producto = await prisma.producto.findFirst({
        where: {
          id,
        },
      });
      return producto;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getName(name) {
    try {
      const productos = await prisma.producto.findMany({
        where: {
          name: {
            contains: name,
          },
        },
      });
      return productos;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ProductHandler;
