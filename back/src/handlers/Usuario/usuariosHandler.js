const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../../db_connection');
const uploadToCloudinary = require('../uploadToCloudinary');
const CarritoHandler = require('../Carrito/carritoHandler');
const validationImage = require('../../utils/validations/validationImage');
const { SECRET_JWT } = require('../../../config/env.config');

const validTokens = new Set();
const sendRecoveryEmail = require('../../utils/mails');

class usuariosHandler {
  static async getAll() {
    try {
      const usuarios = await prisma.usuario.findMany({
        include: {
          resenas: true,
          carrito: true,
          compras: true,
          proveedor: true,
          favorites: true,
        },
      });
      return usuarios;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getById(id) {
    try {
      const usuario = await prisma.usuario.findFirst({
        where: {
          id,
        },
        include: {
          resenas: true,
          carrito: true,
          compras: true,
          proveedor: true,
          favorites: true,
        },
      });
      return usuario;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getByName(name) {
    try {
      const usuario = await prisma.usuario.findMany({
        include: {
          resenas: true,
          carrito: true,
          compras: true,
          proveedor: true,
          favorites: true,
        },
      });
      const usuariosName = usuario.filter((u) => {
        const userName = u.first_name;
        return userName.toLowerCase().startsWith(name.toLowerCase());
      });
      return usuariosName;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async registerHandler(firstName, lastName, email, password, secondName, photo) {
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
          throw new Error(
            'Su cuenta vinculada al email ha sido reactivada, por favor inicie sesión'
          );
        } else {
          throw new Error('El email ya se encuentra registrado, por favor inicie sesión');
        }
      }
      const hashPassword = await bcrypt.hash(password, 11);
      let secureUrl;
      if (photo) {
        validationImage(photo[0]);
        secureUrl = await uploadToCloudinary(photo[0]);
      }
      if (secureUrl === undefined) {
        secureUrl =
          'https://previews.123rf.com/images/jpgon/jpgon1411/jpgon141100514/33774342-ilustraci%C3%B3n-de-un-avatar-de-manzana-que-llevaba-gafas.jpg';
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
  }

  static async authHandler(email, password) {
    try {
      const user = await prisma.usuario.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error('El usuario no está registrado. Por favor, regístrese primero.');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error('Contraseña incorrecta');
      }

      const token = jwt.sign({ id: user.id }, SECRET_JWT, { expiresIn: '1h' });
      validTokens.add(token);
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteUserHandler(id) {
    try {
      const user = await prisma.usuario.findUnique({
        where: { id },
        include: {
          carrito: true,
          proveedor: true,
          compras: true,
          resenas: true,
          favorites: true,
        },
      });

      if (!user) {
        return { usuarioEliminadoCorrectamente: false, mensaje: 'Usuario no encontrado' };
      }

      const { carrito, proveedor } = user;

      if (carrito) {
        // Eliminar el carrito antes de eliminar al usuario
        await prisma.carrito_de_Compras.delete({
          where: {
            id: carrito.id,
          },
        });
      }

      if (proveedor) {
        await prisma.proveedor.delete({
          where: {
            id: proveedor.id,
          },
        });
      }

      await prisma.usuario.delete({
        where: {
          id,
        },
      });

      return { usuarioEliminadoCorrectamente: true };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async putEmailValidator(email) {
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
  }

  static async logoutHandler(token) {
    try {
      validTokens.delete(token);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = usuariosHandler;
