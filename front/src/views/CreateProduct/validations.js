const validate = (data) => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = 'El nombre del producto es obligatorio';
  } else if (/^\s/.test(data.name)) {
    errors.name = 'El nombre no puede comenzar con un espacio en blanco';
  } else if (!/^[a-zA-Z\s]+$/.test(data.name)) {
    errors.name = 'El nombre solo puede contener letras y espacios';
  } else if (data.name.length > 30) {
    errors.name = 'El nombre no puede tener más de 30 caracteres';
  }

  if (!data.supplier.trim()) {
    errors.supplier = 'El proveedor es obligatorio';
  } else if (/^\s/.test(data.supplier)) {
    errors.supplier = 'El proveedor no puede comenzar con un espacio en blanco';
  } else if (!/^[a-zA-Z\s]+$/.test(data.supplier)) {
    errors.supplier = 'El proveedor solo puede contener letras y espacios';
  } else if (data.supplier.length > 30) {
    errors.supplier = 'El proveedor no puede tener más de 30 caracteres';
  }

  if (!data.description.trim()) {
    errors.description = 'La descripción es obligatoria';
  } else if (/^\s/.test(data.description)) {
    errors.description = 'La descripción no puede comenzar con un espacio en blanco';
  } else if (!/^[a-zA-Z0-9,.!? ]+$/.test(data.description)) {
    errors.description =
      'La descripción solo puede contener letras, números y los siguientes símbolos: , . ! ?';
  } else if (data.description.length > 300) {
    errors.description = 'La descripción no puede tener más de 300 caracteres';
  }

  if (!data.img) {
    errors.img = 'La imagen es obligatoria';
  }

  if (data.price <= 0 || /^\d*\.?\d*$/.test(data.price) === false || /^0\d/.test(data.price)) {
    errors.price = 'Ingrese un precio válido mayor que cero';
  } else if (data.price > 9999) {
    errors.price = 'El precio no puede ser mayor a $9999';
  }

  if (data.stock < 0 || /^\d*\.?\d*$/.test(data.stock) === false || /^0\d/.test(data.stock)) {
    errors.stock = 'Ingrese un valor de stock válido';
  } else if (data.stock > 999) {
    errors.stock = 'El stock no puede ser mayor a 999';
  }

  return errors;
};

export default validate;
