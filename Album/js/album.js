class Album {
  constructor(photoPaths) {
    this.photoPaths = photoPaths;
    this.photos = [];
    const modalView = document.querySelector('#modal-view');
    this.modalScreen = new ModalScreen(modalView, photoPaths);
    
    this._onThumbnailClick = this._onThumbnailClick.bind(this);
  }
  
  renderTo(containerElement) {
    this._attachPhotosToContainer(this.photoPaths, containerElement);
  }
  
  _attachPhotosToContainer(photoPaths, containerElement) {
		for (let i = 0; i < photoPaths.length; i++) {
      const thumbnail = new Thumbnail(i, photoPaths[i], this._onThumbnailClick);
      thumbnail.renderTo(containerElement);
		}
  }
  
  _onThumbnailClick(index, src) {
    this.modalScreen.showImageAtIndex(index);
  }
}