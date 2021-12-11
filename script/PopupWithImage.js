import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector('.popup__img');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }
  open(name, src) {
    this._popupCaption.textContent = name;
    this._popupImg.src = src;
    this._popupImg.alt = name;
    super.open();
  }
}
