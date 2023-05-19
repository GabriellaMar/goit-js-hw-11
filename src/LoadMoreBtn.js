
import Notiflix from 'notiflix';

export default class LoadMoreBtn {
  constructor({ selector, isHidden = false }) {
    this.button = this.getButton(selector);
    
    if (isHidden) {
      this.hide();
    }
  }

  getButton(selector) {
    return document.querySelector(selector);
  }

  hide() {
    this.button.classList.add('hidden');
  }

  show() {
    this.button.classList.remove('hidden');
  }

  disable() {
    this.button.disabled = true;
    this.button.textContent = 'Loading...';
  }

  enable() {
    this.button.disabled = false;
    this.button.textContent = 'Load more';
  }

  end() {
    this.button.disabled = true; 
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
}