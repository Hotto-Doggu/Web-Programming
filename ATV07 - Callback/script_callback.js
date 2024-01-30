//Tarefa: Converter esse exemplo, que utiliza custom event, para que ele utilize callback function.
class Menu {
    constructor() {
        this.buttonContainer = document.querySelector('#menu');
        this.statusBar = document.querySelector('#status-bar');
        
        /*  removed:
            this.showButtonClicked = this.showButtonClicked.bind(this);
        */

        /*  modified:
            this.buttons = [
                new Button(this.buttonContainer, 'A'), 
                new Button(this.buttonContainer, 'B'),
                new Button(this.buttonContainer, 'C')
            ];
        v v v v v v v v v v v v v v v v v v v v v v v v 
        */
        this.buttons = [
            new Button(this.buttonContainer, 'A', this.showButtonClicked.bind(this)),
            new Button(this.buttonContainer, 'B', this.showButtonClicked.bind(this)),
            new Button(this.buttonContainer, 'C', this.showButtonClicked.bind(this))
        ];

        /*  removed:
            document.addEventListener('button-clicked', this.showButtonClicked);
        */
    }

    /*  modified:
        showButtonClicked(event) {
            this.statusBar.textContent = event.detail.buttonName + ' was clicked';
        }
    v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v
    */
    showButtonClicked(buttonName) {
        this.statusBar.textContent = buttonName + ' was clicked';
    }
}

class Button {
    constructor(containerElement, text, clickCallback) {
        this.containerElement = containerElement;
        this.text = text;
        /*  removed:
            this.onClick = this.onClick.bind(this); //remove por inteiro a função onClick();
        */
        const button = document.createElement('button');
        button.textContent = text;
        /*  modified:
            button.addEventListener('click', this.onClick);
        v v v v v v v v v v v v v v v v v v v v v v v v v v
        */
        button.addEventListener('click', () => {
            clickCallback(this.text);
        });
        this.containerElement.append(button);
    }
    /*  removed:
        onClick() {
            const eventInfo = {
                buttonName: this.text
            };
            document.dispatchEvent(
                new CustomEvent('button-clicked', { detail: eventInfo }));
        }
    */
}

new Menu();
