import { mapKeyValue } from 'src/utils';

export const createPrevDate = (from: Date, prev: number) => {
  const prevDate = new Date();
  prevDate.setDate(from.getDate() - prev);

  return prevDate;
};

export const createPrevHour = (from: Date, hours: number) => {
  const year = from.getFullYear();
  const month = from.getMonth();
  const date = from.getDate();
  const hour = from.getHours();

  const prevHour = new Date(year, month, date, hour);

  // minutes * seconds * ms
  prevHour.setTime(from.getTime() - hours * 60 * 60 * 1000);

  return prevHour;
};

export const genRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const genMockData = <T extends string[]>({
  dataKeys,
  count = 10,
  min = 0,
  max = 100,
}: {
  dataKeys: T;
  count: number;
  min: number;
  max: number;
}): Record<T[number], number>[] =>
  Array(count)
    .fill(null)
    .map(() => mapKeyValue(dataKeys, () => genRandomInt(min, max)));
