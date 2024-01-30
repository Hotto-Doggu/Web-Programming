function sendMessage() {
  var messageInput = document.getElementById('message-input');
  var message = messageInput.value;

  if (message.trim() !== '') {
    var chatMessages = document.getElementById('chat-messages');
    var newMessage = document.createElement('div');
    newMessage.className = 'message';
    newMessage.textContent = 'User: ' + message;
    chatMessages.appendChild(newMessage);

    // You can add code here to send the user message to the ChatGPT API and get the response.

    messageInput.value = ''; // Clear the input field
  }
}
