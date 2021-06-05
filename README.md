# vizTable

## Description
Built a scalable and reusable Table component using Angular 8. The table is able to present upto 1000 rows of feature rich data, without any experience hiccup. Features supported include:
- Virtual Scroll
- Responsive Table Layout
- Sorting based on column values
- User Defined Row Templates
- Default Rows based on Header Column and Data passed
- Column Toggle to perform column based view updates

## Setup and Usage

- Clone the repository<br>
`git clone git@github.com:shikhar-dev-proj/vizTable.git`
- Install Dependencies<br>
`npm install`
- Start the development server<br>
`ng serve`
- Visit [localhost:4200](http://localhost:4200) to checkout the demo


## Tests
Unit tests for TableComponent are written with Karma and Jasmine to cover most of the functionality and edge cases.<br>
Checkout the [spec file](./src/app/shared/components/table/table.component.spec.ts)<br>
- To run tests: <br>
`npm test`

## Application Structure

* **app**
  * **shared** -> most of reusable/generic code lives here
    * **components** -> reusable presentational views
      * **table** (Our reusable component. [Link](./src/app/shared/components/table/table.component.ts))
      * **line-chart** (uses [NgxCharts](https://swimlane.gitbook.io/ngx-charts/) to build area chart)
    * **services** -> basic services
      * http.service.ts (using HTTPClient for making XHR Requests)
  * **components** -> app specific presentational views
    * **campaign-list-table** (consumes TableComponent to list campaign trends)
    * **campaign-trend-chart** (consumes LineChartComponent to show trend chart for campaigns)
  * **containers** -> smart components interacting with services
    * **campaign-listing** (calls for CampaignService and displays CampaignListingComponent)
  * **services** -> services responsible for fetching app data
    * **campaign.service.ts** (makes call to the [API](https://clarisights-users.s3.eu-central-1.amazonaws.com/frontend-assignment/1000+items+table+response.json) and gets campaign list data)
  * **types** -> Used to model entities throughout the app

## Performance Considerations

To build a scalable table with large number of datasets and rich components like charts for every row, the main concern would be to not choke the browser by bombarding it with thousands of DOM elements. <br>
These elements which are to be presented in every row of the table need not be created eagerly since the list is not viewed at once, rather it is viewed in chunks. Once the user scrolls further to view more rows, they can be generated on the fly lazily. <br>
But the scroll height is based on the number of items present in the dataset, so it gives a feel that all the data has been presented. <br>
Lastly once the user scrolls further the items that have been removed from view can be removed from the DOM tree and hence save up on memory, so that there is no lag.<br>
This technique is known as **Virtual Scroll**. The table component is able to apply this technique with the help of **Angular CDK's Virtual Scroll**.

Some other ways of achieving the same usecase are:
- Server Side Pagination<br>
The API could give results in chunks based on sort/filter/pageNumber criteria. The Application can decide when to ask for more data based on User Scroll or Page updates.
- Client Side Pagination<br>
This can be achieved by either organising the table based on page numbers or by infinite scroll. In both cases the data is already stored as the component state and can be presented accordingly.


## Table Component Configurations

| Inputs        | Type           | Description  |
| ------------- |:-------------:| -----:|
| `tableConfig.tableHeaders`      | array | Information about headers |
| `tableConfig.tableHeaders.name`      | string | Used to display header title |
| `tableConfig.tableHeaders.property`      | string      | attached to corresponding property of data object |
| `tableConfig.tableHeaders.allowToggle` | boolean      |    to allow column toggle behaviour |
| `tableConfig.tableHeaders.sortable` (optional)      | boolean      |   to allow sorting rows based on header |
| `tableConfig.tableHeaders.metadata` (optional) | string      |   to display additional information in header cell |
| `tableConfig.tableHeaders.displayValue` (optional)      | Function      |   used to decide what to display in row cell |
| `tableConfig.tableHeaders.sortComparer` (optional) | Function      |    custom function used to sort rows  |
| `enableVirtualScroll`      | boolean      |   used to provide virtual scroll behaviour for large datasets |
| `itemSize` (optional) | number      |   Used as row size if enableVirtualScroll is true |


## Scope for Improvement





