(function (window, undefined) {
  window.model = null;

  window.Asc.plugin.init = function () {
    $(`style`).remove();

    window.model = new Model();

    const pluginView = new PluginView();
    pluginView.render();
    pluginView.addHandlerNew(window.Asc.plugin.renderQuery);
    pluginView.addHandlerRefresh(window.Asc.plugin.update);
    pluginView.addHandlerSearch(window.Asc.plugin.searchQuery);
    pluginView.addHandlerExecuteQueries(window.Asc.plugin.executeQueries);
    window.Asc.plugin.update();
  };

  window.Asc.plugin.update = function () {
    window.model.updateState();
    window.model.state.queriesObjArr.length == 0
      ? window.Asc.plugin.renderQuery(null, `blank`)
      : window.Asc.plugin.renderQuery();
    window.Asc.plugin.renderQueriesList();
  };

  window.Asc.plugin.renderQueriesList = function (data) {
    const queries = data || window.model.getQueries();
    const queriesListView = new QueriesListView();
    queriesListView.render(queries);
    queriesListView.addHandlerEditQuery(window.Asc.plugin.editQuery);
  };

  window.Asc.plugin.renderQuery = function (data, option, exists) {
    const queryView = new QueryView();
    queryView.render(data, option, exists);
    queryView.addHandlerSaveQuery(window.Asc.plugin.saveQuery, option);
    queryView.addHandlerCopyQuery(window.Asc.plugin.copyQuery, option);
    queryView.addHandlerDeleteQuery(window.Asc.plugin.deleteQuery);
  };

  window.Asc.plugin.editQuery = function (queryName, option) {
    const { query } = window.model.filterQueries(queryName);
    window.Asc.plugin.renderQuery(query, option);
    window.Asc.plugin.renderQueriesList();
  };

  window.Asc.plugin.copyQuery = function (query, option) {
    window.Asc.plugin.renderQuery(query, option);
    window.Asc.plugin.renderQueriesList();
  };

  window.Asc.plugin.searchQuery = function (queryName) {
    const { query } = window.model.filterQueries(queryName);
    window.Asc.plugin.renderQueriesList([query]);
  };

  window.Asc.plugin.saveQuery = function (newQuery, query, option) {
    const exists = window.model.queryExists(newQuery);
    switch (option) {
      case `new`:
        if (!exists) {
          window.model.addQuery(newQuery);
          window.model.updateState();
          window.Asc.plugin.renderQueriesList();
          window.Asc.plugin.renderQuery(newQuery, `save`);
          setTimeout(window.Asc.plugin.update, 1000);
        } else {
          window.Asc.plugin.renderQuery(newQuery, option, exists);
        }
        break;
      case `copy`:
        if (!exists) {
          window.model.addQuery(newQuery);
          window.model.updateState();
          window.Asc.plugin.renderQueriesList();
          window.Asc.plugin.renderQuery(newQuery, `save`);
          setTimeout(window.Asc.plugin.update, 1000);
        } else {
          window.Asc.plugin.renderQuery(newQuery, option, exists);
        }
        break;
      case `edit`:
        const { _, queries } = window.model.filterQueries(query.targetCell);
        window.model.addQuery(newQuery, queries);
        window.model.updateState();
        window.Asc.plugin.renderQueriesList();
        window.Asc.plugin.renderQuery(newQuery, `save`);
        setTimeout(window.Asc.plugin.update, 1000);
    }
  };

  window.Asc.plugin.deleteQuery = function (query, option) {
    window.model.deleteQuery(query);
    window.model.updateState();
    window.Asc.plugin.renderQueriesList();
    window.Asc.plugin.renderQuery(query, option);
    setTimeout(window.Asc.plugin.update, 1000);
  };

  window.Asc.plugin.executeQueries = function () {
    window.model.executeQueries();
  };

  window.Asc.plugin.insertData = function (cell, value, format) {
    Asc.scope.cell = cell;
    Asc.scope.value = value;
    Asc.scope.format = format;
    this.callCommand(function () {
      const oWorksheet = Api.GetActiveSheet();
      oWorksheet.GetRange(Asc.scope.cell).SetNumberFormat(Asc.scope.format);
      oWorksheet
        .GetRange(Asc.scope.cell)
        .SetValue(Asc.scope.value.toString().replaceAll(`'`, `"`));
    }, false);
  };

  window.Asc.plugin.button = function (id) {
    this.executeCommand('close', '');
  };
})(window, undefined);
