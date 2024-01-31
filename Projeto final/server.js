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

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas de autenticação
app.use('/auth', authRoutes);
// Rotas originais do chat
app.use('/api', chatRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
