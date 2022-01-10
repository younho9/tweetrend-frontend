import { AreaChart, Area } from 'recharts';
import { useTheme } from 'styled-components';

import { Color } from 'src/types';

export type TinyAreaChartProps = {
  /** 데이터 key(이름) */
  dataKey: string;
  /** 데이터 key-value pair의 배열 */
  data: { [key in string]: number }[];
  /** 차트의 너비 */
  width?: number;
  /** 차트의 높이 */
  height?: number;
  /** 차트 색상 */
  color?: Color;
  /** HTML 클래스 속성 */
  className?: string;
};

/**
 * 통계 요약을 보여주기 위한 작은 area 차트입니다.
 *
 * 데이터의 키(이름)과 데이터 key-value 쌍을 전달해야 합니다.
 *
 * 스타일로 모양새를 설정 할 때에는 `color`로 색상을 설정하고 `width`와 'height'로 크기를 설정할 수 있습니다.
 */
function TinyAreaChart({
  dataKey,
  data,
  width = 130,
  height = 80,
  color = 'Yellow400',
  ...props
}: TinyAreaChartProps) {
  const theme = useTheme();

  return (
    <AreaChart width={width} height={height} data={data} {...props}>
      <defs>
        <linearGradient id={`${color}Gradient`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={theme.colors[color]} stopOpacity={0.8} />
          <stop offset="95%" stopColor={theme.colors[color]} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey={dataKey}
        stroke={theme.colors[color]}
        fillOpacity={1}
        fill={`url(#${color}Gradient)`}
      />
    </AreaChart>
  );
}

export default TinyAreaChart;
