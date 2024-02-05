//server.js
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./authRoutes/authRoutes');
const chatRoutes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;
const mongoDBURI = 'mongodb://localhost:27017/chatbot';

// Conexão com o MongoDB
mongoose.connect(mongoDBURI);
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Erro de conexão ao MongoDB:', error);
  process.exit(1); // Encerra o processo em caso de erro na conexão
});

db.once('open', () => {
  console.log('Conectado ao MongoDB!');
});

// Configuração da middleware de sessão com armazenamento no MongoDB
const store = new MongoDBStore({
  uri: mongoDBURI,
  collection: 'sessions',
});

// Tratamento de erros 
store.on('error', (error) => {
  console.error('Erro na sessão MongoDB:', error);
});

app.use(
  session({
    secret: 'seuSegredoAqui',
    resave: true,
    saveUninitialized: true,
    store: store,
  })
);

// Permitir que as requisições possam acessar a sessão
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
  });

// Configuração do Middleware Estático
app.use(express.static('public'));

// Configuração do Body Parser:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas de autenticação
app.use('/auth', authRoutes);
// Rotas do chat
app.use('/api', chatRoutes);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

// Início do servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
