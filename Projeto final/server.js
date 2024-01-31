// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./authRoutes/authRoutes'); // Novo módulo para rotas de autenticação
const chatRoutes = require('./routes'); // Módulo original com as rotas do chat

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/chatbot', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB!');
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Novo: Adiciona rotas de autenticação
app.use('/auth', authRoutes);

// Mantém as rotas originais do chat
app.use('/api', chatRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
