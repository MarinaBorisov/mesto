/*Array with default cards*/
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/*Save elements in global variables*/
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupImg = document.querySelector('.popup_type_img');

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


/*Declare handlers for profile*/
function popupProfileOpen() {
  const userName = profileName.textContent.trim();
  const userSubtitle = profileSubtitle.textContent.trim();
  nameInput.value = userName;
  descriptionInput.value = userSubtitle;
  popupProfile.classList.add('popup_opened');
}

function popupProfileClose() {
  popupProfile.classList.remove('popup_opened');
}

function profileFormSubmit(evnt) {
  evnt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = descriptionInput.value;
  popupProfileClose();
}

/*Add listeners for profile*/
formProfileElement.addEventListener('submit', profileFormSubmit);
popupProfileOpenButton.addEventListener('click', popupProfileOpen);
popupProfileCloseButton.addEventListener('click', popupProfileClose);

/*Declare handlers for place*/
function popupPlaceOpen() {
  popupPlace.classList.add('popup_opened');
}

function popupPlaceClose() {
  popupPlace.classList.remove('popup_opened');
}

function addCard(name, src) {
  const articleClone = articleTemplateContent.querySelector('.elements__element').cloneNode(true);
  const elementsImg = articleClone.querySelector('.elements__img');
  elementsImg.src = src;
  elementsImg.alt = name;
  const elementsTitle = articleClone.querySelector('.elements__title');
  elementsTitle.textContent = name;
  const elementsLike = articleClone.querySelector('.elements__like');
  elementsLike.addEventListener('click', (evt) => {
    const likeButton = evt.target;
    likeButton.classList.toggle('elements__like_active');
  });
  const elementsTrash = articleClone.querySelector('.elements__trash');
  elementsTrash.addEventListener('click', (evt) => {
    const trashButton = evt.target;
    trashButton.closest('.elements__element').remove();
  });
   elementsImg.addEventListener('click', () => {
    popupImg.querySelector('.popup__img').src = src;
    popupImg.querySelector('.popup__img').alt = name;
    popupImg.querySelector('.popup__caption').textContent = name;
    popupImg.classList.add('popup_opened');
  });
  popupImg.querySelector('.popup__close').addEventListener('click', () => {
    popupImg.classList.remove('popup_opened');
  });
  elements.prepend(articleClone);
}

function placeFormSubmit(evnt) {
  evnt.preventDefault();
  addCard(placeNameInput.value, placeLinkInput.value);
  popupPlaceClose();
}

/*Add listeners for place*/
formPlaceElement.addEventListener('submit', placeFormSubmit);
popupPlaceOpenButton.addEventListener('click', popupPlaceOpen);
popupPlaceCloseButton.addEventListener('click', popupPlaceClose);


/*Article generation from array */
initialCards.forEach((item) => {
  addCard(item.name, item.link);
});
