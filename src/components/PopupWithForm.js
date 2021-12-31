import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm = null) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__field'));
    this._submitButton = this._form.querySelector('.popup__button-save');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  setSubmitHandler(handler) {
    this._handleSubmitForm = handler;
  }

  showLoading(isLoading) {
    isLoading ? this._submitButton.textContent = 'Сохранение...' : this._submitButton.textContent = 'Сохранить';
  }
}
