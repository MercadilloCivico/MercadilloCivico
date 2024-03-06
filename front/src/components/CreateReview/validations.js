export const validateReviewForm = ({ calification, coment }) => {
  const errors = {};

  if (!/^[1-5]$/.test(calification)) {
    errors.calification = 'La calificación debe ser un número del 1 al 5.';
  }

  if (!/^[1-5]$/.test(calification) || calification === '0') {
    errors.calification = 'La calificación debe ser un número del 1 al 5 y no puede ser 0.';
  }

  const alphanumericRegex = /^[a-zA-Z0-9,.¡!¿?() ]+$/;

  // if (tituloComentario && !alphanumericRegex.test(tituloComentario)) {
  //   errors.tituloComentario = 'El título solo permite números, letras y símbolos de escritura.';
  // }

  if (coment && !alphanumericRegex.test(coment)) {
    errors.coment =
      'La descripción solo puede contener letras, números y los siguientes símbolos: , . ¡! ¿? ()';
  }
  // if (coment && !tituloComentario) {
  //   errors.tituloComentario = 'Si se proporciona un coment, debe haber un título.';
  // }

  // if (tituloComentario.length > 60) {
  //   errors.tituloComentario = 'El título no puede tener más de 60 caracteres.';
  // }

  if (coment.length > 300) {
    errors.coment = 'El comentario no puede tener más de 300 caracteres.';
  }

  return errors;
};
