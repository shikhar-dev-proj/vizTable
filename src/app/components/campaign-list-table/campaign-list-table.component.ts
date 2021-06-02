import { Component, Input, OnInit } from "@angular/core";
import { Campaign, MetricType } from "src/app/types/campaign";

@Component({
  selector: 'campaign-list-table',
  templateUrl: './campaign-list-table.component.html',
  styleUrls: ['./campaign-list-table.component.scss'],
})
export class CampaignListTable implements OnInit {

  @Input() campaignList: Campaign[];

  public totalCampaignValues: {
    [MetricType.aj_app_and_installs]: number;
    [MetricType.aj_coh_0w_and_real_acquisition]: number;
  }

  public headerData = [{
    name: 'Campaign Name'
  }, {
    name: 'aj_app_and_installs'
  }, {
    name: 'aj_coh_0w_and_real_acquisition'
  }];


  constructor() {}

  ngOnInit() {
    this.totalCampaignValues = {
      [MetricType.aj_app_and_installs]: this.campaignList.reduce(
        (acc, curr) => acc + curr[MetricType.aj_app_and_installs].total
        , 0
      ),
      [MetricType.aj_coh_0w_and_real_acquisition]: this.campaignList.reduce(
        (acc, curr) => acc + curr[MetricType.aj_coh_0w_and_real_acquisition].total
        , 0
      )
    }
  }
}