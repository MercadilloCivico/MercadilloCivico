const AdminFiltrosHandler = require('../../handlers/AdminFiltros/adminFiltrosHandler');

class AdminFiltrosController {
  static async filtrarProductos(req, res) {
    try {
      const { filtroPrecio, filtroEstado } = req.query;

      const productosFiltrados = await AdminFiltrosHandler.filtrarProductos(
        filtroPrecio,
        filtroEstado
      );

      res.status(200).json(productosFiltrados);
    } catch (error) {
      res.status(500).json({ message: error.message, error: 'Error al filtrar productos' });
    }
  }
}

module.exports = AdminFiltrosController;
