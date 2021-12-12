import './index.css';
import {initialCards} from '../utils/initial-сards';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';;
import UserInfo from '../components/UserInfo.js';

/*Save elements in global variables*/
const popupProfileOpenButton = document.querySelector('.profile__edit');
const popupPlaceOpenButton = document.querySelector('.profile__add');

/*Initialize image preview*/
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

/*Initialize work with cards */
const popupWithPlace = new PopupWithForm('.popup_type_place', (formData) => {
  const card = new Card({name: formData['place-name'], link: formData['place-link']}, '.article-template', popupWithImage.open.bind(popupWithImage));
  cardList.addItem(card.generateCard());
  popupWithPlace.close();
});
popupPlaceOpenButton.addEventListener('click', popupWithPlace.open.bind(popupWithPlace));
popupWithPlace.setEventListeners();

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

