import { WithDateData } from 'src/types';

export const dateToUTC = (date: Date) =>
  parseInt((date.getTime() / 1000).toFixed(0), 10);

export const utcToMs = (utc: number) => utc * 1000;

export const utcToMsAll = <K extends WithDateData>(arr: K[]) =>
  arr.map((utc) => ({
    ...utc,
    date: utcToMs(utc.date),
  }));

export const utcToDate = (utc: number) => new Date(utcToMs(utc));

export const dateDiff = (from: Date, to: Date) =>
  Math.floor(
    (Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) -
      Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())) /
      (1000 * 60 * 60 * 24)
  );

export const getPrevDate = (from: Date, to: Date) =>
  new Date(from.getTime() - (to.getTime() - from.getTime()));

export const sameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();
