class PluginView extends View {
  _parentElement = document.querySelector(`.plugin`);

  addHandlerNew(handler) {
    const newQueryBtn = document.getElementById(`new-query`);
    newQueryBtn.addEventListener(`click`, (e) => {
      e.preventDefault();
      handler(null, `new`);
    });
  }

  addHandlerRefresh(handler) {
    const queriesListRefreshBtn = document.querySelector(
      `#resfresh-queries-list`
    );
    queriesListRefreshBtn.addEventListener(`click`, (e) => {
      e.preventDefault();
      handler();
    });
  }

  addHandlerSearch(handler) {
    const queriesSearchField = document.querySelector(`#search-query`);
    queriesSearchField.addEventListener(`change`, (e) => {
      e.preventDefault();
      handler(queriesSearchField.value);
      queriesSearchField.value = ``;
    });
  }

  addHandlerExecuteQueries(handler) {
    const executeQueriesBtn = document.querySelector(`#execute-queries`);
    executeQueriesBtn.addEventListener(`click`, (e) => {
      e.preventDefault();
      handler();
    });
  }

  _generateMarkup(option) {
    return `
    <div class="queries-list-section">
      <div class="main">
        <div class="section-header">Queries</div>
        <div class="section-menu">
          <a href="" class="btn btn-full" id="new-query">Create</a>
          <div class="data-input">
            <input
              class="data-input--field"
              type="text"
              id="search-query"
              placeholder="..."
            />
            <a href="" class="btn btn-full" id="resfresh-queries-list">
              <svg class="icon">
                <use href="./resources/img/icons.svg#refresh"></use>
              </svg>
            </a>
          </div>
        </div>
        <div class="queries-list"></div>
      </div>
      <a href="" class="btn btn-full" id="execute-queries">Execute</a>
    </div>
    <div class="query-edit-section"></div>
    `;
  }
}
