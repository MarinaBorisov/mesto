import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
/*Save elements in global variables*/
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupImg = document.querySelector('.popup_type_img');
const popupOverlays =  Array.from(document.querySelectorAll('.popup'));
const popupImgPicture = popupImg.querySelector('.popup__img');
const popupImgDescription = popupImg.querySelector('.popup__caption');
const popupImgClose = popupImg.querySelector('.popup__close');

const popupProfileOpenButton = document.querySelector('.profile__edit');
const popupPlaceOpenButton = document.querySelector('.profile__add');

const popupProfileCloseButton = popupProfile.querySelector('.popup__close');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close');

const formProfileElement = document.querySelector('.popup__form_type_profile');
const formPlaceElement = document.querySelector('.popup__form_type_place');

const nameInput = document.querySelector('.popup__field_type_name');
const placeNameInput = document.querySelector('.popup__field_type_place-name');

const descriptionInput = document.querySelector('.popup__field_type_description');
const placeLinkInput = document.querySelector('.popup__field_type_place-link');

const profileName = document.querySelector('.profile__title');

const profileSubtitle = document.querySelector('.profile__subtitle');

const elements = document.querySelector('.elements');
const articleTemplateContent = document.querySelector('.article-template').content;

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscDown);
}

function closePopup(popup) {
  document.removeEventListener('keydown', handleEscDown);
  popup.classList.remove('popup_opened');
}

/*Declare handlers for profile*/
function openEditProfilePopup() {
  const userName = profileName.textContent.trim();
  const userSubtitle = profileSubtitle.textContent.trim();
  nameInput.value = userName;
  descriptionInput.value = userSubtitle;
  openPopup(popupProfile);
  nameInput.dispatchEvent(new Event('input'));
  descriptionInput.dispatchEvent(new Event('input'));
}

function closeEditProfilePopup() {
  closePopup(popupProfile);
}

function submitEditProfilePopup(evnt) {
  evnt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = descriptionInput.value;
  closeEditProfilePopup();
}

/*Add listeners for profile*/
formProfileElement.addEventListener('submit', submitEditProfilePopup);
popupProfileOpenButton.addEventListener('click', openEditProfilePopup);
popupProfileCloseButton.addEventListener('click', closeEditProfilePopup);

/*Declare handlers for place*/
function openAddCardPopup() {
  openPopup(popupPlace);
}

function closeAddCardPopup() {
  closePopup(popupPlace);
}

function addCard(name, src) {
  const data = {};
  data.name = name;
  data.src = src;
  const card = new Card(data, '.article-template', openPopup);
  elements.prepend(card.generateCard());

}

function submitPlaceForm(evnt) {
  evnt.preventDefault();
  const data = {};
  data.name = placeNameInput.value;
  data.src = placeLinkInput.value;
  const card = new Card(data, '.article-template', openPopup);
  elements.prepend(card.generateCard());
  closeAddCardPopup();
  placeNameInput.value = '';
  placeLinkInput.value = '';
  const saveButton = formPlaceElement.querySelector('.popup__button-save');
  saveButton.classList.add('popup__button-save_inactive');
}

/*Add listeners for place*/
formPlaceElement.addEventListener('submit', submitPlaceForm);
popupPlaceOpenButton.addEventListener('click', openAddCardPopup);
popupPlaceCloseButton.addEventListener('click', closeAddCardPopup);


/*Article generation from array */
initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

/*Handle click on popupImgClose button*/
popupImgClose.addEventListener('click', () => {
  closePopup(popupImg);
});

/*Handle click on popup overlay*/
popupOverlays.forEach((popupOverlay) => {
  popupOverlay.addEventListener('mousedown', (evt) => {
    if (evt.target == popupOverlay) {
      closePopup(popupOverlay);
    }
  });
});

/*Handle Esc key down*/
function handleEscDown(evt) {
  if (evt.key === 'Escape') {
    const popupElement = document.querySelector('.popup_opened');
    closePopup(popupElement);
  }
}

/*Initialize form validation*/
const formValidatorProfile = new FormValidator({
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__input-error_active'
}, '.popup__form_type_profile');
formValidatorProfile.enableValidation();

const formValidatorPlace = new FormValidator({
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__input-error_active'
}, '.popup__form_type_place');
formValidatorPlace.enableValidation();


