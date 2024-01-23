/*
Utilizando os métodos definidos para array (slide 67), a partir de um dado array de entrada:
1) Verifique se todos os elementos são primos.
2) Imprima o dobro dos valores
3) Retorne um array com apenas valores primos
*/
// Função para verificar se um número é primo
const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

// Função para verificar se um número é par usando a API isEven
const isEven = async (num) => {
    try {
        const response = await fetch(`https://api.isevenapi.xyz/api/iseven/${num}`);
        const data = await response.json();
        return data.iseven;
    } catch (error) {
        console.error('Erro ao verificar se é par:', error);
        return false;
    }
};

class Menu {
    constructor() {
        this.buttonContainer = document.querySelector('#menu');
        this.statusBar = document.querySelector('#status-bar');
        this.inputField = document.querySelector('#inputField');
        this.processButton = document.querySelector('#processButton');

        this.buttons = [
            new Button(this.buttonContainer, '1 - Checar se são todos primos', this.operarLista.bind(this, isPrime)),
            new Button(this.buttonContainer, '2 - Checar se são todos pares', this.operarLista.bind(this, isEven)),
            new Button(this.buttonContainer, '3 - Visualizar quais são primos', this.operarLista.bind(this, isPrime)),
            new Button(this.buttonContainer, '4 - Visualizar quais são pares', this.operarLista.bind(this, isEven))
        ];

        // Adiciona um evento de clique ao botão "Processar Lista"
        this.processButton.addEventListener('click', this.processarLista.bind(this));
        
        //Inicia com mensagem na barra de status
        this.statusBar.textContent = 'Olá!';
    }

    async processarLista() {
        // Obtém o valor do campo de texto e converte para um array de números
        const inputValue = this.inputField.value;
        const inputArray = inputValue.split(',').map(Number);

        // Verifica se a entrada é válida (pode adicionar mais validações se necessário)
        if (inputArray.some(isNaN)) {
            this.statusBar.textContent = 'Entrada inválida: {' + inputValue + '}; Insira apenas números separados por vírgula.';
            return;
        }

        // Define o array dinâmico como propriedade da classe para ser utilizado nas operações
        this.dynamicArray = inputArray;

        // Exibe mensagem de sucesso
        this.statusBar.textContent = 'Array carregado com sucesso. Clique nos botões para realizar as operações.';
    }

    async operarLista(checkFunction, buttonName) {
        // Obtém o array dinâmico definido durante o processamento
        const inputArray = this.dynamicArray || [];

        // Verifica se a entrada é válida
        if (!Array.isArray(inputArray)) {
            this.statusBar.textContent = 'Erro: Array inválido. Processe um novo array.';
            return;
        }
        
        switch (buttonName) {
            case '1 - Checar se são todos primos':
                this.statusBar.textContent = `Todos os elementos são primos: ${inputArray.every(checkFunction)}`;
                break;
            case '2 - Checar se são todos pares':
                this.statusBar.textContent = `Todos os elementos são pares: ${await Promise.all(inputArray.map(checkFunction)).then(results => results.every(Boolean))}`;
                break;
            case '3 - Visualizar quais são primos':
                this.statusBar.textContent = `Array com apenas valores primos: ${inputArray.filter(checkFunction)}`;
                break;
            case '4 - Visualizar quais são pares':
                this.statusBar.textContent = `Array com apenas valores pares: ${await Promise.all(inputArray.map(async num => ({ num, isEven: await checkFunction(num) }))).then(results => results.filter(item => item.isEven).map(item => item.num))}`;
                break;
            default: this.statusBar.textContent = 'Operação inválida';
        }
    }
}

class Button {
    constructor(containerElement, text, clickCallback) {
        this.containerElement = containerElement;
        this.text = text;

        const button = document.createElement('button');
        button.textContent = text;

        button.addEventListener('click', () => {
            clickCallback(this.text);
        });
        this.containerElement.append(button);
    }
}

new Menu();
