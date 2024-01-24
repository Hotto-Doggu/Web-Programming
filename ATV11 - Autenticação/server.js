const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/autenticar', async (req, res) => {
    const { username, password, action } = req.body;

    // Validação de dados de entrada
    if (!username || !password || !action) {
        return res.status(400).send('Dados de entrada inválidos.');
    }

    try {
        const user = await User.findOne({ username });

        if (action === 'login') {
            if (user) {
                if (user.password === password) {
                    return res.send('Logado com sucesso!');
                } else {
                    return res.status(401).send('Senha incorreta.');
                }
            } else {
                return res.status(404).send('Usuário não encontrado.');
            }
        } else if (action === 'register') {
            if (user) {
                return res.status(409).send('Usuário já cadastrado.');
            } else {
                const newUser = new User({ username, password });
                await newUser.save();
                return res.send('Usuário cadastrado com sucesso!');
            }
        } else {
            return res.status(400).send('Ação inválida.');
        }
    } catch (error) {
        console.error('Erro durante a autenticação/cadastro:', error);
        return res.status(500).send('Erro durante a autenticação/cadastro.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
