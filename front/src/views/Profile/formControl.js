let nameFormat = /^[a-zA-Z\u00C0-\u00FF\s]+$/;

function validatePassword(data) {
  // Validación de la contraseña
  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&°|,;.:{[\]}/+\\\-_"#()='¿¡<>])[A-Za-z\d@$!%*?&°|,;.:{[\]}/+\\\-_"#()='¿¡<>]{6,15}$/;

  if (data.trim().length == 0) return '';

  if (data.length < 6) {
    return 'Debe tener al menos 6 caracteres';
  }

  if (!strongPassword.test(data)) {
    return 'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial';
  }

  if (data.length < 6) return 'Debe tener al menos 6 caracteres.';

  if (data.length > 10) return 'La contraseña es muy larga.';

  return '';
}

function validateConfirm(confirmPassword, password) {
  if (password.trim() === '' && confirmPassword.trim() === '') return '';
  if (confirmPassword !== password) return 'Las contraseñas no coinciden';
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
  if (!data) return '';
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
