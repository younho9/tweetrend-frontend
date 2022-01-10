export const Topics = ['covid-19'] as const;

export type TopicType = typeof Topics[number];
