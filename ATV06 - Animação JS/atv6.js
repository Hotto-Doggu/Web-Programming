let originX = null;
let originY = null;
let offsetX = 0;
let offsetY = 0;
let dragStarted = false;

// Função para obter os limites da tela
function getScreenLimits() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const dragonWidth = dragon.offsetWidth;
    const dragonHeight = dragon.offsetHeight;

    // Calcular os limites
    const maxX = screenWidth - dragonWidth;
    const maxY = screenHeight - dragonHeight;

    return { maxX, maxY };
}

function onDragStart(event) {
    originX = event.clientX;
    originY = event.clientY;
    dragStarted = true;
    event.currentTarget.setPointerCapture(event.pointerId);
}

function onDragMove(event) {
    if (!dragStarted) {
        return;
    }
    event.preventDefault();

    const deltaX = event.clientX - originX;
    const deltaY = event.clientY - originY;
    const translateX = offsetX + deltaX;
    const translateY = offsetY + deltaY;

    event.currentTarget.style.transform = 'translate(' +
        translateX + 'px, ' + translateY + 'px)';
}

function onDragEnd(event) {
    dragStarted = false;
    offsetX += event.clientX - originX;
    offsetY += event.clientY - originY;
}

const dragon = document.querySelector('img');
dragon.addEventListener('pointerdown', onDragStart);
dragon.addEventListener('pointerup', onDragEnd);
dragon.addEventListener('pointermove', onDragMove);

// Adicionando eventos de escuta para as setas do teclado
document.addEventListener('keydown', function (event) {
    const { maxX, maxY } = getScreenLimits();
    const step = 10; // Define o valor do passo/movimento

    switch (event.key) {
        case 'ArrowUp':
            offsetY = Math.max(0, offsetY - step);
            break;
        case 'ArrowDown':
            offsetY = Math.min(maxY, offsetY + step);
            break;
        case 'ArrowLeft':
            offsetX = Math.max(0, offsetX - step);
            break;
        case 'ArrowRight':
            offsetX = Math.min(maxX, offsetX + step);
            break;
    }

    dragon.style.transform = 'translate(' + offsetX + 'px, ' + offsetY + 'px)';
});

// Atualização dos limites ao redimensionar a janela
window.addEventListener('resize', function () {
    const { maxX, maxY } = getScreenLimits();
    offsetX = Math.min(offsetX, maxX);
    offsetY = Math.min(offsetY, maxY);
    dragon.style.transform = 'translate(' + offsetX + 'px, ' + offsetY + 'px)';
});
