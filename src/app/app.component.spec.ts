import { ScrollingModule, ScrollDispatcher } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppComponent } from './app.component';
import { CampaignListTable } from './components/campaign-list-table/campaign-list-table.component';
import { CampaignTrendChart } from './components/campaign-trend-chart/campaign-trend-chart.component';
import { CampaignListingComponent } from './containers/campaign-listing/campaign-listing.component';
import { CampaignService } from './services/campaign.service';
import { LineChartComponent } from './shared/components/line-chart/line-chart.component';
import { TableComponent } from './shared/components/table/table.component';
import { HttpService } from './shared/services/http.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CampaignListingComponent,
        CampaignListTable,
        TableComponent,
        LineChartComponent,
        CampaignTrendChart
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        NgxChartsModule,
        ScrollingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        HttpService,
        CampaignService,
        ScrollDispatcher
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'visualisation'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('visualisation');
  });

});
