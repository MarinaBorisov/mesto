export default class UserInfo {
  constructor({userNameSelector, userDescriptionSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent.trim(),
      userDescription: this._userDescription.textContent.trim()
    }
  }
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userDescription.textContent = data.description;
  }
}
