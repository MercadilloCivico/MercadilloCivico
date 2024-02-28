// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usuariosHandler = require('../../handlers/Usuario/usuariosHandler');
const ValidationPassword = require('../../utils/validations/validationPassword');
const { FRONT_URL } = require('../../../config/env.config');
// const { SECRET_JWT } = require('../../../config/env.config');
// const prisma = require('../../../db_connection');
const validationImage = require('../../utils/validations/validationImage');
const uploadToCloudinary = require('../../handlers/uploadToCloudinary');
// const eliminaPhotoUtil = require('../../utils/eliminarPhoto');

class usuarios {
  static async get(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const usuario = await usuariosHandler.getById(id);
        res.status(200).json(usuario);
      } else {
        const users = await usuariosHandler.getAll();
        res.status(200).json(users);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async register(req, res) {
    try {
      const requiredFields = ['firstName', 'lastName', 'email', 'password'];
      const missingFields = requiredFields.filter((field) => !req.body[field]);
      if (missingFields.length > 0) throw new Error('Faltan los campos requeridos');
      const { firstName, lastName, email, password, secondName } = req.body;
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
        photo
      );
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async recuperarContrasenia(req, res) {
    try {
      const { email, password } = req.query;

      const response = await usuariosHandler.authHandler(email, password);
      if (response) {
        res.cookie('sessionToken', response, {
          httpOnly: true,
          maxAge: 3600000,
        });
        res.redirect(`${FRONT_URL}/Nueva`);
      }
    } catch (error) {
      res.redirect(`${FRONT_URL}`);
      res.status(500).json({ message: error.message, error: 'Error en el login' });
    }
  }

  static async putUsuario(req, res) {
    try {
      // falta validar contraseña y hacer prueba con el front
      // let token = req.cookies.sessionToken;

      // const decoded = jwt.verify(token, SECRET_JWT);
      // if (!decoded) {
      //   res.status(401).json({ message: 'Acceso no autorizado' });
      // }

      const { firstName, secondName, lastName, email, password, rol } = req.body;
      const photo = req.file;

      // Construir objeto de datos a actualizar
      const dataToUpdate = {};
      if (firstName) dataToUpdate.first_name = firstName;
      if (secondName) dataToUpdate.second_name = secondName;
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
        validationImage(photo);
        const secureUrl = uploadToCloudinary(photo);
        dataToUpdate.photo = secureUrl;
        // eliminaPhotoUtil(decoded.id, 'usuario'); descomentar cuando alla un token
      }

      // Actualizar usuario en la base de datos
      // const response = await prisma.usuario.update({
      //   where: { id: decoded.id },
      //   data: dataToUpdate,
      // });

      // token = jwt.sign({ id: response.id }, SECRET_JWT, { expiresIn: '1h' });
      // res.cookie('sessionToken', token, {
      //   httpOnly: true,
      //   maxAge: 3600000,
      // });
      res.status(200).json({ message: 'Datos de usuario actualizados' });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  static async deleteUsuario(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        throw new Error('Porfavor ingrese los datos solicitados para dicha acción');
      const response = await usuariosHandler.deleteUserHandler(email, password);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  static async contraseñaOlvidada(req, res) {
    try {
      const { email } = req.body;
      const response = await usuariosHandler.putEmailValidator(email);
      if (!response) {
        res.status(400).json(response);
      }
      res.status(200).send('Se ha enviado una nueva contraseña a su correo');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const token = await usuariosHandler.authHandler(email, password);

      res.cookie('sessionToken', token, {
        httpOnly: true,
        maxAge: 3600000,
      });

      res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      res.status(500).json({ message: error.message, error: 'Error en el login' });
    }
  }

  static async logout(req, res) {
    try {
      const token = req.cookies.sessionToken;
      await usuariosHandler.logoutHandler(token);
      res.clearCookie('sessionToken');
      res.status(200).json({ message: 'Cierre de sesión exitoso' });
    } catch (error) {
      res.status(500).json({ message: error.message, error: 'Error en el logout' });
    }
  }
}

module.exports = usuarios;
