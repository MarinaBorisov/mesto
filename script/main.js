/*Save elements in global variables*/
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupImg = document.querySelector('.popup_type_img');
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
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

/*Declare handlers for profile*/
function popupProfileOpen() {
  const userName = profileName.textContent.trim();
  const userSubtitle = profileSubtitle.textContent.trim();
  nameInput.value = userName;
  descriptionInput.value = userSubtitle;
  openPopup(popupProfile);
}

function popupProfileClose() {
  closePopup(popupProfile);
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
  openPopup(popupPlace);
}

function popupPlaceClose() {
  closePopup(popupPlace);
}

function createCard(name, src) {
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
    popupImgPicture.src = src;
    popupImgPicture.alt = name;
    popupImgDescription.textContent = name;
    openPopup(popupImg);
  });
  return articleClone;
}
function addCard(name, src) {
  elements.prepend(createCard(name, src));
}

function submitPlaceForm(evnt) {
  evnt.preventDefault();
  addCard(placeNameInput.value, placeLinkInput.value);
  popupPlaceClose();
}

/*Add listeners for place*/
formPlaceElement.addEventListener('submit', submitPlaceForm);
popupPlaceOpenButton.addEventListener('click', popupPlaceOpen);
popupPlaceCloseButton.addEventListener('click', popupPlaceClose);


/*Article generation from array */
initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

/*Handle click on popupImgClose button*/
popupImgClose.addEventListener('click', () => {
  closePopup(popupImg);
});
