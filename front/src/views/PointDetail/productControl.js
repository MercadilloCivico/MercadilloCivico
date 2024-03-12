function validatePrecio(data) {
  if (data.trim().length === 0 || !data) return 'Ingresa un valor válido';
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

export { validatePrecio, validateStock };
