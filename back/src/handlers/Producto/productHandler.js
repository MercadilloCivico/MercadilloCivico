const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const uploadToCloudinary = require('../uploadToCloudinary');
const validationImage = require('../../utils/validations/validationImage');
const eliminaPhotoUtil = require('../../utils/eliminarPhoto');

class ProductHandler {
  static async post(name, description, image, calification, marca, proveedoresCostos) {
    try {
      // Subir la imagen a cloudinary
      // let imageURL;
      // if (image) {
      //   imageURL = await uploadToCloudinary(image);
      // }

      // Creación del prodcuto en la base de datos
      const producto = await prisma.producto.create({
        data: {
          name,
          description,
          // image: imageURL || '',
          image,
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
      const productos = await prisma.producto.findMany({
        include: {
          resenas: true,
          proveedor: true,
          inventario: true,
        },
      });
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
        include: {
          resenas: true,
          proveedor: true,
          inventario: true,
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
        include: {
          resenas: true,
          proveedor: true,
          inventario: true,
        },
      });
      return productos;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async put(id, name, description, image, calification, marca, proveedoresCostos) {
    try {
      const updatedData = {};

      if (name) updatedData.name = name;
      if (description) updatedData.description = description;
      if (calification) updatedData.calification = calification;
      if (marca) updatedData.marca = marca;

      if (proveedoresCostos) {
        //! Actualiza la relación existente entre el proveedor y el producto, esto es muy importante
        await Promise.all(
          proveedoresCostos.map((proveedorCosto) =>
            prisma.productoProveedor.update({
              where: {
                proveedor_id_producto_id: {
                  proveedor_id: proveedorCosto.proveedor_id,
                  producto_id: id,
                },
              },
              data: {
                costo: proveedorCosto.costo,
              },
            })
          )
        );
      }

      if (image) {
        validationImage(image);
        eliminaPhotoUtil(id, 'Producto');
        const secureUrl = await uploadToCloudinary(image);
        updatedData.image = secureUrl;
      }

      await prisma.producto.update({
        where: {
          id,
        },
        data: updatedData,
        include: {
          proveedor: true,
        },
      });

      return {
        message: 'Producto actualizado exitosamente',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ProductHandler;
