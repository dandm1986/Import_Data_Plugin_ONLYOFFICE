class View {
  _data;

  render(data, option, exists) {
    this._data = data;
    const markup = this._generateMarkup(option, exists);
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  _clear() {
    this._parentElement.innerHTML = ``;
  }
}
