import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from "@angular/core";
import { SeriesData } from "src/app/shared/types/seriesData";
import { Campaign, MetricType, TemporalMetric } from "src/app/types/campaign";

@Component({
  selector: 'campaign-trend-chart',
  templateUrl: './campaign-trend-chart.component.html',
  styleUrls: ['./campaign-trend-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignTrendChart implements OnChanges {

  @Input() trendName: MetricType;
  @Input() view: [number, number];
  @Input() trend: TemporalMetric[];
  @Input() yScaleMax: number;

  public seriesData: SeriesData[];
  public colorScheme;

  constructor() {}

  ngOnChanges() {
    this.colorScheme = {
      domain: [this.trendName === MetricType.aj_app_and_installs ? '#0ff1ce' : '#fb4934']
    };
    this.seriesData = [{
      name: this.trendName,
      series: this.trend.map(t => ({ name: t.date, value: t.value }))
    }];
  }
}