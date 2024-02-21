const { Router } = require('express');
const login = require('../controllers/authController');
const middleware = require('../../middleware/authGoogle');

const router = Router();

// Get

router.get('/auth/google', middleware.authenticateGoogle);
router.get('/auth/google/callback', middleware.authenticateGoogleCallback);

// Post

router.post('/login', login);

module.exports = router;
