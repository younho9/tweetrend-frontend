import {
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
  Area,
  AreaChart,
} from 'recharts';
import { useTheme } from 'styled-components';

import CustomTooltip from 'src/components/Charts/CustomTooltip';
import MainChartWrapper, {
  MainChartWrapperProps,
} from 'src/components/Charts/MainChartWrapper';
import { usePeriod } from 'src/contexts';
import { Color } from 'src/types';
import { abbreviateNumber, formatDate } from 'src/utils';

export type MainAreaChartProps = {
  /** 데이터 key(이름) */
  dataKeys: string[];
  /** 데이터 key-value pair의 배열 */
  data: ({ date: number } & Record<string, number>)[];
  /** 차트의 너비 */
  width?: number;
  /** 차트의 높이 */
  height?: number;
  /** 차트 색상 */
  colors?: Color[];
} & MainChartWrapperProps;

export function UnWrappedMainAreaChart({
  title,
  dataKeys,
  data,
  width = 960,
  height = 470,
  colors,
  ...props
}: MainAreaChartProps) {
  const theme = useTheme();
  const { diff } = usePeriod();
  const tickFormmater = diff < 3 ? 'DDHH' : 'MMDD';

  return (
    <AreaChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 0, left: 20, right: 50, bottom: 20 }}
      {...props}>
      <defs>
        {dataKeys.length > 0 &&
          dataKeys.map((key, idx) => (
            <linearGradient
              key={key}
              id={`${key}Color`}
              x1="0"
              y1="0"
              x2="0"
              y2="1">
              <stop
                offset="5%"
                stopColor={
                  colors ? theme.colors[colors[idx]] : theme.colors.Blue400
                }
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={
                  colors ? theme.colors[colors[idx]] : theme.colors.Blue400
                }
                stopOpacity={0}
              />
            </linearGradient>
          ))}
      </defs>
      <XAxis
        dataKey="date"
        axisLine={false}
        tickLine={false}
        stroke={theme.colors.Gray600}
        dy={20}
        tickFormatter={formatDate(tickFormmater)}
      />
      <YAxis
        stroke={theme.colors.Gray600}
        axisLine={false}
        tickSize={12}
        tickFormatter={abbreviateNumber}
        dx={-20}
        // TODO: 최대값 반올림 로직
        domain={[0, (dataMax) => Math.round((dataMax * 2) / 100) * 100]}
      />
      <Tooltip content={<CustomTooltip />} cursor={false} offset={-100} />
      <CartesianGrid horizontal={false} stroke={theme.colors.Gray400} />
      {dataKeys.length > 0 &&
        dataKeys.map((key, idx) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            fill={`url(#${key}Color)`}
            fillOpacity={1}
            stroke={colors ? theme.colors[colors[idx]] : theme.colors.Blue400}
            strokeWidth={2}
          />
        ))}
    </AreaChart>
  );
}

export default MainChartWrapper(UnWrappedMainAreaChart);
