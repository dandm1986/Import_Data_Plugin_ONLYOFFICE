class QueryView extends View {
  _parentElement = document.querySelector(`.query-edit-section`);

  addHandlerSaveQuery(handler, option) {
    const saveQueryBtn = document.querySelector(`#save-query`),
      link = document.querySelector(`#link`),
      worksheet = document.querySelector(`#worksheet`),
      startCell = document.querySelector(`#start-cell`),
      targetCell = document.querySelector(`#target-cell`),
      endCell = document.querySelector(`#end-cell`),
      helpSection = document.querySelector(`.help`);

    saveQueryBtn &&
      saveQueryBtn.addEventListener(`click`, (e) => {
        e.preventDefault();
        if (
          !link.value ||
          !worksheet.value ||
          !startCell.value ||
          !targetCell.value ||
          !endCell.value
        ) {
          helpSection.innerHTML = `
          <svg class="icon">
            <use href="./resources/img/icons.svg#info"></use>
          </svg>
          <p class="help-message">Unable to save the request. Please fill in all fields.</p>
          `;
          setTimeout(function () {
            switch (option) {
              case `new`:
                helpSection.innerHTML = `
                <svg class="icon">
                  <use href="./resources/img/icons.svg#info"></use>
                </svg>
                <p class="help-message">Create a new query. Press the <strong>"Save"</strong> button to add it to the query list.</p>
                `;
                break;
              case `edit`:
                helpSection.innerHTML = `
                <svg class="icon">
                  <use href="./resources/img/icons.svg#info"></use>
                </svg>
                <p class="help-message">Edit the query. Press the <strong>"Save"</strong> button to add it to the query list.</p>
                `;
                break;
            }
          }, 3000);
        } else {
          const newQuery = {
            link: link.value,
            worksheet: worksheet.value,
            startCell: startCell.value,
            targetCell: targetCell.value,
            endCell: endCell.value,
          };
          handler(newQuery, this._data, option);
        }
      });
  }

  addHandlerCopyQuery(handler) {
    const copyQueryBtn = document.querySelector(`#copy-query`),
      link = document.querySelector(`#link`),
      worksheet = document.querySelector(`#worksheet`),
      startCell = document.querySelector(`#start-cell`),
      targetCell = document.querySelector(`#target-cell`),
      endCell = document.querySelector(`#end-cell`);

    copyQueryBtn &&
      copyQueryBtn.addEventListener(`click`, (e) => {
        e.preventDefault();
        const newQuery = {
          link: link.value,
          worksheet: worksheet.value,
          startCell: startCell.value,
          targetCell: targetCell.value,
          endCell: endCell.value,
        };
        handler(newQuery, `copy`);
      });
  }

  addHandlerDeleteQuery(handler) {
    const deleteQueryBtn = document.querySelector(`#delete-query`);

    deleteQueryBtn &&
      deleteQueryBtn.addEventListener(`click`, (e) => {
        e.preventDefault();
        const newQuery = {
          targetCell: this._data.targetCell,
        };
        handler(newQuery, `delete`);
      });
  }

  _generateMarkup(option, exists) {
    switch (option) {
      case `new`:
        return `
        <div class="main">
          <div class="section-header">New query</div>
          <div class="query-edit">
            <div class="grid">
              <div class="query-field" id="query-field--link">
                <div class="query-field--name">Link to spreadsheet</div>
                <div class="data-input">
                  <input class="data-input--field" type="url" id="link" ${
                    this._data ? `value="${this._data.link}"` : ``
                  } />
                  <div class="btn btn-outline" id="link--help" title="Link to the spreadsheet for OnlyOffice portal users">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="query-field" id="query-field--worksheet">
                <div class="query-field--name">Worksheet name</div>
                <div class="data-input">
                  <input class="data-input--field" type="text" id="worksheet" ${
                    this._data ? `value="${this._data.worksheet}"` : ``
                  } />
                  <div class="btn btn-outline" id="worksheet--help" title="The name of the worksheet with the data due to import">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="query-field" id="query-field--target-cell">
                <div class="query-field--name">Target cell</div>
                <div class="data-input">
                  <input
                    class="data-input--field"
                    type="text"
                    id="target-cell"
                    ${this._data ? `value="${this._data.targetCell}"` : ``}
                  />
                  <div class="btn btn-outline" id="target-cell--help" title="The adress of the cell to import the data">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="query-field" id="query-field--start-cell">
                <div class="query-field--name">Start cell</div>
                <div class="data-input">
                  <input
                    class="data-input--field"
                    type="text"
                    id="start-cell"
                    ${this._data ? `value="${this._data.startCell}"` : ``}
                  />
                  <div class="btn btn-outline" id="start-cell--help" title="The adress of the cell with which the range due to import begins">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="query-field" id="query-field--end-cell">
                <div class="query-field--name">End cell</div>
                <div class="data-input">
                  <input class="data-input--field" type="text" id="end-cell"
                  ${this._data ? `value="${this._data.endCell}"` : ``} />
                  <div class="btn btn-outline" id="end-cell--help" title="The adress of the cell with which the range due to import ends">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="query-btns">
              <a href="" class="btn btn-full" id="save-query">Save</a>
            </div>
          </div>
        </div>
        <div class="help">
          <svg class="icon">
            <use href="./resources/img/icons.svg#info"></use>
          </svg>
          <p class="help-message"> ${
            exists
              ? `A query with this name already exists! Enter another value in the field <strong>"Target cell"</strong>.`
              : `Create a new query. Press the <strong>"Save"</strong> button to add it to the query list.`
          }</p>
        </div> 
        `;
        break;
      case `copy`:
        return `
        <div class="main">
          <div class="section-header">New query</div>
          <div class="query-edit">
          <div class="grid">
            <div class="query-field" id="query-field--link">
              <div class="query-field--name">Link to spreadsheet</div>
              <div class="data-input">
                <input class="data-input--field" type="url" id="link" ${
                  this._data ? `value="${this._data.link}"` : ``
                } />
                <div class="btn btn-outline" id="link--help" title="Link to the spreadsheet for OnlyOffice portal users">
                  <svg class="icon">
                    <use href="./resources/img/icons.svg#help"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div class="query-field" id="query-field--worksheet">
              <div class="query-field--name">Worksheet name</div>
              <div class="data-input">
                <input class="data-input--field" type="text" id="worksheet" ${
                  this._data ? `value="${this._data.worksheet}"` : ``
                } />
                <div class="btn btn-outline" id="worksheet--help" title="The name of the worksheet with the data due to import">
                  <svg class="icon">
                    <use href="./resources/img/icons.svg#help"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div class="query-field" id="query-field--target-cell">
              <div class="query-field--name">Target cell</div>
              <div class="data-input">
                <input
                  class="data-input--field"
                  type="text"
                  id="target-cell"
                  autofocus
                />
                <div class="btn btn-outline" id="target-cell--help" title="The adress of the cell to import the data">
                  <svg class="icon">
                    <use href="./resources/img/icons.svg#help"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div class="query-field" id="query-field--start-cell">
              <div class="query-field--name">Start cell</div>
              <div class="data-input">
                <input
                  class="data-input--field"
                  type="text"
                  id="start-cell"
                  ${this._data ? `value="${this._data.startCell}"` : ``}
                />
                <div class="btn btn-outline" id="start-cell--help" title="The adress of the cell with which the range due to import begins">
                  <svg class="icon">
                    <use href="./resources/img/icons.svg#help"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div class="query-field" id="query-field--end-cell">
              <div class="query-field--name">End cell</div>
              <div class="data-input">
                <input class="data-input--field" type="text" id="end-cell"
                ${this._data ? `value="${this._data.endCell}"` : ``} />
                <div class="btn btn-outline" id="end-cell--help" title="The adress of the cell with which the range due to import ends">
                  <svg class="icon">
                    <use href="./resources/img/icons.svg#help"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="query-btns">
            <a href="" class="btn btn-full" id="save-query">Save</a>
          </div>
        </div>
        </div>
        <div class="help">
          <svg class="icon">
            <use href="./resources/img/icons.svg#info"></use>
          </svg>
          <p class="help-message"> ${
            exists
              ? `A query with this name already exists! Enter another value in the field <strong>"Target cell"</strong>.`
              : `Create a new query. Press the <strong>"Save"</strong> button to add it to the query list.`
          }</p>
        </div> 
        `;
        break;
      case `edit`:
        return `
        <div class="main">
          <div class="section-header">Query ${this._data.targetCell}</div>
          <div class="query-edit">
            <div class="grid">
              <div class="query-field" id="query-field--link">
                <div class="query-field--name">Link to spreadsheet</div>
                <div class="data-input">
                  <input class="data-input--field" type="url" id="link" ${
                    this._data ? `value="${this._data.link}"` : ``
                  } />
                  <div class="btn btn-outline" id="link--help" title="Link to the spreadsheet for OnlyOffice portal users">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="query-field" id="query-field--worksheet">
                <div class="query-field--name">Worksheet name</div>
                <div class="data-input">
                  <input class="data-input--field" type="text" id="worksheet" ${
                    this._data ? `value="${this._data.worksheet}"` : ``
                  } />
                  <div class="btn btn-outline" id="worksheet--help" title="The name of the worksheet with the data due to import">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="query-field" id="query-field--target-cell">
                <div class="query-field--name">Target cell</div>
                <div class="data-input">
                  <input
                    class="data-input--field"
                    type="text"
                    id="target-cell"
                    ${this._data ? `value="${this._data.targetCell}"` : ``}
                  />
                  <div class="btn btn-outline" id="target-cell--help" title="The adress of the cell to import the data">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="query-field" id="query-field--start-cell">
                <div class="query-field--name">Start cell</div>
                <div class="data-input">
                  <input
                    class="data-input--field"
                    type="text"
                    id="start-cell"
                    ${this._data ? `value="${this._data.startCell}"` : ``}
                  />
                  <div class="btn btn-outline" id="start-cell--help" title="The adress of the cell with which the range due to import begins">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="query-field" id="query-field--end-cell">
                <div class="query-field--name">End cell</div>
                <div class="data-input">
                  <input class="data-input--field" type="text" id="end-cell"
                  ${this._data ? `value="${this._data.endCell}"` : ``} />
                  <div class="btn btn-outline" id="end-cell--help" title="The adress of the cell with which the range due to import ends">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="query-btns">
              <a href="" class="btn btn-full" id="save-query">Save</a>
              <a href="" class="btn btn-full" id="copy-query">Copy</a>
              <a href="" class="btn btn-full" id="delete-query">Delete</a>
            </div>
          </div>
        </div>
        <div class="help">
          <svg class="icon">
            <use href="./resources/img/icons.svg#info"></use>
          </svg>
          <p class="help-message">Edit the query. Press the <strong>"Save"</strong> button to add it to the query list.</p>
        </div> 
        `;
        break;
      case `save`:
        return `
        <div class="main">
          <div class="section-header">&nbsp;</div>
          <div class="message">
            <p>The query <strong>"${this._data.targetCell}"</strong> was successfully created and added to the query list.</p>
          </div>
        </div>
        `;
        break;
      case `delete`:
        return `
        <div class="main">
          <div class="section-header">&nbsp;</div>
          <div class="message">
            <p>The query <strong>"${this._data.targetCell}"</strong> was successfully deleted.</p>
          </div>
        </div>
        `;
        break;
      case `blank`:
        return `
        <div class="main">
          <div class="section-header">&nbsp;</div>
          <div class="message">
            <p>There were no queries created for this spreadsheet.</p>
            <p>Push the <strong>"Create"</strong> button to add a new query.</p>
          </div>
        </div>
        `;
        break;
      default:
        return `
        <div class="main">
          <div class="section-header">&nbsp;</div>
          <div class="message">
            <p>Press the <strong>"Execute"</strong> button to execute the queries.</p>
            <p>Choose the query to edit from the list.</p>
            <p>Press the <strong>"Create"</strong> button to a new query.</p>
          </div>
        </div>
        `;
        break;
    }
  }
}
