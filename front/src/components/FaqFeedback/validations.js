const validate = (data) => {
  const errors = {};

  if (!data.correo.trim()) {
    errors.correo = 'El correo electrónico es obligatorio';
  } else if (!data.correo.length) {
    errors.correo = 'El correo electrónico es obligatorio';
  } else if (!/\S+@\S+\.\S+/.test(data.correo)) {
    errors.correo = 'Correo electrónico invalido';
  }

  if (!data.opinion.trim()) {
    errors.opinion = 'La opinión es obligatoria';
  } else if (/^\s/.test(data.opinion)) {
    errors.opinion = 'La opinión no puede comenzar con un espacio en blanco';
  } else if (!/^[a-zA-Z\u00C0-\u00FF\s,.¡!¿?()/ñ ]+$/.test(data.opinion)) {
    errors.opinion =
      'La opinión solo puede contener letras, números y los siguientes símbolos: , . ¡! ¿? () /';
  } else if (data.opinion.length > 300) {
    errors.opinion = 'La opinión no puede tener más de 300 caracteres';
  }

  return errors;
};

export default validate;
