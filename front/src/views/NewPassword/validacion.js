// validacion.js

const validacion = (passwordData) => {
  const { password, repeatPassword } = passwordData;
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const errors = {};

  // Validación de la contraseña
  if (!password.trim()) {
    errors.password = 'La contraseña es obligatoria';
  } else if (password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  } else if (!strongPassword.test(password)) {
    errors.password =
      'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial';
  }
  // Validación de la repetición de contraseña
  if (!repeatPassword.trim()) {
    errors.repeatPassword = 'Debes repetir la contraseña';
  } else if (password !== repeatPassword) {
    errors.repeatPassword = 'Las contraseñas no coinciden';
  }
  if (!password.length) {
    errors.password = 'La contraseña es obligatoria';
  }
  return errors;
};

export default validacion;
