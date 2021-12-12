export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }
  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this._popup.classList.remove('popup_opened');
    }
  }
  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target == this._popup) {
        this.close();
      }
    });
  }
}
