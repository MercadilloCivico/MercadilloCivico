function validacion({ firstName, secondName, lastName, email, password, repeatPassword }) {
  const onlyLetters = /^[A-Za-zÁáÉéÍíÓóÚúÑñ]{1,15}$/;
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const errors = {};

  // Validación del nombre
  if (!firstName.trim()) {
    errors.firstName = 'El nombre es obligatorio';
  } else if (firstName.length < 3) {
    errors.firstName = 'El nombre debe tener al menos 3 caracteres';
  } else if (!onlyLetters.test(firstName)) {
    errors.firstName = 'El nombre solo puede contener letras';
  } else if (!firstName.length) {
    errors.firstName = 'El nombre es obligatorio';
  }
  // La validación del segundo nombre se realiza solo si hay un valor
  if (secondName && (secondName.length < 3 || !onlyLetters.test(secondName))) {
    errors.secondName =
      'El segundo nombre debe tener al menos 3 caracteres y solo puede contener letras';
  }
  // Validación del apellido
  if (!lastName.trim()) {
    errors.lastname = 'El apellido es obligatorio';
  } else if (lastName.length < 3) {
    errors.lastname = 'El apellido debe tener al menos 3 caracteres';
  } else if (!onlyLetters.test(lastName)) {
    errors.lastname = 'El apellido solo puede contener letras';
  } else if (!lastName.length) {
    errors.lastName = 'El apellido es obligatorio';
  }

  // Validación del correo electrónico
  if (!email.trim()) {
    errors.email = 'El correo electrónico es obligatorio';
  } else if (!email.length) {
    errors.email = 'El email es obligatorio';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Email invalido';
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
