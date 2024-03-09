const jwt = require('jsonwebtoken');
const HistorialHandler = require('../../handlers/HistorialDeVenta/historialHandler');
const { SECRET_JWT } = require('../../../config/env.config');

class HistorialController {
  static async post(req, res) {
    try {
      const token = req.cookies.sessionToken;
      const { id } = jwt.verify(token, SECRET_JWT);
      if (!id) return res.status(401).json({ message: 'Acceso no autorizado' });
      const { precioFinal, puntoDeVenta, productos } = req.body;

      const response = await HistorialHandler.post(id, precioFinal, puntoDeVenta, productos);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const reponse = await HistorialHandler.getAll();
      return res.status(200).json(reponse);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Se necesita el id');
      const reponse = await HistorialHandler.getById(id);
      return res.status(200).json(reponse);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Se necesita el id del historial para eliminarlo');
      const response = await HistorialHandler.delete(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = HistorialController;
