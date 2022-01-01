export default class Card {
  constructor(data, cardSelector, myUserId, handleCardClick, handleLikeClick, handleTrashClick) {
    this._name = data.name;
    this._src = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._cardSelector = cardSelector;
    this._myUserId = myUserId;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleTrashClick = handleTrashClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);

    return cardElement;
  }

  isLikedByMe() {
    return this._isLikedByMe;
  }

  updateLike(data) {
    this._isLikedByMe = data.likes.some(item => item._id === this._myUserId);/*check if I've liked it */
    this._element.querySelector('.elements__like-counter').textContent = data.likes.length;
    if (this._isLikedByMe) {
        this._element.querySelector('.elements__like-button').classList.add('elements__like-button_active');
    } else {
        this._element.querySelector('.elements__like-button').classList.remove('elements__like-button_active');
    }
  }

  deleteCard() {
    this._elementsTrash.closest('.elements__element').remove();
    this._element = null;
  }

  _setEventListeners() {
    this._elementsLike = this._element.querySelector('.elements__like-button');
    this._elementsLike.addEventListener('click', () => this._handleLikeClick());
    this._elementsTrash = this._element.querySelector('.elements__trash');
    if (this._owner._id === this._myUserId) {
      this._elementsTrash.addEventListener('click', () => this._handleTrashClick());
    }
    else {
      this._elementsTrash.remove();
    }
    const elementsImg = this._element.querySelector('.elements__img');
    elementsImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._src);
    });

  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.elements__img').src = this._src;
    this._element.querySelector('.elements__img').alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__like-counter').textContent = this._likes.length;
    this._isLikedByMe = this._likes.some(item => item._id === this._myUserId);
    if (this._isLikedByMe) {
        this._element.querySelector('.elements__like-button').classList.add('elements__like-button_active');
    } else {
        this._element.querySelector('.elements__like-button').classList.remove('elements__like-button_active');
    }
    return this._element;
  }
}
