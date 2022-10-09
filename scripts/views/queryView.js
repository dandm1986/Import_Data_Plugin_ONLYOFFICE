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
          <p class="help-message">Невозможно записать запрос. Пожалуйста, заполните все поля.</p>
          `;
          setTimeout(function () {
            switch (option) {
              case `new`:
                helpSection.innerHTML = `
                <svg class="icon">
                  <use href="./resources/img/icons.svg#info"></use>
                </svg>
                <p class="help-message">Создайте новый запрос. Нажмите кнопку <strong>"Записать"</strong>, чтобы добавить его в список запросов.</p>
                `;
                break;
              case `edit`:
                helpSection.innerHTML = `
                <svg class="icon">
                  <use href="./resources/img/icons.svg#info"></use>
                </svg>
                <p class="help-message">Отредактируйте запрос. Нажмите кнопку <strong>"Записать"</strong>, чтобы добавить его в список запросов.</p>
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
          <div class="section-header">Новый запрос</div>
          <div class="query-edit">
            <div class="grid">
              <div class="query-field" id="query-field--link">
                <div class="query-field--name">Ссылка на таблицу</div>
                <div class="data-input">
                  <input class="data-input--field" type="url" id="link" ${
                    this._data ? `value="${this._data.link}"` : ``
                  } />
                  <div class="btn btn-outline" id="link--help" title="Ссылка на таблицу для пользователей портала Р7">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="query-field" id="query-field--worksheet">
                <div class="query-field--name">Имя листа</div>
                <div class="data-input">
                  <input class="data-input--field" type="text" id="worksheet" ${
                    this._data ? `value="${this._data.worksheet}"` : ``
                  } />
                  <div class="btn btn-outline" id="worksheet--help" title="Название листа таблицы, из которого будут импортироваться данные">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="query-field" id="query-field--target-cell">
                <div class="query-field--name">Результат в ячейку</div>
                <div class="data-input">
                  <input
                    class="data-input--field"
                    type="text"
                    id="target-cell"
                    ${this._data ? `value="${this._data.targetCell}"` : ``}
                  />
                  <div class="btn btn-outline" id="target-cell--help" title="Адрес ячейки, в которую будут импортироваться данные">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="query-field" id="query-field--start-cell">
                <div class="query-field--name">Начало диапазона</div>
                <div class="data-input">
                  <input
                    class="data-input--field"
                    type="text"
                    id="start-cell"
                    ${this._data ? `value="${this._data.startCell}"` : ``}
                  />
                  <div class="btn btn-outline" id="start-cell--help" title="Адрес ячейки, с которой начинается диапазон импортируемых данных">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="query-field" id="query-field--end-cell">
                <div class="query-field--name">Конец диапазона</div>
                <div class="data-input">
                  <input class="data-input--field" type="text" id="end-cell"
                  ${this._data ? `value="${this._data.endCell}"` : ``} />
                  <div class="btn btn-outline" id="end-cell--help" title="Адрес ячейки, на которой заканчивается диапазон импортируемых данных">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="query-btns">
              <a href="" class="btn btn-full" id="save-query">Записать</a>
            </div>
          </div>
        </div>
        <div class="help">
          <svg class="icon">
            <use href="./resources/img/icons.svg#info"></use>
          </svg>
          <p class="help-message"> ${
            exists
              ? `Запрос с таким названием уже существует! Введите другое значение в поле <strong>"Результат в ячейку"</strong>.`
              : `Создайте новый запрос. Нажмите кнопку <strong>"Записать"</strong>, чтобы добавить его в список запросов.`
          }</p>
        </div> 
        `;
        break;
      case `copy`:
        // TODO: не срабатывает автофокус (т.к. только при загрузке страницы)
        return `
        <div class="main">
          <div class="section-header">Новый запрос</div>
          <div class="query-edit">
          <div class="grid">
            <div class="query-field" id="query-field--link">
              <div class="query-field--name">Ссылка на таблицу</div>
              <div class="data-input">
                <input class="data-input--field" type="url" id="link" ${
                  this._data ? `value="${this._data.link}"` : ``
                } />
                <div class="btn btn-outline" id="link--help" title="Ссылка на таблицу для пользователей портала Р7">
                  <svg class="icon">
                    <use href="./resources/img/icons.svg#help"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div class="query-field" id="query-field--worksheet">
              <div class="query-field--name">Имя листа</div>
              <div class="data-input">
                <input class="data-input--field" type="text" id="worksheet" ${
                  this._data ? `value="${this._data.worksheet}"` : ``
                } />
                <div class="btn btn-outline" id="worksheet--help" title="Название листа таблицы, из которого будут импортироваться данные">
                  <svg class="icon">
                    <use href="./resources/img/icons.svg#help"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div class="query-field" id="query-field--target-cell">
              <div class="query-field--name">Результат в ячейку</div>
              <div class="data-input">
                <input
                  class="data-input--field"
                  type="text"
                  id="target-cell"
                  autofocus
                />
                <div class="btn btn-outline" id="target-cell--help" title="Адрес ячейки, в которую будут импортироваться данные">
                  <svg class="icon">
                    <use href="./resources/img/icons.svg#help"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div class="query-field" id="query-field--start-cell">
              <div class="query-field--name">Начало диапазона</div>
              <div class="data-input">
                <input
                  class="data-input--field"
                  type="text"
                  id="start-cell"
                  ${this._data ? `value="${this._data.startCell}"` : ``}
                />
                <div class="btn btn-outline" id="start-cell--help" title="Адрес ячейки, с которой начинается диапазон импортируемых данных">
                  <svg class="icon">
                    <use href="./resources/img/icons.svg#help"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div class="query-field" id="query-field--end-cell">
              <div class="query-field--name">Конец диапазона</div>
              <div class="data-input">
                <input class="data-input--field" type="text" id="end-cell"
                ${this._data ? `value="${this._data.endCell}"` : ``} />
                <div class="btn btn-outline" id="end-cell--help" title="Адрес ячейки, на которой заканчивается диапазон импортируемых данных">
                  <svg class="icon">
                    <use href="./resources/img/icons.svg#help"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="query-btns">
            <a href="" class="btn btn-full" id="save-query">Записать</a>
          </div>
        </div>
        </div>
        <div class="help">
          <svg class="icon">
            <use href="./resources/img/icons.svg#info"></use>
          </svg>
          <p class="help-message"> ${
            exists
              ? `Запрос с таким названием уже существует! Введите другое значение в поле <strong>"Результат в ячейку"</strong>.`
              : `Отредактируйте запрос. Нажмите кнопку <strong>"Записать"</strong>, чтобы добавить его в список запросов.`
          }</p>
        </div> 
        `;
        break;
      case `edit`:
        return `
        <div class="main">
          <div class="section-header">Запрос ${this._data.targetCell}</div>
          <div class="query-edit">
            <div class="grid">
              <div class="query-field" id="query-field--link">
                <div class="query-field--name">Ссылка на таблицу</div>
                <div class="data-input">
                  <input class="data-input--field" type="url" id="link" ${
                    this._data ? `value="${this._data.link}"` : ``
                  } />
                  <div class="btn btn-outline" id="link--help" title="Ссылка на таблицу для пользователей портала Р7">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="query-field" id="query-field--worksheet">
                <div class="query-field--name">Имя листа</div>
                <div class="data-input">
                  <input class="data-input--field" type="text" id="worksheet" ${
                    this._data ? `value="${this._data.worksheet}"` : ``
                  } />
                  <div class="btn btn-outline" id="worksheet--help" title="Название листа таблицы, из которого будут импортироваться данные">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="query-field" id="query-field--target-cell">
                <div class="query-field--name">Результат в ячейку</div>
                <div class="data-input">
                  <input
                    class="data-input--field"
                    type="text"
                    id="target-cell"
                    ${this._data ? `value="${this._data.targetCell}"` : ``}
                  />
                  <div class="btn btn-outline" id="target-cell--help" title="Адрес ячейки, в которую будут импортироваться данные">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="query-field" id="query-field--start-cell">
                <div class="query-field--name">Начало диапазона</div>
                <div class="data-input">
                  <input
                    class="data-input--field"
                    type="text"
                    id="start-cell"
                    ${this._data ? `value="${this._data.startCell}"` : ``}
                  />
                  <div class="btn btn-outline" id="start-cell--help" title="Адрес ячейки, с которой начинается диапазон импортируемых данных">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="query-field" id="query-field--end-cell">
                <div class="query-field--name">Конец диапазона</div>
                <div class="data-input">
                  <input class="data-input--field" type="text" id="end-cell"
                  ${this._data ? `value="${this._data.endCell}"` : ``} />
                  <div class="btn btn-outline" id="end-cell--help" title="Адрес ячейки, на которой заканчивается диапазон импортируемых данных">
                    <svg class="icon">
                      <use href="./resources/img/icons.svg#help"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="query-btns">
              <a href="" class="btn btn-full" id="save-query">Записать</a>
              <a href="" class="btn btn-full" id="copy-query">Копировать</a>
              <a href="" class="btn btn-full" id="delete-query">Удалить</a>
            </div>
          </div>
        </div>
        <div class="help">
          <svg class="icon">
            <use href="./resources/img/icons.svg#info"></use>
          </svg>
          <p class="help-message">Отредактируйте запрос. Нажмите кнопку <strong>"Записать"</strong>, чтобы добавить его в список запросов.</p>
        </div> 
        `;
        break;
      case `save`:
        return `
        <div class="main">
          <div class="section-header">&nbsp;</div>
          <div class="message">
            <p>Запрос <strong>"${this._data.targetCell}"</strong> успешно создан и добавлен в список запросов.</p>
          </div>
        </div>
        `;
        break;
      case `delete`:
        return `
        <div class="main">
          <div class="section-header">&nbsp;</div>
          <div class="message">
            <p>Запрос <strong>"${this._data.targetCell}"</strong> успешно удален.</p>
          </div>
        </div>
        `;
        break;
      case `blank`:
        return `
        <div class="main">
          <div class="section-header">&nbsp;</div>
          <div class="message">
            <p>Для этой таблицы еще не было создано ни одного запроса.</p>
            <p>Нажмите кнопку <strong>"Создать"</strong>, чтобы добавить новый запрос.</p>
          </div>
        </div>
        `;
        break;
      default:
        return `
        <div class="main">
          <div class="section-header">&nbsp;</div>
          <div class="message">
            <p>Нажмите кнопку <strong>"Выполнить"</strong>, чтобы выполнить созданные запросы.</p>
            <p>Выберите запрос из списка, чтобы отредактировать его.</p>
            <p>Нажмите кнопку <strong>"Создать"</strong>, чтобы добавить новый запрос.</p>
          </div>
        </div>
        `;
        break;
    }
  }
}
