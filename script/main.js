let popup = document.querySelector('.popup')
let popupOpenButton = document.querySelector('.profile__edit')
let popupCloseButton = document.querySelector('.popup__close')
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let descriptionInput = document.querySelector('.popup__description');
let profileName = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function popupOpen() {
  let userName = profileName.textContent.trim();
  let userSubtitle = profileSubtitle.textContent.trim();
  nameInput.value = userName;
  descriptionInput.value = userSubtitle;
  popup.classList.add('popup_state_opened');
}

function popupClose() {
  popup.classList.remove('popup_state_opened');
}

popupOpenButton.addEventListener('click', function() {
  popup.classList.toggle('popup_state_opened');
});

popupCloseButton.addEventListener('click', function() {
  popup.classList.toggle('popup_state_opened');
});

formElement.addEventListener('submit', function(evnt) {
  evnt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = descriptionInput.value;
  popupClose();
});

popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
