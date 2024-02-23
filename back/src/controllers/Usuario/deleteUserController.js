const deleteUserHandler = require('../../handlers/Usuario/deleteUserHandler');

const deleteUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error('Porfavor ingrese los datos solicitados para dicha acción');
    const response = await deleteUserHandler(email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = deleteUser;
