import React from 'react';
import styled, { useTheme } from 'styled-components';

import { ColorCircle } from 'src/components/Charts/CustomTooltip';
import { Color } from 'src/types';

export type CustomLegendProps = {
  colorMap: { name: string; color: Color }[];
} & Partial<StyledCustomLegendProps>;

export type StyledCustomLegendProps = {
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledCustomLegend = styled.ul<StyledCustomLegendProps>`
  display: flex;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  font-size: ${({ theme }) => theme.typography.size.s3};

  .custom-legend-item {
    display: flex;
    align-items: center;
    padding: 10px;
  }
`;

function CustomLegend({ colorMap, ...props }: CustomLegendProps) {
  const theme = useTheme();

  return (
    <StyledCustomLegend {...props}>
      {colorMap.map(({ name, color }) => (
        <li key={color} className="custom-legend-item">
          <ColorCircle color={theme.colors[color]} size={13} />
          <span className="label">{name}</span>
        </li>
      ))}
    </StyledCustomLegend>
  );
}

export default CustomLegend;
