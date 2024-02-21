const { Router } = require('express');
const login = require('../controllers/authController');
const middleware = require('../../middleware/authGoogle');
const register = require('../controllers/registerController');

const router = Router();

// Get

router.get('/auth/google', middleware.authenticateGoogle);
router.get('/auth/google/callback', middleware.authenticateGoogleCallback);

// Post

router.post('/login', login);
router.post('/register', register);

module.exports = router;
