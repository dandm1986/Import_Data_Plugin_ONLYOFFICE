const model = new Model();

function update() {
  model.updateState();
  model.state.queriesObjArr.length == 0
    ? renderQuery(null, `blank`)
    : renderQuery();
  renderQueriesList();
}

function renderQueriesList(data) {
  const queries = data || model.getQueries();
  const queriesListView = new QueriesListView();
  queriesListView.render(queries);
  queriesListView.addHandlerEditQuery(editQuery);
}

function renderQuery(data, option, exists) {
  const queryView = new QueryView();
  queryView.render(data, option, exists);
  queryView.addHandlerSaveQuery(saveQuery, option);
  queryView.addHandlerCopyQuery(copyQuery, option);
  queryView.addHandlerDeleteQuery(deleteQuery);
}

function editQuery(queryName, option) {
  const { query } = model.filterQueries(queryName);
  renderQuery(query, option);
  renderQueriesList();
}

function copyQuery(query, option) {
  renderQuery(query, option);
  renderQueriesList();
}

function searchQuery(queryName) {
  const { query } = model.filterQueries(queryName);
  renderQueriesList([query]);
}

function saveQuery(newQuery, query, option) {
  const exists = model.queryExists(newQuery);
  switch (option) {
    case `new`:
      if (!exists) {
        model.addQuery(newQuery);
        model.updateState();
        renderQueriesList();
        renderQuery(newQuery, `save`);
        setTimeout(update, 1000);
      } else {
        renderQuery(newQuery, option, exists);
      }
      break;
    case `copy`:
      if (!exists) {
        model.addQuery(newQuery);
        model.updateState();
        renderQueriesList();
        renderQuery(newQuery, `save`);
        setTimeout(update, 1000);
      } else {
        renderQuery(newQuery, option, exists);
      }
      break;
    case `edit`:
      const { _, queries } = model.filterQueries(query.targetCell);
      model.addQuery(newQuery, queries);
      model.updateState();
      renderQueriesList();
      renderQuery(newQuery, `save`);
      setTimeout(update, 1000);
  }
}

function deleteQuery(query, option) {
  model.deleteQuery(query);
  model.updateState();
  renderQueriesList();
  renderQuery(query, option);
  setTimeout(update, 1000);
}

function executeQueries() {
  const cellsData = model.executeQueries();
  console.log(cellsData);
}

function init() {
  const pluginView = new PluginView();
  pluginView.render();
  pluginView.addHandlerNew(renderQuery);
  pluginView.addHandlerRefresh(update);
  pluginView.addHandlerSearch(searchQuery);
  pluginView.addHandlerExecuteQueries(executeQueries);
  update();
}

init();
