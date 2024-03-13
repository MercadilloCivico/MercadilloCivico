function validatePrecio(data, costo) {
  if (data.trim().length === 0 || !data) return 'Ingresa un valor válido';
  if (parseFloat(data) < parseFloat(costo)) return 'El precio no puede ser menor al costo';
  if (data.length > 4) return 'Máximo de 4 dígitos';
  if (data < 0) return 'Ingresa un valor válido';
  if (data > 9999) return 'El precio no puede ser mayor a $9999';
  return '';
}

function validateStock(stock) {
  if (!/^\d+$/.test(stock)) return 'El valor debe ser numérico';
  if (stock.length === 0 || !stock) return 'Ingresa un valor válido';
  if (stock.length > 4) return 'Máximo de 4 dígitos';
  if (stock < 1) return 'Ingresa un valor válido';

  return '';
}
function validateStockMin(stock, stockMin) {
  if (!/^\d+$/.test(stock)) return 'El valor debe ser numérico';
  if (parseInt(stock) < parseInt(stockMin)) return 'No puede ser mayor al stock ';
  if (stock.length === 0 || !stock) return 'Ingresa un valor válido';
  if (stock.length > 4) return 'Máximo de 4 dígitos';
  if (stock < 1) return 'Ingresa un valor válido';

  return '';
}
function validateStockMax(stock, stockMax) {
  if (!/^\d+$/.test(stock)) return 'El valor debe ser numérico';
  if (parseInt(stock) > parseInt(stockMax)) return 'No puede ser menor al stock';
  if (stock.length === 0 || !stock) return 'Ingresa un valor válido';
  if (stock.length > 4) return 'Máximo de 4 dígitos';
  if (stock < 1) return 'Ingresa un valor válido';

  return '';
}

export { validatePrecio, validateStock, validateStockMin, validateStockMax };
