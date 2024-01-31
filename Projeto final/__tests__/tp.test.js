// __tests__/tp.test.js
const { getCurrentUser } = require('../public/tp');

jest.mock('../public/tp', () => ({
  getCurrentUser: jest.fn(() => 'UsuárioMock'),
}));

describe('Testes para tp.js', () => {
  test('Obter Nome do Usuário Atual', () => {
    const username = getCurrentUser();
    expect(username).toEqual('UsuárioMock');
  });
});
