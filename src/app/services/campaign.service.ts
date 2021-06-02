import { Injectable } from "@angular/core";
import { HttpService } from "../shared/services/http.service";
import { APIResponse } from "../shared/types/api.response";
import { Campaign, toCampaignList } from "../types/campaign";
import { CampaignListAPIResponse } from "../types/campaign.reponse";

@Injectable()
export class CampaignService {

  private url = 'https://clarisights-users.s3.eu-central-1.amazonaws.com/frontend-assignment/1000+items+table+response.json';

  constructor(private httpService: HttpService) {}

  public listCampaigns(): Promise<Campaign[]> {
    return this.httpService.doGet(this.url)
      .then((res: CampaignListAPIResponse) => {
        return toCampaignList(res);
      })
      .catch((err: string) => {
        console.error(err);
        return []
      });
  } 
}