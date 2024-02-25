export const validateReviewForm = ({ calificacion, tituloComentario, comentario }) => {
  const errors = {};

  if (!/^[1-5]$/.test(calificacion)) {
    errors.calificacion = 'La calificación debe ser un número del 1 al 5.';
  }

  if (!/^[1-5]$/.test(calificacion) || calificacion === '0') {
    errors.calificacion = 'La calificación debe ser un número del 1 al 5 y no puede ser 0.';
  }

  const alphanumericRegex = /^[a-zA-Z0-9,.!? ]+$/;

  if (tituloComentario && !alphanumericRegex.test(tituloComentario)) {
    errors.tituloComentario = 'El título solo permite números, letras y símbolos de escritura.';
  }

  if (comentario && !alphanumericRegex.test(comentario)) {
    errors.comentario = 'El comentario solo permite números, letras y símbolos de escritura.';
  }

  if (comentario && !tituloComentario) {
    errors.tituloComentario = 'Si se proporciona un comentario, debe haber un título.';
  }

  if (tituloComentario.length > 60) {
    errors.tituloComentario = 'El título no puede tener más de 60 caracteres.';
  }

  if (comentario.length > 300) {
    errors.comentario = 'El comentario no puede tener más de 300 caracteres.';
  }

  return errors;
};
