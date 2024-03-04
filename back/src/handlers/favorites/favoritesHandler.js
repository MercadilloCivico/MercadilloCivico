const prisma = require('../../../db_connection');

class FavoriteHandlers {
  static async getById(id) {
    try {
      const findUser = await prisma.usuario.findFirst({ where: { id } });
      if (!findUser) throw new Error('El Usuario no se encuentra en la base de datos');
      const favorites = await prisma.usuario.findFirst({
        where: {
          id,
        },
        include: {
          favorites: true,
        },
      });
      return favorites.favorites;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async addFav(userId, productId) {
    try {
      const findUser = await prisma.usuario.findFirst({ where: { id: userId } });
      const findProduct = await prisma.producto.findFirst({ where: { id: productId } });
      if (!findUser || !findProduct)
        throw new Error('El usuario y/o producto no se encuentra en la base de datos');
      const favoritos = await prisma.usuario.update({
        where: {
          id: userId,
        },
        data: {
          favorites: {
            connect: {
              id: productId,
            },
          },
        },
        include: {
          favorites: true,
        },
      });
      return favoritos.favorites;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async removeFav(userId, productId) {
    try {
      const findUser = await prisma.usuario.findFirst({ where: { id: userId } });
      const findProduct = await prisma.producto.findFirst({ where: { id: productId } });
      if (!findUser || !findProduct)
        throw new Error('El usuario y/o producto no se encuentra en la base de datos');
      const favorite = await prisma.usuario.update({
        where: {
          id: userId,
        },
        data: {
          favorites: {
            disconnect: {
              id: productId,
            },
          },
        },
        include: {
          favorites: true,
        },
      });
      return favorite.favorites;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = FavoriteHandlers;
