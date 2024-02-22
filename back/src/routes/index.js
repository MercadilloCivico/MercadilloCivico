const { Router } = require('express');
const { login, logout } = require('../controllers/authController');
const middleware = require('../../middleware/authGoogle');
const deleteUser = require('../controllers/deleteUserController');
const register = require('../controllers/registerController');

const router = Router();

// Get

router.get('/auth/google', middleware.authenticateGoogle);
router.get('/auth/google/callback', middleware.authenticateGoogleCallback);

// Post

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

// Delete

router.delete('/disable/user', deleteUser);

module.exports = router;
