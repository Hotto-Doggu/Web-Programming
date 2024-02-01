// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('./authController');

router.post('/autenticar', authController.autenticar);
router.post('/cadastrar', authController.cadastrar);
router.post('/logout', authController.logout); 
router.get('/getCurrentUser', authController.getCurrentUser);
router.get('/conversas', authController.getConversations);

module.exports = router;
