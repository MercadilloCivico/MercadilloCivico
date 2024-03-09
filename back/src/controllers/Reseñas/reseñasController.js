const jwt = require('jsonwebtoken');
const ReseñasHandler = require('../../handlers/Reseñas/reseñasHandler');
const { SECRET_JWT } = require('../../../config/env.config');

class ReseñasController {
  static async get(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const reseña = await ReseñasHandler.getById();
        return res.status(200).json(reseña);
      }
      const reseñas = await ReseñasHandler.getAll();
      return res.status(200).json(reseñas);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static async post(req, res) {
    try {
      const { productId, coment, calification } = req.body;
      const token = req.cookies.sessionToken;
      const { id } = jwt.verify(token, SECRET_JWT);
      if (!id) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
      }
      const nuevaReseña = await ReseñasHandler.post(id, productId, coment, calification);
      return res.status(200).json({
        message: 'Reseña añadida exitosamente',
        data: nuevaReseña,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static async put(req, res) {
    try {
      const { id } = req.params;
      const { coment, calification } = req.body;
      const updateReseña = await ReseñasHandler.put(Number(id), coment, calification);
      return res.status(200).json({
        message: 'Reseña actualizada exitosamente',
        data: updateReseña,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await ReseñasHandler.delete(Number(id));
      return res.status(200).json({
        message: 'Reseña eliminada exitosamente',
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

module.exports = ReseñasController;
