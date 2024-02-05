# ToyAuth - Sistema de Autenticação Simples

## Descrição:
ToyAuth é um sistema de autenticação simples construído usando Node.js, Express, MongoDB e Handlebars como template engine. Este sistema permite que os usuários se autentiquem (login) ou criem novas contas (registro). As informações do usuário, incluindo nome de usuário e senha, são armazenadas no MongoDB usando o Mongoose.

## Estrutura do Projeto:
* **public:** Contém arquivos estáticos do lado do cliente, como HTML, CSS e scripts do navegador.
* **server.js:** O ponto de entrada do servidor Node.js, que gerencia as rotas, a interação com o MongoDB e a lógica de autenticação.
* **api.js:** Rotas que retornam arquivos JSON.
* **view.js:** Rotas que servem arquivos HTML.
* **views:** Contém os arquivos de visualização, incluindo o layout principal (main.hbs) e a página principal (index.hbs).
* **package.json:** Arquivo de configuração do Node.js com as dependências necessárias.

## Funcionamento:

### Iniciando o Ambiente:
Antes de executar a aplicação, certifique-se de ter o MongoDB instalado e inicie três terminais separados:
* **Terminal para o Cliente MongoDB:** Execute 'mongo' para acessar o shell do MongoDB e crie o banco de dados com 'use toyauth'.
* **Terminal para o Servidor do Banco de Dados MongoDB:** Execute 'mongod' para iniciar o servidor do MongoDB.
* **Terminal para a Aplicação:** Execute node server.js para iniciar a aplicação.

### Conexão com o MongoDB:
O servidor Node.js se conecta ao MongoDB usando o Mongoose.

### Rotas:
O servidor expõe rotas para autenticação: /api/autenticar e rotas para servir páginas HTML: /.
Os usuários podem fazer login ou se registrar.

### Interação com o MongoDB:
Os dados do usuário são armazenados na coleção users do banco de dados toyauth no MongoDB.
A senha do usuário é armazenada em texto simples (para fins educacionais; em um ambiente de produção, seria usado armazenamento seguro).

### Validação de Dados:
Antes de interagir com o banco de dados, os dados de entrada, como nome de usuário e senha, são validados para evitar problemas de segurança, como injeção de código.

### Gerenciamento de Erros:
Melhorias são aplicadas para tratar e fornecer mensagens de erro mais úteis em caso de falhas.

### Executando a Aplicação:
* Instale as dependências: npm install.
* Certifique-se de ter um servidor MongoDB em execução localmente.
* Execute o servidor: node server.js.
* Acesse a aplicação em http://localhost:3000.

### Observações:
A senha do usuário é armazenada em texto simples apenas para demonstração. Em um ambiente de produção, medidas de segurança apropriadas, como criptografia, devem ser aplicadas.