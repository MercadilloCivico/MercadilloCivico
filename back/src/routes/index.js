const { Router } = require('express');
const { login, logout } = require('../controllers/authController');
const middleware = require('../../middleware/authGoogle');
const deleteUser = require('../controllers/deleteUserController');
const register = require('../controllers/registerController');
const contraseñaOlvidada = require('../controllers/contraseñaOlvidada');
const recuperarContrasenia = require('../controllers/recuperarContraseña');
const putContrasenia = require('../controllers/putContraseña');
const postProduct = require('../controllers/postProductController');

const router = Router();

// Get

router.get('/auth/google', middleware.authenticateGoogle);
router.get('/auth/google/callback', middleware.authenticateGoogleCallback);
router.get('/forgot/password', recuperarContrasenia);

// Post

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.post('/postProduct', postProduct);

// Delete
router.delete('/disable/user', deleteUser);

// Put
router.put('/forgot/password', contraseñaOlvidada);
router.put('/change/password', putContrasenia);

module.exports = router;
