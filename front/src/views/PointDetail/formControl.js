let emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let nameFormat = /^[a-zA-Z\u00C0-\u00FF\sñ.]+$/;

function validateEmail(data) {
  if (data.trim().length == 0 || !data) {
    return 'No puede estar vacío';
  }

  if (data.length > 35) {
    return 'El correo es muy largo';
  }

  if (!emailFormat.test(data)) {
    return 'Este no es un correo';
  }

  return '';
}

function validateCompany(data) {
  if (data.trim().length === 0) return 'El campo no puede estar vacío';
  if (data.length > 20) return 'No puede tener más de 20 caracteres';
  if (data.length < 3) return 'No puede tener menos de 3 caracteres';
  if (!nameFormat.test(data)) {
    return 'Solo se admiten letras (A-Z) y puntos';
  }
  return '';
}

function validateAddress(data) {
  if (!data) return '';
  if (data.trim().length < 1) return 'El campo no puede estar vacío';
  if (data.length > 20) return 'No puede tener más de 20 caracteres';
  if (data.length < 3) return 'No puede tener menos de 3 caracteres';
  if (!/^[a-zA-Z\u00C0-\u00FF\s,.()ñ\d ]+$/.test(data)) {
    return 'Se admiten letras (A-Z), números, y los caracteres , . ()';
  }

  return '';
}

function validatePostalCode(data) {
  if (!/^\d+$/.test(data)) return 'Solo se admiten valores numéricos';
  if (data.trim().length === 0) return 'El campo no puede estar vacío';
  if (data.length > 6) return 'No puede tener más de 6 dígitos';
  if (data.length < 0) return 'Ingresa un valor válido';
  return '';
}

function validatePhone(data) {
  if (!/^\d+$/.test(data)) return 'Solo se admiten valores numéricos';
  if (data.trim().length === 0) return 'El campo no puede estar vacío';
  if (data.length > 12) return 'No puede tener más de 12 dígitos';
  if (data.length < 3) return 'No puede tener menos de 3 dígitos';

  return '';
}

export { validateEmail, validateCompany, validateAddress, validatePostalCode, validatePhone };
