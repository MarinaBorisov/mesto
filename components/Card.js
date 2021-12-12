export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._src = data.link;
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

  _handleLike() {
    this._elementsLike.classList.toggle('elements__like_active');
  }
  _handleTrash() {
    this._elementsTrash.closest('.elements__element').remove();
  }

  _setEventListeners() {
    this._elementsLike = this._element.querySelector('.elements__like');
    this._elementsLike.addEventListener('click', (evt) => {
      this._handleLike();
    });
    this._elementsTrash = this._element.querySelector('.elements__trash');
    this._elementsTrash.addEventListener('click', (evt) => {
      this._handleTrash();
    });
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

    return this._element;
  }
}
