import { Color, ReputationType } from 'src/types';

export const REPUTATIONS = ['positive', 'negative', 'neutral'] as const;

export const REPUTATIONS_KO_MAP = {
  positive: '긍정적',
  negative: '부정적',
  neutral: '중립',
};

export const REPUTATION_SCORE_COLOR_MAP = (score: number): Color => {
  switch (score) {
    case -2:
      return 'Red700';
    case -1:
      return 'Red400';
    case 0:
      return 'Green400';
    case 1:
      return 'Blue400';
    case 2:
      return 'Blue700';
    default:
      return 'Gray400';
  }
};

export const REPUTATIONS_COLOR_MAP: Record<ReputationType, Color> = {
  positive: 'Blue400',
  negative: 'Red400',
  neutral: 'Green400',
};

export const REPUTATIONS_LEGENDS: {
  name: string;
  color: Color;
}[] = [
  { name: '긍정적', color: 'Blue400' },
  { name: '부정적', color: 'Red400' },
  { name: '중립', color: 'Green400' },
];

export const TOP_FIVE_COLORS: Color[] = [
  'Blue400',
  'Indigo400',
  'Magenta400',
  'Orange400',
  'Purple400',
];
