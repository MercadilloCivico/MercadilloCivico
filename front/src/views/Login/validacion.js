function validacion({ name, lastname, mail, password, repeatPassword }) {
  const onlyLetters = /^[A-Za-zÁáÉéÍíÓóÚúÑñ]{1,15}$/;
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const errors = {};

  // Validación del nombre
  if (!name.trim()) {
    errors.name = 'El nombre es obligatorio';
  } else if (name.length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres';
  } else if (name.length > 15) {
    errors.name = 'El nombre debe tener menos de 15 caracteres';
  } else if (!onlyLetters.test(name)) {
    errors.name = 'El nombre solo puede contener letras';
  } else if (!name.length) {
    errors.name = 'El nombre es obligatorio';
  }
  // Validación del apellido
  if (!lastname.trim()) {
    errors.lastname = 'El apellido es obligatorio';
  } else if (lastname.length < 3) {
    errors.lastname = 'El apellido debe tener al menos 3 caracteres';
  } else if (!onlyLetters.test(lastname)) {
    errors.lastname = 'El apellido solo puede contener letras';
  } else if (!lastname.length) {
    errors.lastname = 'El apellido es obligatorio';
  }

  // Validación del correo electrónico
  if (!mail.trim()) {
    errors.mail = 'El correo electrónico es obligatorio';
  } else if (!mail.length) {
    errors.mail = 'El email es obligatorio';
  } else if (!/\S+@\S+\.\S+/.test(mail)) {
    errors.mail = 'Email invalido';
  }

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
}

export default validacion;
