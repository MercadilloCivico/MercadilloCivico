const jwt = require('jsonwebtoken');
const { SECRET_JWT } = require('../../../config/env.config');
const CarritoHandler = require('../../handlers/Carrito/carritoHandler');

class CarritoController {
  static async get(req, res) {
    try {
      const { token } = req.cookies.sessionToken;
      // Este es el id del usuario del cual se esta solicitando el carrito.
      const { id } = jwt.verify(token, SECRET_JWT);
      if (!id) return res.status(401).json({ message: 'Acceso no autorizado' });
      const carrito = await CarritoHandler.getById(id);
      return res.status(200).json(carrito);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // ? No lo borro por si termina siendo necesario pero creo que la idea va a ser crear el carrito al mismo tiempo que se registra el usuario
  static async post(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        throw new Error('Se necesita el id del usuario para crear el carrito');
      } else {
        const response = await CarritoHandler.post(id);
        return res.status(200).json(response);
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async addProducto(req, res) {
    try {
      const { carritoId, inventarioId, cantidad } = req.body;

      if (!carritoId || !inventarioId)
        throw new Error('Faltan datos requeridos para realizar la acción');
      const response = await CarritoHandler.addProduct(carritoId, inventarioId, cantidad);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async removeProducto(req, res) {
    try {
      const { carritoId, inventarioId } = req.body;
      if (!carritoId || !inventarioId)
        throw new Error('Faltan datos requeridos para realizar la acción');
      const response = await CarritoHandler.removeProduct(carritoId, inventarioId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async actualizarCantidad(req, res) {
    try {
      const { carritoId, inventarioId, metodo } = req.body;
      if (!carritoId || !inventarioId)
        throw new Error('Faltan datos requeridos para realizar la acción');
      const response = await CarritoHandler.controlCantidad(carritoId, inventarioId, metodo);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async limpiarCarrito(req, res) {
    try {
      const { id } = req.body;
      if (!id) throw new Error('Faltan datos requeridos para realizar la acción');
      const response = await CarritoHandler.limpiar(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CarritoController;
