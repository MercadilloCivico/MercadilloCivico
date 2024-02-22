const { Router } = require('express');
const { login, logout } = require('../controllers/Usuario/authController');
const middleware = require('../../middleware/authGoogle');
const deleteUser = require('../controllers/deleteUserController');
const register = require('../controllers/registerController');
const contraseñaOlvidada = require('../controllers/contraseñaOlvidada');
const recuperarContrasenia = require('../controllers/recuperarContraseña');
const putContrasenia = require('../controllers/putContraseña');
const postProduct = require('../controllers/postProductController');
const validateProductFields = require('../../middleware/validateProductFields');
const deleteUser = require('../controllers/Usuario/deleteUserController');
const register = require('../controllers/Usuario/registerController');
const contraseñaOlvidada = require('../controllers/Usuario/contraseñaOlvidada');
const recuperarContrasenia = require('../controllers/Usuario/recuperarContraseña');
const putUsuario = require('../controllers/Usuario/putUsuarioController');
const FavoriteControllers = require('../controllers/Usuario/favoritesController');

const router = Router();

// Get

router.get('/auth/google', middleware.authenticateGoogle);
router.get('/auth/google/callback', middleware.authenticateGoogleCallback);
router.get('/forgot/password', recuperarContrasenia);
router.get('/favorites/:id?', FavoriteControllers.get);

// Post

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.post('/postProduct', validateProductFields, postProduct);
router.post('/favorites/:id', FavoriteControllers.addFav);

// Delete

router.delete('/disable/user', deleteUser);
router.delete('/favorites/:id');

// Put

router.put('/forgot/password', contraseñaOlvidada);
router.put('/update/user', putUsuario);

module.exports = router;
