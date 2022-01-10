import {
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  LineChart,
  YAxis,
} from 'recharts';
import { useTheme } from 'styled-components';

import CustomTooltip from 'src/components/Charts/CustomTooltip';
import MainChartWrapper, {
  MainChartWrapperProps,
} from 'src/components/Charts/MainChartWrapper';
import { usePeriod } from 'src/contexts';
import { Color } from 'src/types';
import { abbreviateNumber, formatDate } from 'src/utils';

export type MainLineChartProps = {
  /** 데이터 key(이름) */
  dataKey: string;
  /** 데이터 key-value pair의 배열 */
  data: ({ date: number } & Record<string, number>)[];
  /** 차트의 너비 */
  width?: number;
  /** 차트의 높이 */
  height?: number;
  /** 차트 색상 */
  color?: Color;
} & MainChartWrapperProps;

export function UnWrappedMainLineChart({
  title,
  dataKey,
  data,
  width = 960,
  height = 400,
  color = 'Blue400',
  ...props
}: MainLineChartProps) {
  const theme = useTheme();
  const { diff } = usePeriod();
  const tickFormmater = diff < 3 ? 'DDHH' : 'MMDD';

  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{ left: 20, right: 50, bottom: 20 }}
      {...props}>
      <defs>
        <filter id="shadow" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="blur" />
          <feOffset in="blur" dx="0" dy="7" result="offsetBlur" />
          <feFlood
            floodColor={theme.colors.Gray600}
            floodOpacity="0.7"
            result="offsetColor"
          />
          <feComposite
            in="offsetColor"
            in2="offsetBlur"
            operator="in"
            result="offsetBlur"
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <XAxis
        dataKey="date"
        axisLine={false}
        tickLine={false}
        tickCount={6}
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
      <Line
        type="monotone"
        dataKey={dataKey}
        filter="url(#shadow)"
        stroke={theme.colors[color]}
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  );
}

export default MainChartWrapper(UnWrappedMainLineChart);
