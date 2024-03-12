const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const uploadToCloudinary = require('../uploadToCloudinary');
const validationImage = require('../../utils/validations/validationImage');
const eliminaPhotoUtil = require('../../utils/eliminarPhoto');
const deleteFromCloudinaryByUrl = require('../deleteCloudinary');

class ProductHandler {
  static async post(name, description, marca, proveedoresCostos, photo) {
    try {
      // Subir la imagen a cloudinary
      let secureUrl;
      if (photo) {
        validationImage(photo[0]);
        secureUrl = await uploadToCloudinary(photo[0]);
      }
      if (secureUrl === undefined) {
        secureUrl =
          'https://previews.123rf.com/images/jpgon/jpgon1411/jpgon141100514/33774342-ilustraci%C3%B3n-de-un-avatar-de-manzana-que-llevaba-gafas.jpg';
      }

      // Creación del prodcuto en la base de datos
      const producto = await prisma.producto.create({
        data: {
          name,
          description,
          image: secureUrl,
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

      const updatedDisabled = !producto.disabled;

      await prisma.producto.update({
        where: {
          id,
        },
        data: {
          disabled: updatedDisabled,
        },
      });

      return {
        message: `El producto se ha ${updatedDisabled ? 'desactivado' : 'activado'} exitosamente`,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async trueDelete(id) {
    try {
      const producto = await prisma.producto.findUnique({
        where: {
          id,
        },
      });

      if (!producto) throw new Error('El producto no se encuentra en la base de datos');

      if (producto.image) {
        await deleteFromCloudinaryByUrl(producto.image);
      }

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
        include: {
          resenas: true,
          proveedor: true,
          inventario: true,
        },
      });
      const productosName = productos.filter((p) => {
        const productName = p.name;
        return productName.toLowerCase().startsWith(name.toLowerCase());
      });
      return productosName;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async put(id, name, description, image, marca, proveedoresCostos) {
    try {
      const updatedData = {};

      if (name) updatedData.name = name;
      if (description) updatedData.description = description;
      if (marca) updatedData.marca = marca;

      if (proveedoresCostos) {
        // Eliminar proveedores costos que ya no están presentes
        const proveedoresIds = proveedoresCostos.map(
          (proveedorCosto) => proveedorCosto.proveedor_id
        );
        await prisma.productoProveedor.deleteMany({
          where: {
            producto_id: id,
            NOT: {
              proveedor_id: {
                in: proveedoresIds,
              },
            },
          },
        });

        //! Actualiza la relación existente entre el proveedor y el producto, esto es muy importante
        await Promise.all(
          proveedoresCostos.map((proveedorCosto) =>
            prisma.productoProveedor.upsert({
              where: {
                proveedor_id_producto_id: {
                  proveedor_id: Number(proveedorCosto.proveedor_id),
                  producto_id: id,
                },
              },
              update: {
                costo: proveedorCosto.costo,
              },
              create: {
                proveedor_id: Number(proveedorCosto.proveedor_id),
                producto_id: id,
                costo: proveedorCosto.costo,
              },
            })
          )
        );
      }

      if (image) {
        validationImage(image[0]);
        const secureUrl = await uploadToCloudinary(image[0]);
        updatedData.image = secureUrl;
        await eliminaPhotoUtil(id, 'Producto');
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
