//mostra o número de imagens que existe na página, exibido em texto no topo da referida página.
let images = document.querySelectorAll('img');
let count = images.length;
alert(`O número de imagens na página é ${count}.`);
//substitui todas as imagens da página por uma nova imagem prédefinida, mantendo seus tamanhos originais.
let newImage = chrome.extension.getURL('as_the_gods_will.jpg');
let width = images[0].naturalWidth;
let height = images[0].naturalHeight;

for (let i = 0; i < images.length; i++) {
  images[i].src = newImage;
  images[i].style.width = `${width}px`;
  images[i].style.height = `${height}px`;
}
