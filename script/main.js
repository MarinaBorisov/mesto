/*Save elements in global variables*/
let popup = document.querySelector('.popup')
let popupOpenButton = document.querySelector('.profile__edit')
let popupCloseButton = document.querySelector('.popup__close')
let formElement = document.querySelector('.popup__profile-form');
let nameInput = document.querySelector('.popup__field_type_name');
let descriptionInput = document.querySelector('.popup__field_type_description');
let profileName = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

/*Declare handlers*/
function popupOpen() {
  let userName = profileName.textContent.trim();
  let userSubtitle = profileSubtitle.textContent.trim();
  nameInput.value = userName;
  descriptionInput.value = userSubtitle;
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function formSubmit(evnt) {
  evnt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = descriptionInput.value;
  popupClose();
}

/*Add listeners*/
formElement.addEventListener('submit', formSubmit);
popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
