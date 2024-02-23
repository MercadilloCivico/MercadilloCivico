const usuariosHandler = require('../../handlers/Usuario/usuariosHandler');
const ValidationPassword = require('../../utils/validations/validationPassword');

class usuarios {
  static async register(req, res) {
    try {
      const requiredFields = ['firstName', 'lastName', 'email', 'password'];
      const missingFields = requiredFields.filter((field) => !req.body[field]);
      if (missingFields.length > 0) throw new Error('Faltan los campos requeridos');
      const { firstName, lastName, email, password, secondName } = req.body;
      let photo;
      if (req.file) {
        photo = req.file;
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
}

module.exports = usuarios;
