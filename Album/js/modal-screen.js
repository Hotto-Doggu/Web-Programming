class ModalScreen {
  constructor(containerElement, photoPaths) {
    this.containerElement = containerElement;
    this.photoPaths = photoPaths;
    this.currentIndex = -1;
    this.currentModalPhoto = null;
    
    this._showNextPhoto = this._showNextPhoto.bind(this);
    this._showPrevPhoto = this._showPrevPhoto.bind(this);
    this._onModalClick = this._onModalClick.bind(this);
    
    this.containerElement.addEventListener('pointerdown', this._onModalClick);
  }
  
  clear() {
    this.currentIndex = -1;
    this.currentModalPhoto = null;
    this.containerElement.innerHTML = '';
  }
  
  hide() {
    document.body.classList.remove('no-scroll');
  	this.containerElement.classList.add('hidden');
  }
  
  showImageAtIndex(index, entranceStyle) {
    this.currentIndex = index;
    document.body.classList.add('no-scroll');

    const src = this.photoPaths[index];
    if (this.currentModalPhoto) {
    	this.currentModalPhoto.remove();
    }
    this.currentModalPhoto = new ModalPhoto(src, this._showNextPhoto, this._showPrevPhoto);
    this.currentModalPhoto.renderTo(this.containerElement, entranceStyle);
    
  	this.containerElement.style.top = window.pageYOffset + 'px';
  	this.containerElement.classList.remove('hidden');
  }
  
  _showNextPhoto() {
    if (this.currentIndex + 1 === this.photoPaths.length) {
      this.currentModalPhoto.snapToPlace();
    } else {
    	this.showImageAtIndex(this.currentIndex + 1, 'next');
    }
  }
  
  _showPrevPhoto() {
    if (this.currentIndex === 0) {
      this.currentModalPhoto.snapToPlace();
    } else {
    	this.showImageAtIndex(this.currentIndex - 1, 'prev');
    }
  }
  
  _onModalClick() {
    this.clear();
    this.hide();
  }
}