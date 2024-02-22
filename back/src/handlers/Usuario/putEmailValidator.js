const bcrypt = require('bcrypt');
const prisma = require('../../../db_connection');
const sendRecoveryEmail = require('../../utils/mails');

const putEmailValidator = async (email) => {
  try {
    const repeatEmail = await prisma.usuario.findFirst({
      where: { email },
    });
    if (!repeatEmail) {
      throw new Error('El email no se encuentra registrado por favor registrese');
    }
    if (repeatEmail.disabled) {
      throw new Error('El usuario se encuentra deshabilitado');
    }
    const tokenRecuperacionDeCuenta = Math.floor(100000 + Math.random() * 900000);
    const hashToken = await bcrypt.hash(tokenRecuperacionDeCuenta.toString(), 11);

    await prisma.usuario.update({
      where: {
        email: repeatEmail.email,
      },
      data: {
        password: hashToken,
      },
    });

    await sendRecoveryEmail(repeatEmail.email, tokenRecuperacionDeCuenta);

    return true;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = putEmailValidator;
