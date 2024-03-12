const AdminFiltrosHandler = require('../../handlers/AdminFiltros/adminFiltrosHandler');

class AdminFiltrosController {
  static async filtrarProductos(req, res) {
    try {
      const { filtroMarca, filtroEstado, name, orderType } = req.query;

      const productosFiltrados = await AdminFiltrosHandler.filtrarProductos(
        filtroMarca,
        filtroEstado,
        name,
        orderType
      );

      return res.status(200).json(productosFiltrados);
    } catch (error) {
      return res.status(500).json({ message: error.message, error: 'Error al filtrar productos' });
    }
  }
}

module.exports = AdminFiltrosController;
