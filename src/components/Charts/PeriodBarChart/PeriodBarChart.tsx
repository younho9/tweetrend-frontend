import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useTheme } from 'styled-components';

import CustomTooltip from 'src/components/Charts/CustomTooltip';
import MainChartWrapper, {
  MainChartWrapperProps,
} from 'src/components/Charts/MainChartWrapper';
import { REPUTATIONS_KO_MAP } from 'src/constants';
import { usePeriod } from 'src/contexts';
import { Color, IntervalType, ReputationType } from 'src/types';
import { formatDate } from 'src/utils';

export type PeriodBarChartProps<D extends string> = {
  /** 데이터 key(이름) 배열 */
  dataKeys: D[];
  /** 데이터 key(이름)-색상 pair */
  colorMap: Record<D, Color>;
  /** 데이터 key-value pair의 배열 */
  data: ({ date: number } & Record<D, number>)[];
  /** 차트 기간 */
  interval: IntervalType;
  /** 통계 시작 지점 */
  from?: Date;
  /** 통계 종료 지점 */
  to?: Date;
  /** 차트의 너비 */
  width?: number;
  /** 차트의 높이 */
  height?: number;
} & MainChartWrapperProps;

export function UnWrappedPeriodBarChart<T extends string>({
  dataKeys,
  data,
  colorMap,
  width = 630,
  height = 300,
  interval,
  ...props
}: PeriodBarChartProps<T>) {
  const theme = useTheme();
  const { diff } = usePeriod();
  let tickFormmater;

  if (diff < 3) {
    tickFormmater = 'HH';
  } else if (diff < 7) {
    tickFormmater = 'MMDD';
  } else {
    tickFormmater = 'DD';
  }

  return (
    <BarChart
      width={width}
      height={height}
      data={data}
      margin={{
        right: 30,
        bottom: 5,
      }}
      {...props}>
      <CartesianGrid vertical={false} stroke={theme.colors.Gray400} />
      <XAxis dataKey="date" tickFormatter={formatDate(tickFormmater)} />
      <YAxis />
      <Tooltip
        content={
          <CustomTooltip
            customFormatter={({ entry = {}, index = 0 }) =>
              REPUTATIONS_KO_MAP[
                Object.keys(entry)[index + 1] as ReputationType
              ]
            }
            unit="건"
          />
        }
        cursor={false}
      />
      {dataKeys.map((dataKey) => (
        <Bar
          key={dataKey}
          barSize={6}
          dataKey={dataKey}
          fill={theme.colors[colorMap[dataKey]]}
        />
      ))}
    </BarChart>
  );
}

export default MainChartWrapper(UnWrappedPeriodBarChart);
