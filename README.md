# vizTable

## Description
Built a scalable and reusable Table component using Angular 8. The table is able to present upto 1000 rows of feature rich data, without any experience hiccup. Features supported include:
- Virtual Scroll<br>
Render 1000s of content rich rows without user XP glitches.
- Responsive Table Layout<br>
Contents of the user defined rows can be made responsive by utilising the content width passed as template context.
- Sorting based on column values<br>
Allows sorting of columns based on sortComparer methods in TableConfig.
- User Defined Row Templates<br>
Consumer of the component can customise the kind of rows they want for the table. 
- Default Rows based on Header Column and Data passed<br>
If customised template is not provided, a default one is ready for you.
- Column Toggle to perform column based view updates<br>
Column Header contains an optional button + or - which allows you to toggle column behaviour.

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
1. Table Component can support detailed row (collapsible behaviour), where some additional detail can be displayed on row click. In our case, the trend can be displayed as an inline table.
2. Table Component can support column filters, based on user input over a specific column, only thoughs rows are displayed which match the criteria.
3. Table Component can also support Grouping of Data or should be able to present the data in a heirarchial format if required.
4. Storybook Integration which supports different usecases for the component.

<img width="2048" alt="Screenshot 2021-06-06 at 7 08 18 PM" src="https://user-images.githubusercontent.com/36563196/120926489-b5412080-c6fa-11eb-80c7-2458bf539bc2.png">
<img width="2048" alt="Screenshot 2021-06-06 at 7 07 57 PM" src="https://user-images.githubusercontent.com/36563196/120926495-bb370180-c6fa-11eb-96d9-10eb1a746f87.png">
<img width="2048" alt="Screenshot 2021-06-06 at 7 07 47 PM" src="https://user-images.githubusercontent.com/36563196/120926496-bc682e80-c6fa-11eb-8c74-63aa8c5e5526.png">
<img width="2048" alt="Screenshot 2021-06-06 at 7 07 39 PM" src="https://user-images.githubusercontent.com/36563196/120926497-be31f200-c6fa-11eb-9864-4882e48959c4.png">
<img width="2048" alt="Screenshot 2021-06-06 at 7 07 27 PM" src="https://user-images.githubusercontent.com/36563196/120926502-c12ce280-c6fa-11eb-9914-b443123af2ad.png">


