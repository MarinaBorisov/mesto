export default class  FormValidator {
  constructor(data, formElementSelector) {
    this._params = data;
    this._formElementSelector = formElementSelector;
  }

_showInputError (errorMessage) {
  const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
  this._inputElement.classList.add(this._params.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._params.errorClass);
};

_hideInputError () {
  const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
  this._inputElement.classList.remove(this._params.inputErrorClass);
  errorElement.classList.remove(this._params.errorClass);
  errorElement.textContent = '';
};

_checkInputValidity () {
  if (!this._inputElement.validity.valid) {
    this._showInputError(this._inputElement.validationMessage);
  } else {
    this._hideInputError();
  }
};

_hasInvalidInput () {
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
_toggleButtonState () {
    if (this._hasInvalidInput()) {
    this._buttonElement.classList.add(this._params.inactiveButtonClass);
  }
    else {
    this._buttonElement.classList.remove(this._params.inactiveButtonClass);
  }
};

_setEventListeners () {
  this._inputList = Array.from(this._formElement.querySelectorAll(this._params.inputSelector));
  this._buttonElement = this._formElement.querySelector(this._params.submitButtonSelector);
  this._toggleButtonState();
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._inputElement = inputElement;
      this._checkInputValidity();
      this._toggleButtonState();
    });
  });
};

enableValidation () {
  this._formElement = document.querySelector(this._formElementSelector);
  this._formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  this._setEventListeners(this._params);
}
}
