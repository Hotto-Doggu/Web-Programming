// __tests__/authController.test.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { User, autenticar, cadastrar } = require('../authRoutes/authController');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
    db.once('open', () => {
        console.log('Conectado ao MongoDB!');
    });
});

afterAll(async () => {
    await mongoose.disconnect(); // Alterado para mongoose.disconnect()
    await mongoServer.stop();
});

describe('Testes de Autenticação', () => {
    test('Autenticar Usuário Existente', async () => {
        // Criando um mock para a função `save` do mongoose
        jest.spyOn(User.prototype, 'save').mockResolvedValueOnce();

        const mockUser = new User({ username: 'testuser', password: 'testpassword' });
        await mockUser.save();

        const req = { body: { username: 'testuser', password: 'testpassword' } };
        const res = { send: jest.fn(), status: jest.fn() }; // Adicionado status

        await autenticar(req, res);

        expect(res.send).toHaveBeenCalledWith(expect.stringContaining('Logado com sucesso!'));
    }, 30000); // Aumentando o timeout para 30 segundos

    test('Autenticar Usuário Inexistente', async () => {
        // Certifique-se de que o usuário não existe no início do teste
        await User.deleteMany({});

        const req = { body: { username: 'nonexistentuser', password: 'testpassword' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        await autenticar(req, res);

        expect(res.send).toHaveBeenCalledWith(expect.stringContaining('Usuário não encontrado.'));
    }, 30000); // Aumentando o timeout para 30 segundos
});
