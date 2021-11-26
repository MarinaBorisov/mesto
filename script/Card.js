export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._src = data.src;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);

    return cardElement;
  }

  _handleLike(evt) {
    const likeButton = evt.target;
    likeButton.classList.toggle('elements__like_active');
  }
  _handleTrash(evt) {
    const trashButton = evt.target;
    trashButton.closest('.elements__element').remove();
  }

  _setEventListeners() {
    const elementsLike = this._element.querySelector('.elements__like');
    elementsLike.addEventListener('click', (evt) => {
      this._handleLike(evt);
    });
    const elementsTrash = this._element.querySelector('.elements__trash');
    elementsTrash.addEventListener('click', (evt) => {
      this._handleTrash(evt);
    });
    const elementsImg = this._element.querySelector('.elements__img');
    elementsImg.addEventListener('click', () => {
      const popupImg = document.querySelector('.popup_type_img');
      const popupImgPicture = popupImg.querySelector('.popup__img');
      popupImgPicture.src = this._src;
      popupImgPicture.alt = this._name;
      const popupImgDescription = popupImg.querySelector('.popup__caption');
      popupImgDescription.textContent = this._name;
      this._handleCardClick(popupImg);
    });

  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.elements__img').src = this._src;
    this._element.querySelector('.elements__img').alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;

    return this._element;
  }
}