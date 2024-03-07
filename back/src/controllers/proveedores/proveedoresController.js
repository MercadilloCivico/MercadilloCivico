const jwt = require('jsonwebtoken');
const proveedorHandlers = require('../../handlers/proveedor/proveedorHandler');
const { SECRET_JWT } = require('../../../config/env.config');

class ProveedoresController {
  static async getAll(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.query;

      if (name) {
        const proveedor = await proveedorHandlers.getNameById(name);
        return res.status(200).json(proveedor);
      }
      if (id) {
        const proveedor = await proveedorHandlers.getById(id);
        return res.status(200).json(proveedor);
      }
      const proveedor = await proveedorHandlers.getAll();
      return res.status(200).json(proveedor);
    } catch (error) {
      return res.status(500).json({ message: error.message, error: 'Error al obtener proveedor' });
    }
  }

  static async post(req, res) {
    try {
      const { nameProv, ubicacion, tel } = req.body;
      const { camaraDeComercio, certificadoBancario } = req.files;
      const token = req.cookies.sessionToken;
      const decoded = jwt.verify(token, SECRET_JWT);
      if (!decoded) {
        throw new Error('session invalida registrese');
      }

      await proveedorHandlers.post(
        nameProv,
        ubicacion,
        tel,
        camaraDeComercio,
        certificadoBancario,
        decoded.id
      );

      res.status(200).json({
        message: 'Proveedoredor creado exitosamente',
      });
    } catch (error) {
      res.status(500).json({ message: error.message, error: 'Error al crear proveedor' });
    }
  }

  static async put(req, res) {
    try {
      const { nameProv, ubicacion, tel } = req.body;
      const { id } = req.params;
      const { camaraDeComercio, certificadoBancario } = req.files;
      await proveedorHandlers.put(
        id,
        nameProv,
        ubicacion,
        tel,
        camaraDeComercio,
        certificadoBancario
      );
      res.status(200).json({
        message: 'Proveedoredor actualizado exitosamente',
      });
    } catch (error) {
      res.status(500).json({ message: error.message, error: 'Error al actualizar proveedor' });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await proveedorHandlers.delete(id);
      res.status(200).json({
        message: 'Proveedoredor eliminado exitosamente',
      });
    } catch (error) {
      res.status(500).json({ message: error.message, error: 'Error al eliminar proveedor' });
    }
  }
}

module.exports = ProveedoresController;
