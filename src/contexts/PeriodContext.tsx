import { createContext, ReactNode, useContext, useState } from 'react';

import { NOW, THISMONTH, THISWEEK, THREEMONTH, YESTERDAY } from 'src/constants';
import { IntervalType, PeriodButtonType, TrendPeriodType } from 'src/types';
import { createPrevDate, dateDiff, getPrevDate, sameDay } from 'src/utils';

export type PeriodContextType = {
  diff: number;
  prevPeriod: TrendPeriodType;
  period: TrendPeriodType;
  periodTotal: TrendPeriodType;
  active: PeriodButtonType | null;
  setFromTo: (from: Date, to: Date) => void;
  setFromNow: (prevDates: number) => void;
};

const PeriodContext = createContext<PeriodContextType>(undefined!);

type PeriodProviderProps = {
  children: ReactNode;
};

function PeriodProvider({ children }: PeriodProviderProps) {
  const [from, setFrom] = useState<Date>(YESTERDAY);
  const [to, setTo] = useState<Date>(NOW);
  const prev = getPrevDate(from, to);
  const diff = dateDiff(from, to);

  let active: PeriodButtonType | null = '오늘';

  if (!sameDay(to, NOW)) {
    active = null;
  } else if (sameDay(from, YESTERDAY)) {
    active = '오늘';
  } else if (sameDay(from, THISWEEK)) {
    active = '일주일';
  } else if (sameDay(from, THISMONTH)) {
    active = '1개월';
  } else if (sameDay(from, THREEMONTH)) {
    active = '3개월';
  } else {
    active = null;
  }

  let interval: IntervalType = 'hourly';

  if (diff < 4) {
    interval = 'hourly';
  } else if (diff < 32) {
    interval = 'daily';
  } else if (diff < 90) {
    interval = 'weekly';
  }

  const prevPeriod: TrendPeriodType = {
    from: prev,
    to: from,
    interval: 'total',
  };
  const period: TrendPeriodType = {
    from,
    to,
    interval,
  };
  const periodTotal: TrendPeriodType = {
    from,
    to,
    interval: 'total',
  };

  const setFromNow = (prevDates: number) => {
    const now = new Date();
    const fromDate = createPrevDate(now, prevDates);

    setFrom(fromDate);
    setTo(now);
  };

  const setFromTo = (fromDate: Date, toDate: Date) => {
    setFrom(fromDate);
    setTo(toDate);
  };

  return (
    <PeriodContext.Provider
      value={{
        diff,
        prevPeriod,
        period,
        periodTotal,
        active,
        setFromNow,
        setFromTo,
      }}>
      {children}
    </PeriodContext.Provider>
  );
}

export const usePeriod = () => {
  const context = useContext(PeriodContext);

  if (context === undefined) {
    throw new Error(
      'The usePeriod hook must be used with in a PeriodContext.Provider'
    );
  }
  return context;
};

export default PeriodProvider;
