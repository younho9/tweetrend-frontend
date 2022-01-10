import { add, differenceInCalendarDays } from 'date-fns';
import moment from 'moment';

export const formatDate = (format: string) => {
  switch (format) {
    case 'YYYYMMDD':
      return (item: any) => moment(item).locale('ko').format('YYYY년 MMM Do');
    case 'YYMMDDHH':
      return (item: any) =>
        moment(item).locale('ko').format('YY년 MMM Do HH시');
    case 'YYMMDD':
      return (item: any) => moment(item).locale('ko').format('YY년 MMM Do');
    case 'MMDD':
      return (item: any) => moment(item).locale('ko').format('MMM Do');
    case 'MMDDHH':
      return (item: any) => moment(item).locale('ko').format('MMM Do HH시');
    case 'DDHH':
      return (item: any) => moment(item).locale('ko').format('Do HH시');
    case 'DD':
      return (item: any) => moment(item).locale('ko').format('Do');
    case 'HH':
      return (item: any) => moment(item).locale('ko').format('HH시');
    default:
      return (item: any) => moment(item).locale('ko').format('YYYY년 MMM Do');
  }
};

export const addUnit = (str: string, unit: string) => `${str}${unit}`;

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const abbreviateNumber = (num: number) => {
  // trillion, billion, million, kilo
  const units = ['T', 'B', 'M', 'K'];

  for (let i = 0; i <= units.length - 1; i += 1) {
    // 10^12, 10^9, 10^6, 10^3
    const size = 10 ** (12 - i * 3);

    if (num >= size) {
      const result = Math.round(num / size);

      return result === 1000
        ? `1.0${units[i - 1]}`
        : `${result.toFixed(1)}${units[i]}`;
    }
  }

  return Math.round(num / 10) * 10 === 1000 ? '1.0K' : `${num}`;
};

export const approximateDuration = (from: Date, to: Date) => {
  const duration = moment(to).diff(from, 'days');
  return moment.duration(duration, 'days').locale('ko').humanize();
};
