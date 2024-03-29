const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usuariosHandler = require('../../handlers/Usuario/usuariosHandler');
const ValidationPassword = require('../../utils/validations/validationPassword');
const { FRONT_URL, SECRET_JWT, COOKIE_SAMESITE_CONFIG } = require('../../../config/env.config');
const prisma = require('../../../db_connection');
const validationImage = require('../../utils/validations/validationImage');
const uploadToCloudinary = require('../../handlers/uploadToCloudinary');
const eliminaPhotoUtil = require('../../utils/eliminarPhoto');

class usuarios {
  static async get(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.query;

      if (id) {
        const usuario = await usuariosHandler.getById(id);
        return res.status(200).json(usuario);
      }

      if (name) {
        const usuario = await usuariosHandler.getByName(name);
        return res.status(200).json(usuario);
      }

      const users = await usuariosHandler.getAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async register(req, res) {
    try {
      const requiredFields = ['firstName', 'lastName', 'email', 'password'];
      const missingFields = requiredFields.filter((field) => !req.body[field]);
      if (missingFields.length > 0) throw new Error('Faltan los campos requeridos');
      const { firstName, lastName, email, password, secondName, rol, subscribeBlog } = req.body;
      let photo;
      if (req.files) {
        photo = req.files.image;
      }
      const error = ValidationPassword(password);
      if (error !== null) {
        throw new Error(error);
      }

      const response = await usuariosHandler.registerHandler(
        firstName,
        lastName,
        email,
        password,
        secondName,
        photo,
        rol,
        subscribeBlog
      );
      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async recuperarContrasenia(req, res) {
    try {
      const { email, password } = req.query;
      const { token } = await usuariosHandler.authHandler(email, password);
      if (token) {
        res.cookie('sessionToken', token, {
          httpOnly: true,
          maxAge: 3600000,
          sameSite: 'None',
          secure: true,
        });
        console.log('🚀 ~ usuarios ~ recuperarContrasenia ~ res:', res);
        res.redirect(`${FRONT_URL}/new_password`);
      }
    } catch (error) {
      res.redirect(`${FRONT_URL}/Token_Invalido`);
    }
  }

  static async putUsuario(req, res) {
    try {
      let token = req.cookies.sessionToken;

      const decoded = jwt.verify(token, SECRET_JWT);

      if (!decoded) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
      }
      const { firstName, secondName, lastName, email, password, rol } = req.body;
      let photo;
      if (req.files) {
        photo = req.files.image;
      }

      const dataToUpdate = {};
      if (firstName) dataToUpdate.first_name = firstName;
      if (secondName || secondName === '') dataToUpdate.second_name = secondName;
      if (lastName) dataToUpdate.last_name = lastName;
      if (email) dataToUpdate.email = email;
      if (rol) dataToUpdate.rol = rol;
      if (password) {
        const error = ValidationPassword(password);
        if (error) throw new Error(error);
        const hashPassword = await bcrypt.hash(password, 11);
        dataToUpdate.password = hashPassword;
      }
      if (photo) {
        validationImage(photo[0]);
        const secureUrl = await uploadToCloudinary(photo[0]);
        dataToUpdate.photo = secureUrl;
        await eliminaPhotoUtil(decoded.id, 'usuario');
      }
      const response = await prisma.usuario.update({
        where: { id: decoded.id },
        data: dataToUpdate,
      });

      res.clearCookie('sessionToken');
      token = jwt.sign({ id: response.id }, SECRET_JWT, { expiresIn: '1h' });
      res.cookie('sessionToken', token, {
        httpOnly: true,
        maxAge: 3600000,
        sameSite: COOKIE_SAMESITE_CONFIG,
        secure: true,
      });
      return res.status(200).json({ message: 'Datos de usuario actualizados' });
    } catch (error) {
      if (
        error.code === 'P2002' &&
        error.meta &&
        error.meta.target &&
        error.meta.target.includes('email')
      ) {
        return res
          .status(400)
          .json({ error: 'El correo electrónico ya está registrado. Por favor, elige otro.' });
      }
      return res.status(401).json({ error: error.message });
    }
  }

  static async deleteUsuario(req, res) {
    try {
      const token = req.cookies.sessionToken;
      const decoded = jwt.verify(token, SECRET_JWT);
      if (!decoded) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
      }
      const response = await usuariosHandler.deleteUserHandler(decoded.id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  static async contraseñaOlvidada(req, res) {
    try {
      const { email } = req.body;
      const response = await usuariosHandler.putEmailValidator(email);
      if (!response) {
        return res.status(400).json(response);
      }
      return res.status(200).send('Se ha enviado una nueva contraseña a su correo');
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const tokenLog = await usuariosHandler.authHandler(email, password);
      if (tokenLog) {
        res.cookie('sessionToken', tokenLog.token, {
          httpOnly: true,
          maxAge: 3600000,
          sameSite: COOKIE_SAMESITE_CONFIG,
          secure: true,
        });
        return res.status(200).json({ access: true, token: tokenLog.token, rol: tokenLog.rol });
      }
      return res.status(401).json({ access: false, message: 'Usuario o contraseña incorrectos' });
    } catch (error) {
      return res.status(500).json({ message: error.message, error: 'Error en el login' });
    }
  }

  static async logout(req, res) {
    try {
      const token = req.cookies.sessionToken;
      await usuariosHandler.logoutHandler(token);
      res.clearCookie('sessionToken', {
        httpOnly: true,
      });
      return res.status(200).json({ message: 'Cierre de sesión exitoso' });
    } catch (error) {
      return res.status(500).json({ message: error.message, error: 'Error en el logout' });
    }
  }

  static async getUser(req, res) {
    try {
      const token = req.cookies.sessionToken;

      const decoded = jwt.verify(token, SECRET_JWT);
      if (!decoded) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
      }

      const usuario = await usuariosHandler.getById(decoded.id);
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(400).json({ error: 'id de sesión inválido' });
    }
  }

  static async deleteLogic(req, res) {
    try {
      const token = req.cookies.sessionToken;
      const decoded = jwt.verify(token, SECRET_JWT);
      if (!decoded) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
      }
      const usuario = await usuariosHandler.deleteLogic(decoded.id);
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(400).json({ error: 'id de sesión inválido' });
    }
  }

  static async deleteUserByAdmin(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Se necesita el id del usuario para eliminarlo');
      const response = await usuariosHandler.deleteUserHandler(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  static async deleteLogicByAdmin(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Se necesita el id del usuario para activar/desactivarlo');
      const response = await usuariosHandler.deleteLogic(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

module.exports = { usuarios };
