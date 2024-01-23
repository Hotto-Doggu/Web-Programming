Crie um servidor que receba uma requisição do tipo POST, contendo um texto e um parâmetro no corpo da requisição. O parâmetro será "true" para maiúsculo e "false" para minúsculo. O servidor deverá transformar o texto todo para maiúsculo ou minúsculo, a depender do parâmetro, e enviar o texto resultante ao cliente.

Do lado do cliente, o usuário irá digitar um texto e clicar em um botão escrito "Maiúsculo" ou em outro botão escrito "Minúsculo". Tanto o texto quanto o parâmetro (maiúsculo ou minúsculo) deverão ser enviados ao servidor no corpo (body) da requisição. A resposta do servidor será um texto, que deverá ser exibido na tela. A interface pode ser super/mega simples. Estou mais interessado mesmo na comunicação cliente/servidor.

Sirva a página web (front) de forma estática no próprio servidor, como vimos na aula (dentro do diretório public), de modo que o usuário faça o acesso via localhost.

Rode 'node server.js' neste diretório para iniciar o servidor na porta 3000, e você poderá acessar a aplicação no navegador em http://localhost:3000.