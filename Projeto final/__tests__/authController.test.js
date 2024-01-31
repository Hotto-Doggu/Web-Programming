// __tests__/authController.test.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { User, autenticar, cadastrar, logout } = require('../authRoutes/authController');

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

beforeEach(async () => {
  // Limpar o banco de dados entre os testes
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Testes de Autenticação', () => {
  test('Autenticar Usuário Existente', async () => {
    const mockUser = new User({ username: 'testuser', password: 'testpassword' });
    await mockUser.save();

    const req = { body: { username: 'testuser', password: 'testpassword' } };
    const res = { send: jest.fn(), status: jest.fn() };

    await autenticar(req, res);

    expect(res.send).toHaveBeenCalledWith(expect.stringContaining('Logado com sucesso!'));
  }, 30000);

  test('Autenticar Usuário Inexistente', async () => {
    const req = { body: { username: 'nonexistentuser', password: 'testpassword' } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await autenticar(req, res);

    expect(res.send).toHaveBeenCalledWith(expect.stringContaining('Usuário não encontrado.'));
  }, 30000);

  test('Logout', async () => {
    const req = { session: { user: { username: 'testuser' } } };
    const res = { send: jest.fn() };

    await logout(req, res);

    expect(res.send).toHaveBeenCalledWith(expect.stringContaining('Logout realizado'));
    expect(req.session.user).toBeUndefined();
  });
});
