const validate = (data) => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = 'El nombre del producto es obligatorio';
  } else if (/^\s/.test(data.name)) {
    errors.name = 'El nombre no puede comenzar con un espacio en blanco';
    // } else if (!/^[a-zA-Z\s]+$/.test(data.name)) {
    //   errors.name = 'El nombre solo puede contener letras y espacios';
    // para poder agregar puntos, o números como las unidades de un producto o abreviaciones
  } else if (data.name.length > 15) {
    errors.name = 'El nombre no puede tener más de 15 caracteres';
  }

  if (!data.marca.trim()) {
    errors.marca = 'La marca es obligatorio';
  } else if (/^\s/.test(data.marca)) {
    errors.marca = 'La marca no puede comenzar con un espacio en blanco';
  } else if (!/^[a-zA-Z\u00C0-\u00FF\sñ]+$/.test(data.marca)) {
    errors.marca = 'La marca solo puede contener letras y espacios';
  } else if (data.marca.length > 15) {
    errors.marca = 'La marca no puede tener más de 30 caracteres';
  }

  if (!data.description.trim()) {
    errors.description = 'La descripción es obligatoria';
  } else if (/^\s/.test(data.description)) {
    errors.description = 'La descripción no puede comenzar con un espacio en blanco';
  } else if (!/^[a-zA-Z\u00C0-\u00FF\s,.¡!¿?()/ñ ]+$/.test(data.description)) {
    errors.description =
      'La descripción solo puede contener letras, números y los siguientes símbolos: , . ¡! ¿? () /';
  } else if (data.description.length > 300) {
    errors.description = 'La descripción no puede tener más de 300 caracteres';
  }

  if (!data.photo) {
    errors.photo = 'La imagen es obligatoria';
  }

  if (data.costo <= 0 || /^\d*\.?\d*$/.test(data.costo) === false || /^0\d/.test(data.costo)) {
    errors.costo = 'Ingrese un precio válido mayor que cero';
  } else if (data.costo > 9999) {
    errors.costo = 'El precio no puede ser mayor a $9999';
  }

  return errors;
};

export default validate;
