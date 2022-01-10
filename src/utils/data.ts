import { TrendAnalysisData } from 'src/types';
import { utcToMs } from 'src/utils/date';

export const getReputationData = (data: TrendAnalysisData[]) =>
  data.map(({ date, reputation = null }) => ({
    date: utcToMs(date),
    positive: reputation ? reputation[0]?.counts : 0,
    neutral: reputation ? reputation[2]?.counts : 0,
    negative: reputation ? reputation[1]?.counts : 0,
  }));
