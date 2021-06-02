import { APIResponse } from "../shared/types/api.response";

export interface TrendMetaData {
  day: 'string',
  aj_coh_0w_and_real_acquisition: number;
  aj_app_and_installs: number;
}

export interface CampaignMetaData {
  groups: { Campaign: { metadata: { name: string }}};
  trend: TrendMetaData[];
}

export interface CampaignListAPIResponse extends APIResponse {
  data: CampaignMetaData[];
}