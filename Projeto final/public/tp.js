// tp.js

async function sendMessage() {
  var messageInput = document.getElementById('message-input');
  var message = messageInput.value;

  if (message.trim() !== '') {
    var chatMessages = document.getElementById('chat-messages');
    var newMessage = document.createElement('div');
    newMessage.className = 'message';

    // Adicione o nome do usuário ao remetente da mensagem
    newMessage.textContent = `${getCurrentUser()}: ${message}`;
    chatMessages.appendChild(newMessage);

    // Enviar a mensagem para o servidor com o nome de usuário
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: getCurrentUser(), query: message }),
    });

    const result = await response.json();

    // Exibir a resposta do chatbot na tela
    const chatbotResponse = document.createElement('div');
    chatbotResponse.className = 'message';
    chatbotResponse.textContent = `Chatbot: ${result.answer}`;
    chatMessages.appendChild(chatbotResponse);

    messageInput.value = ''; // Limpar o campo de entrada
  }
}

function getCurrentUser() {
  // Adicione lógica para obter o nome do usuário, verificar se está autenticado
  // Se não estiver autenticado, retorne um valor padrão ou execute outra lógica de controle de erro
  return 'Usuário'; // Substitua pelo nome do usuário atual
}

async function autenticar() {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const resultado = document.getElementById('resultado');

  const username = usernameInput.value;
  const password = passwordInput.value;

  const response = await fetch('/auth/autenticar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, action: 'login' }),
  });

  const result = await response.text();
  resultado.textContent = result;
}

async function cadastrar() {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const resultado = document.getElementById('resultado');

  const username = usernameInput.value;
  const password = passwordInput.value;

  const response = await fetch('/auth/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, action: 'register' }),
  });

  const result = await response.text();
  resultado.textContent = result;
}

function logout() {
  // Adicionar lógica de logout conforme necessário
  // Recarregar a página
  alert('Logout realizado');
}