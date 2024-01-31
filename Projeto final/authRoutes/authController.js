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
        req.session.user = user; // Armazena o usuário na sessão
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

const getCurrentUser = async (req, res) => {
  try {
    const user = req.session.user;

    if (user) {
      return res.status(200).json({ username: user.username });
    } else {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    return res.status(500).json({ error: 'Erro ao obter usuário atual' });
  }
};

const logout = (req, res) => {
    try {
        // Destruir a sessão no servidor
        req.session.destroy((err) => {
        if (err) {
            console.error('Erro durante o logout:', err);
            return res.status(500).send('Erro durante o logout.');
        }
        
        // Limpar o cookie de sessão no cliente
        res.clearCookie(req.sessionID); // Alterado de req.session.cookie.name para req.sessionID
        
        return res.send('Logout realizado com sucesso!');
        });
    } catch (error) {
        console.error('Erro durante o logout:', error);
        return res.status(500).send('Erro durante o logout.');
    }
};
  
module.exports = { User, getCurrentUser, autenticar, cadastrar, logout };