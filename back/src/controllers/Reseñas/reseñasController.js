const ReseñasHandler = require('../../handlers/Reseñas/reseñasHandler');

class ReseñasController {
  static async get(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const reseña = await ReseñasHandler.getById();
        res.status(200).json(reseña);
      } else {
        const reseñas = await ReseñasHandler.getAll();
        res.status(200).json(reseñas);
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  static async post(req, res) {
    try {
      const { userId, productId, coment, calification } = req.body;
      const nuevaReseña = await ReseñasHandler.post(userId, productId, coment, calification);
      res.status(200).json({
        message: 'Reseña añadida exitosamente',
        data: nuevaReseña,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  static async put(req, res) {
    try {
      const { id } = req.params;
      const { coment, calification } = req.body;
      const updateReseña = await ReseñasHandler.put(id, coment, calification);
      res.status(200).json({
        message: 'Reseña actualizada exitosamente',
        data: updateReseña,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await ReseñasHandler.delete(id);
      res.status(200).json({
        message: 'Reseña eliminada exitosamente',
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

module.exports = ReseñasController;
