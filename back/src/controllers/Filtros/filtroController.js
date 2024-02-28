const FiltroHandler = require('../../handlers/Filtro/filtroHandler');

class FiltroController {
  static async filterProductos(req, res) {
    try {
      const { filtroMarca, filtroPrecio, calificacion, alfabetico, precio } = req.query;
      const { id } = req.params;
      const filteredProducts = await FiltroHandler.filterProductos(
        id,
        filtroMarca,
        filtroPrecio,
        calificacion,
        alfabetico,
        precio
      );
      res.status(200).json(filteredProducts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = FiltroController;
