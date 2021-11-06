const validationParameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__input-error_active'
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationParameters.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationParameters.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationParameters.inputErrorClass);
  errorElement.classList.remove(validationParameters.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationParameters.inactiveButtonClass);
  }
    else {
    buttonElement.classList.remove(validationParameters.inactiveButtonClass);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationParameters.inputSelector));
  const buttonElement = formElement.querySelector(validationParameters.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (validationParams) => {
  Object.assign(validationParameters, validationParams);
  const formList = Array.from(document.querySelectorAll(validationParameters.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}
