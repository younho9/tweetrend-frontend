import { Cell, Legend, PieChart, Pie, Tooltip } from 'recharts';
import styled, { useTheme } from 'styled-components';

import CustomTooltip from 'src/components/Charts/CustomTooltip';
import MainChartWrapper, {
  MainChartWrapperProps,
} from 'src/components/Charts/MainChartWrapper';
import { Color } from 'src/types';
import { mapKeyValue } from 'src/utils';

export type MainPieChartProps = {
  /**
   * name: 평판 데이터 key(positive, neutral, negative)
   * ratio: 평판 비율 (%) 의 배열
   */
  data: { name: string; counts: number }[];
  dataNameMap?: Record<string, string>;
  dataColorMap: Record<string, Color>;
  /** 차트 컨테이너의 너비 */
  width?: number;
  /** 차트 컨테이너의 높이 */
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
} & MainChartWrapperProps;

const StyledLegendFormmater = styled.div<{ width: number }>`
  width: ${({ width }) => width - 80}px;
  margin-bottom: 20px;
  display: inline-flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.Gray900};
  font-size: ${({ theme }) => theme.typography.size.s3};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
`;

function LegendFormmater(
  value: string,
  entry: any,
  width: number,
  nameMap?: Record<string, string>
) {
  const { payload } = entry || {};

  return (
    <StyledLegendFormmater width={width}>
      <span>{nameMap ? nameMap[value] : value}</span>
      <span>{(payload.percent * 100).toFixed(1)}%</span>
    </StyledLegendFormmater>
  );
}

export function UnWrappedMainPieChart({
  title,
  data,
  dataNameMap,
  dataColorMap,
  width = 250,
  height = 300,
  innerRadius = 50,
  outerRadius = 70,
  ...props
}: MainPieChartProps) {
  const theme = useTheme();
  const defaultNameMap: Record<string, string> = mapKeyValue(
    data.map(({ name }) => name),
    ({ cur }) => cur
  );

  return (
    <PieChart width={width} height={height} {...props}>
      <Pie
        paddingAngle={5}
        startAngle={-270}
        data={data}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        fill={theme.colors.Gray400}
        dataKey="counts">
        {data.map(({ name }) => (
          <Cell
            key={name}
            stroke={theme.colors.Gray50}
            fill={theme.colors[dataColorMap[name]]}
          />
        ))}
      </Pie>
      <Tooltip
        content={
          <CustomTooltip
            customFormatter={({ name }) =>
              dataNameMap
                ? dataNameMap[name as string]
                : defaultNameMap[name as string]
            }
            arrow={false}
            unit="건"
          />
        }
        cursor={false}
        offset={20}
      />
      <Legend
        iconType="circle"
        formatter={(value, entry) =>
          LegendFormmater(value, entry, width, dataNameMap)
        }
        verticalAlign="bottom"
        layout="horizontal"
      />
    </PieChart>
  );
}

export default MainChartWrapper(UnWrappedMainPieChart);
