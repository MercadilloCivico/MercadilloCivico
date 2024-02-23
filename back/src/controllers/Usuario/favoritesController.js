const FavoriteHandlers = require('../../handlers/Usuario/favoritesHandler');

class FavoriteControllers {
  static async get(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const userFavorites = await FavoriteHandlers.getById(id);
        return res.status(200).json(userFavorites);
      }
      const usersFavorites = await FavoriteHandlers.getAll();
      return res.status(200).json(usersFavorites);
    } catch (error) {
      return res.status(400).json({ error: error.message }); // Added return statement
    }
  }

  static async addFav(req, res) {
    try {
      const { id } = req.params;
      const { productId } = req.query;
      if (!id) throw new Error('Especifique el usuario para añadir un producto fav');
      const response = await FavoriteHandlers.addFav(id, productId); // Removed incorrect assignment
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async removeFav(req, res) {
    try {
      const { id } = req.params;
      const { productId } = req.query;
      if (!id) throw new Error('Especifique el usuario para remover un producto fav');
      const response = await FavoriteHandlers.removeFav(id, productId); // Removed incorrect assignment
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = FavoriteControllers;
