import './index.css';
import {initialCards, profileValidationSettings, placeValidationSettings} from '../utils/initial-сards';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';;
import UserInfo from '../components/UserInfo.js';

/*Save elements in global variables*/
const popupProfileOpenButton = document.querySelector('.profile__edit');
const popupPlaceOpenButton = document.querySelector('.profile__add');
const userName = document.querySelector('.popup__field_type_name');
const userDescription = document.querySelector('.popup__field_type_description');

/*Prevent multiple call new Card*/
const createCard = (item) => {
  return new Card(item, '.article-template', popupWithImage.open.bind(popupWithImage));
}


/*Initialize image preview*/
const popupWithImage = new PopupWithImage('.popup_type_img');
popupWithImage.setEventListeners();

/*Initialize work with profile*/
const userInfo = new UserInfo({userNameSelector: '.profile__title', userDescriptionSelector: '.profile__subtitle'});
const popupWithUser = new PopupWithForm('.popup_type_profile', (formData) => {
  userInfo.setUserInfo(formData);
  popupWithUser.close();
});
popupProfileOpenButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  userName.value = userData.userName;
  userDescription.value = userData.userDescription;
  popupWithUser.open();
});
popupWithUser.setEventListeners();

/*Initialize card list */
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card.generateCard());
    }
  },
  '.elements'
);
cardList.renderItems();

/*Initialize work with cards */
const popupWithPlace = new PopupWithForm('.popup_type_place', (formData) => {
  const card = createCard({name: formData['place-name'], link: formData['place-link']});
  cardList.addItem(card.generateCard());
  popupWithPlace.close();
});
popupPlaceOpenButton.addEventListener('click', () => {
  formValidatorPlace.disableSubmitButton();
  popupWithPlace.open();
});
popupWithPlace.setEventListeners();

/*Initialize form validation*/
const formValidatorProfile = new FormValidator(profileValidationSettings, '.popup__form_type_profile');
formValidatorProfile.enableValidation();

const formValidatorPlace = new FormValidator(placeValidationSettings, '.popup__form_type_place');
formValidatorPlace.enableValidation();

