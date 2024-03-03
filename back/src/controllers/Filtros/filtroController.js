const FiltroHandler = require('../../handlers/Filtro/filtroHandler');

class FiltroController {
  static async filterProductos(req, res) {
    try {
      const { filtroMarca, filtroPrecio, calificacion, alfabetico, precio, name } = req.query;
      const { id } = req.params;
      if (!id) return res.status(200).json({ filtro: 'sin fitros' });
      const filteredProducts = await FiltroHandler.filterProductos(
        id,
        filtroMarca,
        filtroPrecio,
        calificacion,
        alfabetico,
        precio,
        name
      );
      return res.status(200).json(filteredProducts);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = FiltroController;
