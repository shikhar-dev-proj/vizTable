import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { CAMPAIGN_TABLE_HEADERS } from 'src/app/app.constants';
import { TableConfig } from 'src/app/shared/components/table/table.component';
import { Campaign, MetricType } from 'src/app/types/campaign';

@Component({
  selector: 'campaign-list-table',
  templateUrl: './campaign-list-table.component.html',
  styleUrls: ['./campaign-list-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignListTable implements OnChanges {

  @Input() campaignList: Campaign[];

  headerData = CAMPAIGN_TABLE_HEADERS;
  tableConfig: TableConfig;
  totalCampaignValues: {
    [MetricType.aj_app_and_installs]: number;
    [MetricType.aj_coh_0w_and_real_acquisition]: number;
  };

  constructor() {}

  ngOnChanges() {
    // once campaign list is received, calculate total trend metrics
    this.totalCampaignValues = {
      // total sum of all aj_app_and_installs metric
      [MetricType.aj_app_and_installs]: this.campaignList.reduce(
        (acc, curr) => acc + curr[MetricType.aj_app_and_installs].total
        , 0
      ),
      // total sum of all aj_coh_0w_and_real_acquisition metric
      [MetricType.aj_coh_0w_and_real_acquisition]: this.campaignList.reduce(
        (acc, curr) => acc + curr[MetricType.aj_coh_0w_and_real_acquisition].total
        , 0
      )
    };

    this.tableConfig = {
      tableHeaders: [{
        name: 'Campaign Name',
        property: 'name',
        allowToggle: false
      }, {
        name: 'aj_app_and_installs',
        metadata: this.totalCampaignValues[MetricType.aj_app_and_installs].toString(),
        property: 'aj_app_and_installs',
        allowToggle: true,
        sortable: true,
        sortComparer: (A: Campaign, B: Campaign) => A.aj_app_and_installs.total - B.aj_app_and_installs.total,
        displayValue: (val: Campaign) => (val.aj_app_and_installs.total)
      }, {
        name: 'aj_coh_0w_and_real_acquisition',
        metadata: this.totalCampaignValues[MetricType.aj_coh_0w_and_real_acquisition].toString(),
        property: 'aj_coh_0w_and_real_acquisition',
        allowToggle: true,
        sortable: true,
        sortComparer: (A: Campaign, B: Campaign) => A.aj_coh_0w_and_real_acquisition.total - B.aj_coh_0w_and_real_acquisition.total,
        displayValue: (val: Campaign) => (val.aj_coh_0w_and_real_acquisition.total)
      }],
      itemSize: 60,
      enableVirtualScroll: true
    };

  }
}
