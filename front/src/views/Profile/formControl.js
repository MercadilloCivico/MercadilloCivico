let nameFormat = /^[a-zA-Z\s]+$/;

function validatePassword(data) {
  // Validación de la contraseña
  const pasMayus = /[A-Z]/;
  const pasNum = /\d/;
  const pasSpecialChars = /[@$!%*?&_-]/;

  if (data.trim().length == 0) return '';
  if (data.length < 6) return 'Debe tener al menos 6 caracteres.';
  if (!pasMayus.test(data)) return 'La contraseña debe tener al menos una Mayúscula.';
  if (!pasNum.test(data)) return 'La contraseña debe tener al menos un numero.';
  if (!pasSpecialChars.test(data)) return 'La contraseña debe tener un caracter especial';
  if (data.length > 10) return 'Contraseña muy larga.';

  return '';
}

function validateConfirm(confirmPasword, password) {
  if (password.trim() === '' && confirmPasword.trim() === '') return '';
  if (confirmPasword !== password) return 'Las contraseñas no coinciden';
  return '';
}

function validateEmail(data) {
  let emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (data.length > 35) {
    return 'Demasiado largo';
  }

  if (data.trim().length == 0) {
    return 'Este campo no puede estar vacío';
  }

  if (!emailFormat.test(data)) {
    return 'Este no es un correo';
  }

  return '';
}

function validateFirstName(data) {
  if (data.trim().length === 0) return 'El campo no puede estar vacío';
  if (data.length > 20) return 'No puede tener más de 20 caracteres';
  if (data.length < 3) return 'No puede tener menos de 3 caracteres';
  if (!nameFormat.test(data)) {
    return 'Solo se admiten letras (A-Z)';
  }
  return '';
}

function validateSecondName(data) {
  if (data.trim().length === 0) return '';
  if (data.length > 20) return 'No puede tener más de 20 caracteres';
  if (data.length < 3) return 'No puede tener menos de 3 caracteres';
  if (!nameFormat.test(data)) {
    return 'Solo se admiten letras (A-Z)';
  }

  return '';
}

function validateLastName(data) {
  if (data.trim().length === 0) return 'El campo no puede estar vacío';
  if (data.length > 20) return 'No puede tener más de 20 caracteres';
  if (data.length < 3) return 'No puede tener menos de 3 caracteres';
  if (!nameFormat.test(data)) {
    return 'Solo se admiten letras (A-Z)';
  }

  return '';
}

export {
  validateEmail,
  validateFirstName,
  validateSecondName,
  validateLastName,
  validatePassword,
  validateConfirm,
};
