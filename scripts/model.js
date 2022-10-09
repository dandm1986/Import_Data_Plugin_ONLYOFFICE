class Model {
  state = {};

  _data = {
    webServiceURL: `url_to_the_web-service_deployed`,
    portalURL: `url_to_onlyoffice_workspace`,
    userName: `onlyoffice_workspace_user_login`,
    password: `onlyoffice_workspace_user_password`,
  };

  updateState() {
    this._getQueries();
    this._getQueriesObjArr();
  }

  filterQueries(queryName) {
    const queries = this.state.queriesObjArr.slice(),
      query = queries.splice(
        queries.findIndex((el) => el.targetCell === queryName),
        1
      )[0];
    return { query, queries };
  }

  addQuery(query, queries = this.state.queriesObjArr) {
    this.state.queriesObjArr = queries;
    this.state.queriesObjArr.push(query);
    this._setQueries();
  }

  deleteQuery(query) {
    this.state.queriesObjArr.splice(
      this.state.queriesObjArr.findIndex(
        (el) => el.targetCell === query.targetCell
      ),
      1
    );
    this._setQueries();
  }

  queryExists(query) {
    if (
      this.state.queriesObjArr.findIndex(
        (el) => el.targetCell === query.targetCell
      ) >= 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  getQueries() {
    return this.state.queriesObjArr.sort(function (a, b) {
      return a.targetCell.toUpperCase() < b.targetCell.toUpperCase()
        ? -1
        : a.targetCell.toUpperCase() > b.targetCell.toUpperCase()
        ? 1
        : 0;
    });
  }

  _checkToken(handler) {
    let tokenData = window.localStorage.getItem(`token`);
    if (tokenData) {
      const { token, expires } = JSON.parse(
        window.localStorage.getItem(`token`)
      );
      if (new Date(expires).getTime() > Date.now()) {
        handler(token);
      } else {
        this._getToken(handler);
      }
    } else {
      this._getToken(handler);
    }
  }

  executeQueries(handler) {
    this.state.queriesObjArr.forEach((query) =>
      this._checkToken(function (token) {
        $.ajax({
          method: 'POST',
          url: `${this._data.webServiceURL}/api/v1/methods/import-range`,
          contentType: 'application/json',
          data: JSON.stringify({
            token,
            urlToFile: query.link,
            worksheet: query.worksheet,
            range: `${query.startCell}:${query.endCell}`,
            targetCell: query.targetCell,
          }),
        })
          .done(function (data) {
            for (let [cell, { value, format }] of Object.entries(
              data.data.cellsObj
            )) {
              window.Asc.plugin.insertData(
                cell,
                typeof value == `number`
                  ? value.toString().replace(`.`, `,`)
                  : value.replaceAll(`"`, `'`),
                format
              );
            }
          })
          .fail(function (jqXHR, textStatus, errorThrown) {
            console.error(
              new Error(`Connetion failed ${textStatus}:\n${errorThrown}`)
            );
          });
      })
    );
  }

  _getToken(handler) {
    $.ajax({
      method: 'POST',
      url: `${this._data.portalURL}/api/2.0/authentication`,
      contentType: 'application/json',
      data: JSON.stringify({
        userName: this._data.userName,
        password: this._data.password,
      }),
    })
      .done(function (data) {
        window.localStorage.setItem(`token`, JSON.stringify(data.response));
        handler(data.response.token);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        throw new Error(`Connetion failed ${textStatus}:\n${errorThrown}`);
      });
  }

  _getQueries() {
    this.state.queriesJSONArr = window.localStorage.getItem(`queries`)
      ? window.localStorage.getItem(`queries`).split(`;`)
      : [];
  }

  _setQueries() {
    window.localStorage.setItem(
      `queries`,
      this.state.queriesObjArr.map((el) => JSON.stringify(el)).join(`;`)
    );
  }

  _getQueriesObjArr() {
    this.state.queriesObjArr =
      this.state.queriesJSONArr &&
      this.state.queriesJSONArr.slice().map((el) => JSON.parse(el));
  }
}
