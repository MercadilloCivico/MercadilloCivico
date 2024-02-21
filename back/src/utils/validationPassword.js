function ValidationPassword(inputs) {
  const pasMayus = /[A-Z]/;
  const pasNum = /\d/;
  const pasCharterEs = /[@$!%*?&_-]/;
  let error = '';

  if (!pasMayus.test(inputs)) error += 'La contraseña debe tener al menos una Mayúscula, ';
  if (!pasNum.test(inputs)) error += 'La contraseña debe tener al menos un numero, ';
  if (!pasCharterEs.test(inputs))
    error += 'La contraseña debe tener al menos un carácter especial, ';
  if (inputs.length < 6) error += 'Contraseña muy corta, debe tener al menos 6 caracteres, ';
  if (inputs.length > 10) error += 'contraseña muy larga, ';

  return error === '' ? null : error;
}

module.exports = ValidationPassword;
