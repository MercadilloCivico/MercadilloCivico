const bcrypt = require('bcrypt');
const prisma = require('../../../db_connection');
const uploadToCloudinary = require('../uploadToCloudinary');
const CarritoHandler = require('../Carrito/carritoHandler');
const validationImage = require('../../utils/validations/validationImage');

const registerHandler = async (firstName, lastName, email, password, secondName, photo) => {
  try {
    const repeatEmail = await prisma.usuario.findFirst({
      where: { email },
    });
    if (repeatEmail) {
      if (repeatEmail.disabled) {
        await prisma.usuario.update({
          where: { id: repeatEmail.id },
          data: { disabled: false },
        });
        throw new Error('Su cuenta vinculada al email ha sido reactivada, por favor inicie sesión');
      } else {
        throw new Error('El email ya se encuentra registrado, por favor inicie sesión');
      }
    }
    const hashPassword = await bcrypt.hash(password, 11);
    let secureUrl;
    if (photo) {
      validationImage(photo);
      secureUrl = await uploadToCloudinary(photo);
    }
    if (secureUrl === undefined) {
      secureUrl =
        'https://www.google.com/imgres?imgurl=https%3A%2F%2Fpreviews.123rf.com%2Fimages%2Fjpgon%2Fjpgon1411%2Fjpgon141100514%2F33774342-ilustraci%25C3%25B3n-de-un-avatar-de-manzana-que-llevaba-gafas.jpg&tbnid=UvmMwIEmy6yVsM&vet=12ahUKEwi4m4bMo8qEAxV3D2IAHRDsC3kQMygDegQIARBW..i&imgrefurl=https%3A%2F%2Fes.123rf.com%2Fphoto_33774342_ilustraci%25C3%25B3n-de-un-avatar-de-manzana-que-llevaba-gafas.html&docid=Oj2hgWUxMYHODM&w=1300&h=1300&q=fotos%20de%20perfil%20avatar%20manzana&hl=es-419&ved=2ahUKEwi4m4bMo8qEAxV3D2IAHRDsC3kQMygDegQIARBW';
    }

    const newUser = await prisma.usuario.create({
      data: {
        first_name: firstName,
        second_name: secondName,
        last_name: lastName,
        email,
        password: hashPassword,
        photo: secureUrl,
      },
    });
    await CarritoHandler.post(newUser.id);
    return {
      registradoExitosamente: true,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = registerHandler;
