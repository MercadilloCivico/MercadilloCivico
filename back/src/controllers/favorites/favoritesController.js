const jwt = require('jsonwebtoken');
const FavoriteHandlers = require('../../handlers/favorites/favoritesHandler');
const { SECRET_JWT } = require('../../../config/env.config');

class FavoriteControllers {
  static async get(req, res) {
    try {
      console.log('🚀 ~ FavoriteControllers ~ get ~ req:', req);
      const token = req.cookies.sessionToken;
      const decoded = jwt.verify(token, SECRET_JWT);
      if (!decoded) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
      }

      const userFavorites = await FavoriteHandlers.getById(decoded.id);
      return res.status(200).json(userFavorites);
    } catch (error) {
      return res.status(400).json({ error: error.message }); // Added return statement
    }
  }

  static async addFav(req, res) {
    try {
      const token = req.cookies.sessionToken;
      const decoded = jwt.verify(token, SECRET_JWT);
      if (!decoded) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
      }
      const { id } = req.params;
      const response = await FavoriteHandlers.addFav(decoded.id, id); // Removed incorrect assignment
      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: 'Error en la verificación del token.' });
      }
      // Si no se maneja específicamente, devolver un mensaje genérico
      return res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }

  static async removeFav(req, res) {
    try {
      const { id } = req.params;
      const token = req.cookies.sessionToken;
      const decoded = jwt.verify(token, SECRET_JWT);
      if (!decoded) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
      }
      const response = await FavoriteHandlers.removeFav(decoded.id, id); // Removed incorrect assignment
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = FavoriteControllers;
