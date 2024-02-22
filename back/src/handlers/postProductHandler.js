const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const upoloadToCloudinary = require('./uploadToCloudinary');

const postProductHandler = async (name, description, image, calification, marca) => {
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
      },
    });

    return {
      message: 'Producto creado exitosamente',
      data: producto,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = postProductHandler;
