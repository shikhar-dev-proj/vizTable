import { ScrollingModule, ScrollDispatcher } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineChartComponent } from './line-chart.component';

describe('LineChartComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LineChartComponent
      ],
      imports: [
        BrowserModule,
        NgxChartsModule,
        BrowserAnimationsModule,
      ],
      providers: [
      ]
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(LineChartComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should not show visualisation if seriesData is empty', () => {
    const fixture = TestBed.createComponent(LineChartComponent);
    const app = fixture.debugElement.componentInstance;
    app.seriesData = [];
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('ngx-charts-area-chart')).toBeNull();
  });

  it('should show visualisation if seriesData is passed correctly', () => {
    const fixture = TestBed.createComponent(LineChartComponent);
    const app = fixture.debugElement.componentInstance;
    app.seriesData = [{
      name: 'series',
      series: [{
        name: new Date(),
        value: 100
      }]
    }];
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('ngx-charts-area-chart')).toBeTruthy();
  });


});
