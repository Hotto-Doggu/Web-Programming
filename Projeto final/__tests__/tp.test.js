// __tests__/tp.test.js
const { getCurrentUser } = require('../public/tp.js');

describe('Testes para tp.js', () => {
  test('Obter Nome do Usuário Atual', async () => {
    // Supondo que a função getCurrentUser seja exportada diretamente de tp.js
    const username = await getCurrentUser(); 
    expect(username).toEqual('UsuárioMock');
  });
});
