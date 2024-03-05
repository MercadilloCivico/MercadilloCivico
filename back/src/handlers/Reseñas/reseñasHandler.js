const prisma = require('../../../db_connection');

class ReseñasHandler {
  static async getAll() {
    try {
      const reseñas = await prisma.resena.findMany();
      return reseñas;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getById(id) {
    try {
      const reseñas = await prisma.resena.findFirst(Number(id));
      return reseñas;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async post(userId, productId, coment, calification) {
    try {
      const dataPost = {
        calification,
        producto_id: productId,
        usuario_id: userId,
        coment: coment || 'Sin Comentario',
      };
      const nuevaReseña = await prisma.resena.create({
        data: dataPost,
      });
      return nuevaReseña;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async put(id, coment, calification) {
    try {
      const findReseña = await prisma.resena.findUnique({ where: { id } });
      if (!findReseña) throw new Error('La reseña no se encuentra en la base de datos');
      const dataPost = {
        fecha_actualizacion: new Date(),
      };
      if (coment) {
        dataPost.coment = coment;
      }
      if (calification) {
        dataPost.calification = calification;
      }
      const nuevaReseña = await prisma.resena.update({
        where: {
          id,
        },
        data: dataPost,
      });
      return nuevaReseña;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async delete(id) {
    try {
      const findReseña = await prisma.resena.findUnique({ where: { id } });
      if (!findReseña) throw new Error('La reseña no se encuentra en la base de datos');
      await prisma.resena.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ReseñasHandler;
