(function (window, undefined) {
  window.Asc.plugin.init = function () {
    const link = window.document.getElementById(`link`),
      worksheet = window.document.getElementById(`worksheet`),
      cellStart = window.document.getElementById(`cell-start`),
      cellEnd = window.document.getElementById(`cell-end`),
      cellTarget = window.document.getElementById(`cell-target`),
      submitBtn = window.document.getElementById(`submit`);

    submitBtn.addEventListener(`click`, (e) => {
      e.preventDefault();

      window.Asc.plugin.getData(
        link,
        worksheet,
        cellStart,
        cellEnd,
        cellTarget
      );
    });
  };

  window.Asc.plugin.getData = function (
    link,
    worksheet,
    cellStart,
    cellEnd,
    cellTarget
  ) {
    $.ajax({
      method: 'POST',
      url: `https://r7methods.herokuapp.com/api/v1/methods/import-range`,
      contentType: 'application/json',
      // data: JSON.stringify({
      //   login: `dmitrenkodd@lad24.ru`,
      //   password: `Tithe14051986`,
      //   urlToFile: link.value,
      //   worksheet: worksheet.value,
      //   range: `${cellStart.value}:${cellEnd.value}`,
      //   targetCell: cellTarget.value,
      // }),
      data: JSON.stringify({
        login: `dmitrenkodd@lad24.ru`,
        password: `Tithe14051986`,
        urlToFile: `https://sereda.r7-office.ru/Products/Files/DocEditor.aspx?fileid=92320`,
        worksheet: `Прайс-лист`,
        range: `A1:F6`,
        targetCell: `A1`,
      }),
    })
      .done(function (data) {
        const cells = [],
          values = [],
          formats = [];

        for (let [key, value] of Object.entries(data.data.cellsObj)) {
          cells.push(key);
          values.push(
            typeof value == `number`
              ? value.toString().replace(`.`, `,`)
              : value.replaceAll(`"`, `'`)
          );
          formats.push(window.Asc.plugin.convertDataFormat(typeof value));
        }

        window.Asc.plugin.insertData(cells, values, formats);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(`Connetion failed ${textStatus}:\n${errorThrown}`);
      });
  };

  window.Asc.plugin.insertData = function (cells, values, formats) {
    Asc.scope.cells = cells;
    Asc.scope.values = values;
    Asc.scope.formats = formats;

    this.callCommand(function () {
      console.log(Asc.scope.values);
      console.log(Asc.scope.formats);
      const oWorksheet = Api.GetActiveSheet();
      for (var i = 0; i < Asc.scope.cells.length; i++) {
        oWorksheet
          .GetRange(Asc.scope.cells[i])
          .SetNumberFormat(Asc.scope.formats[i]);

        oWorksheet
          .GetRange(Asc.scope.cells[i])
          .SetValue(Asc.scope.values[i].toString().replaceAll(`'`, `"`));
      }

      Api.RecalculateAllFormulas();
    }, true);
  };

  window.Asc.plugin.convertDataFormat = function (dataType) {
    console.log(`Hello from convertDataFormat`);
    switch (dataType) {
      case `string`:
        return `@`;
        break;
      case `number`:
        return `0.00`;
        break;
      default:
        return `General`;
        break;
    }
  };

  window.Asc.plugin.button = function (id) {
    this.executeCommand('close', '');
  };
})(window, undefined);
