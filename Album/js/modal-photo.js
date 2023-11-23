class ModalPhoto {
  constructor(src, onSwipeNext, onSwipePrev) {
    this.onSwipeNext = onSwipeNext;
    this.onSwipePrev = onSwipePrev;
    
    this._startDrag = this._startDrag.bind(this);
    this._duringDrag = this._duringDrag.bind(this);
    this._endDrag = this._endDrag.bind(this);
    
  	this.image = document.createElement('img');
  	this.image.src = src;
    this.image.addEventListener('pointerdown', this._startDrag);
    this.image.addEventListener('pointermove', this._duringDrag);
    this.image.addEventListener('pointerup', this._endDrag);
    this.image.addEventListener('pointercancel', this._endDrag);
    
		this.originX = null;
  }

  renderTo(element, entranceStyle) {
    if (entranceStyle === 'next') {
    	this.image.classList.add('animate-next');
    } else if (entranceStyle === 'prev') {
    	this.image.classList.add('animate-prev');
    }
    element.appendChild(this.image);
	}
  
  remove() {
    this.image.remove();
  }
  
  snapToPlace() {
  	this.image.style.transform = '';
  }
  
  _startDrag(event) {
    event.preventDefault();
    event.stopPropagation();

    this.originX = event.clientX;
    event.target.setPointerCapture(event.pointerId);
  }

  _duringDrag(event) {
    if (this.originX) {
      const currentX = event.clientX;
      const delta = currentX - this.originX;
      const element = event.currentTarget;
      element.style.transform = 'translateX(' + delta + 'px)';
    }
  }

  _endDrag(event) {
    if (!this.originX) {
      return;
    }

    const currentX = event.clientX;
    const delta = currentX - this.originX;
    this.originX = null;
    
    if (Math.abs(delta) < 100) {
      this.snapToPlace();
      return;
    }
    if (delta < 0) {
      this.onSwipeNext();
    } else {
      this.onSwipePrev();
    }
  }
}