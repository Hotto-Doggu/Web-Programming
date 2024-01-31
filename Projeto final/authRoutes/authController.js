// authController.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  chats: [
    {
      withUser: String,
      messages: [
        {
          sender: String,
          content: String,
        },
      ],
    },
  ],
});

const User = mongoose.model('User', UserSchema);

const autenticar = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Dados de entrada inválidos.');
  }

  try {
    const user = await User.findOne({ username });

    if (user) {
      if (user.password === password) {
        return res.send('Logado com sucesso!');
      } else {
        return res.status(401).send('Senha incorreta.');
      }
    } else {
      return res.status(404).send('Usuário não encontrado.');
    }
  } catch (error) {
    console.error('Erro durante a autenticação:', error);
    return res.status(500).send('Erro durante a autenticação.');
  }
};

const cadastrar = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Dados de entrada inválidos.');
  }

  try {
    const user = await User.findOne({ username });

    if (user) {
      return res.status(409).send('Usuário já cadastrado.');
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      return res.send('Usuário cadastrado com sucesso!');
    }
  } catch (error) {
    console.error('Erro durante o cadastro:', error);
    return res.status(500).send('Erro durante o cadastro.');
  }
};

module.exports = { User, autenticar, cadastrar };
