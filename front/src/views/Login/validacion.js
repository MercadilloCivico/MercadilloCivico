function validacion({ mail }) {
  const errors = {};

  // Validación del correo electrónico
  if (!mail.trim()) {
    errors.mail = 'El correo electrónico es obligatorio';
  } else if (!mail.length) {
    errors.mail = 'El email es obligatorio';
  } else if (!/\S+@\S+\.\S+/.test(mail)) {
    errors.mail = 'Email invalido';
  }
}

export default validacion;
