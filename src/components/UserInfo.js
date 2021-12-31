export default class UserInfo {
  constructor({userNameSelector, userDescriptionSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent.trim(),
      userDescription: this._userDescription.textContent.trim(),
      userAvatar: this._userAvatar.src
    }
  }
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userDescription.textContent = data.description;
    this._userAvatar.src = data.avatar;
  }
}
