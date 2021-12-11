export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    if (this._items.length) {
      this._items.forEach(item => {
        this._renderer(item);
      });
    }
    else {
      this._renderer({name: this._items['place-name'], link: this._items['place-link']});
    }
  }
}
