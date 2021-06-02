import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { CampaignListingComponent } from './containers/campaign-listing/campaign-listing.component';
import { HttpService } from './shared/services/http.service';
import { CampaignService } from './services/campaign.service';
import { TableComponent, TableContentComponent, TableHeaderComponent, TableRowComponent } from './shared/components/table';
import { CampaignListTable } from './components/campaign-list-table/campaign-list-table.component';
import { LineChartComponent } from './shared/components/line-chart/line-chart.component';
import { CampaignTrendChart } from './components/campaign-trend-chart/campaign-trend-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CampaignListingComponent,
    CampaignListTable,
    TableComponent,
    TableHeaderComponent,
    TableContentComponent,
    TableRowComponent,
    TableContentComponent,
    LineChartComponent,
    CampaignTrendChart
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [
    HttpService,
    CampaignService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
