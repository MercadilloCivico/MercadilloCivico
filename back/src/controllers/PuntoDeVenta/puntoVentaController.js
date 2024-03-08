const PuntoDeVentaHandlers = require('../../handlers/PuntoDeVenta/puntoVentaHandler');

class PuntoDeVentaController {
  static async get(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const puntos = await PuntoDeVentaHandlers.getById(id);
        return res.status(200).json(puntos);
      }
      const puntos = await PuntoDeVentaHandlers.getAll();
      return res.status(200).json(puntos);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async post(req, res) {
    try {
      const { companyName, address, postalCode, contactEmail, contactTel } = req.body;
      const { image } = req.files;

      const necessaryFields = ['companyName', 'address', 'postalCode', 'contactTel'];
      const fieldsMissing = necessaryFields.filter((field) => !req.body[field]);
      if (fieldsMissing.length > 0)
        throw new Error(`Campos requeridos faltantes ${fieldsMissing.join(', ')}`);

      const response = await PuntoDeVentaHandlers.post(
        companyName,
        address,
        postalCode,
        contactEmail,
        contactTel,
        image[0]
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async put(req, res) {
    try {
      const { companyName, address, postalCode, contactEmail, contactTel } = req.body;
      const image = req.file;
      const { id } = req.params;
      if (!id)
        throw new Error('Se necesita el id del punto de venta para actualizar la información');
      const response = await PuntoDeVentaHandlers.put(
        id,
        companyName,
        address,
        postalCode,
        contactEmail,
        contactTel,
        image
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Se necesita el id del punto de venta para eliminarlo');
      const response = await PuntoDeVentaHandlers.delete(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async addProveedor(req, res) {
    try {
      const { provId, id } = req.body;

      if (!id || !provId)
        throw new Error('Se debe recibir el id del punto y del proveedor para realizar la acción');
      const response = await PuntoDeVentaHandlers.addProveedores(id, provId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async removeProveedor(req, res) {
    try {
      const { id } = req.params;
      const { provId } = req.query;
      if (!id || !provId)
        throw new Error('Se debe recibir el id del punto y del proveedor para realizar la acción');
      const response = await PuntoDeVentaHandlers.removeProveedores(id, provId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PuntoDeVentaController;
