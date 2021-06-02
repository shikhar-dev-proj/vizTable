import { Component, OnInit } from "@angular/core";
import { CampaignService } from "src/app/services/campaign.service";
import { Campaign } from "src/app/types/campaign";

@Component({
  selector: 'campaign-listing',
  templateUrl: './campaign-listing.component.html',
  styleUrls: ['./campaign-listing.component.scss'],
})
export class CampaignListingComponent implements OnInit {

  public campaignList: Campaign[];

  constructor(public campaignService: CampaignService) {}

  ngOnInit() {
    this.campaignService.listCampaigns()
      .then((campaigns: Campaign[]) => {
        this.campaignList = campaigns;
      });
  }
}