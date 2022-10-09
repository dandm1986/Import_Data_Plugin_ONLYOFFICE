class QueriesListView extends View {
  _parentElement = document.querySelector(`.queries-list`);

  addHandlerEditQuery(handler) {
    this._parentElement.addEventListener(`click`, (e) => {
      e.preventDefault();
      const queryBtn = e.target.closest(`.btn`);
      queryBtn && handler(queryBtn.textContent, `edit`);
    });
  }

  _generateMarkup(options) {
    return (
      this._data && this._data.map(this._generateMarkupQueriesList).join(``)
    );
  }

  _generateMarkupQueriesList(el) {
    return `
    <a href="" class="btn btn-full">${el.targetCell}</a>
    `;
  }
}
