// tp.js
async function sendMessage() {
  var messageInput = document.getElementById('message-input');
  var message = messageInput.value;

  if (message.trim() !== '') {
    var chatMessages = document.getElementById('chat-messages');
    var newMessage = document.createElement('div');
    newMessage.className = 'message';

    // Adicione o nome do usuário ao remetente da mensagem
    newMessage.textContent = `${await getCurrentUser()}: ${message}`;
    chatMessages.appendChild(newMessage);

    // Enviar a mensagem para o servidor com o nome de usuário
    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: await getCurrentUser(), query: message }),
      });

      const result = await response.json();

      // Exibir a resposta do chatbot na tela
      const chatbotResponse = document.createElement('div');
      chatbotResponse.className = 'message';
      chatbotResponse.textContent = `Chatbot: ${result.answer}`;
      chatMessages.appendChild(chatbotResponse);

      messageInput.value = ''; // Limpar o campo de entrada
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  }
}

async function getCurrentUser() {
  try {
    const response = await fetch('/auth/getCurrentUser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const user = await response.json();
      return user.username;
    } else {
      return 'Usuário'; // Substitua pelo valor padrão ou lógica de erro desejados
    }
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    return 'Usuário'; // Substitua pelo valor padrão ou lógica de erro desejados
  }
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

async function logout() {
  try {
    const response = await fetch('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.text();

    alert(result); // Exibe uma mensagem indicando que o logout foi realizado
    
    // Redireciona para a página de login ou executa outras ações de interface do usuário
    window.location.reload();
  } catch (error) {
    console.error('Erro durante o logout:', error);
    alert('Erro durante o logout.');
  }
}

module.exports = { sendMessage, getCurrentUser, autenticar, cadastrar, logout };