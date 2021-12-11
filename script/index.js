import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';;
import UserInfo from './UserInfo.js';

/*Save elements in global variables*/
const popupPlace = document.querySelector('.popup_type_place');
const popupProfileOpenButton = document.querySelector('.profile__edit');
const popupPlaceOpenButton = document.querySelector('.profile__add');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close');
const formPlaceElement = document.querySelector('.popup__form_type_place');
const placeNameInput = document.querySelector('.popup__field_type_place-name');
const placeLinkInput = document.querySelector('.popup__field_type_place-link');
const elements = document.querySelector('.elements');
const popupWithImage = new PopupWithImage('.popup_type_img');
popupWithImage.setEventListeners();

/*Initialize work with profile*/
const userInfo = new UserInfo({userNameSelector: '.profile__title', userDescriptionSelector: '.profile__subtitle'});
const popupWithUser = new PopupWithForm('.popup_type_profile', (formData) => {
  userInfo.setUserInfo(formData);
  popupWithUser.close();
});
popupProfileOpenButton.addEventListener('click', popupWithUser.open.bind(popupWithUser));
popupWithUser.setEventListeners();

/*Initialize work with cards */
const popupWithPlace = new PopupWithForm('.popup_type_place', (formData) => {
  const cardList = new Section(
    {
      items: formData,
      renderer: (item) => {
        const card = new Card(item, '.article-template', popupWithImage.open.bind(popupWithImage));
        cardList.addItem(card.generateCard());
      }
    },
    '.elements'
  );
  cardList.renderItems();
  popupWithPlace.close();
});
popupPlaceOpenButton.addEventListener('click', popupWithPlace.open.bind(popupWithPlace));
popupWithPlace.setEventListeners();

/*Initialize card list */
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.article-template', popupWithImage.open.bind(popupWithImage));
      cardList.addItem(card.generateCard());
    }
  },
  '.elements'
);
cardList.renderItems();




function addCard(name, src) {
  const data = {};
  data.name = name;
  data.src = src;
  const card = new Card(data, '.article-template', popupWithImage.open);
  elements.prepend(card.generateCard());

}

function submitPlaceForm(evnt) {
  evnt.preventDefault();
  const data = {};
  data.name = placeNameInput.value;
  data.src = placeLinkInput.value;
  const card = new Card(data, '.article-template', popupWithImage.open);
  elements.prepend(card.generateCard());
  closeAddCardPopup();
  placeNameInput.value = '';
  placeLinkInput.value = '';
  const saveButton = formPlaceElement.querySelector('.popup__button-save');
  saveButton.classList.add('popup__button-save_inactive');
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

