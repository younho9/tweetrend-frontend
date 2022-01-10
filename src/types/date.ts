export const KO_PERIODS = ['오늘', '일주일', '1개월', '3개월'] as const;

export type PeriodButtonType = typeof KO_PERIODS[number];
