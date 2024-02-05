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
      chatMessages.scrollTop = chatMessages.scrollHeight; // Rolagem do campo para exibir sempre as mensagens mais recentes
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

  // Ajuste para evitar duplicação do prefixo "Chatbot:"
  const senderPrefix = sender === 'Chatbot' ? '' : `${sender}: `;
  newMessage.textContent = `${withUser ? withUser + ': ' : ''}${senderPrefix}${content}`;
  
  chatMessages.appendChild(newMessage);
}

const loadConversations = async () => {
  console.log('Iniciando loadConversations');
  try {
    const response = await fetch('/auth/conversas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const { chats } = await response.json();

      // Limpar o chat antes de exibir as novas mensagens
      limparChat();

      // Exibir as mensagens de todas as conversas
      chats.forEach((chat) => {
        console.log(`Mensagens para ${chat.withUser}:`, chat.messages); //log
        chat.messages.forEach((message) => {
          // Ajuste para evitar duplicação do prefixo "Chatbot:"
          const senderPrefix = message.sender === 'Chatbot' ? '' : `${message.sender}: `;
          exibirMensagem(chat.withUser, message.sender, `${senderPrefix}${message.content}`);
        });
      });

    } else {
      // Lidar com erros ou nenhum retorno de conversas
      console.error('Erro ao carregar conversas:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao carregar conversas:', error);
  } finally {
    console.log('Finalizando loadConversations');
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
      const result = await response.json();
      
      // Modificação: Verifica a informação de redirecionamento
      if (result.redirectTo) {
        window.location.href = result.redirectTo;
      }
      
      handleSuccessfulLogin(result);
      console.log('Conversas após login:', result.chats); // Adicione este log
    } 
    else { handleLoginError(response.status);}
  } catch (error) {
    console.error('Erro durante o login:', error);
    resultado.textContent = `Erro durante o login: ${error.message}`;
  }
}

function handleSuccessfulLogin(result) {
  if (result.chats) {
    result.chats.forEach((chat) => {
      chat.messages.forEach((message) => {
        exibirMensagem(chat.withUser, message.sender, message.content);
      });
    });
  }
  resultado.textContent = 'Login realizado com sucesso!';
  loadConversations();
}


function handleLoginError(status) {
  const resultado = document.getElementById('resultado');
  if (status === 401) {
    resultado.textContent = 'Nome de usuário ou senha incorretos. Tente novamente.';
  } else if (status === 404) {
    resultado.textContent = 'Usuário não encontrado. Verifique o nome de usuário.';
  } else {
    resultado.textContent = 'Erro durante o login. Tente novamente mais tarde.';
  }
}

async function cadastrar() {
  const usernameInput = document.getElementById('newUsername');
  const passwordInput = document.getElementById('newPassword');
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

    if (response.ok) {
      const result = await response.text();
      resultado.textContent = result;
    } else {
      resultado.textContent = 'Erro durante o cadastro. Tente novamente mais tarde.';
    }
  } catch (error) {
    console.error('Erro durante o cadastro:', error);
    resultado.textContent = 'Erro durante o cadastro. Tente novamente mais tarde.';
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

  } catch (error) {
    console.error('Erro durante o logout:', error);
    alert('Erro durante o logout.');
  }
}
