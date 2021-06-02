import { CampaignListAPIResponse, CampaignMetaData, TrendMetaData } from "./campaign.reponse";

export enum MetricType {
  aj_coh_0w_and_real_acquisition = 'aj_coh_0w_and_real_acquisition',
  aj_app_and_installs = 'aj_app_and_installs'
}

export interface TemporalMetric {
  date: Date;
  value: number;
}

export interface Campaign {
  name: string;
  aj_coh_0w_and_real_acquisition: {
    total: number;
    trend: TemporalMetric[];
  };
  aj_app_and_installs: {
    total: number;
    trend: TemporalMetric[];
  };
}

export const toTemporalMetric = (trendData: TrendMetaData, metricType: MetricType): TemporalMetric => ({
  date: new Date(trendData.day),
  value: trendData[metricType] || 0
});

export const toCampaign = (campaignData: CampaignMetaData): Campaign => {
  return {
    name: campaignData.groups.Campaign.metadata.name,
    aj_coh_0w_and_real_acquisition: {
      total: campaignData.trend.reduce((acc, curr) => acc + (curr[MetricType.aj_coh_0w_and_real_acquisition] || 0), 0),
      trend: campaignData.trend.map(data => toTemporalMetric(data, MetricType.aj_coh_0w_and_real_acquisition))
    },
    aj_app_and_installs: {
      total: campaignData.trend.reduce((acc, curr) => acc + (curr[MetricType.aj_app_and_installs] || 0), 0),
      trend: campaignData.trend.map(data => toTemporalMetric(data, MetricType.aj_app_and_installs))
    }
  }
}

export const toCampaignList = (campaignResponse: CampaignListAPIResponse): Campaign[] => {
  return campaignResponse.data.map(c => toCampaign(c));
}