import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SeriesData } from '../../types/seriesData';

@Component({
  selector: 'line-chart',
  styleUrls: ['./line-chart.component.scss'],
  templateUrl: './line-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent {

  @Input() view = [250, 100];
  @Input() colorScheme = { domain: ['#0ff1ce']};
  @Input() seriesData: SeriesData[];

}
