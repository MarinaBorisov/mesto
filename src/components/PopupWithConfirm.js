import Popup from './Popup.js';
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button-save');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm();
    });
  }

  setSubmitHandler(handler) {
    this._handleSubmitForm = handler;
  }

  showLoading(isLoading) {
    isLoading ? this._submitButton.textContent = 'Сохранение...' : this._submitButton.textContent = 'Сохранить';
  }
}
