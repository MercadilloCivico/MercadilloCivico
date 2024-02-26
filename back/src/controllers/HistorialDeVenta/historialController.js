const HistorialHandler = require('../../handlers/HistorialDeVenta/historialHandler');

class HistorialController {
  static async post(req, res) {
    try {
      const { idUsuario, precioFinal, puntoDeVenta, productos } = req.body;

      const response = await HistorialHandler.post(idUsuario, precioFinal, puntoDeVenta, productos);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const reponse = await HistorialHandler.getAll();
      res.status(200).json(reponse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Se necesita el id');
      const reponse = await HistorialHandler.getById(id);
      res.status(200).json(reponse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Se necesita el id del historial para eliminarlo');
      const response = await HistorialHandler.delete(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = HistorialController;
