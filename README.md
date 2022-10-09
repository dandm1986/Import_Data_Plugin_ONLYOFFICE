# ONLYOFFICE plugin to import data from external spreadsheets

[ONLYOFFICE](https://www.onlyoffice.com/) doesn't have the functionality of importing data from external spreadsheets (e.g. ImportRange in Google). This small plugin works together with the [web-service](https://github.com/dandm1986/Import_Data_Service_ONLYOFFICE) and currently imports data from the spreadsheets that are located in the OnlyOffice [workspace](https://www.onlyoffice.com/workspace.aspx) portal.

[Plugin structure description](https://api.onlyoffice.com/plugin/structure)
[Spreadsheet API description](https://api.onlyoffice.com/docbuilder/spreadsheetapi)

Technolies used:

- HTML5
- CSS3
- JavaScript
- JQuery

MVC pattern implemented.

## Installing ONLYOFFICE

- Download and install [ONLYOFFICE desktop editors](https://www.onlyoffice.com/desktop.aspx)
- Register the free [ONLYOFFICE Workspace Cloud Account](https://www.onlyoffice.com/registration.aspx?from=workspace)

## Plugin installation

- Make a `.zip` archive out of all the files in the plugin folder.
- Change `.zip` extension to `.plugin`.
- Create a new spreadsheet in the ONLYOFFICE desktop editor, go to `plugins` in the main menu, press `settings` and `add plugin`. Choose the `.plugin` archive and install it. A new icon would appear in the list of plugins.

## Plugin settings

You should change the `_data` object in `model.js` according to your URLs and credentials:

```
_data = {
  webServiceURL: `url_to_the_web-service_deployed`,
  portalURL: `url_to_onlyoffice_workspace`,
  userName: `onlyoffice_workspace_user_login`,
  password: `onlyoffice_workspace_user_password`,
};
```

## Plugin logic

- Open the plugin within the spreadheet editor.
- You can create and edit as many queries as you need.
- The queries are saved in the local storage so once you set all the necessary queries you can then easily request data from the external spreadsheets just by pushing the `Execute` plugin button. The plugin would make all the necessay request to the server and update the imported data within the target cells.

## Creating a new query

To create a new query you need to fill in the following fields:

- `Link to spreadsheet` - link to the spreadsheet for OnlyOffice worksheet users.
- `Worksheet name` - the name of the worksheet with the data due to import.
- `Target cell` - The adress of the cell to import the data.
- `Start cell` - the adress of the cell with which the range due to import begins.
- `End cell` - the adress of the cell with which the range due to import ends.

## Editing a query

You can make changes in the existing query - just select the needed query from the query list.

You can also quickly add queries for different cells within the same spreadsheet by making a `copy` of a query.

You can also `delete` unnecessary queries.

## Queries list

All the queries are added to the queries list after being created.

There is a small search field to quickly search for queries when there are too many of them.

Press `Execute` to execute all available queiries.
