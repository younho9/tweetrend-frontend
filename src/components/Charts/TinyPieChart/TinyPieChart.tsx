import React from 'react';
import { PieChart, Pie, Label, Cell } from 'recharts';
import styled, { useTheme } from 'styled-components';

import { Color } from 'src/types';

export type TinyPieChartProps = {
  /** 평판 비율 */
  ratio: number;
  /** 차트 강조 색상 */
  color: Color;
  /** 차트 컨테이너의 너비 */
  width?: number;
  /** 차트 컨테이너의 높이 */
  height?: number;
} & Partial<StyledTinyPieChartProps>;

export type StyledTinyPieChartProps = {
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledTinyPieChart = styled.div<StyledTinyPieChartProps>`
  .label {
    font-size: ${({ theme }) => theme.typography.size.m2};
    font-weight: ${({ theme }) => theme.typography.weight.bold};
    fill: ${({ theme }) => theme.colors.Gray900};
  }
`;

function TinyPieChart({
  ratio,
  color,
  width = 95,
  height = 95,
  ...props
}: TinyPieChartProps) {
  const theme = useTheme();
  const data = [{ value: ratio }, { value: 100 - ratio }];

  return (
    <StyledTinyPieChart {...props}>
      <PieChart width={width} height={height}>
        <Pie
          startAngle={-270}
          data={data}
          innerRadius={35}
          outerRadius={45}
          stroke={theme.colors.Gray50}
          fill={theme.colors.Gray400}
          dataKey="value">
          <Cell stroke={theme.colors.Gray50} fill={theme.colors[color]} />
          <Label className="label" value={`${ratio}%`} position="center" />
        </Pie>
      </PieChart>
    </StyledTinyPieChart>
  );
}

export default TinyPieChart;
