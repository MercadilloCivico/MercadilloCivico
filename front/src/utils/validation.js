const onlyLetters = /^[A-Za-zÁáÉéÍíÓóÚúÑñ]{1,15}$/;
const onlyNumbers = /^[0-9+]+$/;
const onlyLettersAndSpaces = /^[A-Za-z\s]+$/;

const strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&°|,;.:{[\]}/+\\\-_"#()='¿¡<>])[A-Za-z\d@$!%*?&°|,;.:{[\]}/+\\\-_"#()='¿¡<>]{6,15}$/;

const emailValidation = (email, errors) => {
  if (!email.trim()) {
    errors.email = 'El correo electrónico es obligatorio';
  } else if (!email.length) {
    errors.email = 'El email es obligatorio';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Email invalido';
  }
  return errors;
};

const passwordValidation = (password, errors) => {
  if (!password.trim()) {
    errors.password = 'La contraseña es obligatoria';
  } else if (password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  } else if (!strongPassword.test(password)) {
    errors.password =
      'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial';
  }
  return errors;
};

const repeatPasswordValidation = (password, repeatPassword, errors) => {
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

const firstNameValidation = (firstName, errors) => {
  if (!firstName.trim()) {
    errors.firstName = 'El nombre es obligatorio';
  } else if (firstName.length < 3) {
    errors.firstName = 'El nombre debe tener al menos 3 caracteres';
  } else if (firstName.length > 15) {
    errors.firstName = 'El nombre no puede tener más de 15 caracteres';
  } else if (!onlyLetters.test(firstName)) {
    errors.firstName = 'El nombre solo puede contener letras';
  } else if (!firstName.length) {
    errors.firstName = 'El nombre es obligatorio';
  }
  return errors;
};

const secondNameValidation = (secondName, errors) => {
  if (secondName) {
    if (secondName.trim() === '') {
      errors.secondName = 'El segundo nombre es requerido';
    } else if (secondName.length < 3) {
      errors.secondName = 'El segundo nombre debe tener al menos 3 caracteres';
    } else if (!/^[a-zA-Z\s]*$/.test(secondName)) {
      errors.secondName = 'El segundo nombre solo puede contener letras';
    }
  }
  return errors;
};

const lastNameValidation = (lastName, errors) => {
  if (!lastName.trim()) {
    errors.lastname = 'El apellido es obligatorio';
  } else if (lastName.length < 3) {
    errors.lastname = 'El apellido debe tener al menos 3 caracteres';
  } else if (!onlyLetters.test(lastName)) {
    errors.lastname = 'El apellido solo puede contener letras';
  } else if (!lastName.length) {
    errors.lastName = 'El apellido es obligatorio';
  }
  return errors;
};

export const registerValidation = ({
  firstName,
  secondName,
  lastName,
  email,
  password,
  repeatPassword,
}) => {
  const errors = {};
  firstNameValidation(firstName, errors);
  secondNameValidation(secondName, errors);
  lastNameValidation(lastName, errors);
  emailValidation(email, errors);
  passwordValidation(password, errors);
  repeatPasswordValidation(password, repeatPassword, errors);
  return errors;
};

export const validacionProveedor = (data) => {
  const errors = {};

  // validar nombre de proveedor
  if (!data.nameProv || !data.nameProv.trim()) {
    errors.nameProv = 'Nombre de proveedor obligatorio';
  } else if (data.nameProv.length < 3) {
    errors.nameProv = 'Nombre de proveedor debe tener al menos 3 caracteres';
  } else if (!onlyLettersAndSpaces.test(data.nameProv)) {
    errors.nameProv = 'Nombre de proveedor solo puede contener letras';
  }

  // validar el telefono
  if (!data.tel || !data.tel.trim()) {
    errors.tel = 'Número de teléfono obligatorio';
  } else if (!onlyNumbers.test(data.tel)) {
    errors.tel = 'Número de teléfono inválido';
  }

  // validar la ubicación

  return errors;
};

export const newPasswordValidation = ({ password, repeatPassword }) => {
  const errors = {};
  passwordValidation(password, errors);
  repeatPasswordValidation(password, repeatPassword, errors);
  return errors;
};

export const loginValidation = ({ email, password }) => {
  const errors = {};
  emailValidation(email, errors);
  passwordValidation(password, errors);
  return errors;
};

export const cardValidation = ({ number, name, expMonth, expYear, cvc }) => {
  const errors = {};
  if (number.length < 16) {
    errors.number = 'El número de tarjeta debe tener 16 dígitos';
  }
  if (name.length < 3) {
    errors.name = 'Nombre inválido';
  }
  if (expMonth.length < 2) {
    errors.expMonth = 'El mes de expiración debe tener 2 dígitos';
  }
  if (expYear.length < 4) {
    errors.expYear = 'El año de expiración debe tener 4 dígitos';
  }
  //validar que no haya pasado ya el año
  if (expYear < new Date().getFullYear()) {
    errors.expYear = 'El año de expiración no puede ser menor al actual';
  }
  if (cvc.length < 3) {
    errors.cvc = 'El código de seguridad debe tener 3 dígitos';
  }
  return errors;
};
