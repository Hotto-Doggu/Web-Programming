const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

router.post('/autenticar', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const action = req.body.action;

    let user;

    try {
        user = await User.findOne({ username });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.send('Erro ao buscar usuário.');
        return;
    }

    if (action === 'login') {
        if (user) {
            if (user.password === password) {
                res.send('Logado com sucesso!');
            } else {
                res.send('Senha incorreta.');
            }
        } else {
            res.send('Usuário e/ou senha incorretos.');
        }
    } else if (action === 'register') {
        if (user) {
            res.send('Usuário já cadastrado.');
        } else {
            const newUser = new User({ username, password });
            try {
                await newUser.save();
                res.send('Usuário cadastrado com sucesso!');
            } catch (error) {
                console.error('Erro ao cadastrar usuário:', error);
                res.send('Erro ao cadastrar usuário.');
            }
        }
    } else {
        res.send('Ação inválida.');
    }
});

module.exports = router;
