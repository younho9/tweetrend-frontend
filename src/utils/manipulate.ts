import {
  MapCallbackFnType,
  ReduceCallbackFnType,
  DataWithCountsType,
} from 'src/types';

export const match = <T>(key: keyof T, val: unknown) => (obj: T) =>
  obj[key] === val;

export const mapKeyValue = <T extends string[], R>(
  origin: T,
  fn: ReduceCallbackFnType<R>
) =>
  origin.reduce(
    (prev, cur, idx, arr) => ({
      ...prev,
      [cur]: fn({ prev, cur, idx, arr }),
    }),
    {} as Record<T[number], R>
  );

export const genArrayWithCallback = <R>(
  length: number,
  fn: MapCallbackFnType<any, R>
): R[] =>
  Array(length)
    .fill(null)
    .map((val, idx, arr) => fn({ val, idx, arr }));

export const sumProperties = <T extends string>(obj: Record<T, number>) =>
  (Object.keys(obj) as Array<T>).reduce((sum, cur) => sum + obj[cur], 0);

export const sumKey = (arr: Record<string, number>[], key: string) =>
  arr.reduce((sum, cur) => sum + cur[key], 0);

export const findMaxProperty = <T extends string>(obj: Record<T, number>) =>
  (Object.keys(obj) as Array<T>).reduce((prev, cur) =>
    obj[prev] > obj[cur] ? prev : cur
  );

export const mergeObj = (data: Record<string, number>[]) => {
  const result: Record<string, number> = {};

  data.forEach((cur) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(cur)) {
      if (result[key]) {
        result[key] += value;
      } else {
        result[key] = value;
      }
    }
  });

  return result;
};

export const rankObj = (obj: Record<string, number>, count: number) => {
  const record = [];
  const etc = { name: 'etc', counts: 0 };
  const entries = Object.entries(obj).sort(([, a], [, b]) => b - a);

  entries.forEach(([name, counts], idx) => {
    if (idx < count - 1) {
      record.push({ name, counts });
    } else {
      etc.counts += counts;
    }
  });
  record.push(etc);

  return record;
};

export const findMaxObj = <K extends string>(
  arr: DataWithCountsType<K>,
  key: K
) => arr.reduce((prev, cur) => (prev[key] > cur[key] ? prev : cur));

export const head = (arr: any[]) => (arr.length > 0 ? arr[0] : null);

export const tail = <K>(arr: K[]) =>
  arr.length > 0 ? arr[arr.length - 1] : null;
