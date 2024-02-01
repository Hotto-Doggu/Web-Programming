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

    if (response.ok) {
      const user = await response.json();
      return user.username;
    } else {
      return 'Usuário'; 
    }
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    return 'Usuário'; 
  }
}

// Função para limpar o chat
function limparChat() {
  const chatMessages = document.getElementById('chat-messages');
  chatMessages.innerHTML = '';
}

// Função para exibir mensagens no chat no formato correto
function exibirMensagem(withUser, sender, content) {
  const chatMessages = document.getElementById('chat-messages');
  const newMessage = document.createElement('div');
  newMessage.className = 'message';
  newMessage.textContent = `${withUser ? withUser + ': ' : ''}${sender}: ${content}`;
  chatMessages.appendChild(newMessage);
}

const loadConversations = async () => {
  try {
    const response = await fetch('/auth/conversas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const { chats } = await response.json();
      // Processar e exibir as conversas no frontend conforme necessário
    } else {
      // Lidar com erros ou nenhum retorno de conversas
    }
  } catch (error) {
    console.error('Erro ao carregar conversas:', error);
  }
};

async function autenticar() {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const resultado = document.getElementById('resultado');

  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch('/auth/autenticar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      handleSuccessfulLogin(await response.json());
    } else {
      handleLoginError(response.status);
    }
  } catch (error) {
    console.error('Erro durante o login:', error);
    resultado.textContent = `Erro durante o login: ${error.message}`;
  }
}

function handleSuccessfulLogin(result) {
  limparChat();
  // Assumindo que result.messages contém as mensagens salvas
  if (result.messages) {
    result.messages.forEach((message) => {
      exibirMensagem(message.withUser, message.sender, message.content);
    });
  }
  resultado.textContent = 'Login realizado com sucesso!';
  loadConversations();
}


function handleLoginError(status) {
  if (status === 401) {
    resultado.textContent = 'Senha incorreta. Tente novamente.';
  } else if (status === 404) {
    resultado.textContent = 'Usuário não encontrado. Verifique o nome de usuário.';
  } else {
    resultado.textContent = 'Erro durante o login. Tente novamente mais tarde.';
  }
}


async function cadastrar() {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const resultado = document.getElementById('resultado');

  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch('/auth/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, action: 'register' }),
    });

    const result = await response.text();
    resultado.textContent = result;
  } catch (error) {
    console.error('Erro durante o cadastro:', error);
    resultado.textContent = 'Erro durante o cadastro.';
  }
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