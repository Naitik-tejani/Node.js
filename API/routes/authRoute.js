const express = require('express');

const routes = express.Router();

const { registerUser, loginUser, allUser } = require('../controllers/AuthController');

const { verifyToken } = require('../middleware/Auth');

routes.post('/register', registerUser)
routes.post('/login', loginUser);
routes.get('/alluser', verifyToken, allUser)


module.exports = routes;