class Thumbnail {
  constructor(index, src, onThumbClick) {
    this.index = index;
    this.onThumbClick = onThumbClick;
    
    this._onClick = this._onClick.bind(this);
    
  	this.image = document.createElement('img');
  	this.image.src = src;
    this.image.addEventListener('pointerup', this._onClick);
  }
  
	renderTo(element) {
    element.appendChild(this.image);
	}
  
  remove() {
    this.image.remove();
  }
  
  _onClick() {
    this.onThumbClick(this.index, this.image.src);
  }
}