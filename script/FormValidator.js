export class  FormValidator {
  constructor(data, formElement) {
    this._params = data;
    this._formElement = formElement;
  }

_showInputError (formElement, inputElement, errorMessage, validationParameters) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationParameters.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationParameters.errorClass);
};

_hideInputError (formElement, inputElement, validationParameters) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationParameters.inputErrorClass);
  errorElement.classList.remove(validationParameters.errorClass);
  errorElement.textContent = '';
};

_checkInputValidity (formElement, inputElement, validationParameters) {
  if (!inputElement.validity.valid) {
    this._showInputError(formElement, inputElement, inputElement.validationMessage, validationParameters);
  } else {
    this._hideInputError(formElement, inputElement, validationParameters);
  }
};

_hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
_toggleButtonState (inputList, buttonElement, validationParameters) {
    if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationParameters.inactiveButtonClass);
  }
    else {
    buttonElement.classList.remove(validationParameters.inactiveButtonClass);
  }
};

_setEventListeners (formElement, validationParameters) {
  const inputList = Array.from(formElement.querySelectorAll(validationParameters.inputSelector));
  const buttonElement = formElement.querySelector(validationParameters.submitButtonSelector);
  this._toggleButtonState(inputList, buttonElement, validationParameters);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(formElement, inputElement, validationParameters);
      this._toggleButtonState(inputList, buttonElement, validationParameters);
    });
  });
};

enableValidation () {
  const formElement = document.querySelector(this._formElement);
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  this._setEventListeners(formElement, this._params);
}
}
