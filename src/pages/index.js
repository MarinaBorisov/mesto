import './index.css';
import {validationSettings, url, token} from '../utils/initial-сards';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: url,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

/*Save elements in global variables*/
const popupProfileOpenButton = document.querySelector('.profile__edit');
const popupAvatarChangeButton = document.querySelector('.profile__avatar-edit');
const popupPlaceOpenButton = document.querySelector('.profile__add');
const userName = document.querySelector('.popup__field_type_name');
const userDescription = document.querySelector('.popup__field_type_description');
const userAvatar = document.querySelector('.popup__field_type_avatar-link');
const cardList = new Section(
  (item) => {
    const card = createCard(item);
    cardList.addItem(card.generateCard());
  },
  '.elements'
);

let myUserId = '';

function handleLikeClick(card, data) {
  const promise = card.isLikedByMe() ? api.dislikeCard(data._id) : api.likeCard(data._id);
  promise
  .then((data) => {
    card.updateLike(data);
  })
  .catch((err) => {
    console.log(`${err}`);
  });
}

function handleTrashClick(card) {
  popupWithConfirm.setSubmitHandler(() => {
    return api.deleteCard(card._id)
    .then(() => {
      card.deleteCard();
      popupWithConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    });
  });
  popupWithConfirm.open();
}

/*Prevent multiple call new Card*/
const createCard = (item) => {
  const card = new Card(item,
    '.article-template',
    myUserId,
    popupWithImage.open.bind(popupWithImage),
    () => handleLikeClick(card, item),
    () => handleTrashClick(card)
  );
  return card;
}


/*Initialize image preview*/
const popupWithImage = new PopupWithImage('.popup_type_img');
popupWithImage.setEventListeners();

/*Initialize work with profile*/
const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userDescriptionSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar'
});

const popupWithUser = new PopupWithForm('.popup_type_profile', (formData) => {
  popupWithUser.showLoading(true);
  api.setUserInfo(formData)
  .then((result) => {
    userInfo.setUserInfo({
      name: result.name,
      description: result.about,
      avatar: result.avatar
    });
    popupWithUser.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupWithUser.showLoading(false);
  });
});

popupProfileOpenButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  userName.value = userData.userName;
  userDescription.value = userData.userDescription;
  formValidatorProfile.disableSubmitButton();
  popupWithUser.open();
});
popupWithUser.setEventListeners();

const popupWithAvatar = new PopupWithForm('.popup_type_avatar', (formData) => {
  popupWithAvatar.showLoading(true);
  api.setAvatar(formData['avatar-link'])
    .then(data => {
      userInfo.setUserInfo(data);
      popupWithAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithAvatar.showLoading(false);
    });
  });

popupAvatarChangeButton.addEventListener('click', () => {
  userAvatar.value = '';
  formValidatorAvatar.disableSubmitButton();
  popupWithAvatar.open();
});
popupWithAvatar.setEventListeners();

/*Get user info and initialize card list*/
/*We need userId for cards to detect my likes so need to wait when all promisses will be resolved*/
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([user, cards]) => {
  userInfo.setUserInfo({
    name: user.name,
    description: user.about,
    avatar: user.avatar
  });
  myUserId = user._id;

  cardList.renderItems(cards);
})
.catch((err) => {
  console.log(err);
});

/*Initialize work with cards */
const popupWithPlace = new PopupWithForm('.popup_type_place', (formData) => {
  popupWithPlace.showLoading(true);
  api.createCard({name: formData['place-name'], link: formData['place-link']})
  .then((result) => {
    const card = createCard(result);
    cardList.addItem(card.generateCard());
    popupWithPlace.close();
  })
  .catch((err) => {console.log(err);})
  .finally(() => {
    popupWithPlace.showLoading(false);
  });

});

popupPlaceOpenButton.addEventListener('click', () => {
  formValidatorPlace.disableSubmitButton();
  popupWithPlace.open();
});
popupWithPlace.setEventListeners();

/*Initialize confirmation*/
const popupWithConfirm = new PopupWithConfirm('.popup_type_confirm');
popupWithConfirm.setEventListeners();

/*Initialize form validation*/
const formValidatorProfile = new FormValidator(validationSettings, '.popup__form_type_profile');
formValidatorProfile.enableValidation();

const formValidatorPlace = new FormValidator(validationSettings, '.popup__form_type_place');
formValidatorPlace.enableValidation();

const formValidatorAvatar = new FormValidator(validationSettings, '.popup__form_type_avatar');
formValidatorAvatar.enableValidation();
