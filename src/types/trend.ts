import { Color, ReputationType } from 'src/types';

export const BasicCounts = [
  'total-counts',
  'user-counts',
  'retweet-counts',
] as const;

export const BasicAnalysis = [
  'region',
  'source',
  'reputation',
  'relwords',
] as const;

export type TrendCountType = typeof BasicCounts[number];

export type TrendAnalysisType = typeof BasicAnalysis[number];

export type TrendType = TrendCountType | TrendAnalysisType;

export const Intervals = ['hourly', 'daily', 'weekly', 'total'] as const;

export type IntervalType = typeof Intervals[number];

export type TrendPeriodType = TrendParamType;

export interface TrendParamType {
  from: Date;
  to: Date;
  interval: IntervalType;
}

export type WithDateData = { date: number } & Record<string, any>;

export interface TrendCountData extends WithDateData {
  count: number;
}

export interface TrendCountResponse {
  data?: TrendCountData[];
  error?: string;
}

export interface TrendAnalysisResponse {
  data?: TrendAnalysisData[];
  error?: string;
}

export type TrendAnalysisData = {
  date: number;
  source?: SourceDataType[];
  region?: RegionDataType[];
  reputation?: ReputationDataType[];
  relwords?: RelWordsDataType[];
};

export type TrendResponse = TrendCountResponse | TrendAnalysisResponse;

export type SourceDataType = {
  name: string;
  counts: number;
};

export type RegionDataType = {
  name: string;
  counts: number;
};

export type ReputationDataType = {
  name: ReputationType;
  counts: number;
};

export type PeriodicReputeDataType = {
  date: number;
  positive: number;
  neutral: number;
  negative: number;
};

export type RelWordsDataType = {
  name: string;
  counts: number;
  score: number;
};

export type PeriodicRelWordsDataType = {
  [x: string]: number;
  date: number;
};

export type RelwordsMapDataType = {
  name: string;
  counts: number;
  color: Color;
};

export interface ChartDataType extends Record<string, any> {
  name: string;
  counts: number;
}
