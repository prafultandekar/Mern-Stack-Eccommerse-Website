const express = require('express');
const { registerController, loginController ,testController} = require('../controllers/authController');
const {requireSignIn , isAdmin} = require('../middleweres/authMiddlewere');

const router = express.Router();

// Define your route handlers for authentication


router.post('/register', registerController)
  // Handle user registration functionality

 router.post('/login', loginController)

 router.get('/test' ,requireSignIn ,  testController)

module.exports = router;
