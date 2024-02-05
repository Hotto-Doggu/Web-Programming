const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

// URL de conexão com o MongoDB
const mongoURL = 'mongodb://localhost:27017/toyauth'; // Substitua se necessário

// Conectando ao MongoDB
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', { username: String, password: String });

const db = mongoose.connection;

// Tratamento de eventos de conexão
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB!');
});

// Configurando o Handlebars como template engine
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views', 'layouts') }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
const apiRoutes = require('./api');
const viewRoutes = require('./view');

app.use('/api', apiRoutes);
app.use('/', viewRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
