//index.js
const express = require('express');
const router = express.Router();
const { handleUserQuery } = require('./queryController');

router.post('/query', handleUserQuery);

module.exports = router;
